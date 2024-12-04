import './styles/index.css';
import EnergyCalculator from './components/EnergyCalculator';
import FormField from './components/FormField';
import { QUESTIONS } from './utils/questions';
import { calculateLabel } from './utils/calculations';

// Make sure required globals are available
window.EnergyCalculator = window.EnergyCalculator || {};
window.EnergyCalculator.QUESTIONS = QUESTIONS;
window.EnergyCalculator.calculateLabel = calculateLabel;
window.EnergyCalculator.FormField = FormField;

// Simple test component
const TestApp = ({ licenseKey }) => {
  const [showResults, setShowResults] = window.React.useState(false);
  const [results, setResults] = window.React.useState(null);

  const handleComplete = (data) => {
    console.log('Calculator completed with data:', data);
    setResults(data);
    setShowResults(true);
  };

  return window.React.createElement('div', {
    className: 'min-h-screen flex items-center justify-center p-2 sm:p-4'
  }, [
    window.React.createElement('div', {
      key: 'content',
      className: 'w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md'
    }, [
      window.React.createElement('h2', { 
        key: 'header',
        className: 'text-2xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide pb-3'
      }, 'Energy Calculator'),
      
      !showResults ? 
        window.React.createElement(EnergyCalculator, {
          key: 'calculator',
          onComplete: handleComplete
        }) :
        window.React.createElement('div', {
          key: 'results',
          className: 'space-y-6'
        }, [
          window.React.createElement('h3', { 
            key: 'results-header',
            className: 'text-xl font-semibold'
          }, 'Results'),
          window.React.createElement('pre', { 
            key: 'results-data',
            className: 'bg-gray-50 p-4 rounded-md overflow-auto'
          }, JSON.stringify(results, null, 2)),
          window.React.createElement('button', {
            key: 'reset',
            onClick: () => setShowResults(false),
            className: 'w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
          }, 'Calculate Again')
        ])
    ])
  ]);
};

export default TestApp; 