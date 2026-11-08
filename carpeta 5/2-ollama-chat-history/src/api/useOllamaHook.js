import { useState, useCallback } from 'react';

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
      // Intentar llamar a Ollama local
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek-r1:1.5b',
          prompt,
          stream: false,
        }),
      });

      if (!res.ok) throw new Error(`Ollama status ${res.status}`);

      const data = await res.json();
      let clean = (data.response || '').replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      // Efecto progresivo de tipeo
      let txt = '';
      const parts = clean.split(' ');
      for (let i = 0; i < parts.length; i++) {
        txt += (i === 0 ? '' : ' ') + parts[i];
        setResponse(txt);
        await new Promise((r) => setTimeout(r, 20));
      }
    } catch (err) {
      console.warn('Ollama no disponible en localhost:11434, activando fallback interactivo:', err.message);
      const demoAnswer = `¡Hola! Has consultado: "${prompt}".\n\n📌 *Nota de desarrollo:* Como Ollama no está ejecutándose en este momento en tu equipo, este hook customizado utiliza una simulación educativa para que puedas probar el flujo de mensajes y el historial sin bloqueos.`;
      
      let txt = '';
      const parts = demoAnswer.split(' ');
      for (let i = 0; i < parts.length; i++) {
        txt += (i === 0 ? '' : ' ') + parts[i];
        setResponse(txt);
        await new Promise((r) => setTimeout(r, 20));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleSubmit, response, error, loading };
}

export default useOllamaHook;

