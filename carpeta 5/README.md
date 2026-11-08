# Carpeta 5: Proyecto FrontEnd Avanzado con React y Express (DevfSeek)

Este directorio contiene la solución completa, modular y paso a paso a todas las actividades y entregas del proyecto **DevfSeek** (basado en el repositorio de referencia `https://github.com/carlosDevf/DevfSeek`).

---

## 📋 Estructura de Actividades

| Carpeta | Actividad / Entrega | Tecnologías Clave |
|---------|---------------------|-------------------|
| [`1-frontend-tailwind-hookform/`](./1-frontend-tailwind-hookform/) | **Parte 1:** Configuración inicial, Tailwind CSS y validación de formularios | React 19, Tailwind CSS v4, React Hook Form, Zod |
| [`2-ollama-chat-history/`](./2-ollama-chat-history/) | **Segunda Entrega:** Clon básico de ChatGPT con Ollama y DevSeek | Custom Hook `useOllamaHook`, Componente `History` |
| [`3-usecontext-global-state/`](./3-usecontext-global-state/) | **Entrega de Estado Global:** Gestión de estado con `useContext` | `createContext`, `GlobalProvider`, `useReducer`, `useGlobal` |
| [`4-servidor-express/`](./4-servidor-express/) | **Tercera Entrega:** Servidor Express básico y 'Hola Mundo' | Express, Middlewares (JSON, CORS), endpoints REST, pruebas automatizadas |
| [`proyecto-devfseek-completo/`](./proyecto-devfseek-completo/) | **Proyecto Unificado:** Aplicación Full-Stack Completa | Frontend React + Backend Express + Ollama IA + Persistencia |

---

## 🛠️ Resumen de cada Entrega

### 1. Proyecto de FrontEnd Avanzado con React - Parte 1
- **Propósito:** Configurar Tailwind CSS para el diseño visual y React Hook Form con validación de formularios mediante Zod (mínimo 3 caracteres, longitud máxima, control de errores reactivo).
- **Cómo probarlo:**
  ```bash
  cd "1-frontend-tailwind-hookform"
  npm install
  npm run dev
  ```

### 2. Segunda Entrega: Clon de ChatGPT / DevSeek con Ollama
- **Propósito:** Integrar la funcionalidad de IA mediante el Custom Hook `useOllamaHook` para comunicarse con la API de Ollama (`/api/generate`) y agregar el componente `History` para visualizar y seleccionar consultas archivadas.
- **Modo Demostración:** Cuenta con simulación inteligente para probar el flujo sin necesidad de tener Ollama encendido.
- **Cómo probarlo:**
  ```bash
  cd "2-ollama-chat-history"
  npm install
  npm run dev
  ```

### 3. Entrega de Estado Global: `useContext`
- **Propósito:** Evitar el *prop drilling* creando un contexto global con `createContext`, un componente proveedor `<GlobalProvider>` que envuelve la app y el hook `useContext` consumido en `App.jsx` y `History.jsx`.
- **Cómo probarlo:**
  ```bash
  cd "3-usecontext-global-state"
  npm install
  npm run dev
  ```

### 4. Tercera Entrega: Servidor Express ('Hola Mundo')
- **Propósito:** Crear un servidor backend con Node.js y Express que responda con un endpoint `'Hola Mundo'`, gestione datos en formato JSON (`/data`), sirva el historial (`/api/messages`) y actúe como pasarela hacia Ollama (`/api/ask`).
- **Cómo probarlo:**
  ```bash
  cd "4-servidor-express"
  npm install
  npm start
  ```
  Abre [http://localhost:8080](http://localhost:8080) en el navegador para ver `'Hola Mundo'`.
- **Pruebas automáticas:**
  ```bash
  npm test
  ```

### 5. Proyecto DevfSeek Full-Stack Integrado
- **Propósito:** Unifica el frontend y el backend en un entorno de desarrollo continuo con proxy en Vite hacia Express.
- **Cómo probarlo:**
  ```bash
  cd "proyecto-devfseek-completo"
  # Terminal 1: Iniciar el servidor Express
  npm run server

  # Terminal 2: Iniciar la interfaz en React
  npm run dev
  ```

---

## 🌿 ¿Cómo subir a tu propio repositorio de GitHub con ramas?

Las instrucciones de la Parte 1 piden trabajar en un repositorio propio y crear ramas como `parte-1`:

1. Si deseas generar automáticamente un repositorio con las ramas `main`, `parte-1`, `parte-2`, `parte-3` y `parte-4`, puedes ejecutar en PowerShell:
   ```powershell
   .\crear-repo-con-ramas.ps1
   ```
2. O manualmente:
   ```bash
   git checkout -b parte-1
   git add .
   git commit -m "feat(parte-1): Tailwind CSS y React Hook Form"
   git push origin parte-1
   ```

