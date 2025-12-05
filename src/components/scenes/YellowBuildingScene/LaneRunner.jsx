import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

const ASSET_BASE = import.meta.env.BASE_URL || '/';

export default function LaneRunner({ lane, setLane }) {
  const group = useRef();
  const { scene, animations } = useGLTF(`${ASSET_BASE}models/qcu_student_1.glb`);
  const { actions } = useAnimations(animations, group);
  
  // Target X position based on lane (-1 for Left, 1 for Right)
  // Lane 0 = Left (Real), Lane 1 = Right (Fake)
  // Let's map: 0 -> -2, 1 -> 2
  const targetX = lane === 0 ? -2 : 2;

  useEffect(() => {
    // Try 'walking', then case-insensitive 'walk', then first available
    const actionName = Object.keys(actions).find(name => name.toLowerCase().includes('walking')) || Object.keys(actions)[0];
    const action = actions[actionName];
    
    if (action) {
      action.reset().fadeIn(0.5).play();
    }
    return () => action?.fadeOut(0.5);
  }, [actions]);

  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Smooth lerp to target lane
    group.current.position.x += (targetX - group.current.position.x) * 10 * delta;
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft') setLane(0);
      if (e.code === 'ArrowRight') setLane(1);
      if (e.code === 'KeyA') setLane(0);
      if (e.code === 'KeyD') setLane(1);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setLane]);

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <primitive 
        object={scene} 
        rotation={[0, Math.PI, 0]} 
        scale={0.06} 
      />
    </group>
  );
}

useGLTF.preload(`${ASSET_BASE}models/qcu_student_1.glb`);
