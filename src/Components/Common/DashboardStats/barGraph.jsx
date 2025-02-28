import React, { useContext } from "react";
import { InsightsContext } from "../../../Context/InsightsContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ExpenseBarChart = () => {
  const { insights, loading, error } = useContext(InsightsContext);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching insights: {error.message}</p>;

  // Ensure we have at least 4 insights and extract only the categories and amounts
  const topCategories = insights.slice(0, 4).map((insight) => ({
    category: insight.category,
    amount: insight.amount, // Use the actual amount spent on each category
  }));

  return (
    <ResponsiveContainer width={600} height={400} className="mx-2 p-2">
      <BarChart data={topCategories}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#2a003e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;
