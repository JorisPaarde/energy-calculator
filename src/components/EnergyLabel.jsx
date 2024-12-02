import React, { useEffect } from 'react';

const EnergyLabel = ({ label }) => {
  const labelOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'A+', 'A++'];
  const labelIndex = labelOrder.indexOf(label);

  useEffect(() => {
    // Animate bars sequentially
    const animateBar = (index) => {
      if (index > labelIndex) return;

      const bar = document.querySelector(`.label-bar[data-label="${labelOrder[index]}"]`);
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
  }, [label, labelIndex]);

  return (
    <div className="results-container">
      <div className="result-content">
        <h3 className="result-title">Resultaat</h3>
        <div className="energy-label-bars">
          {labelOrder.map((currentLabel) => (
            <div
              key={currentLabel}
              className="label-bar"
              data-label={currentLabel}
            >
              {currentLabel}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnergyLabel; 