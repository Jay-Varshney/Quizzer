import React from 'react';

const Loading = () => {
  return (
    <div className="glass-card loading-container">
      <div className="cube-loader">
        <div className="cube-face cube-face-front"></div>
        <div className="cube-face cube-face-back"></div>
        <div className="cube-face cube-face-right"></div>
        <div className="cube-face cube-face-left"></div>
        <div className="cube-face cube-face-top"></div>
        <div className="cube-face cube-face-bottom"></div>
      </div>
      <h2 className="loading-text">Generating Quiz...</h2>
      <p className="loading-subtext">Our AI is crafting the perfect questions for you.</p>
    </div>
  );
};

export default Loading;
