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
  const progress = (timeLeft / maxTime) * 100;

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto w-full relative z-10 selection:bg-white/20">
      
      {/* Top Bar / Timer */}
      <div className="shrink-0 pt-8 pb-4 px-6 flex flex-col items-center justify-center sticky top-0 bg-gradient-to-b from-black via-black/90 to-transparent z-20">
        <motion.div 
          animate={isUrgent ? { scale: [1, 1.05, 1], textShadow: ["0 0 0px #fff", "0 0 10px #fff", "0 0 0px #fff"] } : {}}
          transition={{ duration: 1, repeat: isUrgent ? Infinity : 0 }}
          className={cn(
            "text-4xl font-light tabular-nums tracking-tight transition-colors duration-500",
            isUrgent ? "text-white" : "text-neutral-400"
          )}
        >
          00:{timeLeft.toString().padStart(2, '0')}
        </motion.div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-xs h-0.5 bg-neutral-800 rounded-full mt-4 overflow-hidden relative">
          <motion.div 
            className={cn("absolute left-0 top-0 bottom-0", isUrgent ? "bg-white" : "bg-neutral-500")}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-24 scrollbar-hide">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-50 text-neutral-500 text-sm">
            <AlertCircle className="w-6 h-6 mb-3 opacity-50" />
            <p>Connection established.</p>
            <p>Begin questioning.</p>
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "max-w-[80%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                    isUser 
                      ? "bg-white text-black self-end rounded-tr-sm" 
                      : "bg-neutral-900 border border-white/5 text-neutral-100 self-start rounded-tl-sm"
                  )}
                >
                  {m.text}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isOpponentTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-transparent text-neutral-500 self-start px-2 py-2 text-sm flex items-center space-x-1"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-bounce" style={{ animationDelay: '300ms' }} />
            </motion.div>
          )}
          <div ref={endOfMessagesRef} className="h-4" />
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent fixed bottom-0 left-0 right-0 z-20">
        <div className="max-w-3xl mx-auto flex flex-col space-y-4">
          
          {/* Guess Actions */}
          <div className="grid grid-cols-2 gap-3 px-2">
            <Button 
              variant="outline" 
              className="py-6 border-white/10 hover:border-white/30 group"
              onClick={() => submitGuess('human')}
            >
              <span className="text-neutral-400 group-hover:text-white transition-colors">Lock Guess: Human</span>
            </Button>
            <Button 
              variant="glow" 
              className="py-6 group"
              onClick={() => submitGuess('ai')}
            >
              <span className="text-neutral-400 group-hover:text-white transition-colors">Lock Guess: AI</span>
            </Button>
          </div>

          <form onSubmit={handleSend} className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something revealing..."
              className="w-full bg-neutral-900 border border-white/10 rounded-2xl pl-5 pr-12 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all font-light shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-neutral-500 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}
