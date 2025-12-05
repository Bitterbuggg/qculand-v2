import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { MOUSE } from 'three';
import AdminEnvironment from './AdminEnvironment';
import AdminPlayer from './AdminPlayer';
import AdminUI from './AdminUI';
import { violations } from './violations';

export default function AdminBuildingScene({ onExit }) {
  const [gameState, setGameState] = useState('start'); // start, playing, won
  const [score, setScore] = useState(0);
  const [foundItems, setFoundItems] = useState([]);
  const [playerTarget, setPlayerTarget] = useState({ x: 0, y: 0, z: 4 });
  const [lastFeedback, setLastFeedback] = useState(null);
  
  const controlsRef = useRef();

  const totalViolations = violations.filter(v => v.type === 'violation').length;
  const violationsFoundCount = foundItems.filter(id => {
    const item = violations.find(v => v.id === id);
    return item && item.type === 'violation';
  }).length;

  const handleStart = () => {
    setGameState('playing');
    setScore(0);
    setFoundItems([]);
  };

  const handleItemClick = (item) => {
    if (gameState !== 'playing') return;
    if (foundItems.includes(item.id)) return; // Already clicked

    setFoundItems(prev => [...prev, item.id]);

    if (item.type === 'violation') {
      // Correct find
      setScore(prev => prev + 100);
      setLastFeedback({ id: Date.now(), text: item.feedback, type: 'violation' });
      
      // Check win condition
      const newFoundCount = violationsFoundCount + 1;
      if (newFoundCount >= totalViolations) {
        setTimeout(() => setGameState('won'), 1500);
      }
    } else {
      // Clicked a safe item
      setScore(prev => Math.max(0, prev - 50));
      setLastFeedback({ id: Date.now(), text: item.feedback, type: 'safe' });
    }

    // Clear feedback after 3s
    setTimeout(() => setLastFeedback(null), 3000);
  };

  const handleFloorClick = (point) => {
    if (gameState === 'playing') {
      setPlayerTarget(point);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1e293b' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 8]} fov={50} />
        <color attach="background" args={['#1e293b']} />
        
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 5, 0]} intensity={0.8} />
        
        <OrbitControls 
            ref={controlsRef}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 - 0.1} // Prevent going under floor
            minDistance={2}
            maxDistance={10}
            mouseButtons={{
              LEFT: null, // Left click handles movement/interaction via raycaster
              MIDDLE: MOUSE.DOLLY,
              RIGHT: MOUSE.ROTATE
            }}
        />

        <AdminEnvironment 
          onItemClick={handleItemClick}
          onFloorClick={handleFloorClick}
          foundItems={foundItems}
        />
        
        <AdminPlayer 
          targetPosition={playerTarget}
          controlsRef={controlsRef}
        />

      </Canvas>

      <AdminUI 
        gameState={gameState}
        score={score}
        violationsFound={violationsFoundCount}
        totalViolations={totalViolations}
        lastFeedback={lastFeedback}
        onStart={handleStart}
        onExit={onExit}
      />
    </div>
  );
}
