import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion as Motion, AnimatePresence } from "framer-motion";

import CampusModels from "../../canvas/CampusModels";
import BuildingModal from "../../ui/BuildingModal";
import { buildingConfigs } from "../../../data/buildings";

export default function CampusMap() {
  const [campusEntered, setCampusEntered] = useState(false);
  const [showBuildingModal, setShowBuildingModal] = useState(null);

  const handleBuildingClick = (buildingId) => {
    setShowBuildingModal(buildingId);
  };

  const handleEnterBuilding = (buildingId) => {
    setShowBuildingModal(null);
    console.log(`Entering building: ${buildingId}`);
    // Add navigation logic here when scenes are ready
  };

  const handleEnterCampus = () => {
    setCampusEntered(true);
  };

  const handleCloseModal = () => {
    setShowBuildingModal(null);
  };

  return (
    <div className="w-full h-full fixed top-0 left-0">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 55 }}>
        <color attach="background" args={["#a8d0ff"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        <CampusModels 
          onBuildingClick={handleBuildingClick} 
          campusEntered={campusEntered} 
        />
        
        <OrbitControls 
          enableZoom={true} 
          enableRotate={true} 
          enablePan={true}
        />
      </Canvas>

      {/* Enter Campus Button */}
      {!campusEntered && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <Motion.button
            onClick={handleEnterCampus}
            className="px-8 py-4 bg-blue-500 text-white font-bold text-xl rounded-full hover:bg-blue-600 transition shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter Campus
          </Motion.button>
        </div>
      )}

      {/* Building Entry Modal */}
      <AnimatePresence>
        {showBuildingModal && buildingConfigs[showBuildingModal] && (
          <BuildingModal 
            config={buildingConfigs[showBuildingModal]}
            onClose={handleCloseModal}
            onEnter={() => handleEnterBuilding(showBuildingModal)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
