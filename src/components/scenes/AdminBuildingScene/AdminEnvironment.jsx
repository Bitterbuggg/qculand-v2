import React, { useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { violations } from './violations';

export default function AdminEnvironment({ onItemClick, onFloorClick, foundItems }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemHover = (id) => {
    setHoveredItem(id);
    document.body.style.cursor = 'pointer';
  };

  const handleItemHoverOut = () => {
    setHoveredItem(null);
    document.body.style.cursor = 'default';
  };

  // Visual components for different item types
  const renderItemVisual = (item) => {
    const isFound = foundItems.includes(item.id);
    // If it's a violation and found, maybe hide it or show checkmark?
    // Let's just dim it or put a marker.

    return (
      <group position={item.position}>
        {/* Interaction Hitbox */}
        <mesh
          visible={false} // Invisible hit box
          onClick={(e) => {
            e.stopPropagation();
            onItemClick(item);
          }}
          onPointerOver={() => handleItemHover(item.id)}
          onPointerOut={handleItemHoverOut}
        >
          <boxGeometry args={[0.4, 0.4, 0.4]} />
        </mesh>

        {/* Visuals */}
        {item.visualType === 'sticky-note' && (
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.15, 0.15, 0.01]} />
            <meshStandardMaterial color="#fef3c7" /> {/* Yellow Note */}
            {isFound && <meshStandardMaterial color="#10b981" />}
          </mesh>
        )}
        
        {item.visualType === 'screen-unlocked' && (
           <mesh position={[0, 0, 0.05]}>
             <planeGeometry args={[0.3, 0.2]} />
             <meshBasicMaterial color={isFound ? "#000" : "#60a5fa"} />
           </mesh>
        )}

        {item.visualType === 'card' && (
          <mesh rotation={[-Math.PI/2, 0, 0.5]}>
            <boxGeometry args={[0.15, 0.1, 0.005]} />
            <meshStandardMaterial color="#1d4ed8" />
          </mesh>
        )}

        {item.visualType === 'folder' && (
          <mesh rotation={[-Math.PI/2, 0, -0.2]}>
            <boxGeometry args={[0.25, 0.35, 0.02]} />
            <meshStandardMaterial color="#ef4444" /> {/* Red Confidential Folder */}
          </mesh>
        )}

        {item.visualType === 'photo-frame' && (
          <mesh rotation={[0, -0.5, 0]}>
            <boxGeometry args={[0.15, 0.2, 0.02]} />
            <meshStandardMaterial color="#9ca3af" />
          </mesh>
        )}

         {item.visualType === 'mug' && (
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.12]} />
            <meshStandardMaterial color="white" />
          </mesh>
        )}

        {item.visualType === 'stapler' && (
          <mesh>
            <boxGeometry args={[0.15, 0.05, 0.05]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
        )}

        {/* Highlight Effect */}
        {hoveredItem === item.id && !isFound && (
          <>
            <mesh position={[0, 0.2, 0]}>
               <sphereGeometry args={[0.05]} />
               <meshBasicMaterial color="yellow" />
            </mesh>
            <Text
              position={[0, 0.4, 0]} // Position above the item
              fontSize={0.15}
              color="#fbbf24" // Yellow/Orange color for nametag
              anchorX="center"
              anchorY="middle"
              material-depthTest={false} // Always render on top
            >
              {item.name}
            </Text>
          </>
        )}
        
        {isFound && (
           <Text position={[0, 0.3, 0]} fontSize={0.15} color={item.type === 'violation' ? "#10b981" : "#ef4444"}>
             {item.type === 'violation' ? "CLEARED" : "OOPS"}
           </Text>
        )}
      </group>
    );
  };

  return (
    <group>
      {/* Floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          if (onFloorClick) onFloorClick(e.point);
        }}
      >
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#334155" /> {/* Slate floor */}
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -5]}>
        <boxGeometry args={[15, 4, 0.2]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
       <mesh position={[-7.5, 2, 0]} rotation={[0, Math.PI/2, 0]}>
        <boxGeometry args={[15, 4, 0.2]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      <mesh position={[7.5, 2, 0]} rotation={[0, Math.PI/2, 0]}>
        <boxGeometry args={[15, 4, 0.2]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      {/* Desks */}
      {[-2, 0, 2].map((x, i) => (
        <group key={i} position={[x, 0, -2]}>
          {/* Desk Body */}
          <mesh position={[0, 0.4, 0]} castShadow>
             <boxGeometry args={[1.5, 0.8, 0.8]} />
             <meshStandardMaterial color="#94a3b8" />
          </mesh>
          {/* Monitor Stand */}
           <mesh position={[0, 0.8, -0.2]}>
             <boxGeometry args={[0.1, 0.2, 0.1]} />
             <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Monitor Screen */}
          <mesh position={[0, 1.1, -0.2]}>
             <boxGeometry args={[1.0, 0.6, 0.05]} />
             <meshStandardMaterial color="#000000" />
          </mesh>
        </group>
      ))}

      {/* Printer / Shelf */}
      <group position={[5, 0, -4]}>
         <mesh position={[0, 1, 0]}>
           <boxGeometry args={[2, 2, 1]} />
           <meshStandardMaterial color="#475569" />
         </mesh>
      </group>

      {/* Items */}
      {violations.map(item => renderItemVisual(item))}
      
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 4, 0]} intensity={0.8} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} castShadow />

    </group>
  );
}
