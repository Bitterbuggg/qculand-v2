import { useEffect, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAnimationState } from "../../../hooks/useAnimationState";

const ASSET_BASE = import.meta.env.BASE_URL || '/';

const DormStudent = forwardRef(({ animation = "walking", position = [0, -0.35, 1], scale = 0.035 }, ref) => {
  const { scene, animations } = useGLTF(`${ASSET_BASE}models/qcu_student_1.glb`);

  // Lighten up the student model materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Add a slight emissive glow to brighten the character without altering scene lights
        child.material.emissive = new THREE.Color("#555555");
        child.material.emissiveIntensity = 0.4;
        // Ensure transparency is handled if needed, though usually not for characters
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  const { play, update, actions } = useAnimationState(animations, scene);

  // Attach actions to the scene so they can be accessed via ref
  useEffect(() => {
    if (scene) {
      scene.actions = actions;
    }
  }, [scene, actions]);

  useEffect(() => {
    if (animation) play(animation);
  }, [animation, scene]);

  useFrame((_, delta) => update(delta));

  return (
    <primitive ref={ref} object={scene} position={position} scale={[scale, scale, scale]} />
  );
});

useGLTF.preload(`${ASSET_BASE}models/qcu_student_1.glb`);

export default DormStudent;