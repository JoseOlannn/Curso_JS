import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal, Bot, User, Sparkles } from "lucide-react";

// Esquema de validación usando Zod
const formSchema = z.object({
  text: z
    .string()
    .trim()
    .min(3, "El mensaje debe tener al menos 3 caracteres")
    .max(300, "El mensaje no puede exceder 300 caracteres"),
});

export default function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "¡Hola! Bienvenido a la Parte 1 del proyecto. Aquí hemos integrado Tailwind CSS para los estilos y React Hook Form con Zod para la validación.",
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { text: "" },
  });

  const onSubmit = (data) => {
    // 1. Agregar mensaje del usuario
    const newMsg = { sender: "user", text: data.text };
    setMessages((prev) => [...prev, newMsg]);
    reset();

    // 2. Simular respuesta para demostrar reactividad
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Recibido con validación de React Hook Form: "${data.text}"`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white justify-between">
      {/* Header */}
      <header className="p-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Proyecto Parte 1</h1>
            <p className="text-xs text-gray-400">Tailwind CSS + React Hook Form</p>
          </div>
        </div>
        <span className="text-xs bg-blue-900/50 text-blue-300 border border-blue-700/50 px-3 py-1 rounded-full font-mono">
          Rama: parte-1
        </span>
      </header>

      {/* Lista de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl w-full mx-auto">
        {messages.map((msg, index) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={index}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
              )}
              <div
                className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  isUser
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700"
                }`}
              >
                {msg.text}
              </div>
              {isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <User size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Formulario con React Hook Form */}
      <footer className="p-4 bg-gray-950 border-t border-gray-800">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto flex flex-col space-y-2"
        >
          <div className="flex items-center bg-gray-800 rounded-xl border border-gray-700 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 overflow-hidden">
            <input
              type="text"
              placeholder="Escribe un mensaje (mínimo 3 caracteres)..."
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
              {...register("text")}
            />
            <button
              type="submit"
              className="m-1.5 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition cursor-pointer"
              title="Enviar"
            >
              <SendHorizontal size={18} />
            </button>
          </div>

          {errors.text && (
            <span className="text-red-400 text-xs font-medium pl-1">
              ⚠️ {errors.text.message}
            </span>
          )}
        </form>
      </footer>
    </div>
  );
}

