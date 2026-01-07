// src/data/productivity.js
export const productivityLevels = [
  {
    level: 0,
    name: "Professional Procrastinator",
    emoji: "😴",
    color: "#dc2626",
    messages: [
      "You're not lazy, you're in energy-saving mode!",
      "Productivity level: Still loading...",
      "Your to-do list is getting anxious",
      "The only thing you're producing is excuses"
    ]
  },
  {
    level: 10,
    name: "Master Delayer",
    emoji: "⏳",
    color: "#ea580c",
    messages: [
      "You've thought about being productive. That counts, right?",
      "Productivity is just a social construct anyway",
      "Your mouse has moved more than you have",
      "You're saving your energy for something important. Probably."
    ]
  },
  {
    level: 25,
    name: "Casual Browser",
    emoji: "😅",
    color: "#d97706",
    messages: [
      "You opened a work-related tab! That's something!",
      "Productivity: You checked your email. Once.",
      "You're warming up... slowly... very slowly...",
      "At least you're not napping. Wait, are you?"
    ]
  },
  {
    level: 40,
    name: "Occasional Doer",
    emoji: "🙂",
    color: "#ca8a04",
    messages: [
      "You did something! Celebrate the small wins!",
      "Productivity achieved: Sent one important email",
      "You're pretending to work so convincingly!",
      "Progress: Made a list of things to avoid doing"
    ]
  },
  {
    level: 55,
    name: "Average Achiever",
    emoji: "😊",
    color: "#65a30d",
    messages: [
      "Look at you, being almost productive!",
      "You've reached peak mediocrity! Congratulations!",
      "Productivity level: Could be worse!",
      "You're doing the bare minimum, and that's okay!"
    ]
  },
  {
    level: 70,
    name: "Productive-ish",
    emoji: "💪",
    color: "#16a34a",
    messages: [
      "Wow, you're actually doing things!",
      "Someone might mistake you for a productive person!",
      "You're on a roll! Don't let it go to your head",
      "Productivity level: Surprisingly competent"
    ]
  },
  {
    level: 85,
    name: "Fake Guru",
    emoji: "🧠",
    color: "#059669",
    messages: [
      "You're faking it so well, you might make it!",
      "People think you're productive. The deception works!",
      "You've mastered the art of looking busy",
      "Productivity level: Professional faker"
    ]
  },
  {
    level: 95,
    name: "Imposter Syndrome",
    emoji: "🎭",
    color: "#0d9488",
    messages: [
      "You're being suspiciously productive...",
      "Are you okay? This isn't normal behavior",
      "Productivity overload! System might crash",
      "You're achieving things. Who are you really?"
    ]
  },
  {
    level: 100,
    name: "Legendary Faker",
    emoji: "🏆",
    color: "#7c3aed",
    messages: [
      "100% productivity! (According to this fake meter)",
      "You've achieved maximum fake productivity!",
      "Legend says you're productive. The legend lies.",
      "Perfect score! Now go back to scrolling memes"
    ]
  },
  {
    level: 110,
    name: "Overachiever",
    emoji: "🚀",
    color: "#c026d3",
    messages: [
      "Over 100%! You broke the productivity meter!",
      "You're so productive, it's scientifically impossible!",
      "The laws of physics don't apply to your productivity",
      "Warning: Excessive productivity detected"
    ]
  }
];

export const fakeTasks = [
  { name: "Checking email for the 10th time", value: 5, emoji: "📧" },
  { name: "Organizing desktop icons", value: 8, emoji: "🗂️" },
  { name: "Updating LinkedIn status", value: 12, emoji: "💼" },
  { name: "Making coffee #3", value: 15, emoji: "☕" },
  { name: "Researching productivity hacks", value: 20, emoji: "🔍" },
  { name: "Creating color-coded spreadsheets", value: 25, emoji: "📊" },
  { name: "Attending unnecessary meetings", value: 30, emoji: "👥" },
  { name: "Writing detailed to-do lists", value: 35, emoji: "📝" },
  { name: "Debugging motivation", value: 40, emoji: "🐛" },
  { name: "Optimizing coffee breaks", value: 45, emoji: "⚡" },
  { name: "Archiving old memes", value: 50, emoji: "😂" },
  { name: "Learning keyboard shortcuts", value: 55, emoji: "⌨️" },
  { name: "Customizing IDE theme", value: 60, emoji: "🎨" },
  { name: "Documenting procrastination", value: 65, emoji: "📚" },
  { name: "Simulating work noises", value: 70, emoji: "🔊" },
  { name: "Creating fake deadlines", value: 75, emoji: "⏰" },
  { name: "Practicing looking busy", value: 80, emoji: "🎯" },
  { name: "Generating fake reports", value: 85, emoji: "📄" },
  { name: "Mastering fake typing", value: 90, emoji: "💻" },
  { name: "Achieving zen of procrastination", value: 95, emoji: "🧘" },
  { name: "Becoming one with the fake", value: 100, emoji: "✨" }
];

export const productivityHacks = [
  {
    name: "The Pomodoro Procrastination",
    description: "Work for 25 minutes, procrastinate for 5 hours",
    emoji: "🍅",
    effectiveness: "0%"
  },
  {
    name: "Inbox Zero Illusion",
    description: "Archive everything. Productivity achieved!",
    emoji: "📥",
    effectiveness: "5%"
  },
  {
    name: "Multitasking Mayhem",
    description: "Do everything at once, achieve nothing perfectly",
    emoji: "🎪",
    effectiveness: "10%"
  },
  {
    name: "Meeting Marathon",
    description: "Schedule back-to-back meetings. Look busy!",
    emoji: "🏃",
    effectiveness: "15%"
  },
  {
    name: "Desktop Feng Shui",
    description: "Organize icons by color. Very productive!",
    emoji: "🎑",
    effectiveness: "20%"
  },
  {
    name: "Coffee-Driven Development",
    description: "More coffee = more productivity (in theory)",
    emoji: "☕",
    effectiveness: "25%"
  },
  {
    name: "Notification Addiction",
    description: "Check every ping immediately. Stay responsive!",
    emoji: "🔔",
    effectiveness: "30%"
  },
  {
    name: "Tab Hoarding",
    description: "47 open tabs = 47 things being worked on",
    emoji: "🌐",
    effectiveness: "35%"
  },
  {
    name: "To-Do List Inception",
    description: "Make lists of lists. Meta-productivity!",
    emoji: "📋",
    effectiveness: "40%"
  },
  {
    name: "Fake Deadline Pressure",
    description: "Create artificial urgency. Feel productive!",
    emoji: "⏱️",
    effectiveness: "45%"
  }
];

export const motivationalQuotes = [
  "Productivity is just a number. Make it a big one!",
  "Fake it till you make it... or till 5 PM",
  "The key to productivity is looking productive",
  "Your productivity is someone else's inspiration",
  "Greatness is 1% inspiration, 99% faking productivity",
  "Dream big, achieve medium, pretend huge",
  "The only bad productivity is no productivity theater",
  "Be the productivity you wish to see in the world",
  "Productivity isn't everything, but faking it is",
  "You miss 100% of the productivity you don't fake"
];