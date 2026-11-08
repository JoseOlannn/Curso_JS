import React, { createContext, useContext, useReducer, useEffect } from "react";

// 1. Crear el contexto global
const GlobalContext = createContext();

const STORAGE_KEY = "devfseek_history";

// Estado inicial
const initialState = {
  messages: [],     // Historial de chats guardados: [ { id, title, content, date } ]
  currentChat: [],  // Mensajes de la conversación activa: [ { text, sender } ]
  activeChatId: null,
};

// Reducer para gestionar las transiciones de estado
function globalReducer(state, action) {
  switch (action.type) {
    case "@current_chat": {
      return {
        ...state,
        currentChat: action.payload,
      };
    }

    case "@save_history": {
      if (!state.currentChat || state.currentChat.length === 0) {
        return state;
      }

      // El título se toma del primer mensaje del usuario o del chat
      const firstUserMsg = state.currentChat.find((m) => m.sender === "user")?.text || "Nuevo Chat";
      const title = firstUserMsg.length > 30 ? firstUserMsg.substring(0, 30) + "..." : firstUserMsg;

      const newChatItem = {
        id: state.activeChatId || crypto.randomUUID(),
        title,
        content: state.currentChat,
        date: new Date().toLocaleDateString(),
      };

      // Si ya existía se actualiza, si no, se antepone
      const existingIndex = state.messages.findIndex((m) => m.id === newChatItem.id);
      let updatedMessages = [];
      if (existingIndex >= 0) {
        updatedMessages = [...state.messages];
        updatedMessages[existingIndex] = newChatItem;
      } else {
        updatedMessages = [newChatItem, ...state.messages];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));

      return {
        ...state,
        messages: updatedMessages,
        activeChatId: newChatItem.id,
      };
    }

    case "@load_messages": {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const parsed = stored ? JSON.parse(stored) : [];
        return {
          ...state,
          messages: parsed,
        };
      } catch (err) {
        console.error("Error al cargar historial desde localStorage:", err);
        return state;
      }
    }

    case "@select_chat": {
      const selected = state.messages.find((c) => c.id === action.payload);
      if (!selected) return state;
      return {
        ...state,
        activeChatId: selected.id,
        currentChat: selected.content || [],
      };
    }

    case "@new_chat": {
      return {
        ...state,
        activeChatId: null,
        currentChat: [],
      };
    }

    case "@delete_chat": {
      const updatedMessages = state.messages.filter((c) => c.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
      return {
        ...state,
        messages: updatedMessages,
        currentChat: state.activeChatId === action.payload ? [] : state.currentChat,
        activeChatId: state.activeChatId === action.payload ? null : state.activeChatId,
      };
    }

    default:
      throw new Error(`Acción no reconocida en globalReducer: ${action.type}`);
  }
}

// 2. Implementar el Provider que envuelve la aplicación
export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  // Carga inicial del historial almacenado
  useEffect(() => {
    dispatch({ type: "@load_messages" });
  }, []);

  const value = {
    state,
    dispatch,
    newChat: () => dispatch({ type: "@new_chat" }),
    saveHistory: () => dispatch({ type: "@save_history" }),
    selectChat: (id) => dispatch({ type: "@select_chat", payload: id }),
    deleteChat: (id) => dispatch({ type: "@delete_chat", payload: id }),
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

// 3. Custom Hook que expone el contexto
export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal debe ser utilizado dentro de un GlobalProvider");
  }
  return context;
}

export default GlobalContext;

