# 🚀 DevfSeek: Proyecto Full-Stack Integrado (React + Express + Ollama)

Este proyecto reúne e integra todas las etapas del curso en una única aplicación full-stack moderna y profesional:
- **Frontend:** React 19 + Vite + Tailwind CSS + React Hook Form + Zod + Context API (useContext & useReducer) + History Component.
- **Backend:** Servidor Express con endpoints REST, Hola Mundo, proxy de IA y almacenamiento JSON.
- **IA Local:** Integración con Ollama (modelo DevSeek / DeepSeek R1 1.5B) con fallback interactivo.

---

## 📂 Estructura del Proyecto

```text
proyecto-devfseek-completo/
├── express/                    # Servidor backend con Express
│   ├── server.js              # Servidor con endpoint 'Hola Mundo' y API REST
│   ├── package.json           # Dependencias de Express (cors, dotenv)
│   ├── db.json                # Base de datos ligera en formato JSON
│   └── .env                   # Variables de entorno (PORT, OLLAMA_HOST)
├── src/
│   ├── api/
│   │   ├── useOllamaHook.js   # Custom hook para interactuar con Ollama
│   │   └── ollama.md          # Guía de instalación de Ollama
│   ├── assets/
│   │   └── new-chat-icon.jsx  # Icono SVG para nuevo chat
│   ├── context/
│   │   └── global-context.jsx # Estado global con createContext y useReducer
│   ├── App.jsx                # Ventana principal del chat y React Hook Form
│   ├── History.jsx            # Barra lateral de historial de conversaciones
│   ├── index.css              # Estilos y configuración de Tailwind CSS
│   └── main.jsx               # Punto de entrada que envuelve con GlobalProvider
├── index.html                 # Plantilla HTML de Vite
├── vite.config.js             # Configuración de Vite con Tailwind CSS y Proxy
└── package.json               # Scripts y dependencias del frontend
```

---

## ⚡ Cómo ejecutar la aplicación

### 1. Iniciar el Backend (Servidor Express)
En una terminal:
```bash
cd "carpeta 5\proyecto-devfseek-completo"
npm run server
```
El servidor arrancará en `http://localhost:8080` (con endpoint `/` respondiendo **"Hola Mundo"**).

### 2. Iniciar el Frontend (React + Vite)
En otra terminal:
```bash
cd "carpeta 5\proyecto-devfseek-completo"
npm run dev
```
La aplicación abrirá en `http://localhost:3000` con comunicación automática con el backend.

---

## 🧠 ¿Cómo usar Ollama con IA local real?
Si deseas que las respuestas provengan de la red neuronal en local:
1. Instala Ollama desde [https://ollama.com/download](https://ollama.com/download).
2. En tu terminal ejecuta:
   ```bash
   ollama run deepseek-r1:1.5b
   ```
3. ¡Listo! Cualquier mensaje enviado en la interfaz será respondido por el modelo DeepSeek R1. Si Ollama no está activo, el sistema responderá en **modo demostración inteligente** sin romperse.

