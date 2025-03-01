import "./App.css";
import { Routes, Route } from "react-router-dom";

//Main pages
import Home from "./Components/Common/Home.jsx";
import Dashboard from "./Components/Common/Dashboard.jsx";

//Transactions
import ManageTransactions from "./Components/Transactions/manageTransactions.jsx";
import ExpensesPage from "./Components/Transactions/viewTransactions.jsx";
import DeleteTransactionsPage from "./Components/Transactions/deleteTransactions.jsx";
import UpdateTransactionsPage from "./Components/Transactions/updateTransactions.jsx";
import SetBudget from "./Components/Transactions/setBudget.jsx";
import CheckBudget from "./Components/Transactions/checkBudget.jsx";

//Ai
import BudgetAI from "./Components/AI/budgetAiAnalysis.jsx";
import AiInsights from "./Components/AI/aiInsights.jsx";

//Common components
import Header from "./Components/Reusables/header";

//Forms
import AddTransaction from "./Components/Forms/addTransactions.jsx";

//Authentication Api
import Register from "./Components/Auth/Register.jsx";
import Login from "./Components/Auth/Login.jsx";
//Context
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/userContext";

//Axios
import axios from "axios";

function App() {
  const { isAuthenticated, setCurrentUser, setIsAuthenticated } =
    useContext(UserContext);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("auth/current-user", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []); // Empty dependency array
  console.log("isAuthenticated", isAuthenticated);
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Private Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register-user" element={<Register />} />
            <Route path="/login-user" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<ManageTransactions />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/all-expenses" element={<ExpensesPage />} />
            <Route
              path="/delete-transactions"
              element={<DeleteTransactionsPage />}
            />
            <Route
              path="/update-transactions"
              element={<UpdateTransactionsPage />}
            />
            <Route path="/set-budget" element={<SetBudget />} />
            <Route path="/check-budget" element={<CheckBudget />} />
            <Route path="/ai-budget" element={<BudgetAI />} />
            <Route path="ai-insights" element={<AiInsights />} />
          </>
        ) : (
          <>
            {/* pages */}
            <Route path="/register-user" element={<Register />} />
            <Route path="/login-user" element={<Login />} />
            <Route path="/" element={<Home />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
