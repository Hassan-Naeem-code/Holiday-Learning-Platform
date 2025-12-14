// COMPREHENSIVE TUTORIAL CONTENT GENERATOR
// Generates comprehensive tutorial sections teaching the ENTIRE language
// Covers: Setup → Variables → Loops → Functions → Data Structures → OOP → Files → Projects

export interface TutorialSection {
  id: string
  title: string
  content: string
  syntax?: string
  usage?: string
  codeExample?: string
}

export interface Tutorial {
  title: string
  description: string
  icon: string
  sections: TutorialSection[]
}

// Language syntax templates for code generation
const SYNTAX_TEMPLATES = {
  // Variables
  variable: {
    javascript: 'let name = "value";',
    typescript: 'let name: string = "value";',
    python: 'name = "value"',
    java: 'String name = "value";',
    go: 'name := "value"',
    rust: 'let name = "value";',
    csharp: 'string name = "value";',
    swift: 'let name = "value"',
    kotlin: 'val name = "value"',
  },
  // Functions
  function: {
    javascript: 'function greet(name) { return `Hello, ${name}`; }',
    typescript: 'function greet(name: string): string { return `Hello, ${name}`; }',
    python: 'def greet(name):\n    return f"Hello, {name}"',
    java: 'public String greet(String name) { return "Hello, " + name; }',
    go: 'func greet(name string) string { return "Hello, " + name }',
    rust: 'fn greet(name: &str) -> String { format!("Hello, {}", name) }',
  },
  // Loops
  forLoop: {
    javascript: 'for (let i = 0; i < 10; i++) { console.log(i); }',
    python: 'for i in range(10):\n    print(i)',
    java: 'for (int i = 0; i < 10; i++) { System.out.println(i); }',
    go: 'for i := 0; i < 10; i++ { fmt.Println(i) }',
  },
  // Classes
  class: {
    javascript: 'class Person { constructor(name) { this.name = name; } }',
    typescript: 'class Person { name: string; constructor(name: string) { this.name = name; } }',
    python: 'class Person:\n    def __init__(self, name):\n        self.name = name',
    java: 'public class Person { private String name; public Person(String name) { this.name = name; } }',
  }
}

// Generate comprehensive tutorial for ANY language
export function generateComprehensiveTutorial(
  languageId: string,
  languageName: string,
  icon: string,
  description: string
): Tutorial {
  // Detect language type
  const languageType = detectLanguageType(languageId)

  // Generate appropriate sections based on language type
  const sections = generateSectionsForLanguageType(languageId, languageName, languageType)

  return {
    title: `Master ${languageName}`,
    description: `Complete ${languageName} tutorial - from basics to building real projects`,
    icon,
    sections
  }
}

// Detect what type of language/technology this is
function detectLanguageType(languageId: string): string {
  if (['html'].includes(languageId)) return 'markup'
  if (['css'].includes(languageId)) return 'styling'
  if (['javascript', 'typescript'].includes(languageId)) return 'scripting'
  if (['react', 'nextjs', 'vue'].includes(languageId)) return 'framework'
  if (['react-native', 'flutter', 'swift', 'kotlin'].includes(languageId)) return 'mobile'
  if (['python', 'java', 'go', 'rust', 'csharp'].includes(languageId)) return 'general'
  if (['nodejs', 'python-backend', 'java-backend'].includes(languageId)) return 'backend'
  if (['sql', 'postgresql', 'mongodb', 'redis', 'firebase-db'].includes(languageId)) return 'database'
  if (['tensorflow', 'pytorch', 'scikit-learn', 'python-ml'].includes(languageId)) return 'ml'
  if (['docker', 'kubernetes', 'terraform', 'aws', 'github-actions'].includes(languageId)) return 'devops'
  if (['solidity', 'web3js', 'ethereum'].includes(languageId)) return 'blockchain'

  return 'general' // Default
}

