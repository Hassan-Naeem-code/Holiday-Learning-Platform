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
  languageName: string,
  difficulty: 'easy' | 'medium' | 'hard' = 'easy'
): SandboxExerciseSet {
  const languageType = detectLanguageType(languageId)
  const exercises = generateExercisesForLanguageType(languageId, languageName, languageType, difficulty)

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
  languageType: string,
  difficulty: 'easy' | 'medium' | 'hard'
): SandboxExercise[] {
  switch (languageType) {
    case 'markup':
      return generateHTMLExercises(difficulty)
    case 'styling':
      return generateCSSExercises(difficulty)
    case 'scripting':
      return generateJavaScriptExercises(languageId, difficulty)
    case 'framework':
      return generateJavaScriptExercises(languageId, difficulty)
    case 'general':
      return generateGeneralPurposeExercises(languageId, languageName, difficulty)
    default:
      return generateGeneralPurposeExercises(languageId, languageName, difficulty)
  }
}

// ============================================
// HTML EXERCISES
// ============================================
function generateHTMLExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  if (difficulty === 'easy') {
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
    ]
  } else if (difficulty === 'medium') {
    return [
      {
        id: 'm1',
        title: 'Semantic Navigation',
        description: 'Create a semantic navigation menu.',
        instructions: 'Build a navigation menu using <nav> with 4 links: Home, About, Services, Contact',
        starterCode: `<!-- Create navigation here -->`,
        solution: `<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>`,
        hint: 'Use <nav> with <ul> and <li> elements',
        expectedOutput: 'Semantic navigation menu'
      },
      {
        id: 'm2',
        title: 'Data Table',
        description: 'Create a table with headers and data.',
        instructions: 'Create a table showing 3 students with Name, Age, and Grade columns',
        starterCode: `<table>
  <!-- Add thead and tbody -->
</table>`,
        solution: `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Grade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>20</td>
      <td>A</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>21</td>
      <td>B</td>
    </tr>
    <tr>
      <td>Carol</td>
      <td>19</td>
      <td>A</td>
    </tr>
  </tbody>
</table>`,
        hint: 'Use <thead>, <tbody>, <tr>, <th>, and <td>',
        expectedOutput: 'Table with headers and student data'
      },
      {
        id: 'm3',
        title: 'Multi-Input Form',
        description: 'Create a registration form with multiple input types.',
        instructions: 'Build a form with email, password, and checkbox inputs',
        starterCode: `<form>
  <!-- Add email, password, and terms checkbox -->
</form>`,
        solution: `<form>
  <label for="email">Email:</label>
  <input type="email" id="email" required>
  
  <label for="password">Password:</label>
  <input type="password" id="password" required>
  
  <label>
    <input type="checkbox" required>
    I agree to terms
  </label>
  
  <button type="submit">Register</button>
</form>`,
        hint: 'Use different input types: email, password, checkbox',
        expectedOutput: 'Registration form with validation'
      },
      {
        id: 'm4',
        title: 'Article Structure',
        description: 'Structure an article with semantic HTML.',
        instructions: 'Create an article with <header>, <section>, and <aside>',
        starterCode: `<article>
  <!-- Add header, main section, and aside -->
</article>`,
        solution: `<article>
  <header>
    <h1>Article Title</h1>
    <p>By Author Name</p>
  </header>
  <section>
    <h2>Introduction</h2>
    <p>Main content here...</p>
  </section>
  <aside>
    <p>Related information</p>
  </aside>
</article>`,
        hint: 'Use semantic tags for article structure',
        expectedOutput: 'Well-structured article'
      },
      {
        id: 'm5',
        title: 'Media Elements',
        description: 'Embed video and audio in your page.',
        instructions: 'Add a video and audio player with controls',
        starterCode: `<!-- Add video and audio elements -->`,
        solution: `<video src="video.mp4" controls width="400">
  Your browser doesn't support video.
</video>

<audio src="audio.mp3" controls>
  Your browser doesn't support audio.
</audio>`,
        hint: 'Use <video> and <audio> with controls attribute',
        expectedOutput: 'Video and audio players with controls'
      },
      {
        id: 'm6',
        title: 'Definition List',
        description: 'Create a glossary using definition lists.',
        instructions: 'Make a definition list with 3 HTML terms and definitions',
        starterCode: `<!-- Create definition list -->`,
        solution: `<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
  
  <dt>JavaScript</dt>
  <dd>Programming language for the web</dd>
</dl>`,
        hint: 'Use <dl>, <dt>, and <dd> tags',
        expectedOutput: 'Definition list with terms and descriptions'
      },
    ]
  } else {
    // hard
    return [
      {
        id: 'h1',
        title: 'Complex Form with Fieldsets',
        description: 'Create an advanced form with grouped inputs.',
        instructions: 'Build a form with fieldsets for personal info and address',
        starterCode: `<form>
  <!-- Add fieldsets with legends -->
</form>`,
        solution: `<form>
  <fieldset>
    <legend>Personal Information</legend>
    <label for="fname">First Name:</label>
    <input type="text" id="fname" required>
    
    <label for="lname">Last Name:</label>
    <input type="text" id="lname" required>
    
    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" required>
  </fieldset>
  
  <fieldset>
    <legend>Address</legend>
    <label for="street">Street:</label>
    <input type="text" id="street">
    
    <label for="city">City:</label>
    <input type="text" id="city">
    
    <label for="zip">ZIP:</label>
    <input type="text" id="zip" pattern="[0-9]{5}">
  </fieldset>
  
  <button type="submit">Submit</button>
</form>`,
        hint: 'Use <fieldset> and <legend> to group related inputs',
        expectedOutput: 'Form with organized fieldsets'
      },
      {
        id: 'h2',
        title: 'Accessible Data Table',
        description: 'Create a complex table with scope attributes.',
        instructions: 'Build a table with rowspan/colspan and proper accessibility',
        starterCode: `<table>
  <!-- Add complex table structure -->
</table>`,
        solution: `<table>
  <caption>Sales Report Q1 2024</caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">January</th>
      <th scope="col">February</th>
      <th scope="col">March</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Widgets</th>
      <td>100</td>
      <td>150</td>
      <td>200</td>
      <td>450</td>
    </tr>
    <tr>
      <th scope="row">Gadgets</th>
      <td>80</td>
      <td>90</td>
      <td>110</td>
      <td>280</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>180</td>
      <td>240</td>
      <td>310</td>
      <td>730</td>
    </tr>
  </tfoot>
</table>`,
        hint: 'Use scope, caption, thead, tbody, tfoot',
        expectedOutput: 'Accessible table with all semantic elements'
      },
      {
        id: 'h3',
        title: 'Iframe Integration',
        description: 'Embed external content safely.',
        instructions: 'Embed a YouTube video and Google Map using iframes',
        starterCode: `<!-- Add iframes with security attributes -->`,
        solution: `<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media"
  allowfullscreen>
</iframe>

<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy">
</iframe>`,
        hint: 'Use iframe with proper attributes for security',
        expectedOutput: 'Embedded YouTube and Google Maps'
      },
      {
        id: 'h4',
        title: 'Custom Data Attributes',
        description: 'Use data-* attributes for dynamic content.',
        instructions: 'Create product cards with data attributes for filtering',
        starterCode: `<!-- Create product cards with data-* attributes -->`,
        solution: `<div class="products">
  <article data-category="electronics" data-price="299" data-stock="15">
    <h3>Smartphone</h3>
    <p>Price: $299</p>
  </article>
  
  <article data-category="clothing" data-price="49" data-stock="30">
    <h3>T-Shirt</h3>
    <p>Price: $49</p>
  </article>
  
  <article data-category="electronics" data-price="899" data-stock="5">
    <h3>Laptop</h3>
    <p>Price: $899</p>
  </article>
</div>`,
        hint: 'Use data-* attributes for custom metadata',
        expectedOutput: 'Product cards with filterable data attributes'
      },
      {
        id: 'h5',
        title: 'Template and Slot Pattern',
        description: 'Create reusable HTML templates.',
        instructions: 'Build a template for user cards with slot pattern',
        starterCode: `<!-- Create template element -->`,
        solution: `<template id="user-card">
  <div class="card">
    <img class="avatar" alt="User avatar">
    <h3 class="name"></h3>
    <p class="role"></p>
    <button class="contact">Contact</button>
  </div>
</template>

<div id="users">
  <!-- Templates will be cloned here -->
</div>`,
        hint: 'Use <template> for reusable HTML patterns',
        expectedOutput: 'Template ready for JavaScript cloning'
      },
      {
        id: 'h6',
        title: 'Complete Landing Page',
        description: 'Build a full landing page with all semantic elements.',
        instructions: 'Create a landing page with header, nav, main (sections), aside, and footer',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
</head>
<body>
  <!-- Build complete semantic structure -->
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Professional landing page">
  <title>Landing Page</title>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="#hero">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="hero">
      <h1>Welcome to Our Product</h1>
      <p>The best solution for your needs</p>
      <button>Get Started</button>
    </section>
    
    <section id="features">
      <h2>Features</h2>
      <article>
        <h3>Fast</h3>
        <p>Lightning quick performance</p>
      </article>
      <article>
        <h3>Secure</h3>
        <p>Bank-level security</p>
      </article>
    </section>
    
    <aside>
      <h2>Testimonials</h2>
      <blockquote>
        <p>"Amazing product!"</p>
        <cite>- Happy Customer</cite>
      </blockquote>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2024 Company Name. All rights reserved.</p>
    <address>
      Contact: <a href="mailto:info@example.com">info@example.com</a>
    </address>
  </footer>
</body>
</html>`,
        hint: 'Use all semantic HTML5 elements properly',
        expectedOutput: 'Complete accessible landing page'
      },
    ]
  }
}

// ============================================
// CSS EXERCISES
// ============================================
function generateCSSExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  if (difficulty === 'easy') {
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
        title: 'Text Styling',
        description: 'Style text with multiple properties.',
        instructions: 'Make .text have: 16px font, bold weight, center alignment, and 1.5 line height',
        starterCode: `.text {
  /* Add text properties */
}`,
        solution: `.text {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
}`,
        hint: 'Use font-size, font-weight, text-align, line-height',
        expectedOutput: 'Styled text with proper formatting'
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
        title: 'Display Properties',
        description: 'Control element display.',
        instructions: 'Make .inline-element display inline-block with 10px margin',
        starterCode: `.inline-element {
  /* Add display properties */
}`,
        solution: `.inline-element {
  display: inline-block;
  margin: 10px;
}`,
        hint: 'Use display: inline-block',
        expectedOutput: 'Element displays inline with margin'
      },
    ]
  } else if (difficulty === 'medium') {
    return [
      {
        id: 'm1',
        title: 'Flexbox Layout',
        description: 'Create a flexible card layout.',
        instructions: 'Make .card-container a flex row with space-between and wrap',
        starterCode: `.card-container {
  /* Add flexbox properties */
}`,
        solution: `.card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}`,
        hint: 'Use display: flex with direction, justify, and wrap',
        expectedOutput: 'Flexible card layout'
      },
      {
        id: 'm2',
        title: 'Responsive Grid',
        description: 'Create a responsive grid layout.',
        instructions: 'Make a grid with 3 columns, 20px gap, and auto-fill for responsiveness',
        starterCode: `.grid {
  display: grid;
  /* Add grid properties */
}`,
        solution: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}`,
        hint: 'Use repeat(auto-fill, minmax()) for responsive grids',
        expectedOutput: 'Responsive grid layout'
      },
      {
        id: 'm3',
        title: 'CSS Transitions',
        description: 'Add smooth transitions to elements.',
        instructions: 'Make .card transition all properties over 0.3s with ease-in-out timing',
        starterCode: `.card {
  /* Add transition */
}

.card:hover {
  transform: scale(1.05);
}`,
        solution: `.card {
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}`,
        hint: 'Use transition property with duration and timing function',
        expectedOutput: 'Smooth scaling animation on hover'
      },
      {
        id: 'm4',
        title: 'Position Properties',
        description: 'Use absolute positioning.',
        instructions: 'Make .badge absolutely positioned 10px from top and right with z-index 10',
        starterCode: `.badge {
  /* Add positioning */
}`,
        solution: `.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}`,
        hint: 'Use position: absolute with top, right, and z-index',
        expectedOutput: 'Badge positioned at top-right corner'
      },
      {
        id: 'm5',
        title: 'Media Queries',
        description: 'Make responsive layouts with media queries.',
        instructions: 'Make .container 100% width on mobile (<768px) and 80% on desktop',
        starterCode: `.container {
  /* Add desktop styles */
}

/* Add media query */`,
        solution: `.container {
  width: 80%;
}

@media (max-width: 768px) {
  .container {
    width: 100%;
  }
}`,
        hint: 'Use @media (max-width: 768px) for mobile styles',
        expectedOutput: 'Container adjusts width based on screen size'
      },
      {
        id: 'm6',
        title: 'CSS Variables',
        description: 'Use CSS custom properties.',
        instructions: 'Define --primary-color and --spacing variables and use them',
        starterCode: `:root {
  /* Define variables */
}

.button {
  /* Use variables */
}`,
        solution: `:root {
  --primary-color: #3498db;
  --spacing: 16px;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing);
}`,
        hint: 'Define with --name in :root, use with var(--name)',
        expectedOutput: 'Button styled with CSS variables'
      },
    ]
  } else {
    return [
      {
        id: 'h1',
        title: 'Advanced Animations',
        description: 'Create keyframe animations.',
        instructions: 'Create a @keyframes animation that rotates and scales an element',
        starterCode: `/* Define keyframes */

.animated {
  /* Apply animation */
}`,
        solution: `@keyframes pulse {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}

.animated {
  animation: pulse 2s ease-in-out infinite;
}`,
        hint: 'Use @keyframes with percentages and animation property',
        expectedOutput: 'Element rotates and scales continuously'
      },
      {
        id: 'h2',
        title: 'CSS Grid Advanced',
        description: 'Create complex grid layouts with areas.',
        instructions: 'Create a grid with header, sidebar, main, and footer areas',
        starterCode: `.grid-container {
  display: grid;
  /* Define grid template */
}`,
        solution: `.grid-container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 80px 1fr 60px;
  gap: 10px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`,
        hint: 'Use grid-template-areas with grid-area on children',
        expectedOutput: 'Complex page layout with named grid areas'
      },
      {
        id: 'h3',
        title: 'CSS Filters and Blend Modes',
        description: 'Apply visual effects using filters.',
        instructions: 'Apply blur, brightness, and mix-blend-mode to create effects',
        starterCode: `.effect {
  /* Add filters */
}`,
        solution: `.effect {
  filter: blur(2px) brightness(1.2) contrast(1.1);
  mix-blend-mode: multiply;
  backdrop-filter: blur(10px);
}`,
        hint: 'Use filter, mix-blend-mode, and backdrop-filter properties',
        expectedOutput: 'Element with blur and blend effects'
      },
      {
        id: 'h4',
        title: 'CSS Clipping and Masking',
        description: 'Create custom shapes with clip-path.',
        instructions: 'Use clip-path to create a hexagon shape',
        starterCode: `.hexagon {
  /* Add clip-path */
}`,
        solution: `.hexagon {
  width: 200px;
  height: 200px;
  background: #3498db;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}`,
        hint: 'Use clip-path: polygon() with coordinate points',
        expectedOutput: 'Hexagonal shaped element'
      },
      {
        id: 'h5',
        title: 'Custom Scrollbars',
        description: 'Style scrollbar elements.',
        instructions: 'Create custom styled scrollbar with webkit properties',
        starterCode: `/* Style scrollbar */`,
        solution: `.custom-scroll::-webkit-scrollbar {
  width: 12px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}`,
        hint: 'Use ::-webkit-scrollbar pseudo-elements',
        expectedOutput: 'Custom styled scrollbar'
      },
      {
        id: 'h6',
        title: 'Complete Card Component',
        description: 'Build a complex card with all advanced techniques.',
        instructions: 'Create a card with gradient, shadow, transform, and animations',
        starterCode: `.card {
  /* Create complete design */
}`,
        solution: `.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}`,
        hint: 'Combine gradient, transform-style, cubic-bezier, and 3D transforms',
        expectedOutput: 'Professional card with advanced styling'
      },
    ]
  }

  // Fallback: should never reach here
  return [
    {
      id: '1',
      title: 'Basic CSS',
      description: 'Style elements.',
      instructions: 'Add basic styles',
      starterCode: `/* Add styles */`,
      solution: `/* Example styles */`,
      hint: 'Use CSS properties',
      expectedOutput: 'Styled elements'
    }
  ]
}

