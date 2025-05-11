
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Calendar, Book, Users, UserCircle } from "lucide-react";
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

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <motion.header 
        className="border-b"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link to="/" className="text-xl font-bold text-primary">
              StudySync<span className="text-purple-400">AI</span>
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
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Dashboard
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
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Book className="mr-2 h-4 w-4" />
                        AI Assistant
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
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
            <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
          </motion.div>
        </div>
      </motion.header>
      
      <motion.main 
        className="flex-1 container mx-auto px-4 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {children}
      </motion.main>
      
      <motion.footer 
        className="border-t py-6"
        variants={footerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StudySyncAI. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

export default Layout;
