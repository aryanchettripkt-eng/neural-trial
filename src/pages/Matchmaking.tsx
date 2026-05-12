import { motion, AnimatePresence } from 'motion/react';
import { Network } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Matchmaking() {
  const [textIndex, setTextIndex] = useState(0);
  
  const texts = [
    "Establishing secure connection...",
    "Scanning consciousness...",
    "Finding opponent...",
    "Synchronizing neural patterns...",
    "Calibrating behavior algorithms..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-transparent">
      
      {/* Background depth layers */}
      <motion.div
        animate={{
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)] blur-2xl pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-48 h-48 flex items-center justify-center mb-16 perspective-1000">
          
          {/* Abstract AI Core (Outer ring) */}
          <motion.div
            animate={{ rotateX: [0, 360], rotateZ: [0, 180] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[0.5px] border-white/20 border-t-white/50 shadow-[0_0_20px_rgba(255,255,255,0.05)] opacity-80 style-3d"
          />
          
          {/* Abstract AI Core (Middle ring) */}
          <motion.div
            animate={{ rotateY: [0, -360], rotateZ: [0, -180] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border-[0.5px] border-white/10 border-b-white/40 shadow-[0_0_15px_rgba(255,255,255,0.02)] opacity-60 style-3d"
          />

          {/* Abstract AI Core (Inner data stream) */}
          <motion.div
            animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-10 rounded-full border border-dashed border-white/20 opacity-40 mix-blend-screen"
          />
          
          {/* Pulsating center glow */}
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-16 rounded-full bg-white/10 blur-xl pointer-events-none"
          />
          
          <Network className="w-8 h-8 text-neutral-400 z-10 opacity-70" />
        </div>

        <div className="h-6 relative w-72 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(4px)", scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 text-[11px] tracking-[0.25em] uppercase font-medium text-neutral-400 mix-blend-screen"
            >
              {texts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        
        {/* Subtle loading progress line */}
        <div className="w-48 h-[1px] bg-white/5 mt-8 relative overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
