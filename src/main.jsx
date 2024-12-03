import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Widget initialization function
window.initEnergyCalculator = function(elementId) {
  const element = document.getElementById(elementId)
  if (element && !element.hasAttribute('data-initialized')) {
    const clientKey = window.ENERGY_CALCULATOR_CLIENT_KEY || 'development';
    
    ReactDOM.createRoot(element).render(
      <React.StrictMode>
        <App clientKey={clientKey} />
      </React.StrictMode>
    )
    element.setAttribute('data-initialized', 'true')
  }
}

// Auto-initialize in development
if (import.meta.env.DEV) {
  document.addEventListener('DOMContentLoaded', () => {
    window.initEnergyCalculator('energy-calculator-widget');
  });
} else {
  // Production behavior
  document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[id^="energy-calculator-widget"]')
    elements.forEach(element => {
      if (!element.hasAttribute('data-initialized')) {
        window.initEnergyCalculator(element.id)
      }
    })
  })
}
