import React from 'react';

const Filter = ({ filters, onFilterChange }) => {
  return (
    <div className="filters">
      <h3>Filters</h3>
      <label>
        Size:
        <select value={filters.size} onChange={(e) => onFilterChange('size', e.target.value)}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>
      {/* Add more filter options here */}
    </div>
  );
};

export default Filter;