// ============================================
// JAVASCRIPT EXERCISES
// ============================================
function generateJavaScriptExercises(languageId: string, difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  const isTS = languageId.includes('typescript')

  if (difficulty === 'easy') {
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
  } else if (difficulty === 'medium') {
    return [
      {
        id: 'm1',
        title: 'Arrow Functions',
        description: 'Practice modern ES6 arrow functions.',
        instructions: 'Convert this function to arrow function: function square(x) { return x * x; }',
        starterCode: `// Write arrow function here`,
        solution: `const square = (x) => x * x;`,
        hint: 'Use (param) => expression syntax',
        expectedOutput: 'Arrow function that squares a number'
      },
      {
        id: 'm2',
        title: 'Array Destructuring',
        description: 'Use destructuring to extract array values.',
        instructions: 'Destructure [10, 20, 30] into variables a, b, c',
        starterCode: `const numbers = [10, 20, 30];\n// Destructure here`,
        solution: `const numbers = [10, 20, 30];\nconst [a, b, c] = numbers;`,
        hint: 'Use [a, b, c] = array syntax',
        expectedOutput: 'Variables a=10, b=20, c=30'
      },
      {
        id: 'm3',
        title: 'Object Destructuring',
        description: 'Extract object properties.',
        instructions: 'Destructure name and age from person object',
        starterCode: `const person = { name: \"Alice\", age: 25, city: \"NYC\" };\n// Destructure name and age`,
        solution: `const person = { name: \"Alice\", age: 25, city: \"NYC\" };\nconst { name, age } = person;`,
        hint: 'Use { property1, property2 } = object',
        expectedOutput: 'Extracted name and age variables'
      },
      {
        id: 'm4',
        title: 'Spread Operator',
        description: 'Use spread operator to combine arrays.',
        instructions: 'Combine [1, 2] and [3, 4] into one array using spread',
        starterCode: `const arr1 = [1, 2];\nconst arr2 = [3, 4];\n// Combine using spread`,
        solution: `const arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst combined = [...arr1, ...arr2];`,
        hint: 'Use [...array1, ...array2]',
        expectedOutput: '[1, 2, 3, 4]'
      },
      {
        id: 'm5',
        title: 'Filter Method',
        description: 'Filter array elements.',
        instructions: 'Filter numbers array to get only even numbers',
        starterCode: `const numbers = [1, 2, 3, 4, 5, 6];\n// Filter even numbers`,
        solution: `const numbers = [1, 2, 3, 4, 5, 6];\nconst evens = numbers.filter(n => n % 2 === 0);`,
        hint: 'Use .filter(n => n % 2 === 0)',
        expectedOutput: '[2, 4, 6]'
      },
      {
        id: 'm6',
        title: 'Reduce Method',
        description: 'Sum array elements using reduce.',
        instructions: 'Use reduce to sum all numbers in array',
        starterCode: `const numbers = [1, 2, 3, 4, 5];\n// Use reduce to sum`,
        solution: `const numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((acc, n) => acc + n, 0);`,
        hint: 'Use .reduce((accumulator, current) => accumulator + current, 0)',
        expectedOutput: '15'
      },
    ]
  } else {
    // difficulty === 'hard'
    return [
      {
        id: 'h1',
        title: 'Async/Await',
        description: 'Work with asynchronous code.',
        instructions: 'Create an async function that fetches data and handles errors',
        starterCode: `// Create async function`,
        solution: `async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(\"Error:\", error);\n    return null;\n  }\n}`,
        hint: 'Use async/await with try/catch',
        expectedOutput: 'Async function with error handling'
      },
      {
        id: 'h2',
        title: 'Promise.all',
        description: 'Run multiple promises concurrently.',
        instructions: 'Use Promise.all to fetch multiple URLs simultaneously',
        starterCode: `// Use Promise.all`,
        solution: `async function fetchMultiple(urls) {\n  const promises = urls.map(url => fetch(url));\n  const responses = await Promise.all(promises);\n  return Promise.all(responses.map(r => r.json()));\n}`,
        hint: 'Use Promise.all(array.map())',
        expectedOutput: 'Concurrent promise execution'
      },
      {
        id: 'h3',
        title: 'Closures',
        description: 'Create a function that returns a function.',
        instructions: 'Create a counter function using closures',
        starterCode: `// Create closure`,
        solution: `function createCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}`,
        hint: 'Return an object with methods that access outer variable',
        expectedOutput: 'Counter with private state'
      },
      {
        id: 'h4',
        title: 'Class with Inheritance',
        description: 'Create classes with inheritance.',
        instructions: 'Create Animal class and Dog class that extends it',
        starterCode: `// Create classes`,
        solution: `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return \`\${this.name} makes a sound\`;\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    return \`\${this.name} barks\`;\n  }\n}`,
        hint: 'Use class, constructor, extends',
        expectedOutput: 'Dog class extending Animal'
      },
      {
        id: 'h5',
        title: 'Debounce Function',
        description: 'Implement a debounce utility.',
        instructions: 'Create a debounce function that delays execution',
        starterCode: `// Create debounce function`,
        solution: `function debounce(func, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\n  };\n}`,
        hint: 'Use setTimeout and clearTimeout',
        expectedOutput: 'Debounced function'
      },
      {
        id: 'h6',
        title: 'Custom Iterator',
        description: 'Create an object with custom iterator.',
        instructions: 'Create a range object that works with for...of',
        starterCode: `// Create iterable object`,
        solution: `const range = {\n  from: 1,\n  to: 5,\n  [Symbol.iterator]() {\n    return {\n      current: this.from,\n      last: this.to,\n      next() {\n        if (this.current <= this.last) {\n          return { done: false, value: this.current++ };\n        } else {\n          return { done: true };\n        }\n      }\n    };\n  }\n};`,
        hint: 'Implement [Symbol.iterator]() with next() method',
        expectedOutput: 'Iterable range object'
      },
    ]
  }
}

