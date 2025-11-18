import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  text?: string
  size?: number
  showProgress?: boolean
  progress?: number
}

export default function LoadingSpinner({
  text = "Loading...",
  size = 80,
  showProgress = false,
  progress = 0
}: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-cyan-900/20 backdrop-blur-md flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -20 }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
        className="text-center relative"
      >
        {/* Enhanced loading rings */}
        <div className="relative mb-6" style={{ width: size, height: size }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="border-2 border-cyan-400/30 rounded-full"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute border-2 border-purple-400/40 rounded-full"
            style={{ 
              width: `${size * 0.8}px`, 
              height: `${size * 0.8}px`,
              inset: `${size * 0.1}px` 
            }}
          />
          <motion.div
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            style={{ 
              width: `${size * 0.4}px`, 
              height: `${size * 0.4}px`,
              inset: `${size * 0.3}px` 
            }}
          />
        </div>

        {/* Progress bar (if enabled) */}
        {showProgress && (
          <div className="w-48 h-1 bg-gray-700/50 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            />
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/90 font-medium text-lg"
        >
          {text}
        </motion.p>
        
        {/* Additional loading dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
