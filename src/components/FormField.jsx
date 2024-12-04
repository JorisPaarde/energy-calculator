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

  if (question.type === 'select' || question.type === 'dropdown') {
    return window.React.createElement('div', { className: 'form-field' },
      window.React.createElement('label', { className: 'field-label' }, question.label),
      window.React.createElement('div', { className: 'custom-select' },
        window.React.createElement('select', {
          value: value || '',
          onChange: handleChange,
          className: 'select-field'
        }, [
          window.React.createElement('option', { value: '' }, 'Selecteer een optie'),
          ...question.options.map(option =>
            window.React.createElement('option', {
              key: option.value,
              value: option.value
            }, option.label)
          )
        ])
      )
    );
  }

  if (question.type === 'radio') {
    return window.React.createElement('div', { className: 'form-field' },
      window.React.createElement('label', { className: 'field-label' }, question.label),
      window.React.createElement('div', { className: 'radio-group' },
        question.options.map(option =>
          window.React.createElement('label', {
            key: option.value,
            className: 'radio-label'
          }, [
            window.React.createElement('input', {
              key: 'input',
              type: 'radio',
              name: 'question-' + question.id,
              value: option.value,
              checked: value === option.value,
              onChange: handleChange,
              className: 'radio-input'
            }),
            window.React.createElement('span', { key: 'text' }, option.label)
          ])
        )
      )
    );
  }

  if (question.type === 'multiselect') {
    const selectedValues = value ? value.split(',') : [];
    
    return window.React.createElement('div', { className: 'form-field' },
      window.React.createElement('label', { className: 'field-label' }, question.label),
      window.React.createElement('div', { className: 'checkbox-group' },
        question.options.map(option =>
          window.React.createElement('label', {
            key: option.value,
            className: 'checkbox-label'
          }, [
            window.React.createElement('input', {
              key: 'input',
              type: 'checkbox',
              value: option.value,
              checked: selectedValues.includes(option.value),
              onChange: () => handleMultiSelect(option.value),
              className: 'checkbox-input'
            }),
            window.React.createElement('span', { key: 'text' }, option.label)
          ])
        )
      ),
      window.React.createElement('button', {
        type: 'button',
        className: 'submit-button',
        onClick: onNext,
        disabled: !selectedValues.length
      }, isLastQuestion ? 'Bereken Energielabel' : 'Volgende')
    );
  }

  // Default to text/number input
  return window.React.createElement('div', { className: 'form-field' },
    window.React.createElement('label', { className: 'field-label' }, question.label),
    window.React.createElement('input', {
      type: question.type || 'text',
      value: value || '',
      onChange: handleChange,
      className: question.type === 'number' ? 'number-field' : 'text-input',
      placeholder: question.placeholder || ''
    })
  );
};

export default FormField; 