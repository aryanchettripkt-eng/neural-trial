import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { processOpponentTurn } from '../services/matchmaking';
import { SendIcon, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';

export default function Chat() {
  const { messages, timeLeft, maxTime, isOpponentTyping, sendMessage, submitGuess, tickTimer } = useGameStore();
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTimer]);

  // Auto-scroll
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpponentTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    const msg = input.trim();
    sendMessage(msg);
    setInput('');
    processOpponentTurn(msg);
  };

  const isUrgent = timeLeft <= 15;
  const isCritical = timeLeft <= 10;
  const progress = (timeLeft / maxTime) * 100;

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto w-full relative z-10 selection:bg-white/20">
      
      {/* Dynamic Tension Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-multiply z-0"
        animate={{
          backgroundColor: isUrgent ? 'rgba(20, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 2 }}
      />
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          boxShadow: isCritical ? 'inset 0 0 150px rgba(255, 0, 0, 0.05)' : 'inset 0 0 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 1 }}
      />

      {/* Top Bar / Timer */}
      <div className="shrink-0 pt-8 pb-4 px-6 flex flex-col items-center justify-center sticky top-0 bg-gradient-to-b from-[#030303] via-[#030303]/90 to-transparent z-20 backdrop-blur-sm">
        <motion.div 
          animate={isCritical ? { scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] } : {}}
          transition={{ duration: 1, repeat: isCritical ? Infinity : 0 }}
          className={cn(
            "text-4xl font-light tabular-nums tracking-tight transition-colors duration-1000",
            isCritical ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" : (isUrgent ? "text-white" : "text-neutral-500")
          )}
        >
          00:{timeLeft.toString().padStart(2, '0')}
        </motion.div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-[200px] h-[1px] bg-white/5 mt-4 overflow-hidden relative rounded-full">
          <motion.div 
            className={cn("absolute left-0 top-0 bottom-0 shadow-[0_0_10px_rgba(255,255,255,0.5)]", isUrgent ? "bg-white/80" : "bg-neutral-500")}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-32 scrollbar-hide relative z-10">
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 0.5, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="flex flex-col items-center justify-center h-full text-neutral-500 text-sm font-light tracking-wide"
          >
            <AlertCircle className="w-5 h-5 mb-4 opacity-50" />
            <p>Neural link established.</p>
            <p className="mt-1">Initiate conversation.</p>
          </motion.div>
        )}

        <div className="flex flex-col space-y-5">
          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "max-w-[85%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-lg backdrop-blur-md",
                    isUser 
                      ? "bg-white/90 text-black self-end rounded-tr-sm" 
                      : "bg-[#111]/80 border border-white/5 text-neutral-200 self-start rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                  )}
                >
                  {m.text}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isOpponentTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="bg-[#111]/50 border border-white/5 self-start px-4 py-3 rounded-2xl rounded-tl-sm text-sm flex items-center space-x-1.5 backdrop-blur-md"
            >
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            </motion.div>
          )}
          <div ref={endOfMessagesRef} className="h-4" />
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 p-4 bg-gradient-to-t from-[#030303] via-[#030303]/95 to-transparent fixed bottom-0 left-0 right-0 z-30 pt-12">
        <div className="max-w-3xl mx-auto flex flex-col space-y-5">
          
          {/* Guess Actions */}
          <div className="grid grid-cols-2 gap-4 px-2">
            <Button 
              variant="outline" 
              className="py-6 border-white/5 bg-white/[0.02] backdrop-blur-lg hover:bg-white/5 hover:border-white/20 group transition-all duration-300 relative overflow-hidden rounded-xl"
              onClick={() => submitGuess('human')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="text-neutral-400 group-hover:text-white transition-colors relative z-10 tracking-wide font-medium">Lock Guess: Human</span>
            </Button>
            <Button 
              variant="glow" 
              className="py-6 group bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 transition-all duration-300 relative overflow-hidden rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              onClick={() => submitGuess('ai')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="text-white drop-shadow-md relative z-10 tracking-wide font-medium">Lock Guess: AI</span>
            </Button>
          </div>

          <form onSubmit={handleSend} className="relative group px-2 pb-2">
            <div className={cn(
              "absolute -inset-0.5 bg-white/20 rounded-2xl blur opacity-0 transition-opacity duration-500",
              isInputFocused ? "opacity-100" : ""
            )} />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="Ask something revealing..."
              className="w-full relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 transition-all font-light shadow-xl"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-xl text-neutral-500 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-300 z-10"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}
