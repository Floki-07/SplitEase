import { Wallet, HandCoins } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import AddExpense from '../components/AddExpense'
import AddIncome from '../components/AddIncome'
import { motion } from 'framer-motion'

const Moneyflow = () => {
  const [ExpensOpen, setExpensOpen] = useState(false)
  const [IncomeOpen, setIncomeOpen] = useState(false)
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (

    <>


      <div className='m-0 h-full w-[95%]'>
        <div className='flex flex-col w-[600px] '>

          <div className='w-[340px] h-[150px]  mt-4 ml-3 flex gap-4'>


            <motion.div onClick={() => setIncomeOpen(true)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              transition={{ duration: 0.5 }}
              className='w-[140px] h-[135px] bg-[--background3] mt-4 ml-6 rounded-lg shadow-lg shadow-black hover:scale-105 transition-all delay-100 flex flex-col items-center border border-green-400  border-opacity-25 hover:border-opacity-100 hover:border-3'>
              <div className="
         mt-2 flex flex-col items-center">
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
              <div className="
         mt-2 flex flex-col items-center">
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
            <div className="overflow-x-auto mt-4 mx-10">
              <motion.table
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={modalVariants}
                transition={{ duration: 0.5 }}
                className="w-full text-sm table-auto border border-gray-500 border-opacity-45">
                <thead className="bg-[--background] ">
                  <tr className='text-white'>
                    <th className="px-4 py-2 text-left border-x border-gray-500 border-opacity-45">Name</th>
                    <th className="px-4 py-2 text-left border-x border-gray-500 border-opacity-45">Description</th>
                    <th className="px-4 py-2 text-left border-x border-gray-500 border-opacity-45">Date</th>
                    <th className="px-4 py-2 text-left border-x border-gray-500 border-opacity-45">Amount</th>
                    <th className="px-4 py-2 text-left border-x border-gray-500 border-opacity-45">Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 border-opacity-25 bg-[--background2]">
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Ziyad</td>
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Samosa Chaat</td>
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">23/11/24</td>
                    <td className="px-4 py-2 text-red-500 border-x border-gray-500 border-opacity-45">-40</td>
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Food</td>
                  </tr>
                  <tr className="border-t border-gray-200 border-opacity-25">
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Ziyad</td>
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Samosa Chaat</td>
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">23/11/24</td>
                    <td className="px-4 py-2 text-red-500 border-x border-gray-500 border-opacity-45">-40</td>
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Food</td>
                  </tr>
                  <tr className="border-t border-gray-200 border-opacity-25 bg-[--background2]">
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Ziyad</td>
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Samosa Chaat</td>
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">23/11/24</td>
                    <td className="px-4 py-2 text-red-500 border-x border-gray-500 border-opacity-45">-40</td>
                    <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Food</td>
                  </tr>
                  {/* <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Tejas</td>
                  <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Egg Rice</td>
                  <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">22/11/24</td>
                  <td className="px-4 py-2 text-green-500 border-x border-gray-500 border-opacity-45">+60</td>
                  <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Food</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Ziyad</td>
                  <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Paid to Yasar</td>
                  <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">21/11/24</td>
                  <td className="px-4 py-2 text-red-500 border-x border-gray-500 border-opacity-45">-160</td>
                  <td className="px-4 py-2 border-x border-gray-500 border-opacity-45">Payment</td>
                </tr> */}
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
        <AddIncome setIncomeOpen={setIncomeOpen} />
      )}
    </>

  )
}

export default Moneyflow