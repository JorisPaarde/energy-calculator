import React, { useState } from 'react';
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

function EnergyCalculator() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleInputChange = (questionId, value) => {
    const propertyName = PROPERTY_MAP[questionId];
    if (!propertyName) return;

    setFormData(prev => ({
      ...prev,
      [propertyName]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const result = calculateLabel(formData);
      setResult(result);
    } catch (err) {
      console.error('Error calculating label:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Energielabel Calculator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {QUESTIONS.map(question => (
          <FormField
            key={question.id}
            question={question}
            value={formData[PROPERTY_MAP[question.id]]}
            onChange={handleInputChange}
          />
        ))}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Bereken Energielabel
          </button>
        </div>
      </form>
      {result && (
        <EnergyLabel
          label={result.label}
          score={result.score}
          calculations={result.calculations}
        />
      )}
    </div>
  );
}

export default EnergyCalculator; 