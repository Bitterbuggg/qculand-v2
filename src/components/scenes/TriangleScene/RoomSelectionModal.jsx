import React from 'react';
import { motion as Motion } from 'framer-motion';
import { roomConfigs } from '../../../data/rooms';

export default function RoomSelectionModal({ onClose, onSelectRoom }) {
  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '1.5rem',
    padding: '2rem',
    maxWidth: '600px',
    width: '90%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <Motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        style={cardStyle}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
            🔺 QCU Triangle Hub
          </h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6b7280' }}
          >
            ✕
          </button>
        </div>
        
        <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
          Explore the key facilities connected to the main plaza.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {Object.values(roomConfigs).map(room => (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '1rem',
                backgroundColor: '#f3f4f6',
                border: '2px solid transparent',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dbeafe';
                e.currentTarget.style.borderColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
                {room.name}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {room.description}
              </div>
            </button>
          ))}
        </div>
      </Motion.div>
    </div>
  );
}
