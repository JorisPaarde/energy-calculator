import React from 'react';

const FormField = ({ question, value, onChange }) => {
  const { id, type, label, options, placeholder } = question;

  switch (type) {
    case 'text':
    case 'number':
      return (
        <div className="mb-4">
          <label htmlFor={`q${id}`} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            type={type}
            id={`q${id}`}
            name={`q${id}`}
            value={value || ''}
            onChange={(e) => onChange(id, e.target.value)}
            placeholder={placeholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      );

    case 'radio':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`q${id}-${option.value}`}
                  name={`q${id}`}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(id, e.target.value)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`q${id}-${option.value}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      );

    case 'dropdown':
      return (
        <div className="mb-4">
          <label htmlFor={`q${id}`} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <select
            id={`q${id}`}
            name={`q${id}`}
            value={value || ''}
            onChange={(e) => onChange(id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecteer een optie</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'multiselect':
      const selectedValues = Array.isArray(value) ? value : [];
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`q${id}-${option.value}`}
                  name={`q${id}`}
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter((v) => v !== option.value);
                    onChange(id, newValues);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`q${id}-${option.value}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default FormField; 