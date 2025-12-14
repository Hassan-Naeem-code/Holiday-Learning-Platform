// INTERACTIVE SANDBOX EXERCISES
// Practice exercises for each tutorial concept
// Users write real code and see it run!

export interface SandboxExercise {
  id: string
  title: string
  description: string
  instructions: string
  starterCode: string
  solution: string
  hint: string
  validation?: (code: string) => boolean
  expectedOutput?: string
}

export interface SandboxExerciseSet {
  languageId: string
  languageName: string
  exercises: SandboxExercise[]
}

// Generate interactive exercises for any language
export function generateSandboxExercises(
  languageId: string,
  languageName: string
): SandboxExerciseSet {
  const languageType = detectLanguageType(languageId)
  const exercises = generateExercisesForLanguageType(languageId, languageName, languageType)

  return {
    languageId,
    languageName,
    exercises
  }
}

function detectLanguageType(languageId: string): string {
  if (['html'].includes(languageId)) return 'markup'
  if (['css'].includes(languageId)) return 'styling'
  if (['javascript', 'typescript'].includes(languageId)) return 'scripting'
  if (['react', 'nextjs', 'vue'].includes(languageId)) return 'framework'
  if (['python', 'java', 'go', 'rust', 'csharp'].includes(languageId)) return 'general'
  return 'general'
}

function generateExercisesForLanguageType(
  languageId: string,
  languageName: string,
  languageType: string
): SandboxExercise[] {
  switch (languageType) {
    case 'markup':
      return generateHTMLExercises()
    case 'styling':
      return generateCSSExercises()
    case 'scripting':
      return generateJavaScriptExercises(languageId)
    case 'general':
      return generateGeneralPurposeExercises(languageId, languageName)
    default:
      return generateGeneralPurposeExercises(languageId, languageName)
  }
}

