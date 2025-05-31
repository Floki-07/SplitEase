import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { DollarSign, X, Plus, Tag, Calendar, FileText, AlertCircle } from 'lucide-react';

const AddExpense = ({ setExpensOpen, user, setUser }) => {
    const [expense, setExpense] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 🆕 Loading state added

    const categoryOptions = [
        { value: 'grocery', label: 'Grocery' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'commute', label: 'Commute' },
        { value: 'bills', label: 'Bills' },
        { value: 'stationary', label: 'Stationary' },
        { value: 'trips', label: 'Trips' },
        { value: 'micellaneous', label: 'Miscellaneous' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseData = { expense, description, date, category };
        setErrorMessage('');
        setIsLoading(true);

        if (user.totalincome < user.totalexpense + parseFloat(expense)) {
            toast.warning('No sufficient balance. Please add money to your wallet.', {
                style: { color: "red" }
            });
            setExpensOpen(false);
            setIsLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            let response;

            if (token) {
                try {
                    response = await axios.post(
                        `https://splitease-ke7h.onrender.com/api/addexpense`,
                        { expenseData },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.data.success) {
                        setUser(response.data.user);
                        toast.success('Expense added successfully', {
                            style: { color: "red" }
                        });
                        setExpensOpen(false);
                    } else {
                        setErrorMessage(response.data.message || 'An error occurred');
                        setShowErrorModal(true);
                    }
                } catch (tokenError) {
                    console.error("Token-based request failed:", tokenError);
                    setErrorMessage('Error during token-based request');
                    setShowErrorModal(true);
                }
            }

            try {
                response = await axios.post(
                    `https://splitease-ke7h.onrender.com/api/addexpense`,
                    { expenseData },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "x-correlation-id": Date.now().toString(),
                        },
                    }
                );
                if (response.data.success) {
                    setUser(response.data.user);
                    setExpensOpen(false);
                    toast.success('Expense added successfully', {
                        style: { color: "red" }
                    });
                } else {
                    setShowErrorModal(true);
                }
            } catch (oauthError) {
                console.error("OAuth-based request failed:", oauthError);
                setShowErrorModal(true);
            }

        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
        setExpense('');
        setDescription('');
        setDate('');
        setCategory('');
    };

    return (
        <>
            {showErrorModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#121944] rounded-xl shadow-2xl p-6 max-w-xs w-full mx-4 border border-[#262C5A]">
                        <div className="flex items-center justify-center mb-4">
                            <div className="bg-[#E00C0C]/20 rounded-full p-2">
                                <AlertCircle className="w-6 h-6 text-[#E00C0C]" />
                            </div>
                        </div>
                        <h2 className="text-lg font-bold text-white text-center mb-3">Oops!</h2>
                        <p className="text-[#B8B8FF] text-center mb-6 text-sm leading-relaxed">
                            {errorMessage || 'Expense should be less than income'}
                        </p>
                        <button
                            onClick={() => setShowErrorModal(false)}
                            className="w-full bg-[#E00C0C] hover:bg-[#E00C0C]/90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}

            {/* Main Modal */}
            <div
                onClick={() => setExpensOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-2"
            >
                <div
                    className="relative bg-[#121944] rounded-2xl shadow-2xl border border-[#262C5A] w-full max-w-sm mx-2 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                    style={{ maxHeight: '90vh' }}
                >
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-[#796FFE]/10 to-[#3C9A87]/10 p-4 border-b border-[#262C5A]">
                        <button
                            onClick={() => setExpensOpen(false)}
                            className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-full transition-all duration-300 group"
                        >
                            <X className="w-4 h-4 text-[#B8B8FF] group-hover:text-white" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="bg-[#796FFE] p-2 rounded-lg">
                                <Plus className="w-4 h-4 text-white" />
                            </div>
                            <h1 className="text-lg font-semibold text-white">Add Expense</h1>
                        </div>
                        <p className="text-[#B8B8FF] mt-1 text-xs">Track your spending effortlessly</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-4 space-y-4">
                        {/* Amount Input */}
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-[#B8B8FF] text-sm font-medium">
                                <DollarSign className="w-3 h-3" />
                                Amount
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={expense}
                                    onChange={(e) => setExpense(e.target.value)}
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
                                placeholder="What did you spend on?"
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

                        {/* Category Select */}
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-[#B8B8FF] text-sm font-medium">
                                <Tag className="w-3 h-3" />
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-[#050D35] border border-[#262C5A] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#796FFE] focus:border-[#796FFE] transition-all duration-300 appearance-none cursor-pointer text-sm"
                                required
                            >
                                <option value="" disabled className="bg-[#050D35] text-[#B8B8FF]/60">
                                    Choose a category
                                </option>
                                {categoryOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        className="bg-[#050D35] text-white"
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Balance Info */}
                        <div className="bg-[#262C5A] rounded-lg p-3 border border-[#262C5A]">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#B8B8FF]">Available Balance:</span>
                                <span className="text-[#2DE33F] font-semibold">
                                    ₹{(user.totalincome - user.totalexpense).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-[#796FFE] hover:bg-[#796FFE]/90 disabled:bg-[#796FFE]/50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    Add Expense
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddExpense;
