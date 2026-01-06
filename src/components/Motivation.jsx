import { useState } from "react"

const quotes = [
  "You can do it… but maybe tomorrow.",
  "Hard work pays off. Not today.",
  "At least you tried.",
  "Sleep is also productivity."
]

function Motivation() {
  const [quote, setQuote] = useState("Click for motivation")

  function generateQuote() {
    const random = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(random)
  }

  return (
    <div>
      <p>{quote}</p>
      <button onClick={generateQuote}>Inspire Me</button>
    </div>
  )
}

export default Motivation
