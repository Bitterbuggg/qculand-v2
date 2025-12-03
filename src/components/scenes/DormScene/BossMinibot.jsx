import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAnimationState } from "../../../hooks/useAnimationState";

const ASSET_BASE = import.meta.env.BASE_URL || '/';

export default function BossMinibot({ state = "Idle.1", visible = true, position = [-8.25, -0.85, -4.15], scale = 0.5 }) {
  const group = useRef();
  const { scene, animations } = useGLTF(`${ASSET_BASE}models/qcu_ransomware.glb`);

  const { play, update } = useAnimationState(animations, scene);

  useEffect(() => {
    if (state) play(state);
  }, [state]);

  useFrame((_, delta) => update(delta));

  return (
    <group ref={group} visible={visible} position={position} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(`${ASSET_BASE}models/qcu_ransomware.glb`);
