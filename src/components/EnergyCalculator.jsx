import React, { useState, useRef } from 'react';
import { QUESTIONS } from '../utils/questions';
import { calculateLabel } from '../utils/calculations';
import FormField from './FormField';
import EnergyLabel from './EnergyLabel';

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

function EnergyCalculator({ onComplete }) {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isTransitioning = useRef(false);

  const handleInputChange = (questionId, value, shouldAdvance = true) => {
    const propertyName = PROPERTY_MAP[questionId];
    if (!propertyName || isTransitioning.current) return;

    setFormData(prev => ({
      ...prev,
      [propertyName]: value
    }));

    // Only advance automatically for non-multiselect questions
    if (shouldAdvance && currentStep < QUESTIONS.length - 1) {
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
      const result = calculateLabel(formData);
      onComplete({ ...formData, label: result.label });
    } catch (err) {
      console.error('Error calculating label:', err);
    }
  };

  const currentQuestion = QUESTIONS[currentStep];
  const isLastQuestion = currentStep === QUESTIONS.length - 1;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide pb-3">
        Energielabel Calculator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="question-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <div className="question-number">
            Vraag {currentStep + 1} van {QUESTIONS.length}
          </div>
          <div 
            key={currentQuestion.id} 
            className={`question-animate ${isAnimating ? 'slide-out' : ''}`}
          >
            <FormField
              question={currentQuestion}
              value={formData[PROPERTY_MAP[currentQuestion.id]]}
              onChange={handleInputChange}
              onNext={isLastQuestion ? handleSubmit : advanceToNextQuestion}
              isLastQuestion={isLastQuestion}
            />
          </div>
        </div>
        {currentStep === QUESTIONS.length - 1 && currentQuestion.type !== 'multiselect' && (
          <div className="mt-6 fade-in">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Bereken Energielabel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default EnergyCalculator; 