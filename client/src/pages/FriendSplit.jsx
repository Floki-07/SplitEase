import React from 'react'

import { Search, Plus, ChevronDown } from 'lucide-react'
import { useState } from 'react'
const FriendSplit = () => {
  const handleSearch = () => {

  }
  const [isOpen, setIsOpen] = useState(false)
  const [isAddModalOpen, setisAddModalOpen] = useState(false)

  return (
    <div className=' flex justify-center items-center w-full h-full'>
      <div className='fixed h-[65vh] w-[28vw] bg-[--background2] rounded-md flex flex-col p-2 shadow-lg shadow-black translate-y-[-10%]'>

        <h1 className='text-[25px] font-semibold text-center'>Select friend</h1>
        <div className='mt-3 bg-[--background] w-[20vw] mx-auto py-2 rounded-[20px] h-[40px] pl-2 flex gap-3 justify-start outline-none focus:outline-none' >

          <div ><Search className='hover:cursor-pointer hover:text-purple-600' onClick={handleSearch} /></div>
          <input type="text" name="" id="" className=' text-[--ternary] bg-inherit outline-none border-solid  border-b border-[#B8B8FF] ' placeholder='Search' />

        </div>

        <div className=" card-container h-[38vh] bg-[background3] w-[24vw] mx-auto mt-4 rounded-lg overflow-y-auto p-2 custom-scrollbar ">





          <div className=" card mt-3 w-full bg-[--background] h-[9vh] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

            <div className="flex justify-between w-[6vw] items-center gap-3">
              <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                <img src="/images/Sample.png" alt=""
                  className='object-contain' />
              </div>
              <div className=''>
                <h2 className='text-white text-lg '>Tejas</h2>
              </div>
            </div>

            <div className='w-[2vw] h-[4vh] '>
              <Plus className='hover:cursor-pointer hover:text-[--ternary] hover:scale-105' onClick={() => setIsOpen(true)} />
            </div>
          </div>


          <div className=" card mt-3 w-full bg-[--background] h-[9vh] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

            <div className="flex justify-between w-[6vw] items-center gap-3">
              <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                <img src="/images/Sample.png" alt=""
                  className='object-contain' />
              </div>
              <div className=''>
                <h2 className='text-white text-lg '>Yasar</h2>
              </div>
            </div>

            <div className='w-[2vw] h-[4vh] '>
              <Plus className='hover:cursor-pointer hover:text-[--ternary] hover:scale-105' onClick={() => setIsOpen(true)} />
            </div>
          </div>


          <div className=" card mt-3 w-full bg-[--background] h-[9vh] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

            <div className="flex justify-between w-[6vw] items-center gap-3">
              <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                <img src="/images/Sample.png" alt=""
                  className='object-contain' />
              </div>
              <div className=''>
                <h2 className='text-white text-lg '>Sujal</h2>
              </div>
            </div>

            <div className='w-[2vw] h-[4vh] '>
              <Plus className='hover:cursor-pointer hover:text-[--ternary] hover:scale-105' onClick={() => setIsOpen(true)} />
            </div>
          </div>


          <div className=" card mt-3 w-full bg-[--background] h-[9vh] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

            <div className="flex justify-between w-[6vw] items-center gap-3">
              <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                <img src="/images/Sample.png" alt=""
                  className='object-contain' />
              </div>
              <div className=''>
                <h2 className='text-white text-lg '>Tejas</h2>
              </div>
            </div>

            <div className='w-[2vw] h-[4vh] '>
              <Plus className='hover:cursor-pointer hover:text-[--ternary] hover:scale-105' onClick={() => setIsOpen(true)} />
            </div>
          </div>


          <div className=" card mt-3 w-full bg-[--background] h-[9vh] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

            <div className="flex justify-between w-[6vw] items-center gap-3">
              <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                <img src="/images/Sample.png" alt=""
                  className='object-contain' />
              </div>
              <div className=''>
                <h2 className='text-white text-lg '>Tejas</h2>
              </div>
            </div>

            <div className='w-[2vw] h-[4vh] '>
              <Plus className='hover:cursor-pointer hover:text-[--ternary] hover:scale-105' onClick={() => setIsOpen(true)} />
            </div>
          </div>


          <div className=" card mt-3 w-full bg-[--background] h-[9vh] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

            <div className="flex justify-between w-[6vw] items-center gap-3">
              <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                <img src="/images/Sample.png" alt=""
                  className='object-contain' />
              </div>
              <div className=''>
                <h2 className='text-white text-lg '>Tejas</h2>
              </div>
            </div>

            <div className='w-[2vw] h-[4vh] '>
              <Plus className='hover:cursor-pointer hover:text-[--ternary] hover:scale-105' onClick={() => setIsOpen(true)} />
            </div>
          </div>

          <div className=" card mt-3 w-full bg-[--background] h-[9vh] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

            <div className="flex justify-between w-[6vw] items-center gap-3">
              <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                <img src="/images/Sample.png" alt=""
                  className='object-contain' />
              </div>
              <div className=''>
                <h2 className='text-white text-lg '>Tejas</h2>
              </div>
            </div>

            <div className='w-[2vw] h-[4vh] '>
              <Plus className='hover:cursor-pointer hover:text-[--ternary] hover:scale-105' onClick={() => setIsOpen(true)} />
            </div>
          </div>

          <div className=" card mt-3 w-full bg-[--background] h-[9vh] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

            <div className="flex justify-between w-[6vw] items-center gap-3">
              <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                <img src="/images/Sample.png" alt=""
                  className='object-contain' />
              </div>
              <div className=''>
                <h2 className='text-white text-lg '>Tejas</h2>
              </div>
            </div>

            <div className='w-[2vw] h-[4vh] '>
              <Plus className='hover:cursor-pointer hover:text-[--ternary] hover:scale-105' onClick={() => setIsOpen(true)} />
            </div>
          </div>






        </div>


        <div className=' w-[80%] mt-2 text-white flex justify-end  items-end '>
          <button onClick={() => setisAddModalOpen(true)} className='flex bg-[--background3] px-2 py-1 rounded-md translate-x-[50%] hover:bg-[--primary]'>
            <span className='font-semibold'>Add</span> <Plus /></button>
        </div>


      </div>

      {isOpen && (
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
                    name="category"
                    id="category"
                    className="bg-[--background2] border border-[var(--ternary)] py-1 outline-none rounded-md px-2 w-[9vw] text-white h-[40px] "
                  >
                    <option value="" disabled>Category</option>
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
                  <option value="" disabled> Paid By</option>
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
      )}
      {isAddModalOpen && (
        <>
          <div onClick={() => setisAddModalOpen(false)} className="h-full w-full absolute bg-black/50 top-0 left-0 flex items-center z-[10]">

            <div className="modal justify-center items-center relative bg-[#121944] h-[60vh] w-[33vw] mx-auto rounded-md translate-x-8 translate-y-[-10%] z-[20] px-8 py-6 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>


              <div className="min-h-[3vh]  flex flex-col w-[60%] justify-between gap-4  ">
                <h1 className='text-[30px] translate-y-[-20%] '>Add new friend</h1>
                <div>
                  <input
                    type="text"
                    className="text-xl outline-none text-white  w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1"
                    placeholder="Friend's name "
                    autoFocus
                  />
                </div>

                <div>
                  <input
                    type="number"
                    className="appearance-none text-xl outline-none text-white  w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1"
                    placeholder="Phone number "
                    autoFocus
                  />
                </div>
                <div>
                  <input
                    type="number"
                    className="appearance-none text-xl outline-none text-white  w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1"
                    placeholder="UPI ID "
                    autoFocus
                  />
                </div>

                <div className='translate-y-[]'>
                  <label htmlFor="" className='text-[--ternary] text-sm ml-1 translate-y-[15%]'>Avatar</label>
                  <input
                    type="file"
                    className="text-md outline-none text-white  w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[5vh] pl-1"
                    placeholder="Enter total Bill "
                    autoFocus
                  />
                </div>

                <div>




                </div>

              </div>









              <div>
                <button className=' hover:bg-violet-600 text-center bg-[--primary] py-2 px-3 w-[7vw] rounded-md text-bold text-white'>
                  <span className='font-semibold'>Add Bill</span>
                </button>
              </div>
            </div>


          </div>
        </>
      )}

    </div>
  )
}

export default FriendSplit
