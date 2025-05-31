import React from 'react'
import {
  UserRound,
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Split = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show modal when the page loads
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants for the modal
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0 
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative w-[100vw] h-[90vh] overflow-hidden">
      {/* Enhanced Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050D35] via-[#121944] to-[#050D35]" />
      
      {/* Animated Background Elements */}
      {/* <div className="absolute top-10 left-10 w-32 h-32 bg-[#796FFE] opacity-10 rounded-full blur-xl animate-pulse" /> */}
        {/* <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#3C9A87] opacity-10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#B8B8FF] opacity-5 rounded-full blur-lg animate-bounce" /> */}

      {/* Overlay with subtle pattern */}
      <div className="absolute top-0 w-full h-full bg-black/20 backdrop-blur-[1px]" />

      {/* Header Section */}
      <div className="absolute top-[15vh] left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-[#796FFE] w-6 h-6" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#796FFE] to-[#3C9A87] bg-clip-text text-transparent">
            Choose Split Option
          </h1>
          <Sparkles className="text-[#3C9A87] w-6 h-6" />
        </div>
        <p className="text-[#B8B8FF] opacity-80 text-sm mt-4">
          Select how you'd like to split your expenses
        </p>
      </div>

      {/* Enhanced Modal Content */}
      <div
        className={`absolute top-[26vh] left-1/2 transform -translate-x-1/2 mt-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}
      >
        <div className="bg-gradient-to-br from-[#262C5A] to-[#121944] w-[350px] rounded-2xl shadow-2xl border border-[#796FFE]/20 backdrop-blur-sm relative overflow-hidden">
          
          {/* Decorative border gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#796FFE]/20 via-transparent to-[#3C9A87]/20 p-[1px]">
            <div className="w-full h-full bg-gradient-to-br from-[#262C5A] to-[#121944] rounded-2xl" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-8 space-y-6">
            
            {/* First Section - Friend Split */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              <Link to='friendsplit'  className="group w-full bg-gradient-to-r from-[#121944] to-[#262C5A] hover:from-[#796FFE]/20 hover:to-[#796FFE]/10 h-16 rounded-xl flex items-center justify-between px-6 text-[#B8B8FF] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#796FFE]/25 border border-transparent hover:border-[#796FFE]/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#796FFE]/20 rounded-lg flex items-center justify-center group-hover:bg-[#796FFE]/30 transition-colors">
                    <UserRound className="w-5 h-5 text-[#796FFE]" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white group-hover:text-[#B8B8FF] transition-colors">
                      Split with Friend
                    </div>
                    <div className="text-xs text-[#B8B8FF]/60 group-hover:text-[#B8B8FF]/80">
                      Share expenses between two people
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#796FFE] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#796FFE]/30 to-transparent" />
              <span className="text-[#B8B8FF]/40 text-xs font-medium">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#796FFE]/30 to-transparent" />
            </div>

            {/* Second Section - Group Split */}
            <div
              className={`transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              <Link to='groupsplit' className="group w-full bg-gradient-to-r from-[#121944] to-[#262C5A] hover:from-[#3C9A87]/20 hover:to-[#3C9A87]/10 h-16 rounded-xl flex items-center justify-between px-6 text-[#B8B8FF] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#3C9A87]/25 border border-transparent hover:border-[#3C9A87]/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#3C9A87]/20 rounded-lg flex items-center justify-center group-hover:bg-[#3C9A87]/30 transition-colors">
                    <Users className="w-5 h-5 text-[#3C9A87]" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white group-hover:text-[#B8B8FF] transition-colors">
                      Split with Group
                    </div>
                    <div className="text-xs text-[#B8B8FF]/60 group-hover:text-[#B8B8FF]/80">
                      Share expenses among multiple people
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#3C9A87] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 text-[#B8B8FF]/40 text-xs">
          <div className="w-2 h-2 bg-[#796FFE]/50 rounded-full animate-pulse" />
          <span>Choose your preferred splitting method</span>
          <div className="w-2 h-2 bg-[#3C9A87]/50 rounded-full animate-pulse delay-500" />
        </div>
      </div>
    </div>
  );
};

export default Split;