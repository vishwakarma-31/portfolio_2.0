'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner({
  text = "Loading...",
  size = 16,
  color = "border-primary/30 border-t-primary"
}) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`w-${size} h-${size} border-4 ${color} rounded-full mx-auto mb-4`}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-foreground font-medium"
        >
          {text}
        </motion.p>
      </motion.div>
    </div>
  );
}
