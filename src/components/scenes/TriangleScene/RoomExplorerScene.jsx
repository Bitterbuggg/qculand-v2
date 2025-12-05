import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { MOUSE } from 'three';
import RoomEnvironment from './RoomEnvironment';
import RoomPlayer from './RoomPlayer';

export default function RoomExplorerScene({ roomConfig, onExit }) {
  const [playerTarget, setPlayerTarget] = useState({ x: 0, y: 0, z: 0 });
  const controlsRef = useRef();

  const handleFloorClick = (point) => {
    setPlayerTarget(point);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1e293b' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
        <color attach="background" args={['#000000']} />
        
        <OrbitControls 
            ref={controlsRef}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minDistance={2}
            maxDistance={15}
            mouseButtons={{
              LEFT: null,
              MIDDLE: MOUSE.DOLLY,
              RIGHT: MOUSE.ROTATE
            }}
        />

        <RoomEnvironment 
          modelPath={roomConfig.modelPath}
          scale={roomConfig.scale}
          offset={roomConfig.offset}
          onFloorClick={handleFloorClick}
        />
        
        <RoomPlayer 
          targetPosition={playerTarget}
          controlsRef={controlsRef}
        />

      </Canvas>

      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        pointerEvents: 'none'
      }}>
         <div style={{
           backgroundColor: 'rgba(255, 255, 255, 0.9)',
           color: 'black',
           padding: '1rem',
           borderRadius: '0.5rem',
           boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
         }}>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{roomConfig.name}</h2>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#4b5563' }}>{roomConfig.description}</p>
         </div>
      </div>

      <button 
        onClick={onExit}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '0.875rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 10,
        }}
      >
        Exit Room
      </button>
    </div>
  );
}