// Generate sections based on language type
function generateSectionsForLanguageType(
  languageId: string,
  languageName: string,
  languageType: string
): TutorialSection[] {

  switch (languageType) {
    case 'markup':
      return generateMarkupSections(languageName)
    case 'styling':
      return generateStylingSections(languageName)
    case 'scripting':
      return generateScriptingSections(languageId, languageName)
    case 'framework':
      return generateFrameworkSections(languageId, languageName)
    case 'mobile':
      return generateMobileSections(languageId, languageName)
    case 'general':
      return generateGeneralPurposeSections(languageId, languageName)
    case 'backend':
      return generateBackendSections(languageId, languageName)
    case 'database':
      return generateDatabaseSections(languageId, languageName)
    case 'ml':
      return generateMLSections(languageId, languageName)
    case 'devops':
      return generateDevOpsSections(languageId, languageName)
    case 'blockchain':
      return generateBlockchainSections(languageId, languageName)
    default:
      return generateGeneralPurposeSections(languageId, languageName)
  }
}

// ============================================
// MARKUP LANGUAGES (HTML)
// ============================================
function generateMarkupSections(lang: string): TutorialSection[] {
  return [
    { id: '1', title: 'Introduction to HTML', content: 'HTML structures web content using tags and elements.', syntax: '<tag>Content</tag>', usage: 'Create web page structure', codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello!</h1>\n</body>\n</html>' },
    { id: '2', title: 'Document Structure', content: 'Every HTML document has DOCTYPE, html, head, and body.', syntax: '<!DOCTYPE html>', usage: 'Proper document structure', codeExample: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Title</title>\n</head>\n<body>\n  <!-- Content -->\n</body>\n</html>' },
    { id: '3', title: 'Headings and Text', content: 'Use h1-h6 for headings, p for paragraphs, strong and em for emphasis.', syntax: '<h1> to <h6>, <p>', usage: 'Structure text content', codeExample: '<h1>Main Title</h1>\n<h2>Subtitle</h2>\n<p>This is a <strong>paragraph</strong> with <em>emphasis</em>.</p>' },
    { id: '4', title: 'Links', content: 'Create links with <a> tag.', syntax: '<a href="url">Text</a>', usage: 'Navigation between pages', codeExample: '<a href="https://example.com">Visit</a>\n<a href="page.html">Internal Link</a>\n<a href="#section">Jump to Section</a>' },
    { id: '5', title: 'Images', content: 'Embed images with <img> tag.', syntax: '<img src="path" alt="desc">', usage: 'Display images', codeExample: '<img src="photo.jpg" alt="Description" width="300">' },
    { id: '6', title: 'Lists', content: 'Create ordered (ol) and unordered (ul) lists.', syntax: '<ul>, <ol>, <li>', usage: 'Organize items', codeExample: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n\n<ol>\n  <li>First</li>\n  <li>Second</li>\n</ol>' },
    { id: '7', title: 'Tables', content: 'Display tabular data with tables.', syntax: '<table>, <tr>, <th>, <td>', usage: 'Organize data in rows/columns', codeExample: '<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>John</td>\n    <td>25</td>\n  </tr>\n</table>' },
    { id: '8', title: 'Forms - Basics', content: 'Collect user input with forms.', syntax: '<form>, <input>, <button>', usage: 'User data collection', codeExample: '<form action="/submit" method="POST">\n  <label>Name:</label>\n  <input type="text" name="name" required>\n  <button type="submit">Submit</button>\n</form>' },
    { id: '9', title: 'Forms - Input Types', content: 'HTML5 provides many input types.', syntax: 'text, email, password, number, date, checkbox, radio', usage: 'Different inputs for different data', codeExample: '<input type="email" required>\n<input type="password">\n<input type="number" min="0" max="100">\n<input type="date">\n<input type="checkbox" id="agree">\n<input type="radio" name="choice" value="a">' },
    { id: '10', title: 'Semantic HTML', content: 'Use semantic tags for better structure.', syntax: '<header>, <nav>, <main>, <article>, <footer>', usage: 'Meaningful structure, better SEO', codeExample: '<header>\n  <nav><!-- Navigation --></nav>\n</header>\n<main>\n  <article><!-- Content --></article>\n</main>\n<footer><!-- Footer --></footer>' },
    { id: '11', title: 'Div and Span', content: 'Generic containers for grouping.', syntax: '<div>, <span>', usage: 'Layout and styling containers', codeExample: '<div class="container">\n  <p>Text with <span class="highlight">highlighted</span> word.</p>\n</div>' },
    { id: '12', title: 'Attributes', content: 'Attributes provide additional information.', syntax: 'id, class, style, data-*', usage: 'Customize elements', codeExample: '<div id="main" class="container" data-role="admin">\n  <p style="color: blue;">Content</p>\n</div>' },
    { id: '13', title: 'Media Elements', content: 'Embed audio and video.', syntax: '<audio>, <video>', usage: 'Multimedia content', codeExample: '<video width="640" height="360" controls>\n  <source src="video.mp4" type="video/mp4">\n</video>' },
    { id: '14', title: 'Meta Tags', content: 'Metadata for SEO and responsive design.', syntax: '<meta>', usage: 'Page information, SEO', codeExample: '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="Page description">' },
    { id: '15', title: 'Best Practices', content: 'Use semantic HTML, validate markup, proper indentation.', syntax: 'N/A', usage: 'Maintainable, accessible code', codeExample: '<!-- Good: semantic, clean -->\n<header>\n  <h1>Title</h1>\n  <nav><a href="#home">Home</a></nav>\n</header>\n\n<!-- Bad: non-semantic, inline styles -->\n<div style="color:red">Title</div>' },
    { id: '16', title: 'Project: Portfolio Page', content: 'Build a personal portfolio webpage.', syntax: 'N/A', usage: 'Apply all HTML skills', codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>My Portfolio</title>\n</head>\n<body>\n  <header>\n    <h1>John Doe</h1>\n    <nav>\n      <a href="#about">About</a>\n      <a href="#projects">Projects</a>\n    </nav>\n  </header>\n  <main>\n    <section id="about">\n      <h2>About Me</h2>\n      <p>I\'m a web developer...</p>\n    </section>\n  </main>\n  <footer>© 2024</footer>\n</body>\n</html>' }
  ]
}

// ============================================
// STYLING LANGUAGES (CSS)
// ============================================
function generateStylingSections(lang: string): TutorialSection[] {
  return [
    { id: '1', title: 'Introduction to CSS', content: 'CSS styles HTML elements with colors, layouts, and animations.', syntax: 'selector { property: value; }', usage: 'Visual presentation of webpages', codeExample: 'h1 {\n  color: blue;\n  font-size: 32px;\n  text-align: center;\n}' },
    { id: '2', title: 'Selectors', content: 'Target elements with element, class, ID selectors.', syntax: 'element, .class, #id', usage: 'Select elements to style', codeExample: 'p { color: black; }\n.highlight { background: yellow; }\n#header { font-size: 24px; }' },
    { id: '3', title: 'Colors and Backgrounds', content: 'Set colors with hex, RGB, or named colors.', syntax: 'color, background-color, background-image', usage: 'Colorful designs', codeExample: 'h1 { color: #3366cc; }\ndiv { background-color: rgba(255, 0, 0, 0.5); }\n.hero { background: linear-gradient(to right, #ff6b6b, #4ecdc4); }' },
    { id: '4', title: 'Box Model', content: 'Every element has content, padding, border, margin.', syntax: 'width, height, padding, border, margin', usage: 'Control spacing and sizing', codeExample: '.box {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid black;\n  margin: 10px;\n  box-sizing: border-box;\n}' },
    { id: '5', title: 'Typography', content: 'Control font family, size, weight, line height.', syntax: 'font-family, font-size, font-weight', usage: 'Beautiful text styling', codeExample: 'body {\n  font-family: Arial, sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n}\nh1 {\n  font-size: 2.5rem;\n  font-weight: bold;\n}' },
    { id: '6', title: 'Flexbox', content: 'One-dimensional layout system.', syntax: 'display: flex, justify-content, align-items', usage: 'Flexible layouts', codeExample: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n}' },
    { id: '7', title: 'Grid', content: 'Two-dimensional layout system.', syntax: 'display: grid, grid-template-columns', usage: 'Complex layouts', codeExample: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}' },
    { id: '8', title: 'Positioning', content: 'Control element positioning.', syntax: 'position: static | relative | absolute | fixed', usage: 'Precise element placement', codeExample: '.fixed {\n  position: fixed;\n  top: 0;\n  width: 100%;\n}\n.absolute {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}' },
    { id: '9', title: 'Responsive Design', content: 'Media queries for different screen sizes.', syntax: '@media (condition) { styles }', usage: 'Mobile-friendly websites', codeExample: '.container { width: 100%; }\n@media (min-width: 768px) {\n  .container { width: 750px; }\n}\n@media (min-width: 1024px) {\n  .container { width: 1000px; }\n}' },
    { id: '10', title: 'Transitions', content: 'Smooth property changes.', syntax: 'transition: property duration', usage: 'Animated hover effects', codeExample: 'button {\n  background: blue;\n  transition: background 0.3s ease;\n}\nbutton:hover {\n  background: darkblue;\n}' },
    { id: '11', title: 'Animations', content: 'Complex motion with keyframes.', syntax: '@keyframes name { ... }', usage: 'Engaging animations', codeExample: '@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.fade { animation: fadeIn 1s ease; }' },
    { id: '12', title: 'Transforms', content: 'Rotate, scale, translate elements.', syntax: 'transform: rotate() | scale() | translate()', usage: 'Visual effects', codeExample: '.rotate { transform: rotate(45deg); }\n.scale { transform: scale(1.5); }\n.move { transform: translateX(50px); }' },
    { id: '13', title: 'Pseudo-classes', content: 'Style element states.', syntax: ':hover, :focus, :nth-child', usage: 'Interactive states', codeExample: 'a:hover { color: red; }\ninput:focus { border-color: blue; }\nli:nth-child(odd) { background: #f9f9f9; }' },
    { id: '14', title: 'CSS Variables', content: 'Reusable custom properties.', syntax: '--var-name: value; var(--var-name)', usage: 'Maintainable, themeable code', codeExample: ':root {\n  --primary: #3498db;\n  --spacing: 20px;\n}\n.btn {\n  background: var(--primary);\n  padding: var(--spacing);\n}' },
    { id: '15', title: 'Best Practices', content: 'Organize code, use meaningful names, mobile-first.', syntax: 'N/A', usage: 'Scalable, maintainable CSS', codeExample: '/* Good: organized, mobile-first */\n.card { width: 100%; }\n@media (min-width: 768px) {\n  .card { width: 350px; }\n}\n\n/* Bad: !important, overly specific */\n.bad { color: red !important; }' },
    { id: '16', title: 'Project: Responsive Landing Page', content: 'Build a complete responsive landing page.', syntax: 'N/A', usage: 'Apply all CSS skills', codeExample: ':root { --primary: #667eea; }\n* { margin: 0; padding: 0; box-sizing: border-box; }\n.hero {\n  background: linear-gradient(135deg, var(--primary), #764ba2);\n  padding: 100px 2rem;\n  text-align: center;\n  color: white;\n}\n.features {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n}' }
  ]
}

// ============================================
// SCRIPTING LANGUAGES (JavaScript, TypeScript)
// ============================================
function generateScriptingSections(languageId: string, lang: string): TutorialSection[] {
  const isTS = languageId.includes('typescript')
  const sections: TutorialSection[] = []

  sections.push(
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} is ${isTS ? 'a typed superset of JavaScript' : 'the programming language of the web'}.`, syntax: isTS ? 'let name: string = "value";' : 'let name = "value";', usage: 'Build interactive web applications', codeExample: isTS ? '// TypeScript\nlet name: string = "Alice";\nfunction greet(person: string): string {\n  return `Hello, ${person}!`;\n}\nconsole.log(greet(name));' : '// JavaScript\nlet name = "Alice";\nfunction greet(person) {\n  return `Hello, ${person}!`;\n}\nconsole.log(greet(name));' },
    { id: '2', title: 'Variables', content: 'Use let and const to declare variables.', syntax: 'let, const', usage: 'Store data', codeExample: 'const PI = 3.14;\nlet score = 0;\nscore += 10;' },
    { id: '3', title: 'Data Types', content: 'String, number, boolean, array, object.', syntax: 'string, number, boolean, array, object', usage: 'Different types for different data', codeExample: isTS ? 'let str: string = "hello";\nlet num: number = 42;\nlet arr: number[] = [1, 2, 3];\nlet obj: {name: string} = {name: "Alice"};' : 'let str = "hello";\nlet num = 42;\nlet arr = [1, 2, 3];\nlet obj = {name: "Alice"};' },
    { id: '4', title: 'Operators', content: 'Arithmetic, comparison, logical operators.', syntax: '+, -, *, /, ===, &&, ||', usage: 'Calculations and comparisons', codeExample: 'let sum = 10 + 5;\nlet isEqual = (5 === 5);\nlet isTrue = true && false;' },
    { id: '5', title: 'If Statements', content: 'Conditional logic with if/else.', syntax: 'if (condition) { ... } else { ... }', usage: 'Make decisions', codeExample: 'let age = 20;\nif (age >= 18) {\n  console.log("Adult");\n} else {\n  console.log("Minor");\n}' },
    { id: '6', title: 'Loops', content: 'Repeat code with for and while loops.', syntax: 'for, while', usage: 'Iterate over data', codeExample: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n\nlet count = 0;\nwhile (count < 5) {\n  console.log(count);\n  count++;\n}' },
    { id: '7', title: 'Functions', content: 'Reusable blocks of code.', syntax: 'function name() { ... }', usage: 'Organize and reuse code', codeExample: 'function add(a, b) {\n  return a + b;\n}\nconst result = add(5, 3);' },
    { id: '8', title: 'Arrow Functions', content: 'Concise function syntax.', syntax: '(params) => expression', usage: 'Modern function syntax', codeExample: 'const add = (a, b) => a + b;\nconst greet = name => `Hello, ${name}`;' },
    { id: '9', title: 'Arrays', content: 'Ordered collections of values.', syntax: '[1, 2, 3]', usage: 'Store lists of data', codeExample: 'let fruits = ["apple", "banana"];\nfruits.push("orange");\nfruits.map(f => f.toUpperCase());' },
    { id: '10', title: 'Objects', content: 'Key-value pairs.', syntax: '{key: value}', usage: 'Store structured data', codeExample: 'let person = {\n  name: "Alice",\n  age: 25,\n  greet() {\n    console.log(`Hi, I\'m ${this.name}`);\n  }\n};' },
    { id: '11', title: 'Classes', content: 'Object-oriented programming with classes.', syntax: 'class Name { ... }', usage: 'Create reusable object templates', codeExample: 'class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return `Hello, ${this.name}`;\n  }\n}\nconst alice = new Person("Alice");' },
    { id: '12', title: 'DOM Manipulation', content: 'Select and modify HTML elements.', syntax: 'document.querySelector()', usage: 'Make pages interactive', codeExample: 'const btn = document.querySelector("#myBtn");\nbtn.textContent = "Click me!";\nbtn.addEventListener("click", () => {\n  alert("Clicked!");\n});' },
    { id: '13', title: 'Events', content: 'Respond to user actions.', syntax: 'addEventListener("event", handler)', usage: 'Interactive user interfaces', codeExample: 'button.addEventListener("click", () => {\n  console.log("Clicked!");\n});\ninput.addEventListener("change", (e) => {\n  console.log(e.target.value);\n});' },
    { id: '14', title: 'Async/Await', content: 'Handle asynchronous operations.', syntax: 'async/await, Promise', usage: 'API calls, async operations', codeExample: 'async function fetchData() {\n  const response = await fetch("/api/data");\n  const data = await response.json();\n  return data;\n}\nfetchData().then(data => console.log(data));' },
    { id: '15', title: 'Modules', content: 'Import and export code between files.', syntax: 'import/export', usage: 'Organize code into modules', codeExample: '// math.js\nexport function add(a, b) { return a + b; }\n\n// main.js\nimport { add } from "./math.js";\nconsole.log(add(5, 3));' },
    { id: '16', title: 'Error Handling', content: 'Handle errors gracefully.', syntax: 'try/catch/finally', usage: 'Prevent crashes', codeExample: 'try {\n  const data = JSON.parse(invalidJSON);\n} catch (error) {\n  console.error("Parse error:", error);\n} finally {\n  console.log("Done");\n}' },
    { id: '17', title: 'Project: Todo App', content: 'Build a complete todo list application.', syntax: 'N/A', usage: 'Apply all skills', codeExample: 'const todos = [];\nfunction addTodo(text) {\n  todos.push({ id: Date.now(), text, done: false });\n  render();\n}\nfunction toggleTodo(id) {\n  const todo = todos.find(t => t.id === id);\n  todo.done = !todo.done;\n  render();\n}\nfunction render() {\n  const list = document.querySelector("#todo-list");\n  list.innerHTML = todos.map(t => \n    `<li class="${t.done ? "done" : ""}">${t.text}</li>`\n  ).join("");\n}' }
  )

  return sections
}

// ============================================
// GENERAL PURPOSE LANGUAGES (Python, Java, Go, Rust)
// ============================================
function generateGeneralPurposeSections(languageId: string, lang: string): TutorialSection[] {
  // Detect syntax based on language
  const syntax = getSyntaxForLanguage(languageId)

  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} is a ${getLanguageDescription(languageId)}.`, syntax: syntax.variable, usage: 'Build applications, scripts, and systems', codeExample: syntax.helloWorld },
    { id: '2', title: 'Variables', content: 'Store and manipulate data.', syntax: syntax.variable, usage: 'Store data for later use', codeExample: syntax.variableExample },
    { id: '3', title: 'Data Types', content: `${lang} has various data types for different purposes.`, syntax: 'string, number, boolean, etc.', usage: 'Different types for different data', codeExample: syntax.dataTypes },
    { id: '4', title: 'Operators', content: 'Perform arithmetic, comparison, and logical operations.', syntax: '+, -, *, /, ==, &&, ||', usage: 'Calculate and compare values', codeExample: syntax.operators },
    { id: '5', title: 'If/Else Statements', content: 'Make decisions in code.', syntax: syntax.ifStatement, usage: 'Conditional logic', codeExample: syntax.ifExample },
    { id: '6', title: 'Loops', content: 'Repeat code multiple times.', syntax: syntax.forLoop, usage: 'Iterate over collections', codeExample: syntax.loopExample },
    { id: '7', title: 'Functions', content: 'Reusable blocks of code.', syntax: syntax.function, usage: 'Organize and reuse code', codeExample: syntax.functionExample },
    { id: '8', title: 'Lists/Arrays', content: 'Ordered collections of items.', syntax: syntax.array, usage: 'Store multiple values', codeExample: syntax.arrayExample },
    { id: '9', title: 'Dictionaries/Maps', content: 'Key-value pairs.', syntax: syntax.map, usage: 'Associate keys with values', codeExample: syntax.mapExample },
    { id: '10', title: 'Classes', content: 'Object-oriented programming with classes.', syntax: syntax.class, usage: 'Create custom types', codeExample: syntax.classExample },
    { id: '11', title: 'Inheritance', content: 'Extend classes to reuse code.', syntax: 'class Child extends Parent', usage: 'Code reuse through inheritance', codeExample: syntax.inheritanceExample },
    { id: '12', title: 'File Reading', content: 'Read data from files.', syntax: syntax.fileRead, usage: 'Load data from disk', codeExample: syntax.fileReadExample },
    { id: '13', title: 'File Writing', content: 'Write data to files.', syntax: syntax.fileWrite, usage: 'Save data to disk', codeExample: syntax.fileWriteExample },
    { id: '14', title: 'Error Handling', content: 'Handle errors gracefully.', syntax: syntax.errorHandling, usage: 'Prevent crashes', codeExample: syntax.errorExample },
    { id: '15', title: 'Modules/Packages', content: 'Organize code into reusable modules.', syntax: syntax.import, usage: 'Code organization', codeExample: syntax.importExample },
    { id: '16', title: 'Project: Calculator', content: 'Build a functional calculator.', syntax: 'N/A', usage: 'Apply all concepts', codeExample: syntax.calculatorExample }
  ]
}

// Helper to get language-specific syntax
function getSyntaxForLanguage(languageId: string) {
  if (languageId === 'python' || languageId.includes('python')) {
    return {
      variable: 'name = value',
      helloWorld: '# Python\nprint("Hello, World!")',
      variableExample: 'name = "Alice"\nage = 25\nis_student = True',
      dataTypes: 'text = "hello"  # str\nnumber = 42  # int\npi = 3.14  # float\nactive = True  # bool',
      operators: 'sum = 10 + 5\nis_equal = (5 == 5)\nis_true = True and False',
      ifStatement: 'if condition:\n    # code\nelse:\n    # code',
      ifExample: 'age = 20\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")',
      forLoop: 'for i in range(10):',
      loopExample: 'for i in range(5):\n    print(i)\n\nfor item in ["a", "b", "c"]:\n    print(item)',
      function: 'def name(params):',
      functionExample: 'def greet(name):\n    return f"Hello, {name}"\n\nresult = greet("Alice")',
      array: '[1, 2, 3]',
      arrayExample: 'fruits = ["apple", "banana"]\nfruits.append("orange")\nprint(fruits[0])',
      map: '{key: value}',
      mapExample: 'person = {\n    "name": "Alice",\n    "age": 25\n}\nprint(person["name"])',
      class: 'class Name:',
      classExample: 'class Person:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f"Hi, I\'m {self.name}"\n\nalice = Person("Alice")',
      inheritanceExample: 'class Student(Person):\n    def __init__(self, name, grade):\n        super().__init__(name)\n        self.grade = grade',
      fileRead: 'with open("file.txt", "r") as f:',
      fileReadExample: 'with open("data.txt", "r") as file:\n    content = file.read()\n    print(content)',
      fileWrite: 'with open("file.txt", "w") as f:',
      fileWriteExample: 'with open("output.txt", "w") as file:\n    file.write("Hello, File!")',
      errorHandling: 'try/except/finally',
      errorExample: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\nfinally:\n    print("Done")',
      import: 'import module or from module import function',
      importExample: 'import math\nprint(math.pi)\n\nfrom datetime import datetime\nprint(datetime.now())',
      calculatorExample: 'def add(a, b): return a + b\ndef subtract(a, b): return a - b\ndef multiply(a, b): return a * b\ndef divide(a, b): return a / b if b != 0 else "Error"\n\nprint(add(5, 3))'
    }
  }

  // Default generic syntax (works for most languages)
  return {
    variable: 'let name = value',
    helloWorld: `// ${languageId}\nconsole.log("Hello, World!");`,
    variableExample: 'let name = "Alice";\nlet age = 25;',
    dataTypes: 'string, number, boolean, array, object',
    operators: 'Arithmetic: +, -, *, /\nComparison: ==, !=, <, >\nLogical: &&, ||, !',
    ifStatement: 'if (condition) { } else { }',
    ifExample: 'if (age >= 18) {\n  console.log("Adult");\n}',
    forLoop: 'for (let i = 0; i < 10; i++) { }',
    loopExample: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}',
    function: 'function name(params) { }',
    functionExample: 'function greet(name) {\n  return `Hello, ${name}`;\n}',
    array: '[1, 2, 3]',
    arrayExample: 'let arr = [1, 2, 3];\narr.push(4);',
    map: '{key: value}',
    mapExample: 'let obj = {name: "Alice", age: 25};',
    class: 'class Name { }',
    classExample: 'class Person {\n  constructor(name) {\n    this.name = name;\n  }\n}',
    inheritanceExample: 'class Student extends Person { }',
    fileRead: 'Read file syntax',
    fileReadExample: '// File reading example',
    fileWrite: 'Write file syntax',
    fileWriteExample: '// File writing example',
    errorHandling: 'try/catch',
    errorExample: 'try {\n  // code\n} catch (error) {\n  console.error(error);\n}',
    import: 'import/export',
    importExample: 'import { module } from "package";',
    calculatorExample: '// Calculator implementation'
  }
}