// ============================================
// HTML EXERCISES
// ============================================
function generateHTMLExercises(): SandboxExercise[] {
  return [
    {
      id: '1',
      title: 'Your First HTML Page',
      description: 'Create a basic HTML page with a title and heading.',
      instructions: 'Create an HTML page with a title "My First Page" and an h1 heading that says "Hello, World!"',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <!-- Add your title here -->
</head>
<body>
  <!-- Add your h1 heading here -->
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>`,
      hint: 'Use <title> in the head and <h1> in the body',
      expectedOutput: 'Page displays "Hello, World!" as a heading'
    },
    {
      id: '2',
      title: 'Text Elements',
      description: 'Practice using different text elements.',
      instructions: 'Create a paragraph with some bold text and some italic text.',
      starterCode: `<p>
  <!-- Make "important" bold and "emphasized" italic -->
  This is important and this is emphasized.
</p>`,
      solution: `<p>
  This is <strong>important</strong> and this is <em>emphasized</em>.
</p>`,
      hint: 'Use <strong> for bold and <em> for italic',
      expectedOutput: 'Paragraph with bold and italic text'
    },
    {
      id: '3',
      title: 'Create a Link',
      description: 'Make a clickable link to a website.',
      instructions: 'Create a link to https://google.com with the text "Go to Google"',
      starterCode: `<!-- Create your link here -->`,
      solution: `<a href="https://google.com">Go to Google</a>`,
      hint: 'Use the <a> tag with href attribute',
      expectedOutput: 'Clickable link to Google'
    },
    {
      id: '4',
      title: 'Add an Image',
      description: 'Embed an image in your page.',
      instructions: 'Add an image with src="photo.jpg" and alt text "My Photo"',
      starterCode: `<!-- Add your image here -->`,
      solution: `<img src="photo.jpg" alt="My Photo">`,
      hint: 'Use the <img> tag with src and alt attributes',
      expectedOutput: 'Image element with proper attributes'
    },
    {
      id: '5',
      title: 'Create a List',
      description: 'Make an unordered list of items.',
      instructions: 'Create an unordered list with three fruits: Apple, Banana, Orange',
      starterCode: `<!-- Create your list here -->`,
      solution: `<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>`,
      hint: 'Use <ul> for the list and <li> for each item',
      expectedOutput: 'Bulleted list of three fruits'
    },
    {
      id: '6',
      title: 'Build a Form',
      description: 'Create a simple form with an input and button.',
      instructions: 'Create a form with a text input for "name" and a submit button',
      starterCode: `<form>
  <!-- Add label, input, and button -->
</form>`,
      solution: `<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  <button type="submit">Submit</button>
</form>`,
      hint: 'Use <label>, <input>, and <button> inside <form>',
      expectedOutput: 'Form with labeled input and submit button'
    },
    {
      id: '7',
      title: 'Semantic Structure',
      description: 'Use semantic HTML to structure a page.',
      instructions: 'Create a page with <header>, <main>, and <footer> sections',
      starterCode: `<!-- Create semantic structure here -->`,
      solution: `<header>
  <h1>My Website</h1>
</header>
<main>
  <p>Main content goes here</p>
</main>
<footer>
  <p>&copy; 2024</p>
</footer>`,
      hint: 'Use semantic tags for better structure',
      expectedOutput: 'Page with proper semantic sections'
    },
    {
      id: '8',
      title: 'Complete Profile Card',
      description: 'Build a complete profile card combining all concepts.',
      instructions: 'Create a profile card with: heading (name), image (profile.jpg), paragraph (bio), and link (website)',
      starterCode: `<div class="profile-card">
  <!-- Add heading, image, paragraph, and link -->
</div>`,
      solution: `<div class="profile-card">
  <h2>John Doe</h2>
  <img src="profile.jpg" alt="John's profile picture" width="200">
  <p>Web developer passionate about creating awesome websites.</p>
  <a href="https://johndoe.com">Visit my website</a>
</div>`,
      hint: 'Combine h2, img, p, and a tags',
      expectedOutput: 'Complete profile card with all elements'
    }
  ]
}

// ============================================
// CSS EXERCISES
// ============================================
function generateCSSExercises(): SandboxExercise[] {
  return [
    {
      id: '1',
      title: 'Style a Heading',
      description: 'Change the color and size of a heading.',
      instructions: 'Make the h1 blue and 48px in size',
      starterCode: `h1 {
  /* Add your styles here */
}`,
      solution: `h1 {
  color: blue;
  font-size: 48px;
}`,
      hint: 'Use color and font-size properties',
      expectedOutput: 'Blue heading at 48px'
    },
    {
      id: '2',
      title: 'Class Selector',
      description: 'Use a class selector to style elements.',
      instructions: 'Create a .highlight class with yellow background',
      starterCode: `/* Create your class here */`,
      solution: `.highlight {
  background-color: yellow;
}`,
      hint: 'Use a dot (.) for class selectors',
      expectedOutput: 'Yellow highlighted elements'
    },
    {
      id: '3',
      title: 'Box Model',
      description: 'Practice padding, border, and margin.',
      instructions: 'Give the .box class: 20px padding, 2px solid black border, 10px margin',
      starterCode: `.box {
  /* Add box model properties */
}`,
      solution: `.box {
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}`,
      hint: 'Use padding, border, and margin properties',
      expectedOutput: 'Box with spacing and border'
    },
    {
      id: '4',
      title: 'Flexbox Centering',
      description: 'Use flexbox to center content.',
      instructions: 'Make .container a flex container that centers its content both horizontally and vertically',
      starterCode: `.container {
  display: flex;
  /* Add centering properties */
}`,
      solution: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
      hint: 'Use justify-content and align-items',
      expectedOutput: 'Centered content'
    },
    {
      id: '5',
      title: 'Hover Effect',
      description: 'Add a hover effect to buttons.',
      instructions: 'Make buttons change to dark blue background on hover',
      starterCode: `button {
  background-color: blue;
}

/* Add hover state */`,
      solution: `button {
  background-color: blue;
}

button:hover {
  background-color: darkblue;
}`,
      hint: 'Use the :hover pseudo-class',
      expectedOutput: 'Button changes color on hover'
    },
    {
      id: '6',
      title: 'Responsive Grid',
      description: 'Create a responsive grid layout.',
      instructions: 'Make a grid with 3 columns and 20px gap',
      starterCode: `.grid {
  display: grid;
  /* Add grid properties */
}`,
      solution: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`,
      hint: 'Use grid-template-columns and gap',
      expectedOutput: '3-column grid with spacing'
    },
    {
      id: '7',
      title: 'CSS Animation',
      description: 'Create a fade-in animation.',
      instructions: 'Create a fadeIn animation that goes from opacity 0 to 1',
      starterCode: `@keyframes fadeIn {
  /* Add animation keyframes */
}

.fade {
  animation: fadeIn 1s ease;
}`,
      solution: `@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade {
  animation: fadeIn 1s ease;
}`,
      hint: 'Use from and to in @keyframes',
      expectedOutput: 'Element fades in smoothly'
    },
    {
      id: '8',
      title: 'Complete Card Design',
      description: 'Style a complete card component.',
      instructions: 'Style .card with: white background, 20px padding, 10px border-radius, shadow, and hover effect that lifts it up',
      starterCode: `.card {
  /* Add all styles */
}

.card:hover {
  /* Add hover effect */
}`,
      solution: `.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}`,
      hint: 'Combine multiple properties and use transform',
      expectedOutput: 'Styled card with hover lift effect'
    }
  ]
}

