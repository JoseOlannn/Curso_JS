# Guía de Instalación y Uso de Ollama

1. Descarga el instalador desde: https://ollama.com/download
2. En tu terminal ejecuta el modelo ligero DevSeek / DeepSeek R1:
   ```bash
   ollama run deepseek-r1:1.5b
   ```
3. Verifica que esté activo en `http://localhost:11434`.
4. El hook `useOllamaHook.js` enviará las preguntas directamente a la API de generación de Ollama y gestionará la respuesta.

