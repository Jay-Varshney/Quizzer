import React, { useState } from 'react';

const QuestionItem = ({ question, index, total, onNext }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onNext(answer);
      setAnswer('');
    }
  };

  return (
    <div className="glass-card">
      <div className="question-status">
        <span>Question {index + 1} of {total}</span>
        <span>🧠 Quizzer</span>
      </div>
      <h2>{question}</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div className="input-group">
          <label htmlFor="answer">Your Answer</label>
          <textarea
            id="answer"
            placeholder="Type your detailed answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            autoFocus
            required
          />
        </div>
        <button type="submit">
          {index + 1 === total ? 'Finish Quiz' : 'Next Question'}
        </button>
      </form>
    </div>
  );
};

export default QuestionItem;