function getLanguageDescription(languageId: string): string {
  const descriptions: Record<string, string> = {
    python: 'versatile, beginner-friendly language used for web dev, data science, AI, and automation',
    java: 'powerful, object-oriented language used for enterprise applications, Android development, and backend systems',
    javascript: 'dynamic language that powers the web, running in browsers and on servers',
    typescript: 'typed superset of JavaScript for building large-scale applications',
    go: 'simple, efficient language designed by Google for building fast, reliable software',
    rust: 'systems programming language focused on safety, speed, and concurrency',
    csharp: 'modern, object-oriented language from Microsoft for building Windows apps, games, and web services',
    swift: 'powerful language for iOS and Mac app development',
    kotlin: 'modern language for Android development and server-side applications',
  }
  return descriptions[languageId] || 'powerful programming language'
}

// Stub functions for other categories (similar structure to above)
function generateFrameworkSections(languageId: string, lang: string): TutorialSection[] {
  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} is a popular framework for building modern web applications.`, syntax: 'Component-based architecture', usage: 'Build interactive UIs', codeExample: `// ${lang} component example\nimport React from 'react';\n\nfunction App() {\n  return <h1>Hello, World!</h1>;\n}\n\nexport default App;` },
    // Add 15+ more sections: Components, Props, State, Hooks, Routing, etc.
  ]
}

