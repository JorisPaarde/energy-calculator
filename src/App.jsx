import React, { useState } from 'react';
import './styles/index.css';
import EnergyCalculator from './components/EnergyCalculator';
import EnergyLabel from './components/EnergyLabel';

function App({ clientKey }) {
  const [showResults, setShowResults] = React.useState(false);
  const [answers, setAnswers] = React.useState({});

  const handleComplete = (answers) => {
    setAnswers(answers);
    setShowResults(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="app-container">
      {!showResults ? (
        <EnergyCalculator
          clientKey={clientKey}
          onComplete={handleComplete}
        />
      ) : (
        <EnergyLabel
          label={answers.label}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
