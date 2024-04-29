import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./store/auth-context.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExpenseContextProvider } from "./store/expense-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ExpenseContextProvider>
        <App />
      </ExpenseContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
