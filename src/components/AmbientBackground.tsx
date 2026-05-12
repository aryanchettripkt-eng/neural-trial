import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { cn } from "../lib/utils";

export default function AmbientBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { gameState, timeLeft, isOpponentTyping, result } = useGameStore();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Compute environmental states
  const isUrgent = gameState === 'active' && timeLeft <= 15;
  const isCritical = gameState === 'active' && timeLeft <= 10;
  const isCorrect = result?.isCorrect === true;
  const isIncorrect = result?.isCorrect === false;

  // Parallax calculations (smoother response)
  const pxX = (mousePosition.x / (typeof window !== 'undefined' ? window.innerWidth : 1000) - 0.5) * 2;
  const pxY = (mousePosition.y / (typeof window !== 'undefined' ? window.innerHeight : 1000) - 0.5) * 2;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 perspective-[2000px] bg-[#030303]">
      
      {/* 1. DIGITAL ATMOSPHERIC DEPTH (Base Fog) */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: isCorrect 
            ? "radial-gradient(ellipse at 50% 30%, rgba(200, 180, 150, 0.08) 0%, transparent 80%)" 
            : isIncorrect
            ? "radial-gradient(ellipse at 50% 80%, rgba(30, 40, 60, 0.05) 0%, transparent 70%)"
            : isUrgent
            ? "radial-gradient(ellipse at 50% 50%, rgba(60, 10, 10, 0.05) 0%, transparent 80%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 80%)"
        }}
        transition={{ duration: 3 }}
      />

      {/* 2. MASSIVE NEURAL GRID SYSTEM */}
      <motion.div
        className="absolute w-[200vw] h-[200vh] -top-[50vh] -left-[50vw] z-[1] opacity-[0.04] mix-blend-screen"
        animate={{
          x: pxX * -20,
          y: pxY * -20,
          rotate: isIncorrect ? 0 : [0, 1, -1, 0],
          scale: isCritical ? 1.05 : 1
        }}
        transition={{ 
          x: { type: "spring", stiffness: 10, damping: 30 },
          y: { type: "spring", stiffness: 10, damping: 30 },
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l100 100M100 0L0 100M50 0v100M0 50h100' stroke='white' stroke-width='0.5' stroke-opacity='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='2' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* 3. ABSTRACT AI MEGASTRUCTURES */}
      <div className="absolute inset-0 flex items-center justify-center z-[2] mix-blend-screen opacity-10">
        <motion.div
          animate={{
            x: pxX * -40,
            y: pxY * -40,
            rotateX: [60, 70, 60],
            rotateZ: [0, 360],
            opacity: isIncorrect ? 0 : 1
          }}
          transition={{
            x: { type: "spring", stiffness: 5, damping: 20 },
            y: { type: "spring", stiffness: 5, damping: 20 },
            rotateX: { duration: 30, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 120, repeat: Infinity, ease: "linear" },
            opacity: { duration: 2 }
          }}
          className="w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] absolute rounded-full border-[1px] border-dashed border-white/40 blur-[2px]"
        />
        <motion.div
          animate={{
            x: pxX * -60,
            y: pxY * -60,
            rotateY: [60, 70, 60],
            rotateZ: [360, 0],
            scale: gameState === 'matchmaking' ? 1.2 : 1,
            opacity: isIncorrect ? 0 : 0.8
          }}
          transition={{
            x: { type: "spring", stiffness: 3, damping: 15 },
            y: { type: "spring", stiffness: 3, damping: 15 },
            rotateY: { duration: 40, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 150, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 2 }
          }}
          className="w-[200vw] h-[200vw] md:w-[150vw] md:h-[150vw] absolute rounded-full border-[2px] border-dotted border-white/20 blur-[4px]"
        />
      </div>

      {/* 4. SCANNING + COMPUTATIONAL SYSTEMS */}
      <AnimatePresence>
        {(gameState === 'matchmaking' || isOpponentTyping) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[3] mix-blend-screen"
          >
            {/* Horizontal scanning sweep */}
            <motion.div
              animate={{ y: ["-10vh", "110vh"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-full h-32 bg-gradient-to-b from-transparent via-white to-transparent blur-md"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing environmental flicker */}
      <AnimatePresence>
        {isOpponentTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.02, 0] }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 bg-white z-[3] mix-blend-screen pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Tension Escalation (Final 10s) */}
      <motion.div
        className="absolute inset-0 z-[4] mix-blend-multiply pointer-events-none"
        animate={{
          boxShadow: isCritical 
            ? 'inset 0 0 200px rgba(100, 0, 0, 0.4)' 
            : isUrgent 
            ? 'inset 0 0 100px rgba(50, 0, 0, 0.2)' 
            : 'inset 0 0 0px rgba(0,0,0,0)'
        }}
        transition={{ duration: 2 }}
      />
      
      {/* Global Vignette */}
      <div className="absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] mix-blend-multiply opacity-90" />

      {/* High Frequency Noise (keeps the premium grainy feel) */}
      <div 
        className="absolute inset-0 z-[6] opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Cursor Environmental Glow (True Depth Parallax) */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full z-[7] mix-blend-screen pointer-events-none"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
          background: isCorrect
            ? "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)"
            : isIncorrect
            ? "radial-gradient(circle, rgba(100,100,100,0.02) 0%, transparent 50%)"
            : "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)"
        }}
        transition={{
          x: { type: "spring", stiffness: 40, damping: 25 },
          y: { type: "spring", stiffness: 40, damping: 25 },
          background: { duration: 2 }
        }}
      />
    </div>
  );
}
