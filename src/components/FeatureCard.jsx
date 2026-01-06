// components/FeatureCard.jsx
import './FeatureCard.css';

function FeatureCard({ title, description, emoji, color, status = "Live" }) {
  const statusColors = {
    'Live': '#10b981',
    'Coming Soon': '#f59e0b',
    'In Development': '#3b82f6',
    'Planned': '#8b5cf6',
    'Idea': '#94a3b8'
  };

  return (
    <div className="feature-card" style={{ '--card-bg': color }}>
      <div className="card-header">
        <div className="card-emoji">{emoji}</div>
        <span className="card-status" style={{ backgroundColor: statusColors[status] }}>
          {status}
        </span>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
      
      <div className="card-footer">
        <button className="card-button">
          <span className="button-text">Try Now</span>
          <span className="button-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

export default FeatureCard;