import React from "react";
import { motion } from "framer-motion";

type PandaProps = {
  mood?: "happy" | "sad" | "reading" | "walking";
  size?: "small" | "medium" | "large";
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
};

const PandaAnimationBW = ({ 
  mood = "reading", 
  size = "medium", 
  className = "",
  position = "bottom-right"
}: PandaProps) => {
  // Size configurations
  const sizeConfig = {
    small: { width: 80, height: 80 },
    medium: { width: 120, height: 120 },
    large: { width: 200, height: 200 },
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
      className={`absolute ${positionConfig[position]} ${className}`}
      variants={pandaVariants}
      animate={{
        ...pandaVariants[mood],
        opacity: 0.7
      }}
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1, scale: 1.1 }}
      transition={{ duration: 0.3 }}
      style={{ width, height }}
    >
      {/* Base panda body - Black and White Only */}
      <div className={`w-full h-full relative`}>
        {/* Body - with outline */}
        <div className="absolute w-3/4 h-3/4 bg-white dark:bg-gray-200 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 border-2 border-black"></div>
        
        {/* Head - with outline */}
        <div className="absolute w-3/4 h-3/4 bg-white dark:bg-gray-200 rounded-full top-0 left-1/2 transform -translate-x-1/2 border-2 border-black"></div>
        
        {/* Ears */}
        <div className="absolute w-1/4 h-1/4 bg-black dark:bg-black rounded-full top-0 left-1/4 transform -translate-x-1/2 border border-black"></div>
        <div className="absolute w-1/4 h-1/4 bg-black dark:bg-black rounded-full top-0 right-1/4 transform translate-x-1/2 border border-black"></div>
        
        {/* Eyes */}
        {mood === "sad" ? (
          <>
            <div className="absolute w-1/6 h-[8%] bg-black dark:bg-black rounded-full top-[30%] left-[35%] transform -rotate-12 border border-black"></div>
            <div className="absolute w-1/6 h-[8%] bg-black dark:bg-black rounded-full top-[30%] right-[35%] transform rotate-12 border border-black"></div>
            
            {/* Sad tears - now gray */}
            <div className="absolute w-[8%] h-[15%] bg-gray-400 dark:bg-gray-500 rounded-full opacity-80 top-[40%] left-[34%]"></div>
            <div className="absolute w-[8%] h-[15%] bg-gray-400 dark:bg-gray-500 rounded-full opacity-80 top-[40%] right-[34%]"></div>
          </>
        ) : (
          <>
            <div className="absolute w-1/6 h-1/6 bg-black dark:bg-black rounded-full top-[30%] left-[30%] border border-black"></div>
            <div className="absolute w-1/6 h-1/6 bg-black dark:bg-black rounded-full top-[30%] right-[30%] border border-black"></div>
            
            {/* Eye shine */}
            <div className="absolute w-[8%] h-[8%] bg-white dark:bg-white rounded-full top-[32%] left-[30%]"></div>
            <div className="absolute w-[8%] h-[8%] bg-white dark:bg-white rounded-full top-[32%] right-[30%]"></div>
          </>
        )}
        
        {/* Mouth */}
        {mood === "sad" ? (
          <div className="absolute w-1/4 h-[8%] border-b-4 border-black dark:border-black rounded-b-full bottom-[40%] left-1/2 transform -translate-x-1/2"></div>
        ) : (
          <div className="absolute w-1/4 h-[8%] border-t-4 border-black dark:border-black rounded-t-full bottom-[40%] left-1/2 transform -translate-x-1/2"></div>
        )}
        
        {/* Nose */}
        <div className="absolute w-1/6 h-[8%] bg-black dark:bg-black rounded-full top-[46%] left-1/2 transform -translate-x-1/2 border border-black"></div>
        
        {/* Cheeks - now light gray */}
        <div className="absolute w-1/8 h-[8%] bg-gray-300 dark:bg-gray-400 rounded-full opacity-70 top-[40%] left-[20%]"></div>
        <div className="absolute w-1/8 h-[8%] bg-gray-300 dark:bg-gray-400 rounded-full opacity-70 top-[40%] right-[20%]"></div>
        
        {/* Arms */}
        <div className="absolute w-1/6 h-1/3 bg-black dark:bg-black rounded-full bottom-1/4 left-1/8 transform -rotate-12 border border-black"></div>
        <div className="absolute w-1/6 h-1/3 bg-black dark:bg-black rounded-full bottom-1/4 right-1/8 transform rotate-12 border border-black"></div>
        
        {/* Legs */}
        <div className="absolute w-1/5 h-1/5 bg-black dark:bg-black rounded-full bottom-0 left-1/4 border border-black"></div>
        <div className="absolute w-1/5 h-1/5 bg-black dark:bg-black rounded-full bottom-0 right-1/4 border border-black"></div>
        
        {/* Book for reading mood - now grayscale */}
        {mood === "reading" && (
          <motion.div 
            className="absolute w-2/3 h-1/3 bg-gray-800 dark:bg-black rounded bottom-[15%] left-1/2 transform -translate-x-1/2 border-2 border-black shadow-lg"
            animate={{
              rotate: [-2, 2, -2],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            <div className="w-[90%] h-[80%] bg-white dark:bg-gray-200 m-[5%] rounded border border-gray-500"></div>
            {/* Book details */}
            <div className="absolute w-[60%] h-[5%] bg-gray-400 dark:bg-gray-500 top-[25%] left-[20%] rounded-sm"></div>
            <div className="absolute w-[60%] h-[5%] bg-gray-400 dark:bg-gray-500 top-[40%] left-[20%] rounded-sm"></div>
            <div className="absolute w-[60%] h-[5%] bg-gray-400 dark:bg-gray-500 top-[55%] left-[20%] rounded-sm"></div>
          </motion.div>
        )}
        
        {/* Drink for happy mood - now grayscale */}
        {mood === "happy" && (
          <motion.div 
            className="absolute w-1/3 h-1/2 bg-gray-800 dark:bg-black rounded-lg bottom-[15%] left-[20%] border-2 border-black shadow-lg"
            animate={{
              rotate: [-5, 5, -5],
              transition: { duration: 2.5, repeat: Infinity }
            }}
          >
            <div className="w-[80%] h-[70%] bg-gray-200 dark:bg-gray-300 m-[10%] mt-[15%] rounded-lg border border-gray-400"></div>
            <div className="absolute w-[15%] h-[5%] bg-black rounded-full top-[15%] left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-[15%] h-[15%] bg-black rounded-full top-[40%] left-[30%] border border-black"></div>
            <div className="absolute w-[15%] h-[15%] bg-black rounded-full top-[60%] left-[50%] border border-black"></div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PandaAnimationBW; 