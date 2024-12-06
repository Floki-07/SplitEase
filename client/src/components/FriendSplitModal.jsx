import React from 'react'

const FriendSplitModal = () => {
  return (
    <div>
      <>
          <div onClick={() => setIsOpen(false)} className="h-full w-full absolute bg-black/50 top-0 left-0 flex items-center z-[10]">

            <div className="relative bg-[#121944] h-[40vh] w-[33vw] mx-auto rounded-md translate-x-8 translate-y-[-20%] z-[20] px-8 py-6 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>

              <div className="min-h-[3vh]  flex w-[60%] justify-between gap-4 ">
                <div>
                  <input
                    type="text"
                    className="text-xl outline-none text-white  w-[200px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1"
                    placeholder="Enter total Bill "
                    autoFocus
                  />
                </div>

                <div>
                  {/* <select
                    name="taskType"
                    id="taskType"
                    className="bg-[--background2] border border-[var(--ternary)] py-1 outline-none rounded-md px-2 w-[9vw] text-white h-[40px] "
                  >
                    <option value="">Mode</option>
                    <option value="Reading">Split Equally</option>
                  </select> */}
                  <select
                    name="taskType"
                    id="taskType"
                    className="bg-[--background2] border border-[var(--ternary)] py-1 outline-none rounded-md px-2 w-[9vw] text-white h-[40px] "
                  >
                    <option value="">Category</option>
                    <option value="Reading">Grocery</option>
                    <option value="Reading">Restaurant</option>
                    <option value="Reading">Commute</option>
                    <option value="Reading">Stationary</option>
                    <option value="Reading">Other</option>
                  </select>


                </div>

              </div>


              <div className='flex '>
                <input
                  type="text"
                  className="text-md outline-none pl-1 text-white  w-[200px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh]"
                  placeholder="Description (Optional) "
                  autoFocus
                />



              </div>

              <div className='flex  gap-3 '>
                <input
                  type="text"
                  className="text-md pl-2 outline-none text-white  w-[140px] bg-[var(--background)] placeholder:text-gray-400 h-[5vh]"
                  placeholder="User's Expense "
                  autoFocus
                />
                <input
                  type="text"
                  className="text-md pl-2 outline-none text-white  w-[140px] bg-[var(--background)] placeholder:text-gray-400 h-[5vh]"
                  placeholder="Friend's Expense "
                  autoFocus
                />
              </div>


              <div className='flex w-[70%] justify-between'>
                <select
                  name="taskType"
                  id="taskType"
                  className="bg-[--background2] border border-[var(--ternary)] py-1 outline-none rounded-md px-2 w-[9vw] text-white h-[40px] "
                >
                  <option value="">Paid By</option>
                  <option value="user">Me</option>
                  <option value="Reading">Friend</option>
                </select>

                <div>
                  <button className=' hover:bg-violet-600 text-center bg-[--primary] py-2 px-3 w-[7vw] rounded-md text-bold text-white'>
                    <span className='font-semibold'>Add Bill</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </>
    </div>
  )
}

export default FriendSplitModal
