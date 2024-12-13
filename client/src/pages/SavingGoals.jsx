import React, { useState, useEffect } from 'react';
import { PlusIcon, XIcon, SaveIcon, TrashIcon } from 'lucide-react';

const SavingsGoalsPage = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Laptop',
      saved: 15000,
      target: 50000,
      deadline: '2024-12-31',
      progress: 30,
      completed: false
    },
    {
      id: 2,
      name: 'Vacation',
      saved: 5000,
      target: 75000,
      deadline: '2025-06-30',
      progress: 7,
      completed: false
    }
  ]);

  const calculateDailySavings = (goal) => {
    const today = new Date();
    const deadlineDate = new Date(goal.deadline);
    const daysLeft = Math.max(1, Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)));

    const remainingAmount = goal.target - goal.saved;
    const dailySavingsRequired = Math.ceil(remainingAmount / daysLeft);

    return {
      daysLeft,
      dailySavingsRequired
    };
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMoneyModal, setIsAddMoneyModal] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    deadline: '',
  });

  const [addMoneyAmount, setAddMoneyAmount] = useState('');

  const createNewGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.deadline) {
      const goal = {
        id: goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1,
        name: newGoal.name,
        saved: 0,
        target: Number(newGoal.target),
        deadline: newGoal.deadline,
        progress: 0,
        completed: false
      };
      setGoals([...goals, goal]);
      setIsModalOpen(false);
      setNewGoal({ name: '', target: '', deadline: '' });
    }
  };

  const openAddMoneyModal = (goal) => {
    setCurrentGoal(goal);
    setIsAddMoneyModal(true);
  };

  const addMoney = () => {
    const amount = Number(addMoneyAmount);
    if (amount > 0 && currentGoal) {
      const updatedGoals = goals.map(goal =>
        goal.id === currentGoal.id
          ? {
            ...goal,
            saved: goal.saved + amount,
            progress: Math.min(100, Math.round((goal.saved + amount) / goal.target * 100)),
            completed: goal.saved + amount >= goal.target
          }
          : goal
      );
      setGoals(updatedGoals);
      setIsAddMoneyModal(false);
      setAddMoneyAmount('');
      setCurrentGoal(null);
    }
  };

  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  return (
    <div
      className="p-4 text-white relative"
      style={{
        background: '#050D35',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div className="container mx-auto">
        <h1 className="text-[28px] font-bold mb-6 text-[--heading]" >Savings Goals</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-[200px] mb-6 py-3 rounded-lg flex items-center justify-center space-x-2"
          style={{
            background: '#796FFE',
            color: 'white'
          }}
        >
          <PlusIcon size={20} />
          <span>Create New Goal</span>
        </button>

        <div className="flex items-center justify gap-10 flex-wrap justify-start ">
          {goals.map((goal) => {
            const { daysLeft, dailySavingsRequired } = calculateDailySavings(goal);

            return (
              <div
                key={goal.id}
                className="bg-[#121944] rounded-lg p-4 shadow-md w-72 relative "
              >
                <div className="flex justify-between items-center mb-3 flex-wrap">
                  <h2 className="text-lg font-semibold">{goal.name}</h2>
                  <span className="text-sm text-gray-400">{goal.deadline}</span>
                </div>

                <div className="bg-[#262C5A] rounded-full h-2.5 mb-2">
                  <div
                    className="bg-[#796FFE] h-2.5 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>

                <div className="flex justify-between mb-3">
                  {!goal.completed &&  <span>₹{goal.saved}</span>}
                 
                  <span className={`${goal.completed ?'text-center mx-auto ':''}`}>
                    Target: ₹{goal.target}
                    </span>
                </div>

                {!goal.completed ? (
                  <div className="bg-[#262C5A] p-3 rounded-lg mb-3">
                    <p className="text-sm">
                      <strong>Days Left:</strong> {daysLeft}
                    </p>
                    <p className="text-sm">
                      <strong>Ideal Daily Savings:</strong> ₹{dailySavingsRequired}
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#262C5A] p-3 rounded-lg mb-3 text-center text-green-400 flex items-center">
                    <span>
                    Congratulations! Goal Completed!
                    </span>
                    <TrashIcon 
                      className="text-red-500 cursor-pointer ml-2" 
                      size={26} 
                      onClick={() => deleteGoal(goal.id)}
                    />


                  </div>
                )}

                {!goal.completed && (
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => openAddMoneyModal(goal)}
                      className="w-full py-2 rounded-lg"
                      style={{
                        background: '#796FFE',
                        color: 'white'
                      }}
                    >
                      Add Money
                    </button>
                    <TrashIcon 
                      className="text-red-500 cursor-pointer ml-2" 
                      size={20} 
                      onClick={() => deleteGoal(goal.id)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* New Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#121944] p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Goal</h2>
              <XIcon
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <input
              type="text"
              placeholder="Goal Name"
              className="w-full p-2 mb-4 bg-[#262C5A] rounded"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Target Amount"
              className="w-full p-2 mb-4 bg-[#262C5A] rounded"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 mb-4 bg-[#262C5A] rounded"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            />
            <button
              onClick={createNewGoal}
              className="w-full py-3 rounded-lg flex items-center justify-center space-x-2"
              style={{
                background: '#796FFE',
                color: 'white'
              }}
            >
              <SaveIcon size={20} />
              <span>Create Goal</span>
            </button>
          </div>
        </div>
      )}

      {/* Add Money Modal */}
      {isAddMoneyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#121944] p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Money to {currentGoal?.name}</h2>
              <XIcon
                className="cursor-pointer"
                onClick={() => setIsAddMoneyModal(false)}
              />
            </div>
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 mb-4 bg-[#262C5A] rounded"
              value={addMoneyAmount}
              onChange={(e) => setAddMoneyAmount(e.target.value)}
            />
            <button
              onClick={addMoney}
              className="w-full py-3 rounded-lg flex items-center justify-center space-x-2"
              style={{
                background: '#796FFE',
                color: 'white'
              }}
            >
              <PlusIcon size={20} />
              <span>Add Money</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsGoalsPage;