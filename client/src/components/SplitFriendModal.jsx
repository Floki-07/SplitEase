import React from 'react'
import { useState } from 'react'
import { Search, Plus, ChevronDown } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'


const SplitFriendModal = ({ friend, user,setUser, setIsOpen }) => {

    const [bill, setBill] = useState('')
    const [desc, setDesc] = useState('')
    const [cat, setCat] = useState('')
    const [userExpense, setUserExpense] = useState('')
    const [friendExpense, setfriendExpense] = useState(`${friend.name}'s Expense`)
    const [paidByuser, setPaidByuser] = useState(false)
    let obj={
        friendId: friend._id,
        bill: parseFloat(bill),
        description: desc,
        category: cat,
        userExpense: parseFloat(userExpense),
        friendExpense: parseFloat(bill) - parseFloat(userExpense),
        paidByuser
    }

    const handleSubmit = async (e)=> { 
        e.preventDefault()
        try {
            const token = localStorage.getItem("token");
            let response;    
            if (token) {
              // Token-based onboarding request
              try {
                const response = await axios.post(
                  `http://localhost:3000/api/splitwithfriend`,  // API endpoint
                  { obj },  // Payload with the budget
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                      "Content-Type": "application/json",
                    },
                  }
                );
      
                if (response.data.success) {
                  console.log("Bill spilted successfully");
                  // Optionally redirect or update UI based on success
                  setUser(response.data.user)
                  toast.success('Bill spilting done ', {
                    style: {
                      color: "green",
                    } // Set the text color to green
                  });
                  // setaddedFriend(!addedFriend);
                  setIsOpen(false);
      
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
                `http://localhost:3000/api/splitwithfriend`,
                { obj }, // Include the budget as payload
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
                console.log(response.data.user);
                toast.success('Bill spilting done', {
                  style: {
                    color: "green",
                  } // Set the text color to green
      
                })
                // setaddedFriend(!addedFriend)
                setIsOpen(false)
      
              } else {
                throw new Error("No success response received for OAuth onboarding");
              }
            } catch (oauthError) {
              console.error("OAuth-based onboarding failed:", oauthError);
            }
          } catch (error) {
            console.error("Critical error during onboarding process:", error);
          }
     }

    return (
        <>
            <div onClick={() => setIsOpen(false)} className="h-full w-full absolute bg-black/50 top-0 left-0 flex items-center z-[10]">

                <div className="relative bg-[#121944] h-[40vh] w-[33vw] mx-auto rounded-md translate-x-8 translate-y-[-10%] z-[20] px-8 py-6 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>


                    <form onSubmit={handleSubmit} className='min-h-[3vh]  flex flex-col w-[60%] justify-between gap-4 '>
                        <div className="min-h-[3vh]  flex w-[60%] justify-between gap-4 ">
                            <div>
                                <input
                                    type="number"
                                    className="text-xl outline-none text-white  w-[200px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1"
                                    placeholder="Enter total Bill "
                                    autoFocus
                                    value={bill}
                                    required
                                    onChange={(e) => setBill(e.target.value)}
                                />
                            </div>

                            <div>
                                <select
                                    name="category"
                                    id="category"
                                    className="bg-[--background2] border border-[var(--ternary)] py-1 outline-none rounded-md px-2 w-[9vw] text-white h-[40px] "
                                    value={cat}
                                    onChange={(e) => setCat(e.target.value)}
                                    required
                                >
                                    <option value="" disabled   >Category</option>
                                    <option value="grocery">Grocery</option>
                                    <option value="restaurant">Restaurant</option>
                                    <option value="commute">Commute</option>
                                    <option value="bills">Bills</option>
                                    <option value="stationary">Stationary</option>
                                    <option value="trips">Trips</option>
                                    <option value="micellaneous">Micellaneous</option>
                                </select>


                            </div>

                        </div>


                        <div className='flex '>
                            <input
                                type="text"
                                className="text-md outline-none pl-1 text-white  w-[200px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh]"
                                placeholder="Description (Optional) "
                                autoFocus
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />



                        </div>

                        <div className='flex  gap-3 '>
                            <input
                                type="text"
                                className="text-md pl-2 outline-none text-white  w-[140px] bg-[var(--background)] placeholder:text-gray-400 h-[5vh]"
                                placeholder="My's Expense "
                                autoFocus
                                value={userExpense}
                                onChange={(e) => setUserExpense(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="text-md pl-2 outline-none text-white  w-[140px] bg-slate-700 placeholder:text-gray-400 h-[5vh]"
                                placeholder={`${friend.name}'s Expense`}
                                autoFocus
                                required
                                disabled
                                value={parseInt(bill) - parseInt(userExpense) | ''}
                            />
                        </div>


                        <div className='flex w-[70%] justify-between'>
                            <select
                                name="taskType"
                                id="taskType"
                                className="bg-[--background2] border border-[var(--ternary)] py-1 outline-none rounded-md px-2 w-[9vw] text-white h-[40px]"
                                value={paidByuser}
                                onChange={(e) => setPaidByuser(e.target.value === "true")} // Converts string to boolean
                            >
                                <option value="" disabled>
                                    Paid By
                                </option>
                                <option value="true">Me</option>
                                <option value="false">{friend.name}</option>
                            </select>

                            <div>
                                <button className=' hover:bg-violet-600 text-center bg-[--primary] py-2 px-3 w-[7vw] rounded-md text-bold text-white'>
                                    <span className='font-semibold'>Add Bill</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default SplitFriendModal