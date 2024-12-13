import React from 'react'
import { Link } from 'react-router-dom'

const GroupSplit = () => {
  return (
    <div className='flex flex-col h-[80vh] w-[100vw]'>

      <h1 className='mt-4 ml-5 text-[34px] text-[--heading] font-semibold '>Select group to split</h1>
      <div className='container flex flex-wrap overflow-y-auto   gap-5 overflow-y-autoflex w-[70vw] h-[600px] p-3  mx-5 mt-4'>

        {/* card */}

        <Link to='/split/billsplit/id'>
          <div className=' hover:scale-105  border-[--ternary card h-[230px] w-[200px] bg-[--background2] flex flex-col shadow-lg shadow-black rounded-md items-center justify-start'>
            <div className='mt-4'>
              <img src="/images/Sample.png" alt="" />
            </div>

            <h2 className='text-2xl text-white '> Buddies Corner</h2>

            <div className='flex flex-col items-start justify-start  px-10  w-[200px]'>
              <span className='text-[--heading] mt-2 text-sm'> Team members</span>
              <div className='mt flex flex-col rounded-md w-[120px]  pl-6 text-[--ternary] bg-[--background] mx-auto  text-sm'>
                <p>Sujal</p>
                <p>Tejas</p>
                <p>Yasar</p>
              </div>
            </div>

          </div>
        </Link>






      </div>
    </div>
  )
}

export default GroupSplit