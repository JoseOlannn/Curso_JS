import React, { createContext, useContext, useReducer, useEffect } from "react";

// 1. Crear el contexto global
const GlobalContext = createContext();

const STORAGE_KEY = "devf_context_history";

const initialState = {
  messages: [],
  currentChat: [],
  activeChatId: null,
};

function globalReducer(state, action) {
  switch (action.type) {
    case "@current_chat":
      return {
        ...state,
        currentChat: action.payload,
      };

    case "@save_history": {
      if (!state.currentChat || state.currentChat.length === 0) return state;

      const firstText = state.currentChat[0]?.text || "Conversación";
      const newEntry = {
        id: state.activeChatId || crypto.randomUUID(),
        title: firstText.length > 28 ? firstText.substring(0, 28) + "..." : firstText,
        content: state.currentChat,
        timestamp: new Date().toLocaleDateString(),
      };

      const existing = state.messages.findIndex((m) => m.id === newEntry.id);
      let updated = [];
      if (existing >= 0) {
        updated = [...state.messages];
        updated[existing] = newEntry;
      } else {
        updated = [newEntry, ...state.messages];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return {
        ...state,
        messages: updated,
        activeChatId: newEntry.id,
      };
    }

    case "@load_messages": {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      return { ...state, messages: parsed };
    }

    case "@select_chat": {
      const found = state.messages.find((c) => c.id === action.payload);
      if (!found) return state;
      return {
        ...state,
        activeChatId: found.id,
        currentChat: found.content || [],
      };
    }

    case "@new_chat":
      return {
        ...state,
        activeChatId: null,
        currentChat: [],
      };

    case "@delete_chat": {
      const filtered = state.messages.filter((c) => c.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return {
        ...state,
        messages: filtered,
        currentChat: state.activeChatId === action.payload ? [] : state.currentChat,
        activeChatId: state.activeChatId === action.payload ? null : state.activeChatId,
      };
    }

    default:
      throw new Error(`Acción no manejada: ${action.type}`);
  }
}

// 2. Implementar un Provider que envuelva tu aplicación
export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

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

// 3. Utilizar useContext en los componentes que necesiten acceder al estado
export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debe ser utilizado dentro de un GlobalProvider");
  }
  return context;
}

export default GlobalContext;

