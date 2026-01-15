// Mini-Projects for hands-on learning
// Build real things instead of just exercises

export interface ProjectFile {
  id: string
  name: string
  language: string
  starterCode: string
  solution: string
}

export interface ProjectStep {
  id: number
  title: string
  description: string
  hint: string
  targetFileId: string
  validation: string[] // Keywords/patterns to check for
}

export interface MiniProject {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  languages: string[]
  icon: string
  color: string
  files: ProjectFile[]
  steps: ProjectStep[]
  xpReward: number
}

export const MINI_PROJECTS: MiniProject[] = [
  {
    id: 'calculator',
    title: 'Build a Calculator',
    description: 'Create a working calculator with HTML, CSS, and JavaScript that can add, subtract, multiply, and divide.',
    difficulty: 'beginner',
    estimatedTime: '30 min',
    languages: ['html', 'css', 'javascript'],
    icon: '🧮',
    color: 'from-blue-500 to-cyan-500',
    xpReward: 300,
    files: [
      {
        id: 'html',
        name: 'index.html',
        language: 'html',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculator</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="calculator">
    <!-- Add your calculator display here -->

    <!-- Add your calculator buttons here -->

  </div>
  <script src="script.js"></script>
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculator</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="calculator">
    <div class="display" id="display">0</div>
    <div class="buttons">
      <button onclick="clearDisplay()">C</button>
      <button onclick="appendNumber('7')">7</button>
      <button onclick="appendNumber('8')">8</button>
      <button onclick="appendNumber('9')">9</button>
      <button onclick="setOperator('/')">/</button>
      <button onclick="appendNumber('4')">4</button>
      <button onclick="appendNumber('5')">5</button>
      <button onclick="appendNumber('6')">6</button>
      <button onclick="setOperator('*')">*</button>
      <button onclick="appendNumber('1')">1</button>
      <button onclick="appendNumber('2')">2</button>
      <button onclick="appendNumber('3')">3</button>
      <button onclick="setOperator('-')">-</button>
      <button onclick="appendNumber('0')">0</button>
      <button onclick="appendNumber('.')">.</button>
      <button onclick="calculate()">=</button>
      <button onclick="setOperator('+')">+</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`
      },
      {
        id: 'css',
        name: 'styles.css',
        language: 'css',
        starterCode: `/* Style your calculator here */
.calculator {
  /* Add styles */
}

.display {
  /* Add styles */
}

.buttons {
  /* Add styles */
}

button {
  /* Add styles */
}`,
        solution: `.calculator {
  width: 300px;
  margin: 50px auto;
  background: #333;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.display {
  background: #222;
  color: #0f0;
  font-size: 2rem;
  padding: 20px;
  text-align: right;
  border-radius: 5px;
  margin-bottom: 20px;
  font-family: monospace;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  padding: 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  background: #555;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #666;
}

button:active {
  background: #777;
}`
      },
      {
        id: 'javascript',
        name: 'script.js',
        language: 'javascript',
        starterCode: `// Calculator logic
let currentNumber = '0';
let previousNumber = '';
let operator = null;

function updateDisplay() {
  // Update the display element
}

function appendNumber(num) {
  // Add number to current input
}

function setOperator(op) {
  // Set the operator for calculation
}

function calculate() {
  // Perform the calculation
}

function clearDisplay() {
  // Reset the calculator
}`,
        solution: `let currentNumber = '0';
let previousNumber = '';
let operator = null;

function updateDisplay() {
  document.getElementById('display').textContent = currentNumber;
}

function appendNumber(num) {
  if (currentNumber === '0' && num !== '.') {
    currentNumber = num;
  } else {
    currentNumber += num;
  }
  updateDisplay();
}

function setOperator(op) {
  if (operator !== null) {
    calculate();
  }
  previousNumber = currentNumber;
  currentNumber = '0';
  operator = op;
}

function calculate() {
  if (operator === null || previousNumber === '') return;

  const prev = parseFloat(previousNumber);
  const curr = parseFloat(currentNumber);
  let result;

  switch(operator) {
    case '+': result = prev + curr; break;
    case '-': result = prev - curr; break;
    case '*': result = prev * curr; break;
    case '/': result = prev / curr; break;
  }

  currentNumber = result.toString();
  previousNumber = '';
  operator = null;
  updateDisplay();
}

function clearDisplay() {
  currentNumber = '0';
  previousNumber = '';
  operator = null;
  updateDisplay();
}`
      }
    ],
    steps: [
      {
        id: 1,
        title: 'Create the Display',
        description: 'Add a display div to show the calculator numbers',
        hint: 'Use a div with id="display" inside the calculator div',
        targetFileId: 'html',
        validation: ['display', 'id=']
      },
      {
        id: 2,
        title: 'Add Number Buttons',
        description: 'Add buttons for numbers 0-9',
        hint: 'Create button elements with onclick handlers',
        targetFileId: 'html',
        validation: ['button', 'onclick']
      },
      {
        id: 3,
        title: 'Style the Calculator',
        description: 'Make it look nice with CSS grid and colors',
        hint: 'Use display: grid for the button layout',
        targetFileId: 'css',
        validation: ['grid', 'background']
      },
      {
        id: 4,
        title: 'Implement appendNumber',
        description: 'Write the function to add digits to the display',
        hint: 'Concatenate the new digit to currentNumber',
        targetFileId: 'javascript',
        validation: ['currentNumber', 'updateDisplay']
      },
      {
        id: 5,
        title: 'Implement calculate',
        description: 'Write the function to perform calculations',
        hint: 'Use switch statement for different operators',
        targetFileId: 'javascript',
        validation: ['switch', 'result']
      }
    ]
  },
  {
    id: 'todo-list',
    title: 'Create a Todo List',
    description: 'Build a todo list app where you can add, complete, and delete tasks.',
    difficulty: 'beginner',
    estimatedTime: '25 min',
    languages: ['html', 'css', 'javascript'],
    icon: '✅',
    color: 'from-green-500 to-emerald-500',
    xpReward: 250,
    files: [
      {
        id: 'html',
        name: 'index.html',
        language: 'html',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo List</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>My Todo List</h1>

    <!-- Add input and button for new todos -->

    <!-- Add list to display todos -->

  </div>
  <script src="script.js"></script>
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo List</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>My Todo List</h1>
    <div class="input-container">
      <input type="text" id="todoInput" placeholder="Add a new task...">
      <button onclick="addTodo()">Add</button>
    </div>
    <ul id="todoList"></ul>
  </div>
  <script src="script.js"></script>
</body>
</html>`
      },
      {
        id: 'css',
        name: 'styles.css',
        language: 'css',
        starterCode: `body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}

.container {
  /* Style the container */
}

/* Add more styles */`,
        solution: `body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
  text-align: center;
  color: #333;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  margin-bottom: 10px;
  border-radius: 5px;
}

li.completed span {
  text-decoration: line-through;
  color: #888;
}

li span {
  flex: 1;
}

.delete-btn {
  background: #e74c3c;
  padding: 5px 10px;
}`
      },
      {
        id: 'javascript',
        name: 'script.js',
        language: 'javascript',
        starterCode: `// Todo list functionality
let todos = [];

function addTodo() {
  // Get input and add to list
}

function toggleTodo(index) {
  // Mark todo as complete/incomplete
}

function deleteTodo(index) {
  // Remove todo from list
}

function renderTodos() {
  // Update the display
}`,
        solution: `let todos = [];

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();

  if (text) {
    todos.push({ text, completed: false });
    input.value = '';
    renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = todos.map((todo, index) => \`
    <li class="\${todo.completed ? 'completed' : ''}">
      <input type="checkbox" \${todo.completed ? 'checked' : ''}
             onchange="toggleTodo(\${index})">
      <span>\${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(\${index})">Delete</button>
    </li>
  \`).join('');
}

// Allow Enter key to add todos
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });
});`
      }
    ],
    steps: [
      {
        id: 1,
        title: 'Add Input Field',
        description: 'Create an input field for new todos',
        hint: 'Use input type="text" with an id',
        targetFileId: 'html',
        validation: ['input', 'todoInput']
      },
      {
        id: 2,
        title: 'Add Todo List Container',
        description: 'Add a ul element to display todos',
        hint: 'Use ul with id="todoList"',
        targetFileId: 'html',
        validation: ['ul', 'todoList']
      },
      {
        id: 3,
        title: 'Style the Input',
        description: 'Make the input and button look nice',
        hint: 'Use flexbox for the input container',
        targetFileId: 'css',
        validation: ['flex', 'input']
      },
      {
        id: 4,
        title: 'Implement addTodo',
        description: 'Write the function to add new todos',
        hint: 'Push to the todos array and call renderTodos',
        targetFileId: 'javascript',
        validation: ['push', 'renderTodos']
      }
    ]
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description: 'Create a beautiful personal portfolio page to showcase your work.',
    difficulty: 'beginner',
    estimatedTime: '35 min',
    languages: ['html', 'css'],
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
    xpReward: 275,
    files: [
      {
        id: 'html',
        name: 'index.html',
        language: 'html',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Add navigation -->

  <!-- Add hero section with your name -->

  <!-- Add about section -->

  <!-- Add projects section -->

  <!-- Add contact section -->

</body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav>
    <div class="logo">MyPortfolio</div>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <section class="hero">
    <h1>Hi, I'm <span>Your Name</span></h1>
    <p>A passionate developer creating amazing things</p>
    <a href="#projects" class="btn">View My Work</a>
  </section>

  <section id="about" class="about">
    <h2>About Me</h2>
    <p>I'm a developer who loves building things for the web. I enjoy turning complex problems into simple, beautiful solutions.</p>
  </section>

  <section id="projects" class="projects">
    <h2>My Projects</h2>
    <div class="project-grid">
      <div class="project-card">
        <h3>Project 1</h3>
        <p>Description of project</p>
      </div>
      <div class="project-card">
        <h3>Project 2</h3>
        <p>Description of project</p>
      </div>
    </div>
  </section>

  <section id="contact" class="contact">
    <h2>Get In Touch</h2>
    <p>Feel free to reach out!</p>
    <a href="mailto:email@example.com" class="btn">Email Me</a>
  </section>
</body>
</html>`
      },
      {
        id: 'css',
        name: 'styles.css',
        language: 'css',
        starterCode: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
}

/* Add your styles */`,
        solution: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background: #333;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

nav ul {
  display: flex;
  list-style: none;
  gap: 30px;
}

nav a {
  color: white;
  text-decoration: none;
}

.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero span {
  color: #ffd700;
}

.btn {
  display: inline-block;
  padding: 15px 30px;
  background: #ffd700;
  color: #333;
  text-decoration: none;
  border-radius: 30px;
  margin-top: 20px;
  font-weight: bold;
}

section {
  padding: 80px 50px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background: #f5f5f5;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.contact {
  text-align: center;
  background: #333;
  color: white;
}`
      }
    ],
    steps: [
      {
        id: 1,
        title: 'Create Navigation',
        description: 'Add a navigation bar with links',
        hint: 'Use nav with ul and li elements',
        targetFileId: 'html',
        validation: ['nav', 'ul', 'li']
      },
      {
        id: 2,
        title: 'Create Hero Section',
        description: 'Add a hero section with your name and intro',
        hint: 'Use a section with class="hero"',
        targetFileId: 'html',
        validation: ['hero', 'h1']
      },
      {
        id: 3,
        title: 'Add Projects Section',
        description: 'Create a grid of project cards',
        hint: 'Use CSS grid for the layout',
        targetFileId: 'html',
        validation: ['projects', 'project-card']
      },
      {
        id: 4,
        title: 'Style the Hero',
        description: 'Make the hero section stand out',
        hint: 'Use gradient background and flexbox centering',
        targetFileId: 'css',
        validation: ['gradient', 'flex']
      }
    ]
  },
  {
    id: 'quiz-app',
    title: 'Quiz App',
    description: 'Build an interactive quiz app with multiple choice questions and scoring.',
    difficulty: 'intermediate',
    estimatedTime: '45 min',
    languages: ['html', 'css', 'javascript'],
    icon: '❓',
    color: 'from-orange-500 to-red-500',
    xpReward: 400,
    files: [
      {
        id: 'html',
        name: 'index.html',
        language: 'html',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quiz App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="quiz-container">
    <div id="quiz">
      <!-- Quiz content will be generated by JavaScript -->
    </div>
    <div id="results" class="hidden">
      <!-- Results will show here -->
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quiz App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="quiz-container">
    <div id="quiz">
      <h2 id="question"></h2>
      <div id="answers"></div>
      <button id="nextBtn" onclick="nextQuestion()">Next Question</button>
    </div>
    <div id="results" class="hidden">
      <h2>Quiz Complete!</h2>
      <p id="score"></p>
      <button onclick="restartQuiz()">Try Again</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`
      },
      {
        id: 'css',
        name: 'styles.css',
        language: 'css',
        starterCode: `body {
  font-family: Arial, sans-serif;
  background: #1a1a2e;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quiz-container {
  /* Add styles */
}`,
        solution: `body {
  font-family: Arial, sans-serif;
  background: #1a1a2e;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.quiz-container {
  background: #16213e;
  padding: 40px;
  border-radius: 15px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

h2 {
  margin-bottom: 30px;
}

#answers {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.answer-btn {
  padding: 15px 20px;
  background: #0f3460;
  border: 2px solid #e94560;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.answer-btn:hover {
  background: #e94560;
}

.answer-btn.correct {
  background: #27ae60;
  border-color: #27ae60;
}

.answer-btn.wrong {
  background: #c0392b;
  border-color: #c0392b;
}

button {
  padding: 15px 30px;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

.hidden {
  display: none;
}

#score {
  font-size: 24px;
  margin: 20px 0;
}`
      },
      {
        id: 'javascript',
        name: 'script.js',
        language: 'javascript',
        starterCode: `// Quiz questions
const questions = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"],
    correct: 0
  },
  // Add more questions
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  // Display current question and answers
}

function selectAnswer(index) {
  // Check if answer is correct
}

function nextQuestion() {
  // Move to next question
}

function showResults() {
  // Display final score
}

// Start the quiz
showQuestion();`,
        solution: `const questions = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"],
    correct: 0
  },
  {
    question: "What does CSS stand for?",
    answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System"],
    correct: 1
  },
  {
    question: "Which language runs in the browser?",
    answers: ["Java", "Python", "JavaScript"],
    correct: 2
  },
  {
    question: "What year was JavaScript created?",
    answers: ["1995", "2000", "1990"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question').textContent = q.question;

  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = q.answers.map((answer, i) =>
    \`<button class="answer-btn" onclick="selectAnswer(\${i})">\${answer}</button>\`
  ).join('');

  answered = false;
  document.getElementById('nextBtn').style.display = 'none';
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll('.answer-btn');

  buttons.forEach((btn, i) => {
    if (i === q.correct) {
      btn.classList.add('correct');
    } else if (i === index) {
      btn.classList.add('wrong');
    }
    btn.style.pointerEvents = 'none';
  });

  if (index === q.correct) {
    score++;
  }

  document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('score').textContent =
    \`You scored \${score} out of \${questions.length}!\`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('quiz').classList.remove('hidden');
  document.getElementById('results').classList.add('hidden');
  showQuestion();
}

showQuestion();`
      }
    ],
    steps: [
      {
        id: 1,
        title: 'Create Quiz Structure',
        description: 'Add HTML elements for question and answers',
        hint: 'Add elements with IDs for question and answers',
        targetFileId: 'html',
        validation: ['question', 'answers']
      },
      {
        id: 2,
        title: 'Style Answer Buttons',
        description: 'Create attractive answer buttons',
        hint: 'Use flex-direction: column for stacking',
        targetFileId: 'css',
        validation: ['answer-btn', 'flex']
      },
      {
        id: 3,
        title: 'Add More Questions',
        description: 'Add at least 3 more quiz questions',
        hint: 'Follow the same object structure',
        targetFileId: 'javascript',
        validation: ['question:', 'answers:', 'correct:']
      },
      {
        id: 4,
        title: 'Implement selectAnswer',
        description: 'Check answers and show correct/wrong',
        hint: 'Use classList.add to apply styles',
        targetFileId: 'javascript',
        validation: ['classList', 'correct']
      },
      {
        id: 5,
        title: 'Show Final Score',
        description: 'Display results at the end',
        hint: 'Hide quiz div and show results div',
        targetFileId: 'javascript',
        validation: ['score', 'results']
      }
    ]
  },
  {
    id: 'weather-display',
    title: 'Weather Display',
    description: 'Create a weather display that shows current conditions with dynamic styling.',
    difficulty: 'intermediate',
    estimatedTime: '40 min',
    languages: ['html', 'css', 'javascript'],
    icon: '🌤️',
    color: 'from-sky-500 to-blue-600',
    xpReward: 350,
    files: [
      {
        id: 'html',
        name: 'index.html',
        language: 'html',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Weather Display</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="weather-card" id="weatherCard">
    <!-- Add weather display elements -->
  </div>
  <script src="script.js"></script>
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Weather Display</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="weather-card" id="weatherCard">
    <div class="location">
      <h1 id="city">San Francisco</h1>
      <p id="date"></p>
    </div>
    <div class="weather-icon" id="icon">☀️</div>
    <div class="temperature">
      <span id="temp">72</span>°F
    </div>
    <div class="condition" id="condition">Sunny</div>
    <div class="details">
      <div class="detail">
        <span>💧</span>
        <span id="humidity">45%</span>
      </div>
      <div class="detail">
        <span>💨</span>
        <span id="wind">12 mph</span>
      </div>
    </div>
    <div class="weather-buttons">
      <button onclick="setWeather('sunny')">Sunny</button>
      <button onclick="setWeather('cloudy')">Cloudy</button>
      <button onclick="setWeather('rainy')">Rainy</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`
      },
      {
        id: 'css',
        name: 'styles.css',
        language: 'css',
        starterCode: `body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
}

.weather-card {
  /* Style the card */
}`,
        solution: `body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  transition: background 0.5s;
}

body.sunny { background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); }
body.cloudy { background: linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%); }
body.rainy { background: linear-gradient(135deg, #4b79a1 0%, #283e51 100%); }

.weather-card {
  background: rgba(255,255,255,0.9);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  min-width: 350px;
}

.location h1 {
  margin: 0;
  font-size: 28px;
  color: #333;
}

.location p {
  color: #666;
  margin-top: 5px;
}

.weather-icon {
  font-size: 100px;
  margin: 20px 0;
}

.temperature {
  font-size: 60px;
  font-weight: bold;
  color: #333;
}

.condition {
  font-size: 24px;
  color: #666;
  margin: 10px 0 20px;
}

.details {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
}

.detail {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
}

.weather-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.weather-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s;
}

.weather-buttons button:hover {
  transform: scale(1.05);
}`
      },
      {
        id: 'javascript',
        name: 'script.js',
        language: 'javascript',
        starterCode: `// Weather data
const weatherData = {
  sunny: { icon: '☀️', temp: 72, condition: 'Sunny', humidity: '45%', wind: '12 mph' },
  cloudy: { icon: '☁️', temp: 65, condition: 'Cloudy', humidity: '60%', wind: '8 mph' },
  rainy: { icon: '🌧️', temp: 58, condition: 'Rainy', humidity: '85%', wind: '15 mph' }
};

function setWeather(type) {
  // Update the display with weather data
}

function updateDate() {
  // Show current date
}

// Initialize
updateDate();`,
        solution: `const weatherData = {
  sunny: { icon: '☀️', temp: 72, condition: 'Sunny', humidity: '45%', wind: '12 mph' },
  cloudy: { icon: '☁️', temp: 65, condition: 'Cloudy', humidity: '60%', wind: '8 mph' },
  rainy: { icon: '🌧️', temp: 58, condition: 'Rainy', humidity: '85%', wind: '15 mph' }
};

function setWeather(type) {
  const data = weatherData[type];

  document.getElementById('icon').textContent = data.icon;
  document.getElementById('temp').textContent = data.temp;
  document.getElementById('condition').textContent = data.condition;
  document.getElementById('humidity').textContent = data.humidity;
  document.getElementById('wind').textContent = data.wind;

  document.body.className = type;
}

function updateDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', options);
  document.getElementById('date').textContent = today;
}

