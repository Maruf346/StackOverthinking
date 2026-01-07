// src/components/FakeProductivity.jsx
import { useState, useEffect } from "react";
import { productivityLevels, fakeTasks, productivityHacks, motivationalQuotes } from "../data/productivity";
import "./FakeProductivity.css";

function FakeProductivity() {
  const [productivity, setProductivity] = useState(42);
  const [currentLevel, setCurrentLevel] = useState(productivityLevels[3]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [message, setMessage] = useState("");
  const [quote, setQuote] = useState("");
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    highestScore: 42,
    totalTimeWasted: 0
  });

  // Initialize with random quote
  useEffect(() => {
    generateRandomQuote();
    updateLevel(productivity);
  }, []);

  // Auto-increment productivity in auto mode
  useEffect(() => {
    let interval;
    if (isAutoMode) {
      interval = setInterval(() => {
        const increment = Math.floor(Math.random() * 5) + 1;
        const newProductivity = Math.min(productivity + increment, 110);
        setProductivity(newProductivity);
        updateLevel(newProductivity);
        
        // Add fake task every few increments
        if (Math.random() > 0.7) {
          const randomTask = fakeTasks[Math.floor(Math.random() * fakeTasks.length)];
          handleTaskClick(randomTask);
        }
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAutoMode, productivity]);

  const updateLevel = (value) => {
    const level = productivityLevels.reduce((prev, curr) => 
      value >= curr.level ? curr : prev
    );
    setCurrentLevel(level);
    
    // Update message
    const randomMessage = level.messages[Math.floor(Math.random() * level.messages.length)];
    setMessage(randomMessage);
  };

  const handleTaskClick = (task) => {
    if (selectedTasks.some(t => t.name === task.name)) return;
    
    setIsAnimating(true);
    const newTasks = [...selectedTasks, task];
    setSelectedTasks(newTasks);
    
    const newScore = newTasks.reduce((sum, t) => sum + t.value, 0);
    setTotalScore(newScore);
    
    const newProductivity = Math.min(42 + newScore, 110);
    setProductivity(newProductivity);
    updateLevel(newProductivity);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      tasksCompleted: prev.tasksCompleted + 1,
      highestScore: Math.max(prev.highestScore, newProductivity),
      totalTimeWasted: prev.totalTimeWasted + Math.floor(Math.random() * 30) + 5
    }));
    
    // Add to history
    setHistory(prev => [{
      task: task.name,
      score: task.value,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev.slice(0, 4)]);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const generateRandomQuote = () => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  };

  const resetProductivity = () => {
    setIsAnimating(true);
    setProductivity(42);
    setSelectedTasks([]);
    setTotalScore(0);
    updateLevel(42);
    generateRandomQuote();
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const randomizeProductivity = () => {
    setIsAnimating(true);
    const randomValue = Math.floor(Math.random() * 111);
    setProductivity(randomValue);
    setSelectedTasks([]);
    setTotalScore(0);
    updateLevel(randomValue);
    generateRandomQuote();
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toggleAutoMode = () => {
    setIsAutoMode(!isAutoMode);
    if (!isAutoMode) {
      setMessage("Auto-productivity mode activated! Sit back and relax!");
    } else {
      setMessage("Manual mode restored. Time to pretend to work again!");
    }
  };

  const getProgressWidth = () => {
    return Math.min((productivity / 110) * 100, 100);
  };

  const getAvailableTasks = () => {
    return fakeTasks.filter(task => !selectedTasks.some(t => t.name === task.name));
  };

  return (
    <div className="productivity-container">
      {/* Header */}
      <div className="productivity-header">
        <h2 className="productivity-title">
          <span className="title-emoji">📊</span>
          Fake Productivity Meter
          <span className="title-emoji">🎭</span>
        </h2>
        <p className="productivity-subtitle">
          Watch numbers go up while achieving absolutely nothing!
        </p>
        
        {/* Quote Display */}
        <div className="quote-banner">
          <span className="quote-emoji">💬</span>
          <p className="quote-text">{quote}</p>
          <button 
            className="quote-refresh"
            onClick={generateRandomQuote}
            title="New fake motivation"
          >
            🔄
          </button>
        </div>
      </div>

      <div className="productivity-main">
        {/* Left Panel - Meter & Controls */}
        <div className="meter-panel">
          {/* Productivity Meter */}
          <div className="meter-container">
            <div className="meter-header">
              <h3 className="meter-title">
                <span className="meter-emoji">⚡</span>
                Fake Productivity Meter
              </h3>
              <div className="meter-mode">
                {isAutoMode ? (
                  <span className="auto-badge">🤖 AUTO</span>
                ) : (
                  <span className="manual-badge">👨‍💼 MANUAL</span>
                )}
              </div>
            </div>
            
            <div className="meter-display">
              <div className="meter-value">
                <span className="value-number">{productivity}</span>
                <span className="value-unit">%</span>
              </div>
              <div className="meter-label">{currentLevel.name}</div>
              <div className="level-emoji">{currentLevel.emoji}</div>
            </div>
            
            {/* Progress Bar */}
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ 
                  width: `${getProgressWidth()}%`,
                  backgroundColor: currentLevel.color
                }}
              >
                <div className="progress-glow"></div>
              </div>
              <div className="progress-markers">
                {[0, 25, 50, 75, 100, 110].map((marker) => (
                  <div key={marker} className="progress-marker">
                    <div className="marker-line"></div>
                    <div className="marker-label">{marker}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message Display */}
            <div className="message-display">
              <div className="message-bubble">
                <span className="message-emoji">💭</span>
                <p className="message-text">{message}</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="control-buttons">
              <button 
                className={`control-btn boost-btn ${isAnimating ? 'animating' : ''}`}
                onClick={() => {
                  const newValue = Math.min(productivity + 15, 110);
                  setProductivity(newValue);
                  updateLevel(newValue);
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 300);
                }}
                disabled={isAutoMode}
              >
                <span className="btn-emoji">🚀</span>
                <span className="btn-text">Boost</span>
              </button>
              
              <button 
                className="control-btn random-btn"
                onClick={randomizeProductivity}
                disabled={isAutoMode}
              >
                <span className="btn-emoji">🎲</span>
                <span className="btn-text">Randomize</span>
              </button>
              
              <button 
                className={`control-btn auto-btn ${isAutoMode ? 'active' : ''}`}
                onClick={toggleAutoMode}
              >
                <span className="btn-emoji">{isAutoMode ? '⏸️' : '🤖'}</span>
                <span className="btn-text">
                  {isAutoMode ? 'Stop Auto' : 'Auto Mode'}
                </span>
              </button>
              
              <button 
                className="control-btn reset-btn"
                onClick={resetProductivity}
                disabled={isAutoMode}
              >
                <span className="btn-emoji">🔄</span>
                <span className="btn-text">Reset</span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <h4 className="stats-title">
              <span className="stats-emoji">📈</span>
              Fake Statistics
            </h4>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.tasksCompleted}</div>
                <div className="stat-label">Tasks "Done"</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.highestScore}%</div>
                <div className="stat-label">Highest Score</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.totalTimeWasted}m</div>
                <div className="stat-label">Time Wasted</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{totalScore}</div>
                <div className="stat-label">Task Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Tasks & Hacks */}
        <div className="tasks-panel">
          {/* Fake Tasks */}
          <div className="tasks-section">
            <h3 className="section-title">
              <span className="section-emoji">✅</span>
              Fake Productivity Tasks
              <span className="tasks-count">
                {selectedTasks.length}/{fakeTasks.length}
              </span>
            </h3>
            <p className="section-subtitle">
              Click tasks to increase your fake productivity score!
            </p>
            
            <div className="tasks-grid">
              {getAvailableTasks().map((task, index) => (
                <button
                  key={index}
                  className="task-card"
                  onClick={() => handleTaskClick(task)}
                  disabled={isAutoMode}
                  title={`+${task.value}% productivity`}
                >
                  <span className="task-emoji">{task.emoji}</span>
                  <span className="task-name">{task.name}</span>
                  <span className="task-value">+{task.value}%</span>
                </button>
              ))}
            </div>
            
            {selectedTasks.length > 0 && (
              <div className="selected-tasks">
                <h4 className="selected-title">
                  <span className="selected-emoji">📋</span>
                  Selected Tasks
                </h4>
                <div className="selected-list">
                  {selectedTasks.map((task, index) => (
                    <div key={index} className="selected-item">
                      <span className="item-emoji">{task.emoji}</span>
                      <span className="item-name">{task.name}</span>
                      <span className="item-value">+{task.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Productivity Hacks */}
          <div className="hacks-section">
            <h3 className="section-title">
              <span className="section-emoji">🎩</span>
              Fake Productivity Hacks
            </h3>
            <div className="hacks-list">
              {productivityHacks.map((hack, index) => (
                <div key={index} className="hack-card">
                  <div className="hack-header">
                    <span className="hack-emoji">{hack.emoji}</span>
                    <span className="hack-name">{hack.name}</span>
                    <span className="hack-effectiveness">{hack.effectiveness}</span>
                  </div>
                  <p className="hack-description">{hack.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel - History */}
      <div className="history-panel">
        <div className="history-section">
          <h3 className="section-title">
            <span className="section-emoji">🕒</span>
            Fake Productivity History
          </h3>
          
          {history.length === 0 ? (
            <div className="empty-history">
              <span className="empty-emoji">📭</span>
              <p className="empty-text">No fake productivity yet</p>
              <p className="empty-subtext">Start clicking tasks to build your history!</p>
            </div>
          ) : (
            <div className="history-list">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-time">{item.timestamp}</div>
                  <div className="history-task">
                    <span className="history-emoji">✅</span>
                    {item.task}
                  </div>
                  <div className="history-score">+{item.score}%</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="productivity-footer">
        <div className="footer-content">
          <p className="footer-text">
            <span className="footer-emoji">⚠️</span>
            This meter measures only fake productivity. Actual productivity may vary from 0% to "I'll do it tomorrow".
          </p>
          <p className="footer-tip">
            <span className="tip-emoji">💡</span>
            Pro Tip: The best productivity hack is convincing others you're productive.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FakeProductivity;