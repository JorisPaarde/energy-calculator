import React from 'react';
import './styles/index.css';
import EnergyCalculator from './components/EnergyCalculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <EnergyCalculator />
      </div>
    </div>
  );
}

export default App;
