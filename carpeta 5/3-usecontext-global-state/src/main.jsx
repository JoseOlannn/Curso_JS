import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import History from "./History.jsx";
import { GlobalProvider } from "./context/global-context.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 2. Implementar un Provider que envuelva tu aplicación */}
    <GlobalProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-900 font-sans">
        <History />
        <App />
      </div>
    </GlobalProvider>
  </StrictMode>
);

