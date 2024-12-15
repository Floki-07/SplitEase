import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[var(--background)] text-white font-[var(--outfit)]">
      {/* Navbar */}
      {/* <header className="flex justify-between items-center px-8 py-4 bg-[var(--background2)]">
        <h1 className="text-3xl font-bold text-[var(--primary)]">SplitEase</h1>
        <nav>
          <ul className="flex gap-8 text-[var(--ternary)]">
            <li><a href="#features" className="hover:text-[var(--primary)]">Features</a></li>
            <li><a href="#about" className="hover:text-[var(--primary)]">About</a></li>
            <li><a href="#contact" className="hover:text-[var(--primary)]">Contact</a></li>
          </ul>
        </nav>
      </header> */}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-[85px] font-extrabold text-[var(--primary)] drop-shadow-md">SplitEase</h1>
        <h2 className="text-3xl font-bold text-[var(--heading)] mt-4">
          Your Ultimate Expense Tracking and Bill Splitting Solution
        </h2>
        <p className="mt-4 text-lg text-[var(--ternary)] max-w-2xl">
          Say goodbye to awkward bill calculations and manual tracking. SplitEase makes group expenses effortless and fun.
        </p>
        <div className="flex gap-4 mt-6" >
          <button onClick={() => { navigate('/signup') }}
            className="w-[180px] px-8 py-3 bg-[var(--primary)] text-white rounded-full hover:bg-opacity-80 transition-all duration-300 shadow-lg">
            Get Started
          </button>
          <button onClick={() => { navigate('/login') }}
            className="w-[180px] px-8 py-3 bg-[var(--background2)] text-[var(--primary)] border-2 border-[var(--primary)] rounded-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300 shadow-lg">
            Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-[var(--background3)] px-8">
        <h3 className="text-4xl font-bold text-[var(--heading)] text-center mb-8">Features</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-[var(--background2)] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-2xl font-semibold text-[var(--primary)]">Expense Tracking</h4>
            <p className="mt-4 text-[var(--ternary)]">
              Monitor your daily expenses and stay on top of your budget with our intuitive tracking system.
            </p>
          </div>
          <div className="p-6 bg-[var(--background2)] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-2xl font-semibold text-[var(--primary)]">Bill Splitting</h4>
            <p className="mt-4 text-[var(--ternary)]">
              Simplify shared expenses with seamless bill-splitting tools for any group.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-8">
        <h3 className="text-4xl font-bold text-[var(--heading)] text-center mb-8">About Us</h3>
        <p className="text-center text-[var(--ternary)] max-w-3xl mx-auto leading-7">
          SplitEase is your one-stop solution for managing group expenses. Whether you're dining out with friends,
          traveling with family, or sharing a household, SplitEase ensures everyone pays their fair share.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--background2)] py-8">
        <div className="text-center">
          <p className="text-[var(--ternary)] mb-4">
            © {new Date().getFullYear()} SplitEase. All rights reserved.
          </p>
          <a
            href="https://github.com/Floki-07/SplitEase"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:text-[var(--heading)] transition-all duration-300"
          >
            View on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
