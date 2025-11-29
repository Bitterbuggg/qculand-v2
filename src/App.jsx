import React, { useState } from 'react';
import CampusMap from './components/scenes/CampusMap/CampusMap'; // Adjusted import path if necessary, assuming index.js exports it or direct import
import TechVocScene from './components/scenes/TechVoc/TechVocScene';
import './styles/index.css';

export default function App() {
  const [currentScene, setCurrentScene] = useState('campus');

  const handleEnterBuilding = (buildingId) => {
    if (buildingId === 'techvoc') {
      setCurrentScene('techvoc');
    } else {
      console.log(`Entered ${buildingId} (No specific scene yet)`);
      // Optional: Add a notification or generic interior here
    }
  };

  return (
    <div className="w-full h-screen relative bg-black">
      {currentScene === 'campus' && (
        <CampusMap onEnterBuilding={handleEnterBuilding} />
      )}
      
      {currentScene === 'techvoc' && (
        <TechVocScene onExit={() => setCurrentScene('campus')} />
      )}
    </div>
  );
}