import React, { useState } from "react";

const QuizForm = ({ onSubmit, initialTopic = "", initialNumQuestions = 5 }) => {
  const [topic, setTopic] = useState(initialTopic);
  const [numQuestions, setNumQuestions] = useState(initialNumQuestions);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit({ topic, numQuestions });
    }
  };

  return (
    <div className="glass-card">
      <h1>Quizzer 🧠</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="topic">Quiz Topic</label>
          <input
            id="topic"
            type="text"
            placeholder="e.g. React Hooks, Universe, Cooking..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="numQuestions">Number of Questions</label>
          <input
            id="numQuestions"
            type="number"
            min="1"
            max="20"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default QuizForm;
