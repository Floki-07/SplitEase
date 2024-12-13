import { Pencil,Equal } from 'lucide-react'
import React from 'react'

const BillSplit = () => {
    return (
        <div className='flex'>
            <div className='left container h-[600px] w-[40vw] flex flex-col  justify- border-r border-gray-300 border-opacity-25 mt-4'>
                <h1 className='mt-1 ml-2 text-[30px] text-[--ternary] '>Split with group</h1>


                <div className=' mt-2 mx-auto leftbox translate-y[-10%] h-[440px] w-[400px] bg-[--background2] shadow-lg shadow-black rounded-md'>
                    <div className='flex  items-center h-[10vh] gap-5 mt-2  w-[80%] mx-auto'>
                        <div className='h-[70px] w-[50px] rounded-full flex justify-center items-center '>
                            <img src="/images/Group.jpeg" alt="" height='70px' className='rounded-full object-fill'  />
                        </div>
                        <div>
                            <h1 className='text-white text-[24px] mt-2'> Buddies Corner</h1>
                        </div>
                        <div>
                            <Pencil className='text-[--primary] translate-y-[-50%] translate-x-5 hover:text-purple-600 hover:scale-105  ' />
                        </div>
                    </div>
                    <div>
                        <div className=" card-container custom-scrollbar h-[38vh] pb-2 w-[390px] mx-auto rounded-lg overflow-y-auto overflow-x-hidden p-2  mt-4 justify-center">

                            {/* cards */}

                            <div className=" card mt-3 w-[100%] bg-[--background] h-[70px] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

                                <div className="flex justify-e w-[6vw] items-center gap-3">
                                    <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                                        <img src="/images/Sample.png" alt=""
                                            className='object-contain' />
                                    </div>
                                    <div className=''>
                                        <h2 className='text-white text-[18px] '>Tejas</h2>
                                    </div>
                                </div>
                                <div className='w-[100px] text-sm text-[--textgreen]'>
                                    <span>
                                        Owes you
                                    </span>
                                </div>
                                <div className='  '>
                                    <h1 className='text-[--textgreen]  text-[18px]'>+500</h1>
                                </div>
                            </div>
                            <div className=" card mt-3 w-[100%] bg-[--background] h-[70px] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

                                <div className="flex justify-e w-[6vw] items-center gap-3">
                                    <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                                        <img src="/images/Sample.png" alt=""
                                            className='object-contain' />
                                    </div>
                                    <div className=''>
                                        <h2 className='text-white text-[18px] '>Yasar</h2>
                                    </div>
                                </div>
                                <div className='w-[100px] text-sm text-[--textred]'>
                                    <span>
                                        You owe
                                    </span>
                                </div>
                                <div className='  '>
                                    <h1 className='text-[--textred]  text-[18px]'>+200</h1>
                                </div>
                            </div>
                            <div className=" card mt-3 w-[100%] bg-[--background] h-[70px] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">

                                <div className="flex justify-e w-[6vw] items-center gap-3">
                                    <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                                        <img src="/images/Sample.png" alt=""
                                            className='object-contain' />
                                    </div>
                                    <div className=''>
                                        <h2 className='text-white text-[18px] '>Sujal</h2>
                                    </div>
                                </div>
                                <div className='w-[100px] text-sm text-[--ternary]'>
                                    <span>
                                        Even
                                    </span>
                                </div>
                                <div className='  '>
                                    <h1 className='text-[--ternary]  text-[18px]'><Equal /></h1>
                                </div>
                            </div>
                          



                        </div>

                    </div>

                </div>

            </div>

            <div className='right-container h-[500px] mt-12 w-[40vw] flex flex-col items-center justify-center '>
                <div className='right-box h-[600px]  overflow w-[396px] bg-[--background2] shadow-lg shadow-black rounded-md'>
                    {/* Form Header */}
                    <div className='flex items-center h-[10vh] gap-3 mt-2 w-[80%] mx-auto'>
                        <h1 className='text-white text-[24px]'>Add Bill</h1>
                    </div>

                    {/* Form Content */}
                    <div className='form-content h-[50vh] w-[80%] mx-auto flex flex-col gap-4'>
                        {/* Description of Bill */}

                        <div className='flex  gap-2'>
                            <input
                                id='description'
                                type='text'
                                placeholder='Enter bill'
                                className='h-[40px] w-full bg-[--background] text-white rounded-md px-4 focus:outline-none shadow-md'
                            />
                            <select
                                name="category"
                                id="category"
                                className="bg-[--background2] border border-opacity-20 border-gray-100   outline-none rounded-md px-2 w-[9vw] text-white h-[40px] "
                            >
                                <option value="" disabled>Category</option>
                                <option value="Reading">Grocery</option>
                                <option value="Reading">Restaurant</option>
                                <option value="Reading">Commute</option>
                                <option value="Reading">Stationary</option>
                                <option value="Reading">Other</option>
                            </select>

                        </div>


                        {/* Members and Expenses */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-[--ternary] text-[18px]'>Members</label>

                            <div className='member-list h-[26vh] bg-[--background] rounded-md flex flex-col gap-3  overflow-y-auto custom-scrollbar px-4 py-2 shadow-md'>


                                <div className='flex justify-between items-center mb-2 mt-2'>
                                    <span className='text-white'>Tejas</span>
                                    <input
                                        type='text'
                                        placeholder='Expense'
                                        className='h-[30px] w-[80px] bg-[--background2] text-white rounded-md px-2 focus:outline-none shadow-inner'
                                    />
                                </div>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-white'>Sujal</span>
                                    <input
                                        type='text'
                                        placeholder='Expense'
                                        className='h-[30px] w-[80px] bg-[--background2] text-white rounded-md px-2 focus:outline-none shadow-inner'
                                    />
                                </div>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-white'>Sujal</span>
                                    <input
                                        type='text'
                                        placeholder='Expense'
                                        className='h-[30px] w-[80px] bg-[--background2] text-white rounded-md px-2 focus:outline-none shadow-inner'
                                    />
                                </div>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-white'>Yasar</span>
                                    <input
                                        type='text'
                                        placeholder='Expense'
                                        className='h-[30px] w-[80px] bg-[--background2] text-white rounded-md px-2 focus:outline-none shadow-inner'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className='flex flex-col gap-2'>
                            {/* <label htmlFor='paid-by' className='text-[--ternary] text-[18px]'>
                                Paid By
                            </label> */}
                            <select
                                id='paid-by'
                                className='h-[40px] w-[35%] bg-[--background] text-white rounded-md px-4 focus:outline-none shadow-md'
                            >
                                <option value='' disabled selected>
                                    Paid by
                                </option>
                                <option value='' disabled >Paid by</option>
                                <option value='Tejas'>Tejas</option>
                                <option value='Sujal'>Sujal</option>
                                <option value='Yasar'>Yasar</option>
                            </select>
                            <div className='flex justify-center mt-1'>
                                <button className='h-[40px] w-[30%] bg-[--primary] text-white rounded-md hover:scale-105 transition-all shadow-lg'>
                                    Add Bill
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default BillSplit