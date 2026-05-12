import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { beginMatchmaking } from '../services/matchmaking';
import { BrainCircuit, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <main className="max-w-3xl w-full z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex space-x-2"
        >
          <span className="px-3 py-1 text-[10px] font-medium uppercase tracking-widest border border-white/10 rounded-full bg-white/5 backdrop-blur-md text-neutral-400">
            Turing Trial • Phase 1
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
        >
          Can You Tell Human <br className="hidden md:block"/> From Machine?
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-neutral-400 mb-12 max-w-xl font-light"
        >
          A real-time social deduction experiment. Chat for 60 seconds. Trust your instincts. Decide.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button 
            size="lg" 
            variant="glow"
            onClick={() => beginMatchmaking()}
            className="group px-10 relative overflow-hidden"
          >
            <span className="relative z-10 font-semibold tracking-wide">Start Trial</span>
            <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out z-0"></div>
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 grid grid-cols-2 gap-8 md:gap-16 pt-8 border-t border-white/10 w-full max-w-lg"
        >
          <div className="flex flex-col items-center">
            <Users className="w-5 h-5 text-neutral-400 mb-3 opacity-50" />
            <span className="text-4xl font-light tabular-nums tracking-tight">42%</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2">Humans Fooled</span>
          </div>
          <div className="flex flex-col items-center">
            <BrainCircuit className="w-5 h-5 text-neutral-400 mb-3 opacity-50" />
            <span className="text-4xl font-light tabular-nums tracking-tight">89k</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2">Trials Run</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
