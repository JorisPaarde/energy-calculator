import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// License key validation function
async function validateLicense() {
  const config = window.energyCalculatorConfig || {};
  if (!config.licenseKey) {
    return { isValid: false, error: 'No license key provided' };
  }

  try {
    const response = await fetch(config.ajaxUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        action: 'energy_calculator_verify',
        nonce: config.nonce,
      }),
    });

    const data = await response.json();
    return {
      isValid: data.success && data.data.isValid,
      licenseKey: data.data.licenseKey,
    };
  } catch (error) {
    console.error('License validation error:', error);
    return { isValid: false, error: 'License validation failed' };
  }
}

// Widget initialization function
window.initEnergyCalculator = async function(elementId) {
  const element = document.getElementById(elementId);
  if (!element || element.hasAttribute('data-initialized')) {
    return;
  }

  try {
    const license = await validateLicense();
    if (!license.isValid) {
      element.innerHTML = `<div class="energy-calculator-error">
        ${license.error || 'Invalid or missing license key. Please check your settings.'}
      </div>`;
      return;
    }

    ReactDOM.createRoot(element).render(
      <React.StrictMode>
        <App licenseKey={license.licenseKey} />
      </React.StrictMode>
    );
    element.setAttribute('data-initialized', 'true');
  } catch (error) {
    console.error('Initialization error:', error);
    element.innerHTML = '<div class="energy-calculator-error">Failed to initialize calculator.</div>';
  }
}

// Auto-initialize in development
if (import.meta.env.DEV) {
  document.addEventListener('DOMContentLoaded', () => {
    // Create test config for development
    window.energyCalculatorConfig = {
      licenseKey: 'EC-DEVELOPMENT-KEY-123',
      isValid: true,
      ajaxUrl: '/mock-ajax',
      nonce: 'dev-nonce'
    };
    window.initEnergyCalculator('energy-calculator-widget');
  });
} else {
  // Production behavior
  document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[id^="energy-calculator-widget"]');
    elements.forEach(element => {
      if (!element.hasAttribute('data-initialized')) {
        window.initEnergyCalculator(element.id);
      }
    });
  });
}
