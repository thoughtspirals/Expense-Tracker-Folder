import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create UserContext
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Default to null to signify no user is logged in
  const [token, setToken] = useState(""); // Token for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false); // User authentication state
  const [isLoading, setIsLoading] = useState(true); // Set to true initially as we are loading user data
  const [updateUserData, setUpdateUserData] = useState(false); // Trigger updates
  const [resetToken, setResetToken] = useState(""); // Token for password reset flows
  const [currentUser, setCurrentUser] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(null);

  // Fetch user data when the app starts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/auth/current-user", {
          withCredentials: true, // Send credentials (cookies, etc.)
        });
        console.log("Fetched user data:", response.data);
        console.log("Income Monthly:", response.data.income_monthly);

        if (response.data) {
          setUser(response.data); // Set user data if found
          setIsAuthenticated(true); // Mark as authenticated
          setMonthlyIncome(response.data.income_monthly);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
        setIsAuthenticated(false); // Mark as not authenticated if an error occurs
      } finally {
        setIsLoading(false); // Set loading to false once the request is finished
      }
    };
    console.log("User data:", user);

    fetchUser();
  }, [updateUserData]);

  const clearContext = () => {
    setUser(null);
    setToken("");
    setIsAuthenticated(false);
    setUpdateUserData(false);
    setCurrentUser(null);
    setMonthlyIncome(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        updateUserData,
        setUpdateUserData,
        resetToken,
        setResetToken,
        clearContext,
        currentUser,
        setCurrentUser,
        monthlyIncome,
        setMonthlyIncome,
        // Provide the clearContext method
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
