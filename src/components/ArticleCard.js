import React from 'react';
import TagButton from './TagButton';

function ArticleCard({ article, onClick, onTagClick }) {
  return (
    <div className="article-item" onClick={() => onClick(article.id)}>
      <div className="article-image">
        <img src={article.image} alt={article.title} />
      </div>
      <div className="article-content">
        <h3>{article.title}</h3>
        <p>Author: {article.author}</p>
        <p>Category: {article.category}</p>
        <div className="article-tags">
          {article.tags.map((tag, index) => (
            <TagButton key={index} tag={tag} onClick={(e) => onTagClick(e, tag)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
