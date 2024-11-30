// Import statements
import { QUESTIONS } from './questions.js';
import { getFormTemplate } from './form-template.js';
import { calculateLabel } from './calculations.js';

console.log('Main script executing...');
console.log('Imports completed');

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
    try {
        console.log('Creating calculator for container');
        container.innerHTML = getFormTemplate(QUESTIONS);

        const form = container.querySelector('#calculatorForm');
        const resultDiv = container.querySelector('#result');

        if (!form || !resultDiv) {
            console.error('Form elements not found:', { form, resultDiv });
            return;
        }

        // Show result container immediately with grey bars
        resultDiv.classList.remove('hidden');

        console.log('Form elements found');

        // Add change event listeners for all form inputs
        QUESTIONS.forEach(q => {
            try {
                if (q.type === 'multiselect') {
                    const checkboxes = form.querySelectorAll(`input[name="q${q.id}"]`);
                    checkboxes.forEach(checkbox => {
                        checkbox.addEventListener('change', () => {
                            console.log(`Checkbox changed - Question ${q.id}:`, checkbox.value, checkbox.checked);
                        });
                    });
                } else if (q.type === 'radio') {
                    const radios = form.querySelectorAll(`input[name="q${q.id}"]`);
                    radios.forEach(radio => {
                        radio.addEventListener('change', () => {
                            console.log(`Radio changed - Question ${q.id}:`, radio.value);
                        });
                    });
                } else if (q.type === 'dropdown') {
                    const select = form.querySelector(`select[name="q${q.id}"]`);
                    if (select) {
                        select.addEventListener('change', () => {
                            console.log(`Dropdown changed - Question ${q.id}:`, select.value);
                        });
                    } else {
                        console.warn(`Dropdown not found for question ${q.id}`);
                    }
                } else {
                    const input = form.querySelector(`input[name="q${q.id}"]`);
                    if (input) {
                        input.addEventListener('input', () => {
                            console.log(`Input changed - Question ${q.id}:`, input.value);
                        });
                    } else {
                        console.warn(`Input not found for question ${q.id}`);
                    }
                }
            } catch (err) {
                console.error(`Error setting up listeners for question ${q.id}:`, err);
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted');

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
                    console.log(`Value for ${propertyName}:`, formData[propertyName]);
                });

                console.log('Final form data:', formData);
                const result = calculateLabel(formData);
                console.log('Calculation result:', result);

                // Update the display with animation
                updateEnergyLabelDisplay(resultDiv, result.label);
            } catch (err) {
                console.error('Error processing form submission:', err);
            }
        });
    } catch (err) {
        console.error('Error creating calculator:', err);
    }
}

// Auto-initialize
function init() {
    try {
        console.log('Initializing...');
        const containers = document.querySelectorAll('.energy-calculator');
        console.log('Found containers:', containers.length);
        containers.forEach(container => {
            createEnergyCalculator(container);
        });
    } catch (err) {
        console.error('Error during initialization:', err);
    }
}

if (document.readyState === 'loading') {
    console.log('Document still loading, adding event listener');
    document.addEventListener('DOMContentLoaded', init);
} else {
    console.log('Document already loaded, initializing now');
    init();
}