updateDate();
setWeather('sunny');`
      }
    ],
    steps: [
      {
        id: 1,
        title: 'Create Weather Card Layout',
        description: 'Add elements for temperature, icon, and conditions',
        hint: 'Use divs with appropriate IDs',
        targetFileId: 'html',
        validation: ['temp', 'icon', 'condition']
      },
      {
        id: 2,
        title: 'Add Weather Toggle Buttons',
        description: 'Create buttons to switch between weather types',
        hint: 'Use onclick to call setWeather function',
        targetFileId: 'html',
        validation: ['button', 'setWeather']
      },
      {
        id: 3,
        title: 'Style for Different Weather',
        description: 'Create background styles for each weather type',
        hint: 'Use body.sunny, body.cloudy classes',
        targetFileId: 'css',
        validation: ['sunny', 'cloudy', 'rainy', 'gradient']
      },
      {
        id: 4,
        title: 'Implement setWeather',
        description: 'Update all display elements with weather data',
        hint: 'Use getElementById and textContent',
        targetFileId: 'javascript',
        validation: ['getElementById', 'textContent']
      }
    ]
  }
]

// Get a project by ID
export function getProjectById(id: string): MiniProject | undefined {
  return MINI_PROJECTS.find(p => p.id === id)
}

// Get projects by difficulty
export function getProjectsByDifficulty(difficulty: MiniProject['difficulty']): MiniProject[] {
  return MINI_PROJECTS.filter(p => p.difficulty === difficulty)
}
