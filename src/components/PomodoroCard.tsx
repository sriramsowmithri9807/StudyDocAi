
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import PandaAnimation from "@/components/PandaAnimation";

const PomodoroCard = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
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
          <div className="w-32 h-32 relative mb-4">
            <PandaAnimation mood="reading" size="medium" />
          </div>
          
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
