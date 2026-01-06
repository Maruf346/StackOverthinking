// components/Motivation.jsx
import { useState } from "react"
import "./Motivation.css"

const quotes = [
  "You can do it… but maybe tomorrow.",
  "Hard work pays off. Not today.",
  "At least you tried. That's something, right?",
  "Sleep is also productivity. Trust me.",
  "Procrastination is just delayed success!",
  "Your future self will handle it. Probably.",
  "Why do today what you can do never?",
  "Failure is just success in progress. Very slow progress.",
  "Dream big, nap bigger.",
  "I was going to be productive, but then I got distracted by my own thoughts.",
  "Motivation is overrated. Comfort is underrated.",
  "You're not lazy, you're energy efficient!",
  "The early bird gets the worm, but the second mouse gets the cheese.",
  "I'll stop procrastinating tomorrow.",
  "My productivity is currently downloading... please wait.",
  "I'm not saying I'll let you down, but I'm also not saying I won't.",
  "Think of it as strategic resting.",
  "I'm on a seafood diet. I see food and I eat it instead of working.",
  "My brain is like Google Chrome: 99 tabs open and 1 responding.",
  "I'm not procrastinating, I'm just prioritizing my comfort."
]

function Motivation() {
  const [quote, setQuote] = useState("Click the button for some 'motivation'")
  const [isAnimating, setIsAnimating] = useState(false)
  const [usedQuotes, setUsedQuotes] = useState([])

  function generateQuote() {
    setIsAnimating(true)
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 500)
    
    // Find a quote that hasn't been used recently
    let availableQuotes = quotes.filter(q => !usedQuotes.includes(q))
    
    // If all quotes have been used, reset the list
    if (availableQuotes.length === 0) {
      availableQuotes = quotes
      setUsedQuotes([])
    }
    
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)]
    
    // Add to used quotes (keep last 5)
    setUsedQuotes(prev => {
      const newUsed = [...prev, randomQuote]
      return newUsed.slice(-5)
    })
    
    setQuote(randomQuote)
  }

  return (
    <div className="motivation-container">
      <div className="motivation-header">
        <h2 className="motivation-title">
          <span className="title-emoji">😂</span>
          Anti-Motivation Generator
          <span className="title-emoji">🎭</span>
        </h2>
        <p className="motivation-subtitle">
          Get reverse psychology that makes you question your life choices
        </p>
      </div>
      
      <div className="quote-display-container">
        <div className={`quote-bubble ${isAnimating ? 'animating' : ''}`}>
          <div className="bubble-tail"></div>
          <div className="quote-content">
            <span className="quote-mark left">"</span>
            <p className="quote-text">{quote}</p>
            <span className="quote-mark right">"</span>
          </div>
          <div className="quote-author">
            ~ Professional Procrastinator
          </div>
        </div>
        
        <div className="button-container">
          <button 
            className={`generate-button ${isAnimating ? 'clicked' : ''}`}
            onClick={generateQuote}
          >
            <span className="button-icon">🎲</span>
            <span className="button-text">Generate Useless Wisdom</span>
            <span className="button-arrow">✨</span>
          </button>
          
          <div className="stats">
            <div className="stat-item">
              <span className="stat-emoji">📊</span>
              <span className="stat-text">
                {usedQuotes.length}/{quotes.length} quotes used
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-emoji">⚡</span>
              <span className="stat-text">
                {Math.floor(Math.random() * 100)}% motivation level
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="motivation-footer">
        <p className="footer-note">
          <span className="warning-emoji">⚠️</span>
          Warning: These quotes may cause sudden urges to take a nap
        </p>
      </div>
    </div>
  )
}

export default Motivation