// ============================================
// GENERAL PURPOSE EXERCISES (Python, Java, etc.)
// ============================================
function generateGeneralPurposeExercises(languageId: string, languageName: string, difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  const isPython = languageId.includes('python')
  
  if (isPython) {
    if (difficulty === 'easy') {
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
    } else if (difficulty === 'medium') {
      return [
        {
          id: 'm1',
          title: 'List Comprehension',
          description: 'Use list comprehensions.',
          instructions: 'Create a list of squares from 1 to 10 using list comprehension',
          starterCode: `# Use list comprehension`,
          solution: `squares = [x**2 for x in range(1, 11)]`,
          hint: 'Use [expression for item in range()]',
          expectedOutput: 'List of squares [1, 4, 9, ...]'
        },
        {
          id: 'm2',
          title: 'Dictionary Comprehension',
          description: 'Create dictionaries with comprehensions.',
          instructions: 'Create dict mapping numbers 1-5 to their squares',
          starterCode: `# Dict comprehension`,
          solution: `squares_dict = {x: x**2 for x in range(1, 6)}`,
          hint: 'Use {key: value for item in range()}',
          expectedOutput: '{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}'
        },
        {
          id: 'm3',
          title: 'Lambda Functions',
          description: 'Use lambda expressions.',
          instructions: 'Sort list of tuples by second element using lambda',
          starterCode: `data = [(\"Alice\", 25), (\"Bob\", 30), (\"Charlie\", 20)]\\n# Sort by age`,
          solution: `data = [(\"Alice\", 25), (\"Bob\", 30), (\"Charlie\", 20)]\\nsorted_data = sorted(data, key=lambda x: x[1])`,
          hint: 'Use sorted(list, key=lambda x: x[1])',
          expectedOutput: 'Sorted by age: Charlie, Alice, Bob'
        },
        {
          id: 'm4',
          title: 'File I/O',
          description: 'Read and write files.',
          instructions: 'Read from input.txt and write uppercase to output.txt',
          starterCode: `# File operations`,
          solution: `with open(\"input.txt\", \"r\") as f:\\n    content = f.read()\\n\\nwith open(\"output.txt\", \"w\") as f:\\n    f.write(content.upper())`,
          hint: 'Use with open() context manager',
          expectedOutput: 'File content copied and uppercased'
        },
        {
          id: 'm5',
          title: 'Exception Handling',
          description: 'Handle errors gracefully.',
          instructions: 'Try to convert string to int with error handling',
          starterCode: `# Try/except`,
          solution: `try:\\n    num = int(\"abc\")\\nexcept ValueError as e:\\n    print(f\"Error: {e}\")\\n    num = 0`,
          hint: 'Use try/except ValueError',
          expectedOutput: 'Error caught and handled'
        },
        {
          id: 'm6',
          title: 'Regular Expressions',
          description: 'Match patterns in strings.',
          instructions: 'Extract all email addresses from text using regex',
          starterCode: `import re\\n# Find emails`,
          solution: `import re\\ntext = \"Contact: alice@example.com or bob@test.com\"\\nemails = re.findall(r'[\\w.-]+@[\\w.-]+', text)`,
          hint: 'Use re.findall() with email pattern',
          expectedOutput: 'List of email addresses'
        },
      ]
    } else {
      // difficulty === 'hard'
      return [
        {
          id: 'h1',
          title: 'Decorators',
          description: 'Create custom decorator.',
          instructions: 'Create a timing decorator that measures function execution time',
          starterCode: `# Create decorator`,
          solution: `import time\\nfrom functools import wraps\\n\\ndef timer(func):\\n    @wraps(func)\\n    def wrapper(*args, **kwargs):\\n        start = time.time()\\n        result = func(*args, **kwargs)\\n        end = time.time()\\n        print(f\"{func.__name__} took {end-start:.4f}s\")\\n        return result\\n    return wrapper\\n\\n@timer\\ndef slow_function():\\n    time.sleep(1)`,
          hint: 'Use @wraps and return wrapper function',
          expectedOutput: 'Decorator measures execution time'
        },
        {
          id: 'h2',
          title: 'Generators',
          description: 'Create generator function.',
          instructions: 'Create Fibonacci generator using yield',
          starterCode: `# Create generator`,
          solution: `def fibonacci():\\n    a, b = 0, 1\\n    while True:\\n        yield a\\n        a, b = b, a + b\\n\\nfib = fibonacci()\\nfor _ in range(10):\\n    print(next(fib))`,
          hint: 'Use yield keyword',
          expectedOutput: 'Fibonacci sequence: 0, 1, 1, 2, 3, 5...'
        },
        {
          id: 'h3',
          title: 'Metaclasses',
          description: 'Use metaclass to modify class behavior.',
          instructions: 'Create metaclass that logs method calls',
          starterCode: `# Create metaclass`,
          solution: `class LoggingMeta(type):\\n    def __new__(cls, name, bases, dct):\\n        for key, value in dct.items():\\n            if callable(value):\\n                dct[key] = cls.log_calls(value)\\n        return super().__new__(cls, name, bases, dct)\\n    \\n    @staticmethod\\n    def log_calls(func):\\n        def wrapper(*args, **kwargs):\\n            print(f\"Calling {func.__name__}\")\\n            return func(*args, **kwargs)\\n        return wrapper`,
          hint: 'Override __new__ in metaclass',
          expectedOutput: 'Metaclass logs all method calls'
        },
        {
          id: 'h4',
          title: 'Context Managers',
          description: 'Create custom context manager.',
          instructions: 'Create context manager for database connection',
          starterCode: `# Create context manager`,
          solution: `class DatabaseConnection:\\n    def __enter__(self):\\n        print(\"Opening connection\")\\n        return self\\n    \\n    def __exit__(self, exc_type, exc_val, exc_tb):\\n        print(\"Closing connection\")\\n        return False\\n\\nwith DatabaseConnection() as db:\\n    print(\"Using database\")`,
          hint: 'Implement __enter__ and __exit__',
          expectedOutput: 'Resource management with cleanup'
        },
        {
          id: 'h5',
          title: 'Multithreading',
          description: 'Create and manage threads.',
          instructions: 'Create producer-consumer with thread synchronization',
          starterCode: `# Create threads`,
          solution: `from threading import Thread\\nfrom queue import Queue\\n\\nqueue = Queue()\\n\\ndef producer():\\n    for i in range(5):\\n        queue.put(i)\\n\\ndef consumer():\\n    while True:\\n        item = queue.get()\\n        if item is None:\\n            break\\n        print(f\"Consumed {item}\")`,
          hint: 'Use Queue and Thread for synchronization',
          expectedOutput: 'Thread-safe producer-consumer pattern'
        },
        {
          id: 'h6',
          title: 'Advanced Data Structures',
          description: 'Implement LRU Cache.',
          instructions: 'Create LRU Cache using OrderedDict',
          starterCode: `# Create LRU Cache`,
          solution: `from collections import OrderedDict\\n\\nclass LRUCache:\\n    def __init__(self, capacity):\\n        self.cache = OrderedDict()\\n        self.capacity = capacity\\n    \\n    def get(self, key):\\n        if key not in self.cache:\\n            return -1\\n        self.cache.move_to_end(key)\\n        return self.cache[key]\\n    \\n    def put(self, key, value):\\n        if key in self.cache:\\n            self.cache.move_to_end(key)\\n        self.cache[key] = value\\n        if len(self.cache) > self.capacity:\\n            self.cache.popitem(last=False)`,
          hint: 'Use OrderedDict and move_to_end',
          expectedOutput: 'LRU Cache with O(1) operations'
        },
      ]
    }
  }

  // Handle all other languages with specific exercises
  return generateLanguageSpecificExercises(languageId, languageName, difficulty)
}

// (moved earlier in file to ensure availability before router function)

// Language-specific exercise generator for all remaining languages
function generateLanguageSpecificExercises(
  languageId: string,
  languageName: string,
  difficulty: 'easy' | 'medium' | 'hard'
): SandboxExercise[] {
  
  // React exercises
  if (languageId.includes('react') && !languageId.includes('native')) {
    return generateReactExercises(difficulty)
  }
  
  // React Native exercises
  if (languageId.includes('react-native')) {
    return generateReactNativeExercises(difficulty)
  }
  
  // Next.js exercises
  if (languageId.includes('nextjs') || languageId.includes('next')) {
    return generateNextJSExercises(difficulty)
  }
  
  // Flutter exercises
  if (languageId.includes('flutter')) {
    return generateFlutterExercises(difficulty)
  }
  
  // Swift exercises
  if (languageId.includes('swift')) {
    return generateSwiftExercises(difficulty)
  }
  
  // Kotlin exercises
  if (languageId.includes('kotlin')) {
    return generateKotlinExercises(difficulty)
  }
  
  // R exercises
  if (languageId === 'r') {
    return generateRExercises(difficulty)
  }
  
  // SQL exercises
  if (languageId.includes('sql') || languageId.includes('postgresql')) {
    return generateSQLExercises(difficulty)
  }
  
  // MongoDB exercises
  if (languageId.includes('mongodb')) {
    return generateMongoDBExercises(difficulty)
  }
  
  // Java exercises
  if (languageId.includes('java') && !languageId.includes('javascript')) {
    return generateJavaExercises(difficulty)
  }
  
  // Go exercises
  if (languageId === 'go') {
    return generateGoExercises(difficulty)
  }
  
  // Rust exercises
  if (languageId.includes('rust')) {
    return generateRustExercises(difficulty)
  }
  
  // Node.js exercises
  if (languageId.includes('node')) {
    return generateNodeJSExercises(difficulty)
  }
  
  // Docker exercises
  if (languageId.includes('docker')) {
    return generateDockerExercises(difficulty)
  }
  
  // Kubernetes exercises  
  if (languageId.includes('kubernetes') || languageId.includes('k8s')) {
    return generateKubernetesExercises(difficulty)
  }
  
  // AWS exercises
  if (languageId.includes('aws')) {
    return generateAWSExercises(difficulty)
  }
  
  // Solidity exercises
  if (languageId.includes('solidity')) {
    return generateSolidityExercises(difficulty)
  }
  
  // TypeScript exercises
  if (languageId.includes('typescript')) {
    return generateTypeScriptExercises(difficulty)
  }
  
  // Vue exercises
  if (languageId.includes('vue')) {
    return generateVueExercises(difficulty)
  }
  
  // Pandas exercises
  if (languageId.includes('pandas')) {
    return generatePandasExercises(difficulty)
  }
  
  // TensorFlow exercises
  if (languageId.includes('tensorflow')) {
    return generateTensorFlowExercises(difficulty)
  }
  
  // PyTorch exercises
  if (languageId.includes('pytorch')) {
    return generatePyTorchExercises(difficulty)
  }
  
  // Scikit-learn exercises
  if (languageId.includes('scikit')) {
    return generateScikitLearnExercises(difficulty)
  }
  
  // Unity C# exercises
  if (languageId.includes('unity')) {
    return generateUnityExercises(difficulty)
  }
  
  // Unreal Engine exercises
  if (languageId.includes('unreal')) {
    return generateUnrealExercises(difficulty)
  }
  
  // Godot exercises
  if (languageId.includes('godot')) {
    return generateGodotExercises(difficulty)
  }
  
  // JavaScript Games exercises
  if (languageId.includes('javascript-games')) {
    return generateJSGamesExercises(difficulty)
  }
  
  // Python Backend exercises
  if (languageId.includes('python-backend')) {
    return generatePythonBackendExercises(difficulty)
  }
  
  // Python ML exercises
  if (languageId.includes('python-ml')) {
    return generatePythonMLExercises(difficulty)
  }
  
  // Redis exercises
  if (languageId.includes('redis')) {
    return generateRedisExercises(difficulty)
  }
  
  // Firebase exercises
  if (languageId.includes('firebase')) {
    return generateFirebaseExercises(difficulty)
  }
  
  // Terraform exercises
  if (languageId.includes('terraform')) {
    return generateTerraformExercises(difficulty)
  }
  
  // GitHub Actions exercises
  if (languageId.includes('github-actions')) {
    return generateGitHubActionsExercises(difficulty)
  }
  
  // Penetration Testing exercises
  if (languageId.includes('penetration-testing')) {
    return generatePenTestingExercises(difficulty)
  }
  
  // Network Security exercises
  if (languageId.includes('network-security')) {
    return generateNetworkSecurityExercises(difficulty)
  }
  
  // Cryptography exercises
  if (languageId.includes('cryptography')) {
    return generateCryptographyExercises(difficulty)
  }
  
  // Security Tools exercises
  if (languageId.includes('security-tools')) {
    return generateSecurityToolsExercises(difficulty)
  }
  
  // Web3.js exercises
  if (languageId.includes('web3js')) {
    return generateWeb3JSExercises(difficulty)
  }
  
  // Ethereum exercises
  if (languageId.includes('ethereum')) {
    return generateEthereumExercises(difficulty)
  }
  
  // Generic fallback for any unhandled languages
  return generateGenericExercises(languageName, difficulty)
}

