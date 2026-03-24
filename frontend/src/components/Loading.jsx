import React from 'react';

const Loading = ({ text = "Generating Quiz...", subtext = "Our AI is crafting the perfect questions for you." }) => {
  return (
    <div className="glass-card loading-container">
      <div className="loader-orbit">
        <div className="loader-ring"></div>
        <div className="loader-orb"></div>
      </div>
      <h2 className="loading-text">{text}</h2>
      <p className="loading-subtext">{subtext}</p>
    </div>
  );
};

export default Loading;
