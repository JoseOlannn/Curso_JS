# Segunda Entrega: Clon de ChatGPT / DevSeek con Ollama

## Objetivo
Integrar la funcionalidad de IA a través de la instalación de Ollama y la creación de componentes que permitan gestionar el historial de interacciones.

## Instrucciones cumplidas
1. **Instalación de Ollama:** Documentada paso a paso en `src/api/ollama.md`.
2. **Descarga del modelo DevSeek R1:** Indicaciones para correr `ollama run deepseek-r1:1.5b`.
3. **Custom Hook `useOllamaHook`:** Implementado en `src/api/useOllamaHook.js` para consumir la API de generación de Ollama y con fallback interactivo.
4. **Componente `History`:** Implementado en `src/History.jsx` con botón de nuevo chat y listado de consultas archivadas.
5. **Manejo de estado:** Gestión de mensajes actuales y archivo en historial persistente.

---

## Cómo ejecutar

1. Navega a la carpeta:
   ```bash
   cd "carpeta 5\2-ollama-chat-history"
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia la app:
   ```bash
   npm run dev
   ```

