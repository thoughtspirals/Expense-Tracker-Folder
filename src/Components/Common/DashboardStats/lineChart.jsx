import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const MonthlyTrendsChart = () => {
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyTrends = async () => {
      try {
        const year = new Date().getFullYear();
        const response = await axios.get(
          `/expense/monthly-trends?year=${year}`,
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", response.data); // Log the response
        setMonthlyTrends(response.data.monthly_trends); // Ensure this is an array
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyTrends();
  }, []); // Empty dependency array means this runs once on mount

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching trends: {error.message}</p>;

  // Check if monthlyTrends is an array
  if (!Array.isArray(monthlyTrends)) {
    console.error("monthlyTrends is not an array:", monthlyTrends);
    return <p>No data available</p>; // Handle the case where data is not available
  }

  // Transform the data for the chart
  const chartData = monthlyTrends.map((item) => ({
    month: `${item._id.month}/${item._id.year}`, // Format month/year for display
    totalSpent: item.total_spent, // Use the total_spent value
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalSpent" stroke="#121499" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyTrendsChart;
