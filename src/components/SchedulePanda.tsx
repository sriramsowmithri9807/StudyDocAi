
import React from "react";
import { motion } from "framer-motion";
import PandaAnimation from "./PandaAnimation";

const SchedulePanda = () => {
  return (
    <motion.div
      className="absolute -bottom-8 -right-8 z-0 opacity-50 transform scale-50"
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 0.5, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: 0.8
      }}
    >
      <PandaAnimation mood="reading" size="large" />
    </motion.div>
  );
};

export default SchedulePanda;
