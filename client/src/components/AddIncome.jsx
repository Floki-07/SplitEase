import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';


const AddIncome = ({ setIncomeOpen,user,setUser }) => {
  // State to manage form values
  const [income, setIncome] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // Handle form submission
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
                    console.log("Income add successfully:", response.data.message);
                    // Optionally redirect or update UI based on success
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
      className="h-full w-full absolute bg-black/50 top-0 left-0 flex items-center z-[10]"
    >
      <div
        className="relative bg-[#121944] h-[340px] w-[320px] mx-auto rounded-md translate-x-8 translate-y-[-10%] z-[20] px-8 py-6 flex flex-col items-start gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center w-full">
          <h1 className="text-center text-white text-[22px] font-semibold">ADD INCOME</h1>
        </div>
        <form className="h-[200px] bg-green- gap-2 flex flex-col items-start justify-center" onSubmit={handleSubmit}>
          <input
            type="number"
            className="text-md outline-none text-white w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1 py-2"
            placeholder="Enter Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
          <input
            type="text"
            className="text-md outline-none text-white w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1 py-2"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="" className="text-[--ternary] text-sm text-start">Enter Date</label>
          <input
            type="date"
            className="text-md outline-none text-white w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1 translate-y-[-20%] py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="flex items-center justify-center w-full">
            {/* <Button type="submit">Save</Button> */}
            <button type="submit" className='hover:bg-violet-500 text-center bg-[--primary] py-2 px-3 w-[7vw] rounded-md text-bold text-white'>Save</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
