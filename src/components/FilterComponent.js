import React from 'react';

function FilterComponent({ label, options, value, onChange }) {
  return (
    <div className="filter-component">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterComponent;