// ============================================
// JAVASCRIPT EXERCISES
// ============================================
function generateJavaScriptExercises(languageId: string): SandboxExercise[] {
  const isTS = languageId.includes('typescript')

  return [
    {
      id: '1',
      title: 'Create Variables',
      description: 'Practice declaring variables.',
      instructions: 'Create a variable called "name" with your name and a variable "age" with your age',
      starterCode: `// Declare your variables here`,
      solution: isTS
        ? `let name: string = "Alice";\nlet age: number = 25;`
        : `let name = "Alice";\nlet age = 25;`,
      hint: 'Use let or const to declare variables',
      expectedOutput: 'Variables created successfully'
    },
    {
      id: '2',
      title: 'Write a Function',
      description: 'Create a function that greets someone.',
      instructions: 'Write a function called greet that takes a name and returns "Hello, [name]!"',
      starterCode: `// Write your function here`,
      solution: isTS
        ? `function greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}`
        : `function greet(name) {\n  return \`Hello, \${name}!\`;\n}`,
      hint: 'Use template literals with backticks',
      expectedOutput: 'Function returns greeting message'
    },
    {
      id: '3',
      title: 'If/Else Statement',
      description: 'Use conditional logic.',
      instructions: 'Write a function isAdult(age) that returns true if age >= 18, otherwise false',
      starterCode: `function isAdult(age) {\n  // Write your if/else here\n}`,
      solution: `function isAdult(age) {\n  if (age >= 18) {\n    return true;\n  } else {\n    return false;\n  }\n}`,
      hint: 'Use if (condition) { } else { }',
      expectedOutput: 'Returns true for 18+, false otherwise'
    },
    {
      id: '4',
      title: 'For Loop',
      description: 'Loop through numbers.',
      instructions: 'Write a function printNumbers() that logs numbers 1 to 5 using a for loop',
      starterCode: `function printNumbers() {\n  // Write your for loop here\n}`,
      solution: `function printNumbers() {\n  for (let i = 1; i <= 5; i++) {\n    console.log(i);\n  }\n}`,
      hint: 'Use for (let i = 1; i <= 5; i++)',
      expectedOutput: 'Logs 1, 2, 3, 4, 5'
    },
    {
      id: '5',
      title: 'Array Operations',
      description: 'Work with arrays.',
      instructions: 'Create an array of fruits and add "grape" to it using push()',
      starterCode: `let fruits = ["apple", "banana", "orange"];\n// Add grape to the array`,
      solution: `let fruits = ["apple", "banana", "orange"];\nfruits.push("grape");`,
      hint: 'Use array.push() to add items',
      expectedOutput: 'Array contains 4 fruits'
    },
    {
      id: '6',
      title: 'Object Creation',
      description: 'Create and use objects.',
      instructions: 'Create a person object with properties: name, age, and city',
      starterCode: `// Create your object here`,
      solution: `let person = {\n  name: "Alice",\n  age: 25,\n  city: "New York"\n};`,
      hint: 'Use { key: value } syntax',
      expectedOutput: 'Object with three properties'
    },
    {
      id: '7',
      title: 'Array Methods',
      description: 'Use array map method.',
      instructions: 'Use map() to double all numbers in the array [1, 2, 3, 4, 5]',
      starterCode: `let numbers = [1, 2, 3, 4, 5];\nlet doubled = // Use map here`,
      solution: `let numbers = [1, 2, 3, 4, 5];\nlet doubled = numbers.map(n => n * 2);`,
      hint: 'Use numbers.map(n => n * 2)',
      expectedOutput: '[2, 4, 6, 8, 10]'
    },
    {
      id: '8',
      title: 'Complete Calculator',
      description: 'Build a calculator with multiple functions.',
      instructions: 'Create functions: add(a, b), subtract(a, b), multiply(a, b), divide(a, b)',
      starterCode: `// Create your calculator functions`,
      solution: `function add(a, b) { return a + b; }\nfunction subtract(a, b) { return a - b; }\nfunction multiply(a, b) { return a * b; }\nfunction divide(a, b) { return a / b; }`,
      hint: 'Each function takes two parameters and returns the result',
      expectedOutput: 'All calculator operations work'
    }
  ]
}

