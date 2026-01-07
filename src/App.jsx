// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import MotivationPage from "./pages/MotivationPage";
import DeveloperExcusePage from "./pages/DeveloperExcusePage";
import AmILatePage from "./pages/AmILatePage";
import FakeProductivityPage from "./pages/FakeProductivityPage";
import LifeDecisionPage from "./pages/LifeDecisionPage";
import ExamSimulatorPage from "./pages/ExamSimulatorPage";
import SleepVsStudyPage from "./pages/SleepVsStudyPage";
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
          <Route path="/decisions" element={<LifeDecisionPage />} />
          <Route path="/exam" element={<ExamSimulatorPage />} />
          <Route path="/sleep" element={<SleepVsStudyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;