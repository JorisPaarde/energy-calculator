import TestApp from './TestApp'

// Initialize the global namespace first
if (!window.EnergyCalculator) {
  window.EnergyCalculator = {};
}

// Assign test component
window.EnergyCalculator.App = TestApp;

// Log assignment
console.log('Test component assigned:', {
  App: window.EnergyCalculator.App,
  type: typeof window.EnergyCalculator.App,
  source: window.EnergyCalculator.App?.toString()
});

const isDev = window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1' ||
              window.location.hostname === 'energy-calculator-ced.pages.dev';

// Initialize a single widget instance
async function initializeWidget(element) {
  if (!element || element.hasAttribute('data-initialized')) {
    return;
  }

  try {
    // Log available components before rendering
    console.log('Available components before render:', {
      App: window.EnergyCalculator.App,
      type: typeof window.EnergyCalculator.App
    });

    // Verify App component exists
    if (!window.EnergyCalculator.App) {
      throw new Error('Test App component is not available');
    }

    const config = window.energyCalculatorConfig || {};
    
    window.ReactDOM.createRoot(element).render(
      window.React.createElement(window.React.StrictMode, null,
        window.React.createElement(window.EnergyCalculator.App, { 
          licenseKey: isDev ? 'DEV-MODE' : config.licenseKey 
        })
      )
    );
    element.setAttribute('data-initialized', 'true');
  } catch (error) {
    console.error('Initialization error:', error);
    console.error('Component state:', {
      App: window.EnergyCalculator.App,
      type: typeof window.EnergyCalculator.App
    });
    element.innerHTML = '<div style="color: #f44336; padding: 10px;">Error loading Energy Calculator</div>';
  }
}

// Auto-initialize function for all widget instances
function initializeAllWidgets() {
  const elements = [
    ...document.querySelectorAll('.energy-calculator-widget'),
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

// Optional: Re-scan for new widgets periodically
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
