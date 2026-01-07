// src/components/LifeDecision.jsx
import { useState, useEffect } from "react";
import { decisionCategories, badAdvice, wisdomQuotes, consequences } from "../data/decisions";
import "./LifeDecision.css";

function LifeDecision() {
  const [selectedCategory, setSelectedCategory] = useState('career');
  const [customQuestion, setCustomQuestion] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [currentAdvice, setCurrentAdvice] = useState(null);
  const [consequence, setConsequence] = useState("");
  const [wisdom, setWisdom] = useState("");
  const [isDeciding, setIsDeciding] = useState(false);
  const [decisionHistory, setDecisionHistory] = useState([]);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  // Initialize with random wisdom
  useEffect(() => {
    generateRandomWisdom();
  }, []);

  const currentCategory = decisionCategories.find(cat => cat.id === selectedCategory);

  const generateRandomWisdom = () => {
    const randomWisdom = wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];
    setWisdom(randomWisdom);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsCustomMode(false);
    setSelectedQuestion("");
    setCurrentAdvice(null);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setIsCustomMode(false);
    setCustomQuestion("");
  };

  const toggleCustomMode = () => {
    setIsCustomMode(!isCustomMode);
    setSelectedQuestion("");
    setCurrentAdvice(null);
  };

  const makeDecision = () => {
    if ((!selectedQuestion && !customQuestion.trim()) || isDeciding) return;

    setIsDeciding(true);
    setSpinCount(prev => prev + 1);

    // Get the question
    const question = isCustomMode ? customQuestion : selectedQuestion;

    // Random delay for dramatic effect
    setTimeout(() => {
      // Get random advice
      const randomAdvice = badAdvice[Math.floor(Math.random() * badAdvice.length)];
      setCurrentAdvice(randomAdvice);

      // Get random consequence
      const randomConsequence = consequences[Math.floor(Math.random() * consequences.length)];
      setConsequence(randomConsequence);

      // Generate new wisdom
      generateRandomWisdom();

      // Add to history
      const newDecision = {
        id: Date.now(),
        question: question,
        advice: randomAdvice.advice,
        category: currentCategory.name,
        emoji: currentCategory.emoji,
        timestamp: new Date().toLocaleTimeString(),
        type: randomAdvice.type
      };

      setDecisionHistory(prev => [newDecision, ...prev.slice(0, 7)]);

      // Reset animation
      setTimeout(() => setIsDeciding(false), 500);
    }, 1500);
  };

  const clearDecision = () => {
    setSelectedQuestion("");
    setCustomQuestion("");
    setCurrentAdvice(null);
    setConsequence("");
    setIsCustomMode(false);
  };

  const copyToClipboard = () => {
    if (!currentAdvice) return;
    
    const text = `Q: ${selectedQuestion || customQuestion}\nA: ${currentAdvice.advice}\n\nFrom Life Decision Maker 🤔`;
    navigator.clipboard.writeText(text);
    
    // Show feedback
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✅ Copied!';
      copyBtn.style.background = 'linear-gradient(45deg, #10b981, #34d399)';
      
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
      }, 2000);
    }
  };

  const getRandomQuestion = () => {
    const questions = currentCategory.questions;
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    if (isCustomMode) {
      setCustomQuestion(randomQuestion);
    } else {
      setSelectedQuestion(randomQuestion);
      setIsCustomMode(false);
    }
  };

  const removeFromHistory = (id) => {
    setDecisionHistory(prev => prev.filter(decision => decision.id !== id));
  };

  const clearHistory = () => {
    setDecisionHistory([]);
  };

  const getAdviceSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return '#86efac';
      case 'Medium': return '#fde047';
      case 'High': return '#fca5a5';
      case 'Critical': return '#f87171';
      default: return '#e5e7eb';
    }
  };

  return (
    <div className="decision-container">
      {/* Header */}
      <div className="decision-header">
        <h2 className="decision-title">
          <span className="title-emoji">🎯</span>
          Life Decision Maker
          <span className="title-emoji">🤔</span>
        </h2>
        <p className="decision-subtitle">
          Get terrible advice for your life's biggest dilemmas
        </p>
        
        {/* Wisdom Display */}
        <div className="wisdom-banner">
          <span className="wisdom-emoji">💭</span>
          <p className="wisdom-text">{wisdom}</p>
          <button 
            className="wisdom-refresh"
            onClick={generateRandomWisdom}
            title="More questionable wisdom"
          >
            🔄
          </button>
        </div>
      </div>

      <div className="decision-main">
        {/* Left Panel - Question Selection */}
        <div className="question-panel">
          <h3 className="panel-title">
            <span className="panel-emoji">❓</span>
            What's Your Dilemma?
          </h3>

          {/* Categories */}
          <div className="categories-section">
            <h4 className="section-title">
              <span className="section-emoji">📂</span>
              Life Categories
            </h4>
            <div className="categories-grid">
              {decisionCategories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ '--category-color': category.color }}
                >
                  <span className="category-emoji">{category.emoji}</span>
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.questions.length}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="questions-section">
            <div className="section-header">
              <h4 className="section-title">
                <span className="section-emoji">{currentCategory.emoji}</span>
                {currentCategory.name} Questions
              </h4>
              <button 
                className="random-question-btn"
                onClick={getRandomQuestion}
                title="Get random question"
              >
                🎲 Random
              </button>
            </div>
            
            <div className="questions-list">
              {currentCategory.questions.map((question, index) => (
                <button
                  key={index}
                  className={`question-btn ${selectedQuestion === question ? 'selected' : ''}`}
                  onClick={() => handleQuestionClick(question)}
                >
                  <span className="question-emoji">🤔</span>
                  <span className="question-text">{question}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Question */}
          <div className="custom-section">
            <div className="section-header">
              <h4 className="section-title">
                <span className="section-emoji">✏️</span>
                Custom Question
              </h4>
              <button 
                className={`custom-toggle ${isCustomMode ? 'active' : ''}`}
                onClick={toggleCustomMode}
              >
                {isCustomMode ? '📝 Custom' : '📋 Preset'}
              </button>
            </div>
            
            {isCustomMode ? (
              <div className="custom-input">
                <textarea
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Type your life dilemma here... e.g., 'Should I eat the last slice of pizza?'"
                  className="question-input"
                  rows="3"
                />
                <div className="input-hint">
                  The worse the question, the better the advice!
                </div>
              </div>
            ) : (
              <div className="custom-prompt">
                <p className="prompt-text">
                  Want advice on something specific? Switch to custom mode!
                </p>
              </div>
            )}
          </div>

          {/* Decision Button */}
          <div className="decision-action">
            <button 
              className={`decide-btn ${isDeciding ? 'deciding' : ''}`}
              onClick={makeDecision}
              disabled={(!selectedQuestion && !customQuestion.trim()) || isDeciding}
            >
              <span className="btn-emoji">
                {isDeciding ? '🌀' : '🎯'}
              </span>
              <span className="btn-text">
                {isDeciding ? 'Consulting the Oracle...' : 'Make My Decision!'}
              </span>
            </button>
            
            <button 
              className="clear-btn"
              onClick={clearDecision}
              disabled={!selectedQuestion && !customQuestion.trim()}
            >
              <span className="btn-emoji">🗑️</span>
              <span className="btn-text">Clear</span>
            </button>
          </div>
        </div>

        {/* Right Panel - Advice Display */}
        <div className="advice-panel">
          {/* Current Decision */}
          <div className={`advice-card ${isDeciding ? 'deciding' : ''}`}>
            <div className="advice-header">
              <h3 className="advice-title">
                <span className="advice-emoji">📜</span>
                The Verdict
              </h3>
              {currentAdvice && (
                <div 
                  className="advice-type"
                  style={{ backgroundColor: getAdviceSeverityColor(currentAdvice.severity) }}
                >
                  {currentAdvice.emoji} {currentAdvice.type}
                </div>
              )}
            </div>

            {!currentAdvice ? (
              <div className="empty-advice">
                <div className="empty-emoji">🤷‍♂️</div>
                <h4 className="empty-title">No Decision Yet</h4>
                <p className="empty-text">
                  Select a question and click "Make My Decision!" 
                  to receive terrible life advice.
                </p>
                <div className="empty-stats">
                  <div className="empty-stat">
                    <span className="stat-emoji">🎯</span>
                    <span className="stat-text">{spinCount} decisions made</span>
                  </div>
                  <div className="empty-stat">
                    <span className="stat-emoji">🤔</span>
                    <span className="stat-text">{decisionCategories.reduce((sum, cat) => sum + cat.questions.length, 0)} questions</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="advice-content">
                {/* Question */}
                <div className="question-display">
                  <div className="question-label">
                    <span className="label-emoji">❓</span>
                    Your Question:
                  </div>
                  <div className="question-text-display">
                    "{selectedQuestion || customQuestion}"
                  </div>
                  <div className="question-category">
                    <span className="category-emoji-small">{currentCategory.emoji}</span>
                    {currentCategory.name}
                  </div>
                </div>

                {/* Advice */}
                <div className="advice-display">
                  <div className="advice-label">
                    <span className="label-emoji">💡</span>
                    Terrible Advice:
                  </div>
                  <div className="advice-text">
                    "{currentAdvice.advice}"
                  </div>
                  <div className="advice-followup">
                    <span className="followup-emoji">↪️</span>
                    {currentAdvice.followUp}
                  </div>
                </div>

                {/* Consequence */}
                <div className="consequence-display">
                  <div className="consequence-label">
                    <span className="label-emoji">⚠️</span>
                    Likely Consequence:
                  </div>
                  <div className="consequence-text">{consequence}</div>
                </div>

                {/* Action Buttons */}
                <div className="advice-actions">
                  <button 
                    className="copy-btn"
                    onClick={copyToClipboard}
                  >
                    <span className="btn-emoji">📋</span>
                    <span className="btn-text">Copy Advice</span>
                  </button>
                  
                  <button 
                    className="new-decision-btn"
                    onClick={makeDecision}
                    disabled={isDeciding}
                  >
                    <span className="btn-emoji">🔄</span>
                    <span className="btn-text">New Decision</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Decision History */}
          {decisionHistory.length > 0 && (
            <div className="history-section">
              <div className="section-header">
                <h4 className="section-title">
                  <span className="section-emoji">🕒</span>
                  Decision History
                </h4>
                <button 
                  className="clear-history-btn"
                  onClick={clearHistory}
                  title="Clear all history"
                >
                  🗑️ Clear
                </button>
              </div>
              
              <div className="history-list">
                {decisionHistory.map(decision => (
                  <div key={decision.id} className="history-item">
                    <div className="history-header">
                      <span className="history-category">
                        {decision.emoji} {decision.category}
                      </span>
                      <span className="history-time">{decision.timestamp}</span>
                      <button 
                        className="remove-history-btn"
                        onClick={() => removeFromHistory(decision.id)}
                        title="Remove from history"
                      >
                        ❌
                      </button>
                    </div>
                    <div className="history-question">{decision.question}</div>
                    <div className="history-advice">"{decision.advice}"</div>
                    <div className="history-type">{decision.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="stats-footer">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{spinCount}</div>
            <div className="stat-label">Decisions Made</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{decisionHistory.length}</div>
            <div className="stat-label">In History</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{badAdvice.length}</div>
            <div className="stat-label">Bad Advice Types</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{decisionCategories.length}</div>
            <div className="stat-label">Life Categories</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="decision-footer">
        <div className="footer-content">
          <p className="footer-text">
            <span className="footer-emoji">⚠️</span>
            Disclaimer: This advice is 100% terrible. We take no responsibility for life choices made while laughing.
          </p>
          <p className="footer-tip">
            <span className="tip-emoji">💡</span>
            Pro Tip: When in doubt, blame the decision maker. (That's this app.)
          </p>
        </div>
      </div>
    </div>
  );
}

export default LifeDecision;