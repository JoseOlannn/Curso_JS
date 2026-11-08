import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import History from "./History.jsx";
import { GlobalProvider } from "./context/global-context.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-900 font-sans">
        {/* Barra lateral de historial */}
        <History />
        {/* Ventana principal de chat y formulario */}
        <App />
      </div>
    </GlobalProvider>
  </StrictMode>
);

