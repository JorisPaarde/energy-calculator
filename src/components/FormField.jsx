import React, { useState, useRef, useEffect } from 'react';

const FormField = ({ question, value, onChange, onNext, isLastQuestion }) => {
  const { id, type, label, options, placeholder } = question;
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const inputTimeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (inputTimeoutRef.current) {
        clearTimeout(inputTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(id, newValue, false);

    // Clear any existing timeout
    if (inputTimeoutRef.current) {
      clearTimeout(inputTimeoutRef.current);
    }

    // Set new timeout for auto-advance only if there's a valid value
    if (newValue.trim() !== '') {
      inputTimeoutRef.current = setTimeout(() => {
        onNext();
      }, 5000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value && value.trim() !== '') {
        onNext();
      }
    }
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    onChange(id, optionValue);
    setIsOpen(false);
  };

  const handleCheckboxChange = (e, optionValue) => {
    const newValues = Array.isArray(value) ? [...value] : [];
    if (e.target.checked) {
      newValues.push(optionValue);
    } else {
      const index = newValues.indexOf(optionValue);
      if (index > -1) {
        newValues.splice(index, 1);
      }
    }
    onChange(id, newValues, false);

    // Clear any existing timeout
    if (inputTimeoutRef.current) {
      clearTimeout(inputTimeoutRef.current);
    }

    // Set new timeout for auto-advance if at least one option is selected
    if (newValues.length > 0) {
      inputTimeoutRef.current = setTimeout(() => {
        onNext();
      }, 5000);
    }
  };

  const renderNextButton = () => (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => onNext()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {isLastQuestion ? 'Bereken Energielabel' : 'Volgende'}
      </button>
    </div>
  );

  switch (type) {
    case 'text':
    case 'number':
      return (
        <div className="form-field">
          <label htmlFor={`q${id}`} className="field-label">
            {label}
          </label>
          <input
            type={type}
            id={`q${id}`}
            name={`q${id}`}
            value={value || ''}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="number-field"
          />
          {renderNextButton()}
        </div>
      );

    case 'dropdown':
      return (
        <div className="form-field">
          <label className="field-label">{label}</label>
          <div className="custom-select" ref={selectRef}>
            <div
              className={`select-field ${isOpen ? 'active' : ''}`}
              onClick={handleSelectClick}
            >
              {value ? options.find(opt => opt.value === value)?.label : 'Selecteer een optie'}
              <span className="select-arrow"></span>
            </div>
            {isOpen && (
              <div className="select-options">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className={`select-option ${value === option.value ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case 'radio':
      return (
        <div className="form-field">
          <label className="field-label">
            {label}
          </label>
          <div className="radio-group">
            {options.map((option) => (
              <label key={option.value} className="radio-label">
                <input
                  type="radio"
                  name={`q${id}`}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(id, e.target.value)}
                  className="radio-input"
                />
                <span className="radio-text">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      );

    case 'multiselect':
      return (
        <div className="form-field">
          <label className="field-label">
            {label}
          </label>
          <div className="checkbox-group">
            {options.map((option) => (
              <label key={option.value} className="checkbox-label">
                <input
                  type="checkbox"
                  name={`q${id}`}
                  value={option.value}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={(e) => handleCheckboxChange(e, option.value)}
                  className="checkbox-input"
                />
                <span className="checkbox-text">{option.label}</span>
              </label>
            ))}
          </div>
          {renderNextButton()}
        </div>
      );

    default:
      return null;
  }
};

export default FormField; 