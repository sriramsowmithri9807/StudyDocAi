
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Calendar, Book, Users, UserCircle, CalendarPlus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type LayoutProps = {
  children: React.ReactNode;
};

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const menuItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }
  }
};

const footerVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      delay: 0.5, 
      duration: 0.5 
    } 
  }
};

// New teddy bear component
const TeddyBear: React.FC<{className?: string}> = ({ className = "" }) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      animate={{ rotate: [0, -5, 5, -5, 0] }}
      transition={{ 
        repeat: Infinity, 
        duration: 6, 
        ease: "easeInOut" 
      }}
    >
      {/* Teddy Bear */}
      <div className="relative w-16 h-16">
        {/* Head */}
        <div className="absolute w-10 h-10 bg-amber-700 rounded-full left-3 top-0"></div>
        
        {/* Ears */}
        <div className="absolute w-4 h-4 bg-amber-800 rounded-full left-1 top-2"></div>
        <div className="absolute w-4 h-4 bg-amber-800 rounded-full right-1 top-2"></div>
        
        {/* Face */}
        <div className="absolute w-7 h-7 bg-amber-600 rounded-full left-4.5 top-1.5"></div>
        
        {/* Eyes */}
        <div className="absolute w-1.5 h-1.5 bg-black rounded-full left-6 top-4"></div>
        <div className="absolute w-1.5 h-1.5 bg-black rounded-full right-6 top-4"></div>
        
        {/* Nose */}
        <div className="absolute w-2 h-1.5 bg-black rounded-full left-7 top-6"></div>
        
        {/* Body */}
        <div className="absolute w-12 h-10 bg-amber-700 rounded-full left-2 top-7"></div>
        
        {/* Arms */}
        <div className="absolute w-4 h-7 bg-amber-800 rounded-full left-0 top-9 transform rotate-45"></div>
        <div className="absolute w-4 h-7 bg-amber-800 rounded-full right-0 top-9 transform -rotate-45"></div>
        
        {/* Legs */}
        <div className="absolute w-4 h-5 bg-amber-800 rounded-full left-3 bottom-0"></div>
        <div className="absolute w-4 h-5 bg-amber-800 rounded-full right-3 bottom-0"></div>
      </div>
    </motion.div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-800">
      <motion.header 
        className="border-b bg-white/80 backdrop-blur-sm dark:bg-black/20 sticky top-0 z-50"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center"
          >
            <Link to="/" className="text-xl font-bold text-primary flex items-center">
              <TeddyBear className="mr-2" />
              Study Doc<span className="text-purple-400">AI</span>
            </Link>
          </motion.div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <motion.div variants={menuItemVariants}>
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/dashboard' ? 'bg-primary text-primary-foreground' : ''}`}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Dashboard
                      </NavigationMenuLink>
                    </motion.div>
                  </Link>
                </NavigationMenuItem>
              </motion.div>
              
              <motion.div variants={menuItemVariants}>
                <NavigationMenuItem>
                  <Link to="/schedule">
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/schedule' ? 'bg-primary text-primary-foreground' : ''}`}>
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        Schedule
                      </NavigationMenuLink>
                    </motion.div>
                  </Link>
                </NavigationMenuItem>
              </motion.div>
              
              <motion.div variants={menuItemVariants}>
                <NavigationMenuItem>
                  <Link to="/study-room/general">
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname.includes('/study-room') ? 'bg-primary text-primary-foreground' : ''}`}>
                        <Users className="mr-2 h-4 w-4" />
                        Study Rooms
                      </NavigationMenuLink>
                    </motion.div>
                  </Link>
                </NavigationMenuItem>
              </motion.div>
              
              <motion.div variants={menuItemVariants}>
                <NavigationMenuItem>
                  <Link to="/ai-assistant">
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/ai-assistant' ? 'bg-primary text-primary-foreground' : ''}`}>
                        <Book className="mr-2 h-4 w-4" />
                        AI Assistant
                      </NavigationMenuLink>
                    </motion.div>
                  </Link>
                </NavigationMenuItem>
              </motion.div>
              
              <motion.div variants={menuItemVariants}>
                <NavigationMenuItem>
                  <Link to="/pomodoro">
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="animate-pulse-slow"
                    >
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/pomodoro' ? 'bg-primary text-primary-foreground' : ''}`}>
                        <Clock className="mr-2 h-4 w-4" />
                        Pomodoro
                      </NavigationMenuLink>
                    </motion.div>
                  </Link>
                </NavigationMenuItem>
              </motion.div>
              
              <motion.div variants={menuItemVariants}>
                <NavigationMenuItem>
                  <Link to="/profile">
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${location.pathname === '/profile' ? 'bg-primary text-primary-foreground' : ''}`}>
                        <UserCircle className="mr-2 h-4 w-4" />
                        Profile
                      </NavigationMenuLink>
                    </motion.div>
                  </Link>
                </NavigationMenuItem>
              </motion.div>
            </NavigationMenuList>
          </NavigationMenu>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button variant="outline" onClick={() => navigate("/login")} className="bg-white/80 dark:bg-black/20 backdrop-blur-sm">
              Login
            </Button>
          </motion.div>
        </div>
      </motion.header>
      
      <motion.main 
        className="flex-1 container mx-auto px-4 py-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Floating teddy bears */}
        <div className="hidden md:block">
          <motion.div 
            className="absolute top-24 right-10 z-0 opacity-70"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <TeddyBear />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-24 left-10 z-0 opacity-70"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          >
            <TeddyBear />
          </motion.div>
        </div>
        
        {children}
      </motion.main>
      
      <motion.footer 
        className="border-t py-6 bg-white/60 backdrop-blur-sm dark:bg-black/20"
        variants={footerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 flex items-center">
            <TeddyBear className="mr-2 transform scale-75" />
            © {new Date().getFullYear()} Study Doc AI. All rights reserved.
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <motion.a 
              href="#" 
              className="text-sm text-gray-500 hover:text-primary"
              whileHover={{ scale: 1.1 }}
            >
              Privacy
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm text-gray-500 hover:text-primary"
              whileHover={{ scale: 1.1 }}
            >
              Terms
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm text-gray-500 hover:text-primary"
              whileHover={{ scale: 1.1 }}
            >
              Contact
            </motion.a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Layout;
