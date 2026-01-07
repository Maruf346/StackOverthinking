// src/pages/FakeProductivityPage.jsx
import FakeProductivity from '../components/FakeProductivity';
import './Page.css';

function FakeProductivityPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <FakeProductivity />
      </div>
    </div>
  );
}

export default FakeProductivityPage;