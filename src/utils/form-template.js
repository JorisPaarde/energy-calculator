export function createFormField(question) {
   const baseFieldClass = "form-field";
   const baseLabelClass = "field-label";

   switch(question.type) {
       case 'dropdown':
           return `
               <div class="${baseFieldClass}">
                   <label class="${baseLabelClass}">${question.label}</label>
                   <select name="q${question.id}" class="select-field">
                       <option value="" disabled selected>Selecteer een optie...</option>
                       ${question.options.map(option => 
                           `<option value="${option.value}">${option.label}</option>`
                       ).join('')}
                   </select>
               </div>
           `;

       case 'number':
           return `
               <div class="${baseFieldClass}">
                   <label class="${baseLabelClass}">${question.label}</label>
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
                   <label class="${baseLabelClass}">${question.label}</label>
                   <div class="radio-group">
                       ${question.options.map(option => `
                           <label class="radio-label">
                               <input type="radio"
                                      class="radio-input"
                                      name="q${question.id}"
                                      value="${option.value}">
                               <span class="radio-text">${option.label}</span>
                           </label>
                       `).join('')}
                   </div>
               </div>
           `;

       case 'multiselect':
           return `
               <div class="${baseFieldClass}">
                   <label class="${baseLabelClass}">${question.label}</label>
                   <div class="checkbox-group">
                       ${question.options.map(option => `
                           <label class="checkbox-label">
                               <input type="checkbox"
                                      class="checkbox-input"
                                      name="q${question.id}"
                                      value="${option.value}">
                               <span class="checkbox-text">${option.label}</span>
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