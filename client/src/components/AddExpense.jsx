import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { color } from 'framer-motion';

const AddExpense = ({ setExpensOpen, user, setUser }) => {
    const [expense, setExpense] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State for error modal

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseData = { expense, description, date, category };
        setErrorMessage(''); // Clear previous errors
        if (user.totalincome < user.totalexpense + parseFloat(expense)) {
            toast.warning('No sufficient balance.Please add money to your wallet.', {
                style: {
                    color: "red"
                }
            })
            setExpensOpen(false)
            return;
        }
        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);

            let response;

            if (token) {
                // Token-based request for adding expense
                try {
                    response = await axios.post(
                        `http://localhost:3000/api/addexpense`,  // API endpoint
                        { expenseData },  // Payload with expense data
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.data.success) {
                        console.log("Expense added successfully:", response.data.message);
                        setUser(response.data.user);
                        toast.success('Expense added successfully', {
                            style: {
                                color: "red",
                            } // Set the text color to green

                        })
                        setExpensOpen(false); // Close the expense modal
                    } else {
                        setErrorMessage(response.data.message || 'An error occurred');
                        setShowErrorModal(true); // Show error modal
                    }
                } catch (tokenError) {
                    console.error("Token-based request failed:", tokenError);
                    setErrorMessage('Error during token-based request');
                    setShowErrorModal(true); // Show error modal
                }
            }

            // OAuth-based request (if no token, use cookies)
            try {
                response = await axios.post(
                    `http://localhost:3000/api/addexpense`,  // API endpoint
                    { expenseData }, // Include the expense data as payload
                    {
                        withCredentials: true, // Allows sending cookies for OAuth
                        headers: {
                            "Content-Type": "application/json",
                            "x-correlation-id": Date.now().toString(), // Correlation ID for tracking
                        },
                    }
                );
                console.log(response.data.message);

                if (response.data.success) {
                    console.log("Expense added successfully:", response?.data?.message);
                    setUser(response.data.user);
                    setExpensOpen(false);
                    toast.success('Expense added successfully', {
                        style: {
                            color: "red",
                        } // Set the text color to green

                    }) // Close the expense modal
                } else {
                    // setErrorMessage(response.data.message || 'An error occurred');
                    setShowErrorModal(true); // Show error modal
                }
            } catch (oauthError) {
                console.error("OAuth-based request failed:", oauthError);
                // setErrorMessage('OAuth-based request failed');
                setShowErrorModal(true); // Show error modal
            }

        } catch (error) {
            // console.error("Critical error during request process:", error);
            // setErrorMessage('Internal server error');
            // setShowErrorModal(true); // Show error modal
            console.log(error);

        }
        // Reset the form fields
        setExpense('');
        setDescription('');
        setDate('');
        setCategory('');
    };


    return (
        <>
            {showErrorModal && (
                <div className="h-full w-full absolute bg-black/50 top-0 left-0 flex items-center justify-center z-[30]">
                    <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center">
                        <h2 className="text-red-600 text-lg font-bold">Error</h2>
                        {/* <p className="text-gray-700 mt-2">{errorMessage}</p> */}
                        <p className="text-gray-700 mt-2">Expense should be less than income</p>
                        <button
                            onClick={() => setShowErrorModal(false)}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
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
                            <option value="grocery">Grocery</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="commute">Commute</option>
                            <option value="bills">Bills</option>
                            <option value="stationary">Stationary</option>
                            <option value="trips">Trips</option>
                            <option value="micellaneous">Micellaneous</option>
                        </select>
                        <div className="flex items-center justify-center w-full">
                            <button
                                type="submit"
                                className="hover:bg-violet-500 text-center bg-[--primary] py-2 px-3 w-[7vw] rounded-md text-bold text-white"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddExpense;
