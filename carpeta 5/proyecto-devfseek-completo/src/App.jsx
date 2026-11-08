import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal, Bot, User, Sparkles } from "lucide-react";
import { useGlobal } from "./context/global-context.jsx";
import { useOllamaHook } from "./api/useOllamaHook.js";

// Esquema de validación estricto con Zod para React Hook Form
const messageSchema = z.object({
  text: z
    .string()
    .trim()
    .min(3, "El mensaje debe tener al menos 3 caracteres")
    .max(500, "El mensaje no puede superar 500 caracteres"),
});

export default function App() {
  const { state, dispatch, saveHistory } = useGlobal();
  const ollamaHook = useOllamaHook();
  const messagesEndRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: { text: "" },
  });

  // Mensajes de la conversación actual desde el estado global
  const messages = state.currentChat;

  // Scroll automático hacia el mensaje más reciente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, ollamaHook.response]);

  // Al enviar el formulario
  const onSubmit = (data) => {
    const userMessage = { text: data.text, sender: "user", timestamp: new Date().toLocaleTimeString() };
    const updatedMessages = [...messages, userMessage];

    // Actualiza el estado global de la conversación activa
    dispatch({ type: "@current_chat", payload: updatedMessages });
    reset();

    // Dispara la consulta al hook de Ollama
    ollamaHook.handleSubmit(data.text);
  };

  // Cuando el bot va generando la respuesta (streaming o chunks)
  useEffect(() => {
    if (!ollamaHook.response) return;

    const updated = [...messages];
    const lastBotIndex = [...updated].reverse().findIndex((m) => m.sender === "bot");

    if (lastBotIndex !== -1) {
      const realIndex = updated.length - 1 - lastBotIndex;
      updated[realIndex] = {
        ...updated[realIndex],
        text: ollamaHook.response,
      };
    } else {
      updated.push({
        text: ollamaHook.response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    dispatch({ type: "@current_chat", payload: updated });
    // Guardar periódicamente en historial para no perder datos
    dispatch({ type: "@save_history" });
  }, [ollamaHook.response]);

  // Sugerencias rápidas cuando el chat está vacío
  const suggestions = [
    "¿Qué es React Hook Form y cuáles son sus ventajas?",
    "Explica cómo funciona useContext y cuándo usarlo",
    "¿Qué es un servidor Express y qué papel cumple un middleware?",
  ];

  const handleSuggestionClick = (text) => {
    onSubmit({ text });
  };

  return (
    <main className="flex flex-col h-screen flex-1 bg-gray-900 text-gray-100 overflow-hidden">
      {/* Barra superior de estado */}
      <header className="px-6 py-3.5 border-b border-gray-800 bg-gray-950/80 backdrop-blur flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-medium text-gray-300">
            Modelo activo: <strong className="text-white">DevSeek R1 (1.5B)</strong>
          </span>
        </div>
        <div className="text-xs text-gray-400">
          Entregas: <span className="text-blue-400 font-mono">Tailwind • Hook Form • Context • Express</span>
        </div>
      </header>

      {/* Área de mensajes con scroll */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-4 ring-1 ring-blue-500/30">
              <Sparkles size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">DevfSeek Chatbot</h2>
            <p className="text-sm text-gray-400 mb-6">
              Tu asistente de desarrollo con React, Tailwind, React Hook Form, Context API, Express y Ollama.
            </p>

            <div className="w-full space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-left mb-1">
                Preguntas de ejemplo:
              </p>
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(sug)}
                  className="w-full text-left p-3 text-xs bg-gray-800/80 hover:bg-gray-800 border border-gray-700/60 rounded-lg text-gray-200 transition hover:border-blue-500/50 cursor-pointer"
                >
                  💬 {sug}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={index}
                className={`flex gap-3 max-w-3xl ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                    isUser ? "bg-blue-600" : "bg-purple-600"
                  }`}
                >
                  {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Burbuja del mensaje */}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? "bg-blue-600 text-white rounded-tr-none shadow-md"
                      : "bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700/70 shadow"
                  }`}
                >
                  {msg.text}
                  {ollamaHook.loading && !isUser && index === messages.length - 1 && (
                    <span className="inline-block ml-2 w-2 h-4 bg-blue-400 animate-pulse"></span>
                  )}
                  {msg.timestamp && (
                    <div
                      className={`text-[10px] mt-1.5 text-right ${
                        isUser ? "text-blue-200" : "text-gray-400"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulario de entrada validado con React Hook Form */}
      <footer className="p-4 bg-gray-950/90 border-t border-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-1">
          <div className="relative flex items-center bg-gray-800/90 rounded-xl border border-gray-700 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
            <input
              type="text"
              autoComplete="off"
              placeholder="Haz una pregunta o envía un mensaje a DevSeek..."
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none"
              {...register("text")}
            />
            <button
              type="submit"
              disabled={ollamaHook.loading}
              className={`m-1.5 p-2 rounded-lg text-white transition cursor-pointer ${
                ollamaHook.loading
                  ? "bg-gray-700 opacity-50 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 shadow"
              }`}
              title="Enviar mensaje"
            >
              <SendHorizontal size={18} />
            </button>
          </div>

          {/* Mensaje de error de validación de React Hook Form */}
          {errors.text && (
            <p className="text-red-400 text-xs px-1 font-medium animate-fadeIn">
              ⚠️ {errors.text.message}
            </p>
          )}
        </form>
      </footer>
    </main>
  );
}