// ============================================
// REACT EXERCISES
// ============================================
function generateReactExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  if (difficulty === 'easy') {
    return [
      {
        id: '1',
        title: 'Create a Component',
        description: 'Build your first React component.',
        instructions: 'Create a functional component called Welcome that displays "Hello, React!"',
        starterCode: `// Create your component`,
        solution: `function Welcome() {\n  return <h1>Hello, React!</h1>;\n}`,
        hint: 'Use function and return JSX',
        expectedOutput: 'Component renders Hello, React!'
      },
      {
        id: '2',
        title: 'Props Basics',
        description: 'Pass data to components.',
        instructions: 'Create Greeting component that takes a name prop',
        starterCode: `function Greeting(props) {\n  // Use props.name\n}`,
        solution: `function Greeting(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}`,
        hint: 'Access props with curly braces in JSX',
        expectedOutput: 'Displays greeting with name'
      },
      {
        id: '3',
        title: 'useState Hook',
        description: 'Manage component state.',
        instructions: 'Create a counter with useState',
        starterCode: `import { useState } from 'react';\n\nfunction Counter() {\n  // Add state\n}`,
        solution: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}`,
        hint: 'Use useState(0) for initial value',
        expectedOutput: 'Counter with button'
      },
      {
        id: '4',
        title: 'Event Handling',
        description: 'Handle button clicks.',
        instructions: 'Create button that shows alert on click',
        starterCode: `function Button() {\n  // Add onClick handler\n}`,
        solution: `function Button() {\n  const handleClick = () => {\n    alert('Button clicked!');\n  };\n  return <button onClick={handleClick}>Click Me</button>;\n}`,
        hint: 'Use onClick prop with function',
        expectedOutput: 'Button shows alert when clicked'
      },
      {
        id: '5',
        title: 'Conditional Rendering',
        description: 'Show/hide content conditionally.',
        instructions: 'Show "Logged In" or "Logged Out" based on isLoggedIn state',
        starterCode: `function Status() {\n  const [isLoggedIn, setIsLoggedIn] = useState(false);\n  // Add conditional rendering\n}`,
        solution: `function Status() {\n  const [isLoggedIn, setIsLoggedIn] = useState(false);\n  return (\n    <div>\n      {isLoggedIn ? <p>Logged In</p> : <p>Logged Out</p>}\n      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Toggle</button>\n    </div>\n  );\n}`,
        hint: 'Use ternary operator in JSX',
        expectedOutput: 'Toggles between logged in/out'
      },
      {
        id: '6',
        title: 'List Rendering',
        description: 'Render arrays of data.',
        instructions: 'Render array of fruits using map',
        starterCode: `function FruitList() {\n  const fruits = ['Apple', 'Banana', 'Orange'];\n  // Use map to render list\n}`,
        solution: `function FruitList() {\n  const fruits = ['Apple', 'Banana', 'Orange'];\n  return (\n    <ul>\n      {fruits.map((fruit, index) => (\n        <li key={index}>{fruit}</li>\n      ))}\n    </ul>\n  );\n}`,
        hint: 'Use .map() and add key prop',
        expectedOutput: 'List of fruits'
      },
    ]
  } else if (difficulty === 'medium') {
    return [
      {
        id: 'm1',
        title: 'useEffect Hook',
        description: 'Handle side effects.',
        instructions: 'Use useEffect to fetch data on mount',
        starterCode: `import { useState, useEffect } from 'react';\n\nfunction DataFetcher() {\n  // Add useEffect\n}`,
        solution: `import { useState, useEffect } from 'react';\n\nfunction DataFetcher() {\n  const [data, setData] = useState(null);\n  \n  useEffect(() => {\n    fetch('/api/data')\n      .then(res => res.json())\n      .then(data => setData(data));\n  }, []);\n  \n  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;\n}`,
        hint: 'Empty dependency array runs once on mount',
        expectedOutput: 'Fetches data when component mounts'
      },
      {
        id: 'm2',
        title: 'Custom Hook',
        description: 'Create reusable hooks.',
        instructions: 'Create useCounter custom hook',
        starterCode: `function useCounter() {\n  // Implement counter logic\n}`,
        solution: `function useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  const increment = () => setCount(c => c + 1);\n  const decrement = () => setCount(c => c - 1);\n  const reset = () => setCount(initialValue);\n  return { count, increment, decrement, reset };\n}`,
        hint: 'Return object with state and functions',
        expectedOutput: 'Reusable counter hook'
      },
      {
        id: 'm3',
        title: 'Context API',
        description: 'Share state across components.',
        instructions: 'Create ThemeContext for dark/light mode',
        starterCode: `import { createContext, useContext } from 'react';\n\n// Create context`,
        solution: `import { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext();\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nexport function useTheme() {\n  return useContext(ThemeContext);\n}`,
        hint: 'Use createContext and Provider',
        expectedOutput: 'Theme context with provider'
      },
      {
        id: 'm4',
        title: 'Form Handling',
        description: 'Handle form inputs.',
        instructions: 'Create controlled form with name and email',
        starterCode: `function Form() {\n  // Add form state and handlers\n}`,
        solution: `function Form() {\n  const [formData, setFormData] = useState({ name: '', email: '' });\n  \n  const handleChange = (e) => {\n    setFormData({ ...formData, [e.target.name]: e.target.value });\n  };\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log(formData);\n  };\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      <input name=\"name\" value={formData.name} onChange={handleChange} />\n      <input name=\"email\" value={formData.email} onChange={handleChange} />\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}`,
        hint: 'Use controlled inputs with state',
        expectedOutput: 'Controlled form with submission'
      },
      {
        id: 'm5',
        title: 'useReducer Hook',
        description: 'Manage complex state.',
        instructions: 'Implement counter with useReducer',
        starterCode: `import { useReducer } from 'react';\n\n// Create reducer`,
        solution: `import { useReducer } from 'react';\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment': return { count: state.count + 1 };\n    case 'decrement': return { count: state.count - 1 };\n    case 'reset': return { count: 0 };\n    default: return state;\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n  return (\n    <div>\n      <p>{state.count}</p>\n      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n    </div>\n  );\n}`,
        hint: 'Reducer takes state and action',
        expectedOutput: 'Counter using useReducer'
      },
      {
        id: 'm6',
        title: 'Refs and DOM',
        description: 'Access DOM elements.',
        instructions: 'Use useRef to focus input on button click',
        starterCode: `import { useRef } from 'react';\n\nfunction FocusInput() {\n  // Add ref\n}`,
        solution: `import { useRef } from 'react';\n\nfunction FocusInput() {\n  const inputRef = useRef(null);\n  \n  const handleFocus = () => {\n    inputRef.current.focus();\n  };\n  \n  return (\n    <div>\n      <input ref={inputRef} />\n      <button onClick={handleFocus}>Focus Input</button>\n    </div>\n  );\n}`,
        hint: 'Use useRef and ref attribute',
        expectedOutput: 'Button focuses input'
      },
    ]
  } else {
    return [
      {
        id: 'h1',
        title: 'useMemo Hook',
        description: 'Optimize expensive calculations.',
        instructions: 'Use useMemo to memoize factorial calculation',
        starterCode: `import { useState, useMemo } from 'react';\n\n// Add memoization`,
        solution: `import { useState, useMemo } from 'react';\n\nfunction Factorial() {\n  const [number, setNumber] = useState(5);\n  \n  const factorial = useMemo(() => {\n    console.log('Calculating factorial...');\n    let result = 1;\n    for (let i = 1; i <= number; i++) result *= i;\n    return result;\n  }, [number]);\n  \n  return <div>Factorial of {number} is {factorial}</div>;\n}`,
        hint: 'useMemo only recalculates when dependencies change',
        expectedOutput: 'Memoized factorial calculation'
      },
      {
        id: 'h2',
        title: 'useCallback Hook',
        description: 'Memoize callback functions.',
        instructions: 'Use useCallback to prevent unnecessary re-renders',
        starterCode: `import { useState, useCallback } from 'react';\n\n// Add useCallback`,
        solution: `import { useState, useCallback } from 'react';\n\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  \n  const handleClick = useCallback(() => {\n    console.log('Button clicked');\n  }, []);\n  \n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n      <Child onClick={handleClick} />\n    </div>\n  );\n}\n\nconst Child = React.memo(({ onClick }) => {\n  console.log('Child rendered');\n  return <button onClick={onClick}>Click</button>;\n});`,
        hint: 'Wrap function with useCallback',
        expectedOutput: 'Memoized callback prevents child re-render'
      },
      {
        id: 'h3',
        title: 'Error Boundaries',
        description: 'Catch and handle React errors.',
        instructions: 'Create error boundary component',
        starterCode: `import React from 'react';\n\n// Create ErrorBoundary class`,
        solution: `import React from 'react';\n\nclass ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n  \n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n  \n  componentDidCatch(error, errorInfo) {\n    console.log('Error:', error, errorInfo);\n  }\n  \n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong.</h1>;\n    }\n    return this.props.children;\n  }\n}`,
        hint: 'Use class component with getDerivedStateFromError',
        expectedOutput: 'Error boundary catches errors'
      },
      {
        id: 'h4',
        title: 'Portal',
        description: 'Render outside parent DOM hierarchy.',
        instructions: 'Create modal using ReactDOM.createPortal',
        starterCode: `import { createPortal } from 'react-dom';\n\n// Create Modal component`,
        solution: `import { createPortal } from 'react-dom';\n\nfunction Modal({ isOpen, onClose, children }) {\n  if (!isOpen) return null;\n  \n  return createPortal(\n    <div className=\"modal-overlay\" onClick={onClose}>\n      <div className=\"modal-content\" onClick={e => e.stopPropagation()}>\n        {children}\n        <button onClick={onClose}>Close</button>\n      </div>\n    </div>,\n    document.body\n  );\n}`,
        hint: 'Use createPortal(JSX, domNode)',
        expectedOutput: 'Modal renders outside root'
      },
      {
        id: 'h5',
        title: 'Suspense and Lazy',
        description: 'Code splitting with lazy loading.',
        instructions: 'Lazy load component with Suspense',
        starterCode: `import { lazy, Suspense } from 'react';\n\n// Add lazy loading`,
        solution: `import { lazy, Suspense } from 'react';\n\nconst HeavyComponent = lazy(() => import('./HeavyComponent'));\n\nfunction App() {\n  return (\n    <div>\n      <Suspense fallback={<div>Loading...</div>}>\n        <HeavyComponent />\n      </Suspense>\n    </div>\n  );\n}`,
        hint: 'Wrap lazy component in Suspense',
        expectedOutput: 'Component loads lazily'
      },
      {
        id: 'h6',
        title: 'Custom Hook with Cleanup',
        description: 'Create hook with cleanup logic.',
        instructions: 'Create useWindowSize hook with resize listener',
        starterCode: `import { useState, useEffect } from 'react';\n\n// Create custom hook`,
        solution: `import { useState, useEffect } from 'react';\n\nfunction useWindowSize() {\n  const [size, setSize] = useState({\n    width: window.innerWidth,\n    height: window.innerHeight\n  });\n  \n  useEffect(() => {\n    const handleResize = () => {\n      setSize({\n        width: window.innerWidth,\n        height: window.innerHeight\n      });\n    };\n    \n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n  \n  return size;\n}`,
        hint: 'Return cleanup function from useEffect',
        expectedOutput: 'Hook tracks window size with cleanup'
      },
    ]
  }
}

