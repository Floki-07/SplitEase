import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const Signup = () => {

  const handleOauth = () => {
    console.log('hi');

  }
  const [isLoading, setisLoading] = useState(false);


  const responseGoogle=async (authResult) => { 
      try {
        console.log(authResult);
        
      } catch (err) {
        console.log('Error while req google code'+ err)
      }
   }

  const googleLogin=useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:'auth-code'
  })



  return (
    <div className='flex justify-center items-center h-full w-full'>
      <div className='bg-[var(--background2)]  w-[24vw] h-[60vh] rounded-md'>

        <div className='text-white flex flex-col  items-center mt-10 ' >
          <h1 className='text-[28px] font-semibold text-[--ternary]'> Create an account</h1>
       
        </div>


    <div className='mt-8'>
      
    <button
          className="h-[50px] w-[73%] bg-[var(--background3)] mx-auto mt-2 text-white flex justify-center items-center gap-3  px-2 rounded-[5px] text-[--ternary]"
          onClick={googleLogin}
        >

          <span className='text-[--ternary]'>Continue with google</span>

          <img
            src="/images/google.png"
            alt=""
            className="h-[32px] w-[32px] mr-4"
          />
        </button>

        <div className=" relative h-2 w-[80%] mx-auto flex items-center justify-center pt-[23px] pb-[23px]">

          <hr className="border-[--ternary] opacity-20 h-[1px] w-[120px]" />
          <p className='mx-1 text-[--ternary]'>OR</p>
          <hr className="border-[--ternary] opacity-20 h-[1px] w-[120px]" />
        </div>

        <div className='h-[50px] w-[73%] bg-[var(--background3)] mx-auto mt-1 text-white flex justify-center items-center gap-3   rounded-[5px] text-[--ternary] '>
          <input
            type="text"
            className="h-[50px] w-[14vw]   bg-inherit rounded-[5px] p-1 text-[--ternary] focus:outline-none"
            placeholder="Enter your email"
            name="email"
          // value={formdata.email}
          // onChange={updateForm}
          />

        </div>
    </div>

        <div className="h-[40px] w-[50%] mt-7 bg-[var(--primary)] hover:bg-[]  flex justify-center items-center rounded-[5px] mx-auto focus:outline  ">
          {isLoading ? <Spinner /> : <button
            className=""
          // onClick={handleSubmit}
          >
            <span className='text-white text-sm    '>Continue with email</span>
          </button>}
        </div>
        
        <div className='text-white flex flex-col  items-center  ' >
          <span className=' tracking-wide mt-2 font-light text-sm'>Already have a account ? <span className='text-[--ternary] underline'>  <Link to="/login">Login</Link></span></span>
        </div>
      </div>

    </div>
  )
}

export default Signup
