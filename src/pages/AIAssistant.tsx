
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Upload, FilePlus, FileText, Brain, MessageSquare, Book, Zap, HelpCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AIAssistant = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, question: "Explain the Krebs cycle in simple terms", answer: "The Krebs cycle is a series of chemical reactions that helps generate energy in cells. It's like a molecular merry-go-round that takes the breakdown products from sugars, fats, and proteins and converts them into energy." },
    { id: 2, question: "What are the key components of a transformer architecture?", answer: "A transformer architecture consists of an encoder and decoder, both containing self-attention mechanisms. Key components include multi-head attention, feed-forward networks, positional encoding, and layer normalization." }
  ]);
  
  const [uploadedDocs] = useState([
    { id: 1, name: "Organic Chemistry Textbook.pdf", pages: 245, date: "2023-05-11" },
    { id: 2, name: "Calculus Notes.pdf", pages: 78, date: "2023-05-15" },
  ]);

  // AI response chunks simulation
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);

  // Generate LLM response in chunks to simulate streaming
  const generateStreamingResponse = (prompt: string, responseId: number) => {
    const responses = {
      "chemistry": "I analyzed your chemistry question. Based on the organic chemistry textbook you uploaded, here's what I found: Chemistry involves the study of matter, its properties, and the changes it undergoes. The field specifically examines the structure of atoms and molecules, and how they interact through chemical bonds to form new substances. Key concepts include understanding elements, compounds, reactions, and the energy transformations that occur during chemical processes.",
      "math": "According to your calculus notes, the mathematical concept you're asking about relates to differential equations. These equations express relationships involving functions and their derivatives. In calculus, derivatives represent rates of change, while integrals represent accumulation. Understanding these concepts is fundamental to solving complex problems in physics, engineering, and many scientific fields.",
      "physics": "The physics principle you're asking about involves the conservation of energy, which states that energy cannot be created or destroyed, only transformed from one form to another. This is one of the fundamental laws of physics and applies to all closed systems. Your study materials cover how this principle is applied in various contexts, from simple mechanical systems to complex thermodynamic processes.",
      "default": "I'm analyzing your question about \"" + prompt + "\". Based on your study materials, I can see several relevant concepts that address this topic. The key points to understand are the fundamental principles, how they interact with related concepts, and practical applications in real-world scenarios. Would you like me to elaborate on any specific aspect of this topic in more detail?"
    };

    // Determine which response to use based on keywords in the prompt
    let responseText = "";
    if (prompt.toLowerCase().includes("chemistry") || prompt.toLowerCase().includes("molecule") || prompt.toLowerCase().includes("atom")) {
      responseText = responses.chemistry;
    } else if (prompt.toLowerCase().includes("math") || prompt.toLowerCase().includes("calculus") || prompt.toLowerCase().includes("equation")) {
      responseText = responses.math;
    } else if (prompt.toLowerCase().includes("physics") || prompt.toLowerCase().includes("energy") || prompt.toLowerCase().includes("force")) {
      responseText = responses.physics;
    } else {
      responseText = responses.default;
    }

    setActiveConversationId(responseId);
    setCurrentAnswer("");
    
    // Simulate streaming text response
    let index = 0;
    const interval = setInterval(() => {
      if (index < responseText.length) {
        setCurrentAnswer(prev => prev + responseText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsThinking(false);
        setIsLoading(false);
        
        // Save the complete answer to conversations
        setConversations(prev => 
          prev.map(conv => 
            conv.id === responseId 
              ? {...conv, answer: responseText} 
              : conv
          )
        );
        
        setActiveConversationId(null);
        
        toast({
          title: "Answer Generated",
          description: "The AI has answered your question",
        });
      }
    }, 15); // Adjust speed here - lower = faster
  };

  const askQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setIsLoading(true);
      setIsThinking(true);
      
      // Create new conversation with empty answer
      const newConversationId = conversations.length + 1;
      setConversations([...conversations, {
        id: newConversationId,
        question,
        answer: ""
      }]);
      
      // Reset question input
      setQuestion("");
      
      // Start generating response after a brief delay
      setTimeout(() => {
        setIsThinking(false);
        generateStreamingResponse(question, newConversationId);
      }, 800);
    }
  };

  const uploadDocument = () => {
    toast({
      title: "Upload Feature",
      description: "Document upload functionality would be implemented here",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Study Assistant</h1>
        <p className="text-gray-500">Upload study materials and get AI-powered help</p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="chat">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <Zap className="mr-2 h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="quizzes">
            <HelpCircle className="mr-2 h-4 w-4" />
            Quizzes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5" /> Ask AI Assistant
                  </CardTitle>
                  <CardDescription>Get help with your studies</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={askQuestion} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Ask any question about your study material..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Thinking..." : "Ask Question"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <Card key={conversation.id}>
                    <CardHeader>
                      <CardTitle className="text-base flex items-start">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span>{conversation.question}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start">
                        <Avatar className="h-6 w-6 mr-2 bg-purple-100">
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div>
                          {activeConversationId === conversation.id ? (
                            <>
                              {isThinking ? (
                                <div className="flex items-center space-x-2">
                                  <div className="animate-pulse bg-purple-100 h-2 w-2 rounded-full"></div>
                                  <div className="animate-pulse bg-purple-200 h-2 w-2 rounded-full" style={{ animationDelay: "0.2s" }}></div>
                                  <div className="animate-pulse bg-purple-300 h-2 w-2 rounded-full" style={{ animationDelay: "0.4s" }}></div>
                                </div>
                              ) : currentAnswer}
                            </>
                          ) : (
                            conversation.answer
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2 h-5 w-5" /> Study Context
                </CardTitle>
                <CardDescription>Materials influencing AI responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedDocs.map((doc) => (
                  <div key={doc.id} className="flex justify-between items-center p-3 rounded-md border">
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-gray-500">{doc.pages} pages • Uploaded on {doc.date}</div>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={uploadDocument}>
                  <FilePlus className="mr-2 h-4 w-4" /> Add Document
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>Upload and manage your study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Upload Study Material</h3>
                  <p className="text-sm text-gray-500 mt-2">Drag and drop files or click to browse</p>
                  <Button className="mt-4" onClick={uploadDocument}>
                    Select Files
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Your Documents</h3>
                  {uploadedDocs.map((doc) => (
                    <div key={doc.id} className="flex justify-between items-center p-4 rounded-md border">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-gray-400 mr-4" />
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-gray-500">{doc.pages} pages • Uploaded on {doc.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Generate</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="flashcards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Flashcards</CardTitle>
              <CardDescription>Study with flashcards created from your materials</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <Zap className="h-16 w-16 mx-auto text-gray-400" />
                <h3 className="text-lg font-medium mt-4">No Flashcards Yet</h3>
                <p className="text-sm text-gray-500 mt-2">Upload study materials and generate flashcards</p>
                <Button className="mt-4" onClick={uploadDocument}>Upload Materials</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quizzes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Quizzes</CardTitle>
              <CardDescription>Test your knowledge with personalized quizzes</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <HelpCircle className="h-16 w-16 mx-auto text-gray-400" />
                <h3 className="text-lg font-medium mt-4">No Quizzes Available</h3>
                <p className="text-sm text-gray-500 mt-2">Upload study materials to generate quizzes</p>
                <Button className="mt-4" onClick={uploadDocument}>Upload Materials</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistant;
