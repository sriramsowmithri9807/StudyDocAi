
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TeddyBear, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'teddy';
  timestamp: Date;
}

const TeddyAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial greeting when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        id: 1,
        text: "Hi there! I'm Teddy, your study buddy. How can I help you today?",
        sender: 'teddy' as const,
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages([initialMessage]);
      }, 500);
    }
  }, [isOpen, messages.length]);
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responseMessage: Message = {
        id: messages.length + 2,
        text: generateResponse(inputMessage),
        sender: 'teddy',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, responseMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };
  
  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return "Hello there! How can I help you with your studies today?";
    } else if (lowerInput.includes("help") || lowerInput.includes("assist")) {
      return "I'd be happy to help! I can explain concepts, create flashcards, or quiz you on your study material. What would you like to work on?";
    } else if (lowerInput.includes("thanks") || lowerInput.includes("thank you")) {
      return "You're welcome! I'm always here to help. Is there anything else you'd like to know?";
    } else if (lowerInput.includes("study") || lowerInput.includes("learn")) {
      return "What subject are you studying? I can help with creating summaries, flashcards, or practice questions.";
    } else if (lowerInput.includes("exam") || lowerInput.includes("test")) {
      return "Preparing for an exam? Let's create a study plan together. What's the exam about and when is it?";
    } else {
      return "That's interesting! Would you like me to help you understand this topic better or create study materials about it?";
    }
  };
  
  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      toast({
        title: "Teddy is here!",
        description: "Your AI study buddy is ready to help",
      });
    } else {
      setIsMinimized(!isMinimized);
    }
  };
  
  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating chat button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        >
          <TeddyBear className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "auto",
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Card className="border shadow-lg overflow-hidden">
              <CardHeader className="bg-purple-50 p-3 border-b flex flex-row justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 bg-purple-100">
                    <AvatarFallback className="bg-purple-200 text-purple-700">
                      <TeddyBear className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-sm">Teddy</h3>
                    <p className="text-xs text-gray-500">Your AI Study Buddy</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 rounded-full"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={closeChat}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  <CardContent className="p-3 h-80 overflow-y-auto bg-gray-50">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          className={`mb-3 flex ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className={`rounded-lg px-3 py-2 max-w-[80%] ${
                              message.sender === "user"
                                ? "bg-purple-600 text-white"
                                : "bg-white border shadow-sm"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-[10px] mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div
                          className="mb-3 flex justify-start"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="rounded-lg px-3 py-2 bg-white border shadow-sm">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full bg-purple-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                              <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </AnimatePresence>
                  </CardContent>

                  <CardFooter className="p-3 border-t bg-white">
                    <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask Teddy anything..."
                        className="flex-1"
                      />
                      <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardFooter>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeddyAIChat;