// ============================================
// REACT NATIVE EXERCISES  
// ============================================
function generateReactNativeExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  if (difficulty === 'easy') {
    return [
      {
        id: '1',
        title: 'View and Text',
        description: 'Basic React Native components.',
        instructions: 'Create View with Text showing "Hello Mobile"',
        starterCode: `import { View, Text } from 'react-native';\n\n// Create component`,
        solution: `import { View, Text } from 'react-native';\n\nfunction App() {\n  return (\n    <View>\n      <Text>Hello Mobile</Text>\n    </View>\n  );\n}`,
        hint: 'Use View as container and Text for text',
        expectedOutput: 'Displays Hello Mobile'
      },
      {
        id: '2',
        title: 'TouchableOpacity',
        description: 'Handle touch events.',
        instructions: 'Create touchable button that shows alert',
        starterCode: `import { TouchableOpacity, Text, Alert } from 'react-native';\n\n// Add button`,
        solution: `import { TouchableOpacity, Text, Alert } from 'react-native';\n\nfunction Button() {\n  return (\n    <TouchableOpacity onPress={() => Alert.alert('Pressed!')}>\n      <Text>Press Me</Text>\n    </TouchableOpacity>\n  );\n}`,
        hint: 'Use onPress prop',
        expectedOutput: 'Button shows alert on press'
      },
      {
        id: '3',
        title: 'StyleSheet',
        description: 'Style components.',
        instructions: 'Use StyleSheet to create blue box with padding',
        starterCode: `import { View, StyleSheet } from 'react-native';\n\n// Add styles`,
        solution: `import { View, StyleSheet } from 'react-native';\n\nfunction Box() {\n  return <View style={styles.box} />;\n}\n\nconst styles = StyleSheet.create({\n  box: {\n    width: 100,\n    height: 100,\n    backgroundColor: 'blue',\n    padding: 20\n  }\n});`,
        hint: 'Use StyleSheet.create',
        expectedOutput: 'Styled blue box'
      },
      {
        id: '4',
        title: 'TextInput',
        description: 'Handle text input.',
        instructions: 'Create controlled TextInput',
        starterCode: `import { TextInput, useState } from 'react-native';\n\n// Add input`,
        solution: `import { TextInput, useState } from 'react-native';\n\nfunction Input() {\n  const [text, setText] = useState('');\n  return (\n    <TextInput\n      value={text}\n      onChangeText={setText}\n      placeholder=\"Enter text\"\n    />\n  );\n}`,
        hint: 'Use onChangeText instead of onChange',
        expectedOutput: 'Controlled text input'
      },
      {
        id: '5',
        title: 'ScrollView',
        description: 'Create scrollable content.',
        instructions: 'Render scrollable list of 20 items',
        starterCode: `import { ScrollView, Text } from 'react-native';\n\n// Add ScrollView`,
        solution: `import { ScrollView, Text } from 'react-native';\n\nfunction List() {\n  return (\n    <ScrollView>\n      {Array.from({ length: 20 }, (_, i) => (\n        <Text key={i}>Item {i + 1}</Text>\n      ))}\n    </ScrollView>\n  );\n}`,
        hint: 'Wrap content in ScrollView',
        expectedOutput: 'Scrollable list of items'
      },
      {
        id: '6',
        title: 'Image Component',
        description: 'Display images.',
        instructions: 'Show image with source and resize mode',
        starterCode: `import { Image } from 'react-native';\n\n// Add image`,
        solution: `import { Image } from 'react-native';\n\nfunction Photo() {\n  return (\n    <Image\n      source={{ uri: 'https://example.com/photo.jpg' }}\n      style={{ width: 200, height: 200 }}\n      resizeMode=\"cover\"\n    />\n  );\n}`,
        hint: 'Use source and resizeMode props',
        expectedOutput: 'Image with resize mode'
      },
    ]
  } else if (difficulty === 'medium') {
    return [
      {
        id: 'm1',
        title: 'FlatList',
        description: 'Efficient list rendering.',
        instructions: 'Use FlatList to render 100 items efficiently',
        starterCode: `import { FlatList, Text } from 'react-native';\n\n// Add FlatList`,
        solution: `import { FlatList, Text } from 'react-native';\n\nfunction List() {\n  const data = Array.from({ length: 100 }, (_, i) => ({ id: String(i), title: \`Item \${i + 1}\` }));\n  \n  return (\n    <FlatList\n      data={data}\n      keyExtractor={item => item.id}\n      renderItem={({ item }) => <Text>{item.title}</Text>}\n    />\n  );\n}`,
        hint: 'Use data, keyExtractor, and renderItem props',
        expectedOutput: 'Efficiently rendered list'
      },
      {
        id: 'm2',
        title: 'Animated API',
        description: 'Create animations.',
        instructions: 'Fade in view using Animated API',
        starterCode: `import { Animated } from 'react-native';\n\n// Add animation`,
        solution: `import { Animated, useEffect, useRef } from 'react-native';\n\nfunction FadeIn() {\n  const fadeAnim = useRef(new Animated.Value(0)).current;\n  \n  useEffect(() => {\n    Animated.timing(fadeAnim, {\n      toValue: 1,\n      duration: 1000,\n      useNativeDriver: true\n    }).start();\n  }, []);\n  \n  return (\n    <Animated.View style={{ opacity: fadeAnim }}>\n      <Text>Fading In</Text>\n    </Animated.View>\n  );\n}`,
        hint: 'Use Animated.timing and useNativeDriver',
        expectedOutput: 'View fades in'
      },
      {
        id: 'm3',
        title: 'AsyncStorage',
        description: 'Persist data locally.',
        instructions: 'Save and load data from AsyncStorage',
        starterCode: `import AsyncStorage from '@react-native-async-storage/async-storage';\n\n// Add storage functions`,
        solution: `import AsyncStorage from '@react-native-async-storage/async-storage';\n\nconst saveData = async (key, value) => {\n  try {\n    await AsyncStorage.setItem(key, value);\n  } catch (e) {\n    console.error(e);\n  }\n};\n\nconst getData = async (key) => {\n  try {\n    return await AsyncStorage.getItem(key);\n  } catch (e) {\n    console.error(e);\n  }\n};`,
        hint: 'Use async/await with setItem and getItem',
        expectedOutput: 'Data persisted locally'
      },
      {
        id: 'm4',
        title: 'Navigation',
        description: 'Navigate between screens.',
        instructions: 'Set up stack navigation with two screens',
        starterCode: `import { createStackNavigator } from '@react-navigation/stack';\n\n// Create navigator`,
        solution: `import { createStackNavigator } from '@react-navigation/stack';\n\nconst Stack = createStackNavigator();\n\nfunction App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator>\n        <Stack.Screen name=\"Home\" component={HomeScreen} />\n        <Stack.Screen name=\"Details\" component={DetailsScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}`,
        hint: 'Use Stack.Navigator and Stack.Screen',
        expectedOutput: 'Navigation between screens'
      },
      {
        id: 'm5',
        title: 'Platform Specific Code',
        description: 'Handle iOS and Android differences.',
        instructions: 'Use Platform API for platform-specific styles',
        starterCode: `import { Platform } from 'react-native';\n\n// Add platform check`,
        solution: `import { Platform, StyleSheet } from 'react-native';\n\nconst styles = StyleSheet.create({\n  container: {\n    padding: Platform.OS === 'ios' ? 20 : 10,\n    ...Platform.select({\n      ios: { shadowColor: 'black' },\n      android: { elevation: 5 }\n    })\n  }\n});`,
        hint: 'Use Platform.OS and Platform.select',
        expectedOutput: 'Platform-specific styling'
      },
      {
        id: 'm6',
        title: 'Keyboard Handling',
        description: 'Manage keyboard behavior.',
        instructions: 'Use KeyboardAvoidingView for input forms',
        starterCode: `import { KeyboardAvoidingView } from 'react-native';\n\n// Add keyboard handling`,
        solution: `import { KeyboardAvoidingView, Platform } from 'react-native';\n\nfunction Form() {\n  return (\n    <KeyboardAvoidingView\n      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}\n      style={{ flex: 1 }}\n    >\n      <TextInput placeholder=\"Enter text\" />\n    </KeyboardAvoidingView>\n  );\n}`,
        hint: 'Use behavior prop with platform check',
        expectedOutput: 'Form avoids keyboard'
      },
    ]
  } else {
    return [
      {
        id: 'h1',
        title: 'Native Modules',
        description: 'Bridge to native code.',
        instructions: 'Call native module method',
        starterCode: `import { NativeModules } from 'react-native';\n\n// Access native module`,
        solution: `import { NativeModules } from 'react-native';\n\nconst { MyNativeModule } = NativeModules;\n\nfunction callNativeMethod() {\n  MyNativeModule.processData('input', (error, result) => {\n    if (error) {\n      console.error(error);\n    } else {\n      console.log(result);\n    }\n  });\n}`,
        hint: 'Use NativeModules to access native code',
        expectedOutput: 'Calls native module'
      },
      {
        id: 'h2',
        title: 'Gesture Handler',
        description: 'Advanced touch gestures.',
        instructions: 'Implement pan gesture with Gesture Handler',
        starterCode: `import { PanGestureHandler } from 'react-native-gesture-handler';\n\n// Add gesture`,
        solution: `import { PanGestureHandler } from 'react-native-gesture-handler';\nimport Animated, { useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated';\n\nfunction Draggable() {\n  const translateX = useSharedValue(0);\n  const translateY = useSharedValue(0);\n  \n  const gestureHandler = useAnimatedGestureHandler({\n    onActive: (event) => {\n      translateX.value = event.translationX;\n      translateY.value = event.translationY;\n    }\n  });\n  \n  return (\n    <PanGestureHandler onGestureEvent={gestureHandler}>\n      <Animated.View style={{ transform: [{ translateX }, { translateY }] }} />\n    </PanGestureHandler>\n  );\n}`,
        hint: 'Use useAnimatedGestureHandler',
        expectedOutput: 'Draggable view'
      },
      {
        id: 'h3',
        title: 'Reanimated 2',
        description: 'High-performance animations.',
        instructions: 'Create smooth animation with Reanimated 2',
        starterCode: `import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';\n\n// Add animation`,
        solution: `import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';\n\nfunction SpringBox() {\n  const scale = useSharedValue(1);\n  \n  const animatedStyle = useAnimatedStyle(() => {\n    return {\n      transform: [{ scale: scale.value }]\n    };\n  });\n  \n  const handlePress = () => {\n    scale.value = withSpring(scale.value === 1 ? 1.5 : 1);\n  };\n  \n  return (\n    <TouchableOpacity onPress={handlePress}>\n      <Animated.View style={[styles.box, animatedStyle]} />\n    </TouchableOpacity>\n  );\n}`,
        hint: 'Use useSharedValue and useAnimatedStyle',
        expectedOutput: 'Spring animation on press'
      },
      {
        id: 'h4',
        title: 'Performance Optimization',
        description: 'Optimize list performance.',
        instructions: 'Implement FlatList with all optimizations',
        starterCode: `import { FlatList } from 'react-native';\n\n// Add optimizations`,
        solution: `import { FlatList, memo } from 'react-native';\n\nconst Item = memo(({ item }) => <Text>{item.title}</Text>);\n\nfunction OptimizedList({ data }) {\n  return (\n    <FlatList\n      data={data}\n      renderItem={({ item }) => <Item item={item} />}\n      keyExtractor={item => item.id}\n      getItemLayout={(data, index) => ({\n        length: 50,\n        offset: 50 * index,\n        index\n      })}\n      removeClippedSubviews={true}\n      maxToRenderPerBatch={10}\n      updateCellsBatchingPeriod={50}\n      initialNumToRender={10}\n      windowSize={5}\n    />\n  );\n}`,
        hint: 'Use memo, getItemLayout, and performance props',
        expectedOutput: 'Highly optimized list'
      },
      {
        id: 'h5',
        title: 'Deep Linking',
        description: 'Handle deep links.',
        instructions: 'Configure deep linking with navigation',
        starterCode: `import { Linking } from 'react-native';\n\n// Add deep linking`,
        solution: `import { Linking } from 'react-native';\n\nconst linking = {\n  prefixes: ['myapp://', 'https://myapp.com'],\n  config: {\n    screens: {\n      Home: '',\n      Profile: 'profile/:id',\n      Settings: 'settings'\n    }\n  }\n};\n\nfunction App() {\n  return (\n    <NavigationContainer linking={linking}>\n      {/* Navigation */}\n    </NavigationContainer>\n  );\n}`,
        hint: 'Configure linking object with prefixes and config',
        expectedOutput: 'Deep linking configured'
      },
      {
        id: 'h6',
        title: 'Native UI Components',
        description: 'Create custom native component.',
        instructions: 'Register and use requireNativeComponent',
        starterCode: `import { requireNativeComponent } from 'react-native';\n\n// Create native component`,
        solution: `import { requireNativeComponent, ViewStyle } from 'react-native';\n\ninterface MyNativeViewProps {\n  color: string;\n  style?: ViewStyle;\n}\n\nconst RCTMyNativeView = requireNativeComponent<MyNativeViewProps>('RCTMyNativeView');\n\nfunction MyNativeView(props: MyNativeViewProps) {\n  return <RCTMyNativeView {...props} />;\n}`,
        hint: 'Use requireNativeComponent with TypeScript interface',
        expectedOutput: 'Native component bridge'
      },
    ]
  }
}

