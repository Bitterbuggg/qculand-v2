import React from 'react';

export default function PasswordFallUI({ gameState, score, lives, onStart, onExit, onRestart }) {
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
          border: '4px solid #3b82f6',
        }}>
          <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
          <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' }}>Password Security</h1>
          
          <div style={{ marginBottom: '1.5rem', fontSize: '0.95rem', color: '#334155', lineHeight: '1.5' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Why Strong Passwords Matter?</strong>
            </p>
            <p>
              Passwords are the keys to your digital life. A strong password acts as a tough lock against hackers. Weak passwords (like "123456" or "password") are easily guessed, leading to data theft and unauthorized access.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem' }}>How to Play:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', margin: 0, color: '#475569', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>
                Passwords will fall from the top of the screen.
              </li>
              <li>
                <strong>CLICK</strong> to catch <span style={{ color: '#16a34a', fontWeight: 'bold' }}>STRONG Passwords</span> (Complex, mixed characters).
              </li>
              <li>
                <strong>LET FALL</strong> the <span style={{ color: '#ef4444', fontWeight: 'bold' }}>WEAK Passwords</span> (Simple, common words).
              </li>
              <li>
                Catching weak passwords or missing strong ones will cost you lives!
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
                backgroundColor: '#3b82f6',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              Start Security Check
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
          <h1 style={{...styles.title, color: '#ef4444'}}>Security Breach!</h1>
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
          <h1 style={{...styles.title, color: '#10b981'}}>System Secure!</h1>
          <p style={styles.text}>Great job filtering the passwords.</p>
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
    color: '#60a5fa',
  },
  text: {
    marginBottom: '1.5rem',
    color: '#d1d5db',
    lineHeight: '1.5',
  },
  instruction: {
    color: '#fbbf24',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
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
    pointerEvents: 'none', // Let clicks pass through to canvas
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
  },
  exitButton: {
    pointerEvents: 'auto',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  },
};
