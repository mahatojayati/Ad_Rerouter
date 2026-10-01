export const motivationalQuotes = [
  "Focus on what matters.",
  "Your future self will thank you.",
  "One more step.",
  "Stay focused.",
  "Small progress is still progress.",
  "Discipline beats motivation.",
  "Keep going."
];

export function getRandomQuote() {
  const index = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[index];
}
