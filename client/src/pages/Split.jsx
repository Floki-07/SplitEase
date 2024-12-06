import React from 'react'
import {
  UserRound, Users
} from "lucide-react";
import { useEffect } from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Split = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show modal when the page loads
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="relative w-[100vw] h-[90vh]">
      {/* Overlay */}
      <div
        className="absolute top-0 w-full h-full bg-black/25"
      />

      {/* Modal Content */}
      <motion.div
        className="absolute  top-[26vh] left-[1vw] bg-[--background3] w-[20vw] h-[18vh] rounded-lg shadow-lg shadow-black delay-300"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        exit="hidden"
        variants={modalVariants}
        transition={{ duration: 1.0 }}
      >
        {/* First Section */}
        <div className="h-[50%] flex justify-center items-center">
          <Link to='friendsplit' className='w-[80%]   '>
            <div className="first bg-[--background2] h-[40px] w-100%] rounded-lg flex gap-2 items-center justify-start px-2 text-[--ternary] hover:cursor-pointer hover:scale-105">
              <UserRound />
              <span >Split with friend</span>
            </div>

          </Link>
        </div>

        {/* Second Section */}
        <div className="h-[40%] flex justify-center items-center">
        <Link to='/split/groupsplit' className='w-[80%]   '>
            <div className="first bg-[--background2] h-[40px] w-100%] rounded-lg flex gap-2 items-center justify-start px-2 text-[--ternary] hover:cursor-pointer hover:scale-105">
            <Users />
            <span><Link to='groupsplit'>Split with group</Link></span>
            </div>

          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Split
