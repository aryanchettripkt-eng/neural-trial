import { motion, AnimatePresence } from 'motion/react';
import { Network } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Matchmaking() {
  const [textIndex, setTextIndex] = useState(0);
  
  const texts = [
    "Establishing secure connection...",
    "Searching neural channels...",
    "Finding opponent...",
    "Synchronizing consciousness...",
    "Analyzing behavior patterns..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-40 h-40 flex items-center justify-center mb-12">
          {/* Animated rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-neutral-800 border-t-white/60 border-l-white/20 mix-blend-screen opacity-70"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 rounded-full border border-neutral-800 border-b-white/40 border-r-white/10 mix-blend-screen opacity-50"
          />
          <motion.div
            animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-12 rounded-full bg-white/5 blur-xl pointer-events-none"
          />
          
          <Network className="w-8 h-8 text-neutral-400 z-10" />
        </div>

        <div className="h-6 relative w-64 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 text-[11px] tracking-[0.2em] uppercase font-medium text-neutral-500"
            >
              {texts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
