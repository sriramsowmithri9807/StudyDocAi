
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Calendar, ArrowRight, Clock, CheckCircle, Users, Book } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [timeTable, setTimeTable] = useState<{ subject: string; duration: number; completed: boolean }[]>([
    { subject: "Organic Chemistry", duration: 60, completed: false },
    { subject: "Applied Mathematics", duration: 45, completed: true },
    { subject: "Physiology", duration: 90, completed: false }
  ]);

  const completeTask = (index: number) => {
    const newTimeTable = [...timeTable];
    newTimeTable[index].completed = true;
    setTimeTable(newTimeTable);
    toast({
      title: "Task completed!",
      description: `You've completed ${newTimeTable[index].subject}`,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const taskVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 30
      } 
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.h1 
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Dashboard
          </motion.h1>
          <motion.p 
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Welcome back! Here's your study plan for today.
          </motion.p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button>
            Generate New Plan <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" /> Today's Schedule
              </CardTitle>
              <CardDescription>Your personalized study plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {timeTable.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex justify-between items-center p-3 rounded-md border"
                  variants={taskVariants}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div>
                    <div className="flex items-center">
                      <span className={`font-medium ${item.completed ? "line-through text-gray-400" : ""}`}>
                        {item.subject}
                      </span>
                      {item.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        >
                          <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{item.duration} minutes</div>
                  </div>
                  {!item.completed && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Button size="sm" onClick={() => completeTask(index)}>Complete</Button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </CardContent>
            <CardFooter>
              <Link to="/schedule" className="w-full">
                <motion.div 
                  className="w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" /> View Full Schedule
                  </Button>
                </motion.div>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" /> Active Study Rooms
              </CardTitle>
              <CardDescription>Join your friends in a study session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div 
                className="p-3 rounded-md border"
                whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="font-medium">Organic Chemistry Group</div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-sm text-gray-500">3 participants</div>
                  <Badge>Active</Badge>
                </div>
              </motion.div>
              <motion.div 
                className="p-3 rounded-md border"
                whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="font-medium">Calculus Study Group</div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-sm text-gray-500">5 participants</div>
                  <Badge>Active</Badge>
                </div>
              </motion.div>
            </CardContent>
            <CardFooter>
              <Link to="/create-room" className="w-full">
                <motion.div 
                  className="w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button variant="outline" className="w-full">Create New Room</Button>
                </motion.div>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5" /> AI Assistant
              </CardTitle>
              <CardDescription>Get help with your studies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div 
                  className="p-3 rounded-md border"
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="font-medium">Upload study material</div>
                  <div className="text-sm text-gray-500 mt-1">Get summaries and flashcards</div>
                </motion.div>
                <motion.div 
                  className="p-3 rounded-md border"
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="font-medium">Ask a question</div>
                  <div className="space-y-2 mt-2">
                    <Input placeholder="Type your question..." />
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Button className="w-full">Ask AI</Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/ai-assistant" className="w-full">
                <motion.div 
                  className="w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button variant="outline" className="w-full">View AI Study Tools</Button>
                </motion.div>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
