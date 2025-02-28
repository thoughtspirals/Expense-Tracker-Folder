import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create ExpenseContext
const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newExpense, setNewExpense] = useState({});
  const [editExpense, setEditExpense] = useState({});
  const [deleteExpense, setDeleteExpense] = useState(false);
  const [totalExpense, setTotalExpense] = useState(null);
  const [budget, setBudget] = useState(null);
  const [remainingBudget, setRemainingBudget] = useState(null);
  const [previousSavings, setPreviousSavings] = useState(null);

  // Fetch user's expenses & budget
  useEffect(() => {
    const fetchCurrentExpenses = async () => {
      try {
        const response = await axios.get("/expense/all-expenses", {
          withCredentials: true,
        });
        setExpenses(response.data.expenses);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentBudget = async () => {
      try {
        const month = new Date().getMonth() + 1; // Get current month (1-based index)
        const year = new Date().getFullYear();
        const response = await axios.get(
          `/budget/check-budget?month=${month}&year=${year}`,
          {
            withCredentials: true,
          }
        );
        setBudget(response.data.budget_amount || 0);
        setTotalExpense(response.data.total_spent || 0);
        setRemainingBudget(response.data.remaining_budget || 0);
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };

    const fetchPreviousBudget = async () => {
      try {
        const month = new Date().getMonth(); // Get current month (1-based index)
        const year = new Date().getFullYear();
        const response = await axios.get(
          `/budget/check-budget?month=${month}&year=${year}`,
          {
            withCredentials: true,
          }
        );

        setPreviousSavings(response.data.remaining_budget || 0);
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };

    fetchCurrentExpenses();
    fetchCurrentBudget();
    fetchPreviousBudget();
  }, []);

  const clearContext = () => {
    setExpenses([]); // Reset to empty array instead of null
    setFilteredExpenses([]);
    setError(null);
    setNewExpense({});
    setEditExpense({});
    setDeleteExpense(false);
    setTotalExpense(null);
    setBudget(null);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        filteredExpenses,
        setFilteredExpenses,
        loading,
        setLoading,
        error,
        setError,
        newExpense,
        setNewExpense,
        editExpense,
        setEditExpense,
        deleteExpense,
        setDeleteExpense,
        totalExpense,
        budget,
        clearContext,
        setRemainingBudget,
        remainingBudget,
        previousSavings,
        setPreviousSavings,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext, ExpenseProvider };
