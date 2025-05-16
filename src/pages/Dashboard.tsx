import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Book, CalendarPlus, Save } from "lucide-react";
import { motion } from "framer-motion";
import PomodoroCard from "@/components/PomodoroCard";
import { toast } from "@/hooks/use-toast";
import PandaAnimationBW from "@/components/PandaAnimationBW";
import TeddyBearAnimation from "@/components/TeddyBearAnimation";

const Dashboard = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  // New state for quick schedule form
  const [quickSchedule, setQuickSchedule] = useState({
    subject: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuickSchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save quick schedule
  const saveQuickSchedule = () => {
    // Validate form
    if (!quickSchedule.subject || !quickSchedule.date || !quickSchedule.startTime || !quickSchedule.endTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to add to your schedule",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to a database or state management
    // Here we'll just save to localStorage as an example
    const savedSchedules = JSON.parse(localStorage.getItem("studySchedules") || "[]");
    
    // Add the new schedule with unique ID
    savedSchedules.push({
      id: Date.now(),
      subject: quickSchedule.subject,
      date: quickSchedule.date,
      startTime: quickSchedule.startTime,
      endTime: quickSchedule.endTime,
      completed: false
    });
    
    // Save back to localStorage
    localStorage.setItem("studySchedules", JSON.stringify(savedSchedules));
    
    // Show success message
    toast({
      title: "Schedule saved!",
      description: `Added ${quickSchedule.subject} to your schedule on ${new Date(quickSchedule.date).toLocaleDateString()}`,
    });
    
    // Reset form
    setQuickSchedule({
      subject: "",
      date: "",
      startTime: "",
      endTime: ""
    });
  };

  return (
    <div className="container px-4 py-8 relative">
      <PandaAnimationBW position="bottom-right" size="medium" />
      <TeddyBearAnimation position="top-left" size="small" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center mb-8"
      >
        <motion.h1 
          className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Transform Your Study Experience with StudyDoc AI<motion.span 
            className="text-purple-600"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
          >AI</motion.span>
        </motion.h1>
        <p className="text-muted-foreground text-center max-w-xl">
          Your personalized AI-powered study companion for MBBS and Engineering students
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Schedule Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="overflow-hidden border-2 border-blue-100 dark:border-blue-800 h-full">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Calendar className="h-5 w-5" />
                Schedule
              </CardTitle>
              <CardDescription>
                View and manage your study timetable
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="border p-2 rounded-md">
                  <p className="font-medium">Organic Chemistry</p>
                  <p className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</p>
                </div>
                <div className="border p-2 rounded-md">
                  <p className="font-medium">Circuit Theory</p>
                  <p className="text-sm text-muted-foreground">1:00 PM - 2:30 PM</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/schedule" className="w-full">
                <Button variant="outline" className="w-full" size="sm">
                  View Full Schedule
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Study Rooms Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="overflow-hidden border-2 border-purple-100 dark:border-purple-800 h-full">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="h-5 w-5" />
                Study Rooms
              </CardTitle>
              <CardDescription>
                Join live study sessions with peers
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="border p-2 rounded-md">
                  <p className="font-medium">Anatomy Study Group</p>
                  <p className="text-sm text-muted-foreground">4 students online</p>
                </div>
                <div className="border p-2 rounded-md">
                  <p className="font-medium">Data Structures</p>
                  <p className="text-sm text-muted-foreground">2 students online</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex gap-2 w-full">
                <Link to="/study-room/general" className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    Join Room
                  </Button>
                </Link>
                <Link to="/create-room" className="flex-1">
                  <Button className="w-full" size="sm">
                    Create Room
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        {/* AI Assistant Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="overflow-hidden border-2 border-amber-100 dark:border-amber-800 h-full">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Book className="h-5 w-5" />
                AI Assistant
              </CardTitle>
              <CardDescription>
                Get help with your studies
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="border p-2 rounded-md">
                  <p className="text-sm text-muted-foreground">Upload your notes and get AI summaries</p>
                </div>
                <div className="border p-2 rounded-md">
                  <p className="text-sm text-muted-foreground">Ask questions and get instant answers</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/ai-assistant" className="w-full">
                <Button variant="outline" className="w-full" size="sm">
                  Open AI Assistant
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Pomodoro Card */}
        <PomodoroCard />

      </motion.div>

      {/* Add Schedule Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5" />
              Quick Schedule
            </CardTitle>
            <CardDescription>
              Add a new study session to your schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={quickSchedule.subject}
                    onChange={handleInputChange}
                    placeholder="e.g., Anatomy, Circuit Theory..."
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <input 
                    type="date" 
                    name="date"
                    value={quickSchedule.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <input 
                    type="time" 
                    name="startTime"
                    value={quickSchedule.startTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Time</label>
                  <input 
                    type="time" 
                    name="endTime"
                    value={quickSchedule.endTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md" 
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={saveQuickSchedule}>
              <Save className="mr-2 h-4 w-4" /> Add to Schedule
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
