// src/data/decisions.js
export const decisionCategories = [
  {
    id: 'career',
    name: 'Career Crisis',
    emoji: '💼',
    color: '#3b82f6',
    questions: [
      "Should I quit my job?",
      "Is it time for a career change?",
      "Should I ask for a raise?",
      "Should I start my own business?",
      "Should I go back to school?"
    ]
  },
  {
    id: 'love',
    name: 'Love & Relationships',
    emoji: '❤️',
    color: '#ef4444',
    questions: [
      "Should I ask them out?",
      "Is it time to break up?",
      "Should I swipe right?",
      "Should I say 'I love you'?",
      "Should I get married?"
    ]
  },
  {
    id: 'money',
    name: 'Money Matters',
    emoji: '💰',
    color: '#10b981',
    questions: [
      "Should I buy this?",
      "Is it time to invest?",
      "Should I get a loan?",
      "Should I check my bank account?",
      "Should I start saving?"
    ]
  },
  {
    id: 'food',
    name: 'Food Dilemmas',
    emoji: '🍕',
    color: '#f59e0b',
    questions: [
      "What should I eat?",
      "Should I order takeout?",
      "Is it too late for pizza?",
      "Should I try cooking?",
      "Dessert or diet?"
    ]
  },
  {
    id: 'productivity',
    name: 'Productivity Paradox',
    emoji: '📈',
    color: '#8b5cf6',
    questions: [
      "Should I start this project?",
      "Is it nap time?",
      "Should I check social media?",
      "Procrastinate or prioritize?",
      "Should I make a to-do list?"
    ]
  },
  {
    id: 'life',
    name: 'Life Choices',
    emoji: '🌍',
    color: '#06b6d4',
    questions: [
      "Should I move cities?",
      "Is it time to adult?",
      "Should I get a pet?",
      "Should I learn something new?",
      "What should I do with my life?"
    ]
  }
];

export const badAdvice = [
  {
    advice: "Definitely yes! What could possibly go wrong?",
    type: "Overconfident",
    emoji: "🚀",
    severity: "High",
    followUp: "Don't think twice, just do it!"
  },
  {
    advice: "Absolutely not! Too much effort required.",
    type: "Lazy",
    emoji: "😴",
    severity: "Medium",
    followUp: "Stay in bed. It's safer there."
  },
  {
    advice: "Flip a coin. If you're disappointed with the result, you have your answer.",
    type: "Philosophical",
    emoji: "🎭",
    severity: "Low",
    followUp: "Or just ask a magic 8-ball."
  },
  {
    advice: "Consult your horoscope. The stars know best.",
    type: "Mystical",
    emoji: "🔮",
    severity: "Medium",
    followUp: "Mercury is in retrograde anyway."
  },
  {
    advice: "Do the opposite of what your gut says. It's probably wrong.",
    type: "Contrarian",
    emoji: "🔄",
    severity: "High",
    followUp: "Your gut wanted pizza yesterday too."
  },
  {
    advice: "Ask a stranger on the internet. They're always right.",
    type: "Digital",
    emoji: "🌐",
    severity: "Critical",
    followUp: "Reddit said it's fine."
  },
  {
    advice: "Make a pros and cons list, then ignore it completely.",
    type: "Illogical",
    emoji: "📝",
    severity: "Medium",
    followUp: "The cons were probably right anyway."
  },
  {
    advice: "Sleep on it. For about a week.",
    type: "Procrastinator",
    emoji: "🛌",
    severity: "Low",
    followUp: "Maybe it'll resolve itself."
  },
  {
    advice: "Throw a dart at a board. Or your resume.",
    type: "Random",
    emoji: "🎯",
    severity: "High",
    followUp: "Blind chance is as good a strategy as any."
  },
  {
    advice: "Do what makes the best story for later.",
    type: "Dramatic",
    emoji: "🎬",
    severity: "Critical",
    followUp: "Regret makes for great anecdotes."
  },
  {
    advice: "Check if there's a TikTok trend about it.",
    type: "Modern",
    emoji: "📱",
    severity: "Medium",
    followUp: "If it's viral, it must be right."
  },
  {
    advice: "Ask your pet. They're excellent judges of character.",
    type: "Animal",
    emoji: "🐱",
    severity: "Low",
    followUp: "If they purr, it's a yes."
  },
  {
    advice: "Do what requires the least amount of adulting.",
    type: "Avoidant",
    emoji: "🙈",
    severity: "Medium",
    followUp: "Adulting is overrated anyway."
  },
  {
    advice: "Consult the fridge. It knows what you need.",
    type: "Hungry",
    emoji: "🍔",
    severity: "Low",
    followUp: "The answer is always snacks."
  },
  {
    advice: "Rock paper scissors against yourself. Best of 100.",
    type: "Competitive",
    emoji: "✊",
    severity: "Medium",
    followUp: "If you cheat, you wanted it more."
  }
];

export const wisdomQuotes = [
  "The best decisions are the ones you don't have to make.",
  "When in doubt, take a nap. The decision can wait.",
  "A bad decision makes for a good story. Probably.",
  "If it feels wrong, it's probably right. Or left. Who knows?",
  "The road less traveled has more potholes. Stay home.",
  "Great minds think alike, but fools seldom differ. So be a fool.",
  "Carpe Diem? More like Carpe Nap-em.",
  "YOLO, but also you have to live with the consequences.",
  "Follow your heart, but bring snacks just in case.",
  "Life is short. Make bad decisions quickly.",
  "When life gives you lemons, make lemonade. Or just order pizza.",
  "The early bird gets the worm, but the second mouse gets the cheese.",
  "If at first you don't succeed, redefine success.",
  "Don't put off until tomorrow what you can avoid altogether.",
  "Shoot for the moon. Even if you miss, you'll be in space. Which is terrifying."
];

export const consequences = [
  "You'll probably regret this. But maybe not!",
  "This could change everything. Or nothing. Who can say?",
  "Worst case scenario: mild inconvenience.",
  "Best case: eternal happiness. Worst case: funny story.",
  "This might be your big break! Or your big mistake!",
  "Either way, there's probably coffee involved.",
  "The universe is probably indifferent to your choice.",
  "This decision will echo through eternity. Or until lunch.",
  "Future you will either thank or curse present you.",
  "Statistically speaking, it doesn't matter."
];