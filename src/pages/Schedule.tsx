import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Calendar, Clock, CheckCircle, Edit, Plus, Save } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PandaAnimation from "@/components/PandaAnimation";
import SchedulePanda from "@/components/SchedulePanda";

interface Task {
  id: number;
  subject: string;
  duration: number;
  date: string;
  completed: boolean;
  description: string;
}

const Schedule = () => {
  const [schedule, setSchedule] = useState<Task[]>([]);

  // Load schedules from localStorage on component mount
  useEffect(() => {
    // Get schedules from localStorage
    const savedSchedules = localStorage.getItem("studySchedules");
    
    if (savedSchedules) {
      try {
        const parsedSchedules = JSON.parse(savedSchedules);
        setSchedule(parsedSchedules);
      } catch (error) {
        console.error("Error parsing saved schedules:", error);
        // If there's an error, use default schedules
        setSchedule([
          { id: 1, subject: "Organic Chemistry", duration: 60, date: "2025-05-13", completed: false, description: "Study chapters 5-7" },
          { id: 2, subject: "Applied Mathematics", duration: 45, date: "2025-05-13", completed: true, description: "Practice differential equations" },
          { id: 3, subject: "Physiology", duration: 90, date: "2025-05-14", completed: false, description: "Review nervous system" },
          { id: 4, subject: "Data Structures", duration: 120, date: "2025-05-14", completed: false, description: "Implement binary trees" },
          { id: 5, subject: "World History", duration: 60, date: "2025-05-15", completed: false, description: "Read about Renaissance period" },
        ]);
      }
    } else {
      // If no saved schedules, use default ones
      setSchedule([
        { id: 1, subject: "Organic Chemistry", duration: 60, date: "2025-05-13", completed: false, description: "Study chapters 5-7" },
        { id: 2, subject: "Applied Mathematics", duration: 45, date: "2025-05-13", completed: true, description: "Practice differential equations" },
        { id: 3, subject: "Physiology", duration: 90, date: "2025-05-14", completed: false, description: "Review nervous system" },
        { id: 4, subject: "Data Structures", duration: 120, date: "2025-05-14", completed: false, description: "Implement binary trees" },
        { id: 5, subject: "World History", duration: 60, date: "2025-05-15", completed: false, description: "Read about Renaissance period" },
      ]);
    }
  }, []);

  // Save schedules to localStorage whenever schedule changes
  useEffect(() => {
    if (schedule.length > 0) {
      localStorage.setItem("studySchedules", JSON.stringify(schedule));
    }
  }, [schedule]);

  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    subject: "",
    duration: 0,
    date: "",
    description: ""
  });

  const completeTask = (id: number) => {
    const newSchedule = schedule.map(task => 
      task.id === id ? { ...task, completed: true } : task
    );
    setSchedule(newSchedule);
    toast({
      title: "Task completed!",
      description: `You've completed ${schedule.find(task => task.id === id)?.subject}`,
    });
  };

  const startEditTask = (task: Task) => {
    setEditingTask(task.id);
    setEditForm({
      subject: task.subject,
      duration: task.duration,
      date: task.date,
      description: task.description
    });
  };

  const saveEditTask = () => {
    if (editingTask === null) return;
    
    const newSchedule = schedule.map(task => 
      task.id === editingTask 
        ? { 
            ...task, 
            subject: editForm.subject,
            duration: editForm.duration,
            date: editForm.date,
            description: editForm.description
          } 
        : task
    );
    
    setSchedule(newSchedule);
    setEditingTask(null);
    
    toast({
      title: "Task updated",
      description: "Your study schedule has been updated successfully",
    });
  };

  // Add new task functionality
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    subject: "",
    duration: 60,
    date: new Date().toISOString().split('T')[0],
    description: ""
  });

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value
    }));
  };

  const addNewTask = () => {
    // Validate form
    if (!newTask.subject || !newTask.date) {
      toast({
        title: "Missing information",
        description: "Please fill in at least subject and date",
        variant: "destructive"
      });
      return;
    }

    // Create new task with unique ID
    const newTaskWithId: Task = {
      ...newTask,
      id: Date.now(),
      completed: false
    };

    setSchedule(prev => [...prev, newTaskWithId]);
    
    // Reset form and close dialog
    setNewTask({
      subject: "",
      duration: 60,
      date: new Date().toISOString().split('T')[0],
      description: ""
    });
    setIsAddTaskDialogOpen(false);
    
    toast({
      title: "Task added!",
      description: `Added ${newTask.subject} to your schedule on ${new Date(newTask.date).toLocaleDateString()}`,
    });
  };

  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  const generateAiSchedule = () => {
    // This would connect to an AI service in a real implementation
    // For now, we'll simulate a response
    
    toast({
      title: "AI Schedule Generated!",
      description: "Your study schedule has been optimized based on your preferences",
    });
    
    // Close the dialog
    setIsAiDialogOpen(false);
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

  // Group tasks by date
  const tasksByDate = schedule.reduce((acc, task) => {
    if (!acc[task.date]) {
      acc[task.date] = [];
    }
    acc[task.date].push(task);
    return acc;
  }, {} as Record<string, typeof schedule>);

  // Sort dates
  const sortedDates = Object.keys(tasksByDate).sort();

  return (
    <div className="space-y-6 relative">
      {/* Decorative panda */}
      <div className="fixed bottom-10 right-10 z-10">
        <PandaAnimation mood="reading" size="small" />
      </div>
      
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
            Study Schedule
          </motion.h1>
          <motion.p 
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Manage your study plan and optimize your learning time.
          </motion.p>
        </div>

        <div className="flex space-x-2">
          <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
            <DialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" /> Optimize with AI
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>AI Schedule Optimization</DialogTitle>
                <DialogDescription>
                  Tell our AI what you want to learn and your preferences, and it will create an optimized schedule for you.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  placeholder="E.g., 'I need to prepare for my biology exam in 2 weeks. I prefer studying in the mornings for 1-2 hours.'"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <DialogFooter>
                <Button type="submit" onClick={generateAiSchedule}>Generate Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add new task dialog */}
          <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
            <DialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Study Task</DialogTitle>
                <DialogDescription>
                  Create a new study task for your schedule
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input 
                    name="subject"
                    value={newTask.subject}
                    onChange={handleNewTaskChange}
                    placeholder="E.g., Organic Chemistry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input 
                    type="number" 
                    name="duration"
                    value={newTask.duration}
                    onChange={handleNewTaskChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    type="date" 
                    name="date"
                    value={newTask.date}
                    onChange={handleNewTaskChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    name="description"
                    value={newTask.description}
                    onChange={handleNewTaskChange}
                    placeholder="What topics will you study?"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={addNewTask}>
                  <Save className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Link to="/create-room">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Study Room
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {sortedDates.length > 0 ? (
          sortedDates.map(date => (
            <motion.div key={date} variants={itemVariants} className="space-y-4">
              <h2 className="text-xl font-semibold">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h2>
              <Card className="relative overflow-hidden">
                <SchedulePanda />
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" /> Study Tasks
                  </CardTitle>
                  <CardDescription>Your planned study sessions for this day</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tasksByDate[date].map((task) => (
                    <motion.div 
                      key={task.id} 
                      className="p-3 rounded-md border"
                      whileHover={{ scale: 1.01, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {editingTask === task.id ? (
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium">Subject</label>
                            <Input 
                              value={editForm.subject} 
                              onChange={(e) => setEditForm({...editForm, subject: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Duration (minutes)</label>
                            <Input 
                              type="number" 
                              value={editForm.duration} 
                              onChange={(e) => setEditForm({...editForm, duration: parseInt(e.target.value)})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Date</label>
                            <Input 
                              type="date" 
                              value={editForm.date} 
                              onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <Textarea 
                              value={editForm.description} 
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2"
                              onClick={() => setEditingTask(null)}
                            >
                              Cancel
                            </Button>
                            <Button size="sm" onClick={saveEditTask}>
                              <Save className="mr-1 h-4 w-4" /> Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <span className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
                                {task.subject}
                              </span>
                              {task.completed && (
                                <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <div className="flex space-x-2">
                              {!task.completed && (
                                <Button variant="ghost" size="sm" onClick={() => startEditTask(task)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                              {!task.completed && (
                                <Button size="sm" onClick={() => completeTask(task.id)}>Complete</Button>
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">Duration: {task.duration} minutes</div>
                          <div className="text-sm mt-2">{task.description}</div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No tasks scheduled yet</h3>
            <p className="text-gray-500 mb-4">Add your first study task to get started</p>
            <Button onClick={() => setIsAddTaskDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Your First Task
            </Button>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default Schedule;
