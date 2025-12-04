import React from 'react';
import { useGLTF } from '@react-three/drei';

const ASSET_BASE = import.meta.env.BASE_URL || '/';

export default function BautistaEnvironment({ onFloorClick }) {
  // Load the canteen model
  const { scene } = useGLTF(`${ASSET_BASE}models/canteenroom.glb`);

  return (
    <group>
      {/* The Visual Environment */}
      <primitive object={scene} scale={1} position={[0, 0, 0]} />

      {/* Invisible Navigation Floor Plane */}
      {/* Adjust size (args) as needed to cover the walkable area */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0.01, 0]} 
        visible={false} // Invisible but clickable
        onClick={(e) => {
          e.stopPropagation();
          if (onFloorClick) {
            onFloorClick(e.point);
          }
        }}
      >
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="red" wireframe />
      </mesh>
    </group>
  );
}
