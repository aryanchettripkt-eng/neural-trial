import { useGameStore } from '../../store/gameStore';
import { 
  HUMAN_GREETINGS, 
  HUMAN_CONFUSIONS, 
  HUMAN_ACCUSATIONS, 
  HUMAN_AGREEMENTS, 
  HUMAN_DISAGREEMENTS, 
  HUMAN_RANDOM 
} from './datasets';

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// Very basic keyword matching to simulate human
const generateResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('ai') || lowerMsg.includes('bot') || lowerMsg.includes('robot')) {
    return getRandomItem(HUMAN_ACCUSATIONS);
  }
  if (lowerMsg.includes('?') && lowerMsg.split(' ').length > 4) {
    // long question
    return Math.random() > 0.5 ? getRandomItem(HUMAN_CONFUSIONS) : getRandomItem(HUMAN_RANDOM);
  }
  if (lowerMsg.includes('yes') || lowerMsg.includes('right') || lowerMsg.includes('agree')) {
    return getRandomItem(HUMAN_AGREEMENTS);
  }
  if (lowerMsg.includes('no') || lowerMsg.includes('wrong')) {
    return getRandomItem(HUMAN_DISAGREEMENTS);
  }
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return getRandomItem(HUMAN_GREETINGS);
  }
  
  return getRandomItem(HUMAN_RANDOM);
};

export const handleHumanTurn = (message: string) => {
  const store = useGameStore.getState();
  if (store.gameState !== 'active') return;

  const response = generateResponse(message);
  
  // Fake latency
  const typingDelay = Math.random() * 1500 + 1000; // 1-2.5s before they "start typing"
  const typingDuration = response.length * (Math.random() * 50 + 30); // 30-80ms per char

  setTimeout(() => {
    const currentStore = useGameStore.getState();
    if (currentStore.gameState !== 'active') return;
    
    currentStore.setOpponentTyping(true);
    
    setTimeout(() => {
      const finalStore = useGameStore.getState();
      if (finalStore.gameState === 'active') {
        finalStore.addOpponentMessage(response);
      }
    }, typingDuration);

  }, typingDelay);
};
