// components/Header.jsx
import { useState } from 'react';
import './Header.css';

function Header() {
  const [activeFeature, setActiveFeature] = useState('home');
  
  const features = [
    { id: 'home', name: '🏠 Home', emoji: '🏠' },
    { id: 'motivation', name: '😂 Anti-Motivation', emoji: '😂' },
    { id: 'excuses', name: '🤓 Dev Excuses', emoji: '🤓' },
    { id: 'late', name: '⏰ Am I Late?', emoji: '⏰' },
    { id: 'productivity', name: '📊 Fake Productivity', emoji: '📊' },
    { id: 'decisions', name: '🎯 Life Decisions', emoji: '🎯' },
    { id: 'exam', name: '📚 Exam Simulator', emoji: '📚' },
    { id: 'sleep', name: '😴 Sleep vs Study', emoji: '😴' }
  ];

  const handleFeatureClick = (featureId) => {
    setActiveFeature(featureId);
    // Scroll to feature section
    const element = document.getElementById(featureId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-container">
          <div className="logo-emoji">🤯</div>
          <div className="logo-text">
            <h1 className="logo-title">StackOverThinking</h1>
            <p className="logo-subtitle">Your daily dose of useless productivity</p>
          </div>
          <div className="logo-emoji">💭</div>
        </div>
        
        <div className="header-quote">
          <p>🚀 Because overthinking is our superpower!</p>
        </div>
      </div>

      <nav className="nav-container">
        <div className="nav-scroll">
          {features.map((feature) => (
            <button
              key={feature.id}
              className={`nav-button ${activeFeature === feature.id ? 'active' : ''}`}
              onClick={() => handleFeatureClick(feature.id)}
              title={feature.name}
            >
              <span className="nav-emoji">{feature.emoji}</span>
              <span className="nav-text">{feature.name}</span>
            </button>
          ))}
        </div>
        <div className="nav-indicator"></div>
      </nav>

      <div className="header-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgba(255,255,255,0.7)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </header>
  );
}

export default Header;