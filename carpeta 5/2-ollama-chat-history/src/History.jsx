import React from "react";
import { NewChatIcon } from "./assets/new-chat-icon.jsx";
import { MessageSquare, Bot } from "lucide-react";

export default function History({ chatHistory = [], onSelectChat, onNewChat, activeIndex }) {
  return (
    <aside className="w-64 bg-gray-950 text-gray-200 border-r border-gray-800 flex flex-col h-screen select-none">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Bot size={22} />
          </div>
          <div>
            <h1 className="font-bold text-base text-white">DevfSeek</h1>
            <p className="text-xs text-gray-400">Entrega 2: Ollama & History</p>
          </div>
        </div>

        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow cursor-pointer"
        >
          <NewChatIcon className="w-5 h-5" />
          <span>Nuevo chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Historial de consultas
        </div>
        {chatHistory.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-xs px-2">
            No hay consultas previas. Envía un mensaje y haz clic en "Nuevo chat".
          </div>
        ) : (
          chatHistory.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectChat && onSelectChat(idx)}
              className={`flex items-center gap-2 p-2 rounded-lg text-sm transition cursor-pointer ${
                activeIndex === idx
                  ? "bg-gray-800 text-white border-l-4 border-blue-500"
                  : "hover:bg-gray-900 text-gray-300"
              }`}
            >
              <MessageSquare size={16} className="text-blue-400 shrink-0" />
              <span className="truncate">{item.title}</span>
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t border-gray-800 text-xs text-gray-500 text-center">
        Componente History • DevF
      </div>
    </aside>
  );
}

