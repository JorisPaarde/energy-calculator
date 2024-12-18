// Initialize namespace
window.EnergyCalculator = window.EnergyCalculator || {};

const PROPERTY_MAP = {
  1: 'buildingYear',
  2: 'buildingType',
  3: 'livingArea',
  4: 'glassType',
  5: 'roofInsulation',
  6: 'wallInsulation',
  7: 'floorInsulation',
  8: 'heatingSystem',
  9: 'heatingEfficiency',
  10: 'additionalSystems',
  11: 'solarPanels',
  12: 'waterHeating',
  13: 'cooling',
  14: 'heatingAge',
  15: 'ventilation',
  16: 'smartEnergy'
};

const EnergyCalculator = ({ onComplete }) => {
  const [formData, setFormData] = window.React.useState({});
  const [currentStep, setCurrentStep] = window.React.useState(0);
  const [isAnimating, setIsAnimating] = window.React.useState(false);
  const isTransitioning = window.React.useRef(false);

  const handleInputChange = (questionId, value, shouldAdvance = true) => {
    const propertyName = PROPERTY_MAP[questionId];
    if (!propertyName || isTransitioning.current) return;

    setFormData(prev => ({
      ...prev,
      [propertyName]: value
    }));

    // Only advance automatically for non-multiselect questions
    if (shouldAdvance && currentStep < window.EnergyCalculator.QUESTIONS.length - 1) {
      advanceToNextQuestion();
    }
  };

  const advanceToNextQuestion = () => {
    if (isTransitioning.current) return;
    
    isTransitioning.current = true;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsAnimating(false);
      
      setTimeout(() => {
        isTransitioning.current = false;
      }, 100);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const result = window.EnergyCalculator.calculateLabel(formData);
      onComplete({ ...formData, label: result.label });
    } catch (err) {
      console.error('Error calculating label:', err);
    }
  };

  const currentQuestion = window.EnergyCalculator.QUESTIONS[currentStep];
  const isLastQuestion = currentStep === window.EnergyCalculator.QUESTIONS.length - 1;

  return window.React.createElement('div', { className: "min-h-screen flex items-center justify-center p-2 sm:p-4" },
    window.React.createElement('div', { className: "w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md" },
      window.React.createElement('h2', { className: "text-2xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide pb-3" },
        'Energielabel Calculator'
      ),
      window.React.createElement('form', { onSubmit: handleSubmit, className: "space-y-6" },
        window.React.createElement('div', { className: "question-container" },
          window.React.createElement('div', { className: "progress-bar" },
            window.React.createElement('div', {
              className: "progress-fill",
              style: { width: `${((currentStep + 1) / window.EnergyCalculator.QUESTIONS.length) * 100}%` }
            })
          ),
          window.React.createElement('div', { className: "question-number" },
            `Vraag ${currentStep + 1} van ${window.EnergyCalculator.QUESTIONS.length}`
          ),
          window.React.createElement('div', {
            key: currentQuestion.id,
            className: `question-animate ${isAnimating ? 'slide-out' : ''}`
          },
            window.React.createElement(window.EnergyCalculator.FormField, {
              question: currentQuestion,
              value: formData[PROPERTY_MAP[currentQuestion.id]],
              onChange: handleInputChange,
              onNext: isLastQuestion ? handleSubmit : advanceToNextQuestion,
              isLastQuestion: isLastQuestion
            })
          )
        ),
        currentStep === window.EnergyCalculator.QUESTIONS.length - 1 && currentQuestion.type !== 'multiselect' &&
          window.React.createElement('div', { className: "mt-6 fade-in" },
            window.React.createElement('button', {
              type: "submit",
              className: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            }, 'Bereken Energielabel')
          )
      )
    )
  );
};

export default EnergyCalculator; 