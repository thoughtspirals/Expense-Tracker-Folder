import React, { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ExpenseContext } from "../../../Context/expenseContext";
import { UserContext } from "../../../Context/userContext";

const COLORS = ["#1e90ff", "#9b0000", "#32cd32"]; // Added a color for savings

const IncomeExpensePieChart = () => {
  const { monthlyIncome } = useContext(UserContext);
  const { totalExpense, remainingBudget } = useContext(ExpenseContext); // Assuming savings is available here

  const data = [
    { name: "Income", value: monthlyIncome },
    { name: "Expenses", value: totalExpense },
    { name: "Savings", value: remainingBudget }, // Add savings to the data
  ];

  return (
    <PieChart width={600} height={400} className="mx-2 p-2">
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default IncomeExpensePieChart;