// ============================================
// NEXT.JS EXERCISES
// ============================================
function generateNextJSExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  if (difficulty === 'easy') {
    return [
      {
        id: '1',
        title: 'Pages Router',
        description: 'Create a Next.js page.',
        instructions: 'Create page component at pages/about.js',
        starterCode: `// Create page component`,
        solution: `export default function About() {\n  return (\n    <div>\n      <h1>About Page</h1>\n    </div>\n  );\n}`,
        hint: 'Default export function from pages folder',
        expectedOutput: 'About page accessible at /about'
      },
      {
        id: '2',
        title: 'Link Component',
        description: 'Navigate between pages.',
        instructions: 'Create navigation with Link',
        starterCode: `import Link from 'next/link';\n\n// Add links`,
        solution: `import Link from 'next/link';\n\nexport default function Nav() {\n  return (\n    <nav>\n      <Link href=\"/\">Home</Link>\n      <Link href=\"/about\">About</Link>\n    </nav>\n  );\n}`,
        hint: 'Use Link with href prop',
        expectedOutput: 'Client-side navigation'
      },
      {
        id: '3',
        title: 'Image Component',
        description: 'Optimize images.',
        instructions: 'Use Next.js Image component',
        starterCode: `import Image from 'next/image';\n\n// Add image`,
        solution: `import Image from 'next/image';\n\nexport default function Photo() {\n  return (\n    <Image\n      src=\"/photo.jpg\"\n      alt=\"Description\"\n      width={500}\n      height={300}\n    />\n  );\n}`,
        hint: 'Image requires width and height',
        expectedOutput: 'Optimized image'
      },
      {
        id: '4',
        title: 'Head Component',
        description: 'Add meta tags.',
        instructions: 'Set page title and meta description',
        starterCode: `import Head from 'next/head';\n\n// Add head`,
        solution: `import Head from 'next/head';\n\nexport default function Page() {\n  return (\n    <>\n      <Head>\n        <title>My Page</title>\n        <meta name=\"description\" content=\"Page description\" />\n      </Head>\n      <h1>Content</h1>\n    </>\n  );\n}`,
        hint: 'Use Head component from next/head',
        expectedOutput: 'Custom page title and meta'
      },
      {
        id: '5',
        title: 'Dynamic Routes',
        description: 'Create dynamic pages.',
        instructions: 'Create dynamic route at pages/posts/[id].js',
        starterCode: `import { useRouter } from 'next/router';\n\n// Access route params`,
        solution: `import { useRouter } from 'next/router';\n\nexport default function Post() {\n  const router = useRouter();\n  const { id } = router.query;\n  \n  return <h1>Post: {id}</h1>;\n}`,
        hint: 'Use useRouter to access query params',
        expectedOutput: 'Dynamic post page'
      },
      {
        id: '6',
        title: '_app.js Custom',
        description: 'Customize App component.',
        instructions: 'Create _app.js with global layout',
        starterCode: `// Create _app.js`,
        solution: `export default function MyApp({ Component, pageProps }) {\n  return (\n    <div>\n      <nav>Global Nav</nav>\n      <Component {...pageProps} />\n    </div>\n  );\n}`,
        hint: 'Wrap Component with layout',
        expectedOutput: 'Global layout for all pages'
      },
    ]
  } else if (difficulty === 'medium') {
    return [
      {
        id: 'm1',
        title: 'getStaticProps',
        description: 'Static site generation.',
        instructions: 'Fetch data at build time',
        starterCode: `// Add getStaticProps`,
        solution: `export default function Page({ data }) {\n  return <div>{JSON.stringify(data)}</div>;\n}\n\nexport async function getStaticProps() {\n  const res = await fetch('https://api.example.com/data');\n  const data = await res.json();\n  \n  return {\n    props: { data },\n    revalidate: 60 // ISR\n  };\n}`,
        hint: 'Export async getStaticProps function',
        expectedOutput: 'Static generation with ISR'
      },
      {
        id: 'm2',
        title: 'getServerSideProps',
        description: 'Server-side rendering.',
        instructions: 'Fetch data on each request',
        starterCode: `// Add getServerSideProps`,
        solution: `export default function Page({ data }) {\n  return <div>{JSON.stringify(data)}</div>;\n}\n\nexport async function getServerSideProps(context) {\n  const res = await fetch(\`https://api.example.com/data?id=\${context.params.id}\`);\n  const data = await res.json();\n  \n  return {\n    props: { data }\n  };\n}`,
        hint: 'Use context.params for dynamic routes',
        expectedOutput: 'SSR with dynamic data'
      },
      {
        id: 'm3',
        title: 'API Routes',
        description: 'Create backend endpoints.',
        instructions: 'Create API route at pages/api/hello.js',
        starterCode: `// Create API handler`,
        solution: `export default function handler(req, res) {\n  if (req.method === 'GET') {\n    res.status(200).json({ message: 'Hello API' });\n  } else if (req.method === 'POST') {\n    const { name } = req.body;\n    res.status(200).json({ message: \`Hello \${name}\` });\n  } else {\n    res.status(405).json({ error: 'Method not allowed' });\n  }\n}`,
        hint: 'Export handler function with req and res',
        expectedOutput: 'REST API endpoint'
      },
      {
        id: 'm4',
        title: 'Middleware',
        description: 'Add request middleware.',
        instructions: 'Create middleware.js for auth',
        starterCode: `// Create middleware`,
        solution: `import { NextResponse } from 'next/server';\n\nexport function middleware(request) {\n  const token = request.cookies.get('token');\n  \n  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {\n    return NextResponse.redirect(new URL('/login', request.url));\n  }\n  \n  return NextResponse.next();\n}\n\nexport const config = {\n  matcher: '/dashboard/:path*'\n};`,
        hint: 'Use NextResponse to redirect or continue',
        expectedOutput: 'Auth middleware'
      },
      {
        id: 'm5',
        title: 'getStaticPaths',
        description: 'Generate dynamic static pages.',
        instructions: 'Define paths for dynamic routes',
        starterCode: `// Add getStaticPaths`,
        solution: `export default function Post({ post }) {\n  return <h1>{post.title}</h1>;\n}\n\nexport async function getStaticPaths() {\n  const res = await fetch('https://api.example.com/posts');\n  const posts = await res.json();\n  \n  const paths = posts.map(post => ({\n    params: { id: post.id.toString() }\n  }));\n  \n  return {\n    paths,\n    fallback: 'blocking'\n  };\n}\n\nexport async function getStaticProps({ params }) {\n  const res = await fetch(\`https://api.example.com/posts/\${params.id}\`);\n  const post = await res.json();\n  return { props: { post } };\n}`,
        hint: 'Return paths array and fallback strategy',
        expectedOutput: 'Dynamic static pages'
      },
      {
        id: 'm6',
        title: 'Custom Document',
        description: 'Customize HTML structure.',
        instructions: 'Create _document.js with custom HTML',
        starterCode: `// Create _document.js`,
        solution: `import { Html, Head, Main, NextScript } from 'next/document';\n\nexport default function Document() {\n  return (\n    <Html lang=\"en\">\n      <Head>\n        <link rel=\"icon\" href=\"/favicon.ico\" />\n      </Head>\n      <body>\n        <Main />\n        <NextScript />\n      </body>\n    </Html>\n  );\n}`,
        hint: 'Use Html, Head, Main, NextScript components',
        expectedOutput: 'Custom HTML structure'
      },
    ]
  } else {
    return [
      {
        id: 'h1',
        title: 'App Router',
        description: 'Use new app directory.',
        instructions: 'Create server component in app directory',
        starterCode: `// Create app/page.tsx`,
        solution: `async function getData() {\n  const res = await fetch('https://api.example.com/data', {\n    cache: 'no-store' // or 'force-cache'\n  });\n  return res.json();\n}\n\nexport default async function Page() {\n  const data = await getData();\n  return <div>{JSON.stringify(data)}</div>;\n}`,
        hint: 'Async server components fetch data directly',
        expectedOutput: 'Server component with data'
      },
      {
        id: 'h2',
        title: 'Server Actions',
        description: 'Form mutations with server actions.',
        instructions: 'Create server action for form',
        starterCode: `'use server'\n\n// Create action`,
        solution: `'use server'\n\nimport { revalidatePath } from 'next/cache';\n\nexport async function createPost(formData: FormData) {\n  const title = formData.get('title');\n  \n  await fetch('https://api.example.com/posts', {\n    method: 'POST',\n    body: JSON.stringify({ title })\n  });\n  \n  revalidatePath('/posts');\n}\n\n// In component:\nfunction Form() {\n  return (\n    <form action={createPost}>\n      <input name=\"title\" />\n      <button type=\"submit\">Create</button>\n    </form>\n  );\n}`,
        hint: 'Use "use server" directive',
        expectedOutput: 'Server action for forms'
      },
      {
        id: 'h3',
        title: 'Streaming SSR',
        description: 'Stream components with Suspense.',
        instructions: 'Stream slow component',
        starterCode: `// Add streaming`,
        solution: `import { Suspense } from 'react';\n\nasync function SlowComponent() {\n  await new Promise(resolve => setTimeout(resolve, 2000));\n  return <div>Slow Data</div>;\n}\n\nexport default function Page() {\n  return (\n    <div>\n      <h1>Fast Content</h1>\n      <Suspense fallback={<div>Loading...</div>}>\n        <SlowComponent />\n      </Suspense>\n    </div>\n  );\n}`,
        hint: 'Wrap async component in Suspense',
        expectedOutput: 'Streaming with Suspense'
      },
      {
        id: 'h4',
        title: 'Route Handlers',
        description: 'API routes in app directory.',
        instructions: 'Create route.ts handler',
        starterCode: `// Create app/api/route.ts`,
        solution: `import { NextRequest, NextResponse } from 'next/server';\n\nexport async function GET(request: NextRequest) {\n  const searchParams = request.nextUrl.searchParams;\n  const query = searchParams.get('query');\n  \n  return NextResponse.json({ query });\n}\n\nexport async function POST(request: NextRequest) {\n  const body = await request.json();\n  // Process body\n  return NextResponse.json({ success: true });\n}`,
        hint: 'Export GET, POST functions from route.ts',
        expectedOutput: 'Modern API routes'
      },
      {
        id: 'h5',
        title: 'Parallel Routes',
        description: 'Render multiple pages in slots.',
        instructions: 'Set up parallel routes with @slots',
        starterCode: `// Create layout with slots`,
        solution: `// app/layout.tsx\nexport default function Layout({\n  children,\n  team,\n  analytics\n}: {\n  children: React.ReactNode;\n  team: React.ReactNode;\n  analytics: React.ReactNode;\n}) {\n  return (\n    <>\n      {children}\n      <div style={{ display: 'flex' }}>\n        <div>{team}</div>\n        <div>{analytics}</div>\n      </div>\n    </>\n  );\n}\n\n// app/@team/page.tsx\nexport default function TeamPage() {\n  return <div>Team Slot</div>;\n}`,
        hint: 'Use @folder convention for slots',
        expectedOutput: 'Parallel routes with slots'
      },
      {
        id: 'h6',
        title: 'Intercepting Routes',
        description: 'Intercept navigation with modals.',
        instructions: 'Create intercepting route for modal',
        starterCode: `// Set up route interception`,
        solution: `// app/(..)photo/[id]/page.tsx - intercepts from sibling\nexport default function PhotoModal({ params }) {\n  return (\n    <dialog open>\n      <h1>Photo {params.id} in Modal</h1>\n    </dialog>\n  );\n}\n\n// app/photo/[id]/page.tsx - full page\nexport default function PhotoPage({ params }) {\n  return <h1>Photo {params.id} Full Page</h1>;\n}`,
        hint: 'Use (..) prefix for route interception',
        expectedOutput: 'Modal interception'
      },
    ]
  }
}

