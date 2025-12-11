import React from 'react';
import { motion as Motion } from 'framer-motion';

export default function AdminUI({ 
  gameState, 
  score, 
  violationsFound, 
  totalViolations,
  lastFeedback,
  onStart, 
  onExit 
}) {
  
  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    maxWidth: '28rem',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '4px solid #3b82f6',
  };

  return (
    <>
      {/* HUD */}
      {gameState === 'playing' && (
        <>
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            pointerEvents: 'none'
          }}>
             <div style={{
               backgroundColor: 'rgba(30, 41, 59, 0.9)',
               color: 'white',
               padding: '1rem',
               borderRadius: '0.5rem',
               display: 'flex',
               flexDirection: 'column',
               gap: '0.5rem'
             }}>
                <div style={{ fontWeight: 'bold' }}>Clean Desk Audit</div>
                <div>Violations Found: <span style={{ color: '#4ade80' }}>{violationsFound}</span> / {totalViolations}</div>
                <div>Score: {score}</div>
             </div>
          </div>
          
          <button 
            onClick={onExit}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
            }}
          >
            Exit Building
          </button>
        </>
      )}

      {/* Feedback Toast */}
      {lastFeedback && (
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          key={lastFeedback.id} // Force re-render on new feedback
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: lastFeedback.type === 'violation' ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '2rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          {lastFeedback.text}
        </Motion.div>
      )}

       {/* Start Screen */}
       {gameState === 'start' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(4px)',
          zIndex: 50,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            maxWidth: '36rem',
            textAlign: 'left',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '4px solid #10b981',
          }}>
            <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '0.5rem' }}>📋</div>
            <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' }}>Clean Desk Policy</h1>
            
            <div style={{ marginBottom: '1.5rem', fontSize: '0.95rem', color: '#334155', lineHeight: '1.5' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Why Keep It Clean?</strong>
              </p>
              <p>
                Physical security is as important as digital security. Leaving passwords on sticky notes, confidential files open, or PCs unlocked gives bad actors easy access to sensitive data. A Clean Desk Policy minimizes this risk.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
              <p style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem' }}>How to Play:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', margin: 0, color: '#475569', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>
                  Explore the office environment.
                </li>
                <li>
                  <strong>CLICK</strong> on <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Security Violations</span> (e.g., Sticky Notes with passwords, Unlocked Screens, Open Confidential Files).
                </li>
                <li>
                  <strong>AVOID</strong> clicking on safe personal items (Photos, Mugs, Staplers).
                </li>
                <li>
                  Find all violations to secure the room!
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button 
                onClick={onExit}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: '#64748b',
                  color: 'white',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#475569'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#64748b'}
              >
                Exit
              </button>
              <button 
                onClick={onStart}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: '#10b981',
                  color: 'white',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
              >
                Start Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Win Screen */}
      {gameState === 'won' && (
        <div style={{
          ...overlayStyle,
          backgroundColor: 'rgba(20, 83, 45, 0.9)',
        }}>
          <div style={{...cardStyle, borderColor: '#22c55e'}}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>
              Audit Complete!
            </h1>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
              You found all violations! The office is now secure.
              <br/>
              Final Score: {score}
            </p>
            <button onClick={onExit} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border:'none', cursor:'pointer', backgroundColor: '#16a34a', color: 'white', fontWeight: 'bold' }}>
              Return to Campus
            </button>
          </div>
        </div>
      )}
    </>
  );
}
