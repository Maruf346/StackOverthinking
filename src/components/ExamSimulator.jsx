// src/components/ExamSimulator.jsx
import { useState, useEffect } from "react";
import { examSubjects, panicLevels, examStatuses, procrastinationActivities, examTips } from "../data/examData";
import "./ExamSimulator.css";

function ExamSimulator() {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [studyHours, setStudyHours] = useState(0);
  const [daysUntilExam, setDaysUntilExam] = useState(7);
  const [panicLevel, setPanicLevel] = useState(panicLevels[2]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [procrastinationTime, setProcrastinationTime] = useState(0);
  const [procrastinationLog, setProcrastinationLog] = useState([]);
  const [isStudying, setIsStudying] = useState(false);
  const [isProcrastinating, setIsProcrastinating] = useState(false);
  const [examHistory, setExamHistory] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isExamDay, setIsExamDay] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [examScore, setExamScore] = useState(0);

  // Initialize with random status
  useEffect(() => {
    updateStatus();
    const savedHistory = localStorage.getItem('examHistory');
    if (savedHistory) {
      setExamHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Timer for study/procrastination sessions
  useEffect(() => {
    let interval;
    if (isStudying || isProcrastinating) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev >= 59) {
            // Every minute, update stats
            if (isStudying) {
              setStudyHours(prev => prev + 1);
              updatePanicLevel();
              updateStatus();
            } else if (isProcrastinating) {
              setProcrastinationTime(prev => prev + 1);
              addProcrastinationActivity();
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000); // 1 second for visual effect
    }
    return () => clearInterval(interval);
  }, [isStudying, isProcrastinating]);

  const currentSubject = examSubjects.find(sub => sub.id === selectedSubject);

  const updatePanicLevel = () => {
    const hoursPerDay = studyHours / Math.max(daysUntilExam, 1);
    const procrastinationRatio = procrastinationTime / Math.max(studyHours, 1);
    
    let calculatedPanic = 50; // Base panic
    
    // Adjust based on factors
    if (daysUntilExam <= 1) calculatedPanic += 40;
    if (daysUntilExam <= 0) calculatedPanic += 50;
    if (hoursPerDay < 2) calculatedPanic += 20;
    if (procrastinationRatio > 2) calculatedPanic += 30;
    if (currentSubject.difficulty === 'Very Hard') calculatedPanic += 20;
    if (currentSubject.difficulty === 'Hard') calculatedPanic += 10;

    calculatedPanic = Math.min(Math.max(calculatedPanic, 0), 100);
    
    // Find matching panic level
    const level = panicLevels.reduce((prev, curr) => 
      calculatedPanic >= curr.level ? curr : prev
    );
    setPanicLevel(level);
  };

  const updateStatus = () => {
    const randomStatus = examStatuses[Math.floor(Math.random() * examStatuses.length)];
    setCurrentStatus(randomStatus);
  };

  const addProcrastinationActivity = () => {
    if (Math.random() > 0.7 && procrastinationActivities.length > 0) {
      const randomActivity = procrastinationActivities[
        Math.floor(Math.random() * procrastinationActivities.length)
      ];
      
      // Check if activity already logged recently
      if (!procrastinationLog.some(log => log.name === randomActivity.name)) {
        setProcrastinationLog(prev => [randomActivity, ...prev.slice(0, 4)]);
      }
    }
  };

  const startStudySession = () => {
    if (isProcrastinating) return;
    setIsStudying(true);
    setIsProcrastinating(false);
    updateStatus();
  };

  const startProcrastination = () => {
    if (isStudying) return;
    setIsProcrastinating(true);
    setIsStudying(false);
    updateStatus();
  };

  const stopSession = () => {
    setIsStudying(false);
    setIsProcrastinating(false);
  };

  const advanceDay = () => {
    if (daysUntilExam <= 0) return;
    
    setDaysUntilExam(prev => {
      const newDays = prev - 1;
      
      if (newDays <= 0) {
        setIsExamDay(true);
        simulateExam();
        return 0;
      }
      
      return newDays;
    });
    
    updatePanicLevel();
    updateStatus();
  };

  const simulateExam = () => {
    setIsExamDay(true);
    stopSession();
    
    // Calculate score based on preparation
    const studyEffectiveness = Math.min(studyHours / 20, 1); // Max 20 hours optimal
    const procrastinationPenalty = procrastinationTime / 10;
    const difficultyMultiplier = 
      currentSubject.difficulty === 'Very Hard' ? 0.7 :
      currentSubject.difficulty === 'Hard' ? 0.8 :
      currentSubject.difficulty === 'Medium' ? 0.9 : 1;
    
    let score = Math.floor(
      (studyEffectiveness * 100 * difficultyMultiplier) - 
      (procrastinationPenalty * 10)
    );
    
    score = Math.min(Math.max(score, 0), 100);
    setExamScore(score);
    
    // Add to history
    const examResult = {
      id: Date.now(),
      subject: currentSubject.name,
      emoji: currentSubject.emoji,
      score: score,
      studyHours: studyHours,
      procrastinationTime: procrastinationTime,
      panicLevel: panicLevel.name,
      date: new Date().toLocaleDateString()
    };
    
    const newHistory = [examResult, ...examHistory.slice(0, 4)];
    setExamHistory(newHistory);
    localStorage.setItem('examHistory', JSON.stringify(newHistory));
    
    // Show results after delay
    setTimeout(() => {
      setShowResults(true);
    }, 2000);
  };

  const resetSimulation = () => {
    setStudyHours(0);
    setDaysUntilExam(7);
    setProcrastinationTime(0);
    setProcrastinationLog([]);
    setTimer(0);
    setIsStudying(false);
    setIsProcrastinating(false);
    setIsExamDay(false);
    setShowResults(false);
    setExamScore(0);
    updatePanicLevel();
    updateStatus();
  };

  const changeSubject = (subjectId) => {
    setSelectedSubject(subjectId);
    resetSimulation();
  };

  const getStudyRecommendation = () => {
    if (daysUntilExam <= 0) return "Too late! The exam is here!";
    
    const hoursNeeded = 20; // Arbitrary "well-prepared" hours
    const hoursPerDay = hoursNeeded / daysUntilExam;
    
    if (studyHours >= hoursNeeded) {
      return "You're over-prepared! Take a break!";
    } else if (hoursPerDay > 8) {
      return "Impossible! Consider dropping out!";
    } else if (hoursPerDay > 4) {
      return "Cram mode! Good luck with that!";
    } else if (hoursPerDay > 2) {
      return "Manageable panic. You got this!";
    } else {
      return "Relaxed schedule. Maybe too relaxed?";
    }
  };

  const getResultMessage = () => {
    if (examScore >= 90) return "Academic god! Show-off!";
    if (examScore >= 80) return "Brilliant! Pure luck, probably.";
    if (examScore >= 70) return "Solid pass! Celebration time!";
    if (examScore >= 60) return "Barely passed! Phew!";
    if (examScore >= 50) return "Passed by the skin of your teeth!";
    if (examScore >= 40) return "Failed, but the curve might save you!";
    if (examScore >= 30) return "Failed spectacularly! New record!";
    if (examScore >= 20) return "Epic fail! Parents will be proud!";
    if (examScore >= 10) return "Catastrophic failure! Legendary!";
    return "Zero? Did you even try?";
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="exam-container">
      {/* Header */}
      <div className="exam-header">
        <h2 className="exam-title">
          <span className="title-emoji">📚</span>
          Exam Panic Simulator
          <span className="title-emoji">😰</span>
        </h2>
        <p className="exam-subtitle">
          Simulate the adrenaline of last-minute studying and inevitable panic!
        </p>
        
        {/* Countdown Banner */}
        <div className="countdown-banner">
          <div className="countdown-item">
            <span className="countdown-emoji">📅</span>
            <span className="countdown-label">Exam in:</span>
            <span className="countdown-value">{daysUntilExam} days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-emoji">⏰</span>
            <span className="countdown-label">Study Time:</span>
            <span className="countdown-value">{formatTime(studyHours * 60)}</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-emoji">😴</span>
            <span className="countdown-label">Procrastination:</span>
            <span className="countdown-value">{formatTime(procrastinationTime * 60)}</span>
          </div>
        </div>
      </div>

      <div className="exam-main">
        {/* Left Panel - Subject & Controls */}
        <div className="control-panel">
          {/* Subject Selection */}
          <div className="subject-section">
            <h3 className="panel-title">
              <span className="panel-emoji">🎯</span>
              Select Your Doom
            </h3>
            <div className="subjects-grid">
              {examSubjects.map(subject => (
                <button
                  key={subject.id}
                  className={`subject-btn ${selectedSubject === subject.id ? 'active' : ''}`}
                  onClick={() => changeSubject(subject.id)}
                  style={{ '--subject-color': subject.color }}
                >
                  <span className="subject-emoji">{subject.emoji}</span>
                  <span className="subject-name">{subject.name}</span>
                  <span className="subject-difficulty">{subject.difficulty}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Subject Info */}
          <div className="subject-info">
            <div className="info-header">
              <div className="subject-display">
                <span className="subject-icon">{currentSubject.emoji}</span>
                <div>
                  <h4 className="subject-title">{currentSubject.name}</h4>
                  <div className="subject-meta">
                    <span className="difficulty-badge">{currentSubject.difficulty}</span>
                    <span className="topics-count">{currentSubject.topics.length} topics</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="topics-list">
              <h5 className="topics-title">
                <span className="topics-emoji">📝</span>
                Topics to Panic About:
              </h5>
              <div className="topics-grid">
                {currentSubject.topics.map((topic, index) => (
                  <div key={index} className="topic-item">
                    <span className="topic-emoji">😨</span>
                    <span className="topic-text">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Study Controls */}
          <div className="controls-section">
            <h3 className="panel-title">
              <span className="panel-emoji">⚙️</span>
              Simulation Controls
            </h3>
            
            <div className="control-buttons">
              <button 
                className={`control-btn study-btn ${isStudying ? 'active' : ''}`}
                onClick={startStudySession}
                disabled={isExamDay || isStudying}
              >
                <span className="btn-emoji">📖</span>
                <span className="btn-text">
                  {isStudying ? `Studying... ${timer}s` : 'Start Studying'}
                </span>
              </button>
              
              <button 
                className={`control-btn procrastinate-btn ${isProcrastinating ? 'active' : ''}`}
                onClick={startProcrastination}
                disabled={isExamDay || isProcrastinating}
              >
                <span className="btn-emoji">😴</span>
                <span className="btn-text">
                  {isProcrastinating ? `Procrastinating... ${timer}s` : 'Procrastinate'}
                </span>
              </button>
              
              <button 
                className="control-btn advance-btn"
                onClick={advanceDay}
                disabled={isStudying || isProcrastinating || isExamDay}
              >
                <span className="btn-emoji">⏭️</span>
                <span className="btn-text">Advance Day</span>
              </button>
              
              <button 
                className="control-btn reset-btn"
                onClick={resetSimulation}
                disabled={isStudying || isProcrastinating}
              >
                <span className="btn-emoji">🔄</span>
                <span className="btn-text">Reset</span>
              </button>
            </div>
            
            <div className="study-recommendation">
              <span className="recommendation-emoji">💡</span>
              <span className="recommendation-text">{getStudyRecommendation()}</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Status & Results */}
        <div className="status-panel">
          {/* Panic Meter */}
          <div className="panic-meter-section">
            <h3 className="section-title">
              <span className="section-emoji">😰</span>
              Panic Meter
            </h3>
            
            <div className="panic-meter-container">
              <div className="meter-display">
                <div className="meter-value">
                  <span className="value-number">{panicLevel.level}</span>
                  <span className="value-unit">%</span>
                </div>
                <div className="meter-label">{panicLevel.name}</div>
                <div className="meter-emoji">{panicLevel.emoji}</div>
              </div>
              
              <div className="progress-container">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: `${panicLevel.level}%`,
                    backgroundColor: panicLevel.color
                  }}
                >
                  <div className="progress-glow"></div>
                </div>
                <div className="progress-markers">
                  {[0, 25, 50, 75, 100].map((marker) => (
                    <div key={marker} className="progress-marker">
                      <div className="marker-line"></div>
                      <div className="marker-label">{marker}%</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="panic-status">
                <span className="status-emoji">📢</span>
                <span className="status-text">{panicLevel.status}</span>
              </div>
              
              <div className="panic-actions">
                <h5 className="actions-title">
                  <span className="actions-emoji">🎭</span>
                  Current Panic Actions:
                </h5>
                <div className="actions-list">
                  {panicLevel.actions.map((action, index) => (
                    <div key={index} className="action-item">
                      <span className="action-emoji">→</span>
                      <span className="action-text">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="status-section">
            <h3 className="section-title">
              <span className="section-emoji">📋</span>
              Exam Status
            </h3>
            
            <div className="status-card">
              <div className="status-header">
                <span className="status-emoji-big">📚</span>
                <div className="status-info">
                  <h4 className="status-title">{currentSubject.name} Exam</h4>
                  <div className="status-meta">
                    <span className="meta-item">
                      <span className="meta-emoji">📅</span>
                      {daysUntilExam === 0 ? "TODAY!" : `${daysUntilExam} days left`}
                    </span>
                    <span className="meta-item">
                      <span className="meta-emoji">⏰</span>
                      {formatTime(studyHours * 60)} studied
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="status-message">
                <span className="message-emoji">💭</span>
                <p className="message-text">{currentStatus}</p>
              </div>
              
              <button 
                className="refresh-status"
                onClick={updateStatus}
                title="New status"
              >
                🔄 New Status
              </button>
            </div>
          </div>

          {/* Procrastination Log */}
          {procrastinationLog.length > 0 && (
            <div className="procrastination-section">
              <h3 className="section-title">
                <span className="section-emoji">😴</span>
                Procrastination Log
              </h3>
              
              <div className="procrastination-list">
                {procrastinationLog.map((activity, index) => (
                  <div key={index} className="procrastination-item">
                    <span className="activity-emoji">{activity.emoji}</span>
                    <div className="activity-info">
                      <span className="activity-name">{activity.name}</span>
                      <span className="activity-time">{activity.time} wasted</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Panel - Exam Tips & History */}
      <div className="bottom-panel">
        {/* Exam Tips */}
        <div className="tips-section">
          <h3 className="section-title">
            <span className="section-emoji">🎓</span>
            Terrible Exam Tips
          </h3>
          
          <div className="tips-grid">
            {examTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-header">
                  <span className="tip-emoji">{tip.emoji}</span>
                  <span className="tip-effectiveness">{tip.effectiveness} effective</span>
                </div>
                <p className="tip-text">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exam History */}
        {examHistory.length > 0 && (
          <div className="history-section">
            <div className="section-header">
              <h3 className="section-title">
                <span className="section-emoji">📊</span>
                Exam History
              </h3>
              <button 
                className="clear-history"
                onClick={() => {
                  setExamHistory([]);
                  localStorage.removeItem('examHistory');
                }}
                title="Clear history"
              >
                🗑️ Clear
              </button>
            </div>
            
            <div className="history-grid">
              {examHistory.map(exam => (
                <div key={exam.id} className="history-card">
                  <div className="history-header">
                    <span className="history-emoji">{exam.emoji}</span>
                    <span className="history-subject">{exam.subject}</span>
                    <span className="history-date">{exam.date}</span>
                  </div>
                  
                  <div className="history-score">
                    <div className="score-value">{exam.score}%</div>
                    <div className="score-label">Final Score</div>
                  </div>
                  
                  <div className="history-stats">
                    <div className="stat-item">
                      <span className="stat-emoji">📖</span>
                      <span className="stat-value">{exam.studyHours}h</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-emoji">😴</span>
                      <span className="stat-value">{exam.procrastinationTime}h</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-emoji">😰</span>
                      <span className="stat-value">{exam.panicLevel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Exam Day Modal */}
      {isExamDay && (
        <div className="exam-day-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">
                <span className="modal-emoji">📝</span>
                EXAM DAY!
                <span className="modal-emoji">😱</span>
              </h3>
              <p className="modal-subtitle">The moment of truth has arrived!</p>
            </div>
            
            {!showResults ? (
              <div className="modal-exam">
                <div className="exam-animation">
                  <div className="animation-emoji">✍️</div>
                  <div className="animation-text">Taking Exam...</div>
                  <div className="loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
                <p className="exam-message">
                  Good luck! Remember: C's get degrees!
                </p>
              </div>
            ) : (
              <div className="modal-results">
                <div className="results-header">
                  <h4 className="results-title">Exam Results</h4>
                  <div className="results-score">
                    <span className="score-value">{examScore}%</span>
                    <span className="score-label">Final Grade</span>
                  </div>
                </div>
                
                <div className="results-message">
                  <span className="message-emoji">📢</span>
                  <p className="message-text">{getResultMessage()}</p>
                </div>
                
                <div className="results-stats">
                  <div className="result-stat">
                    <span className="stat-label">Study Hours:</span>
                    <span className="stat-value">{studyHours}h</span>
                  </div>
                  <div className="result-stat">
                    <span className="stat-label">Procrastination:</span>
                    <span className="stat-value">{procrastinationTime}h</span>
                  </div>
                  <div className="result-stat">
                    <span className="stat-label">Panic Level:</span>
                    <span className="stat-value">{panicLevel.name}</span>
                  </div>
                  <div className="result-stat">
                    <span className="stat-label">Subject:</span>
                    <span className="stat-value">{currentSubject.name}</span>
                  </div>
                </div>
                
                <div className="results-actions">
                  <button 
                    className="results-btn new-exam"
                    onClick={resetSimulation}
                  >
                    <span className="btn-emoji">🔄</span>
                    <span className="btn-text">New Exam</span>
                  </button>
                  <button 
                    className="results-btn celebrate"
                    onClick={() => setIsExamDay(false)}
                  >
                    <span className="btn-emoji">🎉</span>
                    <span className="btn-text">Celebrate Anyway</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="exam-footer">
        <div className="footer-content">
          <p className="footer-text">
            <span className="footer-emoji">⚠️</span>
            This simulator accurately captures 99% of student exam experiences. The other 1% are lying.
          </p>
          <p className="footer-tip">
            <span className="tip-emoji">💡</span>
            Pro Tip: Panic early, panic often. It builds character!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExamSimulator;