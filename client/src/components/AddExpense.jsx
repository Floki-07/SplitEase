import React from 'react'
import Button from './Button'

const AddExpense = ({ setExpensOpen }) => {
    return (
        <>
            <div onClick={() => setExpensOpen(false)} className="h-full w-full absolute bg-black/50 top-0 left-0 flex items-center z-[10]">

                <div className="relative bg-[#121944] h-[360px] w-[320px] mx-auto rounded-md translate-x-8 translate-y-[-10%] z-[20] px-8 py-6 flex flex-col items-start gap-3 " onClick={(e) => e.stopPropagation()}>
                    <div className="
                    flex items-center justify-center w-full
                    ">
                        <h1 className='text-center text-white text-[22px] font-semibold'>ADD EXPENSE</h1>
                    </div>
                    <input
                        type="text"
                        className="text-md outline-none text-white  w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1 py-2"
                        placeholder="Enter Expense  "
                        autoFocus
                    />
                    <input
                        type="text"
                        className="text-md outline-none text-white  w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1 py-2"
                        placeholder="Enter Description  "
                        autoFocus
                    />
                    <label htmlFor="" className='text-[--ternary] text-sm  text-start'>Enter Date</label>
                    <input
                        type="date"
                        className="text-md outline-none text-white  w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1 translate-y-[-20%] py-2"
                        placeholder="Enter Expense  "
                        autoFocus
                    />
                    <select
                        name="category"
                        id="category"
                        className="bg-[--background2] border border-opacity-20 border-gray-100 py-1 outline-none rounded-sm px-2 w-[9vw] text-white h-[40px]"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Category
                        </option>
                        <option value="Grocery">Grocery</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Commute">Commute</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Other">Other</option>
                    </select>
                    <div className="
                    flex items-center justify-center w-full
                    ">
                        <Button>Save</Button>


                    </div>

                </div>
            </div>
        </>
    )
}

export default AddExpense