import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ user }) => {
  // Safely get categorywise or provide default values
  console.log('Inside pie chart',user.categorywise);
  
  const categorywise = user.categorywise || {
    Grocery: 0,
    Restaurants: 0,
    Commute: 0,
    Bills: 0,
    Stationary: 0,
    Trips: 0,
    Miscellaneous: 0,
  };

  const categoryWiseValues = Object.values(categorywise );
  console.log(categoryWiseValues);
  
  // Validate the data is an array of numbers
  const isValidData =
    Array.isArray(categoryWiseValues) &&
    categoryWiseValues.every((value) => typeof value === "number");

  const data = {
    labels: [
      "Grocery",
      "Restaurants",
      "Commute",
      "Bills",
      "Stationary",
      "Trips",
      "Miscellaneous",
    ],
    datasets: [
      {
        data: isValidData ? categoryWiseValues : [0, 0, 0, 0, 0, 0, 0], // Default to 0 if invalid
        backgroundColor: [
          "#FF6384", 
          "#36A2EB", 
          "#FFCE56", 
          "#4BC0C0", 
          "#9966FF", 
          "#FF9F40",
          "#E7E9ED",  
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: "400px", margin: "0px auto" }}>
      <Pie data={data} options={options} className="translate-y-[-10%]" />
    </div>
  );
};

export default PieChartComponent;
