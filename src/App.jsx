// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import MotivationPage from "./pages/MotivationPage";
import DeveloperExcusePage from "./pages/DeveloperExcusePage";
import AmILatePage from "./pages/AmILatePage";
import FakeProductivityPage from "./pages/FakeProductivityPage";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/motivation" element={<MotivationPage />} />
          <Route path="/excuses" element={<DeveloperExcusePage />} />
          {/* Add more routes as you create pages */}
          <Route path="/late" element={<AmILatePage />} />
          <Route path="/productivity" element={<FakeProductivityPage />} />
          <Route path="/decisions" element={<div className="page-container"><h1>🎯 Life Decisions - Coming Soon!</h1></div>} />
          <Route path="/exam" element={<div className="page-container"><h1>📚 Exam Simulator - Coming Soon!</h1></div>} />
          <Route path="/sleep" element={<div className="page-container"><h1>😴 Sleep vs Study - Coming Soon!</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;