import React, { children } from 'react'

const Button = ({children}) => {
    return (
        <div>
            <button className=' hover:bg-violet-500 text-center bg-[--primary] py-2 px-3 w-[7vw] rounded-md text-bold text-white'>
                <span className='font-semibold'>{children}</span>
            </button>
        </div>
    )
}

export default Button
