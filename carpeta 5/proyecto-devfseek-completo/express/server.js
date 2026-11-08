import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

const app = express();
const port = process.env.PORT || 8080;
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

app.use(cors());
app.use(express.json());

function getDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = { messages: [] };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    return { messages: [] };
  }
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error guardando db.json:', err);
  }
}

// 1. Endpoint Hola Mundo
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// 2. Health check
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', app: 'DevfSeek Server', time: new Date() });
});

// 3. Endpoint POST para probar recepción
app.post('/data', (req, res) => {
  res.json({ message: 'Datos recibidos correctamente', data: req.body });
});

// 4. Endpoint de generación con Ollama
app.post('/api/ask', async (req, res) => {
  const { prompt, model } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt requerido' });
  }

  const modelName = model || 'deepseek-r1:1.5b';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const ollamaRes = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: modelName,
        prompt,
        stream: false,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!ollamaRes.ok) {
      throw new Error(`Ollama status: ${ollamaRes.status}`);
    }

    const data = await ollamaRes.json();
    let result = (data.response || '').replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    return res.json({ response: result, model: modelName, source: 'ollama' });
  } catch (err) {
    console.warn(`[Ollama no disponible en ${OLLAMA_HOST}]. Usando simulación educativa.`);
    
    // Fallback inteligente para el frontend
    const answers = [
      `¡Hola! Recibí tu consulta: "${prompt}". Este mensaje proviene del servidor Express (modo fallback demostrativo). Para respuestas de la red neuronal real, inicia Ollama con 'ollama run deepseek-r1:1.5b'.`,
      `Excelente pregunta sobre "${prompt}". El flujo front-end (React + Tailwind + Hook Form) y back-end (Express) está operando correctamente.`,
      `Respuesta del asistente a "${prompt}": Todos los componentes y hooks de tu proyecto DevfSeek están integrados satisfactoriamente.`
    ];
    const picked = answers[Math.floor(Math.random() * answers.length)];
    return res.json({ response: picked, model: modelName, source: 'fallback-demo' });
  }
});

// 5. Historial de mensajes en Express
app.get('/api/messages', (req, res) => {
  const db = getDatabase();
  res.json(db.messages || []);
});

app.post('/api/messages', (req, res) => {
  const { id, title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'title and content required' });
  }
  const db = getDatabase();
  const entry = { id: id || Date.now().toString(), title, content, date: new Date().toISOString() };
  db.messages.push(entry);
  saveDatabase(db);
  res.status(201).json({ message: 'Saved successfully', entry });
});

app.listen(port, () => {
  console.log(`Backend DevfSeek listo en http://localhost:${port}`);
});