// Generic fallback for unhandled languages
function generateGenericExercises(languageName: string, difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  if (difficulty === 'easy') {
    return [
      {
        id: '1',
        title: `Variables in ${languageName}`,
        description: `Learn variable declaration in ${languageName}.`,
        instructions: `Create variables to store your name and age in ${languageName}`,
        starterCode: `// Create your variables here`,
        solution: `// Example solution\nlet name = "Alice";\nlet age = 25;`,
        hint: 'Use appropriate variable declaration syntax',
        expectedOutput: 'Variables created successfully'
      },
      {
        id: '2',
        title: 'Basic Function',
        description: 'Write a simple function.',
        instructions: `Create a function in ${languageName} that adds two numbers`,
        starterCode: `// Write your function here`,
        solution: `function add(a, b) {\n  return a + b;\n}`,
        hint: 'Functions take parameters and return values',
        expectedOutput: 'Function adds numbers'
      },
      {
        id: '3',
        title: 'Control Flow',
        description: 'Use conditional statements.',
        instructions: `Write an if-else statement in ${languageName}`,
        starterCode: `// Write conditional logic`,
        solution: `if (condition) {\n  // do something\n} else {\n  // do something else\n}`,
        hint: 'Use if/else for conditions',
        expectedOutput: 'Conditional logic working'
      },
      {
        id: '4',
        title: 'Loops',
        description: 'Practice iteration.',
        instructions: `Write a loop in ${languageName} that prints numbers 1 to 5`,
        starterCode: `// Write your loop here`,
        solution: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`,
        hint: 'Use a for loop',
        expectedOutput: 'Prints numbers 1-5'
      },
      {
        id: '5',
        title: 'Data Structures',
        description: 'Work with collections.',
        instructions: `Create and manipulate an array in ${languageName}`,
        starterCode: `// Create array`,
        solution: `const items = [1, 2, 3, 4, 5];`,
        hint: 'Use array literal syntax',
        expectedOutput: 'Array created'
      },
      {
        id: '6',
        title: 'Basic Project',
        description: 'Combine concepts.',
        instructions: `Build a simple calculator in ${languageName}`,
        starterCode: `// Create calculator`,
        solution: `function calculator(a, b, operation) {\n  switch(operation) {\n    case '+': return a + b;\n    case '-': return a - b;\n    case '*': return a * b;\n    case '/': return a / b;\n    default: return 0;\n  }\n}`,
        hint: 'Use switch statement',
        expectedOutput: 'Calculator with basic operations'
      },
    ]
  } else if (difficulty === 'medium') {
    return [
      {
        id: 'm1',
        title: `Advanced ${languageName} Features`,
        description: 'Explore intermediate concepts.',
        instructions: `Use advanced features of ${languageName}`,
        starterCode: `// Implement advanced feature`,
        solution: `// Language-specific advanced code`,
        hint: 'Refer to documentation',
        expectedOutput: 'Advanced feature implemented'
      },
      {
        id: 'm2',
        title: 'Error Handling',
        description: 'Handle errors gracefully.',
        instructions: `Implement error handling in ${languageName}`,
        starterCode: `// Add error handling`,
        solution: `try {\n  // code\n} catch (error) {\n  // handle error\n}`,
        hint: 'Use try-catch blocks',
        expectedOutput: 'Errors handled properly'
      },
      {
        id: 'm3',
        title: 'Modules',
        description: 'Organize code with modules.',
        instructions: `Create and import modules in ${languageName}`,
        starterCode: `// Create module`,
        solution: `// module.js\nexport function myFunction() {}\n\n// main.js\nimport { myFunction } from './module';`,
        hint: 'Use export and import',
        expectedOutput: 'Modular code structure'
      },
      {
        id: 'm4',
        title: 'Asynchronous Programming',
        description: 'Handle async operations.',
        instructions: `Implement async operations in ${languageName}`,
        starterCode: `// Add async code`,
        solution: `async function fetchData() {\n  const response = await fetch(url);\n  return response.json();\n}`,
        hint: 'Use async/await or promises',
        expectedOutput: 'Async operations working'
      },
      {
        id: 'm5',
        title: 'Data Processing',
        description: 'Process and transform data.',
        instructions: `Filter and map data in ${languageName}`,
        starterCode: `// Process data`,
        solution: `const processed = data.filter(x => x > 0).map(x => x * 2);`,
        hint: 'Use array methods',
        expectedOutput: 'Data processed correctly'
      },
      {
        id: 'm6',
        title: 'Intermediate Project',
        description: 'Build a practical application.',
        instructions: `Create a todo list in ${languageName}`,
        starterCode: `// Build project`,
        solution: `// Complete todo list implementation`,
        hint: 'Combine multiple concepts',
        expectedOutput: 'Working todo list'
      },
    ]
  } else {
    return [
      {
        id: 'h1',
        title: `${languageName} Design Patterns`,
        description: 'Apply design patterns.',
        instructions: `Implement a design pattern in ${languageName}`,
        starterCode: `// Implement pattern`,
        solution: `// Design pattern implementation`,
        hint: 'Research common patterns',
        expectedOutput: 'Pattern implemented'
      },
      {
        id: 'h2',
        title: 'Performance Optimization',
        description: 'Optimize code performance.',
        instructions: `Optimize algorithm in ${languageName}`,
        starterCode: `// Optimize code`,
        solution: `// Optimized implementation`,
        hint: 'Consider time and space complexity',
        expectedOutput: 'Optimized code'
      },
      {
        id: 'h3',
        title: 'Testing',
        description: 'Write unit tests.',
        instructions: `Create tests for your ${languageName} code`,
        starterCode: `// Write tests`,
        solution: `// Test implementation`,
        hint: 'Use testing framework',
        expectedOutput: 'Tests passing'
      },
      {
        id: 'h4',
        title: 'Advanced Architecture',
        description: 'Design scalable systems.',
        instructions: `Architect a complex system in ${languageName}`,
        starterCode: `// Design system`,
        solution: `// System architecture`,
        hint: 'Consider scalability and maintainability',
        expectedOutput: 'Scalable architecture'
      },
      {
        id: 'h5',
        title: 'Security',
        description: 'Implement security measures.',
        instructions: `Add security features in ${languageName}`,
        starterCode: `// Add security`,
        solution: `// Security implementation`,
        hint: 'Follow security best practices',
        expectedOutput: 'Secure code'
      },
      {
        id: 'h6',
        title: 'Advanced Project',
        description: 'Build production-ready application.',
        instructions: `Create a complete application in ${languageName}`,
        starterCode: `// Build application`,
        solution: `// Complete application`,
        hint: 'Apply all advanced concepts',
        expectedOutput: 'Production-ready app'
      },
    ]
  }
}

// Additional language generators using template with language-specific syntax
function generateFlutterExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Flutter', 'dart', difficulty, {
    easy: { concepts: ['StatelessWidget', 'StatefulWidget', 'Container', 'Text', 'Button', 'ListView'] },
    medium: { concepts: ['State Management', 'Navigation', 'Forms', 'Animations', 'HTTP', 'Provider'] },
    hard: { concepts: ['BLoC Pattern', 'Custom Painters', 'Platform Channels', 'Isolates', 'Performance', 'Testing'] }
  })
}

function generateSwiftExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Swift', 'swift', difficulty, {
    easy: { concepts: ['Variables', 'Functions', 'Optionals', 'Arrays', 'Dictionaries', 'Classes'] },
    medium: { concepts: ['Protocols', 'Extensions', 'Generics', 'Error Handling', 'Closures', 'UIKit'] },
    hard: { concepts: ['Combine', 'SwiftUI Advanced', 'Memory Management', 'Concurrency', 'Protocol-Oriented', 'Core Data'] }
  })
}

function generateKotlinExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Kotlin', 'kotlin', difficulty, {
    easy: { concepts: ['val/var', 'Functions', 'Null Safety', 'Classes', 'Collections', 'When Expression'] },
    medium: { concepts: ['Extension Functions', 'Data Classes', 'Sealed Classes', 'Coroutines', 'Lambdas', 'Scope Functions'] },
    hard: { concepts: ['Flow', 'Delegated Properties', 'DSL Building', 'Multiplatform', 'Reflection', 'Annotations'] }
  })
}

function generateRExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('R', 'r', difficulty, {
    easy: { concepts: ['Vectors', 'Data Frames', 'Lists', 'Functions', 'Subsetting', 'Basic Plots'] },
    medium: { concepts: ['dplyr', 'ggplot2', 'tidyr', 'Apply Functions', 'String Manipulation', 'File I/O'] },
    hard: { concepts: ['Shiny Apps', 'Machine Learning', 'Time Series', 'Parallel Processing', 'Package Development', 'Advanced Viz'] }
  })
}

function generateSQLExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('SQL', 'sql', difficulty, {
    easy: { concepts: ['SELECT', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'JOIN'] },
    medium: { concepts: ['Subqueries', 'GROUP BY', 'HAVING', 'Indexes', 'Views', 'Transactions'] },
    hard: { concepts: ['CTEs', 'Window Functions', 'Query Optimization', 'Stored Procedures', 'Triggers', 'Partitioning'] }
  })
}

function generateMongoDBExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('MongoDB', 'javascript', difficulty, {
    easy: { concepts: ['Insert', 'Find', 'Update', 'Delete', 'Projection', 'Sorting'] },
    medium: { concepts: ['Aggregation Pipeline', 'Indexes', 'Operators', 'Arrays', 'Embedded Docs', 'Lookup'] },
    hard: { concepts: ['Sharding', 'Replication', 'Transactions', 'Change Streams', 'Text Search', 'Performance Tuning'] }
  })
}

function generateJavaExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Java', 'java', difficulty, {
    easy: { concepts: ['Classes', 'Methods', 'Arrays', 'Loops', 'Conditionals', 'Strings'] },
    medium: { concepts: ['OOP', 'Collections', 'Exceptions', 'Generics', 'Lambda', 'Streams'] },
    hard: { concepts: ['Concurrency', 'Reflection', 'Annotations', 'JVM Internals', 'Design Patterns', 'Spring Framework'] }
  })
}

function generateGoExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Go', 'go', difficulty, {
    easy: { concepts: ['Variables', 'Functions', 'Slices', 'Maps', 'Structs', 'Pointers'] },
    medium: { concepts: ['Goroutines', 'Channels', 'Interfaces', 'Error Handling', 'Packages', 'Testing'] },
    hard: { concepts: ['Context', 'Sync Primitives', 'Reflection', 'CGO', 'Performance', 'Microservices'] }
  })
}

function generateRustExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Rust', 'rust', difficulty, {
    easy: { concepts: ['Variables', 'Functions', 'Ownership', 'References', 'Structs', 'Enums'] },
    medium: { concepts: ['Traits', 'Lifetimes', 'Generics', 'Error Handling', 'Collections', 'Pattern Matching'] },
    hard: { concepts: ['Unsafe Code', 'Macros', 'Concurrency', 'Smart Pointers', 'FFI', 'Async/Await'] }
  })
}

function generateNodeJSExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Node.js', 'javascript', difficulty, {
    easy: { concepts: ['Modules', 'File System', 'HTTP Server', 'NPM', 'Event Loop', 'Callbacks'] },
    medium: { concepts: ['Express', 'Middleware', 'REST APIs', 'Database', 'Auth', 'Error Handling'] },
    hard: { concepts: ['Streams', 'Clustering', 'Microservices', 'WebSockets', 'GraphQL', 'Performance'] }
  })
}

function generateDockerExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Docker', 'dockerfile', difficulty, {
    easy: { concepts: ['Images', 'Containers', 'Dockerfile', 'docker run', 'docker build', 'Volumes'] },
    medium: { concepts: ['Docker Compose', 'Networks', 'Multi-stage Builds', 'Environment Variables', 'Health Checks', 'Logging'] },
    hard: { concepts: ['Swarm Mode', 'Registry', 'Security', 'Optimization', 'CI/CD Integration', 'Production Best Practices'] }
  })
}

function generateKubernetesExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Kubernetes', 'yaml', difficulty, {
    easy: { concepts: ['Pods', 'Services', 'Deployments', 'kubectl', 'ConfigMaps', 'Secrets'] },
    medium: { concepts: ['StatefulSets', 'DaemonSets', 'Ingress', 'Persistent Volumes', 'RBAC', 'Namespaces'] },
    hard: { concepts: ['Custom Resources', 'Operators', 'Service Mesh', 'Auto-scaling', 'Multi-cluster', 'GitOps'] }
  })
}

function generateAWSExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('AWS', 'javascript', difficulty, {
    easy: { concepts: ['EC2', 'S3', 'IAM', 'Lambda', 'CloudWatch', 'RDS'] },
    medium: { concepts: ['VPC', 'Load Balancers', 'Auto Scaling', 'DynamoDB', 'API Gateway', 'CloudFormation'] },
    hard: { concepts: ['ECS/EKS', 'Step Functions', 'EventBridge', 'CDK', 'Well-Architected', 'Cost Optimization'] }
  })
}

function generateSolidityExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Solidity', 'solidity', difficulty, {
    easy: { concepts: ['Contract', 'Variables', 'Functions', 'Modifiers', 'Events', 'Mapping'] },
    medium: { concepts: ['Inheritance', 'Interfaces', 'Libraries', 'Error Handling', 'Gas Optimization', 'SafeMath'] },
    hard: { concepts: ['Proxy Patterns', 'Security', 'Assembly', 'ERC Standards', 'Testing', 'Auditing'] }
  })
}

// Template generator for structured exercises
function generateLanguageTemplate(
  langName: string,
  syntax: string,
  difficulty: 'easy' | 'medium' | 'hard',
  concepts: any
): SandboxExercise[] {
  const diffLevel = difficulty === 'easy' ? 'easy' : difficulty === 'medium' ? 'medium' : 'hard'
  const topicList = concepts[diffLevel].concepts
  
  return topicList.map((concept: string, index: number) => ({
    id: difficulty === 'easy' ? String(index + 1) : difficulty === 'medium' ? `m${index + 1}` : `h${index + 1}`,
    title: `${concept} in ${langName}`,
    description: `Learn ${concept} concept in ${langName}.`,
    instructions: `Implement ${concept} using ${langName} syntax`,
    starterCode: `// ${concept} exercise\n// Write your ${langName} code here`,
    solution: `// ${langName} ${concept} implementation\n// Complete solution here`,
    hint: `Research ${concept} in ${langName} documentation`,
    expectedOutput: `${concept} working correctly`
  }))
}

