
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { LogIn, UserPlus } from "lucide-react";
import PandaAnimation from "@/components/PandaAnimation";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pandaMood, setPandaMood] = useState<"happy" | "sad" | "walking">("walking");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a mock login - in a real app, you would integrate with an auth provider
    if (password === "password123") {
      setPandaMood("happy");
      toast.success("Successfully logged in!");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } else {
      setPandaMood("sad");
      toast.error("Incorrect password. Try again!");
      
      // Reset to walking after 3 seconds
      setTimeout(() => {
        setPandaMood("walking");
      }, 3000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] relative overflow-hidden">
      {/* Green forest background */}
      <div className="absolute inset-0 forest-bg opacity-20 z-0"></div>
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] relative z-10">
        {/* Panda Animation above the form */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <PandaAnimation mood={pandaMood} size="large" />
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="backdrop-blur-sm bg-white/90 border-2 border-primary/20 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Welcome to Study Doc<span className="text-primary">AI</span></CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/reset-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    (Hint: Use "password123" to log in successfully)
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button variant="outline" className="w-full mt-2">
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
