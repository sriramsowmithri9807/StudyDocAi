
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { Users, Video, MessageSquare, Mic, ScreenShare, PhoneOff } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";
import StudyRoomPanda from "@/components/StudyRoomPanda";

const StudyRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [message, setMessage] = useState("");
  const [isInCall, setIsInCall] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      toast.success("Message sent!");
      setMessage("");
    }
  };

  const toggleCall = () => {
    setIsInCall(!isInCall);
    if (!isInCall) {
      toast.success("Joined voice chat!");
    } else {
      toast("Left voice chat");
    }
  };

  // Mock data
  const participants = [
    { id: 1, name: "Jane Cooper", avatar: "https://i.pravatar.cc/150?img=1", status: "active", role: "Host" },
    { id: 2, name: "Alex Smith", avatar: "https://i.pravatar.cc/150?img=2", status: "active", role: "Member" },
    { id: 3, name: "Michael Brown", avatar: "https://i.pravatar.cc/150?img=3", status: "away", role: "Member" },
  ];

  const messages = [
    { id: 1, user: "Jane Cooper", message: "Hi everyone! Ready to study Organic Chemistry?", time: "10:30 AM", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, user: "Alex Smith", message: "Yes, I've been struggling with the reaction mechanisms.", time: "10:32 AM", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, user: "You", message: "I can help with that. Let's start with the basics.", time: "10:33 AM", avatar: "https://i.pravatar.cc/150?img=8" },
  ];

  return (
    <div className="container mx-auto py-6 relative">
      {/* Decorative pandas */}
      <StudyRoomPanda position="left" delay={0.5} />
      <StudyRoomPanda position="right" delay={0.8} isActive={isInCall} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Study Room: {roomId}</h1>
          <p className="text-gray-500">Organic Chemistry Discussion</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Invite
          </Button>
          <Button variant="destructive" onClick={() => window.history.back()}>Leave Room</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue="voice" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="voice">
                <Mic className="mr-2 h-4 w-4" />
                Voice Chat
              </TabsTrigger>
              <TabsTrigger value="video">
                <Video className="mr-2 h-4 w-4" />
                Video
              </TabsTrigger>
              <TabsTrigger value="screen">
                <ScreenShare className="mr-2 h-4 w-4" />
                Screen Share
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voice" className="border rounded-lg p-6">
              <div className="text-center">
                <div className="flex justify-center mb-8">
                  <div className="grid grid-cols-3 gap-4">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex flex-col items-center">
                        <Avatar className="h-20 w-20 mb-2">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>{participant.name[0]}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium">{participant.name}</p>
                        <Badge variant={participant.status === "active" ? "default" : "outline"}>
                          {participant.status === "active" ? "Speaking" : "Muted"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="lg" onClick={toggleCall}>
                    {isInCall ? <PhoneOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                    {isInCall ? "Leave Voice Chat" : "Join Voice Chat"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video">
              <div className="text-center p-12 border rounded-lg">
                <Video className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium">Video Chat</h3>
                <p className="text-gray-500 mb-4">Start a video session with your study group</p>
                <Button>Start Video Chat</Button>
              </div>
            </TabsContent>

            <TabsContent value="screen">
              <div className="text-center p-12 border rounded-lg">
                <ScreenShare className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium">Screen Sharing</h3>
                <p className="text-gray-500 mb-4">Share your screen with the group</p>
                <Button>Share Screen</Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Group Chat
              </CardTitle>
              <CardDescription>Discuss with your study partners</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.user === "You" ? "justify-end" : ""}`}>
                  {msg.user !== "You" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>{msg.user[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`max-w-[70%] ${msg.user === "You" ? "bg-primary text-primary-foreground" : "bg-secondary"} rounded-lg px-4 py-2`}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={msg.user === "You" ? "text-primary-foreground" : "text-gray-500"}>{msg.user}</span>
                      <span className={msg.user === "You" ? "text-primary-foreground" : "text-gray-500"}>{msg.time}</span>
                    </div>
                    <p>{msg.message}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSendMessage} className="w-full flex space-x-2">
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit">Send</Button>
              </form>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
              <CardDescription>{participants.length} people in this room</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-xs text-gray-500">{participant.role}</p>
                    </div>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${participant.status === "active" ? "bg-green-500" : "bg-gray-300"}`}></div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <MusicPlayer />
          
          <Card>
            <CardHeader>
              <CardTitle>Study Session</CardTitle>
              <CardDescription>Current topic: Organic Chemistry</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Session Time</p>
                  <p className="text-2xl font-bold">01:45:22</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Progress</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-right mt-1 text-gray-500">65% of today's goal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyRoom;
