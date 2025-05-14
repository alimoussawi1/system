import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // <-- Switch from BrowserRouter to HashRouter
import App from "./App";
import "./index.css";
import { AccountProvider } from "./context/AccountContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <AccountProvider>
        <App />
      </AccountProvider>

    </HashRouter>
  </React.StrictMode>
);
