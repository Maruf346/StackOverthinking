// src/data/lateExcuses.js
export const lateExcuses = [
  {
    excuse: "Traffic was worse than my coding skills",
    category: "Transport",
    emoji: "🚗",
    severity: "High",
    timeAdded: "30 minutes"
  },
  {
    excuse: "My alarm clock decided to take a day off",
    category: "Tech Issue",
    emoji: "⏰",
    severity: "Medium",
    timeAdded: "1 hour"
  },
  {
    excuse: "The internet was downloading my motivation",
    category: "Internet",
    emoji: "🌐",
    severity: "Medium",
    timeAdded: "45 minutes"
  },
  {
    excuse: "My cat deleted my calendar notifications",
    category: "Pet",
    emoji: "🐱",
    severity: "Low",
    timeAdded: "20 minutes"
  },
  {
    excuse: "I was stuck in an infinite loop of indecision",
    category: "Developer",
    emoji: "💻",
    severity: "High",
    timeAdded: "2 hours"
  },
  {
    excuse: "The coffee machine had a stack overflow",
    category: "Coffee",
    emoji: "☕",
    severity: "Critical",
    timeAdded: "1.5 hours"
  },
  {
    excuse: "My brain needed a system update",
    category: "Mental",
    emoji: "🧠",
    severity: "Medium",
    timeAdded: "1 hour"
  },
  {
    excuse: "The shower had a runtime error",
    category: "Home",
    emoji: "🚿",
    severity: "Medium",
    timeAdded: "40 minutes"
  },
  {
    excuse: "My shoes were compiling",
    category: "Fashion",
    emoji: "👟",
    severity: "Low",
    timeAdded: "15 minutes"
  },
  {
    excuse: "The universe was buffering",
    category: "Cosmic",
    emoji: "🌌",
    severity: "High",
    timeAdded: "∞"
  },
  {
    excuse: "My breakfast was still in the oven's cache",
    category: "Food",
    emoji: "🍳",
    severity: "Medium",
    timeAdded: "30 minutes"
  },
  {
    excuse: "The door was stuck in a race condition",
    category: "Physics",
    emoji: "🚪",
    severity: "Low",
    timeAdded: "10 minutes"
  },
  {
    excuse: "My motivation had a segmentation fault",
    category: "Mental",
    emoji: "💔",
    severity: "High",
    timeAdded: "3 hours"
  },
  {
    excuse: "The bus driver was debugging his route",
    category: "Transport",
    emoji: "🚌",
    severity: "Medium",
    timeAdded: "50 minutes"
  },
  {
    excuse: "My phone's battery had a memory leak",
    category: "Tech",
    emoji: "📱",
    severity: "High",
    timeAdded: "1 hour"
  },
  {
    excuse: "The elevator was in an endless recursion",
    category: "Building",
    emoji: "🛗",
    severity: "Medium",
    timeAdded: "25 minutes"
  },
  {
    excuse: "My keys were hashed to the wrong location",
    category: "Crypto",
    emoji: "🔑",
    severity: "Low",
    timeAdded: "15 minutes"
  },
  {
    excuse: "The sun was in my eyes (even at night)",
    category: "Weather",
    emoji: "☀️",
    severity: "Low",
    timeAdded: "5 minutes"
  },
  {
    excuse: "My shoes were tying themselves in a knot",
    category: "Paradox",
    emoji: "👞",
    severity: "Medium",
    timeAdded: "20 minutes"
  },
  {
    excuse: "The WiFi was practicing social distancing",
    category: "Internet",
    emoji: "📶",
    severity: "High",
    timeAdded: "1 hour"
  }
];

export const responseTemplates = [
  "YES! You're {time} late!",
  "Absolutely! {time} behind schedule!",
  "100% Late! By {time}!",
  "Confirmed! You're {time} late!",
  "Without a doubt! {time} late!",
  "Definitely! Running {time} behind!"
];

export const timeUnits = [
  "seconds", "minutes", "hours", "days", "weeks", "months", "years"
];

export const delayLevels = {
  "Low": { emoji: "😅", color: "#86efac", message: "Slightly behind!" },
  "Medium": { emoji: "😬", color: "#fde047", message: "Running late!" },
  "High": { emoji: "😰", color: "#fca5a5", message: "Very late!" },
  "Critical": { emoji: "🤯", color: "#f87171", message: "Extremely late!" }
};