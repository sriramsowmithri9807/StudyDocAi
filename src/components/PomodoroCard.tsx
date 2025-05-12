
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const PomodoroCard = () => {
  // Animation variants for the panda
  const pandaVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }
    },
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <Card className="overflow-hidden border-2 border-green-200 dark:border-green-800 h-full">
        <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Clock className="h-5 w-5" />
            Pomodoro Timer
          </CardTitle>
          <CardDescription>
            Focus better with timed study sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-6 flex flex-col items-center">
          {/* Panda reading animation */}
          <motion.div
            className="w-32 h-32 relative mb-4"
            variants={pandaVariants}
          >
            {/* Panda */}
            <div className="absolute w-full h-full">
              {/* Body */}
              <div className="absolute w-24 h-24 bg-white rounded-full top-4 left-4"></div>
              
              {/* Head */}
              <div className="absolute w-16 h-16 bg-white rounded-full top-0 left-8"></div>
              
              {/* Ears */}
              <div className="absolute w-6 h-6 bg-black rounded-full top-0 left-6"></div>
              <div className="absolute w-6 h-6 bg-black rounded-full top-0 right-6"></div>
              
              {/* Eyes */}
              <div className="absolute w-3 h-5 bg-black rounded-full top-6 left-10"></div>
              <div className="absolute w-3 h-5 bg-black rounded-full top-6 right-10"></div>
              
              {/* Eye Highlights */}
              <div className="absolute w-1 h-1 bg-white rounded-full top-7 left-11"></div>
              <div className="absolute w-1 h-1 bg-white rounded-full top-7 right-9"></div>
              
              {/* Nose */}
              <div className="absolute w-3 h-2 bg-black rounded-full top-12 left-1/2 transform -translate-x-1/2"></div>
              
              {/* Arms */}
              <div className="absolute w-6 h-10 bg-black rounded-full top-14 left-2 transform rotate-[-30deg]"></div>
              <div className="absolute w-6 h-10 bg-black rounded-full top-14 right-2 transform rotate-[30deg]"></div>
              
              {/* Legs */}
              <div className="absolute w-6 h-8 bg-black rounded-full bottom-0 left-6"></div>
              <div className="absolute w-6 h-8 bg-black rounded-full bottom-0 right-6"></div>
              
              {/* Book */}
              <motion.div 
                className="absolute w-16 h-10 bg-green-700 rounded bottom-8 left-8"
                animate={{
                  rotate: [-2, 2, -2],
                  transition: {
                    repeat: Infinity,
                    duration: 2,
                  }
                }}
              >
                <div className="w-14 h-8 bg-amber-50 m-1 rounded"></div>
              </motion.div>
            </div>
          </motion.div>
          
          <p className="text-center text-sm text-gray-500 mb-4">
            Use our cute Panda Pomodoro Timer to boost your productivity with scheduled focus and break sessions.
          </p>
        </CardContent>
        <CardFooter className="pt-0 px-6 pb-6">
          <Link to="/pomodoro" className="w-full">
            <Button className="w-full" size="sm">
              Start Pomodoro Timer
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PomodoroCard;