// ============================================
// GENERAL PURPOSE EXERCISES (Python, Java, etc.)
// ============================================
function generateGeneralPurposeExercises(languageId: string, languageName: string): SandboxExercise[] {
  if (languageId === 'python' || languageId.includes('python')) {
    return [
      {
        id: '1',
        title: 'Variables in Python',
        description: 'Create variables in Python.',
        instructions: 'Create a variable "name" with your name and "age" with your age, then print them',
        starterCode: `# Create your variables here`,
        solution: `name = "Alice"\nage = 25\nprint(f"Name: {name}, Age: {age}")`,
        hint: 'Use = to assign values, f-strings to print',
        expectedOutput: 'Name: Alice, Age: 25'
      },
      {
        id: '2',
        title: 'Define a Function',
        description: 'Create a Python function.',
        instructions: 'Write a function greet(name) that returns "Hello, [name]!"',
        starterCode: `# Define your function here`,
        solution: `def greet(name):\n    return f"Hello, {name}!"`,
        hint: 'Use def function_name(params):',
        expectedOutput: 'Function returns greeting'
      },
      {
        id: '3',
        title: 'If/Else in Python',
        description: 'Use conditional statements.',
        instructions: 'Write a function is_adult(age) that returns True if age >= 18',
        starterCode: `def is_adult(age):\n    # Write your if/else here`,
        solution: `def is_adult(age):\n    if age >= 18:\n        return True\n    else:\n        return False`,
        hint: 'Remember Python uses indentation',
        expectedOutput: 'Returns True/False based on age'
      },
      {
        id: '4',
        title: 'For Loop',
        description: 'Loop through a range.',
        instructions: 'Write a function that prints numbers 1 to 5 using a for loop',
        starterCode: `def print_numbers():\n    # Write your loop here`,
        solution: `def print_numbers():\n    for i in range(1, 6):\n        print(i)`,
        hint: 'Use for i in range(1, 6):',
        expectedOutput: 'Prints 1, 2, 3, 4, 5'
      },
      {
        id: '5',
        title: 'Lists',
        description: 'Work with Python lists.',
        instructions: 'Create a list of fruits and add "grape" using append()',
        starterCode: `fruits = ["apple", "banana", "orange"]\n# Add grape to the list`,
        solution: `fruits = ["apple", "banana", "orange"]\nfruits.append("grape")`,
        hint: 'Use list.append(item)',
        expectedOutput: 'List contains 4 fruits'
      },
      {
        id: '6',
        title: 'Dictionaries',
        description: 'Create a Python dictionary.',
        instructions: 'Create a person dictionary with keys: name, age, city',
        starterCode: `# Create your dictionary here`,
        solution: `person = {\n    "name": "Alice",\n    "age": 25,\n    "city": "New York"\n}`,
        hint: 'Use {key: value} syntax',
        expectedOutput: 'Dictionary with three keys'
      },
      {
        id: '7',
        title: 'Classes',
        description: 'Define a Python class.',
        instructions: 'Create a Person class with __init__(name) and greet() method',
        starterCode: `# Define your class here`,
        solution: `class Person:\n    def __init__(self, name):\n        self.name = name\n    \n    def greet(self):\n        return f"Hi, I'm {self.name}"`,
        hint: 'Use class ClassName: and def __init__(self):',
        expectedOutput: 'Person class with name and greet method'
      },
      {
        id: '8',
        title: 'File Writing',
        description: 'Write data to a file.',
        instructions: 'Write "Hello, File!" to a file called output.txt',
        starterCode: `# Write to file here`,
        solution: `with open("output.txt", "w") as file:\n    file.write("Hello, File!")`,
        hint: 'Use with open("file.txt", "w") as file:',
        expectedOutput: 'File created with text'
      }
    ]
  }

  // Generic exercises for other languages
  return [
    {
      id: '1',
      title: `Variables in ${languageName}`,
      description: `Practice creating variables in ${languageName}.`,
      instructions: 'Create variables to store your name and age',
      starterCode: `// Create your variables here`,
      solution: `// Example solution\nlet name = "Alice";\nlet age = 25;`,
      hint: 'Use appropriate variable declaration syntax',
      expectedOutput: 'Variables created'
    },
    {
      id: '2',
      title: 'Functions',
      description: 'Write a simple function.',
      instructions: 'Create a function that adds two numbers',
      starterCode: `// Write your function here`,
      solution: `function add(a, b) {\n  return a + b;\n}`,
      hint: 'Functions take parameters and return values',
      expectedOutput: 'Function adds numbers'
    },
    {
      id: '3',
      title: 'Loops',
      description: 'Practice using loops.',
      instructions: 'Write a loop that prints numbers 1 to 5',
      starterCode: `// Write your loop here`,
      solution: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`,
      hint: 'Use a for loop',
      expectedOutput: 'Prints 1-5'
    }
  ]
}
