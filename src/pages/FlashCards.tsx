import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, CheckCircle2, XCircle, Edit, Save, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PandaAnimationBW from "@/components/PandaAnimationBW";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FlashCard, getFlashcards, getDocuments } from "@/services/llamaService";
import TeddyBearAnimation from "@/components/TeddyBearAnimation";

const FlashCards = () => {
  // State for all flashcards
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [filteredFlashcards, setFilteredFlashcards] = useState<FlashCard[]>([]);
  const [documents, setDocuments] = useState<{ id: number; name: string }[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [pandaMood, setPandaMood] = useState<"happy" | "sad" | "reading">("reading");
  
  // Load flashcards and documents on component mount
  useEffect(() => {
    const allDocuments = getDocuments();
    setDocuments(allDocuments);
    
    const allFlashcards = getFlashcards();
    setFlashcards(allFlashcards);
    setFilteredFlashcards(allFlashcards);
    
    // Extract unique topics
    const uniqueTopics = [...new Set(allFlashcards.map(card => card.topic))];
    setTopics(uniqueTopics);
  }, []);
  
  return (
    <div className="container py-8 relative">
      <PandaAnimationBW position="bottom-right" size="small" mood="reading" />
      <TeddyBearAnimation position="top-left" size="small" />
      
      <h1 className="text-3xl font-bold mb-6">Flashcards</h1>
      <p className="text-muted-foreground mb-8">Review your study materials with interactive flashcards</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Study with Flashcards</CardTitle>
              <CardDescription>Test your knowledge on various topics</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Welcome to Flashcards</h2>
                <p className="text-muted-foreground mb-6">Select a document or topic to begin studying</p>
                <Button>Get Started</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filter Cards</CardTitle>
              <CardDescription>Choose what to study</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Document</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All documents" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Select Topic</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All topics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All topics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Your study progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Cards:</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Mastered:</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>To Review:</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlashCards;
