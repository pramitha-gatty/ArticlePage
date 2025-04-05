import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TagButton from '../components/TagButton';

describe('TagButton', () => {
  const mockOnClick = jest.fn();

  test('renders tag correctly', () => {
    render(<TagButton tag="React" onClick={mockOnClick} />);

    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('calls onClick when the button is clicked', () => {
    render(<TagButton tag="React" onClick={mockOnClick} />);

    const button = screen.getByText('React');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledWith('React');
  });

  test('prevents parent click when button is clicked', () => {
    const mockParentClick = jest.fn();
    render(
      <div onClick={mockParentClick}>
        <TagButton tag="React" onClick={mockOnClick} />
      </div>
    );

    const button = screen.getByText('React');
    fireEvent.click(button);

    expect(mockParentClick).not.toHaveBeenCalled();
    expect(mockOnClick).toHaveBeenCalledWith('React');
  });
});
