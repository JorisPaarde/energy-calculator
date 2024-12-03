import React, { useEffect } from 'react';

const EnergyLabel = ({ label, onRestart }) => {
  const labels = ['F', 'E', 'D', 'C', 'B', 'A', 'A+', 'A++'];
  const labelIndex = labels.indexOf(label);

  useEffect(() => {
    // Animate bars sequentially
    const animateBar = (index) => {
      if (index > labelIndex) return;

      const bar = document.querySelector(`.label-bar[data-label="${labels[index]}"]`);
      if (bar) {
        bar.classList.add('active', 'animating');
        
        // Remove animation class after transition
        setTimeout(() => {
          bar.classList.remove('animating');
        }, 500);

        // Animate next bar after delay
        if (index < labelIndex) {
          setTimeout(() => {
            animateBar(index + 1);
          }, 200);
        }
      }
    };

    // Start animation from first bar
    setTimeout(() => {
      animateBar(0);
    }, 100);
  }, [label, labelIndex, labels]);

  return (
    <div className="results-container">
      <h2 className="result-title">Uw energie label indicatie</h2>
      <div className="energy-labels">
        {labels.map((currentLabel) => (
          <div
            key={currentLabel}
            className="label-bar"
            data-label={currentLabel}
          >
            {currentLabel}
          </div>
        ))}
      </div>
      <button 
        onClick={onRestart}
        className="restart-button"
      >
        Opnieuw beginnen
      </button>
    </div>
  );
};

export default EnergyLabel; 