import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticleCard from '../components/ArticleCard';

describe('ArticleCard', () => {
  const mockOnClick = jest.fn();
  const mockOnTagClick = jest.fn();
  const article = {
    id: '1',
    title: 'Test Article',
    image: 'test-image.jpg',
    author: 'John Doe',
    category: 'Frontend',
    tags: ['React', 'JavaScript'],
  };

  test('renders article details correctly', () => {
    render(
      <ArticleCard
        article={article}
        onClick={mockOnClick}
        onTagClick={mockOnTagClick}
      />
    );

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByAltText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Author: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Category: Frontend')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  test('calls onClick when the article is clicked', () => {
    render(
      <ArticleCard
        article={article}
        onClick={mockOnClick}
        onTagClick={mockOnTagClick}
      />
    );

    const articleElement = screen.getByText('Test Article');
    fireEvent.click(articleElement);

    expect(mockOnClick).toHaveBeenCalledWith('1');
  });

  test('calls onTagClick when a tag is clicked', () => {
    render(
      <ArticleCard
        article={article}
        onClick={mockOnClick}
        onTagClick={mockOnTagClick}
      />
    );

    const tagButton = screen.getByText('React');
    fireEvent.click(tagButton);

    expect(mockOnTagClick).toHaveBeenCalledWith(expect.anything(), 'React');
  });
});
