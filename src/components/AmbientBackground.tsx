import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export default function AmbientBackground() {
  const { gameState, timeLeft, isOpponentTyping, result } = useGameStore();

  // Performant mouse tracking without React re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle/debounce with requestAnimationFrame for max performance
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) - 0.5;
        const ny = (e.clientY / window.innerHeight) - 0.5;
        mouseX.set(nx);
        mouseY.set(ny);
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  // Smooth springs for parallax
  const springConfig = { damping: 40, stiffness: 60, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layered parallax offsets
  const pxGridX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const pxGridY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  
  const pxMega1X = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const pxMega1Y = useTransform(smoothY, [-0.5, 0.5], [30, -30]);
  
  const pxMega2X = useTransform(smoothX, [-0.5, 0.5], [50, -50]);
  const pxMega2Y = useTransform(smoothY, [-0.5, 0.5], [50, -50]);

  const pxGlowX = useTransform(smoothX, [-0.5, 0.5], [200, -200]);
  const pxGlowY = useTransform(smoothY, [-0.5, 0.5], [200, -200]);

  // Compute environmental states
  const isUrgent = gameState === 'active' && timeLeft <= 15;
  const isCritical = gameState === 'active' && timeLeft <= 10;
  const isCorrect = result?.isCorrect === true;
  const isIncorrect = result?.isCorrect === false;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 perspective-[2000px] bg-[#030303] translate-z-0">
      
      {/* 1. DIGITAL ATMOSPHERIC DEPTH (Base Fog) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-80"
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

      {/* 2. MASSIVE NEURAL GRID SYSTEM (Optimized: No scale/rotate animation, just drift) */}
      <motion.div
        className="absolute w-[150vw] h-[150vh] -top-[25vh] -left-[25vw] z-[1] opacity-[0.03] mix-blend-screen"
        style={{
          x: pxGridX,
          y: pxGridY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l100 100M100 0L0 100M50 0v100M0 50h100' stroke='white' stroke-width='0.5' stroke-opacity='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='2' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
        animate={{
          opacity: isIncorrect ? 0 : isCritical ? 0.05 : 0.03
        }}
        transition={{ duration: 2 }}
      />

      {/* 3. ABSTRACT AI MEGASTRUCTURES (Optimized: Removed expensive blurs, reduced size) */}
      <div className="absolute inset-0 flex items-center justify-center z-[2] mix-blend-screen opacity-10">
        <motion.div
          style={{ x: pxMega1X, y: pxMega1Y }}
          animate={{
            rotateX: [60, 70, 60],
            rotateZ: [0, 360],
            opacity: isIncorrect ? 0 : 1
          }}
          transition={{
            rotateX: { duration: 30, repeat: Infinity, ease: "linear" },
            rotateZ: { duration: 120, repeat: Infinity, ease: "linear" },
            opacity: { duration: 2 }
          }}
          className="w-[120vw] h-[120vw] max-w-[1500px] max-h-[1500px] absolute rounded-full border-[1px] border-dashed border-white/20"
        />
        <motion.div
          style={{ x: pxMega2X, y: pxMega2Y }}
          animate={{
            rotateY: [60, 70, 60],
            rotateZ: [360, 0],
            scale: gameState === 'matchmaking' ? 1.1 : 1,
            opacity: isIncorrect ? 0 : 0.6
          }}
          transition={{
            rotateY: { duration: 40, repeat: Infinity, ease: "linear" },
            rotateZ: { duration: 150, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 2 }
          }}
          className="w-[150vw] h-[150vw] max-w-[1800px] max-h-[1800px] absolute rounded-full border-[1px] border-dotted border-white/10"
        />
      </div>

      {/* 4. SCANNING + COMPUTATIONAL SYSTEMS */}
      <AnimatePresence>
        {gameState === 'matchmaking' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[3] mix-blend-screen"
          >
            {/* Horizontal scanning sweep (Optimized: Removed blur) */}
            <motion.div
              animate={{ y: ["-10vh", "110vh"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-24 bg-gradient-to-b from-transparent via-white to-transparent opacity-80"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing environmental flicker */}
      <AnimatePresence>
        {isOpponentTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.015, 0] }}
            transition={{ duration: 0.15, repeat: Infinity }}
            className="absolute inset-0 bg-white z-[3] mix-blend-screen pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Tension Escalation (Final 10s) */}
      <motion.div
        className="absolute inset-0 z-[4] mix-blend-multiply pointer-events-none"
        animate={{
          boxShadow: isCritical 
            ? 'inset 0 0 150px rgba(100, 0, 0, 0.3)' 
            : isUrgent 
            ? 'inset 0 0 80px rgba(50, 0, 0, 0.15)' 
            : 'inset 0 0 0px rgba(0,0,0,0)'
        }}
        transition={{ duration: 2 }}
      />
      
      {/* Global Vignette */}
      <div className="absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] mix-blend-multiply opacity-90" />

      {/* High Frequency Noise (Optimized: Using pre-rendered image instead of feTurbulence) */}
      <div className="absolute inset-0 z-[6] opacity-[0.06] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Ambient Depth Parallax Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-[7] mix-blend-screen pointer-events-none"
        style={{ x: pxGlowX, y: pxGlowY }}
        animate={{
          background: isCorrect
            ? "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)"
            : isIncorrect
            ? "radial-gradient(circle, rgba(100,100,100,0.02) 0%, transparent 50%)"
            : "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)"
        }}
        transition={{ background: { duration: 2 } }}
      />
    </div>
  );
}
