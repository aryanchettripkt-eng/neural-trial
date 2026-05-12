import { useGameStore, OpponentType } from '../store/gameStore';
import { handleHumanTurn } from './mockHumans/engine';
import { handleAITurn } from './ai/groq';

export const beginMatchmaking = () => {
  const store = useGameStore.getState();
  store.startMatchmaking();

  const waitTime = Math.random() * 4000 + 2000; // 2-6 seconds
  
  setTimeout(() => {
    const isHuman = Math.random() > 0.5;
    const opponentType: OpponentType = isHuman ? 'human' : 'ai';
    
    useGameStore.getState().matchFound(opponentType);
    
    // Sometimes the opponent says "hi" first
    if (Math.random() > 0.5) {
        if (opponentType === 'human') handleHumanTurn(''); 
        else handleAITurn('');
    }
  }, waitTime);
};

export const processOpponentTurn = (message: string) => {
  const store = useGameStore.getState();
  if (store.opponentType === 'human') {
    handleHumanTurn(message);
  } else if (store.opponentType === 'ai') {
    handleAITurn(message);
  }
};
