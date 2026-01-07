// src/components/AmILate.jsx
import { useState, useEffect } from "react";
import { lateExcuses, responseTemplates, timeUnits, delayLevels } from "../data/lateExcuses";
import "./AmILate.css";

function AmILate() {
  const [timeInput, setTimeInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [excuse, setExcuse] = useState(null);
  const [response, setResponse] = useState("");
  const [delayTime, setDelayTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const generateLateResult = () => {
    if (!timeInput.trim()) return;
    
    setIsGenerating(true);
    setIsSubmitted(true);

    // Always select a random excuse
    const randomExcuse = lateExcuses[Math.floor(Math.random() * lateExcuses.length)];
    setExcuse(randomExcuse);

    // Generate random delay time
    const randomDelay = Math.floor(Math.random() * 120) + 5;
    const randomUnit = timeUnits[Math.floor(Math.random() * 3)]; // seconds, minutes, or hours
    
    let delayText;
    if (randomUnit === "seconds") {
      delayText = `${randomDelay} ${randomUnit}`;
    } else if (randomUnit === "minutes") {
      delayText = `${randomDelay} ${randomDelay === 1 ? "minute" : "minutes"}`;
    } else {
      delayText = `${randomDelay} ${randomDelay === 1 ? "hour" : "hours"}`;
    }
    setDelayTime(delayText);

    // Generate response
    const template = responseTemplates[Math.floor(Math.random() * responseTemplates.length)];
    const finalResponse = template.replace("{time}", delayText);
    setResponse(finalResponse);

    // Add to history
    setHistory(prev => [{
      inputTime: timeInput,
      excuse: randomExcuse,
      response: finalResponse,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev.slice(0, 4)]);

    // Reset animation
    setTimeout(() => setIsGenerating(false), 800);
  };

  const handleQuickTime = (time) => {
    setTimeInput(time);
  };

  const handleReset = () => {
    setTimeInput("");
    setIsSubmitted(false);
    setExcuse(null);
    setResponse("");
    setDelayTime("");
  };

  const copyToClipboard = () => {
    const text = `Am I late for ${timeInput}? ${response} ${excuse?.excuse}`;
    navigator.clipboard.writeText(text);
    
    // Show temporary feedback
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
      copyBtn.textContent = '✅ Copied!';
      setTimeout(() => {
        copyBtn.textContent = '📋 Copy Excuse';
      }, 2000);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="late-container">
      {/* Header */}
      <div className="late-header">
        <h2 className="late-title">
          <span className="title-emoji">⏰</span>
          Am I Late? Calculator
          <span className="title-emoji">🚨</span>
        </h2>
        <p className="late-subtitle">
          Spoiler: It's always yes, but with creative programmer excuses!
        </p>
        <div className="current-time-display">
          <div className="time-bubble">
            <span className="time-emoji">🕒</span>
            <span className="time-text">{formatTime(currentTime)}</span>
            <span className="date-text">{formatDate(currentTime)}</span>
          </div>
        </div>
      </div>

      <div className="late-main">
        {/* Left Panel - Input Section */}
        <div className="input-panel">
          <h3 className="panel-title">
            <span className="panel-emoji">📝</span>
            When were you supposed to be there?
          </h3>
          
          <div className="time-input-section">
            <div className="input-group">
              <label className="input-label">
                <span className="label-emoji">🎯</span>
                Enter Time:
              </label>
              <input
                type="text"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                placeholder="e.g., 9:00 AM or 'meeting'"
                className="time-input"
              />
              <div className="input-hint">
                Any time you enter will be considered late 😉
              </div>
            </div>

            {/* Quick Time Buttons */}
            <div className="quick-times">
              <h4 className="quick-title">
                <span className="quick-emoji">⚡</span>
                Quick Times:
              </h4>
              <div className="quick-buttons">
                <button 
                  className="quick-btn"
                  onClick={() => handleQuickTime(generateRandomTime())}
                >
                  🎲 Random Time
                </button>
                <button 
                  className="quick-btn"
                  onClick={() => handleQuickTime("9:00 AM")}
                >
                  ⏰ 9:00 AM
                </button>
                <button 
                  className="quick-btn"
                  onClick={() => handleQuickTime("2:00 PM")}
                >
                  🕑 2:00 PM
                </button>
                <button 
                  className="quick-btn"
                  onClick={() => handleQuickTime("Meeting")}
                >
                  👔 Meeting
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className={`submit-btn ${isGenerating ? 'generating' : ''}`}
                onClick={generateLateResult}
                disabled={!timeInput.trim() || isGenerating}
              >
                <span className="btn-emoji">🔍</span>
                <span className="btn-text">
                  {isGenerating ? 'Calculating...' : 'Am I Late?'}
                </span>
              </button>
              
              <button 
                className="reset-btn"
                onClick={handleReset}
              >
                <span className="btn-emoji">🔄</span>
                <span className="btn-text">Reset</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-section">
            <h4 className="stats-title">
              <span className="stats-emoji">📊</span>
              Late Statistics
            </h4>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{history.length}</div>
                <div className="stat-label">Times Late</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">100%</div>
                <div className="stat-label">Late Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">∞</div>
                <div className="stat-label">Total Delay</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="results-panel">
          <div className={`result-card ${isGenerating ? 'pulsing' : ''}`}>
            <div className="result-header">
              <h3 className="result-title">
                <span className="result-emoji">📋</span>
                The Verdict
              </h3>
              {excuse && (
                <div className={`severity-badge ${excuse.severity?.toLowerCase()}`}>
                  {delayLevels[excuse.severity]?.emoji || "😅"} 
                  {delayLevels[excuse.severity]?.message || "Running late!"}
                </div>
              )}
            </div>

            {!isSubmitted ? (
              <div className="empty-result">
                <div className="empty-emoji">⏳</div>
                <h4 className="empty-title">Waiting for your time...</h4>
                <p className="empty-text">
                  Enter a time above to find out how late you are! 
                  (Spoiler: You're definitely late)
                </p>
              </div>
            ) : (
              <div className="result-content">
                {/* User's Time */}
                <div className="time-display">
                  <div className="time-label">
                    <span className="label-emoji">🎯</span>
                    Your Time:
                  </div>
                  <div className="time-value">{timeInput}</div>
                </div>

                {/* Response */}
                <div className="response-display">
                  <div className="response-label">
                    <span className="label-emoji">📢</span>
                    Result:
                  </div>
                  <div className="response-value">
                    {response}
                  </div>
                </div>

                {/* Excuse */}
                {excuse && (
                  <div className="excuse-display">
                    <div className="excuse-header">
                      <span className="excuse-emoji">🎭</span>
                      <span className="excuse-title">Creative Excuse:</span>
                      <span className="excuse-category">
                        {excuse.emoji} {excuse.category}
                      </span>
                    </div>
                    <div className="excuse-text">"{excuse.excuse}"</div>
                    <div className="excuse-footer">
                      <span className="delay-info">
                        ⏱️ Added delay: {excuse.timeAdded}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="result-actions">
                  <button 
                    className="copy-btn"
                    onClick={copyToClipboard}
                    disabled={!isSubmitted}
                  >
                    📋 Copy Excuse
                  </button>
                  
                  <button 
                    className="new-excuse-btn"
                    onClick={generateLateResult}
                    disabled={!timeInput.trim()}
                  >
                    🎲 New Excuse
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* History Section */}
          {history.length > 0 && (
            <div className="history-section">
              <h4 className="history-title">
                <span className="history-emoji">🕒</span>
                Recent Lateness
              </h4>
              <div className="history-list">
                {history.map((item, index) => (
                  <div key={index} className="history-item">
                    <div className="history-header">
                      <span className="history-time">{item.inputTime}</span>
                      <span className="history-timestamp">{item.timestamp}</span>
                    </div>
                    <div className="history-excuse">{item.excuse.excuse}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="late-footer">
        <div className="footer-content">
          <p className="footer-text">
            <span className="footer-emoji">⚠️</span>
            This calculator has a 100% accuracy rate in determining lateness. 
            No time was measured accurately in the making.
          </p>
          <p className="footer-tip">
            <span className="tip-emoji">💡</span>
            Pro Tip: Always blame the internet. It never fights back.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AmILate;