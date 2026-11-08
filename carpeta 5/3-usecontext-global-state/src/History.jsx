import React from "react";
import { NewChatIcon } from "./assets/new-chat-icon.jsx";
import { useGlobal } from "./context/global-context.jsx";
import { MessageSquare, Trash2, Bot } from "lucide-react";

export default function History() {
  // Consumiendo el estado global mediante useGlobal (useContext)
  const { state, newChat, selectChat, deleteChat } = useGlobal();

  return (
    <aside className="w-64 bg-gray-950 text-gray-200 border-r border-gray-800 flex flex-col h-screen select-none">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Bot size={22} />
          </div>
          <div>
            <h1 className="font-bold text-base text-white">DevfSeek</h1>
            <p className="text-xs text-gray-400">Entrega 3: useContext</p>
          </div>
        </div>

        <button
          onClick={newChat}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow cursor-pointer"
        >
          <NewChatIcon className="w-5 h-5" />
          <span>Nuevo chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Historial Global
        </div>
        {state.messages.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-xs px-2">
            Sin sesiones previas.
          </div>
        ) : (
          state.messages.map((chat) => {
            const isActive = state.activeChatId === chat.id;
            return (
              <div
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`group flex items-center justify-between p-2 rounded-lg text-sm transition cursor-pointer ${
                  isActive
                    ? "bg-gray-800 text-white border-l-4 border-blue-500"
                    : "hover:bg-gray-900 text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2 truncate flex-1">
                  <MessageSquare size={16} className={isActive ? "text-blue-400" : "text-gray-500"} />
                  <span className="truncate">{chat.title}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-gray-800 text-xs text-gray-500 text-center">
        useContext & useReducer • DevF
      </div>
    </aside>
  );
}

