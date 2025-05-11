
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Calendar, ArrowRight, Clock, CheckCircle, Users, Book } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's your study plan for today.</p>
        </div>
        <Button>
          Generate New Plan <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" /> Today's Schedule
            </CardTitle>
            <CardDescription>Your personalized study plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {timeTable.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-md border">
                <div>
                  <div className="flex items-center">
                    <span className={`font-medium ${item.completed ? "line-through text-gray-400" : ""}`}>
                      {item.subject}
                    </span>
                    {item.completed && (
                      <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{item.duration} minutes</div>
                </div>
                {!item.completed && (
                  <Button size="sm" onClick={() => completeTask(index)}>Complete</Button>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" /> View Full Schedule
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" /> Active Study Rooms
            </CardTitle>
            <CardDescription>Join your friends in a study session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-md border">
              <div className="font-medium">Organic Chemistry Group</div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-sm text-gray-500">3 participants</div>
                <Badge>Active</Badge>
              </div>
            </div>
            <div className="p-3 rounded-md border">
              <div className="font-medium">Calculus Study Group</div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-sm text-gray-500">5 participants</div>
                <Badge>Active</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Create New Room</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5" /> AI Assistant
            </CardTitle>
            <CardDescription>Get help with your studies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-md border">
                <div className="font-medium">Upload study material</div>
                <div className="text-sm text-gray-500 mt-1">Get summaries and flashcards</div>
              </div>
              <div className="p-3 rounded-md border">
                <div className="font-medium">Ask a question</div>
                <div className="space-y-2 mt-2">
                  <Input placeholder="Type your question..." />
                  <Button className="w-full">Ask AI</Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View AI Study Tools</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
