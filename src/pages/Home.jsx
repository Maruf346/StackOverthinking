// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import '../App.css';

function Home() {
  const features = [
    {
      id: 'motivation',
      title: "😂 Anti-Motivation Generator",
      description: "Get reverse psychology that makes you question your life choices",
      emoji: "😂",
      color: "#FFD6D6",
      status: "Live",
      path: "/motivation"
    },
    {
      id: 'excuses',
      title: "🤓 Developer Excuse Generator",
      description: "Perfect excuses for missed deadlines and buggy code",
      emoji: "🤓",
      color: "#D6E4FF",
      status: "Live",
      path: "/excuses"
    },
    {
      id: 'late',
      title: "⏰ Am I Late? Calculator",
      description: "Spoiler: It's always yes, but with creative reasons",
      emoji: "⏰",
      color: "#FFF3CD",
      status: "Live",
      path: "/late"
    },
    {
      id: 'productivity',
      title: "📊 Fake Productivity Meter",
      description: "Watch numbers go up while achieving absolutely nothing",
      emoji: "📊",
      color: "#D5EDDB",
      status: "Live",
      path: "/productivity"
    },
    {
      id: 'decisions',
      title: "🎯 Life Decision Maker",
      description: "Get terrible advice for your life's biggest dilemmas",
      emoji: "🎯",
      color: "#E6D4FF",
      status: "Live",
      path: "/decisions"
    },
    {
      id: 'exam',
      title: "📚 Exam Panic Simulator",
      description: "Simulate the adrenaline of last-minute studying",
      emoji: "📚",
      color: "#FFE8CC",
      status: "Planned",
      path: "/exam"
    },
    {
      id: 'sleep',
      title: "😴 Sleep vs Study Battle",
      description: "Watch sleep always win over productivity",
      emoji: "😴",
      color: "#CCF2FF",
      status: "Idea",
      path: "/sleep"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">
            Welcome to <span className="hero-highlight">Useless Productivity</span> Land!
          </h2>
          <p className="hero-description">
            Where overthinking meets underachieving. Dive into our collection of 
            absolutely unnecessary tools that make you feel productive while 
            accomplishing nothing at all. Perfect for procrastinators!
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">0%</div>
              <div className="stat-label">Actual Productivity</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Fun Guaranteed</div>
            </div>
            <div className="stat">
              <div className="stat-number">∞</div>
              <div className="stat-label">Overthinking Power</div>
            </div>
          </div>
        </div>
        
        <div className="hero-emoji-cloud">
          <div className="emoji">🤯</div>
          <div className="emoji">💭</div>
          <div className="emoji">😅</div>
          <div className="emoji">🚀</div>
          <div className="emoji">📚</div>
          <div className="emoji">⚡</div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h3 className="section-title">✨ Featured Useless Tools</h3>
          <p className="section-subtitle">
            Click on any tool to start your journey of productive procrastination
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <Link to={feature.path} key={feature.id} className="feature-link"  style={{ textDecoration: 'none' }}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                emoji={feature.emoji}
                color={feature.color}
                status={feature.status}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-emoji">🚀💻🎯</div>
          <p className="footer-text">
            Made with ❤️ (and lots of overthinking) by developers for developers
          </p>
          <p className="footer-note">
            This app is 100% serious about being unserious. No productivity was harmed in the making.
          </p>
        </div>
      </footer>
      
      {/* Floating Emojis */}
      <div className="floating-emojis">
        <div className="floating-emoji">😅</div>
        <div className="floating-emoji">💭</div>
        <div className="floating-emoji">⚡</div>
        <div className="floating-emoji">🎯</div>
      </div>
    </div>
  );
}

export default Home;