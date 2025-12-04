import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MOUSE } from 'three';
import BautistaEnvironment from './BautistaEnvironment';
import BautistaPlayer from './BautistaPlayer';

const BautistaScene = ({ onBack }) => {
  const [playerTarget, setPlayerTarget] = useState({ x: 0, y: 0, z: 0 });
  const controlsRef = useRef();

  const handleFloorClick = (point) => {
    setPlayerTarget(point);
  };

  return (
    <div className="w-full h-full relative bg-gray-900">
       {/* UI Overlay */}
       <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={onBack}
          className="btn btn-primary text-white"
        >
          Back to Campus
        </button>
      </div>

      <Canvas
        camera={{ position: [0, 3, 6], fov: 50 }} // Slightly higher and further back for 3rd person view
        shadows
      >
        <color attach="background" args={["#1a1a1a"]} />
        <ambientLight intensity={0.7} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1} 
          castShadow 
        />
        
        <Suspense fallback={null}>
          <BautistaEnvironment onFloorClick={handleFloorClick} />
          <BautistaPlayer 
            targetPosition={playerTarget}
            controlsRef={controlsRef}
          />
        </Suspense>

        <OrbitControls 
          ref={controlsRef}
          makeDefault 
          enablePan={false}
          rotateSpeed={0.4}
          mouseButtons={{
            LEFT: null, // Disable left click for orbit (reserved for movement)
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.ROTATE
          }}
          target={[0, 1, 0]}
        />
      </Canvas>
    </div>
  );
};

export default BautistaScene;
