
import React from "react";
import { motion } from "framer-motion";

type PandaProps = {
  mood?: "happy" | "sad" | "reading" | "walking";
  size?: "small" | "medium" | "large";
  className?: string;
};

const PandaAnimation = ({ mood = "happy", size = "medium", className = "" }: PandaProps) => {
  // Size configurations
  const sizeConfig = {
    small: { width: 80, height: 80 },
    medium: { width: 120, height: 120 },
    large: { width: 160, height: 160 },
  };

  // Animation variants
  const pandaVariants = {
    happy: {
      scale: [1, 1.05, 1],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
    sad: {
      scale: [1, 0.95, 1],
      y: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
    reading: {
      rotate: [-1, 1, -1],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
    walking: {
      x: [0, 15, 0, -15, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  };

  const { width, height } = sizeConfig[size];

  return (
    <motion.div
      className={`relative ${className}`}
      variants={pandaVariants}
      animate={mood}
      style={{ width, height }}
    >
      {/* Base panda body - now in black and white */}
      <div className={`w-full h-full relative`}>
        {/* Body */}
        <div className="absolute w-3/4 h-3/4 bg-white rounded-full bottom-0 left-1/2 transform -translate-x-1/2"></div>
        
        {/* Head */}
        <div className="absolute w-3/4 h-3/4 bg-white rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
        
        {/* Ears */}
        <div className="absolute w-1/4 h-1/4 bg-black rounded-full top-0 left-1/4 transform -translate-x-1/2"></div>
        <div className="absolute w-1/4 h-1/4 bg-black rounded-full top-0 right-1/4 transform translate-x-1/2"></div>
        
        {/* Eyes */}
        {mood === "sad" ? (
          <>
            <div className="absolute w-1/6 h-[8%] bg-black rounded-full top-[30%] left-[35%] transform -rotate-12"></div>
            <div className="absolute w-1/6 h-[8%] bg-black rounded-full top-[30%] right-[35%] transform rotate-12"></div>
            
            {/* Sad tears */}
            <div className="absolute w-[8%] h-[15%] bg-gray-400 rounded-full opacity-70 top-[40%] left-[34%]"></div>
            <div className="absolute w-[8%] h-[15%] bg-gray-400 rounded-full opacity-70 top-[40%] right-[34%]"></div>
          </>
        ) : (
          <>
            <div className="absolute w-1/6 h-1/6 bg-black rounded-full top-[30%] left-[30%]"></div>
            <div className="absolute w-1/6 h-1/6 bg-black rounded-full top-[30%] right-[30%]"></div>
            
            {/* Eye shine */}
            <div className="absolute w-[8%] h-[8%] bg-white rounded-full top-[32%] left-[30%]"></div>
            <div className="absolute w-[8%] h-[8%] bg-white rounded-full top-[32%] right-[30%]"></div>
          </>
        )}
        
        {/* Mouth */}
        {mood === "sad" ? (
          <div className="absolute w-1/4 h-[8%] border-b-4 border-black rounded-b-full bottom-[40%] left-1/2 transform -translate-x-1/2"></div>
        ) : (
          <div className="absolute w-1/4 h-[8%] border-t-4 border-black rounded-t-full bottom-[40%] left-1/2 transform -translate-x-1/2"></div>
        )}
        
        {/* Nose */}
        <div className="absolute w-1/6 h-[8%] bg-black rounded-full top-[46%] left-1/2 transform -translate-x-1/2"></div>
        
        {/* Black cheeks */}
        <div className="absolute w-1/8 h-[8%] bg-gray-300 rounded-full opacity-60 top-[40%] left-[20%]"></div>
        <div className="absolute w-1/8 h-[8%] bg-gray-300 rounded-full opacity-60 top-[40%] right-[20%]"></div>
        
        {/* Arms */}
        <div className="absolute w-1/6 h-1/3 bg-black rounded-full bottom-1/4 left-1/8 transform -rotate-12"></div>
        <div className="absolute w-1/6 h-1/3 bg-black rounded-full bottom-1/4 right-1/8 transform rotate-12"></div>
        
        {/* Legs */}
        <div className="absolute w-1/5 h-1/5 bg-black rounded-full bottom-0 left-1/4"></div>
        <div className="absolute w-1/5 h-1/5 bg-black rounded-full bottom-0 right-1/4"></div>
        
        {/* Book for reading mood - black and white */}
        {mood === "reading" && (
          <motion.div 
            className="absolute w-2/3 h-1/3 bg-black rounded bottom-[15%] left-1/2 transform -translate-x-1/2"
            animate={{
              rotate: [-2, 2, -2],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            <div className="w-[90%] h-[80%] bg-white m-[5%] rounded"></div>
          </motion.div>
        )}
        
        {/* Boba for happy mood - black and white */}
        {mood === "happy" && (
          <motion.div 
            className="absolute w-1/3 h-1/2 bg-gray-700 rounded-lg bottom-[15%] left-[20%]"
            animate={{
              rotate: [-5, 5, -5],
              transition: { duration: 2.5, repeat: Infinity }
            }}
          >
            <div className="w-[80%] h-[70%] bg-gray-300 m-[10%] mt-[15%] rounded-lg"></div>
            <div className="absolute w-[15%] h-[5%] bg-gray-900 rounded-full top-[15%] left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-[15%] h-[15%] bg-black rounded-full top-[40%] left-[30%]"></div>
            <div className="absolute w-[15%] h-[15%] bg-black rounded-full top-[60%] left-[50%]"></div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PandaAnimation;
