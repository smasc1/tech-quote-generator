/**
 * Curated Collection of Quotes for Quote Generator
 * Specialized for Developer Mindset & Tester Mindset
 */
const QUOTES_DATA = [
  // ==========================================
  // Developer Mindset
  // ==========================================
  {
    id: 1,
    quote: "Code is simple when logic is clear.",
    author: "Developer Mindset",
    category: "Developer",
    tags: ["logic", "clean code", "simplicity"]
  },
  {
    id: 2,
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    category: "Developer",
    tags: ["problem-solving", "programming"]
  },
  {
    id: 3,
    quote: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    category: "Developer",
    tags: ["simplicity", "reliability", "architecture"]
  },
  {
    id: 4,
    quote: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    category: "Developer",
    tags: ["refactoring", "best practices"]
  },
  {
    id: 5,
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    category: "Developer",
    tags: ["action", "open source"]
  },
  {
    id: 6,
    quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    category: "Developer",
    tags: ["readability", "clean code"]
  },
  {
    id: 7,
    quote: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
    category: "Developer",
    tags: ["user experience", "quality"]
  },
  {
    id: 8,
    quote: "Premature optimization is the root of all evil.",
    author: "Donald Knuth",
    category: "Developer",
    tags: ["optimization", "architecture"]
  },
  {
    id: 9,
    quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
    category: "Developer",
    tags: ["craftsmanship", "clarity"]
  },
  {
    id: 10,
    quote: "Truth can only be found in one place: the code.",
    author: "Robert C. Martin",
    category: "Developer",
    tags: ["clean code", "truth"]
  },
  {
    id: 11,
    quote: "Deleted code is debugged code.",
    author: "Jeff Sickel",
    category: "Developer",
    tags: ["simplicity", "refactoring"]
  },
  {
    id: 12,
    quote: "Fix the cause, not the symptom.",
    author: "Steve Maguire",
    category: "Developer",
    tags: ["debugging", "root cause"]
  },
  {
    id: 13,
    quote: "Before software can be reusable it first has to be usable.",
    author: "Ralph Johnson",
    category: "Developer",
    tags: ["design", "usability"]
  },
  {
    id: 14,
    quote: "Walking on water and developing software from a specification are easy if both are frozen.",
    author: "Edward V. Berard",
    category: "Developer",
    tags: ["specifications", "agile"]
  },
  {
    id: 15,
    quote: "The function of good software is to make the complex appear to be simple.",
    author: "Grady Booch",
    category: "Developer",
    tags: ["architecture", "simplicity"]
  },
  {
    id: 16,
    quote: "Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live.",
    author: "John Woods",
    category: "Developer",
    tags: ["readability", "maintainability"]
  },
  {
    id: 17,
    quote: "Code never lies, comments sometimes do.",
    author: "Ron Jeffries",
    category: "Developer",
    tags: ["clean code", "documentation"]
  },
  {
    id: 18,
    quote: "Good code is its own best documentation.",
    author: "Steve McConnell",
    category: "Developer",
    tags: ["clarity", "craftsmanship"]
  },

  // ==========================================
  // Tester Mindset
  // ==========================================
  {
    id: 19,
    quote: "Testers don't break the software; they break your illusions about the software.",
    author: "Tester Mindset",
    category: "Tester",
    tags: ["testing", "reality", "qa"]
  },
  {
    id: 20,
    quote: "Testing is an infinite process of comparing the invisible to the ambiguous in order to avoid the unthinkable.",
    author: "James Bach",
    category: "Tester",
    tags: ["investigation", "qa philosophy"]
  },
  {
    id: 21,
    quote: "Testing leads to failure, and failure leads to understanding.",
    author: "Burt Rutan",
    category: "Tester",
    tags: ["learning", "resilience"]
  },
  {
    id: 22,
    quote: "A good tester doesn't just check if something works; they discover under what conditions it fails.",
    author: "Tester Mindset",
    category: "Tester",
    tags: ["edge cases", "curiosity"]
  },
  {
    id: 23,
    quote: "Software testing proves the existence of bugs, not their absence.",
    author: "Edsger W. Dijkstra",
    category: "Tester",
    tags: ["verification", "dijkstra"]
  },
  {
    id: 24,
    quote: "Software testing is a sport like hunting: the thrill is in finding bugs before production.",
    author: "Boris Beizer",
    category: "Tester",
    tags: ["bug hunting", "production ready"]
  },
  {
    id: 25,
    quote: "The bitterness of poor quality lingers long after the sweetness of meeting a deadline is forgotten.",
    author: "QA Wisdom",
    category: "Tester",
    tags: ["quality", "standards"]
  },
  {
    id: 26,
    quote: "Quality is not an act, it is a habit.",
    author: "QA Philosophy",
    category: "Tester",
    tags: ["excellence", "consistency"]
  },
  {
    id: 27,
    quote: "Don't test what should happen. Test what could happen.",
    author: "Tester Mindset",
    category: "Tester",
    tags: ["edge cases", "unexpected inputs"]
  },
  {
    id: 28,
    quote: "Beware of bugs in the above code; I have only proved it correct, not tried it.",
    author: "Donald Knuth",
    category: "Tester",
    tags: ["validation", "execution"]
  },
  {
    id: 29,
    quote: "A bug found in testing saves ten in staging, and a hundred in customer trust.",
    author: "QA Principles",
    category: "Tester",
    tags: ["customer trust", "value of qa"]
  },
  {
    id: 30,
    quote: "Developers build the bridges; testers determine how much weight they can hold before collapsing.",
    author: "QA Mindset",
    category: "Tester",
    tags: ["stress testing", "stability"]
  },
  {
    id: 31,
    quote: "Think like a user who has never read the documentation and clicks everything twice.",
    author: "Tester Mindset",
    category: "Tester",
    tags: ["exploratory", "user behavior"]
  },
  {
    id: 32,
    quote: "Automate the repetitive, explore the unexpected.",
    author: "Automation Mindset",
    category: "Tester",
    tags: ["test automation", "exploratory testing"]
  },
  {
    id: 33,
    quote: "If you haven't found a bug in a complex feature yet, you just haven't looked hard enough.",
    author: "Tester Mindset",
    category: "Tester",
    tags: ["persistence", "thoroughness"]
  },
  {
    id: 34,
    quote: "Quality is free, but only to those who are willing to invest in it early.",
    author: "Tom DeMarco",
    category: "Tester",
    tags: ["early testing", "shift left"]
  }
];
