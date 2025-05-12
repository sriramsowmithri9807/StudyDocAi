
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Calendar, CalendarPlus, Link as LinkIcon, Share, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  roomName: z.string().min(3, {
    message: "Room name must be at least 3 characters.",
  }),
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  startTime: z.string().min(1, {
    message: "Start time is required.",
  }),
  duration: z.string().min(1, {
    message: "Duration is required.",
  }),
  maxParticipants: z.string().min(1, {
    message: "Maximum participants is required.",
  }),
});

const CreateRoom = () => {
  const navigate = useNavigate();
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isRoomCreated, setIsRoomCreated] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      subject: "",
      description: "",
      startTime: "",
      duration: "60",
      maxParticipants: "5",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would make an API call to create the room
    // For now, we'll simulate it by generating a link
    
    const roomId = Math.random().toString(36).substring(2, 10);
    const link = `${window.location.origin}/study-room/${roomId}`;
    
    setGeneratedLink(link);
    setIsRoomCreated(true);
    
    toast({
      title: "Study room created!",
      description: "Your room has been scheduled successfully.",
    });
  };

  const copyLinkToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center"
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
            Create Study Room
          </motion.h1>
          <motion.p 
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Schedule a virtual study session with your friends
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarPlus className="mr-2 h-5 w-5" /> Schedule New Room
            </CardTitle>
            <CardDescription>Fill out the details to create your study room</CardDescription>
          </CardHeader>
          <CardContent>
            {!isRoomCreated ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="roomName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Name</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Biology Final Prep" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Organic Chemistry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What will you be studying? Any materials to prepare?" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (minutes)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">60 minutes</SelectItem>
                              <SelectItem value="90">90 minutes</SelectItem>
                              <SelectItem value="120">120 minutes</SelectItem>
                              <SelectItem value="180">180 minutes</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Participants</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select max participants" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2">2 participants</SelectItem>
                              <SelectItem value="3">3 participants</SelectItem>
                              <SelectItem value="4">4 participants</SelectItem>
                              <SelectItem value="5">5 participants</SelectItem>
                              <SelectItem value="10">10 participants</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <CalendarCheck className="mr-2 h-4 w-4" /> Schedule Room
                  </Button>
                </form>
              </Form>
            ) : (
              <motion.div 
                className="space-y-6 p-4 border rounded-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <CalendarCheck className="h-12 w-12 mx-auto text-green-500 mb-2" />
                  <h3 className="text-lg font-medium">Your study room is ready!</h3>
                  <p className="text-gray-500">Share this link with your friends to join the study session</p>
                </div>

                <div className="flex items-center p-3 border rounded-md bg-gray-50">
                  <div className="text-sm truncate flex-1">{generatedLink}</div>
                  <Button variant="ghost" size="sm" onClick={copyLinkToClipboard}>
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={copyLinkToClipboard}>
                    <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
                  </Button>
                  <Button className="flex-1" variant="outline" onClick={() => navigate("/dashboard")}>
                    <Share className="mr-2 h-4 w-4" /> Share Room
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
          {!isRoomCreated && (
            <CardFooter className="border-t px-6 py-4 bg-gray-50">
              <Button variant="link" className="flex-1" onClick={() => navigate("/")}>
                Cancel
              </Button>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateRoom;
