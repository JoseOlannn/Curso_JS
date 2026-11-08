import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal, Bot, User } from "lucide-react";
import { useGlobal } from "./context/global-context.jsx";
import { useOllamaHook } from "./api/useOllamaHook.js";

const schema = z.object({
  text: z.string().trim().min(2, "Ingresa al menos 2 caracteres"),
});

export default function App() {
  // Consumo del estado global mediante useGlobal (useContext)
  const { state, dispatch, saveHistory } = useGlobal();
  const ollamaHook = useOllamaHook();
  const bottomRef = useRef(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const messages = state.currentChat;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, ollamaHook.response]);

  const onSubmit = (data) => {
    const userMsg = { sender: "user", text: data.text };
    const updated = [...messages, userMsg];

    // Despacha la acción al contexto global
    dispatch({ type: "@current_chat", payload: updated });
    reset();

    ollamaHook.handleSubmit(data.text);
  };

  useEffect(() => {
    if (!ollamaHook.response) return;

    const updated = [...messages];
    const botIdx = [...updated].reverse().findIndex((m) => m.sender === "bot");

    if (botIdx !== -1) {
      const realIndex = updated.length - 1 - botIdx;
      updated[realIndex] = { ...updated[realIndex], text: ollamaHook.response };
    } else {
      updated.push({ sender: "bot", text: ollamaHook.response });
    }

    dispatch({ type: "@current_chat", payload: updated });
    saveHistory();
  }, [ollamaHook.response]);

  return (
    <main className="flex-1 flex flex-col justify-between h-screen overflow-hidden bg-gray-900 text-white">
      <header className="p-4 border-b border-gray-800 bg-gray-950 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">Estado Global con useContext</h2>
          <p className="text-xs text-gray-400">Sin prop drilling entre History y App</p>
        </div>
        <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded-full font-mono">
          GlobalContext.Provider
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-4">
            <p className="text-sm font-medium">No hay mensajes en este chat.</p>
            <p className="text-xs text-gray-500 mt-1">
              Escribe algo para despachar acciones a useReducer a través del Provider.
            </p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2.5 max-w-2xl ${
                m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === "user" ? "bg-blue-600" : "bg-purple-600"
                }`}
              >
                {m.sender === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div
                className={`px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-100 border border-gray-700"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <footer className="p-3 bg-gray-950 border-t border-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-1">
          <div className="flex bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              className="flex-1 px-4 py-2.5 bg-transparent text-sm focus:outline-none"
              {...register("text")}
            />
            <button
              type="submit"
              disabled={ollamaHook.loading}
              className="px-4 bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
          {errors.text && <p className="text-red-400 text-xs">{errors.text.message}</p>}
        </form>
      </footer>
    </main>
  );
}

