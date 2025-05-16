import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Upload, FilePlus, FileText, Brain, MessageSquare, Book, Zap, HelpCircle, X, Loader, PlusCircle, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  processDocument,
  askQuestion as askLlamaQuestion,
  generateFlashcards,
  generateQuiz,
  getDocuments,
  getFlashcards,
  getQuizQuestions,
  removeDocument,
  Document as DocType,
  FlashCard,
  QuizQuestion
} from "@/services/llamaService";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PandaAnimationBW from "@/components/PandaAnimationBW";
import TeddyBearAnimation from "@/components/TeddyBearAnimation";

const AIAssistant = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Chat state
  const [conversations, setConversations] = useState([
    { id: 1, question: "Explain the Krebs cycle in simple terms", answer: "The Krebs cycle is a series of chemical reactions that helps generate energy in cells. It's like a molecular merry-go-round that takes the breakdown products from sugars, fats, and proteins and converts them into energy." },
    { id: 2, question: "What are the key components of a transformer architecture?", answer: "A transformer architecture consists of an encoder and decoder, both containing self-attention mechanisms. Key components include multi-head attention, feed-forward networks, positional encoding, and layer normalization." }
  ]);
  
  // Document state
  const [documents, setDocuments] = useState<DocType[]>([]);
  
  // Flashcard state
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [selectedDocumentForFlashcards, setSelectedDocumentForFlashcards] = useState<number | null>(null);
  const [flashcardTopicFilter, setFlashcardTopicFilter] = useState<string>("");
  const [flashcardGenerating, setFlashcardGenerating] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showingAnswer, setShowingAnswer] = useState(false);
  
  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [selectedDocumentForQuiz, setSelectedDocumentForQuiz] = useState<number | null>(null);
  const [quizGenerating, setQuizGenerating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  
  // AI response chunks simulation
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);

  // Load documents from service on component mount
  useEffect(() => {
    setDocuments(getDocuments());
  }, []);

  // Document upload and processing functions
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setFileUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 200);
      
      // Process the document with Llama LLM
      const newDocument = await processDocument(files[0]);
      
      // Update documents list
      setDocuments(prev => [...prev, newDocument]);
      
      // Complete the progress and show success message
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast({
        title: "Document uploaded successfully",
        description: `${files[0].name} has been processed with Llama LLM`,
      });
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error processing your document",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setFileUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };
  
  const handleRemoveDocument = (documentId: number) => {
    // Remove document from service
    removeDocument(documentId);
    
    // Update state
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    
    // Reset selections if needed
    if (selectedDocumentForFlashcards === documentId) {
      setSelectedDocumentForFlashcards(null);
      setFlashcards([]);
    }
    
    if (selectedDocumentForQuiz === documentId) {
      setSelectedDocumentForQuiz(null);
      setQuizQuestions([]);
    }
    
    toast({
      title: "Document removed",
      description: "The document and its associated data have been removed",
    });
  };
  
  // Generate LLM response in chunks to simulate streaming
  const generateStreamingResponse = async (prompt: string, responseId: number) => {
    setActiveConversationId(responseId);
    setCurrentAnswer("");
    
    try {
      // Get response from Llama LLM service
      const response = await askLlamaQuestion(prompt);
      
      // Simulate streaming text response
      let displayedText = "";
      const words = response.split(" ");
      
      for (let i = 0; i < words.length; i++) {
        displayedText += words[i] + " ";
        setCurrentAnswer(displayedText);
        await new Promise(resolve => setTimeout(resolve, 30)); // Adjust speed here
      }
      
      // Save the complete answer to conversations
      setConversations(prev => 
        prev.map(conv => 
          conv.id === responseId 
            ? {...conv, answer: response} 
            : conv
        )
      );
      
      setActiveConversationId(null);
      
      toast({
        title: "Answer Generated",
        description: "Llama AI has answered your question",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate response",
        variant: "destructive"
      });
      
      setConversations(prev => 
        prev.map(conv => 
          conv.id === responseId 
            ? {...conv, answer: "Sorry, I encountered an error while processing your question."} 
            : conv
        )
      );
      
      setActiveConversationId(null);
    } finally {
      setIsThinking(false);
      setIsLoading(false);
    }
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

  // Flashcard functions
  const handleGenerateFlashcards = async () => {
    if (!selectedDocumentForFlashcards) {
      toast({
        title: "No document selected",
        description: "Please select a document to generate flashcards",
        variant: "destructive"
      });
      return;
    }
    
    setFlashcardGenerating(true);
    
    try {
      const generatedCards = await generateFlashcards(selectedDocumentForFlashcards, flashcardTopicFilter || undefined);
      setFlashcards(generatedCards);
      setCurrentCardIndex(0);
      setShowingAnswer(false);
      
      toast({
        title: "Flashcards generated",
        description: `${generatedCards.length} flashcards created using Llama LLM`,
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating flashcards",
        variant: "destructive"
      });
    } finally {
      setFlashcardGenerating(false);
    }
  };
  
  const nextFlashcard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
      setShowingAnswer(false);
    }
  };
  
  const prevFlashcard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prevIndex => prevIndex - 1);
      setShowingAnswer(false);
    }
  };
  
  const toggleFlashcardAnswer = () => {
    setShowingAnswer(prev => !prev);
  };
  
  // Quiz functions
  const handleGenerateQuiz = async () => {
    if (!selectedDocumentForQuiz) {
      toast({
        title: "No document selected",
        description: "Please select a document to generate a quiz",
        variant: "destructive"
      });
      return;
    }
    
    setQuizGenerating(true);
    
    try {
      const generatedQuestions = await generateQuiz(selectedDocumentForQuiz, 5);
      setQuizQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setQuizScore(null);
      
      toast({
        title: "Quiz generated",
        description: `${generatedQuestions.length} questions created using Llama LLM`,
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating the quiz",
        variant: "destructive"
      });
    } finally {
      setQuizGenerating(false);
    }
  };
  
  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (quizSubmitted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  const handleQuizSubmit = () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      toast({
        title: "Incomplete quiz",
        description: "Please answer all questions before submitting",
        variant: "destructive"
      });
      return;
    }
    
    let correctCount = 0;
    quizQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = (correctCount / quizQuestions.length) * 100;
    setQuizScore(score);
    setQuizSubmitted(true);
    
    toast({
      title: "Quiz submitted",
      description: `Your score: ${score.toFixed(0)}%`,
    });
  };
  
  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  return (
    <div className="container py-6 relative">
      <PandaAnimationBW position="bottom-right" size="small" mood="reading" />
      <TeddyBearAnimation position="top-left" size="small" />
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Study Assistant</h1>
        <p className="text-gray-500">Powered by Llama LLM - Upload study materials and get AI-powered help</p>
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
        
        {/* Chat Tab */}
        <TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5" /> Ask Llama AI Assistant
                  </CardTitle>
                  <CardDescription>Get AI-powered answers from your study materials</CardDescription>
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
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <div key={doc.id} className="flex justify-between items-center p-3 rounded-md border">
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-gray-500">{doc.pages} pages • Uploaded on {doc.date}</div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4">
                    <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                  <FilePlus className="mr-2 h-4 w-4" /> Add Document
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept=".pdf,.txt,.doc,.docx"
                />
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>Upload and manage your study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {fileUploading ? (
                    <div className="space-y-4">
                      <Loader className="h-10 w-10 text-primary mx-auto mb-4 animate-spin" />
                      <h3 className="text-lg font-medium">Processing with Llama LLM</h3>
                      <p className="text-sm text-gray-500 mt-2">Analyzing document content...</p>
                      <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Upload Study Material</h3>
                      <p className="text-sm text-gray-500 mt-2">Drag and drop files or click to browse</p>
                      <Button className="mt-4" onClick={() => fileInputRef.current?.click()}>
                        Select Files
                      </Button>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Your Documents</h3>
                  {documents.length > 0 ? (
                    documents.map((doc) => (
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
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleRemoveDocument(doc.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-8 border rounded-md">
                      <p className="text-muted-foreground">No documents uploaded yet</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Flashcards Tab */}
        <TabsContent value="flashcards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Flashcards</CardTitle>
              <CardDescription>Study with flashcards created from your materials</CardDescription>
            </CardHeader>
            <CardContent>
              {documents.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="document-select">Select Document</Label>
                      <Select 
                        onValueChange={(value) => setSelectedDocumentForFlashcards(Number(value))}
                        value={selectedDocumentForFlashcards?.toString() || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a document" />
                        </SelectTrigger>
                        <SelectContent>
                          {documents.map(doc => (
                            <SelectItem key={doc.id} value={doc.id.toString()}>
                              {doc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="topic-filter">Filter by Topic (Optional)</Label>
                      <Select 
                        onValueChange={setFlashcardTopicFilter}
                        value={flashcardTopicFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All topics" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All topics</SelectItem>
                          <SelectItem value="Basic Concepts">Basic Concepts</SelectItem>
                          <SelectItem value="Key Principles">Key Principles</SelectItem>
                          <SelectItem value="Applications">Applications</SelectItem>
                          <SelectItem value="Case Studies">Case Studies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleGenerateFlashcards} 
                    disabled={!selectedDocumentForFlashcards || flashcardGenerating}
                    className="w-full"
                  >
                    {flashcardGenerating ? 
                      <Loader className="mr-2 h-4 w-4 animate-spin" /> : 
                      <PlusCircle className="mr-2 h-4 w-4" />
                    }
                    {flashcardGenerating ? "Generating Flashcards..." : "Generate Flashcards with Llama LLM"}
                  </Button>
                  
                  {flashcards.length > 0 && (
                    <div className="mt-6">
                      <div className="text-center mb-4">
                        <p className="text-sm text-muted-foreground">
                          Card {currentCardIndex + 1} of {flashcards.length}
                        </p>
                      </div>
                      
                      <Card className="p-6 min-h-[300px] flex flex-col relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline">{flashcards[currentCardIndex].topic}</Badge>
                        </div>
                        
                        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                          {!showingAnswer ? (
                            <div className="space-y-4">
                              <h3 className="text-xl font-medium">Question:</h3>
                              <p className="text-lg">{flashcards[currentCardIndex].question}</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <h3 className="text-xl font-medium text-primary">Answer:</h3>
                              <p className="text-lg">{flashcards[currentCardIndex].answer}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <Button 
                            variant="outline" 
                            onClick={prevFlashcard} 
                            disabled={currentCardIndex === 0}
                          >
                            Previous
                          </Button>
                          <Button 
                            variant={showingAnswer ? "outline" : "default"} 
                            onClick={toggleFlashcardAnswer}
                          >
                            {showingAnswer ? "Hide Answer" : "Show Answer"}
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={nextFlashcard} 
                            disabled={currentCardIndex === flashcards.length - 1}
                          >
                            Next
                          </Button>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-12">
                  <Zap className="h-16 w-16 mx-auto text-gray-400" />
                  <h3 className="text-lg font-medium mt-4">No Documents Available</h3>
                  <p className="text-sm text-gray-500 mt-2">Upload study materials to generate flashcards</p>
                  <Button className="mt-4" onClick={() => fileInputRef.current?.click()}>Upload Materials</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Quizzes Tab */}
        <TabsContent value="quizzes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Quizzes</CardTitle>
              <CardDescription>Test your knowledge with personalized quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              {documents.length > 0 ? (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="quiz-document-select">Select Document for Quiz</Label>
                    <Select 
                      onValueChange={(value) => setSelectedDocumentForQuiz(Number(value))}
                      value={selectedDocumentForQuiz?.toString() || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a document" />
                      </SelectTrigger>
                      <SelectContent>
                        {documents.map(doc => (
                          <SelectItem key={doc.id} value={doc.id.toString()}>
                            {doc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleGenerateQuiz} 
                    disabled={!selectedDocumentForQuiz || quizGenerating}
                    className="w-full"
                  >
                    {quizGenerating ? 
                      <Loader className="mr-2 h-4 w-4 animate-spin" /> : 
                      <PlusCircle className="mr-2 h-4 w-4" />
                    }
                    {quizGenerating ? "Generating Quiz..." : "Generate Quiz with Llama LLM"}
                  </Button>
                  
                  {quizQuestions.length > 0 && (
                    <div className="mt-6 space-y-6">
                      {quizSubmitted && quizScore !== null && (
                        <div className="rounded-lg p-4 bg-primary/10 text-center">
                          <h3 className="text-lg font-medium mb-2">Quiz Result</h3>
                          <div className="text-3xl font-bold text-primary">{quizScore.toFixed(0)}%</div>
                          <p className="text-sm text-muted-foreground mt-2">
                            You got {quizQuestions.filter((q, i) => selectedAnswers[q.id] === q.correctAnswer).length} out of {quizQuestions.length} questions correct
                          </p>
                          <Button variant="outline" className="mt-4" onClick={resetQuiz}>
                            Take Quiz Again
                          </Button>
                        </div>
                      )}
                      
                      {quizQuestions.map((question, index) => (
                        <Card key={question.id} className="p-6">
                          <div className="flex items-start mb-4">
                            <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2">
                              {index + 1}
                            </span>
                            <h3 className="text-lg font-medium">{question.question}</h3>
                          </div>
                          
                          <RadioGroup 
                            value={selectedAnswers[question.id]?.toString() || ""}
                            onValueChange={(value) => handleAnswerSelect(question.id, Number(value))}
                            disabled={quizSubmitted}
                            className="ml-8 space-y-3"
                          >
                            {question.options.map((option, i) => (
                              <div key={i} className={`flex items-center space-x-2 p-2 rounded-md ${
                                quizSubmitted && i === question.correctAnswer ? 'bg-green-50 border border-green-200' : 
                                quizSubmitted && selectedAnswers[question.id] === i && i !== question.correctAnswer ? 'bg-red-50 border border-red-200' : 
                                ''
                              }`}>
                                <RadioGroupItem value={i.toString()} id={`q${question.id}-a${i}`} />
                                <Label htmlFor={`q${question.id}-a${i}`} className="flex-grow">
                                  {option}
                                </Label>
                                {quizSubmitted && i === question.correctAnswer && (
                                  <Check className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                            ))}
                          </RadioGroup>
                          
                          {quizSubmitted && (
                            <div className="mt-4 ml-8 p-3 bg-gray-50 rounded-md text-sm">
                              <p className="font-medium">Explanation:</p>
                              <p>{question.explanation}</p>
                            </div>
                          )}
                        </Card>
                      ))}
                      
                      {!quizSubmitted && (
                        <Button onClick={handleQuizSubmit} className="w-full">
                          Submit Quiz
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-12">
                  <HelpCircle className="h-16 w-16 mx-auto text-gray-400" />
                  <h3 className="text-lg font-medium mt-4">No Documents Available</h3>
                  <p className="text-sm text-gray-500 mt-2">Upload study materials to generate quizzes</p>
                  <Button className="mt-4" onClick={() => fileInputRef.current?.click()}>Upload Materials</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistant;
