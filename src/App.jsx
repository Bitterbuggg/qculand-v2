import React from 'react';
import CampusMap from './components/scenes/CampusMap';
import './styles/index.css';

export default function App() {
  return (
    <div className="w-full h-screen relative bg-black">
      <CampusMap />
    </div>
  );
}