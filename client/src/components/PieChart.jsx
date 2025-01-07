// Install Chart.js and react-chartjs-2 if not already installed
// npm install chart.js react-chartjs-2

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({user}) => {

  let categorywise = user?.categorywise;
  const categoryWiseValues = Object.values(categorywise);
  

  const data = {
    labels: [
      "Grocery",
      "Restaurants",
      "Commute",
      "Bills",
      "Stationary",
      "Trips",
      "Miscellaneous"
    ],
    datasets: [
      {
        
        data: categoryWiseValues, // Example data values
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
          "#9966FF", // Purple
          "#FF9F40", // Orange
          "#E7E9ED"  // Gray
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        enabled: true,
      }
    }
  };

  return (
    <div style={{ width: "400px", margin: "0px auto" }}>
      
      <Pie data={data} options={options}  className=" translate-y-[-10%]"/>
    </div>
  );
};

export default PieChartComponent;