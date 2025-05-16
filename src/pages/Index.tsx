import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Brain, Book } from "lucide-react";
import { motion } from "framer-motion";
import PandaAnimationBW from "@/components/PandaAnimationBW";
import TeddyBearAnimation from "@/components/TeddyBearAnimation";

const Index = () => {
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

  const heroImageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const scheduleItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="relative">
      <PandaAnimationBW position="bottom-right" size="medium" mood="happy" />
      <TeddyBearAnimation position="bottom-left" size="small" />
      
      <div className="flex flex-col min-h-[calc(100vh-16rem)]">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div 
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Badge variant="outline" className="inline-flex">
                      AI-Powered Document Study Assistant
                    </Badge>
                  </motion.div>
                  
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
                  
                  <motion.p 
                    className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Unlock your academic potential with AI-powered timetables, collaborative study rooms, and intelligent learning tools designed for MBBS and Engineering students.
                  </motion.p>
                </div>
                
                <motion.div 
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link to="/dashboard">
                      <Button size="lg">
                        Get Started
                      </Button>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link to="/study-room/general">
                      <Button size="lg" variant="outline">
                        Join Study Room
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center"
                variants={heroImageVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="relative h-full w-full">
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 to-purple-700 opacity-20 blur-3xl rounded-full"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  
                  <motion.div 
                    className="relative bg-white dark:bg-gray-900 border rounded-xl shadow-lg p-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                  >
                    <div className="space-y-8">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Today's Schedule</div>
                        <Calendar className="h-5 w-5" />
                      </div>
                      
                      <motion.div 
                        className="space-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.div 
                          className="p-3 rounded-md border bg-gray-50 dark:bg-gray-800"
                          variants={scheduleItemVariants}
                          whileHover={{ scale: 1.02, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
                        >
                          <div className="font-medium">Organic Chemistry</div>
                          <div className="text-sm text-gray-500">10:00 AM - 11:00 AM</div>
                        </motion.div>
                        
                        <motion.div 
                          className="p-3 rounded-md border bg-gray-50 dark:bg-gray-800"
                          variants={scheduleItemVariants}
                          whileHover={{ scale: 1.02, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
                        >
                          <div className="font-medium">Circuit Theory</div>
                          <div className="text-sm text-gray-500">1:00 PM - 2:30 PM</div>
                        </motion.div>
                        
                        <motion.div 
                          className="p-3 rounded-md border bg-gray-50 dark:bg-gray-800"
                          variants={scheduleItemVariants}
                          whileHover={{ scale: 1.02, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
                        >
                          <div className="font-medium">Anatomy Study Group</div>
                          <div className="text-sm text-gray-500">4:00 PM - 5:30 PM</div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <motion.section 
          className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features That Empower Your Study</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to succeed in your academic journey
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={featureVariants}>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Calendar className="h-12 w-12 text-purple-600 mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-bold">AI Timetables</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Smart schedules that adapt to your exam timeline and learning habits
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={featureVariants}>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Users className="h-12 w-12 text-purple-600 mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-bold">Study Rooms</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Collaborate with peers through voice, video, and shared whiteboards
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={featureVariants}>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Brain className="h-12 w-12 text-purple-600 mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-bold">AI Assistant</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Get instant answers and explanations from your AI study companion
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={featureVariants}>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Book className="h-12 w-12 text-purple-600 mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-bold">Study Materials</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Turn textbooks and notes into flashcards and quizzes automatically
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
