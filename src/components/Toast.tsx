import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[200] bg-[var(--bg-card)] border border-[#22C55E] shadow-lg rounded-xl px-6 py-4 flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span className="font-dm text-[15px] font-medium text-[var(--text-main)]">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
