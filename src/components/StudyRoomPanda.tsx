
import React from "react";
import { motion } from "framer-motion";
import PandaAnimation from "./PandaAnimation";

type StudyRoomPandaProps = {
  isActive?: boolean;
  position?: "left" | "right" | "center";
  delay?: number;
};

const StudyRoomPanda = ({ 
  isActive = true, 
  position = "left", 
  delay = 0.5 
}: StudyRoomPandaProps) => {
  // Define positions
  const positions = {
    left: "left-10 bottom-10",
    right: "right-10 bottom-10",
    center: "left-1/2 transform -translate-x-1/2 bottom-10",
  };

  return (
    <motion.div
      className={`fixed ${positions[position]} z-10`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: delay
      }}
    >
      <PandaAnimation 
        mood={isActive ? "happy" : "walking"} 
        size="small" 
      />
    </motion.div>
  );
};

export default StudyRoomPanda;
