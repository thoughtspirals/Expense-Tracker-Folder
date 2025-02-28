import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Context/userContext";
import { ExpenseProvider } from "./Context/expenseContext";
import { InsightsProvider } from "./Context/InsightsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <BrowserRouter>
    <UserProvider>
      <ExpenseProvider>
        <InsightsProvider>
          <App />
        </InsightsProvider>
      </ExpenseProvider>
    </UserProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
