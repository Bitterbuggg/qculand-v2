import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { scenarios } from './scenarios';

export default function CompLabUI({ 
  gameState,
  score,
  lives,
  currentScenario, 
  onAnswer,
  onStart,
  onRestart,
  onExit,
  onCloseModal
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const scenario = currentScenario ? scenarios[currentScenario] : null;

  // Reset local state when scenario changes or closes
  React.useEffect(() => {
    if (!currentScenario) {
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  }, [currentScenario]);

  const handleAnswerSelect = (answerId) => {
    if (showResult) return; 
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !scenario) return;

    const correct = selectedAnswer === scenario.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleContinue = () => {
    // Notify parent of result
    onAnswer(isCorrect);
  };

  // Styles matching FirewallUI
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
    borderWidth: '4px',
    borderStyle: 'solid',
  };

  const buttonBaseStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
  };

  return (
    <>
      {/* HUD: Score & Lives (Only when playing) */}
      {gameState === 'playing' && (
        <>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            pointerEvents: 'none',
            zIndex: 10,
            gap: '1.5rem',
          }}>
            {/* Score */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: '2px solid #F9BD4B', // Yellow/Orange theme
            }}>
              <div style={{ fontSize: '0.625rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Security Score</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#C87D0C' }}>{score}</div>
            </div>

            {/* Lives */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: '2px solid #F9BD4B',
            }}>
               <div style={{ fontSize: '0.625rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', textAlign: 'right' }}>System Integrity</div>
               <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.125rem', justifyContent: 'center' }}>
                 {[...Array(3)].map((_, i) => (
                   <span key={i} style={{ fontSize: '1.25rem', opacity: i < lives ? 1 : 0.3 }}>
                     {i < lives ? '❤️' : '🖤'}
                   </span>
                 ))}
               </div>
            </div>
          </div>

          {/* Exit Button */}
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
            Exit
          </button>
        </>
      )}

      {/* Start Screen */}
      {gameState === 'start' && (
        <div style={{
          ...overlayStyle,
          backgroundColor: 'rgba(254, 243, 199, 0.9)', // warm yellow tint
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            ...cardStyle,
            borderColor: '#F9BD4B',
            backgroundColor: '#FFFFFF',
          }}>
            <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>💻</div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: '900', color: '#1e293b', marginBottom: '0.5rem' }}>Computer Lab Challenge</h1>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
              Inspect the workstations. Identify <span style={{ color: '#dc2626', fontWeight: 'bold' }}>Phishing Attempts</span> and secure the lab.
              <br/><br/>
              <strong>Goal:</strong> Secure 3 workstations.<br/>
              <strong>Lives:</strong> 3 Mistakes allowed.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={onExit} style={{ ...buttonBaseStyle, backgroundColor: '#64748b', color: 'white' }}>
                Exit
              </button>
              <button onClick={onStart} style={{ ...buttonBaseStyle, backgroundColor: '#C87D0C', color: 'white' }}>
                Start Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div style={{
          ...overlayStyle,
          backgroundColor: 'rgba(127, 29, 29, 0.8)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            ...cardStyle,
            borderColor: '#ef4444',
          }}>
            <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>💀</div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: '900', color: '#1e293b', marginBottom: '0.5rem' }}>System Compromised!</h1>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
              You failed to identify the threats. The network is infected.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={onExit} style={{ ...buttonBaseStyle, backgroundColor: '#64748b', color: 'white' }}>
                Exit
              </button>
              <button onClick={onRestart} style={{ ...buttonBaseStyle, backgroundColor: '#dc2626', color: 'white' }}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Win Screen */}
      {gameState === 'won' && (
        <div style={{
          ...overlayStyle,
          backgroundColor: 'rgba(20, 83, 45, 0.8)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            ...cardStyle,
            borderColor: '#22c55e',
          }}>
            <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>🏆</div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: '900', color: '#1e293b', marginBottom: '0.5rem' }}>Lab Secured!</h1>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
              All workstations are safe. Great job!
              <br/>
              <strong>Final Score: {score}</strong>
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
               <button onClick={onExit} style={{ ...buttonBaseStyle, backgroundColor: '#16a34a', color: 'white' }}>
                Return to Campus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phishing Quiz Modal */}
      {scenario && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9998
          }}
        >
          <Motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '32px',
              borderRadius: '20px',
              maxWidth: '650px',
              width: '90%',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
              border: '4px solid #F9BD4B',
              position: 'relative'
            }}
          >
             {/* Close Button (X) */}
             {!showResult && (
                <button
                  onClick={onCloseModal}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  ✕
                </button>
             )}

            {!showResult ? (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#C87D0C', marginBottom: '8px' }}>
                    {scenario.title}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#C87D0C', marginBottom: '0' }}>
                    {scenario.description}
                  </p>
                </div>

                <div 
                  style={{
                    backgroundColor: '#fffbeb', // Light yellow
                    border: '1px solid #F9BD4B',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '20px'
                  }}
                >
                  <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                    <strong style={{ color: '#C87D0C' }}>From:</strong> {scenario.emailFrom}
                  </div>
                  <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                    <strong style={{ color: '#C87D0C' }}>Subject:</strong> {scenario.emailSubject}
                  </div>
                  <div style={{ marginTop: '10px', color: '#000000', lineHeight: '1.5', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                    {scenario.emailBody}
                  </div>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#C87D0C', marginBottom: '12px' }}>
                  {scenario.question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {scenario.answers.map((answer) => (
                    <button
                      key={answer.id}
                      onClick={() => handleAnswerSelect(answer.id)}
                      style={{
                        backgroundColor: selectedAnswer === answer.id ? '#F9BD4B' : '#FFF',
                        color: selectedAnswer === answer.id ? '#FFFFFF' : '#000000',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: selectedAnswer === answer.id ? '2px solid #C87D0C' : '2px solid #e5e7eb',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: selectedAnswer === answer.id ? 'bold' : 'normal',
                        fontSize: '14px',
                        transition: 'all 0.2s'
                      }}
                    >
                      {answer.text}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  style={{
                    backgroundColor: selectedAnswer ? '#C87D0C' : '#cbd5e0',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: selectedAnswer ? 'pointer' : 'not-allowed',
                    fontSize: '15px',
                    width: '100%'
                  }}
                >
                  Submit Answer
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {isCorrect ? '✅' : '❌'}
                </div>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: isCorrect ? '#10b981' : '#ef4444',
                  marginBottom: '12px'
                }}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h2>
                <p style={{ fontSize: '14px', color: '#374151', marginBottom: '20px', lineHeight: '1.5' }}>
                  {scenario.explanation}
                </p>
                <button
                  onClick={handleContinue}
                  style={{
                    backgroundColor: '#C87D0C',
                    color: '#ffffff',
                    padding: '12px 32px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '15px'
                  }}
                >
                  Continue
                </button>
              </div>
            )}
          </Motion.div>
        </Motion.div>
      )}
    </>
  );
}
