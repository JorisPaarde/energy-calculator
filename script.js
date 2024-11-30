// Import statements
import { QUESTIONS } from './questions.js';
import { getFormTemplate } from './form-template.js';
import { calculateLabel } from './calculations.js';

// Map question IDs to property names expected by calculateLabel
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

function updateEnergyLabelDisplay(resultDiv, label) {
    const bars = resultDiv.querySelectorAll('.label-bar');
    const labelOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'A+', 'A++'];
    const labelIndex = labelOrder.indexOf(label);

    // First reset all bars to grey
    bars.forEach(bar => {
        bar.classList.remove('active', 'animating');
    });

    // Animate bars sequentially
    function animateBar(index) {
        if (index > labelIndex) return;

        const bar = bars[index];
        bar.classList.add('active', 'animating');
        
        // Remove animation class after transition
        setTimeout(() => {
            bar.classList.remove('animating');
        }, 500);

        // Animate next bar after delay
        if (index < labelIndex) {
            setTimeout(() => {
                animateBar(index + 1);
            }, 200);
        }
    }

    // Start animation from F
    setTimeout(() => {
        animateBar(0);
    }, 100);
}

function createEnergyCalculator(container) {
    container.innerHTML = getFormTemplate(QUESTIONS);
    const form = container.querySelector('#calculatorForm');
    const resultDiv = container.querySelector('#result');

    if (!form || !resultDiv) return;

    // Show result container immediately with grey bars
    resultDiv.classList.remove('hidden');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        try {
            const formData = {};
            QUESTIONS.forEach(q => {
                const propertyName = PROPERTY_MAP[q.id];
                if (!propertyName) return;

                if (q.type === 'multiselect') {
                    const checkboxes = form.querySelectorAll(`input[name="q${q.id}"]:checked`);
                    formData[propertyName] = Array.from(checkboxes).map(cb => cb.value);
                } else if (q.type === 'radio') {
                    const input = form.querySelector(`input[name="q${q.id}"]:checked`);
                    formData[propertyName] = input ? input.value : null;
                } else if (q.type === 'dropdown') {
                    const select = form.querySelector(`select[name="q${q.id}"]`);
                    formData[propertyName] = select ? select.value : null;
                } else {
                    const input = form.querySelector(`input[name="q${q.id}"]`);
                    formData[propertyName] = input ? input.value : null;
                }
            });

            const result = calculateLabel(formData);
            updateEnergyLabelDisplay(resultDiv, result.label);
        } catch (err) {
            // Handle errors silently or show user-friendly message if needed
        }
    });
}

// Auto-initialize
function init() {
    const containers = document.querySelectorAll('.energy-calculator');
    containers.forEach(container => {
        createEnergyCalculator(container);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}