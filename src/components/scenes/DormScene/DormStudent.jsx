import { useEffect, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAnimationState } from "../../../hooks/useAnimationState";

const ASSET_BASE = import.meta.env.BASE_URL || '/';

const DormStudent = forwardRef(({ animation = "walking", position = [0, -0.35, 1], scale = 0.035 }, ref) => {
  const { scene, animations } = useGLTF(`${ASSET_BASE}models/qcu_student_1.glb`);

  const { play, update } = useAnimationState(animations, scene);

  useEffect(() => {
    if (animation) play(animation);
  }, [animation]);

  useFrame((_, delta) => update(delta));

  return (
    <primitive ref={ref} object={scene} position={position} scale={[scale, scale, scale]} />
  );
});

useGLTF.preload(`${ASSET_BASE}models/qcu_student_1.glb`);

export default DormStudent;