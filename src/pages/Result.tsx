import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { Button } from '../components/ui/button';
import { Bot, User, CheckCircle2, XCircle, Timer, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function Result() {
  const { result, playAgain } = useGameStore();
  const { width, height } = useWindowSize();

  if (!result) return null;

  const { isCorrect, actualType, guess, basePoints, timeBonus, totalScore, remainingTime } = result;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden perspective-1000">
      
      {/* Dynamic Atmospheric Background based on result */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-screen z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {isCorrect ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-[100px]" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(100,100,100,0.05)_0%,transparent_70%)] blur-[100px]" />
        )}
      </motion.div>
      
      {isCorrect && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={250}
            gravity={0.05}
            initialVelocityY={10}
            colors={['#ffffff', '#aaaaaa', '#666666', '#333333']}
            opacity={0.6}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95, translateZ: -50 }}
        animate={{ opacity: 1, y: 0, scale: 1, translateZ: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-lg flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          {isCorrect ? (
            <div className="inline-flex items-center space-x-2 text-white bg-white/10 px-5 py-2.5 rounded-full border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-xl">
              <CheckCircle2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              <span className="font-medium tracking-wide">Accurate Assessment</span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 text-neutral-400 bg-[#0a0a0a]/80 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-xl">
              <XCircle className="w-5 h-5 opacity-70" />
              <span className="font-medium tracking-wide">{guess === null ? 'Time Expired' : 'Misjudged'}</span>
            </div>
          )}
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl font-light mb-14 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm"
        >
          It was {actualType === 'human' ? 'a Human' : 'an AI'}
        </motion.h2>

        <div className="grid grid-cols-2 gap-6 w-full mb-14 perspective-1000">
          <motion.div 
            initial={{ opacity: 0, rotateY: 15, x: -30 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className={cn(
              "flex flex-col items-center justify-center p-8 rounded-3xl border transition-all duration-1000",
              actualType === 'ai' 
                ? "bg-white/10 border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-md" 
                : "bg-transparent border-white/5 opacity-40 scale-95 blur-[2px]"
            )}
          >
            <Bot className={cn("w-14 h-14 mb-5", actualType === 'ai' ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-neutral-500")} strokeWidth={1.5} />
            <span className="text-xl font-medium tracking-[0.2em] uppercase text-white/90">AI</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, rotateY: -15, x: 30 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            className={cn(
              "flex flex-col items-center justify-center p-8 rounded-3xl border transition-all duration-1000",
              actualType === 'human' 
                ? "bg-white/10 border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-md" 
                : "bg-transparent border-white/5 opacity-40 scale-95 blur-[2px]"
            )}
          >
            <User className={cn("w-14 h-14 mb-5", actualType === 'human' ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-neutral-500")} strokeWidth={1.5} />
            <span className="text-xl font-medium tracking-[0.2em] uppercase text-white/90">Human</span>
          </motion.div>
        </div>

        {/* Score Breakdown */}
        {isCorrect && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-[#0a0a0a]/60 border border-white/10 rounded-3xl p-8 mb-14 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex justify-between items-center mb-5">
              <span className="text-neutral-400 tracking-wide">Base Score</span>
              <span className="text-xl text-white font-medium">+{basePoints}</span>
            </div>
            {timeBonus > 0 && (
              <div className="flex justify-between items-center mb-5 pb-5 border-b border-white/10">
                <div className="flex items-center text-neutral-400 tracking-wide">
                  <Timer className="w-4 h-4 mr-2 opacity-70" />
                  Time Bonus ({60 - remainingTime}s)
                </div>
                <span className="text-xl text-white font-medium">+{timeBonus}</span>
              </div>
            )}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500">Total Awarded</span>
              <span className="text-4xl font-light text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">+{totalScore}</span>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <Button 
            onClick={playAgain}
            size="lg"
            variant="glow"
            className="px-10 py-6 relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition-all duration-500 rounded-full"
          >
            <RotateCcw className="w-5 h-5 mr-3 transition-transform duration-500 group-hover:-rotate-180 opacity-70 group-hover:opacity-100" />
            <span className="relative z-10 font-medium tracking-wider text-sm text-white uppercase drop-shadow-md">Return to Trial</span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}