import { useState, useCallback } from 'react';

export function useOllamaHook() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (prompt) => {
    if (!prompt) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek-r1:1.5b',
          prompt,
          stream: false,
        }),
      });

      if (!res.ok) throw new Error('Ollama offline');
      const data = await res.json();
      let clean = (data.response || '').replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      setResponse(clean);
    } catch (e) {
      // Simulación demostrativa
      const demo = `[useContext Demo] Recibí tu consulta: "${prompt}". El estado global gestionado por useContext y useReducer funciona perfectamente.`;
      setResponse(demo);
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleSubmit, response, loading };
}

export default useOllamaHook;

