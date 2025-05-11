
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Brain, Book } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-16rem)]">
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge variant="outline" className="inline-flex">
                  AI-Powered Study Platform
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Transform Your Study Experience with StudySync<span className="text-purple-600">AI</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Unlock your academic potential with AI-powered timetables, collaborative study rooms, and intelligent learning tools designed for MBBS and Engineering students.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/dashboard">
                  <Button size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/study-room/general">
                  <Button size="lg" variant="outline">
                    Join Study Room
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-full w-full">
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 to-purple-700 opacity-20 blur-3xl rounded-full"></div>
                <div className="relative bg-white dark:bg-gray-900 border rounded-xl shadow-lg p-6">
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Today's Schedule</div>
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 rounded-md border bg-gray-50 dark:bg-gray-800">
                        <div className="font-medium">Organic Chemistry</div>
                        <div className="text-sm text-gray-500">10:00 AM - 11:00 AM</div>
                      </div>
                      <div className="p-3 rounded-md border bg-gray-50 dark:bg-gray-800">
                        <div className="font-medium">Circuit Theory</div>
                        <div className="text-sm text-gray-500">1:00 PM - 2:30 PM</div>
                      </div>
                      <div className="p-3 rounded-md border bg-gray-50 dark:bg-gray-800">
                        <div className="font-medium">Anatomy Study Group</div>
                        <div className="text-sm text-gray-500">4:00 PM - 5:30 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features That Empower Your Study</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Everything you need to succeed in your academic journey
              </p>
            </div>
          </div>
          
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Calendar className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold">AI Timetables</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Smart schedules that adapt to your exam timeline and learning habits
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold">Study Rooms</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Collaborate with peers through voice, video, and shared whiteboards
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Brain className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold">AI Assistant</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Get instant answers and explanations from your AI study companion
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Book className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold">Study Materials</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Turn textbooks and notes into flashcards and quizzes automatically
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
