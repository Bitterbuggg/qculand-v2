import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAnimationState } from "../../../hooks/useAnimationState";

const ASSET_BASE = import.meta.env.BASE_URL || '/';

export default function DormStudent({ animation = "walking", position = [0, -0.35, 1], scale = 0.035 }) {
  const group = useRef();
  const { scene, animations } = useGLTF(`${ASSET_BASE}models/qcu_student_1.glb`);

  const { play, update } = useAnimationState(animations, scene);

  useEffect(() => {
    if (animation) play(animation);
  }, [animation, scene]);

  useFrame((_, delta) => update(delta));

  return (
    <primitive ref={group} object={scene} position={position} scale={[scale, scale, scale]} />
  );
}

useGLTF.preload(`${ASSET_BASE}models/qcu_student_1.glb`);
