import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/sonner";
import { Clock, Play, Pause, RefreshCw, RotateCcw, Check, Bell, BellOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PandaAnimationBW from "@/components/PandaAnimationBW";
import TeddyBearAnimation from "@/components/TeddyBearAnimation";

const Pomodoro = () => {
  // Max time 3 hours in seconds
  const maxTime = 3 * 60 * 60;
  const [timeLeft, setTimeLeft] = useState(25 * 60); // default 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pomodoroType, setPomodoroType] = useState<"focus" | "break">("focus");
  const [pandaMood, setPandaMood] = useState<"reading" | "happy">("reading");
  
  // Format time to mm:ss or hh:mm:ss
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && !isPaused && timeLeft > 0) {
      setPandaMood("reading");
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (pomodoroType === "focus") {
        toast.success("Focus session completed! Take a break.");
        setPomodoroType("break");
        setTimeLeft(5 * 60); // 5 minute break
        setPandaMood("happy");
      } else {
        toast.success("Break time over! Ready for another focus session?");
        setPomodoroType("focus");
        setTimeLeft(25 * 60); // 25 minute focus
        setPandaMood("reading");
      }
      setIsRunning(false);
    } else if (!isRunning && !isPaused) {
      setPandaMood(pomodoroType === "focus" ? "reading" : "happy");
    }
    
    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft, pomodoroType]);
  
  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };
  
  const pauseTimer = () => {
    setIsPaused(true);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(25 * 60);
    setPomodoroType("focus");
    setPandaMood("reading");
    toast.info("Timer reset!");
  };
  
  const handleSliderChange = (value: number[]) => {
    if (!isRunning) {
      const newTime = Math.round((value[0] / 100) * maxTime);
      setTimeLeft(newTime > 0 ? newTime : 60); // Minimum 1 minute
    }
  };
  
  const timePercentage = (timeLeft / maxTime) * 100;
  
  // Animation variants
  const leafVariants = {
    wave: {
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Custom giant panda size
  const giantPandaStyle = { 
    width: 280, 
    height: 280,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 0
  };
  
  return (
    <div className="min-h-[calc(100vh-16rem)] relative overflow-hidden">
      {/* Custom positioned and sized giant panda */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <PandaAnimationBW 
          mood={pandaMood} 
          className="opacity-40 hover:opacity-60" 
          position="center"
          size="large"
        />
      </motion.div>
      
      {/* Teddy bear animation */}
      <TeddyBearAnimation position="top-right" size="small" className="opacity-80" />
      
      {/* Forest Background with enhanced visibility for dark mode */}
      <div className="absolute inset-0 forest-bg opacity-20 dark:opacity-40 z-0 dark:bg-blend-luminosity"></div>
      
      {/* Gradient overlay for better contrast in dark mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>
      
      {/* Animated leaves and elements with enhanced visibility */}
      <motion.div 
        className="absolute top-10 right-10 text-green-700 dark:text-green-500 opacity-70 z-5"
        variants={leafVariants}
        animate="wave"
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-lg">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-10 text-green-700 dark:text-green-500 opacity-70 z-5"
        variants={leafVariants}
        animate="wave"
        initial={{ rotate: 180 }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-lg">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </motion.div>
      
      <div className="container px-4 py-16 relative z-20">
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-primary mb-2">Panda Pomodoro Timer</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Set your study sessions with our friendly panda companion. Balance your work with breaks to maximize productivity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 w-full max-w-6xl">
            {/* Removed original panda animation section */}
            <motion.div 
              className="col-span-1 lg:col-span-3 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <div className="relative w-full h-[400px] flex justify-center items-center">
                {/* Green grass base with better visibility in dark mode */}
                <div className="absolute bottom-0 w-full h-20 bg-green-600 dark:bg-green-700 rounded-full opacity-40 dark:opacity-50 shadow-md"></div>
                
                {/* Light source effect to highlight the panda in dark mode */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background dark:from-transparent dark:to-background/20 rounded-full opacity-0 dark:opacity-30"></div>
              </div>
            </motion.div>
            
            {/* Timer controls with better contrast */}
            <div className="col-span-1 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-2 border-primary/30 dark:border-primary/40 shadow-xl">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <Badge variant={pomodoroType === "focus" ? "default" : "outline"} className="text-sm mb-2">
                        {pomodoroType === "focus" ? "Focus Time" : "Break Time"}
                      </Badge>
                      <div className="text-6xl font-bold text-center font-mono py-6 text-primary dark:text-primary">
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <p className="text-sm text-muted-foreground mb-2">Adjust timer (up to 3 hours):</p>
                      <Slider
                        defaultValue={[timePercentage]}
                        max={100}
                        step={1}
                        disabled={isRunning}
                        onValueChange={handleSliderChange}
                        className="mb-6"
                      />
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      {!isRunning || isPaused ? (
                        <Button 
                          onClick={startTimer} 
                          size="lg" 
                          className="gap-2 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-white shadow-md"
                        >
                          <Play size={20} className="fill-white" />
                          {isPaused ? "Resume" : "Start"}
                        </Button>
                      ) : (
                        <Button 
                          onClick={pauseTimer} 
                          size="lg" 
                          variant="outline" 
                          className="gap-2 border-2 border-primary dark:border-primary hover:bg-primary/10 dark:hover:bg-primary/20 shadow-md"
                        >
                          <Pause size={20} className="text-primary dark:text-primary" />
                          Pause
                        </Button>
                      )}
                      <Button 
                        onClick={resetTimer} 
                        variant="outline" 
                        size="lg" 
                        className="gap-2 border-2 border-muted-foreground dark:border-muted-foreground hover:bg-muted dark:hover:bg-muted/30 shadow-md"
                      >
                        <RefreshCw size={20} className="text-muted-foreground dark:text-muted-foreground" />
                        Reset
                      </Button>
                    </div>
                    
                    <motion.div 
                      className="mt-6 text-xs text-center text-muted-foreground dark:text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                    >
                      <p>Pomodoro technique: Focus for 25 minutes, then take a 5 minute break.</p>
                      <p>Adjust the timer to your preference (up to 3 hours).</p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
