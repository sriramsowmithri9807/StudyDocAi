import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Mail, Lock } from "lucide-react";
import PandaAnimation from "@/components/PandaAnimation";
import { loginUser } from "@/utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await loginUser(email, password);
      
      if (result) {
        toast.success("Login successful!");
        
        // Navigate to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in. Please check your credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Green forest background */}
      <div className="absolute inset-0 forest-bg opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back to Study Doc<span className="text-primary">AI</span></h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Log in to continue your productive study journey
            </p>
          </motion.div>
          
          <div className="w-full max-w-md">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-2 border-primary/20 shadow-xl">
                <CardHeader className="space-y-2 text-center">
                  <div className="mx-auto w-16 h-16 mb-2">
                    <PandaAnimation mood="happy" size="small" />
                  </div>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4 border-t p-6">
                  <div className="text-center w-full">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link to="/create-account" className="text-primary hover:underline font-medium">
                        Create account
                      </Link>
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
