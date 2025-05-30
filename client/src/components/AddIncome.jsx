import React, { useState } from 'react';
import { Plus, DollarSign, FileText, Calendar, X } from 'lucide-react';
import axios from 'axios';

// Mock toast function since we can't use external libraries
const toast = {
  success: (message) => {
    console.log('Success:', message);
  }
};

const AddIncome = ({ setIncomeOpen, user, setUser }) => {
  const [income, setIncome] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setIncomeOpen(false);
    // Here you can handle the logic to save the income, description, and date
    console.log('Income:', income);
    console.log('Description:', description);
    console.log('Date:', date);
    const obj={income,description,date}
    console.log(obj);
    

    try {
        const token = localStorage.getItem("token");
        console.log(token);
        
        let response;

        if (token) {
            // Token-based onboarding request
            try {
                const response = await axios.post(
                    `http://localhost:3000/api/addincome`,  // API endpoint
                    { obj },  // Payload with the budget
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                            "Content-Type": "application/json",
                        },
                    }
                );
        
                if (response.data.success) {
                    console.log("Income add successfully", response.data.message);
                    // Optionally redirect or update UI based on success
                    toast.success('Income add successfully' , {
                      style: {
                        color: "green", // Set the text color to green
                      }})
                    setUser(response.data.user)
                   
                } else {
                    console.error("Onboarding failed:", response.data.message);
                }
            } catch (tokenError) {
                console.error("Token-based onboarding failed:", tokenError);
            }
        }

        // OAuth-based onboarding request
        try {
            response = await axios.post(
                `http://localhost:3000/api/addincome`,
                { obj }, // Include the budget as payload
                {
                    withCredentials: true, // Allows sending cookies
                    headers: {
                        "Content-Type": "application/json",
                        "x-correlation-id": Date.now().toString(), // Correlation ID for tracking
                    },
                }
            );

            if (response.data.success) {
                setUser(response.data.user)
                // console.log(response.data.user);
                toast.success('Income add successfully' , {
                  style: {
                    color: "green", // Set the text color to green
                  }})
                console.log("Income added:", response.data.message);
            } else {
                throw new Error("No success response received for OAuth onboarding");
            }
        } catch (oauthError) {
            console.error("OAuth-based onboarding failed:", oauthError);
        }
    } catch (error) {
        console.error("Critical error during onboarding process:", error);
    }
    // Reset the form
    setIncome('');
    setDescription('');
    setDate('');

    // Close the income modal after submission
   
  };
  return (
    <div
      onClick={() => setIncomeOpen(false)}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        className="relative bg-[#121944] rounded-2xl shadow-2xl border border-[#262C5A] w-full max-w-sm mx-2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#796FFE]/10 to-[#3C9A87]/10 p-4 border-b border-[#262C5A]">
          <button
            onClick={() => setIncomeOpen(false)}
            className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-full transition-all duration-300 group"
          >
            <X className="w-4 h-4 text-[#B8B8FF] group-hover:text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-[#3C9A87] p-2 rounded-lg">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-white">Add Income</h1>
          </div>
          <p className="text-[#B8B8FF] mt-1 text-xs">Track your earnings effortlessly</p>
        </div>

        {/* Form Content */}
        <div className="p-4 space-y-4">
          {/* Income Input */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-[#B8B8FF] text-sm font-medium">
              <DollarSign className="w-3 h-3" />
              Income Amount
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full bg-[#050D35] border border-[#262C5A] rounded-lg px-3 py-2 text-white placeholder-[#B8B8FF]/40 focus:outline-none focus:ring-1 focus:ring-[#796FFE] focus:border-[#796FFE] transition-all duration-300 text-sm"
                placeholder="0.00"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-[#B8B8FF]/60 text-sm">₹</span>
              </div>
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-[#B8B8FF] text-sm font-medium">
              <FileText className="w-3 h-3" />
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#050D35] border border-[#262C5A] rounded-lg px-3 py-2 text-white placeholder-[#B8B8FF]/40 focus:outline-none focus:ring-1 focus:ring-[#796FFE] focus:border-[#796FFE] transition-all duration-300 text-sm"
              placeholder="Source of income"
              required
            />
          </div>

          {/* Date Input */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-[#B8B8FF] text-sm font-medium">
              <Calendar className="w-3 h-3" />
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#050D35] border border-[#262C5A] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#796FFE] focus:border-[#796FFE] transition-all duration-300 text-sm"
              required
            />
          </div>

          {/* Balance Info */}
          <div className="bg-[#262C5A] rounded-lg p-3 border border-[#262C5A]">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#B8B8FF]">Total Income:</span>
              <span className="text-[#2DE33F] font-semibold">
                ₹{(user?.totalincome || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-[#796FFE] hover:bg-[#796FFE]/90 disabled:bg-[#796FFE]/50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Adding Income...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Income
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
