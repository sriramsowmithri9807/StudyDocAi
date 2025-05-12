
import React from "react";
import { motion } from "framer-motion";
import PandaAnimation from "./PandaAnimation";

const DashboardPanda = () => {
  return (
    <motion.div
      className="fixed bottom-10 right-10 z-10"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1.5
      }}
    >
      <PandaAnimation mood="happy" size="medium" />
    </motion.div>
  );
};

export default DashboardPanda;
