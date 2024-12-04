import './styles/index.css';
import { QUESTIONS } from './utils/questions';
import { calculateLabel } from './utils/calculations';
import FormField from './components/FormField';
import EnergyLabel from './components/EnergyLabel';
import EnergyCalculator from './components/EnergyCalculator';

// Create the App component
const App = ({ licenseKey }) => {
  const [showResults, setShowResults] = window.React.useState(false);
  const [answers, setAnswers] = window.React.useState({});
  const [error, setError] = window.React.useState(null);

  window.React.useEffect(() => {
    // Skip license validation in development
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' || 
        window.location.hostname === 'energy-calculator-ced.pages.dev') {
      return;
    }

    // Verify license key in production
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
    return window.React.createElement('div', { className: 'app-container error' },
      window.React.createElement('div', { className: 'error-message' }, error)
    );
  }

  return window.React.createElement('div', { className: 'app-container' },
    !showResults
      ? window.React.createElement(EnergyCalculator, {
          licenseKey: licenseKey,
          onComplete: handleComplete
        })
      : window.React.createElement(EnergyLabel, {
          label: answers.label,
          onRestart: handleRestart
        })
  );
};

export { 
  App,
  EnergyCalculator,
  EnergyLabel,
  FormField,
  QUESTIONS,
  calculateLabel
};

export default App;
