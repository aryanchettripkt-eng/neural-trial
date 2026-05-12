import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { beginMatchmaking } from '../services/matchmaking';
import { BrainCircuit, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden perspective-1000">
      
      {/* Background Neural Orb */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] blur-[60px] pointer-events-none"
      />

      <main className="max-w-3xl w-full z-10 flex flex-col items-center text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20, translateZ: 0 }}
          animate={{ opacity: 1, y: 0, translateZ: 20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex space-x-2"
        >
          <span className="px-4 py-1.5 text-[10px] font-medium uppercase tracking-widest border border-white/10 rounded-full bg-black/40 backdrop-blur-xl shadow-[0_0_15px_rgba(255,255,255,0.03)] text-neutral-400">
            Turing Trial • Phase 1
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20, translateZ: 0 }}
          animate={{ opacity: 1, y: 0, translateZ: 40 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/30 drop-shadow-sm"
        >
          Can You Tell Human <br className="hidden md:block"/> From Machine?
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20, translateZ: 0 }}
          animate={{ opacity: 1, y: 0, translateZ: 20 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-neutral-400 mb-12 max-w-xl font-light leading-relaxed"
        >
          A real-time psychological experiment. Chat for 60 seconds. Observe the nuances. Trust your instincts. Decide.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          {/* Ambient button glow */}
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <Button 
            size="lg" 
            variant="glow"
            onClick={() => beginMatchmaking()}
            className="px-12 py-6 relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition-all duration-500 rounded-full"
          >
            <span className="relative z-10 font-medium tracking-wider text-sm text-white drop-shadow-md uppercase">Start Trial</span>
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-32 grid grid-cols-2 gap-8 md:gap-24 pt-12 border-t border-white/5 w-full max-w-lg relative"
        >
          {/* Subtle line glow */}
          <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <motion.div 
            whileHover={{ y: -2 }}
            className="flex flex-col items-center group transition-transform duration-500"
          >
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Users className="w-5 h-5 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-500 relative z-10" />
            </div>
            <span className="text-4xl font-light tabular-nums tracking-tight text-white/90">42%</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2 group-hover:text-neutral-400 transition-colors">Humans Fooled</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -2 }}
            className="flex flex-col items-center group transition-transform duration-500"
          >
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <BrainCircuit className="w-5 h-5 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-500 relative z-10" />
            </div>
            <span className="text-4xl font-light tabular-nums tracking-tight text-white/90">89k</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2 group-hover:text-neutral-400 transition-colors">Trials Run</span>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
