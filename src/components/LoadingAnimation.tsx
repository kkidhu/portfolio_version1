import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAnimationProps {
  isVisible: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ isVisible }) => {
  const dots = [
    { color: '#4285F4', delay: 0 },     // Blue
    { color: '#EA4335', delay: 0.1 },   // Red
    { color: '#FBBC05', delay: 0.2 },   // Yellow
    { color: '#34A853', delay: 0.3 },   // Green
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: '#1f1f1f' }}
        >
          <div className="flex items-center gap-2">
            {dots.map((dot, index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dot.color }}
                animate={{
                  y: [0, -12, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: dot.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          {/* Optional loading text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute mt-16 text-sm text-gray-400"
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;