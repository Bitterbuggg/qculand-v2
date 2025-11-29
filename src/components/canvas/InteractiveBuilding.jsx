import React, { useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export default function InteractiveBuilding({ 
  modelPath, 
  position, 
  rotation = [0, 0, 0],
  scale = 1,
  onClick,
  onHover,
  onHoverOut
}) {
  const { scene } = useGLTF(modelPath);

  // Clone the scene for this specific instance and its materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        if (Array.isArray(child.material)) {
          child.material = child.material.map(mat => mat.clone());
        } else if (child.material) {
          child.material = child.material.clone();
        }
        // Store original emissive for this instance
        if (child.material.emissive) {
          child.userData.originalEmissive = child.material.emissive.clone();
        }
      }
    });
    return clone;
  }, [scene]);

  // Clean up cloned materials on unmount
  useEffect(() => {
    return () => {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else if (child.material) {
            child.material.dispose();
          }
        }
      });
    };
  }, [clonedScene]);

  // Ensure cursor resets if component unmounts while hovered.
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (onHover) onHover();

    clonedScene.traverse((child) => {
      if (child.isMesh && child.material.emissive) {
        child.material.emissive.setHex(0x4488ff);
      }
    });
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'default';
    if (onHoverOut) onHoverOut();

    clonedScene.traverse((child) => {
      if (child.isMesh && child.userData.originalEmissive) {
        child.material.emissive.copy(child.userData.originalEmissive);
      }
    });
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

// Intentionally no exports other than default component to keep fast-refresh working
