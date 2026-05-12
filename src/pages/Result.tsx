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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      {isCorrect && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.15}
          colors={['#ffffff', '#888888', '#444444']}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          {isCorrect ? (
            <div className="inline-flex items-center space-x-2 text-white bg-white/10 px-4 py-2 rounded-full border border-white/20">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium tracking-wide">Correct Decision</span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 text-neutral-400 bg-neutral-900 px-4 py-2 rounded-full border border-white/10">
              <XCircle className="w-5 h-5" />
              <span className="font-medium tracking-wide">{guess === null ? 'Time Expired' : 'Incorrectly Guessed'}</span>
            </div>
          )}
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-light mb-12 tracking-tight text-white">
          It was {actualType === 'human' ? 'a Human' : 'an AI'}
        </h2>

        <div className="grid grid-cols-2 gap-4 w-full mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={cn(
              "flex flex-col items-center justify-center p-8 rounded-3xl border transition-colors",
              actualType === 'ai' 
                ? "bg-white/5 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                : "bg-black border-white/5 opacity-50"
            )}
          >
            <Bot className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
            <span className="text-lg font-medium tracking-widest uppercase text-neutral-300">AI</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={cn(
              "flex flex-col items-center justify-center p-8 rounded-3xl border transition-colors",
              actualType === 'human' 
                ? "bg-white/5 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                : "bg-black border-white/5 opacity-50"
            )}
          >
            <User className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
            <span className="text-lg font-medium tracking-widest uppercase text-neutral-300">Human</span>
          </motion.div>
        </div>

        {/* Score Breakdown */}
        {isCorrect && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full bg-neutral-900/50 border border-white/10 rounded-2xl p-6 mb-12 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-neutral-400">Base Score</span>
              <span className="text-xl text-white font-medium">+{basePoints}</span>
            </div>
            {timeBonus > 0 && (
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center text-neutral-400">
                  <Timer className="w-4 h-4 mr-2" />
                  Time Bonus ({60 - remainingTime}s)
                </div>
                <span className="text-xl text-white font-medium">+{timeBonus}</span>
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium tracking-widest uppercase text-neutral-500">Total Awarded</span>
              <span className="text-3xl font-light text-white">+{totalScore}</span>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Button 
            onClick={playAgain}
            size="lg"
            variant="glow"
            className="group px-8"
          >
            <RotateCcw className="w-4 h-4 mr-2 transition-transform group-hover:-rotate-90" />
            Play Again
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}