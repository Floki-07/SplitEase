// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const goalApi = {
  getGoals: () => api.get('/goals'),
  createGoal: (goal) => api.post('/goals', goal),
  updateGoal: (id, amount) => api.put(`/goals/${id}`, { amount }),
  deleteGoal: (id) => api.delete(`/goals/${id}`),
  getGoalStats: (id) => api.get(`/goals/${id}/stats`),
};

// src/context/GoalContext.js
import React, { createContext, useState, useContext } from 'react';
import { goalApi } from '../services/api';

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await goalApi.getGoals();
      setGoals(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch goals');
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async (goalData) => {
    try {
      setLoading(true);
      const response = await goalApi.createGoal(goalData);
      setGoals([...goals, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create goal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateGoal = async (id, amount) => {
    try {
      setLoading(true);
      const response = await goalApi.updateGoal(id, amount);
      setGoals(goals.map(goal => goal._id === id ? response.data : goal));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update goal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteGoal = async (id) => {
    try {
      setLoading(true);
      await goalApi.deleteGoal(id);
      setGoals(goals.filter(goal => goal._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete goal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        loading,
        error,
        fetchGoals,
        createGoal,
        updateGoal,
        deleteGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => useContext(GoalContext);

// src/components/GoalCard.js
import React from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useGoals } from '../context/GoalContext';

const GoalCard = ({ goal, onAddMoney }) => {
  const { deleteGoal } = useGoals();

  const calculateDaysLeft = () => {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    return Math.max(1, Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)));
  };

  const calculateDailySavings = () => {
    const daysLeft = calculateDaysLeft();
    const remainingAmount = goal.target - goal.saved;
    return Math.ceil(remainingAmount / daysLeft);
  };

  return (
    <div className="bg-[#121944] rounded-lg p-4 shadow-md w-72 relative">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{goal.name}</h2>
        <span className="text-sm text-gray-400">
          {new Date(goal.deadline).toLocaleDateString()}
        </span>
      </div>

      <div className="bg-[#262C5A] rounded-full h-2.5 mb-2">
        <div
          className="bg-[#796FFE] h-2.5 rounded-full"
          style={{ width: `${goal.progress}%` }}
        />
      </div>

      <div className="flex justify-between mb-3">
        {!goal.completed && <span>₹{goal.saved.toLocaleString()}</span>}
        <span className={goal.completed ? 'text-center mx-auto' : ''}>
          Target: ₹{goal.target.toLocaleString()}
        </span>
      </div>

      {!goal.completed ? (
        <div className="bg-[#262C5A] p-3 rounded-lg mb-3">
          <p className="text-sm">
            <strong>Days Left:</strong> {calculateDaysLeft()}
          </p>
          <p className="text-sm">
            <strong>Ideal Daily Savings:</strong> ₹{calculateDailySavings().toLocaleString()}
          </p>
        </div>
      ) : (
        <div className="bg-[#262C5A] p-3 rounded-lg mb-3 text-center text-green-400">
          Congratulations! Goal Completed!
        </div>
      )}

      {!goal.completed && (
        <div className="flex justify-between items-center">
          <button
            onClick={() => onAddMoney(goal)}
            className="w-full py-2 rounded-lg bg-[#796FFE] text-white mr-2"
          >
            Add Money
          </button>
          <TrashIcon
            className="text-red-500 cursor-pointer"
            size={20}
            onClick={() => deleteGoal(goal._id)}
          />
        </div>
      )}
    </div>
  );
};

// src/components/AddMoneyModal.js
import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { useGoals } from '../context/GoalContext';

const AddMoneyModal = ({ goal, onClose }) => {
  const [amount, setAmount] = useState('');
  const { updateGoal } = useGoals();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount && Number(amount) > 0) {
      try {
        await updateGoal(goal._id, Number(amount));
        onClose();
      } catch (error) {
        console.error('Failed to add money:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#121944] p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Money to {goal.name}</h2>
          <XIcon className="cursor-pointer" onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-2 mb-4 bg-[#262C5A] rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#796FFE] text-white"
          >
            Add Money
          </button>
        </form>
      </div>
    </div>
  );
};

// src/components/CreateGoalModal.js
import React, { useState } from 'react';
import { XIcon, SaveIcon } from 'lucide-react';
import { useGoals } from '../context/GoalContext';

const CreateGoalModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    deadline: '',
  });

  const { createGoal } = useGoals();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.target && formData.deadline) {
      try {
        await createGoal({
          ...formData,
          target: Number(formData.target),
        });
        onClose();
      } catch (error) {
        console.error('Failed to create goal:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#121944] p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Goal</h2>
          <XIcon className="cursor-pointer" onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Goal Name"
            className="w-full p-2 mb-4 bg-[#262C5A] rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Target Amount"
            className="w-full p-2 mb-4 bg-[#262C5A] rounded"
            value={formData.target}
            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
          />
          <input
            type="date"
            className="w-full p-2 mb-4 bg-[#262C5A] rounded"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#796FFE] text-white flex items-center justify-center space-x-2"
          >
            <SaveIcon size={20} />
            <span>Create Goal</span>
          </button>
        </form>
      </div>
    </div>
  );
};

// src/pages/SavingsGoalsPage.js
import React, { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import GoalCard from '../components/GoalCard';
import AddMoneyModal from '../components/AddMoneyModal';
import CreateGoalModal from '../components/CreateGoalModal';

const SavingsGoalsPage = () => {
  const { goals, loading, error, fetchGoals } = useGoals();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddMoney = (goal) => {
    setSelectedGoal(goal);
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 text-white" style={{ background: '#050D35' }}>
      <div className="container mx-auto">
        <h1 className="text-[28px] font-bold mb-6">Savings Goals</h1>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-[200px] mb-6 py-3 rounded-lg bg-[#796FFE] text-white flex items-center justify-center space-x-2"
        >
          <PlusIcon size={20} />
          <span>Create New Goal</span>
        </button>

        <div className="flex items-center gap-10 flex-wrap">
          {goals.map((goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onAddMoney={handleAddMoney}
            />
          ))}
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateGoalModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {selectedGoal && (
        <AddMoneyModal
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
        />
      )}
    </div>
  );
};

export default SavingsGoalsPage;

