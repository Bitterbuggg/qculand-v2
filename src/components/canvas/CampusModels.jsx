import React from 'react';
import { useGLTF } from '@react-three/drei';
import InteractiveBuilding from './InteractiveBuilding';

const ASSET_BASE = import.meta.env.BASE_URL || '/';

export default function CampusModels({ onBuildingClick, onFloorClick, onBuildingHover, onBuildingHoverOut }) {
  // Load the base map (non-interactive terrain/paths)
  const baseMap = useGLTF(`${ASSET_BASE}models/qcu_base.glb`);

  const handleBaseMapClick = (e) => {
    e.stopPropagation();
    const clickedObject = e.object.name;
    
    // Check for specific interactable objects inside the base map
    if (clickedObject.includes('Bleachers')) {
      // You can replace this with a proper modal or callback later
      return;
    }
    
    if (clickedObject.includes('Triangle')) {
       // Treat Triangle as a building for the UI modal
       if (onBuildingClick) onBuildingClick('triangle-complex');
       return;
    }

    if (onFloorClick) {
      onFloorClick(e.point);
    }
  };

  const handleBaseMapHover = (e) => {
    const hoveredObject = e.object.name;
    if (hoveredObject.includes('Bleachers') || hoveredObject.includes('Triangle')) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  };

  const handleBaseMapHoverOut = () => {
    document.body.style.cursor = 'default';
  };

  return (
    <>
      {/* Base Map - Static environment */}
      <primitive 
        object={baseMap.scene} 
        position={[0, 0, 0]} 
        onClick={handleBaseMapClick}
        onPointerOver={handleBaseMapHover}
        onPointerOut={handleBaseMapHoverOut}
      />
      
      {/* Interactive Buildings - Accurate positions from original map */}
      
      {/* TechVoc = qcu_bldg6.glb (adjusted position to avoid overlap) */}
      <InteractiveBuilding
        modelPath={`${ASSET_BASE}models/qcu_bldg6.glb`}
        buildingId="techvoc"
        position={[0.0, 0.02, 2.2]}
        rotation={[0, 0, 0]}
        scale={1}
        onClick={() => onBuildingClick("techvoc")}
        onHover={() => onBuildingHover("techvoc")}
        onHoverOut={() => onBuildingHoverOut()}
      />
      
      {/* Yellow_Bldg = qcu_bldg5.glb (has built-in rotation [PI, 0, PI], need to counter-rotate) */}
      <InteractiveBuilding
        modelPath={`${ASSET_BASE}models/qcu_bldg5.glb`}
        buildingId="yellow-building"
        position={[1, 0.02, -2]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
        onClick={() => onBuildingClick("yellow-building")}
        onHover={() => onBuildingHover("yellow-building")}
        onHoverOut={() => onBuildingHoverOut()}
      />
      
      {/* Admin_bldg = qcu_bldg4.glb */}
      <InteractiveBuilding
        modelPath={`${ASSET_BASE}models/qcu_bldg4.glb`}
        buildingId="admin-building"
        position={[-1.259, 0.02, -4.72]}
        rotation={[0, 0, 0]}
        scale={1}
        onClick={() => onBuildingClick("admin-building")}
        onHover={() => onBuildingHover("admin-building")}
        onHoverOut={() => onBuildingHoverOut()}
      />
      
      {/* Bautista = qcu_bldg2.glb (has built-in rotation [0, 1.571, 0] and scale [0.9,1,1], need to counter-rotate) */}
      <InteractiveBuilding
        modelPath={`${ASSET_BASE}models/qcu_bldg2.glb`}
        buildingId="bautista"
        position={[-1.2, 0.02, -7.5]}
        rotation={[0, -1.571, 0]}
        scale={1}
        onClick={() => onBuildingClick("bautista")}
        onHover={() => onBuildingHover("bautista")}
        onHoverOut={() => onBuildingHoverOut()}
      />
      
      {/* Cube009 group (computer lab) = qcu_bldg1.glb */}
      <InteractiveBuilding
        modelPath={`${ASSET_BASE}models/qcu_bldg1.glb`}
        buildingId="computer-lab"
        position={[3, 0.02, -4.6]}
        rotation={[0, -1.571, 0]}
        scale={0.518}
        onClick={() => onBuildingClick("computer-lab")}
        onHover={() => onBuildingHover("computer-lab")}
        onHoverOut={() => onBuildingHoverOut()}
      />
      
      {/* Cube010 group = qcu_bldg3.glb */}
      <InteractiveBuilding
        modelPath={`${ASSET_BASE}models/qcu_bldg3.glb`}
        buildingId="cube010-building"
        position={[3, 0.02, -7.3]}
        rotation={[0, -1.571, 0]}
        scale={0.602}
        onClick={() => onBuildingClick("cube010-building")}
        onHover={() => onBuildingHover("cube010-building")}
        onHoverOut={() => onBuildingHoverOut()}
      />
    </>
  );
}

// Preload all models (respect Vite base path)
useGLTF.preload(`${ASSET_BASE}models/qcu_base.glb`);
useGLTF.preload(`${ASSET_BASE}models/qcu_bldg1.glb`);
useGLTF.preload(`${ASSET_BASE}models/qcu_bldg2.glb`);
useGLTF.preload(`${ASSET_BASE}models/qcu_bldg3.glb`);
useGLTF.preload(`${ASSET_BASE}models/qcu_bldg4.glb`);
useGLTF.preload(`${ASSET_BASE}models/qcu_bldg5.glb`);
useGLTF.preload(`${ASSET_BASE}models/qcu_bldg6.glb`);