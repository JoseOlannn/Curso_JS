import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal, Bot, User } from "lucide-react";
import History from "./History.jsx";
import { useOllamaHook } from "./api/useOllamaHook.js";

const schema = z.object({
  text: z.string().trim().min(2, "Escribe al menos 2 caracteres"),
});

export default function App() {
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem("devf_entrega2_history");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentChat, setCurrentChat] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const ollamaHook = useOllamaHook();
  const bottomRef = useRef(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat, ollamaHook.response]);

  const onSubmit = (data) => {
    const userMsg = { sender: "user", text: data.text };
    setCurrentChat((prev) => [...prev, userMsg]);
    reset();
    ollamaHook.handleSubmit(data.text);
  };

  useEffect(() => {
    if (!ollamaHook.response) return;

    setCurrentChat((prev) => {
      const copy = [...prev];
      const botIdx = [...copy].reverse().findIndex((m) => m.sender === "bot");
      if (botIdx !== -1) {
        const idx = copy.length - 1 - botIdx;
        copy[idx] = { ...copy[idx], text: ollamaHook.response };
      } else {
        copy.push({ sender: "bot", text: ollamaHook.response });
      }
      return copy;
    });
  }, [ollamaHook.response]);

  const handleNewChat = () => {
    if (currentChat.length > 0) {
      const firstMsg = currentChat.find((m) => m.sender === "user")?.text || "Consulta";
      const newEntry = {
        title: firstMsg.substring(0, 25),
        messages: currentChat,
      };
      const updated = [newEntry, ...chatHistory];
      setChatHistory(updated);
      localStorage.setItem("devf_entrega2_history", JSON.stringify(updated));
    }
    setCurrentChat([]);
    setActiveIndex(null);
  };

  const handleSelectChat = (index) => {
    setActiveIndex(index);
    setCurrentChat(chatHistory[index]?.messages || []);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900 text-white font-sans">
      <History
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        activeIndex={activeIndex}
      />

      <main className="flex-1 flex flex-col justify-between overflow-hidden">
        <header className="p-4 border-b border-gray-800 bg-gray-950 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-200">
            Clon ChatGPT con Ollama & DevSeek
          </span>
          <span className="text-xs bg-emerald-900/60 text-emerald-400 border border-emerald-700 px-3 py-1 rounded-full">
            Entrega 2
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {currentChat.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
              Escribe una pregunta para consultar al modelo DevSeek R1...
            </div>
          ) : (
            currentChat.map((m, i) => (
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
                    m.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100 border border-gray-700"
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
                placeholder="Pregunta algo al modelo Ollama..."
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
            {errors.text && (
              <p className="text-red-400 text-xs">{errors.text.message}</p>
            )}
          </form>
        </footer>
      </main>
    </div>
  );
}

