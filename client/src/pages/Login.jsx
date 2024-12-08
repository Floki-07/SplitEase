import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Login successful:', response);

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token); // Save token securely in localStorage
        window.location.href = '/home'; // Redirect user to the home/dashboard page
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  const handleOauth = () => {
    window.location.href = 'http://localhost:3000/auth/google/callback';
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="bg-[var(--background2)] w-[24vw] h-[500px] rounded-md">
        <div className="text-white flex flex-col items-center mt-10">
          <h1 className="text-[28px] font-semibold text-[--ternary]">Login</h1>
        </div>

        <div className="mt-8">
          <button
            className="h-[50px] w-[73%] bg-[var(--background3)] mx-auto mt-2 text-white flex justify-center items-center gap-3 px-2 rounded-[5px] text-[--ternary]"
            onClick={handleOauth}
          >
            <span className="text-[--ternary]">Continue with Google</span>
            <img src="/images/google.png" alt="" className="h-[32px] w-[32px] mr-4" />
          </button>

          <div className="relative h-2 w-[80%] mx-auto flex items-center justify-center pt-[23px] pb-[23px]">
            <hr className="border-[--ternary] opacity-20 h-[1px] w-[120px]" />
            <p className="mx-1 text-[--ternary]">OR</p>
            <hr className="border-[--ternary] opacity-20 h-[1px] w-[120px]" />
          </div>

          {error && (
            <div className="text-red-500 text-md text-center mt-2 mb-1">{error}</div>
          )}

          <form method="post" onSubmit={handleSubmit}>
            <div className="h-[50px] w-[73%] bg-[var(--background3)] mx-auto mt-1 rounded-[5px]">
              <input
                type="email"
                className="h-[50px] w-[14vw] bg-inherit rounded-[5px] p-1 text-[--ternary] focus:outline-none"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="h-[50px] w-[73%] bg-[var(--background3)] mx-auto mt-1 rounded-[5px]">
              <input
                type="password"
                className="h-[50px] w-[14vw] bg-inherit rounded-[5px] p-1 text-[--ternary] focus:outline-none"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="h-[40px] w-[50%] mt-7 bg-[var(--primary)] flex justify-center items-center rounded-[5px] mx-auto">
              {isLoading ? (
                <span className="text-white text-sm">Loading...</span>
              ) : (
                <button className="text-white text-sm" type="submit">
                  Login with email
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="text-white flex flex-col items-center">
          <span className="tracking-wide mt-2 font-light text-sm">
            Don't have an account?{' '}
            <span className="text-[--ternary] underline">
              <Link to="/signup">Signup</Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
