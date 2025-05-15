import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import { UserPlus, Check, Mail, Book, School } from "lucide-react";
import PandaAnimation from "@/components/PandaAnimation";
import { registerUser, UserData } from "@/utils/api";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  institution: string;
  fieldOfStudy: string;
  studentId: string;
  agreeTerms: boolean;
}

const CreateAccount = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [pandaMood, setPandaMood] = useState<"happy" | "reading">("happy");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    fieldOfStudy: "",
    studentId: "",
    agreeTerms: false
  });

  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [isAccountCreating, setIsAccountCreating] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Password strength check
    if (name === "password") {
      const isStrong = value.length >= 8 && 
                       /[A-Z]/.test(value) && 
                       /[a-z]/.test(value) && 
                       /[0-9]/.test(value) && 
                       /[^A-Za-z0-9]/.test(value);
      setIsPasswordStrong(isStrong);
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const nextStep = () => {
    // First step validation
    if (step === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
        toast.error("Please fill all required fields");
        return;
      }
      
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      
      setPandaMood("reading");
    }
    
    // Second step validation
    if (step === 2) {
      if (!formData.password || !formData.confirmPassword) {
        toast.error("Please fill in all password fields");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      if (!isPasswordStrong) {
        toast.error("Password is not strong enough");
        return;
      }
    }
    
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
    if (step === 2) {
      setPandaMood("happy");
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    // Validate final step
    if (!formData.institution || !formData.fieldOfStudy) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Start account creation
    setIsAccountCreating(true);
    
    try {
      // Prepare user data for registration
      const userData: UserData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        institution: formData.institution,
        fieldOfStudy: formData.fieldOfStudy,
        studentId: formData.studentId
      };
      
      // Register user through API
      const result = await registerUser(userData);
      
      if (result) {
        toast.success("Account created successfully!");
        
        // Navigate to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setIsAccountCreating(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to create account. Please try again.");
      setIsAccountCreating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Green forest background */}
      <div className="absolute inset-0 forest-bg opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Join Study Doc<span className="text-primary">AI</span></h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Create your account to start optimizing your study sessions and connect with peers
            </p>
          </motion.div>
          
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Left side - Panda animation */}
            <motion.div 
              className="col-span-1 md:col-span-2 flex justify-center items-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full h-[300px] flex flex-col justify-center items-center">
                <PandaAnimation mood={pandaMood} size="large" className="scale-125" />
                
                <motion.div 
                  className="mt-8 w-full flex items-center justify-between px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-primary bg-primary/10" : "border-muted"}`}>
                      <UserPlus className="h-4 w-4" />
                    </div>
                    <span className="text-xs mt-1">Account</span>
                  </div>
                  
                  <div className={`h-0.5 w-1/4 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                  
                  <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-primary bg-primary/10" : "border-muted"}`}>
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="text-xs mt-1">Details</span>
                  </div>
                  
                  <div className={`h-0.5 w-1/4 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
                  
                  <div className={`flex flex-col items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-primary bg-primary/10" : "border-muted"}`}>
                      <School className="h-4 w-4" />
                    </div>
                    <span className="text-xs mt-1">Complete</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right side - Form */}
            <motion.div
              className="col-span-1 md:col-span-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-2 border-primary/20 shadow-xl">
                <CardHeader>
                  <CardTitle>
                    {step === 1 && "Personal Information"}
                    {step === 2 && "Secure Your Account"}
                    {step === 3 && "Academic Details"}
                  </CardTitle>
                  <CardDescription>
                    {step === 1 && "Let's start with some basic information"}
                    {step === 2 && "Create a strong password to protect your account"}
                    {step === 3 && "Tell us about your educational background"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="Enter your first name"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              placeholder="Enter your last name"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            We'll send a verification link to this email
                          </p>
                        </div>
                      </>
                    )}
                    
                    {/* Step 2: Password */}
                    {step === 2 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                          
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className={`h-1 rounded-full ${formData.password.length > 0 ? (isPasswordStrong ? "bg-green-500" : "bg-amber-500") : "bg-gray-200"}`}></div>
                            <div className={`h-1 rounded-full ${isPasswordStrong ? "bg-green-500" : "bg-gray-200"}`}></div>
                          </div>
                          
                          <ul className="text-xs space-y-1 mt-2">
                            <li className={`flex items-center ${formData.password.length >= 8 ? "text-green-500" : "text-muted-foreground"}`}>
                              <Check className="mr-1 h-3 w-3" /> At least 8 characters
                            </li>
                            <li className={`flex items-center ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? "text-green-500" : "text-muted-foreground"}`}>
                              <Check className="mr-1 h-3 w-3" /> Uppercase and lowercase letters
                            </li>
                            <li className={`flex items-center ${/[0-9]/.test(formData.password) ? "text-green-500" : "text-muted-foreground"}`}>
                              <Check className="mr-1 h-3 w-3" /> At least one number
                            </li>
                            <li className={`flex items-center ${/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : "text-muted-foreground"}`}>
                              <Check className="mr-1 h-3 w-3" /> At least one special character
                            </li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                          />
                          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                          )}
                        </div>
                      </>
                    )}
                    
                    {/* Step 3: Academic Information */}
                    {step === 3 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="institution">University/School <span className="text-red-500">*</span></Label>
                          <Select value={formData.institution} onValueChange={(value) => handleSelectChange("institution", value)}>
                            <SelectTrigger id="institution">
                              <SelectValue placeholder="Select your institution" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="harvard">Harvard University</SelectItem>
                              <SelectItem value="mit">MIT</SelectItem>
                              <SelectItem value="stanford">Stanford University</SelectItem>
                              <SelectItem value="oxford">Oxford University</SelectItem>
                              <SelectItem value="cambridge">Cambridge University</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {formData.institution === "other" && (
                            <Input
                              className="mt-2"
                              placeholder="Enter your institution name"
                              onChange={(e) => handleSelectChange("institution", e.target.value)}
                            />
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fieldOfStudy">Field of Study <span className="text-red-500">*</span></Label>
                          <Select value={formData.fieldOfStudy} onValueChange={(value) => handleSelectChange("fieldOfStudy", value)}>
                            <SelectTrigger id="fieldOfStudy">
                              <SelectValue placeholder="Select your field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="medicine">Medicine</SelectItem>
                              <SelectItem value="engineering">Engineering</SelectItem>
                              <SelectItem value="cs">Computer Science</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="humanities">Humanities</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {formData.fieldOfStudy === "other" && (
                            <Input
                              className="mt-2"
                              placeholder="Enter your field of study"
                              onChange={(e) => handleSelectChange("fieldOfStudy", e.target.value)}
                            />
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="studentId">Student ID (Optional)</Label>
                          <Input
                            id="studentId"
                            name="studentId"
                            placeholder="Enter your student ID"
                            value={formData.studentId}
                            onChange={handleInputChange}
                          />
                          <p className="text-xs text-muted-foreground">
                            This helps verify your academic status
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-2">
                          <Checkbox 
                            id="agreeTerms" 
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) => 
                              setFormData({
                                ...formData,
                                agreeTerms: checked as boolean
                              })
                            }
                          />
                          <Label htmlFor="agreeTerms" className="text-sm font-normal">
                            I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                          </Label>
                        </div>
                      </>
                    )}
                  </form>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t p-6">
                  {step > 1 ? (
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  ) : (
                    <Link to="/login">
                      <Button variant="outline">
                        Cancel
                      </Button>
                    </Link>
                  )}
                  
                  {step < 3 ? (
                    <Button onClick={nextStep}>
                      Continue
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      onClick={handleSubmit} 
                      disabled={isAccountCreating || !formData.agreeTerms}
                    >
                      {isAccountCreating ? "Creating Account..." : "Create Account"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
              
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign in here</Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount; 