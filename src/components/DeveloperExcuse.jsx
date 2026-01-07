// src/components/DeveloperExcuse.jsx
import { useState, useEffect } from "react";
import { developerExcuses, excuseCategories, severityLevels } from "../data/excuses";
import "./DeveloperExcuse.css";

function DeveloperExcuse() {
  const [currentExcuse, setCurrentExcuse] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [usedExcuses, setUsedExcuses] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Initialize with a random excuse
  useEffect(() => {
    generateRandomExcuse();
  }, []);

  const getFilteredExcuses = () => {
    if (selectedCategory === "All") return developerExcuses;
    return developerExcuses.filter(excuse => excuse.category === selectedCategory);
  };

  const generateRandomExcuse = () => {
    setIsGenerating(true);
    
    const filtered = getFilteredExcuses();
    const available = filtered.filter(e => !usedExcuses.includes(e.excuse));
    
    let randomExcuse;
    
    if (available.length > 0) {
      randomExcuse = available[Math.floor(Math.random() * available.length)];
    } else {
      // Reset used excuses if all have been used
      randomExcuse = filtered[Math.floor(Math.random() * filtered.length)];
      setUsedExcuses([]);
    }
    
    setCurrentExcuse(randomExcuse);
    setUsedExcuses(prev => [...prev, randomExcuse.excuse]);
    
    // Add to history
    setHistory(prev => [randomExcuse, ...prev.slice(0, 4)]);
    
    // Reset animation and copy status
    setTimeout(() => setIsGenerating(false), 500);
    setCopySuccess(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentExcuse.excuse)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
  };

  const toggleFavorite = (excuse) => {
    if (favorites.some(fav => fav.excuse === excuse.excuse)) {
      setFavorites(favorites.filter(fav => fav.excuse !== excuse.excuse));
    } else {
      setFavorites([...favorites, excuse]);
    }
  };

  const isFavorite = (excuse) => {
    return favorites.some(fav => fav.excuse === excuse.excuse);
  };

  const getExcuseCountByCategory = (category) => {
    if (category === "All") return developerExcuses.length;
    return developerExcuses.filter(e => e.category === category).length;
  };

  return (
    <div className="excuse-container">
      {/* Header Section */}
      <div className="excuse-header">
        <h2 className="excuse-title">
          <span className="title-emoji">🤓</span>
          Developer Excuse Generator
          <span className="title-emoji">💻</span>
        </h2>
        <p className="excuse-subtitle">
          Perfect excuses for missed deadlines and buggy code. Click to generate the perfect alibi!
        </p>
      </div>

      {/* Main Content */}
      <div className="excuse-main">
        {/* Left Panel - Categories */}
        <div className="categories-panel">
          <h3 className="panel-title">
            <span className="panel-emoji">📂</span>
            Excuse Categories
          </h3>
          <div className="categories-grid">
            {excuseCategories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="category-emoji">
                  {category === "All" ? "🌟" : 
                   category === "Classic" ? "🏆" :
                   category === "Technical" ? "⚙️" :
                   category === "Creative" ? "🎨" :
                   category === "Team" ? "👥" :
                   category === "Management" ? "👔" : "😴"}
                </span>
                <span className="category-name">{category}</span>
                <span className="category-count">{getExcuseCountByCategory(category)}</span>
              </button>
            ))}
          </div>

          {/* Stats Section */}
          <div className="stats-panel">
            <h4 className="stats-title">
              <span className="stats-emoji">📊</span>
              Stats
            </h4>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{usedExcuses.length}</div>
                <div className="stat-label">Used Today</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{developerExcuses.length}</div>
                <div className="stat-label">Total Excuses</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{favorites.length}</div>
                <div className="stat-label">Favorites</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Excuse Display */}
        <div className="excuse-display-panel">
          <div className={`excuse-card ${isGenerating ? 'generating' : ''}`}>
            <div className="excuse-card-header">
              <div className="excuse-meta">
                <span className={`severity-badge ${currentExcuse.severity?.toLowerCase()}`}>
                  {severityLevels[currentExcuse.severity] || "🟢 Low Impact"}
                </span>
                <span className="category-badge">
                  {currentExcuse.emoji} {currentExcuse.category}
                </span>
              </div>
              <button 
                className={`favorite-btn ${isFavorite(currentExcuse) ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(currentExcuse)}
                title={isFavorite(currentExcuse) ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite(currentExcuse) ? "❤️" : "🤍"}
              </button>
            </div>

            <div className="excuse-content">
              <div className="excuse-text">
                "{currentExcuse.excuse || "Click generate to get your first excuse!"}"
              </div>
            </div>

            <div className="excuse-card-footer">
              <div className="action-buttons">
                <button 
                  className={`generate-btn ${isGenerating ? 'loading' : ''}`}
                  onClick={generateRandomExcuse}
                  disabled={isGenerating}
                >
                  <span className="btn-emoji">🎲</span>
                  <span className="btn-text">
                    {isGenerating ? 'Generating...' : 'Generate Excuse'}
                  </span>
                </button>
                
                <button 
                  className={`copy-btn ${copySuccess ? 'success' : ''}`}
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                >
                  <span className="btn-emoji">{copySuccess ? '✅' : '📋'}</span>
                  <span className="btn-text">
                    {copySuccess ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* History Section */}
          {history.length > 0 && (
            <div className="history-section">
              <h4 className="history-title">
                <span className="history-emoji">🕒</span>
                Recent Excuses
              </h4>
              <div className="history-list">
                {history.map((excuse, index) => (
                  <div key={index} className="history-item">
                    <span className="history-emoji-small">{excuse.emoji}</span>
                    <span className="history-text">{excuse.excuse}</span>
                    <button 
                      className="history-favorite-btn"
                      onClick={() => toggleFavorite(excuse)}
                      title={isFavorite(excuse) ? "Remove favorite" : "Add to favorites"}
                    >
                      {isFavorite(excuse) ? "❤️" : "🤍"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Favorites */}
        <div className="favorites-panel">
          <h3 className="panel-title">
            <span className="panel-emoji">⭐</span>
            Favorite Excuses
          </h3>
          
          {favorites.length === 0 ? (
            <div className="empty-favorites">
              <span className="empty-emoji">📭</span>
              <p className="empty-text">No favorites yet</p>
              <p className="empty-subtext">Click the heart to save excuses!</p>
            </div>
          ) : (
            <div className="favorites-list">
              {favorites.map((excuse, index) => (
                <div key={index} className="favorite-item">
                  <div className="favorite-header">
                    <span className="favorite-emoji">{excuse.emoji}</span>
                    <span className="favorite-category">{excuse.category}</span>
                    <button 
                      className="remove-favorite-btn"
                      onClick={() => toggleFavorite(excuse)}
                      title="Remove from favorites"
                    >
                      ❌
                    </button>
                  </div>
                  <p className="favorite-excuse">"{excuse.excuse}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="excuse-footer">
        <p className="footer-tip">
          <span className="tip-emoji">💡</span>
          Pro Tip: Use these excuses responsibly. Or don't. We're not your boss!
        </p>
      </div>
    </div>
  );
}

export default DeveloperExcuse;