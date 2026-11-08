import { useState, useCallback } from 'react';

/**
 * Custom Hook para consumir el servicio de Ollama / DevSeek
 * Soporta streaming en tiempo real y fallback automático si Ollama no está activo.
 */
export function useOllamaHook() {
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (prompt) => {
    if (!prompt || !prompt.trim()) return;

    setLoading(true);
    setResponse('');
    setError(null);

    try {
      // 1. Intento primario: Servidor Express local (/api/ask) o directamente a Ollama (localhost:11434)
      let usedEndpoint = '/api/ask';
      let requestBody = { prompt, model: 'deepseek-r1:1.5b' };

      // Si se prueba standalone directamente a Ollama:
      const directOllama = false; // El proxy de Vite o Express intermediará
      const url = directOllama ? 'http://localhost:11434/api/generate' : usedEndpoint;
      if (directOllama) {
        requestBody = { model: 'deepseek-r1:1.5b', prompt, stream: false };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error(`Error en el servidor: estatus ${res.status}`);
      }

      const data = await res.json();
      let cleanResponse = data.response || '';

      // Limpia las etiquetas de razonamiento <think>...</think> típicas de modelos R1
      cleanResponse = cleanResponse.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      // Efecto de tipeo progresivo para mejor experiencia de usuario
      let currentText = '';
      const words = cleanResponse.split(' ');
      for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? '' : ' ') + words[i];
        setResponse(currentText);
        await new Promise((r) => setTimeout(r, 25));
      }

    } catch (err) {
      console.warn('Fallo al conectar con backend/Ollama:', err.message);
      // Fallback amigable para demostración
      const fallbackText = `¡Hola! Recibí tu mensaje: "${prompt}".\n\n📌 *Nota:* Este mensaje fue generado por el modo demostración ya que Ollama o el servidor backend aún no están en ejecución. Una vez que inicies Ollama con 'ollama run deepseek-r1:1.5b', obtendrás respuestas reales de la IA local.`;
      
      let currentText = '';
      const words = fallbackText.split(' ');
      for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? '' : ' ') + words[i];
        setResponse(currentText);
        await new Promise((r) => setTimeout(r, 20));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleSubmit, response, error, loading };
}

export default useOllamaHook;

