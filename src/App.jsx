import React, { useState, useEffect } from 'react';
import './styles/index.css';
import EnergyCalculator from './components/EnergyCalculator';
import EnergyLabel from './components/EnergyLabel';

function App({ licenseKey }) {
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verify license key on component mount
    if (!licenseKey || !licenseKey.startsWith('EC-')) {
      setError('Invalid license key');
    }
  }, [licenseKey]);

  const handleComplete = (answers) => {
    setAnswers(answers);
    setShowResults(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setShowResults(false);
  };

  if (error) {
    return (
      <div className="app-container error">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {!showResults ? (
        <EnergyCalculator
          licenseKey={licenseKey}
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
