// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import MotivationPage from "./pages/MotivationPage";
import DeveloperExcusePage from "./pages/DeveloperExcusePage";
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
          <Route path="/late" element={<div className="page-container"><h1>⏰ Am I Late? - Coming Soon!</h1></div>} />
          <Route path="/productivity" element={<div className="page-container"><h1>📊 Fake Productivity - Coming Soon!</h1></div>} />
          <Route path="/decisions" element={<div className="page-container"><h1>🎯 Life Decisions - Coming Soon!</h1></div>} />
          <Route path="/exam" element={<div className="page-container"><h1>📚 Exam Simulator - Coming Soon!</h1></div>} />
          <Route path="/sleep" element={<div className="page-container"><h1>😴 Sleep vs Study - Coming Soon!</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;