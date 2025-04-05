/**
 * ArticleDetailPage Component
 * 
 * This component displays the details of a specific article.
 * It also allows users to filter and view other articles by clicking on tags.
 * 
 * Features:
 * - Fetches article details from JSON data based on the articleId from the URL.
 * - Displays article title, hero image, author details, and content.
 * - Toggles author details on hover.
 * - Allows filtering articles by tags and displays a list of filtered articles.
 * 
 * Props: None
 * 
 * State:
 * - showAuthorDetails: Boolean to toggle the visibility of author details.
 * - filteredArticles: List of articles filtered by the selected tag.
 * 
 * Methods:
 * - handleTagClick: Filters articles by the clicked tag.
 */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import articleData from '../data/article.json';
import dataType from "../constants/dataTypes"


function ArticleDetailPage() {
  const { articleId } = useParams(); // Get the articleId from the URL
  const article = articleData.data; // Fetch article details from article.json
  const [showAuthorDetails, setShowAuthorDetails] = useState(false); // State to toggle author details
  const [filteredArticles, setFilteredArticles] = useState([]); // State to store filtered articles

  const handleTagClick = (tag) => {
    const filtered = Object.values(articleData.data).filter(
      (item) => item.tags && item.tags.includes(tag) // Ensure item.tags exists
    );
    setFilteredArticles(filtered);
  };

  if (article.articleId !== articleId) {
    return <p>Article not found</p>;
  }
console.info("article.articleType === dataType.image",article.articleType , dataType.image)
  return (
    <div className="article-detail-container">
      <h1 className="article-title">{article.title}</h1>
      <img src={article.hero} alt={article.title} className="article-hero" />
      <div
        className="article-author"
        onMouseEnter={() => setShowAuthorDetails(true)} // Show author details on hover
        onMouseLeave={() => setShowAuthorDetails(false)} // Hide author details on hover out
      >
        <p>
          Author: <strong>{article.author.authorName}</strong>
        </p>
        {showAuthorDetails && (
          <div className="author-hover-details">
            <img
              src={article.author.authorImage || 'https://via.placeholder.com/50'}
              alt={article.author.authorName}
              className="author-image"
            />
            <div
            className="article-description scrollable-description"
            dangerouslySetInnerHTML={{ __html: article.description }}
          ></div>          
          </div>
        )}
      </div>
      <h4 className="article-subtitle-container">
        <span className="article-subtitle">{article.Subtitle}</span>
      </h4>
      <div className="article-content">
        {article.articleType === dataType.image ? (
          <div
            className="article-description scrollable-description"
            dangerouslySetInnerHTML={{ __html: article.description }}
          ></div>
        ) : (
          <video controls className="article-video">
            <source src={article.hero} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="article-tags">
        {article.tags.map((tag, index) => (
          <button
            key={index}
            className="tag-button"
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      {filteredArticles.length > 0 && (
        <div className="filtered-articles">
          <h3>Articles with the selected tag:</h3>
          <ul>
            {filteredArticles.map((filteredArticle) => (
              <li key={filteredArticle.articleId}>
                <h4>{filteredArticle.title}</h4>
                <p>{filteredArticle.Subtitle}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ArticleDetailPage;
