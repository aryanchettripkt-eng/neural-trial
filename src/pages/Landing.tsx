import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { beginMatchmaking } from '../services/matchmaking';
import { BrainCircuit, Users, LogOut } from 'lucide-react';
import { signInWithGoogle, signOut } from '../lib/auth';
import { useAuth } from '../hooks/useAuth';

export default function Landing() {
  const { user, loading } = useAuth();

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
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="relative group">
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
          </div>

          {loading ? (
            <div className="relative group flex items-center justify-center px-8 py-6 h-[52px] bg-white/5 border border-white/10 rounded-full animate-pulse backdrop-blur-xl">
              <span className="text-[11px] text-neutral-400 font-medium tracking-widest uppercase">Connecting...</span>
            </div>
          ) : !user ? (
            <div className="relative group animate-in fade-in zoom-in-95 duration-700">
              {/* Ambient button glow */}
              <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <Button 
                size="lg" 
                onClick={() => signInWithGoogle()}
                className="px-8 py-6 relative overflow-hidden bg-transparent border border-white/5 backdrop-blur-xl hover:bg-white/5 hover:border-white/20 transition-all duration-500 rounded-full flex items-center gap-3"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-neutral-500 group-hover:text-neutral-200 transition-colors duration-500" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="relative z-10 font-medium tracking-widest text-[11px] text-neutral-400 group-hover:text-neutral-200 transition-colors duration-500 uppercase">Sign in with Google</span>
              </Button>
            </div>
          ) : (
            <div 
              className="relative group flex items-center gap-4 px-6 py-3.5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full animate-in fade-in zoom-in-95 duration-700"
            >
              <div className="absolute inset-0 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative flex items-center justify-center">
                {user.user_metadata?.avatar_url ? (
                  <img 
                    src={user.user_metadata.avatar_url} 
                    alt="Avatar" 
                    className="w-9 h-9 rounded-full border border-white/20 object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-xs font-medium text-white/70">
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
              </div>

              <div className="flex flex-col items-start pr-2">
                <span className="text-sm font-medium text-white/90 leading-tight">
                  {user.user_metadata?.full_name?.split(' ')?.[0] || user.email?.split('@')?.[0] || "Agent"}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                  Verified
                </span>
              </div>

              <div className="w-[1px] h-8 bg-white/10 mx-2" />

              <button 
                onClick={() => signOut()}
                className="relative z-10 p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                title="Disconnect"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
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
