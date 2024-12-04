import App from './App'

const isDev = window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1' ||
              window.location.hostname === 'energy-calculator-ced.pages.dev';

// Initialize a single widget instance
async function initializeWidget(element) {
  if (!element || element.hasAttribute('data-initialized')) {
    return;
  }

  try {
    // In development, skip validation entirely
    if (isDev) {
      window.ReactDOM.createRoot(element).render(
        window.React.createElement(window.React.StrictMode, null,
          window.React.createElement(App, { licenseKey: 'DEV-MODE' })
        )
      );
      element.setAttribute('data-initialized', 'true');
      return;
    }

    // Production mode - must have PHP config
    const config = window.energyCalculatorConfig || {};
    if (!config.isValid || !config.licenseKey) {
      element.innerHTML = `<div class="energy-calculator-error">
        Invalid license configuration. Please check WordPress settings.
      </div>`;
      return;
    }

    window.ReactDOM.createRoot(element).render(
      window.React.createElement(window.React.StrictMode, null,
        window.React.createElement(window.EnergyCalculator.App, { licenseKey: config.licenseKey })
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
