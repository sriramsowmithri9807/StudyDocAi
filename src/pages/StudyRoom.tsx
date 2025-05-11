
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Mic, MicOff, Video, VideoOff, Share, Users, MessageSquare, ScreenShare } from "lucide-react";

const StudyRoom = () => {
  const { roomId } = useParams();
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [message, setMessage] = useState("");
  const [participants] = useState([
    { id: 1, name: "Jane Cooper", active: true },
    { id: 2, name: "Alex Brown", active: true },
    { id: 3, name: "Emma Wilson", active: false }
  ]);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Jane Cooper", text: "Has anyone solved problem 3.4 yet?", time: "11:45 AM" },
    { id: 2, sender: "Alex Brown", text: "I'm working on it, give me a few minutes", time: "11:47 AM" }
  ]);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    toast({
      title: isMicOn ? "Microphone Off" : "Microphone On",
      description: isMicOn ? "Your microphone has been turned off" : "Your microphone has been turned on",
    });
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Video Off" : "Video On",
      description: isVideoOn ? "Your camera has been turned off" : "Your camera has been turned on",
    });
  };

  const toggleScreenShare = () => {
    setIsSharing(!isSharing);
    toast({
      title: isSharing ? "Stopped Sharing" : "Started Sharing",
      description: isSharing ? "You've stopped sharing your screen" : "You're now sharing your screen",
    });
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: "You",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Room: {roomId}</h1>
          <p className="text-gray-500">Collaborate with your study group in real-time</p>
        </div>
        <Badge variant="outline" className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          Active Session
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="min-h-[400px]">
            <CardHeader>
              <CardTitle>Video Conference</CardTitle>
              <CardDescription>Connect with voice and video</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-[300px] bg-gray-100 dark:bg-gray-800 rounded-md">
              {isVideoOn ? (
                <div className="text-center">Video is active</div>
              ) : (
                <div className="text-center">
                  <VideoOff className="h-16 w-16 mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-500">Video is off</p>
                </div>
              )}
              <div className="mt-auto flex justify-center gap-3 py-4">
                <Button 
                  size="icon" 
                  variant={isMicOn ? "default" : "outline"} 
                  onClick={toggleMic}
                >
                  {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                <Button 
                  size="icon" 
                  variant={isVideoOn ? "default" : "outline"} 
                  onClick={toggleVideo}
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                <Button 
                  size="icon" 
                  variant={isSharing ? "default" : "outline"} 
                  onClick={toggleScreenShare}
                >
                  <ScreenShare className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="whiteboard" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>
              <TabsTrigger value="notes">Shared Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="whiteboard" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Collaborative Whiteboard</CardTitle>
                  <CardDescription>Draw and explain concepts together</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Share className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-4">Click to start collaborating on the whiteboard</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Shared Notes</CardTitle>
                  <CardDescription>Take notes together in real-time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-4">Click to start taking notes together</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" /> Participants
              </CardTitle>
              <CardDescription>{participants.filter(p => p.active).length} active users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {participants.map(participant => (
                <div key={participant.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{participant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{participant.name}</span>
                  </div>
                  <Badge variant={participant.active ? "default" : "outline"}>
                    {participant.active ? "Active" : "Away"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" /> Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 h-[300px] overflow-y-auto mb-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}>
                    <div className={`px-3 py-2 rounded-lg ${msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <div className="font-medium text-sm">{msg.sender}</div>
                      <div>{msg.text}</div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit">Send</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyRoom;
