import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const navigate = useNavigate()
    const [budget, setbudget] = useState('');

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('User Info:',budget);
        // Perform further actions like API calls

        try {
            const token = localStorage.getItem("token");
            // console.log(token);
            
            let response;

            if (token) {
                // Token-based onboarding request
                try {
                    const response = await axios.post(
                        `http://localhost:3000/api/onboardingdetails`,  // API endpoint
                        { budget },  // Payload with the budget
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                                "Content-Type": "application/json",
                            },
                        }
                    );
            
                    if (response.data.success) {
                        // console.log("Onboarding successful:", response.data.message);
                        // Optionally redirect or update UI based on success
                        window.location.reload();
                    } else {
                        console.error("Onboarding failed:", response.data.message);
                    }
                } catch (tokenError) {
                    console.error("Token-based onboarding failed:", tokenError);
                    // Handle token error
                    // localStorage.removeItem("token");  // Optionally clear invalid token
                }
            }

            // OAuth-based onboarding request
            try {
                response = await axios.post(
                    `http://localhost:3000/api/onboardingdetails`,
                    { budget }, // Include the budget as payload
                    {
                        withCredentials: true, // Allows sending cookies
                        headers: {
                            "Content-Type": "application/json",
                            "x-correlation-id": Date.now().toString(), // Correlation ID for tracking
                        },
                    }
                );

                if (response.data.success) {
                    console.log("OAuth onboarding successful:", response.data.message);
                    window.location.reload();
                } else {
                    throw new Error("No success response received for OAuth onboarding");
                }
            } catch (oauthError) {
                console.error("OAuth-based onboarding failed:", oauthError);
            }
        } catch (error) {
            console.error("Critical error during onboarding process:", error);
        }


    };

    return (
        <div className="h-[80vh] bg-[var(--background1)] text-white font-[var(--outfit)] flex items-center justify-center w-[1200px] ">
            <div className="bg-[var(--background2)] p-8 rounded-lg shadow-lg w-full max-w-md translate-y-[-5px]">
                <h1 className="text-3xl font-bold text-center text-[var(--primary)] mb-6">Welcome to SplitEase</h1>
                <p className="text-center text-[var(--ternary)] mb-6">
                    Tell us about yourself to get started with expense tracking.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}

                    {/* Budget */}
                    <div>
                        <label htmlFor="budget" className="block text-[var(--ternary)] mb-2">
                            Monthly Budget
                        </label>
                        <input
                            type="number"
                            id="budget"
                            name="budget"
                            value={budget}
                            onChange={(e)=>setbudget(e.target.value)}
                            placeholder="Enter your budget (e.g., 500)"
                            className="w-full px-4 py-2 rounded bg-[var(--background3)] text-white border border-[var(--border-line)] focus:ring-2 focus:ring-[var(--primary)]"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-bold hover:bg-opacity-80 transition"
                    >
                        Get Started
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Onboarding;
