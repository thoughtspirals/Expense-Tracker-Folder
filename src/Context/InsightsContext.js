import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create InsightsContext
const InsightsContext = createContext();

const InsightsProvider = ({ children }) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's insights
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const month = new Date().getMonth() + 1; // Get current month (1-based index)
        const year = new Date().getFullYear();
        const response = await axios.get(
          `/insights/get-insights?month=${month}&year=${year}`,
          {
            withCredentials: true,
          }
        );
        // Set insights to the top_categories array from the response
        setInsights(response.data.top_categories);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
      console.log("Insights fetched:", insights);
    };
    fetchInsights();
  }, []);

  return (
    <InsightsContext.Provider value={{ insights, loading, error }}>
      {children}
    </InsightsContext.Provider>
  );
};

export { InsightsContext, InsightsProvider };
