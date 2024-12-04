import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// License key validation function
async function validateLicense() {
  const config = window.energyCalculatorConfig || {};
  const isDev = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname === 'energy-calculator-ced.pages.dev';

  // Development mode - always valid
  if (isDev) {
    console.log('Development mode - skipping license validation');
    return { isValid: true, licenseKey: 'DEV-MODE' };
  }

  // Production mode - must have PHP config
  if (!config.isValid || !config.licenseKey) {
    console.error('Production mode requires PHP license validation');
    return { 
      isValid: false, 
      error: 'Invalid license configuration. Please check WordPress settings.' 
    };
  }

  // In production, trust PHP validation
  return { 
    isValid: true, 
    licenseKey: config.licenseKey 
  };
}

// Initialize a single widget instance
async function initializeWidget(element) {
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
      React.createElement(React.StrictMode, null,
        React.createElement(App, { licenseKey: license.licenseKey })
      )
    );
    element.setAttribute('data-initialized', 'true');
  } catch (error) {
    console.error('Initialization error:', error);
    element.innerHTML = '<div class="energy-calculator-error">Failed to initialize calculator.</div>';
  }
}

// Auto-initialize function for all widget instances
function initializeAllWidgets() {
  const elements = [
    ...document.querySelectorAll('[id^="energy-calculator-widget"]'),
    document.getElementById('energy-calculator-root')
  ].filter(Boolean);

  elements.forEach(element => {
    if (!element.hasAttribute('data-initialized')) {
      initializeWidget(element);
    }
  });
}

// Make initialization function globally available
window.initEnergyCalculator = initializeWidget;

// Auto-initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAllWidgets);
} else {
  initializeAllWidgets();
}

// Optional: Re-scan for new widgets periodically (useful for dynamically loaded content)
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      initializeAllWidgets();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
