// src/data/examData.js
export const examSubjects = [
  {
    id: 'math',
    name: 'Mathematics',
    emoji: '📐',
    color: '#3b82f6',
    difficulty: 'Hard',
    topics: [
      'Calculus nightmares',
      'Algebraic anxiety',
      'Trigonometric trauma',
      'Statistical stress',
      'Geometric grief'
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    emoji: '⚡',
    color: '#ef4444',
    difficulty: 'Very Hard',
    topics: [
      'Quantum confusion',
      'Thermodynamic terror',
      'Relativity regret',
      'Mechanical misery',
      'Electromagnetic exhaustion'
    ]
  },
  {
    id: 'cs',
    name: 'Computer Science',
    emoji: '💻',
    color: '#10b981',
    difficulty: 'Medium',
    topics: [
      'Algorithmic anguish',
      'Data structure despair',
      'Pointer panic',
      'Recursion regret',
      'Bug-induced breakdown'
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    emoji: '🧪',
    color: '#8b5cf6',
    difficulty: 'Hard',
    topics: [
      'Organic overload',
      'Periodic table panic',
      'Stoichiometric stress',
      'Lab report lethargy',
      'Reaction rate regret'
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    emoji: '🧬',
    color: '#06b6d4',
    difficulty: 'Medium',
    topics: [
      'Cellular chaos',
      'Genetic grief',
      'Evolutionary anxiety',
      'Photosynthetic panic',
      'Mitochondrial misery'
    ]
  },
  {
    id: 'english',
    name: 'English Literature',
    emoji: '📚',
    color: '#f59e0b',
    difficulty: 'Easy',
    topics: [
      'Shakespearean shock',
      'Poetic panic',
      'Grammar grief',
      'Essay exhaustion',
      'Vocabulary vertigo'
    ]
  },
  {
    id: 'history',
    name: 'History',
    emoji: '🏛️',
    color: '#dc2626',
    difficulty: 'Medium',
    topics: [
      'Date delirium',
      'Timeline trauma',
      'Revolution regret',
      'War weariness',
      'Monarch madness'
    ]
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    emoji: '🤔',
    color: '#6366f1',
    difficulty: 'Very Hard',
    topics: [
      'Existential exam',
      'Metaphysical meltdown',
      'Ethical exhaustion',
      'Logic lag',
      'Philosophical panic'
    ]
  }
];

export const panicLevels = [
  {
    level: 0,
    name: "Zen Master",
    emoji: "😌",
    color: "#86efac",
    status: "Relaxed and ready. Probably too relaxed.",
    actions: [
      "Planning study schedule for next year",
      "Actually enjoying the material",
      "Making color-coded notes for fun",
      "Helping others study (show-off)"
    ]
  },
  {
    level: 25,
    name: "Confident Casual",
    emoji: "😊",
    color: "#4ade80",
    status: "Moderately prepared. Could be worse!",
    actions: [
      "Reviewed syllabus once",
      "Knows at least 3 topics",
      "Has pens (multiple colors!)",
      "Bookmarked relevant pages"
    ]
  },
  {
    level: 50,
    name: "Anxious Average",
    emoji: "😅",
    color: "#fde047",
    status: "Starting to feel the pressure. Time to panic?",
    actions: [
      "Cramming 2 weeks of material tonight",
      "Drinking excessive coffee",
      "Highlighting everything",
      "Questioning life choices"
    ]
  },
  {
    level: 75,
    name: "Panic Mode",
    emoji: "😰",
    color: "#f97316",
    status: "Full-blown panic! Everything is important!",
    actions: [
      "Crying over textbooks",
      "Creating desperate mnemonics",
      "Bargaining with higher powers",
      "Considering fake illness"
    ]
  },
  {
    level: 90,
    name: "Crisis Level",
    emoji: "😱",
    color: "#ef4444",
    status: "Complete meltdown! Accepting failure!",
    actions: [
      "Redefining 'passing grade'",
      "Planning excuse strategy",
      "Staring blankly at notes",
      "Regretting every life decision"
    ]
  },
  {
    level: 100,
    name: "Existential Dread",
    emoji: "💀",
    color: "#7c3aed",
    status: "Beyond panic. One with the void.",
    actions: [
      "Embracing failure as lifestyle",
      "Writing poetic goodbyes",
      "Questioning reality itself",
      "Accepting cosmic insignificance"
    ]
  }
];

export const examStatuses = [
  "Bhaggo bhalo hole pass", // If luck is good, you'll pass
  "Last night hero mode activated",
  "Google is my best friend",
  "Praying to the curve gods",
  "Cheat sheet: 90% hope, 10% actual content",
  "Calculator: fully charged, brain: empty",
  "Multiple choice = multiple chances",
  "Essay questions = creative writing time",
  "Open book = still clueless",
  "Group study = collective confusion",
  "All-nighter = next day zombie",
  "Coffee IV drip engaged",
  "YouTube tutorials at 2x speed",
  "Wikipedia deep dive (unrelated topics)",
  "Textbook: pristine condition",
  "Notes: hieroglyphics only I understand",
  "Brain: processing... please wait",
  "Memory: selective amnesia activated",
  "Confidence: inversely proportional to actual knowledge",
  "Strategy: guess and pray"
];

export const procrastinationActivities = [
  { name: "Reorganizing desk for 3rd time", time: "45 minutes", emoji: "🗃️" },
  { name: "Checking phone notifications", time: "2 hours", emoji: "📱" },
  { name: "Making elaborate study snacks", time: "1 hour", emoji: "🍕" },
  { name: "Updating study playlist", time: "30 minutes", emoji: "🎵" },
  { name: "Researching exam anxiety cures", time: "1.5 hours", emoji: "🔍" },
  { name: "Cleaning entire room", time: "2 hours", emoji: "🧹" },
  { name: "Watching 'study with me' videos", time: "3 hours", emoji: "📹" },
  { name: "Planning post-exam celebration", time: "1 hour", emoji: "🎉" },
  { name: "Testing different pens", time: "20 minutes", emoji: "🖊️" },
  { name: "Making motivational posters", time: "45 minutes", emoji: "📝" },
  { name: "Checking weather for exam day", time: "15 minutes", emoji: "🌤️" },
  { name: "Reading exam horror stories", time: "1 hour", emoji: "👻" },
  { name: "Practicing signature for degree", time: "10 minutes", emoji: "✍️" },
  { name: "Learning irrelevant life skills", time: "2 hours", emoji: "🎨" },
  { name: "Debating exam outfit", time: "30 minutes", emoji: "👕" }
];

export const examTips = [
  {
    tip: "Highlight everything! If everything is important, nothing is!",
    effectiveness: "0%",
    emoji: "🖍️"
  },
  {
    tip: "Study in bed. Sleep-learning is totally real.",
    effectiveness: "5%",
    emoji: "🛏️"
  },
  {
    tip: "Write notes so small you need a microscope. Security through obscurity!",
    effectiveness: "10%",
    emoji: "🔬"
  },
  {
    tip: "Memorize by singing to Taylor Swift. Shake it off!",
    effectiveness: "15%",
    emoji: "🎤"
  },
  {
    tip: "Teach the material to your pet. They're great listeners!",
    effectiveness: "20%",
    emoji: "🐶"
  },
  {
    tip: "Use mnemonics so complex they need their own cheat sheet.",
    effectiveness: "25%",
    emoji: "🧠"
  },
  {
    tip: "Study with TV on. Multitasking is efficient!",
    effectiveness: "0%",
    emoji: "📺"
  },
  {
    tip: "Cram everything 1 hour before. Pressure makes diamonds!",
    effectiveness: "30%",
    emoji: "💎"
  },
  {
    tip: "Sleep with textbook under pillow. Osmosis learning!",
    effectiveness: "1%",
    emoji: "📖"
  },
  {
    tip: "Pray to the academic gods. Can't hurt!",
    effectiveness: "50%",
    emoji: "🙏"
  }
];