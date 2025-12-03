import { useThree, useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function DormCamera({ active }) {
  const { camera } = useThree();

  // Camera positions
  const ernestoCamPos = new THREE.Vector3(0, 2, 4);
  const lockCamPos = new THREE.Vector3(-8.25, 2.25, 0.015);

  // Manual look targets
  const ernestoLookPos = new THREE.Vector3(0, 1, 0);       
  const lockLookPos = new THREE.Vector3(-8.25, 2.25, 0);   

  useEffect(() => {
    if (active === "lockdown") {
      camera.position.copy(lockCamPos);
      camera.lookAt(lockLookPos);
    } else {
      camera.position.copy(ernestoCamPos);
      camera.lookAt(ernestoLookPos);
    }
  }, [active, camera]);

  return null;
}
