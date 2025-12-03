import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAnimationState } from "../../../hooks/useAnimationState";

const ASSET_BASE = import.meta.env.BASE_URL || '/';

const BossMinibot = forwardRef(({ state = "Idle.1", visible = true, position = [-8.25, -0.85, -4.15], scale = 0.5 }, ref) => {
  const group = useRef();
  const { scene, animations } = useGLTF(`${ASSET_BASE}models/qcu_ransomware.glb`);

  const { play, update, actions } = useAnimationState(animations, scene);

  // Expose the group and actions to the parent ref
  useImperativeHandle(ref, () => {
    const obj = group.current || {};
    obj.actions = actions;
    return obj;
  });

  // Also attach actions directly to the group if accessible, to be safe
  useEffect(() => {
    if (group.current) {
      group.current.actions = actions;
    }
  }, [actions]);

  useEffect(() => {
    if (state) play(state);
  }, [state]);

  useFrame((_, delta) => update(delta));

  return (
    <group ref={group} visible={visible} position={position} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </group>
  );
});

useGLTF.preload(`${ASSET_BASE}models/qcu_ransomware.glb`);

export default BossMinibot;