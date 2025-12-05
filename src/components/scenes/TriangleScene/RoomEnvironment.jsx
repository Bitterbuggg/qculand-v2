import React from 'react';
import { useGLTF } from '@react-three/drei';

const ASSET_BASE = import.meta.env.BASE_URL || '/';

export default function RoomEnvironment({ modelPath, scale = 1, offset = [0,0,0], onFloorClick }) {
  const { scene } = useGLTF(`${ASSET_BASE}${modelPath}`);

  return (
    <group>
      {/* The Room Model */}
      <primitive 
        object={scene} 
        scale={scale} 
        position={offset} 
      />

      {/* Invisible Floor Plane for movement clicking */}
      {/* We place this slightly above 0 if z-fighting, but usually 0 is fine if model floor is at 0 */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        visible={false}
        onClick={(e) => {
          e.stopPropagation();
          if (onFloorClick) onFloorClick(e.point);
        }}
      >
        <planeGeometry args={[25, 25]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Lights - Generic lighting for any room */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 5, 0]} intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </group>
  );
}
