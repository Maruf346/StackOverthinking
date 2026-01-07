// components/Header.jsx
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();
  
  const navItems = [
    { id: 'home', name: 'Home', emoji: '🏠', path: '/' },
    { id: 'motivation', name: 'Anti-Motivation', emoji: '😂', path: '/motivation' },
    { id: 'excuses', name: 'Dev Excuses', emoji: '🤓', path: '/excuses' },
    { id: 'late', name: 'Am I Late?', emoji: '⏰', path: '/late' },
    { id: 'productivity', name: 'Fake Productivity', emoji: '📊', path: '/productivity' },
    { id: 'decisions', name: 'Life Decisions', emoji: '🎯', path: '/decisions' },
    { id: 'exam', name: 'Exam Simulator', emoji: '📚', path: '/exam' },
    { id: 'sleep', name: 'Sleep vs Study', emoji: '😴', path: '/sleep' }
  ];

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-container">
          <div className="logo-emoji">🤯</div>
          <div className="logo-text">
            <NavLink to="/" className="logo-link">
              <h1 className="logo-title">StackOverThinking</h1>
            </NavLink>
          </div>
          <div className="logo-emoji">💭</div>
        </div>
        
        <div className="header-quote">
          <p>🚀 Because overthinking is our superpower!</p>
        </div>
      </div>

      <nav className="nav-container">
        <div className="nav-scroll">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => 
                `nav-button ${isActive ? 'active' : ''}`
              }
              title={item.name}
            >
              <span className="nav-emoji">{item.emoji}</span>
              <span className="nav-text">{item.name}</span>
            </NavLink>
          ))}
        </div>
        <div className="nav-indicator"></div>
      </nav>
    </header>
  );
}

export default Header;