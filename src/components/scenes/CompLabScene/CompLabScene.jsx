import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import { OrbitControls } from '@react-three/drei';
import { MOUSE } from 'three';
import CompLabEnvironment from './CompLabEnvironment';
import CompLabPlayer from './CompLabPlayer';
import CompLabUI from './CompLabUI';
import CompLabPlayerUI from './CompLabPlayerUI';
import { scenarios } from './scenarios';

export default function CompLabScene({ onExit }) {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [playerTarget, setPlayerTarget] = useState({ x: 0, y: 0, z: 3 });
  
  // Game State
  const [gameState, setGameState] = useState('start'); // start, playing, gameover, won
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [completedScenarios, setCompletedScenarios] = useState([]);
  
  const controlsRef = useRef();

  // Total number of scenarios to complete (derived from scenarios object)
  const TOTAL_SCENARIOS = Object.keys(scenarios).length;

  const handleStartGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setCompletedScenarios([]);
    setPlayerTarget({ x: 0, y: 0, z: 3 });
  };

  const handleRestartGame = () => {
    handleStartGame();
  };

  const handlePCClick = (scenarioId) => {
    // Only allow interaction if game is playing and scenario not yet completed
    if (gameState === 'playing' && !completedScenarios.includes(scenarioId)) {
      setCurrentScenario(scenarioId);
    }
  };

  const handleFloorClick = (point) => {
    if (gameState === 'playing') {
      setPlayerTarget(point);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 100);
      const newCompleted = [...completedScenarios, currentScenario];
      setCompletedScenarios(newCompleted);
      
      // Close modal after a short delay or immediately?
      // For now immediately to keep flow fast, UI can show feedback
      setCurrentScenario(null);

      if (newCompleted.length >= TOTAL_SCENARIOS) {
        setGameState('won');
      }
    } else {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('gameover');
          setCurrentScenario(null);
        }
        return newLives;
      });
      // If wrong but still alive, we just close the modal or let them retry?
      // "Firewall Defense" logic: lose health. 
      // For quiz: maybe close it and force them to walk back/click again?
      setCurrentScenario(null);
    }
  };

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0">
        <Canvas
          shadows
          camera={{ position: [0, 2, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#FFE0A4']} />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <pointLight position={[-10, 10, -10]} intensity={0.8} color="#F9BD4B" />

          <OrbitControls 
            ref={controlsRef}
            enablePan={false}
            rotateSpeed={0.4}
            mouseButtons={{
              LEFT: null,
              MIDDLE: MOUSE.DOLLY,
              RIGHT: MOUSE.ROTATE
            }}
          />

          <CompLabEnvironment 
            onPCClick={handlePCClick}
            onFloorClick={handleFloorClick}
          />
          <CompLabPlayer 
            targetPosition={playerTarget}
            controlsRef={controlsRef}
          />
        </Canvas>
      </div>

      <AnimatePresence>
        <CompLabUI
          gameState={gameState}
          score={score}
          lives={lives}
          currentScenario={currentScenario}
          onAnswer={handleAnswer}
          onStart={handleStartGame}
          onRestart={handleRestartGame}
          onExit={onExit}
          onCloseModal={() => setCurrentScenario(null)}
        />
      </AnimatePresence>

      {gameState === 'playing' && <CompLabPlayerUI />}
    </>
  );
}