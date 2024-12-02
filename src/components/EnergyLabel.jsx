import React from 'react';

const EnergyLabel = ({ label, score, calculations }) => {
  const labelOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'A+', 'A++'];
  const labelIndex = labelOrder.indexOf(label);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Uw Energielabel</h3>
      <div className="space-y-2">
        {labelOrder.map((currentLabel, index) => (
          <div
            key={currentLabel}
            className={`label-bar ${index <= labelIndex ? 'active' : ''}`}
          >
            {currentLabel}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-900 mb-2">Score Details</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">
            Totale score: <span className="font-semibold">{score}</span>
          </p>
          {calculations && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(calculations).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="text-gray-500">{key}:</span>{' '}
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnergyLabel; 