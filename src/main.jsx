import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // 🚀 CORRECCIÓN: Llama a App, que es el que sabe dónde está Home
import "./style/reset.css";
import "./style/theme.css";
import "./style/globals.css";
import "./style/cards.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
