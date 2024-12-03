import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Widget initialization function
window.initEnergyCalculator = function(elementId) {
  const element = document.getElementById(elementId)
  if (element && !element.hasAttribute('data-initialized')) {
    const clientKey = window.ENERGY_CALCULATOR_CLIENT_KEY;
    
    if (!clientKey) {
      console.error('No client key provided for Energy Calculator');
      element.innerHTML = 'Error: Invalid configuration';
      return;
    }

    ReactDOM.createRoot(element).render(
      <React.StrictMode>
        <App clientKey={clientKey} />
      </React.StrictMode>
    )
    element.setAttribute('data-initialized', 'true')
  }
}

// Optional: Auto-initialize if element exists
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[id^="energy-calculator-widget"]')
  elements.forEach(element => {
    if (!element.hasAttribute('data-initialized')) {
      window.initEnergyCalculator(element.id)
    }
  })
})
