// form-template.js

export function createFormField(question) {
   const baseFieldClass = "form-field";
   const baseLabelClass = "field-label";

   switch(question.type) {
       case 'dropdown':
           return `
               <div class="${baseFieldClass}">
                   <label class="${baseLabelClass}">${question.question}</label>
                   <select name="q${question.id}" class="select-field">
                       <option value="" disabled selected>Selecteer een optie...</option>
                       ${question.options.map(option => 
                           `<option value="${option}">${option}</option>`
                       ).join('')}
                   </select>
               </div>
           `;

       case 'number':
           return `
               <div class="${baseFieldClass}">
                   <label class="${baseLabelClass}">${question.question}</label>
                   <input type="number" 
                          name="q${question.id}"
                          class="number-field"
                          placeholder="${question.placeholder}"
                          min="0"
                          required>
               </div>
           `;

       case 'radio':
           return `
               <div class="${baseFieldClass}">
                   <label class="${baseLabelClass}">${question.question}</label>
                   <div class="radio-group">
                       ${question.options.map(option => `
                           <label class="radio-label">
                               <input type="radio"
                                      class="radio-input"
                                      name="q${question.id}"
                                      value="${option}">
                               <span class="radio-text">${option}</span>
                           </label>
                       `).join('')}
                   </div>
               </div>
           `;

       case 'multiselect':
           return `
               <div class="${baseFieldClass}">
                   <label class="${baseLabelClass}">${question.question}</label>
                   <div class="checkbox-group">
                       ${question.options.map(option => `
                           <label class="checkbox-label">
                               <input type="checkbox"
                                      class="checkbox-input"
                                      name="q${question.id}"
                                      value="${option}">
                               <span class="checkbox-text">${option}</span>
                           </label>
                       `).join('')}
                   </div>
               </div>
           `;
   }
}

export function getFormTemplate(questions) {
   return `
       <div class="calculator-container">
           <h2 class="calculator-title">Energie Label Calculator</h2>

           <form id="calculatorForm" class="calculator-form">
               ${questions.map(question => createFormField(question)).join('')}

               <button type="submit" 
                       class="submit-button">
                   Bereken Energie Label
               </button>
           </form>

           <div id="result" class="results-container hidden">
               <div class="result-content">
                   <h3 class="result-title">Resultaat</h3>
                   <div class="energy-label-bars">
                       <div class="label-bar" data-label="F">F</div>
                       <div class="label-bar" data-label="E">E</div>
                       <div class="label-bar" data-label="D">D</div>
                       <div class="label-bar" data-label="C">C</div>
                       <div class="label-bar" data-label="B">B</div>
                       <div class="label-bar" data-label="A">A</div>
                       <div class="label-bar" data-label="A+">A+</div>
                       <div class="label-bar" data-label="A++">A++</div>
                   </div>
               </div>
           </div>
       </div>
   `;
}


// Helper function to show/hide result
export function toggleResult(show, resultData = null) {
   const resultDiv = document.getElementById('result');
   const resultDetails = resultDiv.querySelector('.result-details');

   if (show && resultData) {
       resultDiv.classList.remove('hidden');
       resultDetails.innerHTML = `
           <div class="result-label">
               <span class="label-text">Energie Label</span>
               <span class="label-value label-${resultData.label}">${resultData.label}</span>
           </div>
           <div class="result-score">
               <span class="score-text">Score</span>
               <span class="score-value">${resultData.score} punten</span>
           </div>
           ${resultData.recommendations ? `
               <div class="recommendations">
                   <h4>Aanbevelingen</h4>
                   <ul class="recommendations-list">
                       ${resultData.recommendations.map(rec => `
                           <li class="recommendation-item">${rec}</li>
                       `).join('')}
                   </ul>
               </div>
           ` : ''}
       `;
   } else {
       resultDiv.classList.add('hidden');
   }
}