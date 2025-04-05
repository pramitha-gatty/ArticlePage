import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ArticlesPage.css';
import homepageData from '../data/homepage.json';
import articleData from '../data/article.json';
import categoriesData from '../data/categories.json';
import FilterComponent from '../components/FilterComponent';
import ArticleCard from '../components/ArticleCard';

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    author: '',
    category: '',
    articleType: '',
    tag: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Load categories
    setCategories(categoriesData.data.categories);

    // Load articles from homepage data
    const homepageArticles = homepageData.data.articles.map((article) => ({
      id: article.articleId,
      title: article.title,
      image: article.hero,
      tags: article.tags,
      articleType: article.articleType,
      author: articleData.data.author.authorName,
      category: categoriesData.data.categories.find(
        (cat) => cat.categoryId === article.categoryId
      )?.categoryName,
    }));
    setArticles(homepageArticles);
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const applyFilters = () => {
    const filteredArticles = homepageData.data.articles.filter((article) => {
      const matchesAuthor =
        !filters.author || articleData.data.author.authorName === filters.author;
      const matchesCategory =
        !filters.category ||
        categoriesData.data.categories.find(
          (cat) => cat.categoryId === article.categoryId
        )?.categoryName === filters.category;
      const matchesArticleType =
        !filters.articleType || article.articleType.toString() === filters.articleType;
      const matchesTag =
        !filters.tag || article.tags.includes(filters.tag);

      return matchesAuthor && matchesCategory && matchesArticleType && matchesTag;
    });

    setArticles(
      filteredArticles.map((article) => ({
        id: article.articleId,
        title: article.title,
        image: article.hero,
        tags: article.tags,
        articleType: article.articleType,
        author: articleData.data.author.authorName,
        category: categoriesData.data.categories.find(
          (cat) => cat.categoryId === article.categoryId
        )?.categoryName,
      }))
    );
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  const handleTagClick = (tag) => {
    handleFilterChange('tag', tag);
  };

  return (
    <div className="articles-container">
      <div className="filters">
        <FilterComponent
          label="Author"
          value={filters.author}
          onChange={(value) => handleFilterChange('author', value)}
          options={[
            { value: articleData.data.author.authorName, label: articleData.data.author.authorName },
          ]}
        />
        <FilterComponent
          label="Category"
          value={filters.category}
          onChange={(value) => handleFilterChange('category', value)}
          options={categories.map((category) => ({
            value: category.categoryName,
            label: category.categoryName,
          }))}
        />
        <FilterComponent
          label="Article Type"
          value={filters.articleType}
          onChange={(value) => handleFilterChange('articleType', value)}
          options={[
            { value: '1', label: 'Type 1' },
            { value: '2', label: 'Type 2' },
          ]}
        />
        <FilterComponent
          label="Tag"
          value={filters.tag}
          onChange={(value) => handleFilterChange('tag', value)}
          options={homepageData.data.articles.flatMap((article) =>
            article.tags.map((tag) => ({ value: tag, label: tag }))
          )}
        />
      </div>
      <div className="articles-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onClick={handleArticleClick}
            onTagClick={handleTagClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
