import { useGameStore } from '../../store/gameStore';

// In the future this will be replaced with actual Groq API integration
// Using a placeholder environment variable
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';

// Mock AI responses that sound a bit too perfectly generated, or sometimes convincingly human
const AI_RESPONSES = [
  "Hello there! How can I assist you today?",
  "I'm here, ready to chat. What's on your mind?",
  "That's an interesting perspective.",
  "As an AI, I don't have personal feelings, but I understand what you mean.",
  "Could you elaborate on that?",
  "I am definitely a human. Why would you think otherwise?",
  "The weather is quite pleasant where I am.",
  "I'm processing what you just said...",
  "Let's focus on the game at hand.",
  "Indeed.",
];

export const handleAITurn = async (message: string) => {
  const store = useGameStore.getState();
  if (store.gameState !== 'active') return;

  // Future implementation will use actual fetch/service call here
  // const response = await fetch('https://api.groq.com/openai/v1/chat/completions', { ... })
  
  // Simulated AI API delay and processing
  const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
  const processingDelay = 800 + Math.random() * 1000; // Fast response times compared to human
  
  setTimeout(() => {
    const currentStore = useGameStore.getState();
    if (currentStore.gameState !== 'active') return;
    
    currentStore.setOpponentTyping(true);
    
    // AI types consistently and slightly faster
    const typingDuration = response.length * 20; 
    
    setTimeout(() => {
      const finalStore = useGameStore.getState();
      if (finalStore.gameState === 'active') {
        finalStore.addOpponentMessage(response);
      }
    }, typingDuration);
    
  }, processingDelay);
};
