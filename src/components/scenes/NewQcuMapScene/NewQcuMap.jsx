import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function NewQcuMap(props) {
  const { scene } = useGLTF('./models/new_qcu_map.glb');
  return <primitive object={scene} {...props} />;
}
