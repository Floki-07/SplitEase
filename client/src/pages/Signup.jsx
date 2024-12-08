import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupForm = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/signup', formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        navigate('/login'); // Redirect on successful signup
      } else {
        setError(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error during signup.');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOauth = () => {
    window.location.href = 'http://localhost:3000/auth/google/callback';
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="bg-[var(--background2)] w-[24vw] h-[520px] rounded-md">
        <div className="text-white flex flex-col items-center mt-10">
          <h1 className="text-[28px] font-semibold text-[--ternary]">Create an account</h1>
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

          <form onSubmit={handleSignupForm} method="post">
            <div className="h-[50px] w-[73%] bg-[var(--background3)] mx-auto mt-1 rounded-[5px]">
              <input
                type="text"
                className="h-[50px] w-[14vw] bg-inherit rounded-[5px] p-1 text-[--ternary] focus:outline-none"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

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
                  Signup with email
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="text-white flex flex-col items-center">
          <span className="tracking-wide mt-2 font-light text-sm">
            Already have an account?{' '}
            <span className="text-[--ternary] underline">
              <Link to="/login">Login</Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
