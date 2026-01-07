// src/components/SleepVsStudy.jsx
import { useState, useEffect } from "react";
import { 
  sleepCharacters, 
  studyCharacters, 
  battleQuotes, 
  sleepAdvantages, 
  studyDisadvantages, 
  battleOutcomes,
  sleepFacts
} from "../data/sleepStudyData";
import "./SleepVsStudy.css";

function SleepVsStudy() {
  const [selectedSleep, setSelectedSleep] = useState(sleepCharacters[0]);
  const [selectedStudy, setSelectedStudy] = useState(studyCharacters[0]);
  const [sleepHP, setSleepHP] = useState(100);
  const [studyHP, setStudyHP] = useState(100);
  const [isBattling, setIsBattling] = useState(false);
  const [battleLog, setBattleLog] = useState([]);
  const [battleCount, setBattleCount] = useState(0);
  const [sleepWins, setSleepWins] = useState(0);
  const [currentQuote, setCurrentQuote] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [battleSpeed, setBattleSpeed] = useState(1);
  const [autoBattle, setAutoBattle] = useState(false);
  const [battleHistory, setBattleHistory] = useState([]);
  const [sleepFact, setSleepFact] = useState("");

  // Initialize
  useEffect(() => {
    resetBattle();
    generateSleepFact();
  }, []);

  // Auto battle mode
  useEffect(() => {
    let interval;
    if (autoBattle && !isBattling) {
      interval = setInterval(() => {
        startBattle();
      }, 3000 / battleSpeed);
    }
    return () => clearInterval(interval);
  }, [autoBattle, isBattling, battleSpeed]);

  const generateSleepFact = () => {
    const randomFact = sleepFacts[Math.floor(Math.random() * sleepFacts.length)];
    setSleepFact(randomFact);
  };

  const resetBattle = () => {
    setSleepHP(selectedSleep.health);
    setStudyHP(selectedStudy.health);
    setBattleLog([]);
    setIsBattling(false);
    setShowResults(false);
    setCurrentQuote("");
  };

  const getRandomQuote = () => {
    const randomQuote = battleQuotes[Math.floor(Math.random() * battleQuotes.length)];
    setCurrentQuote(randomQuote);
    return randomQuote;
  };

  const calculateDamage = (attacker, defender, isSpecial = false) => {
    const baseDamage = isSpecial ? attacker.attack * 1.5 : attacker.attack;
    const defenseReduction = defender.defense * 0.5;
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    
    let damage = Math.max(1, Math.floor((baseDamage - defenseReduction) * randomFactor));
    
    // Sleep always has advantage
    if (attacker.color.includes('a78bfa') || attacker.color.includes('c4b5fd')) {
      damage = Math.floor(damage * 1.2);
    }
    
    return damage;
  };

  const startBattle = () => {
    if (isBattling) return;
    
    resetBattle();
    setIsBattling(true);
    setShowResults(false);
    setBattleCount(prev => prev + 1);
    
    let currentSleepHP = selectedSleep.health;
    let currentStudyHP = selectedStudy.health;
    const newBattleLog = [];
    
    // Battle loop
    const battleInterval = setInterval(() => {
      // Sleep attacks
      const isSleepSpecial = Math.random() > 0.7;
      const sleepDamage = calculateDamage(selectedSleep, selectedStudy, isSleepSpecial);
      currentStudyHP = Math.max(0, currentStudyHP - sleepDamage);
      
      newBattleLog.push({
        turn: newBattleLog.length + 1,
        attacker: selectedSleep.name,
        defender: selectedStudy.name,
        damage: sleepDamage,
        isSpecial: isSleepSpecial,
        quote: getRandomQuote()
      });
      
      setStudyHP(currentStudyHP);
      setBattleLog([...newBattleLog]);
      
      // Check if study is defeated
      if (currentStudyHP <= 0) {
        clearInterval(battleInterval);
        endBattle(currentSleepHP, 0);
        return;
      }
      
      // Study attacks
      const isStudySpecial = Math.random() > 0.8;
      const studyDamage = calculateDamage(selectedStudy, selectedSleep, isStudySpecial);
      currentSleepHP = Math.max(0, currentSleepHP - studyDamage);
      
      newBattleLog.push({
        turn: newBattleLog.length + 1,
        attacker: selectedStudy.name,
        defender: selectedSleep.name,
        damage: studyDamage,
        isSpecial: isStudySpecial,
        quote: getRandomQuote()
      });
      
      setSleepHP(currentSleepHP);
      setBattleLog([...newBattleLog]);
      
      // Check if sleep is defeated (shouldn't happen, but just in case)
      if (currentSleepHP <= 0) {
        clearInterval(battleInterval);
        endBattle(0, currentStudyHP);
        return;
      }
      
      // Check if battle is taking too long (max 20 turns)
      if (newBattleLog.length >= 20) {
        clearInterval(battleInterval);
        endBattle(currentSleepHP, currentStudyHP);
      }
      
    }, 500 / battleSpeed);
  };

  const endBattle = (finalSleepHP, finalStudyHP) => {
    setIsBattling(false);
    
    const sleepWon = finalSleepHP > finalStudyHP;
    const winDifference = Math.abs(finalSleepHP - finalStudyHP);
    
    if (sleepWon) {
      setSleepWins(prev => prev + 1);
    }
    
    // Determine outcome
    let outcome;
    if (winDifference >= 50) {
      outcome = battleOutcomes[0];
    } else if (winDifference >= 30) {
      outcome = battleOutcomes[1];
    } else if (winDifference >= 10) {
      outcome = battleOutcomes[2];
    } else {
      outcome = battleOutcomes[3];
    }
    
    // Add to history
    const battleRecord = {
      id: Date.now(),
      sleep: selectedSleep.name,
      study: selectedStudy.name,
      sleepHP: finalSleepHP,
      studyHP: finalStudyHP,
      winner: sleepWon ? 'Sleep' : 'Study',
      turns: battleLog.length,
      outcome: outcome.result,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setBattleHistory(prev => [battleRecord, ...prev.slice(0, 4)]);
    
    setTimeout(() => {
      setShowResults(true);
    }, 1000);
  };

  const toggleAutoBattle = () => {
    setAutoBattle(!autoBattle);
    if (!autoBattle) {
      generateSleepFact();
    }
  };

  const clearHistory = () => {
    setBattleHistory([]);
    setBattleCount(0);
    setSleepWins(0);
  };

  const getHPPercentage = (currentHP, maxHP) => {
    return (currentHP / maxHP) * 100;
  };

  const getHPColor = (percentage) => {
    if (percentage > 70) return '#10b981';
    if (percentage > 40) return '#fbbf24';
    if (percentage > 20) return '#f97316';
    return '#ef4444';
  };

  const selectRandomCharacters = () => {
    const randomSleep = sleepCharacters[Math.floor(Math.random() * sleepCharacters.length)];
    const randomStudy = studyCharacters[Math.floor(Math.random() * studyCharacters.length)];
    
    setSelectedSleep(randomSleep);
    setSelectedStudy(randomStudy);
    resetBattle();
  };

  return (
    <div className="battle-container">
      {/* Header */}
      <div className="battle-header">
        <h2 className="battle-title">
          <span className="title-emoji">😴</span>
          Sleep vs Study Battle
          <span className="title-emoji">📚</span>
        </h2>
        <p className="battle-subtitle">
          Watch sleep always win over productivity in this epic battle!
        </p>
        
        {/* Sleep Fact */}
        <div className="fact-banner">
          <span className="fact-emoji">💤</span>
          <p className="fact-text">{sleepFact}</p>
          <button 
            className="fact-refresh"
            onClick={generateSleepFact}
            title="New sleep fact"
          >
            🔄
          </button>
        </div>
      </div>

      <div className="battle-main">
        {/* Left Panel - Characters */}
        <div className="characters-panel">
          {/* Sleep Characters */}
          <div className="sleep-section">
            <h3 className="section-title sleep-title">
              <span className="section-emoji">😴</span>
              Sleep Army
              <span className="team-count">{sleepCharacters.length} fighters</span>
            </h3>
            
            <div className="characters-grid">
              {sleepCharacters.map(character => (
                <button
                  key={character.id}
                  className={`character-card ${selectedSleep.id === character.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedSleep(character);
                    resetBattle();
                  }}
                  disabled={isBattling}
                  style={{ '--char-color': character.color }}
                >
                  <div className="character-header">
                    <span className="character-emoji">{character.emoji}</span>
                    <span className="character-name">{character.name}</span>
                  </div>
                  
                  <div className="character-stats">
                    <div className="stat">
                      <span className="stat-label">❤️ HP</span>
                      <span className="stat-value">{character.health}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">⚔️ ATK</span>
                      <span className="stat-value">{character.attack}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">🛡️ DEF</span>
                      <span className="stat-value">{character.defense}</span>
                    </div>
                  </div>
                  
                  <div className="character-special">
                    <span className="special-emoji">✨</span>
                    <span className="special-name">{character.special}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Study Characters */}
          <div className="study-section">
            <h3 className="section-title study-title">
              <span className="section-emoji">📚</span>
              Study Squad
              <span className="team-count">{studyCharacters.length} fighters</span>
            </h3>
            
            <div className="characters-grid">
              {studyCharacters.map(character => (
                <button
                  key={character.id}
                  className={`character-card ${selectedStudy.id === character.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedStudy(character);
                    resetBattle();
                  }}
                  disabled={isBattling}
                  style={{ '--char-color': character.color }}
                >
                  <div className="character-header">
                    <span className="character-emoji">{character.emoji}</span>
                    <span className="character-name">{character.name}</span>
                  </div>
                  
                  <div className="character-stats">
                    <div className="stat">
                      <span className="stat-label">❤️ HP</span>
                      <span className="stat-value">{character.health}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">⚔️ ATK</span>
                      <span className="stat-value">{character.attack}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">🛡️ DEF</span>
                      <span className="stat-value">{character.defense}</span>
                    </div>
                  </div>
                  
                  <div className="character-special">
                    <span className="special-emoji">✨</span>
                    <span className="special-name">{character.special}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Battle Controls */}
          <div className="controls-section">
            <h3 className="section-title">
              <span className="section-emoji">⚔️</span>
              Battle Controls
            </h3>
            
            <div className="control-buttons">
              <button 
                className={`control-btn battle-btn ${isBattling ? 'battling' : ''}`}
                onClick={startBattle}
                disabled={isBattling}
              >
                <span className="btn-emoji">⚔️</span>
                <span className="btn-text">
                  {isBattling ? 'Battling...' : 'Start Battle!'}
                </span>
              </button>
              
              <button 
                className="control-btn random-btn"
                onClick={selectRandomCharacters}
                disabled={isBattling}
              >
                <span className="btn-emoji">🎲</span>
                <span className="btn-text">Randomize</span>
              </button>
              
              <button 
                className={`control-btn auto-btn ${autoBattle ? 'active' : ''}`}
                onClick={toggleAutoBattle}
              >
                <span className="btn-emoji">{autoBattle ? '⏸️' : '🤖'}</span>
                <span className="btn-text">
                  {autoBattle ? 'Stop Auto' : 'Auto Battle'}
                </span>
              </button>
              
              <button 
                className="control-btn reset-btn"
                onClick={resetBattle}
                disabled={isBattling}
              >
                <span className="btn-emoji">🔄</span>
                <span className="btn-text">Reset</span>
              </button>
            </div>
            
            {/* Speed Control */}
            <div className="speed-control">
              <label className="speed-label">
                <span className="speed-emoji">⚡</span>
                Battle Speed:
              </label>
              <div className="speed-buttons">
                {[0.5, 1, 2, 3].map(speed => (
                  <button
                    key={speed}
                    className={`speed-btn ${battleSpeed === speed ? 'active' : ''}`}
                    onClick={() => setBattleSpeed(speed)}
                    disabled={isBattling}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Battle Arena */}
        <div className="arena-panel">
          {/* Battle Arena */}
          <div className="arena-section">
            <h3 className="section-title">
              <span className="section-emoji">🎪</span>
              Battle Arena
            </h3>
            
            <div className="arena">
              {/* Sleep Fighter */}
              <div className={`fighter sleep-fighter ${isBattling ? 'battling' : ''}`}>
                <div className="fighter-header">
                  <span className="fighter-emoji">{selectedSleep.emoji}</span>
                  <span className="fighter-name">{selectedSleep.name}</span>
                  <span className="fighter-team">😴 Sleep</span>
                </div>
                
                <div className="fighter-hp">
                  <div className="hp-bar">
                    <div 
                      className="hp-fill"
                      style={{ 
                        width: `${getHPPercentage(sleepHP, selectedSleep.health)}%`,
                        backgroundColor: getHPColor(getHPPercentage(sleepHP, selectedSleep.health))
                      }}
                    ></div>
                  </div>
                  <div className="hp-text">
                    {sleepHP} / {selectedSleep.health} HP
                  </div>
                </div>
                
                <div className="fighter-quote">
                  <span className="quote-emoji">💬</span>
                  <span className="quote-text">
                    {selectedSleep.quotes[Math.floor(Math.random() * selectedSleep.quotes.length)]}
                  </span>
                </div>
              </div>
              
              {/* VS Display */}
              <div className="vs-display">
                <div className="vs-circle">VS</div>
                <div className="vs-stats">
                  <div className="vs-stat">
                    <span className="stat-emoji">⚔️</span>
                    <span className="stat-text">{battleCount} Battles</span>
                  </div>
                  <div className="vs-stat">
                    <span className="stat-emoji">🏆</span>
                    <span className="stat-text">{sleepWins} Sleep Wins</span>
                  </div>
                </div>
              </div>
              
              {/* Study Fighter */}
              <div className={`fighter study-fighter ${isBattling ? 'battling' : ''}`}>
                <div className="fighter-header">
                  <span className="fighter-emoji">{selectedStudy.emoji}</span>
                  <span className="fighter-name">{selectedStudy.name}</span>
                  <span className="fighter-team">📚 Study</span>
                </div>
                
                <div className="fighter-hp">
                  <div className="hp-bar">
                    <div 
                      className="hp-fill"
                      style={{ 
                        width: `${getHPPercentage(studyHP, selectedStudy.health)}%`,
                        backgroundColor: getHPColor(getHPPercentage(studyHP, selectedStudy.health))
                      }}
                    ></div>
                  </div>
                  <div className="hp-text">
                    {studyHP} / {selectedStudy.health} HP
                  </div>
                </div>
                
                <div className="fighter-quote">
                  <span className="quote-emoji">💬</span>
                  <span className="quote-text">
                    {selectedStudy.quotes[Math.floor(Math.random() * selectedStudy.quotes.length)]}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Battle Quote */}
            {currentQuote && (
              <div className="battle-quote">
                <span className="quote-emoji">📢</span>
                <span className="quote-text">{currentQuote}</span>
              </div>
            )}
            
            {/* Results Display */}
            {showResults && (
              <div className="results-display">
                <div className="results-header">
                  <h4 className="results-title">
                    <span className="results-emoji">🏆</span>
                    Battle Results
                  </h4>
                </div>
                
                <div className="results-content">
                  <div className="result-winner">
                    <span className="winner-emoji">😴</span>
                    <span className="winner-text">SLEEP WINS!</span>
                    <span className="winner-emoji">🎉</span>
                  </div>
                  
                  <div className="result-stats">
                    <div className="result-stat">
                      <span className="stat-label">Sleep HP:</span>
                      <span className="stat-value sleep-value">{sleepHP}</span>
                    </div>
                    <div className="result-stat">
                      <span className="stat-label">Study HP:</span>
                      <span className="stat-value study-value">{studyHP}</span>
                    </div>
                    <div className="result-stat">
                      <span className="stat-label">Battle Turns:</span>
                      <span className="stat-value">{battleLog.length}</span>
                    </div>
                    <div className="result-stat">
                      <span className="stat-label">Outcome:</span>
                      <span className="stat-value outcome-value">
                        {battleOutcomes.find(o => 
                          Math.abs(sleepHP - studyHP) >= 50 ? o.result === 'Total Domination' :
                          Math.abs(sleepHP - studyHP) >= 30 ? o.result === 'Decisive Victory' :
                          Math.abs(sleepHP - studyHP) >= 10 ? o.result === 'Close Call' :
                          o.result === 'Miracle Win'
                        )?.result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Battle Log */}
          {battleLog.length > 0 && (
            <div className="log-section">
              <div className="section-header">
                <h3 className="section-title">
                  <span className="section-emoji">📜</span>
                  Battle Log
                </h3>
                <span className="log-count">{battleLog.length} turns</span>
              </div>
              
              <div className="battle-log">
                {[...battleLog].reverse().slice(0, 5).map((log, index) => (
                  <div key={index} className="log-entry">
                    <div className="log-turn">Turn {log.turn}</div>
                    <div className="log-action">
                      <span className={`attacker ${log.attacker === selectedSleep.name ? 'sleep' : 'study'}`}>
                        {log.attacker}
                      </span>
                      <span className="log-verb">attacks</span>
                      <span className={`defender ${log.defender === selectedSleep.name ? 'sleep' : 'study'}`}>
                        {log.defender}
                      </span>
                      {log.isSpecial && <span className="special-tag">✨ SPECIAL!</span>}
                    </div>
                    <div className="log-damage">-{log.damage} HP</div>
                    <div className="log-quote">"{log.quote}"</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Panel - Advantages & History */}
      <div className="bottom-panel">
        {/* Advantages & Disadvantages */}
        <div className="advantages-section">
          <div className="advantages-grid">
            {/* Sleep Advantages */}
            <div className="advantages-list">
              <h3 className="section-title">
                <span className="section-emoji">🌟</span>
                Sleep Advantages
              </h3>
              
              <div className="advantages-cards">
                {sleepAdvantages.map((advantage, index) => (
                  <div key={index} className="advantage-card sleep-card">
                    <div className="advantage-header">
                      <span className="advantage-emoji">{advantage.emoji}</span>
                      <span className="advantage-power">+{advantage.power} Power</span>
                    </div>
                    <p className="advantage-text">{advantage.advantage}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Study Disadvantages */}
            <div className="disadvantages-list">
              <h3 className="section-title">
                <span className="section-emoji">⚠️</span>
                Study Disadvantages
              </h3>
              
              <div className="disadvantages-cards">
                {studyDisadvantages.map((disadvantage, index) => (
                  <div key={index} className="disadvantage-card study-card">
                    <div className="disadvantage-header">
                      <span className="disadvantage-emoji">{disadvantage.emoji}</span>
                      <span className="disadvantage-power">-{disadvantage.power} Power</span>
                    </div>
                    <p className="disadvantage-text">{disadvantage.disadvantage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Battle History */}
        {battleHistory.length > 0 && (
          <div className="history-section">
            <div className="section-header">
              <h3 className="section-title">
                <span className="section-emoji">📊</span>
                Battle History
              </h3>
              <button 
                className="clear-history"
                onClick={clearHistory}
                title="Clear all history"
              >
                🗑️ Clear
              </button>
            </div>
            
            <div className="history-grid">
              {battleHistory.map(record => (
                <div key={record.id} className="history-card">
                  <div className="history-header">
                    <div className="history-teams">
                      <span className={`team sleep-team ${record.winner === 'Sleep' ? 'winner' : ''}`}>
                        {record.sleep} 😴
                      </span>
                      <span className="vs">vs</span>
                      <span className={`team study-team ${record.winner === 'Study' ? 'winner' : ''}`}>
                        {record.study} 📚
                      </span>
                    </div>
                    <span className="history-time">{record.timestamp}</span>
                  </div>
                  
                  <div className="history-stats">
                    <div className="history-hp">
                      <span className="hp-sleep">{record.sleepHP} HP</span>
                      <span className="hp-vs">-</span>
                      <span className="hp-study">{record.studyHP} HP</span>
                    </div>
                    <div className="history-outcome">
                      <span className="outcome-emoji">
                        {record.winner === 'Sleep' ? '😴' : '📚'}
                      </span>
                      <span className="outcome-text">
                        {record.winner} wins! ({record.outcome})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="battle-footer">
        <div className="footer-content">
          <p className="footer-text">
            <span className="footer-emoji">⚠️</span>
            Sleep wins 99.9% of battles. The other 0.1% are statistical errors or caffeine overdoses.
          </p>
          <p className="footer-tip">
            <span className="tip-emoji">💡</span>
            Pro Tip: Sleep always wins. Resistance is futile. Embrace the nap.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SleepVsStudy;