function generateMobileSections(languageId: string, lang: string): TutorialSection[] {
  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} is used for building mobile applications.`, syntax: 'Mobile development framework', usage: 'Build iOS and Android apps', codeExample: `// ${lang} mobile app example` },
    // Add 15+ more sections
  ]
}

function generateBackendSections(languageId: string, lang: string): TutorialSection[] {
  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} is used for building server-side applications and APIs.`, syntax: 'Server-side programming', usage: 'Build backends and APIs', codeExample: `// ${lang} server example` },
    // Add 15+ more sections: HTTP, REST APIs, Databases, Authentication, etc.
  ]
}

function generateDatabaseSections(languageId: string, lang: string): TutorialSection[] {
  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} is a database system for storing and querying data.`, syntax: 'Database queries', usage: 'Store and retrieve data', codeExample: `-- ${lang} query example\nSELECT * FROM users WHERE age > 18;` },
    // Add 15+ more sections: CRUD, Joins, Indexes, Transactions, etc.
  ]
}

function generateMLSections(languageId: string, lang: string): TutorialSection[] {
  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} is a machine learning framework.`, syntax: 'ML models and training', usage: 'Build AI/ML models', codeExample: `# ${lang} ML example` },
    // Add 15+ more sections
  ]
}

function generateDevOpsSections(languageId: string, lang: string): TutorialSection[] {
  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} is a tool for ${languageId.includes('docker') ? 'containerization' : languageId.includes('kubernetes') ? 'container orchestration' : 'infrastructure management'}.`, syntax: 'DevOps automation', usage: 'Automate deployment and infrastructure', codeExample: `# ${lang} configuration example` },
    // Add 15+ more sections
  ]
}

function generateBlockchainSections(languageId: string, lang: string): TutorialSection[] {
  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} is used for blockchain and smart contract development.`, syntax: 'Blockchain programming', usage: 'Build decentralized applications', codeExample: `// ${lang} smart contract example` },
    // Add 15+ more sections
  ]
}
