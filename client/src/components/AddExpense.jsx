import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';

const AddExpense = ({ setExpensOpen,user,setUser }) => {
    const [expense, setExpense] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseData = { expense, description, date, category };
        console.log(expense, description, date, category);

        try {
            const token = localStorage.getItem("token");
            console.log(token);

            let response;

            if (token) {
                // Token-based onboarding request
                try {
                    const response = await axios.post(
                        `http://localhost:3000/api/addexpense`,  // API endpoint
                        { expenseData },  // Payload with the budget
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.data.success) {
                        console.log("Expense added successfully:", response.data.message);
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
                    `http://localhost:3000/api/addexpense`,
                    { expenseData }, // Include the budget as payload
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
                    console.log("Expense added:", response.data.message);
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

        // Close the income modal after submission



        // Reset the form fields
        setExpense('');
        setDescription('');
        setDate('');
        setCategory('');

        // Close the modal
        setExpensOpen(false);
    };

    return (
        <>
            <div
                onClick={() => setExpensOpen(false)}
                className="h-full w-full absolute bg-black/50 top-0 left-0 flex items-center z-[10]"
            >
                <div
                    className="relative bg-[#121944] h-[360px] w-[320px] mx-auto rounded-md translate-x-8 translate-y-[-10%] z-[20] px-8 py-6 flex flex-col items-start gap-3"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h1 className="text-center text-white text-[22px] font-semibold w-full">ADD EXPENSE</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            value={expense}
                            onChange={(e) => setExpense(e.target.value)}
                            className="text-md outline-none text-white w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1 py-2"
                            placeholder="Enter Expense"
                            required
                        />
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-md outline-none text-white w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1 py-2"
                            placeholder="Enter Description"
                            required
                        />
                        <label className="text-[--ternary] text-sm">Enter Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="text-md outline-none text-white w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1 py-2"
                            required
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-[--background2] border border-opacity-20 border-gray-100 py-1 outline-none rounded-sm px-2 w-[240px] text-white h-[40px]"
                            required
                        >
                            <option value="" disabled>
                                Select Category
                            </option>
                            <option value="Grocery">Grocery</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Commute">Commute</option>
                            <option value="Stationary">Stationary</option>
                            <option value="Other">Other</option>
                        </select>
                        <div className="flex items-center justify-center w-full">
                            <button type="submit"
                                className='hover:bg-violet-500 text-center bg-[--primary] py-2 px-3 w-[7vw] rounded-md text-bold text-white'

                            >Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddExpense;
