const FormField = ({ question, value, onChange, onNext, isLastQuestion }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(question.id, newValue);
  };

  const handleMultiSelect = (selectedValue) => {
    const currentValues = value ? value.split(',') : [];
    const newValues = currentValues.includes(selectedValue)
      ? currentValues.filter(v => v !== selectedValue)
      : [...currentValues, selectedValue];
    onChange(question.id, newValues.join(','), false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  if (question.type === 'select') {
    return window.React.createElement('div', { className: 'form-field' },
      window.React.createElement('label', { className: 'question-label' }, question.label),
      window.React.createElement('select', {
        value: value || '',
        onChange: handleChange,
        className: 'select-input'
      },
        window.React.createElement('option', { value: '' }, 'Selecteer een optie'),
        question.options.map(option =>
          window.React.createElement('option', {
            key: option.value,
            value: option.value
          }, option.label)
        )
      )
    );
  }

  if (question.type === 'multiselect') {
    const selectedValues = value ? value.split(',') : [];
    
    return window.React.createElement('div', { className: 'form-field' },
      window.React.createElement('label', { className: 'question-label' }, question.label),
      window.React.createElement('div', { className: 'multiselect-options' },
        question.options.map(option =>
          window.React.createElement('button', {
            key: option.value,
            type: 'button',
            className: `multiselect-option ${selectedValues.includes(option.value) ? 'selected' : ''}`,
            onClick: () => handleMultiSelect(option.value)
          }, option.label)
        )
      ),
      window.React.createElement('button', {
        type: 'button',
        className: 'next-button',
        onClick: onNext,
        disabled: !selectedValues.length
      }, isLastQuestion ? 'Bereken Energielabel' : 'Volgende')
    );
  }

  return window.React.createElement('div', { className: 'form-field' },
    window.React.createElement('label', { className: 'question-label' }, question.label),
    window.React.createElement('input', {
      type: question.type,
      value: value || '',
      onChange: handleChange,
      className: 'text-input',
      placeholder: question.placeholder || ''
    })
  );
};

export default FormField; 