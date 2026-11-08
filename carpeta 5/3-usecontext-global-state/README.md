# Entrega: State Management con useContext

## Propósito del Proyecto
Integrar el uso de `useContext` para gestionar el estado global de la aplicación.

## Objetivo
Comprender la importancia de `useContext` y cómo implementarlo en proyectos de React para evitar el prop drilling.

## Instrucciones cumplidas
1. **Crear un contexto utilizando `createContext`:**
   En `src/context/global-context.jsx` se crea `GlobalContext = createContext()`.
2. **Implementar un Provider que envuelva tu aplicación:**
   En `src/main.jsx` se envuelve el árbol de componentes dentro de `<GlobalProvider>...</GlobalProvider>`.
3. **Utilizar `useContext` en los componentes que necesiten acceder al estado:**
   - En `App.jsx` se invoca `useGlobal()` para despachar `@current_chat` y `@save_history`.
   - En `History.jsx` se invoca `useGlobal()` para leer la lista de chats `state.messages`, seleccionar conversaciones archivadas y crear nuevos chats.

---

## Cómo ejecutar

1. Navega a la carpeta:
   ```bash
   cd "carpeta 5\3-usecontext-global-state"
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia la app:
   ```bash
   npm run dev
   ```

