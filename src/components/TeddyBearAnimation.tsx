import React from "react";
import { motion } from "framer-motion";

type TeddyBearProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  size?: "small" | "medium" | "large";
  className?: string;
};

const TeddyBearAnimation = ({ 
  position = "bottom-right",
  size = "medium",
  className = ""
}: TeddyBearProps) => {
  // Size configurations
  const sizeConfig = {
    small: { width: 80, height: 80 },
    medium: { width: 120, height: 120 },
    large: { width: 160, height: 160 },
  };

  // Position configurations
  const positionConfig = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  // Animation variants
  const teddyVariants = {
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  const { width, height } = sizeConfig[size];

  return (
    <motion.div
      className={`fixed ${positionConfig[position]} z-10 ${className}`}
      variants={teddyVariants}
      animate="bounce"
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      style={{ width, height }}
    >
      {/* Teddy bear body */}
      <div className="w-full h-full relative">
        {/* Body */}
        <div className="absolute w-3/4 h-4/5 bg-amber-700 dark:bg-amber-800 rounded-3xl bottom-0 left-1/2 transform -translate-x-1/2 border-2 border-amber-900"></div>
        
        {/* Head */}
        <div className="absolute w-4/5 h-3/5 bg-amber-700 dark:bg-amber-800 rounded-full top-0 left-1/2 transform -translate-x-1/2 border-2 border-amber-900"></div>
        
        {/* Ears */}
        <div className="absolute w-1/4 h-1/4 bg-amber-700 dark:bg-amber-800 rounded-full top-0 left-1/4 transform -translate-x-1/2 border-2 border-amber-900"></div>
        <div className="absolute w-1/4 h-1/4 bg-amber-700 dark:bg-amber-800 rounded-full top-0 right-1/4 transform translate-x-1/2 border-2 border-amber-900"></div>
        
        {/* Inner ears */}
        <div className="absolute w-1/6 h-1/6 bg-amber-300 dark:bg-amber-400 rounded-full top-[5%] left-1/4 transform -translate-x-1/2"></div>
        <div className="absolute w-1/6 h-1/6 bg-amber-300 dark:bg-amber-400 rounded-full top-[5%] right-1/4 transform translate-x-1/2"></div>
        
        {/* Eyes */}
        <div className="absolute w-[12%] h-[12%] bg-black dark:bg-black rounded-full top-[25%] left-[30%] border border-black"></div>
        <div className="absolute w-[12%] h-[12%] bg-black dark:bg-black rounded-full top-[25%] right-[30%] border border-black"></div>
        
        {/* Eye shine */}
        <div className="absolute w-[5%] h-[5%] bg-white dark:bg-white rounded-full top-[26%] left-[30%]"></div>
        <div className="absolute w-[5%] h-[5%] bg-white dark:bg-white rounded-full top-[26%] right-[30%]"></div>
        
        {/* Nose */}
        <div className="absolute w-[15%] h-[10%] bg-amber-950 dark:bg-amber-950 rounded-full top-[38%] left-1/2 transform -translate-x-1/2 border border-black"></div>
        
        {/* Smiling mouth */}
        <div className="absolute w-[40%] h-[10%] border-b-4 border-amber-950 rounded-b-full top-[45%] left-1/2 transform -translate-x-1/2"></div>
        
        {/* Cheeks */}
        <div className="absolute w-[15%] h-[8%] bg-amber-400 dark:bg-amber-500 rounded-full opacity-70 top-[40%] left-[18%]"></div>
        <div className="absolute w-[15%] h-[8%] bg-amber-400 dark:bg-amber-500 rounded-full opacity-70 top-[40%] right-[18%]"></div>
        
        {/* Arms */}
        <div className="absolute w-1/5 h-1/3 bg-amber-700 dark:bg-amber-800 rounded-2xl bottom-1/3 left-0 transform -rotate-12 border-2 border-amber-900"></div>
        <div className="absolute w-1/5 h-1/3 bg-amber-700 dark:bg-amber-800 rounded-2xl bottom-1/3 right-0 transform rotate-12 border-2 border-amber-900"></div>
        
        {/* Legs */}
        <div className="absolute w-1/4 h-1/4 bg-amber-700 dark:bg-amber-800 rounded-2xl bottom-0 left-[20%] border-2 border-amber-900"></div>
        <div className="absolute w-1/4 h-1/4 bg-amber-700 dark:bg-amber-800 rounded-2xl bottom-0 right-[20%] border-2 border-amber-900"></div>
        
        {/* Belly */}
        <div className="absolute w-1/2 h-2/5 bg-amber-300 dark:bg-amber-400 rounded-full bottom-[15%] left-1/2 transform -translate-x-1/2"></div>
      </div>
    </motion.div>
  );
};

export default TeddyBearAnimation; 