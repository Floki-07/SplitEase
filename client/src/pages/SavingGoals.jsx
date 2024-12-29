import React, { useState, useEffect } from 'react';
import { PlusIcon, XIcon, SaveIcon, TrashIcon } from 'lucide-react';
import axios from 'axios'
const SavingsGoalsPage = () => {
  const [goalName, setGoalName] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [user, setUser] = useState('')
  const [goals, setGoals] = useState([]);
  const [toggle, setToggle] = useState(false);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        let response;

        if (token) {
          try {
            response = await axios.get(`http://localhost:3000/api/getUserInfo`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.data.user) {
              const userData = response.data.user;
              setUser(userData);
              return;
            }
          } catch (tokenError) {
            console.error("Token validation failed:", tokenError);
            localStorage.removeItem("token");
          }
        }

        // OAuth login attempt
        try {
          response = await axios.get(`http://localhost:3000/api/getUserInfo`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "x-correlation-id": Date.now().toString(),
            },
          });

          if (response.data.user) {
            const userData = response.data.user;
            setUser(userData);
          }
        } catch (oauthError) {
          console.error("OAuth login failed:", oauthError);
        }
      } catch (error) {
        console.error("Critical error in fetchUserData:", error);
        localStorage.removeItem("token");
      }
      setLoading(false);
    };

    fetchUserData();

  }, [ toggle]);

  




  const handleAddGoal = async (e) => {
    e.preventDefault()
    let goal = { goalName, amount, date };
    try {
      const token = localStorage.getItem("token");
      let response;
      if (token) {
        // Token-based onboarding request
        try {
          const response = await axios.post(
            `http://localhost:3000/api/addgoal`,  // API endpoint
            { goal },  // Payload with the budget
            {
              headers: {
                Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            console.log("Goal add successfully:", response.data.message);
            // Optionally redirect or update UI based on success
            setUser(response.data.user);
            setToggle(~toggle)
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
          `http://localhost:3000/api/addgoal`,
          { goal }, // Include the budget as payload
          {
            withCredentials: true, // Allows sending cookies
            headers: {
              "Content-Type": "application/json",
              "x-correlation-id": Date.now().toString(), // Correlation ID for tracking
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
          console.log(response.data.user);
          setToggle(~toggle)
          console.log("Goal added:", response.data.message);
        } else {
          throw new Error("No success response received for OAuth onboarding");
        }
      } catch (oauthError) {
        console.error("OAuth-based onboarding failed:", oauthError);
      }
    } catch (error) {
      console.error("Critical error during onboarding process:", error);
    }
    setIsModalOpen(false)
    setGoalName('')
    setAmount('')
    setDate('')
  

  }


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
  const [addMoneyAmount, setAddMoneyAmount] = useState('');

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
          {user?.goals?.map((goal) => {
            const { daysLeft, dailySavingsRequired } = calculateDailySavings(goal);

            return (
              <div
                key={goal.id}
                className="bg-[#121944] rounded-lg p-4 shadow-md w-72 relative "
              >
                <div className="flex justify-between items-center mb-3 flex-wrap">
                  <h2 className="text-lg font-semibold">{goal.name}</h2>
                  <span className="text-sm text-gray-400">{goal.deadline.split('T')[0]}</span>
                </div>

                <div className="bg-[#262C5A] rounded-full h-2.5 mb-2">
                  <div
                    className="bg-[#796FFE] h-2.5 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>

                <div className="flex justify-between mb-3">
                  {!goal.completed && <span>₹{goal.saved}</span>}

                  <span className={`${goal.completed ? 'text-center mx-auto ' : ''}`}>
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
            <form onSubmit={handleAddGoal}>

              <input
                type="text"
                placeholder="Goal Name"
                className="w-full p-2 mb-4 bg-[#262C5A] rounded"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Target Amount"
                className="w-full p-2 mb-4 bg-[#262C5A] rounded"
                value={amount}
                onChange={(e) => setAmount(e.target.value )}
              />
              <input
                type="date"
                className="w-full p-2 mb-4 bg-[#262C5A] rounded"
                value={date}
                onChange={(e) => setDate(e.target.value )}
              />

              <button
                type='submit'
                className="w-full py-3 rounded-lg flex items-center justify-center space-x-2"
                style={{
                  background: '#796FFE',
                  color: 'white'
                }}
              >
                <SaveIcon size={20} />
                <span>Create Goal</span>
              </button>
            </form>
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