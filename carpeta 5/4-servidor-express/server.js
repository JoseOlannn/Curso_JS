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

// Middlewares
app.use(cors());
app.use(express.json());

// Helper para inicializar base de datos local JSON
function getDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = { messages: [], currentChat: [] };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error leyendo db.json:', err);
    return { messages: [], currentChat: [] };
  }
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error guardando en db.json:', err);
  }
}

// 1. Endpoint requerido por la actividad: responde 'Hola Mundo'
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// 2. Endpoint de verificación del estado del servicio
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'Servidor Express de DevF en funcionamiento',
    timestamp: new Date().toISOString()
  });
});

// 3. Endpoint POST para probar recepción de datos en el body
app.post('/data', (req, res) => {
  console.log('Body recibido en /data:', req.body);
  res.json({
    message: 'Datos recibidos correctamente',
    data: req.body,
    receivedAt: new Date().toISOString()
  });
});

// 4. Endpoint para intermediar con Ollama / DevSeek
app.post('/api/ask', async (req, res) => {
  const { prompt, model } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'El campo "prompt" es requerido' });
  }

  const modelToUse = model || 'deepseek-r1:1.5b';

  try {
    // Intentar conectar con Ollama local
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const ollamaResponse = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: modelToUse,
        prompt,
        stream: false
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama respondió con estatus: ${ollamaResponse.status}`);
    }

    const data = await ollamaResponse.json();
    let result = data.response || '';

    // Limpia etiquetas internas <think>...</think> de DeepSeek R1
    result = result.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    return res.json({
      response: result,
      model: modelToUse,
      source: 'ollama'
    });
  } catch (error) {
    console.warn(`[Aviso] Ollama no disponible en ${OLLAMA_HOST} (${error.message}). Usando respuesta inteligente de demostración.`);
    
    // Modo demostración inteligente en caso de que el alumno no tenga Ollama activo aún
    const mockResponses = [
      `¡Hola! Recibí tu consulta: "${prompt}". Como Ollama no está corriendo en segundo plano, estoy respondiendo en modo demostración. ¡El servidor Express y la conexión front-back funcionan de forma excelente!`,
      `Excelente pregunta. Respecto a "${prompt}": En React y Express, la comunicación mediante fetch y APIs REST permite desacoplar la interfaz de la lógica del servidor.`,
      `Respuesta a "${prompt}": Servidor Express funcionando al 100%. Cuando instales Ollama y corras 'ollama run deepseek-r1:1.5b', esta respuesta vendrá directamente del modelo local de IA.`
    ];

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    return res.json({
      response: randomResponse,
      model: modelToUse,
      source: 'mock-fallback',
      notice: 'Ollama no está en ejecución. Para usar IA local instala Ollama desde https://ollama.com'
    });
  }
});

// 5. Endpoint para obtener el historial de mensajes
app.get('/api/messages', (req, res) => {
  const db = getDatabase();
  res.json(db.messages || []);
});

// 6. Endpoint para guardar un nuevo mensaje en el historial
app.post('/api/messages', (req, res) => {
  const { id, title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Título y contenido son requeridos' });
  }

  const db = getDatabase();
  const newMessage = {
    id: id || Date.now().toString(),
    title,
    content,
    createdAt: new Date().toISOString()
  };

  db.messages.push(newMessage);
  saveDatabase(db);

  res.status(201).json({
    message: 'Mensaje guardado exitosamente',
    data: newMessage
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`===============================================`);
  console.log(` Servidor Express escuchando en http://localhost:${port}`);
  console.log(` Endpoint Hola Mundo: http://localhost:${port}/`);
  console.log(` Endpoint API Status: http://localhost:${port}/api/status`);
  console.log(`===============================================`);
});

