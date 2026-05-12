/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useGameStore } from './store/gameStore';
import Landing from './pages/Landing';
import Matchmaking from './pages/Matchmaking';
import Chat from './pages/Chat';
import Result from './pages/Result';

export default function App() {
  const gameState = useGameStore(state => state.gameState);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-white/20 relative">
      {/* Global animated background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 pointer-events-none blur-[120px] bg-gradient-to-b from-white/20 to-transparent rounded-full mix-blend-screen" />
      
      {gameState === 'title' && <Landing />}
      {gameState === 'matchmaking' && <Matchmaking />}
      {gameState === 'active' && <Chat />}
      {gameState === 'result' && <Result />}
    </div>
  );
}
