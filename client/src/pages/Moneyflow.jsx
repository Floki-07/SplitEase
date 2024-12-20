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
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchUserData = async () => {
      // setLoading(true)
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
            console.log('Oauth user data',response.data.user);
          } else {
            throw new Error("No user data received");
          }
        } catch (oauthError) {
          console.error("OAuth login failed:", oauthError);
        }
      } catch (error) {
        console.error("Critical error in fetchUserData:", error);
      } finally {
        // setLoading(false)  
      }
    };

    fetchUserData();
  }, []);

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <div className='m-0 h-full w-[95%]'>
        <div className='flex w-full items-center '>
          <div className='w-[540px] h-[150px]  mt-4 ml-3 flex gap-4'>
            <motion.div onClick={() => setIncomeOpen(true)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              transition={{ duration: 0.5 }}
              className='w-[140px] h-[135px] bg-[--background3] mt-4 ml-6 rounded-lg shadow-lg shadow-black hover:scale-105 transition-all delay-100 flex flex-col items-center border border-green-400  border-opacity-25 hover:border-opacity-100 hover:border-3'>
              <div className="mt-2 flex flex-col items-center">
                <div className='text-[--ternary] mt-3 font-thin '>
                  <Wallet size={50} />
                </div>
                <div>
                  <h1 className='text-white mt-4 text-[18px] font-semibold'>ADD INCOME</h1>
                </div>
              </div>
            </motion.div>

            <motion.div onClick={() => setExpensOpen(true)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              transition={{ duration: 0.5 }}
              className='w-[140px] h-[135px] bg-[--background3] mt-4 ml-6 rounded-lg shadow-lg shadow-black hover:scale-105 transition-all delay-100 flex flex-col items-center border border-red-800 border-opacity-25 hover:border-opacity-100 hover:border-3'>
              <div className="mt-2 flex flex-col items-center">
                <div className='text-[--ternary] mt-3 font-thin '>
                  <HandCoins size={50} />
                </div>
                <div>
                  <h1 className='text-white mt-4 text-[18px] font-semibold'>ADD EXPENSE</h1>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <div>
              <h1 className='ml-10 mt-7 text-[26px] text-[--ternary]'>Recent Transactions</h1>
            </div>
            <div className="overflow-x-hidden overflow-y-auto border-gray-500 border-opacity mt-4 mx-10 h-[350px] w-[600px] custom-scrollbar">
              <motion.table
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={modalVariants}
                transition={{ duration: 0.5 }}
                className="w-full text-sm table-auto border border-gray-500 border-opacity-45 h-[400px]">
                <thead className="bg-[--background]  border-gray-500 border-opacity-45">
                  <tr className='text-white '>
                    <th className="px-4 py-2 text-left border-x border-gray-500 border-opacity-45">Name</th>
                    <th className="px-4 py-2 text-left border-x border-gray-500 border-opacity-45">Description</th>
                    <th className="px-4 py-2 text-left border-x border-gray-500 border-opacity-45">Date</th>
                    <th className="px-4 py-2 text-left border-x border-gray-500 border-opacity-45">Amount</th>
                    <th className="px-4 py-2 text-left border-x border-gray-500 border-opacity-45">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        <div className="flex justify-center items-center">
                          <Loader2 className="animate-spin text-[--ternary]" size={50} />
                        </div>
                      </td>
                    </tr>
                  ) : user?.transactions && user.transactions.length > 0 ? (
                    user.transactions.reverse().map((ele, index) => (
                      <tr key={index} className="border-t border-gray-200 border-opacity-25 bg-[--background2] h-[50px]">
                        <td className="px-4 py-2 border-x border-gray-500 border-opacity-45 h-[50px] truncate">{user.username}</td>
                        <td className="px-4 py-2 border-x border-gray-500 border-opacity-45 h-[50px] truncate">{ele.description}</td>
                        <td className="px-4 py-2 border-x border-gray-500 border-opacity-45 h-[50px] truncate">{ele.date}</td>
                        <td className={`px-4 py-2 border-x border-gray-500 border-opacity-45 h-[50px] truncate ${ele.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                          {ele.amount}
                        </td>
                        <td className="px-4 py-2 border-x border-gray-500 border-opacity-45 h-[50px] truncate">{ele.category || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">
                        No transactions yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </motion.table>
            </div>
          </div>
        </div>
      </div>

      {ExpensOpen && (
        <AddExpense setExpensOpen={setExpensOpen} />
      )}
      {IncomeOpen && (
        <AddIncome
          user={user}
          setUser={setUser}
          setIncomeOpen={setIncomeOpen} />
      )}
    </>
  )
}

export default Moneyflow