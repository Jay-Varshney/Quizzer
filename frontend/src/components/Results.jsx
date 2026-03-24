import React from 'react';

const Results = ({ questions, userAnswers, onRestart, onRepeat, suggestion}) => {
  // Simple scoring logic for demo - in a real app, this would be more complex
  // since these are descriptive answers. We'll simulate a score.
  const score = suggestion.totalScore;

  return (
    <div className="glass-card">
      <h1>Quiz Results</h1>
      <div className="score-badge">
        {score} / {questions.length}
      </div>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Great effort! Here is a detailed breakdown of your performance.
      </p>

      <div className="results-list">
        {questions.map((q, i) => (
          <div key={i} className="result-item">
            <h3 style={{ marginBottom: '0.5rem' }}>{i + 1}. {q}</h3>
            <p><strong>Your Answer:</strong> {userAnswers[i]}</p>
            <div 
              className="tip"
              style={{
                background: suggestion.results[i].score === 0 ? 'rgba(255, 50, 70, 0.25)' : 'rgba(10, 220, 120, 0.25)',
                color: suggestion.results[i].score === 0 ? '#ff8a98' : '#69f0ae'
              }}
            >
              <strong>💡 Suggestion:</strong> {suggestion.results[i].detailedFeedback}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={onRepeat} style={{ background: 'var(--secondary)' }}>Repeat Same Topic</button>
        <button onClick={onRestart}>Try Another Topic</button>
      </div>
    </div>
  );
};

export default Results;
