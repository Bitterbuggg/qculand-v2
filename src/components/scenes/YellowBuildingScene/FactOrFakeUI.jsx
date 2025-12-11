import React from 'react';

export default function FactOrFakeUI({ gameState, score, lives, onStart, onExit, onRestart }) {
  if (gameState === 'start') {
    return (
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
          border: '4px solid #fbbf24',
        }}>
          <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '0.5rem' }}>🕵️</div>
          <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' }}>Social Engineering</h1>
          
          <div style={{ marginBottom: '1.5rem', fontSize: '0.95rem', color: '#334155', lineHeight: '1.5' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>What is Phishing?</strong>
            </p>
            <p>
              Social engineering attacks, like Phishing, trick you into revealing sensitive info. They often masquerade as trustworthy entities, creating a sense of urgency or offering "too good to be true" rewards. Always verify the source!
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem' }}>How to Play:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', margin: 0, color: '#475569', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>
                You are running through a digital corridor. Gates with statements will appear.
              </li>
              <li>
                <strong>Run LEFT</strong> for <span style={{ color: '#16a34a', fontWeight: 'bold' }}>REAL / FACT</span> (True statements, safe links).
              </li>
              <li>
                <strong>Run RIGHT</strong> for <span style={{ color: '#ef4444', fontWeight: 'bold' }}>FAKE / SCAM</span> (False claims, phishing attempts).
              </li>
              <li>
                Use <strong>Arrow Keys</strong> or <strong>A / D</strong> to switch lanes.
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
                backgroundColor: '#fbbf24',
                color: 'black',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fbbf24'}
            >
              Start Running
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'gameover') {
    return (
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={{...styles.title, color: '#ef4444'}}>Game Over!</h1>
          <p style={styles.text}>You fell for too many scams.</p>
          <p style={styles.text}>Final Score: {score}</p>
          <button onClick={onRestart} style={styles.button}>Try Again</button>
          <button onClick={onExit} style={{...styles.button, backgroundColor: '#6b7280', marginTop: '10px'}}>Leave</button>
        </div>
      </div>
    );
  }

  if (gameState === 'win') {
    return (
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={{...styles.title, color: '#10b981'}}>Master Detective!</h1>
          <p style={styles.text}>You can spot a fake from a mile away.</p>
          <p style={styles.text}>Score: {score}</p>
          <button onClick={onExit} style={styles.button}>Continue</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.hud}>
      <div style={styles.scoreBox}>Score: {score}</div>
      <div style={styles.livesBox}>Lives: {'❤️'.repeat(lives)}</div>
      <button onClick={onExit} style={styles.exitButton}>Exit</button>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10,
  },
  card: {
    backgroundColor: '#1f2937',
    padding: '2rem',
    borderRadius: '1rem',
    textAlign: 'center',
    color: 'white',
    maxWidth: '400px',
    border: '1px solid #374151',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#fbbf24',
  },
  text: {
    marginBottom: '1.5rem',
    color: '#d1d5db',
    lineHeight: '1.5',
  },
  instruction: {
    color: '#3b82f6',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#fbbf24',
    color: 'black',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    width: '100%',
  },
  hud: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    pointerEvents: 'none',
    boxSizing: 'border-box',
  },
  scoreBox: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  livesBox: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    marginRight: 'auto',
    marginLeft: '1rem',
  },
  exitButton: {
    pointerEvents: 'auto',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  },
};
