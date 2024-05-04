import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./store/auth-context.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExpenseContextProvider } from "./store/expense-context.jsx";

import { Provider } from "react-redux";
import store from "./store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ExpenseContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ExpenseContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
