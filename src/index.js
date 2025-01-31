import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // <-- Switch from BrowserRouter to HashRouter
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
