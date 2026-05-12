/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useGameStore } from './store/gameStore';
import Landing from './pages/Landing';
import Matchmaking from './pages/Matchmaking';
import Chat from './pages/Chat';
import Result from './pages/Result';
import AmbientBackground from './components/AmbientBackground';

export default function App() {
  const gameState = useGameStore(state => state.gameState);

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans overflow-hidden selection:bg-white/20 relative">
      <AmbientBackground />
      
      {/* Page Content */}
      <div className="relative z-10 h-full w-full">
        {gameState === 'title' && <Landing />}
        {gameState === 'matchmaking' && <Matchmaking />}
        {gameState === 'active' && <Chat />}
        {gameState === 'result' && <Result />}
      </div>
    </div>
  );
}