// ============================================
// ADDITIONAL LANGUAGE GENERATORS
// ============================================

function generateTypeScriptExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('TypeScript', 'typescript', difficulty, {
    easy: { concepts: ['Type Annotations', 'Interfaces', 'Functions', 'Arrays', 'Enums', 'Type Inference'] },
    medium: { concepts: ['Generics', 'Union Types', 'Type Guards', 'Advanced Types', 'Decorators', 'Modules'] },
    hard: { concepts: ['Conditional Types', 'Mapped Types', 'Template Literal Types', 'Utility Types', 'Declaration Merging', 'Compiler API'] }
  })
}

function generateVueExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Vue', 'javascript', difficulty, {
    easy: { concepts: ['Components', 'Templates', 'Data Binding', 'v-if/v-for', 'Events', 'Props'] },
    medium: { concepts: ['Computed Properties', 'Watchers', 'Slots', 'Vuex', 'Vue Router', 'Lifecycle Hooks'] },
    hard: { concepts: ['Composition API', 'Provide/Inject', 'Custom Directives', 'Render Functions', 'SSR', 'Plugin Development'] }
  })
}

function generatePandasExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Pandas', 'python', difficulty, {
    easy: { concepts: ['DataFrames', 'Series', 'Reading Data', 'Filtering', 'Basic Operations', 'Column Selection'] },
    medium: { concepts: ['GroupBy', 'Merge/Join', 'Pivot Tables', 'Time Series', 'Missing Data', 'Apply Functions'] },
    hard: { concepts: ['Multi-indexing', 'Performance Optimization', 'Custom Aggregations', 'Window Functions', 'Memory Management', 'Big Data Integration'] }
  })
}

function generateTensorFlowExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('TensorFlow', 'python', difficulty, {
    easy: { concepts: ['Tensors', 'Variables', 'Operations', 'Linear Regression', 'Basic Neural Network', 'Training Loop'] },
    medium: { concepts: ['CNN', 'RNN', 'Keras API', 'Custom Layers', 'Callbacks', 'Model Evaluation'] },
    hard: { concepts: ['GAN', 'Transfer Learning', 'Custom Training Loops', 'TensorFlow Serving', 'Model Optimization', 'Distributed Training'] }
  })
}

function generatePyTorchExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('PyTorch', 'python', difficulty, {
    easy: { concepts: ['Tensors', 'Autograd', 'Neural Networks', 'Loss Functions', 'Optimizers', 'Data Loaders'] },
    medium: { concepts: ['CNN', 'RNN/LSTM', 'Custom Layers', 'Transfer Learning', 'Model Saving', 'GPU Training'] },
    hard: { concepts: ['Transformer Models', 'Custom Autograd', 'Distributed Training', 'Mixed Precision', 'TorchScript', 'Model Deployment'] }
  })
}

function generateScikitLearnExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Scikit-learn', 'python', difficulty, {
    easy: { concepts: ['Linear Regression', 'Classification', 'Train-Test Split', 'Metrics', 'Feature Scaling', 'Decision Trees'] },
    medium: { concepts: ['Random Forest', 'SVM', 'Cross Validation', 'Hyperparameter Tuning', 'Pipelines', 'Feature Engineering'] },
    hard: { concepts: ['Ensemble Methods', 'Custom Estimators', 'Model Selection', 'Dimensionality Reduction', 'Clustering', 'Anomaly Detection'] }
  })
}

function generateUnityExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Unity (C#)', 'csharp', difficulty, {
    easy: { concepts: ['GameObjects', 'Components', 'Transform', 'Input', 'Prefabs', 'Basic Physics'] },
    medium: { concepts: ['Animation', 'UI', 'Audio', 'Particle Systems', 'Coroutines', 'Scene Management'] },
    hard: { concepts: ['Scriptable Objects', 'Shaders', 'Custom Editor', 'Networking', 'Optimization', 'Build Pipeline'] }
  })
}

function generateUnrealExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Unreal Engine', 'cpp', difficulty, {
    easy: { concepts: ['Blueprints', 'Actors', 'Components', 'Materials', 'Input', 'Basic C++'] },
    medium: { concepts: ['Animation Blueprints', 'AI Behavior Trees', 'UMG UI', 'Niagara', 'Gameplay Framework', 'Networking Basics'] },
    hard: { concepts: ['Advanced C++', 'Custom Plugins', 'Rendering', 'Memory Management', 'Multiplayer', 'Performance Profiling'] }
  })
}

function generateGodotExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Godot', 'gdscript', difficulty, {
    easy: { concepts: ['Nodes', 'Scenes', 'Signals', 'Input', 'Physics2D', 'Basic GDScript'] },
    medium: { concepts: ['Animation', 'TileMap', 'UI', 'Particles', 'State Machines', 'Shaders'] },
    hard: { concepts: ['Custom Resources', 'Editor Plugins', '3D Graphics', 'Networking', 'C# Integration', 'Performance Optimization'] }
  })
}

function generateJSGamesExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('JavaScript Games', 'javascript', difficulty, {
    easy: { concepts: ['Canvas API', 'Game Loop', 'Sprites', 'Input Handling', 'Collision Detection', 'Score Tracking'] },
    medium: { concepts: ['Phaser.js', 'Animations', 'Physics', 'Audio', 'State Management', 'Level Design'] },
    hard: { concepts: ['WebGL', 'Three.js', 'Networking', 'Performance', 'Mobile Touch', 'Game AI'] }
  })
}

function generatePythonBackendExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Python (Backend)', 'python', difficulty, {
    easy: { concepts: ['Flask Routes', 'Django Views', 'URL Routing', 'Templates', 'Forms', 'Static Files'] },
    medium: { concepts: ['ORM', 'Authentication', 'REST APIs', 'Middleware', 'Database Migrations', 'File Uploads'] },
    hard: { concepts: ['GraphQL', 'Celery Tasks', 'WebSockets', 'Caching', 'Testing', 'Deployment'] }
  })
}

function generatePythonMLExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Python (ML)', 'python', difficulty, {
    easy: { concepts: ['NumPy Basics', 'Data Preprocessing', 'Simple Models', 'Visualization', 'Train-Test Split', 'Model Evaluation'] },
    medium: { concepts: ['Feature Engineering', 'Hyperparameter Tuning', 'Cross Validation', 'Ensemble Models', 'NLP Basics', 'Computer Vision'] },
    hard: { concepts: ['Deep Learning', 'Model Deployment', 'MLOps', 'AutoML', 'Explainability', 'Production ML'] }
  })
}

function generateRedisExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Redis', 'redis', difficulty, {
    easy: { concepts: ['SET/GET', 'Strings', 'Lists', 'Sets', 'Hashes', 'Expiration'] },
    medium: { concepts: ['Sorted Sets', 'Pub/Sub', 'Transactions', 'Pipelining', 'Lua Scripts', 'Streams'] },
    hard: { concepts: ['Cluster Mode', 'Replication', 'Persistence', 'Performance Tuning', 'RedisJSON', 'RedisSearch'] }
  })
}

function generateFirebaseExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Firebase', 'javascript', difficulty, {
    easy: { concepts: ['Firestore CRUD', 'Real-time Listeners', 'Authentication', 'Storage', 'Hosting', 'Security Rules'] },
    medium: { concepts: ['Cloud Functions', 'Queries', 'Transactions', 'FCM', 'Analytics', 'Remote Config'] },
    hard: { concepts: ['Advanced Security', 'Extensions', 'Performance Monitoring', 'App Distribution', 'Complex Queries', 'Emulators'] }
  })
}

function generateTerraformExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Terraform', 'hcl', difficulty, {
    easy: { concepts: ['Providers', 'Resources', 'Variables', 'Outputs', 'terraform init/plan/apply', 'State'] },
    medium: { concepts: ['Modules', 'Data Sources', 'Provisioners', 'Remote State', 'Workspaces', 'For Each'] },
    hard: { concepts: ['Custom Providers', 'Complex Modules', 'Testing', 'CI/CD Integration', 'Multi-cloud', 'Policy as Code'] }
  })
}

function generateGitHubActionsExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('GitHub Actions', 'yaml', difficulty, {
    easy: { concepts: ['Workflows', 'Jobs', 'Steps', 'Triggers', 'Checkout Action', 'Basic CI'] },
    medium: { concepts: ['Matrix Strategy', 'Artifacts', 'Caching', 'Secrets', 'Environments', 'Conditional Steps'] },
    hard: { concepts: ['Custom Actions', 'Reusable Workflows', 'Self-hosted Runners', 'Advanced Triggers', 'Deployment', 'Security Scanning'] }
  })
}

function generatePenTestingExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Penetration Testing', 'bash', difficulty, {
    easy: { concepts: ['Reconnaissance', 'Port Scanning', 'Service Enumeration', 'Basic Exploits', 'Report Writing', 'Ethics'] },
    medium: { concepts: ['Web App Testing', 'SQL Injection', 'XSS', 'Privilege Escalation', 'Metasploit', 'Burp Suite'] },
    hard: { concepts: ['Advanced Exploits', 'Exploit Development', 'Post-Exploitation', 'Red Team Ops', 'Evasion', 'Custom Tools'] }
  })
}

function generateNetworkSecurityExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Network Security', 'bash', difficulty, {
    easy: { concepts: ['OSI Model', 'Firewalls', 'VPNs', 'IDS/IPS', 'Network Protocols', 'Wireshark'] },
    medium: { concepts: ['VLAN Security', 'IPSec', 'SSL/TLS', 'Network Segmentation', 'Traffic Analysis', 'Honeypots'] },
    hard: { concepts: ['Advanced Threats', 'Zero Trust', 'SDN Security', 'Threat Hunting', 'Incident Response', 'Forensics'] }
  })
}

function generateCryptographyExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Cryptography', 'python', difficulty, {
    easy: { concepts: ['Symmetric Encryption', 'Asymmetric Encryption', 'Hashing', 'Digital Signatures', 'Basic Ciphers', 'Key Management'] },
    medium: { concepts: ['PKI', 'Certificate Management', 'Cryptographic Protocols', 'Random Number Generation', 'Side Channels', 'Crypto Libraries'] },
    hard: { concepts: ['Zero-Knowledge Proofs', 'Homomorphic Encryption', 'Quantum Cryptography', 'Crypto Analysis', 'Custom Protocols', 'HSMs'] }
  })
}

function generateSecurityToolsExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Security Tools', 'bash', difficulty, {
    easy: { concepts: ['Kali Linux', 'Nmap', 'Nikto', 'Hydra', 'John the Ripper', 'Basic Scripts'] },
    medium: { concepts: ['Metasploit Framework', 'Burp Suite Pro', 'OWASP ZAP', 'SQLMap', 'Aircrack-ng', 'Custom Tools'] },
    hard: { concepts: ['Tool Development', 'Exploit Frameworks', 'Automation', 'Custom Payloads', 'Evasion Tools', 'C2 Frameworks'] }
  })
}

function generateWeb3JSExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Web3.js', 'javascript', difficulty, {
    easy: { concepts: ['Connect Wallet', 'Read Blockchain', 'Send Transaction', 'Get Balance', 'Contract Basics', 'Events'] },
    medium: { concepts: ['Contract Interaction', 'ABI', 'Signing', 'Gas Estimation', 'Multiple Networks', 'Error Handling'] },
    hard: { concepts: ['DApp Architecture', 'Advanced Contracts', 'Transaction Management', 'Wallet Integration', 'Performance', 'Security Best Practices'] }
  })
}

function generateEthereumExercises(difficulty: 'easy' | 'medium' | 'hard'): SandboxExercise[] {
  return generateLanguageTemplate('Ethereum', 'solidity', difficulty, {
    easy: { concepts: ['Blockchain Basics', 'Accounts', 'Transactions', 'Gas', 'Ether', 'Simple Contracts'] },
    medium: { concepts: ['EVM', 'Token Standards', 'NFTs', 'DeFi Basics', 'Oracles', 'IPFS Integration'] },
    hard: { concepts: ['Layer 2', 'Scaling Solutions', 'MEV', 'Advanced DeFi', 'DAO', 'Security Auditing'] }
  })
}

