import { create } from 'zustand';

export type OpponentType = 'ai' | 'human';
export type GameState = 'title' | 'matchmaking' | 'active' | 'result';
export type Guess = 'ai' | 'human';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'opponent';
  timestamp: number;
}

export interface ResultState {
  guess: Guess | null; // null if time ran out
  actualType: OpponentType;
  isCorrect: boolean;
  basePoints: number;
  timeBonus: number;
  totalScore: number;
  remainingTime: number;
}

interface GameStore {
  gameState: GameState;
  opponentType: OpponentType | null;
  messages: Message[];
  score: number;
  timeLeft: number;
  maxTime: number;
  isOpponentTyping: boolean;
  result: ResultState | null;

  // Actions
  setGameState: (state: GameState) => void;
  startMatchmaking: () => void;
  matchFound: (type: OpponentType) => void;
  sendMessage: (text: string) => void;
  addOpponentMessage: (text: string) => void;
  setOpponentTyping: (isTyping: boolean) => void;
  tickTimer: () => void;
  submitGuess: (guess: Guess) => void;
  timeRanOut: () => void;
  playAgain: () => void;
}

const MAX_TIME = 60;

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'title',
  opponentType: null,
  messages: [],
  score: 0,
  timeLeft: MAX_TIME,
  maxTime: MAX_TIME,
  isOpponentTyping: false,
  result: null,

  setGameState: (state) => set({ gameState: state }),
  
  startMatchmaking: () => {
    set({
      gameState: 'matchmaking',
      opponentType: null,
      messages: [],
      timeLeft: MAX_TIME,
      isOpponentTyping: false,
      result: null,
    });
  },

  matchFound: (type) => {
    set({
      gameState: 'active',
      opponentType: type,
    });
  },

  sendMessage: (text) => {
    set((state) => ({
      messages: [...state.messages, { id: Date.now().toString(), text, sender: 'user', timestamp: Date.now() }]
    }));
  },

  addOpponentMessage: (text) => {
    set((state) => ({
      messages: [...state.messages, { id: Date.now().toString(), text, sender: 'opponent', timestamp: Date.now() }],
      isOpponentTyping: false
    }));
  },

  setOpponentTyping: (isTyping) => set({ isOpponentTyping: isTyping }),

  tickTimer: () => {
    const { timeLeft, gameState } = get();
    if (gameState !== 'active') return;
    
    if (timeLeft <= 1) {
      get().timeRanOut();
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  submitGuess: (guess) => {
    const state = get();
    if (state.gameState !== 'active' || !state.opponentType) return;

    const isCorrect = guess === state.opponentType;
    const basePoints = isCorrect ? 1 : 0;
    
    let timeBonus = 0;
    if (isCorrect) {
      const timeSpent = MAX_TIME - state.timeLeft;
      if (timeSpent <= 10) timeBonus = 0.5;
      else if (timeSpent <= 30) timeBonus = 0.25;
    }

    const totalPoints = basePoints + timeBonus;

    set({
      gameState: 'result',
      score: state.score + totalPoints,
      result: {
        guess,
        actualType: state.opponentType,
        isCorrect,
        basePoints,
        timeBonus,
        totalScore: totalPoints,
        remainingTime: state.timeLeft
      }
    });
  },

  timeRanOut: () => {
    const state = get();
    if (state.gameState !== 'active' || !state.opponentType) return;
    
    set({
      gameState: 'result',
      timeLeft: 0,
      result: {
        guess: null,
        actualType: state.opponentType,
        isCorrect: false,
        basePoints: 0,
        timeBonus: 0,
        totalScore: 0,
        remainingTime: 0
      }
    });
  },

  playAgain: () => {
    set({
      gameState: 'title',
      opponentType: null,
      messages: [],
      timeLeft: MAX_TIME,
      isOpponentTyping: false,
      result: null,
    });
  }
}));
