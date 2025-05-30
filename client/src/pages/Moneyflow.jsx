import { Wallet, HandCoins, Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import AddExpense from '../components/AddExpense'
import AddIncome from '../components/AddIncome'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Moneyflow = () => {
  const [ExpensOpen, setExpensOpen] = useState(false)
  const [IncomeOpen, setIncomeOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState('')
  const [showErrorModal, setShowErrorModal] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
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
              setUser(response.data.user);
              console.log(response.data.user);
              return;
            }
          } catch (tokenError) {
            console.error("Token validation failed:", tokenError);
            localStorage.removeItem("token");
          }
        }

        try {
          response = await axios.get(`http://localhost:3000/api/getUserInfo`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "x-correlation-id": Date.now().toString(),
            },
          });

          if (response.data.user) {
            setUser(response.data.user);
            console.log('Oauth user data', response.data.user);
          } else {
            throw new Error("No user data received");
          }
        } catch (oauthError) {
          console.error("OAuth login failed:", oauthError);
        }
      } catch (error) {
        console.error("Critical error in fetchUserData:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchUserData();
  }, []);

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {showErrorModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl p-8 shadow-2xl max-w-md mx-4"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
              <p className="text-gray-600 mb-6">Savings should be less than your income.</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                OK
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className='min-h-screen w-full bg-[--background]'>
        <div className='container mx-auto px-4 py-8 max-w-7xl'>
          
          {/* Header Section with Action Cards */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          >
            {/* Action Cards */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-[--ternary] mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <motion.div 
                  onClick={() => setIncomeOpen(true)}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className='bg-[--background3] p-6 rounded-2xl shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl border border-green-400 border-opacity-25 hover:border-opacity-100'
                >
                  <div className="flex flex-col items-center text-center">
                    <div className='text-[--ternary] p-4 rounded-xl mb-4'>
                      <Wallet size={32} />
                    </div>
                    <h3 className='text-white text-lg font-semibold'>ADD INCOME</h3>
                    <p className='text-[--ternary] text-sm mt-1 opacity-80'>Track your earnings</p>
                  </div>
                </motion.div>

                <motion.div 
                  onClick={() => setExpensOpen(true)}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className='bg-[--background3] p-6 rounded-2xl shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl border border-red-800 border-opacity-25 hover:border-opacity-100'
                >
                  <div className="flex flex-col items-center text-center">
                    <div className='text-[--ternary] p-4 rounded-xl mb-4'>
                      <HandCoins size={32} />
                    </div>
                    <h3 className='text-white text-lg font-semibold'>ADD EXPENSE</h3>
                    <p className='text-[--ternary] text-sm mt-1 opacity-80'>Record your spending</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Personal Transactions */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[--ternary] mb-6">Personal Transactions</h2>
              <div className="bg-[--background2] backdrop-blur-sm rounded-2xl border border-gray-500 border-opacity-45 overflow-hidden shadow-lg shadow-black">
                <div className="overflow-x-auto max-h-96 custom-scrollbar">
                  <motion.table
                    initial="hidden"
                    animate="visible"
                    variants={modalVariants}
                    transition={{ duration: 0.5 }}
                    className="w-full text-sm"
                  >
                    <thead className="bg-[--background3] sticky top-0 border-gray-500 border-opacity-45">
                      <tr className='text-white'>
                        <th className="px-6 py-4 text-left font-semibold border-x border-gray-500 border-opacity-45">Name</th>
                        <th className="px-6 py-4 text-left font-semibold border-x border-gray-500 border-opacity-45">Description</th>
                        <th className="px-6 py-4 text-left font-semibold border-x border-gray-500 border-opacity-45">Date</th>
                        <th className="px-6 py-4 text-left font-semibold border-x border-gray-500 border-opacity-45">Amount</th>
                        <th className="px-6 py-4 text-left font-semibold border-x border-gray-500 border-opacity-45">Category</th>
                      </tr>
                    </thead>
                    <tbody className='text-[--ternary]'>
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-12">
                            <div className="flex flex-col items-center">
                              <Loader2 className="animate-spin text-[--ternary] mb-2" size={40} />
                              <span className="text-[--ternary] opacity-70">Loading transactions...</span>
                            </div>
                          </td>
                        </tr>
                      ) : user?.transactions && user.transactions.filter(ele => ele.personal).length > 0 ? (
                        user.transactions.filter(ele => ele.personal).reverse().map((ele, index) => (
                          <motion.tr 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-t border-gray-500 border-opacity-25 hover:bg-[--background3] transition-colors"
                          >
                            <td className="px-6 py-4 font-medium">{user.username}</td>
                            <td className="px-6 py-4 max-w-xs truncate">{ele.description}</td>
                            <td className="px-6 py-4 text-[--ternary] opacity-70">{ele.date.split('T')[0]}</td>
                            <td className={`px-6 py-4 font-semibold ${
                              ele.type === 'income' ? 'text-green-400' : 
                              ele.type === 'expense' ? 'text-red-400' : 'text-yellow-400'
                            }`}>
                              <div className='flex items-center'>
                                {ele.type === 'income' ? '+' : ele.type === 'expense' ? '-' : '~'}
                                <span className="ml-1">₹{ele.amount}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-[--background3] text-[--ternary] px-3 py-1 rounded-full text-xs border border-gray-500 border-opacity-30">
                                {ele.category || 'N/A'}
                              </span>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-12">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-[--background3] rounded-full flex items-center justify-center mb-4 border border-gray-500 border-opacity-30">
                                <Wallet className="text-[--ternary]" size={24} />
                              </div>
                              <span className="text-[--ternary] text-lg">No personal transactions yet</span>
                              <span className="text-[--ternary] opacity-60 text-sm mt-1">Start by adding your first income or expense</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </motion.table>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Group Transactions Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-[--ternary] mb-6">Group Transactions</h2>
            <div className="bg-[--background2] backdrop-blur-sm rounded-2xl border border-gray-500 border-opacity-45 overflow-hidden shadow-lg shadow-black">
              <div className="overflow-x-auto max-h-96 custom-scrollbar">
                <motion.table
                  initial="hidden"
                  animate="visible"
                  variants={modalVariants}
                  transition={{ duration: 0.5 }}
                  className="w-full text-sm min-w-max"
                >
                  <thead className="bg-[--background3] sticky top-0 border-gray-500 border-opacity-45">
                    <tr className="text-white">
                      <th className="px-6 py-4 text-left font-semibold min-w-[160px] border-x border-gray-500 border-opacity-45">Group/Friend Name</th>
                      <th className="px-6 py-4 text-left font-semibold min-w-[120px] border-x border-gray-500 border-opacity-45">Date</th>
                      <th className="px-6 py-4 text-left font-semibold min-w-[100px] border-x border-gray-500 border-opacity-45">Total</th>
                      <th className="px-6 py-4 text-left font-semibold min-w-[120px] border-x border-gray-500 border-opacity-45">Category</th>
                      <th className="px-6 py-4 text-left font-semibold min-w-[120px] border-x border-gray-500 border-opacity-45">Money Spent</th>
                      <th className="px-6 py-4 text-left font-semibold min-w-[120px] border-x border-gray-500 border-opacity-45">Money Owed</th>
                      <th className="px-6 py-4 text-left font-semibold min-w-[130px] border-x border-gray-500 border-opacity-45">Money You Owe</th>
                    </tr>
                  </thead>
                  <tbody className="text-[--ternary]">
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="text-center py-12">
                          <div className="flex flex-col items-center">
                            <Loader2 className="animate-spin text-[--ternary] mb-2" size={40} />
                            <span className="text-[--ternary] opacity-70">Loading group transactions...</span>
                          </div>
                        </td>
                      </tr>
                    ) : user?.transactions && user.transactions.filter((ele) => !ele.personal).length > 0 ? (
                      user.transactions
                        .filter((ele) => !ele.personal)
                        .reverse()
                        .map((ele, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-t border-gray-500 border-opacity-25 hover:bg-[--background3] transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className={`font-semibold ${
                                ele.grpname ? "text-blue-400" : "text-green-400"
                              }`}>
                                {ele.grpname || ele.friendname}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-[--ternary] opacity-70">{ele.date.split("T")[0]}</td>
                            <td className="px-6 py-4 font-semibold text-yellow-400">₹{ele.amount}</td>
                            <td className="px-6 py-4">
                              <span className="bg-[--background3] text-[--ternary] px-3 py-1 rounded-full text-xs border border-gray-500 border-opacity-30">
                                {ele.category || "N/A"}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium">₹{ele.moneySpent}</td>
                            <td className="px-6 py-4 font-semibold text-[--textgreen]">+₹{ele.moneyowed}</td>
                            <td className="px-6 py-4 font-semibold text-red-400">₹{ele.moneyweowe}</td>
                          </motion.tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-12">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[--background3] rounded-full flex items-center justify-center mb-4 border border-gray-500 border-opacity-30">
                              <HandCoins className="text-[--ternary]" size={24} />
                            </div>
                            <span className="text-[--ternary] text-lg">No group transactions yet</span>
                            <span className="text-[--ternary] opacity-60 text-sm mt-1">Start sharing expenses with friends and groups</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </motion.table>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modals */}
        {ExpensOpen && (
          <AddExpense
            user={user}
            setUser={setUser}
            setExpensOpen={setExpensOpen} 
          />
        )}

        {IncomeOpen && (
          <AddIncome
            user={user}
            setUser={setUser}
            setIncomeOpen={setIncomeOpen} 
          />
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: var(--ternary) var(--background3);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--background3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--ternary);
          border-radius: 4px;
          opacity: 0.6;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          opacity: 1;
        }
      `}</style>
    </>
  )
}

export default Moneyflow