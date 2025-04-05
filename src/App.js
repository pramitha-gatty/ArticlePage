import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import './styles/ArticleDetailPage.css'; // Import the new styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/article/:articleId" element={<ArticleDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;