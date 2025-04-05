import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterComponent from '../components/FilterComponent';

describe('FilterComponent', () => {
  const mockOnChange = jest.fn();
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  test('renders label and options correctly', () => {
    render(
      <FilterComponent
        label="Test Label"
        options={options}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Select Test Label')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('calls onChange when an option is selected', () => {
    render(
      <FilterComponent
        label="Test Label"
        options={options}
        value=""
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option1' } });

    expect(mockOnChange).toHaveBeenCalledWith('option1');
  });
});
