import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ASSET_BASE = import.meta.env.BASE_URL || '/';

export default function RoomPlayer({ targetPosition, controlsRef }) {
  const group = useRef();
  const { scene, animations } = useGLTF(`${ASSET_BASE}models/qcu_student_1.glb`);
  const { actions, names } = useAnimations(animations, group);
  const [currentAction, setCurrentAction] = useState('Idle');

  useEffect(() => {
    // Set initial player position
    if (group.current) {
      group.current.position.set(0, 0, 0); 
    }
  }, []);

  useEffect(() => {
    const action = actions[currentAction];
    if (action) {
      action.reset().fadeIn(0.2).play();
      return () => action.fadeOut(0.2);
    }
  }, [currentAction, actions]);

  useFrame((state, delta) => {
    if (!group.current) return;

    const playerPos = group.current.position;
    const startPos = playerPos.clone();

    // Handle Movement
    if (targetPosition) {
      const target = new THREE.Vector3(targetPosition.x, 0, targetPosition.z);
      const distance = playerPos.distanceTo(target);
      const stopThreshold = 0.1;

      if (distance > stopThreshold) {
        const speed = 3;
        const direction = target.clone().sub(playerPos).normalize();
        
        const moveStep = speed * delta;
        if (moveStep < distance) {
          playerPos.add(direction.multiplyScalar(moveStep));
        } else {
          playerPos.copy(target);
        }

        const lookTarget = new THREE.Vector3(target.x, playerPos.y, target.z);
        group.current.lookAt(lookTarget);

        if (currentAction !== 'walking') {
          const moveAnim = names.find(n => /walk/i.test(n)) || names.find(n => /run/i.test(n)) || names[0];
          setCurrentAction(moveAnim); 
        }
      } else {
        if (currentAction !== 'Idle') {
           setCurrentAction('Idle');
        }
      }
    }

    // Update Orbital Camera
    if (controlsRef && controlsRef.current) {
      const displacement = playerPos.clone().sub(startPos);
      state.camera.position.add(displacement);
      controlsRef.current.target.copy(playerPos);
      controlsRef.current.update();
    }
  });

  return <primitive ref={group} object={scene} scale={0.015} />;
}

useGLTF.preload(`${ASSET_BASE}models/qcu_student_1.glb`);