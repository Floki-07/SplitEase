import React from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseAnalyticsDashboard = () => {
  // Sample data (you would replace this with actual data from your app)
  const monthlyExpenseData = [
    { month: 'Jan', total: 1500, food: 400, transport: 300, entertainment: 250, utilities: 550 },
    { month: 'Feb', total: 1600, food: 450, transport: 280, entertainment: 300, utilities: 570 },
    { month: 'Mar', total: 1450, food: 380, transport: 320, entertainment: 200, utilities: 550 },
  ];

  const categoryBreakdown = [
    { name: 'Food', value: 1230 },
    { name: 'Transport', value: 900 },
    { name: 'Entertainment', value: 750 },
    { name: 'Utilities', value: 1670 },
  ];

  const billSplittingData = [
    { friend: 'Alex', totalOwed: 450, settled: 250, pending: 200 },
    { friend: 'Sam', totalOwed: 350, settled: 300, pending: 50 },
    { friend: 'Jordan', totalOwed: 600, settled: 400, pending: 200 },
  ];

  return (
    <div 
      className="p-4 text-white min-h-screen flex flex-col "
      style={{
        background: '#050D35',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <h1 className="text-2xl font-bold mb-6">Expense Analytics</h1>

     <div className='flex gap-10 flex-wrap'>
     <div className="
     ">
       {/* Expense Trends */}
       <div className="bg-[#121944] text-white rounded-lg p-4 mb-6 w-[500px]">
        <h2 className="text-lg font-bold mb-4">Monthly Expense Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyExpenseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="food" stackId="a" fill="#8884d8" />
            <Bar dataKey="transport" stackId="a" fill="#82ca9d" />
            <Bar dataKey="entertainment" stackId="a" fill="#ffc658" />
            <Bar dataKey="utilities" stackId="a" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div className="bg-[#121944] text-white rounded-lg p-4 mb-6 w-[500px] h-[380px]">
        <h2 className="text-lg font-bold mb-4">Expense Category Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryBreakdown}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

     </div>
      {/* Bill Splitting Overview */}
     <div>
     <div className="bg-[#121944] text-white rounded-lg p-4 mb-6 w-[500px]">
        <h2 className="text-lg font-bold mb-4">Bill Splitting Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={billSplittingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="friend" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="settled" stackId="a" fill="#82ca9d" />
            <Bar dataKey="pending" stackId="a" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Metrics Summary */}
      <div className="bg-[#121944] text-white rounded-lg p-4 w-[500px] h-[380px]">
        <h2 className="text-lg font-bold mb-4">Key Financial Insights</h2>
        <div className="flex flex-col items-center justify-center">
         <div className=" flex gap-4
         ">
           <div className="bg-[#1A2354] p-4 rounded w-[220px] mt-2 h-[120px]">
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <p className="text-2xl">$4,680</p>
          </div>
          <div className="bg-[#1A2354] p-4 rounded w-[220px] mt-2 h-[120px]">
            <h3 className="text-lg font-semibold">Average Monthly Spend</h3>
            <p className="text-2xl">$1,560</p>
          </div>
         </div>
          <div className=" flex gap-4
          ">
            <div className="bg-[#1A2354] p-4 rounded w-[220px] mt-4 h-[120px]">
            <h3 className="text-lg font-semibold">Pending Bill Splits</h3>
            <p className="text-2xl">$450</p>
          </div>
          <div className="bg-[#1A2354] p-4 rounded w-[220px] mt-4 h-[120px]">
            <h3 className="text-lg font-semibold">Top Expense Category</h3>
            <p className="text-2xl">Utilities</p>
          </div>
          </div>
        </div>
      </div>
     </div>
     </div>
    </div>
  );
};

export default ExpenseAnalyticsDashboard;
