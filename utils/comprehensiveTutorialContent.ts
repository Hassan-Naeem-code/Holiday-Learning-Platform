// Clean, structured tutorial generator with rich per-technology sections

export interface TutorialSection {
  id: string
  title: string
  content: string
  syntax: string
  usage: string
  codeExample: string
}

export interface Tutorial {
  title: string
  description: string
  icon: string
  sections: TutorialSection[]
}

type LanguageType =
  | 'styling'
  | 'markup'
  | 'framework'
  | 'scripting'
  | 'backend'
  | 'database'
  | 'ml'
  | 'devops'
  | 'blockchain'
  | 'game'
  | 'security'
  | 'mobile'
  | 'general'

type SectionSpec = {
  title: string
  description: string
  syntax: string
  usage: string
  code: string
}

// Public API used across tutorial pages
export function generateComprehensiveTutorial(
  languageId: string,
  languageName: string,
  icon: string,
  description: string
): Tutorial {
  const type = detectLanguageType(languageId)
  const specs = getSpecsFor(languageId, type, languageName)
  const sections = buildSections(languageName, specs)

  return {
    title: `Master ${languageName}`,
    description: description || `Complete ${languageName} tutorial from basics to a mini project`,
    icon,
    sections,
  }
}

function detectLanguageType(languageId: string): LanguageType {
  const id = languageId.toLowerCase()
  if (/(css|tailwind)/.test(id)) return 'styling'
  if (/(html)/.test(id)) return 'markup'
  if (/(react-native|flutter|swift|kotlin)/.test(id)) return 'mobile'
  if (/(react|next|vue|angular)/.test(id)) return 'framework'
  if (/(javascript|typescript)/.test(id) && !/(nodejs|node|backend)/.test(id)) return 'scripting'
  if (/(unity|unreal|godot|game)/.test(id)) return 'game'
  if (/(nodejs|python-backend|java-backend|go-backend|rust-backend|php|ruby|rails|^java$|^go$|rust)/.test(id)) return 'backend'
  if (/(sql|postgres|postgresql|mongodb|redis|firebase|database)/.test(id)) return 'database'
  if (/(tensorflow|pytorch|scikit|sklearn|ai-ml|ml)/.test(id)) return 'ml'
  if (/(docker|kubernetes|terraform|aws|github-actions|devops)/.test(id)) return 'devops'
  if (/(solidity|web3|ethereum|blockchain)/.test(id)) return 'blockchain'
  if (/(penetration|network-security|cryptography|security)/.test(id)) return 'security'
  if (/(python|^r$|pandas)/.test(id)) return 'scripting'
  return 'general'
}

function buildSections(languageName: string, specs: SectionSpec[]): TutorialSection[] {
  return specs.map((spec, index) => {
    const id = String(index + 1)
    const isIntro = index === 0
    const content = isIntro
      ? introContent(languageName, spec)
      : sectionContent(languageName, spec)

    return {
      id,
      title: spec.title,
      content,
      syntax: spec.syntax,
      usage: spec.usage,
      codeExample: spec.code,
    }
  })
}

function introContent(languageName: string, spec: SectionSpec): string {
  return `# Welcome to ${languageName}\n\n## What is ${languageName}?\n${spec.description}\n\n## Why Learn ${languageName}?\n- Build real apps with modern patterns\n- Improve performance, accessibility, and DX\n- Stand out with production-ready skills\n\n## How This Tutorial Works\n- Start with foundations, then move to intermediate and advanced topics\n- Each lesson includes best practices, pitfalls, and a small exercise\n- Finish with a mini project to solidify concepts\n\n## Outcomes\n- Confidence to ship ${languageName} apps\n- Ability to debug, profile, and harden features\n- Reusable patterns for teams and production\n\n## Getting Ready\n- Install the tooling and clone a starter\n- Keep docs and devtools open while you practice\n- Commit progress after each milestone\n`
}

function sectionContent(languageName: string, spec: SectionSpec): string {
  // Show the actual educational content from the spec description
  // Remove generic redundant templates
  return `# ${spec.title}\n\n${spec.description}\n\n## Syntax\n\`\`\`\n${spec.syntax}\n\`\`\`\n\n## Example\n\`\`\`\n${spec.code}\n\`\`\`\n\n## Usage\n${spec.usage}`
}

function getSpecsFor(languageId: string, type: LanguageType, languageName: string): SectionSpec[] {
  const id = languageId.toLowerCase()
  switch (type) {
    case 'styling':
      return stylingSpecs(languageName)
    case 'markup':
      return htmlSpecs()
    case 'framework':
      if (id.includes('next')) return nextSpecs(languageName)
      if (id.includes('vue')) return vueSpecs(languageName)
      if (id.includes('react') && !id.includes('native')) return reactSpecs(languageName)
      if (id.includes('angular')) return angularSpecs(languageName)
      return frameworkSpecs(languageName)
    case 'scripting':
      if (id.includes('python')) return pythonSpecs(languageName)
      return scriptingSpecs(languageName)
    case 'backend':
      if (id.includes('node')) return nodeBackendSpecs(languageName)
      if (id.includes('java')) return javaBackendSpecs(languageName)
      if (id.includes('go')) return goBackendSpecs(languageName)
      if (id.includes('rust')) return rustBackendSpecs(languageName)
      if (id.includes('php')) return phpBackendSpecs(languageName)
      if (id.includes('ruby') || id.includes('rails')) return rubyBackendSpecs(languageName)
      return backendSpecs(languageName)
    case 'database':
      return databaseSpecs(languageName)
    case 'ml':
      return mlSpecs(languageName)
    case 'devops':
      return devopsSpecs(languageName)
    case 'blockchain':
      return blockchainSpecs(languageName)
    case 'game':
      return gameSpecs(languageName)
    case 'security':
      return securitySpecs(languageName)
    case 'mobile':
      if (id.includes('react-native') || id.includes('reactnative')) return reactNativeSpecs(languageName)
      if (id.includes('flutter')) return flutterSpecs(languageName)
      if (id.includes('swift')) return swiftSpecs(languageName)
      if (id.includes('kotlin')) return kotlinSpecs(languageName)
      return reactNativeSpecs(languageName)
    default:
      return generalSpecs(languageName)
  }
}

// Styling (CSS/Tailwind)
function stylingSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} controls layout, color, and motion for the web. Learn responsive, accessible styling with tokens, utilities, and components.`, syntax: 'Selectors, properties, values', usage: 'Style and layout web pages', code: 'body { font-family: system-ui; margin: 0; }' },
    { title: 'Selectors and Specificity', description: 'Combine element, class, id, attribute, and state selectors with predictable specificity.', syntax: 'element | .class | #id | [attr]', usage: 'Target elements safely', code: '.card[data-active="true"] { border-color: #2563eb; }' },
    { title: 'Box Model and Spacing', description: 'Master content, padding, border, and margin. Normalize with box-sizing.', syntax: 'box-sizing, margin, padding, border', usage: 'Control layout blocks', code: '* { box-sizing: border-box; }' },
    { title: 'Flexbox', description: 'One-dimensional layout for toolbars, cards, nav bars, and split panes.', syntax: 'display: flex; gap; justify-content; align-items', usage: 'Align items', code: '.toolbar { display: flex; gap: 12px; }' },
    { title: 'Grid', description: 'Two-dimensional layout for dashboards, galleries, and complex pages.', syntax: 'display: grid; grid-template-areas', usage: 'Compose pages', code: '.dashboard { display: grid; grid-template-columns: 240px 1fr; }' },
    { title: 'Typography and Color', description: 'Set font stacks, sizes, weights, and accessible contrast.', syntax: 'font-family, font-size, color', usage: 'Readable text', code: 'h1 { font-size: 2.25rem; color: #0f172a; }' },
    { title: 'Sizing and Units', description: 'Use rem for type, px for borders, % and clamp() for fluid layouts.', syntax: 'rem, px, %, clamp()', usage: 'Responsive sizing', code: '.hero { padding: clamp(24px, 5vw, 64px); }' },
    { title: 'Positioning and Z-Index', description: 'Place overlays, tooltips, and sticky headers safely.', syntax: 'position, z-index, stacking', usage: 'Layer UI', code: '.header { position: sticky; top: 0; z-index: 50; }' },
    { title: 'Responsive Design', description: 'Mobile-first breakpoints, container queries, and logical properties.', syntax: '@media (min-width: ...)', usage: 'Adapt layouts', code: '@media (min-width: 768px) { .card { display: grid; grid-template-columns: 1fr 1fr; } }' },
    { title: 'Pseudo Classes and Elements', description: 'Use :hover/:focus-visible and ::before/::after for interaction and decoration.', syntax: ':hover, :focus-visible, ::before', usage: 'Interactive polish', code: 'button::after { content: ""; position: absolute; inset: 0; }' },
    { title: 'Variables and Theming', description: 'Design tokens with custom properties for light/dark themes.', syntax: ':root { --primary: ... }', usage: 'Consistent theming', code: ':root { --primary: #2563eb; } .btn { background: var(--primary); }' },
    { title: 'Transitions and Animation', description: 'Smooth feedback with transitions and keyframes while respecting prefers-reduced-motion.', syntax: 'transition, @keyframes', usage: 'Motion design', code: '.btn { transition: transform 150ms ease; }' },
    { title: 'Effects and Glassmorphism', description: 'Layer depth with shadows, filters, and backdrops carefully.', syntax: 'box-shadow, filter, backdrop-filter', usage: 'Depth cues', code: '.glass { backdrop-filter: blur(12px); }' },
    { title: 'Forms and Inputs', description: 'Style inputs, labels, states, and errors accessibly.', syntax: 'input, label, focus-visible', usage: 'Usable forms', code: 'input:focus-visible { outline: 2px solid #2563eb; }' },
    { title: 'Components and Utilities', description: 'Build buttons, badges, alerts, and utility classes for speed.', syntax: 'component + utility classes', usage: 'Reusable UI', code: '.badge { display: inline-flex; gap: 6px; }' },
    { title: 'Architecture and Layers', description: 'Organize reset/base/components/utilities with cascade layers.', syntax: '@layer reset, base, components', usage: 'Maintainable CSS', code: '@layer base { body { content-visibility: auto; } }' },
    { title: 'Accessibility', description: 'Focus outlines, contrast, reduced motion, and readable spacing.', syntax: ':focus-visible, prefers-reduced-motion', usage: 'Inclusive UI', code: '@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms; } }' },
    { title: 'Debugging', description: 'Use devtools, overlays, and outline helpers to debug layout.', syntax: 'outline helpers', usage: 'Faster fixes', code: '* { outline: 1px dashed rgba(37,99,235,0.25); outline-offset: -1px; }' },
    { title: 'Performance', description: 'Minify CSS, remove unused rules, and use content-visibility.', syntax: 'purge, minify, content-visibility', usage: 'Ship fast', code: '/* purgecss --css styles.css --content index.html */' },

    // Advanced Selectors
    { title: 'Advanced Selectors', description: 'Modern CSS selectors like :is(), :where(), :has(), and :not() for powerful targeting.', syntax: ':is(.a, .b) :has(> img) :not(.excluded)', usage: 'Complex selections', code: 'article:has(> h2) { border-left: 4px solid var(--primary); }' },
    { title: 'Attribute Selectors', description: 'Target elements by attributes with exact, prefix, suffix, or substring matches.', syntax: '[attr^="value"], [attr$="value"], [attr*="value"]', usage: 'Dynamic targeting', code: 'a[href^="https"]::after { content: " ↗"; }' },
    { title: 'Combinators', description: 'Descendant, child (>), adjacent sibling (+), and general sibling (~) selectors.', syntax: 'parent > child, element + next, element ~ siblings', usage: 'Relational styling', code: '.header + main { margin-top: 80px; }' },

    // Display and Layout Fundamentals
    { title: 'Display Modes', description: 'Master block, inline, inline-block, flex, grid, and contents display values.', syntax: 'display: block | inline | flex | grid', usage: 'Control layout flow', code: '.inline-flex { display: inline-flex; align-items: center; }' },
    { title: 'Floats and Clearing', description: 'Legacy float layouts and clearfix techniques (now replaced by Flexbox/Grid).', syntax: 'float: left | right; clear: both', usage: 'Legacy layout', code: '.clearfix::after { content: ""; display: table; clear: both; }' },
    { title: 'Overflow and Clipping', description: 'Control content overflow with hidden, scroll, auto, and clip properties.', syntax: 'overflow: hidden | scroll | auto', usage: 'Manage content bounds', code: '.scrollable { overflow-y: auto; max-height: 400px; }' },

    // Advanced Transforms and Effects
    { title: 'Transform Functions', description: 'Rotate, scale, translate, and skew elements in 2D and 3D space.', syntax: 'transform: rotate() scale() translate()', usage: '3D transforms', code: '.card:hover { transform: rotateY(5deg) scale(1.05); }' },
    { title: 'Transform Origin', description: 'Set the pivot point for transforms to control rotation and scaling centers.', syntax: 'transform-origin: x y', usage: 'Custom pivots', code: '.flip { transform-origin: left center; transform: rotateY(180deg); }' },
    { title: 'Perspective', description: 'Add depth to 3D transforms with perspective and perspective-origin.', syntax: 'perspective: 1000px', usage: '3D depth effect', code: '.scene { perspective: 1000px; } .card { transform: rotateX(15deg); }' },

    // Advanced Grid
    { title: 'Grid Advanced', description: 'Named grid lines, auto-fit, auto-fill, and minmax() for responsive grids.', syntax: 'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))', usage: 'Auto-responsive grids', code: '.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }' },
    { title: 'Grid Areas', description: 'Name grid areas for semantic, readable layouts with grid-template-areas.', syntax: 'grid-template-areas: "header header" "sidebar main"', usage: 'Semantic layouts', code: '.layout { display: grid; grid-template-areas: "header header" "nav main" "footer footer"; }' },
    { title: 'Grid Subgrid', description: 'Align nested grid items with parent grid tracks using subgrid.', syntax: 'grid-template-columns: subgrid', usage: 'Nested grid alignment', code: '.card { display: grid; grid-template-columns: subgrid; }' },

    // Advanced Flexbox
    { title: 'Flexbox Advanced', description: 'Master flex-grow, flex-shrink, flex-basis, and the flex shorthand.', syntax: 'flex: grow shrink basis', usage: 'Flexible sizing', code: '.sidebar { flex: 0 0 240px; } .main { flex: 1 1 0; }' },
    { title: 'Flex Order', description: 'Reorder flex items visually without changing HTML order using the order property.', syntax: 'order: -1 | 0 | 1', usage: 'Visual reordering', code: '.featured { order: -1; }' },
    { title: 'Flex Wrap', description: 'Control multi-line flex layouts with flex-wrap and align-content.', syntax: 'flex-wrap: wrap; align-content: space-between', usage: 'Multi-row flex', code: '.tags { display: flex; flex-wrap: wrap; gap: 8px; }' },

    // Visual Effects
    { title: 'CSS Shapes', description: 'Create non-rectangular layouts with shape-outside and clip-path.', syntax: 'clip-path: polygon() | circle() | ellipse()', usage: 'Custom shapes', code: '.avatar { clip-path: circle(50%); }' },
    { title: 'Background Advanced', description: 'Multiple backgrounds, gradients, blend modes, and background-clip.', syntax: 'background: linear-gradient(), url()', usage: 'Rich backgrounds', code: '.hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }' },
    { title: 'Gradients', description: 'Linear, radial, and conic gradients with color stops and repeating patterns.', syntax: 'linear-gradient() | radial-gradient() | conic-gradient()', usage: 'Color transitions', code: '.progress { background: conic-gradient(#2563eb 0% 75%, #e5e7eb 75% 100%); }' },
    { title: 'Blend Modes', description: 'Mix colors and images with mix-blend-mode and background-blend-mode.', syntax: 'mix-blend-mode: multiply | screen | overlay', usage: 'Image blending', code: '.overlay { mix-blend-mode: multiply; }' },

    // Borders and Outlines
    { title: 'Borders Advanced', description: 'Border images, radius variations, and individual border properties.', syntax: 'border-image, border-radius', usage: 'Custom borders', code: '.card { border-radius: 12px 12px 0 0; border-top: 3px solid var(--accent); }' },
    { title: 'Outlines and Focus', description: 'Custom focus indicators with outline, outline-offset, and focus-visible.', syntax: 'outline: 2px solid; outline-offset: 2px', usage: 'Accessible focus', code: 'button:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }' },

    // Lists, Tables, and Content
    { title: 'Lists and Counters', description: 'Style lists and create custom counters with counter-increment and counter-reset.', syntax: 'list-style, counter-increment', usage: 'Custom numbering', code: 'ol { counter-reset: item; } li::before { counter-increment: item; content: counter(item) ". "; }' },
    { title: 'Table Styling', description: 'Style tables with border-collapse, striped rows, and responsive patterns.', syntax: 'border-collapse, :nth-child(even)', usage: 'Data tables', code: 'tr:nth-child(even) { background: #f8fafc; }' },

    // Modern CSS Features
    { title: 'CSS Filters', description: 'Apply visual effects with blur, brightness, contrast, grayscale, and more.', syntax: 'filter: blur() brightness() contrast()', usage: 'Image effects', code: '.hero-img { filter: brightness(0.8) contrast(1.2); }' },
    { title: 'Aspect Ratio', description: 'Maintain aspect ratios with aspect-ratio and object-fit for images/video.', syntax: 'aspect-ratio: 16 / 9; object-fit: cover', usage: 'Responsive media', code: '.thumbnail { aspect-ratio: 4 / 3; object-fit: cover; }' },
    { title: 'Scroll Behavior', description: 'Smooth scrolling and scroll-snap for carousels and sections.', syntax: 'scroll-behavior: smooth; scroll-snap-type', usage: 'Scroll UX', code: 'html { scroll-behavior: smooth; } .carousel { scroll-snap-type: x mandatory; }' },
    { title: 'CSS Containment', description: 'Optimize rendering with contain and content-visibility properties.', syntax: 'contain: layout style paint', usage: 'Performance boost', code: '.section { content-visibility: auto; contain-intrinsic-size: 0 500px; }' },
    { title: 'Container Queries', description: 'Responsive components based on container size, not viewport.', syntax: '@container (min-width: 400px)', usage: 'Component responsive', code: '@container (min-width: 400px) { .card { grid-template-columns: 1fr 1fr; } }' },

    // Logical Properties and i18n
    { title: 'Logical Properties', description: 'Internationalization-friendly properties: inline-start, block-end, etc.', syntax: 'margin-inline-start, padding-block', usage: 'i18n layouts', code: '.card { padding-inline: 24px; margin-block-end: 16px; }' },
    { title: 'Writing Modes', description: 'Support vertical text and RTL languages with writing-mode and direction.', syntax: 'writing-mode: vertical-rl; direction: rtl', usage: 'Global text flow', code: '.vertical { writing-mode: vertical-rl; }' },

    // Print and Media
    { title: 'Print Styles', description: 'Optimize for print with @page, page-break, and print-specific styles.', syntax: '@media print { ... }', usage: 'Printer-friendly', code: '@media print { .no-print { display: none; } a::after { content: " (" attr(href) ")"; } }' },
    { title: 'Media Queries Advanced', description: 'Level 4 media queries: prefers-color-scheme, prefers-reduced-data, hover.', syntax: '@media (prefers-color-scheme: dark)', usage: 'User preferences', code: '@media (prefers-color-scheme: dark) { :root { --bg: #0f172a; --text: #f1f5f9; } }' },
    { title: 'Feature Queries', description: 'Progressive enhancement with @supports to detect CSS feature support.', syntax: '@supports (display: grid) { ... }', usage: 'Feature detection', code: '@supports (backdrop-filter: blur(10px)) { .glass { backdrop-filter: blur(10px); } }' },

    // CSS Functions
    { title: 'CSS Functions', description: 'Math functions: calc(), min(), max(), clamp() for responsive values.', syntax: 'clamp(min, preferred, max)', usage: 'Fluid sizing', code: '.container { width: clamp(320px, 90vw, 1200px); padding: clamp(16px, 4vw, 48px); }' },
    { title: 'Color Functions', description: 'Modern color spaces: rgb(), hsl(), hwb(), lab(), lch(), and color-mix().', syntax: 'hsl(220 100% 50%), color-mix()', usage: 'Advanced colors', code: '.primary { background: hsl(220 100% 50% / 0.9); }' },

    // Text and Typography Advanced
    { title: 'Text Effects', description: 'Text shadows, gradients, stroke, and multi-column layouts.', syntax: 'text-shadow, -webkit-text-stroke, columns', usage: 'Typography polish', code: '.heading { background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }' },
    { title: 'Font Loading', description: 'Control font loading with font-display and @font-face optimization.', syntax: '@font-face { font-display: swap; }', usage: 'Performance fonts', code: '@font-face { font-family: "Custom"; src: url("font.woff2"); font-display: swap; }' },

    // Responsive Images
    { title: 'Responsive Images', description: 'CSS techniques for responsive images: object-fit, aspect-ratio, and art direction.', syntax: 'object-fit: cover; aspect-ratio', usage: 'Adaptive images', code: '.hero-img { width: 100%; height: 400px; object-fit: cover; object-position: center; }' },

    // Preprocessors and Tooling
    { title: 'CSS Preprocessors', description: 'Overview of Sass, Less, PostCSS for variables, nesting, and mixins.', syntax: 'Sass: $var, @mixin, @include', usage: 'Enhanced CSS', code: '// Sass example\n$primary: #2563eb;\n.btn { background: $primary; &:hover { background: darken($primary, 10%); } }' },
    { title: 'Modern CSS 2024', description: 'Latest features: :has(), @layer, container queries, subgrid, and cascade layers.', syntax: ':has(), @layer, @container', usage: 'Cutting-edge CSS', code: '@layer reset, base, components, utilities;\n.parent:has(> .highlight) { border: 2px solid gold; }' },

    // Projects
    { title: 'Responsive Dashboard', description: 'Build a complete responsive dashboard with sidebar, header, cards, charts, and dark mode.', syntax: 'Grid + Flex + Variables', usage: 'Real-world project', code: '.dashboard { display: grid; grid-template: "header header" 60px "sidebar main" 1fr / 240px 1fr; gap: 20px; }' },
    { title: 'Next Steps', description: 'Continue learning: CSS animations, SVG styling, CSS Houdini, design systems, and Tailwind CSS.', syntax: 'Further resources', usage: 'Keep growing', code: '/* Explore: Framer Motion, Tailwind, CSS-in-JS, Design Tokens */' },
    { title: 'Mini Project', description: 'Build a responsive landing page with hero, features, pricing, and CTA.', syntax: 'layout + components', usage: 'Apply everything', code: '.layout { max-width: 960px; margin: 0 auto; }' },
  ]
}

// HTML - Comprehensive 40+ lesson curriculum
function htmlSpecs(): SectionSpec[] {
  return [
    {
      title: 'HTML HOME',
      description: 'HTML (HyperText Markup Language) is the foundation of the web. It structures content with semantic elements, enabling browsers to display text, images, links, forms, and multimedia. Learn to build accessible, SEO-friendly web pages from scratch.',
      syntax: '<!DOCTYPE html>, <html>, <head>, <body>',
      usage: 'Structure web pages and applications',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Welcome to HTML!</h1>\n  <p>HTML is the backbone of the web.</p>\n</body>\n</html>'
    },
    {
      title: 'Introduction to HTML',
      description: 'HTML uses tags to mark up content. Tags come in pairs (opening and closing) or are self-closing. Elements are the building blocks: tags + content. Attributes provide additional information.',
      syntax: '<tagname attribute="value">content</tagname>',
      usage: 'Understand HTML structure',
      code: '<!-- This is a comment -->\n<p class="intro">This is a paragraph.</p>\n<img src="logo.png" alt="Company Logo" />\n<a href="https://example.com" target="_blank">Visit Example</a>\n\n<!-- Nesting elements -->\n<div>\n  <h2>Section Title</h2>\n  <p>Content inside a div</p>\n</div>'
    },
    {
      title: 'Document Structure',
      description: 'Every HTML document has a DOCTYPE declaration, html root element, head for metadata, and body for visible content. The head contains title, meta tags, links to stylesheets, and scripts.',
      syntax: '<!DOCTYPE>, <html>, <head>, <body>',
      usage: 'Create valid HTML documents',
      code: '<!DOCTYPE html> <!-- HTML5 declaration -->\n<html lang="en">\n<head>\n  <!-- Character encoding -->\n  <meta charset="UTF-8">\n  \n  <!-- Viewport for responsive design -->\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  \n  <!-- Page title (appears in browser tab) -->\n  <title>Page Title</title>\n  \n  <!-- Link to CSS -->\n  <link rel="stylesheet" href="styles.css">\n  \n  <!-- Favicon -->\n  <link rel="icon" href="favicon.ico">\n</head>\n<body>\n  <!-- Visible content goes here -->\n  <h1>Hello World</h1>\n  \n  <!-- Scripts at the end for performance -->\n  <script src="app.js" defer></script>\n</body>\n</html>'
    },
    {
      title: 'Headings and Paragraphs',
      description: 'Headings (h1-h6) create hierarchy. h1 is the main heading (one per page for SEO). Paragraphs use <p> tags. Use headings in order without skipping levels for accessibility.',
      syntax: '<h1> to <h6>, <p>',
      usage: 'Structure text content',
      code: '<h1>Main Page Title</h1>\n<p>This is the introduction paragraph.</p>\n\n<h2>Section 1</h2>\n<p>Content for section 1.</p>\n\n<h3>Subsection 1.1</h3>\n<p>More detailed content.</p>\n\n<h2>Section 2</h2>\n<p>Content for section 2.</p>\n\n<!-- CORRECT hierarchy -->\n<h1>Title</h1>\n  <h2>Subtitle</h2>\n    <h3>Sub-subtitle</h3>\n\n<!-- WRONG: Don\'t skip levels -->\n<h1>Title</h1>\n  <h4>Wrong! Skipped h2 and h3</h4>'
    },
    {
      title: 'Text Formatting',
      description: 'Format text with semantic tags like strong (important/bold), em (emphasis/italic), mark (highlighted), small, sub, sup. Avoid non-semantic tags like <b> and <i> when meaning matters.',
      syntax: '<strong>, <em>, <mark>, <code>, <kbd>',
      usage: 'Format and emphasize text',
      code: '<p>This is <strong>very important</strong> text.</p>\n<p>This text is <em>emphasized</em> for stress.</p>\n<p>This is <mark>highlighted</mark> text.</p>\n<p>Technical term: <code>console.log()</code></p>\n<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>\n\n<!-- Mathematical notation -->\n<p>E = mc<sup>2</sup></p>\n<p>H<sub>2</sub>O is water.</p>\n\n<!-- Quotes -->\n<p>As Einstein said: <q>Imagination is more important than knowledge.</q></p>\n\n<blockquote cite="https://example.com">\n  <p>Long quote in its own block.</p>\n  <footer>— Author Name</footer>\n</blockquote>\n\n<!-- Abbreviations -->\n<p>The <abbr title="World Wide Web">WWW</abbr> was invented in 1989.</p>'
    },
    {
      title: 'Lists',
      description: 'Unordered lists (<ul>) for bullet points, ordered lists (<ol>) for numbered items, and description lists (<dl>) for term-definition pairs. Lists can be nested.',
      syntax: '<ul>, <ol>, <li>, <dl>, <dt>, <dd>',
      usage: 'Organize content in lists',
      code: '<!-- Unordered list -->\n<ul>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ul>\n\n<!-- Ordered list -->\n<ol>\n  <li>Step one</li>\n  <li>Step two</li>\n  <li>Step three</li>\n</ol>\n\n<!-- Nested lists -->\n<ul>\n  <li>Fruits\n    <ul>\n      <li>Apple</li>\n      <li>Banana</li>\n    </ul>\n  </li>\n  <li>Vegetables\n    <ul>\n      <li>Carrot</li>\n      <li>Broccoli</li>\n    </ul>\n  </li>\n</ul>\n\n<!-- Description list -->\n<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language</dd>\n  \n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets</dd>\n  \n  <dt>JS</dt>\n  <dd>JavaScript</dd>\n</dl>\n\n<!-- Ordered list with custom start -->\n<ol start="5">\n  <li>Fifth item</li>\n  <li>Sixth item</li>\n</ol>'
    },
    {
      title: 'Links and Anchors',
      description: 'Links (<a>) navigate between pages or sections. Use href for destination, target for new tabs, and rel for security. Anchor links jump to page sections using id attributes.',
      syntax: '<a href="url">text</a>',
      usage: 'Create navigation and links',
      code: '<!-- External link -->\n<a href="https://example.com">Visit Example</a>\n\n<!-- Open in new tab (security best practice) -->\n<a href="https://example.com" target="_blank" rel="noopener noreferrer">External Site</a>\n\n<!-- Email link -->\n<a href="mailto:hello@example.com">Email Us</a>\n\n<!-- Phone link -->\n<a href="tel:+1234567890">Call Us</a>\n\n<!-- Download link -->\n<a href="document.pdf" download>Download PDF</a>\n\n<!-- Anchor link (same page) -->\n<a href="#section2">Jump to Section 2</a>\n\n<!-- Target section -->\n<section id="section2">\n  <h2>Section 2</h2>\n  <p>Content here</p>\n</section>\n\n<!-- Back to top link -->\n<a href="#top">Back to Top</a>\n\n<!-- Relative links -->\n<a href="./about.html">About Page</a>\n<a href="../index.html">Home</a>'
    },
    {
      title: 'Images',
      description: 'The <img> tag embeds images. Always include alt text for accessibility and SEO. Use width/height to prevent layout shift. Support modern formats like WebP with fallbacks.',
      syntax: '<img src="path" alt="description">',
      usage: 'Display images',
      code: '<!-- Basic image -->\n<img src="photo.jpg" alt="Sunset over mountains">\n\n<!-- With dimensions (prevents layout shift) -->\n<img src="logo.png" alt="Company Logo" width="200" height="100">\n\n<!-- Responsive image -->\n<img src="hero.jpg" alt="Hero image" style="max-width: 100%; height: auto;">\n\n<!-- Lazy loading (performance) -->\n<img src="large-image.jpg" alt="Large image" loading="lazy">\n\n<!-- Picture element for responsive images -->\n<picture>\n  <source srcset="image.webp" type="image/webp">\n  <source srcset="image.jpg" type="image/jpeg">\n  <img src="image.jpg" alt="Fallback image">\n</picture>\n\n<!-- Responsive images with srcset -->\n<img \n  srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w"\n  sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 2000px"\n  src="medium.jpg"\n  alt="Responsive image"\n>\n\n<!-- Figure with caption -->\n<figure>\n  <img src="chart.png" alt="Sales chart showing 20% growth">\n  <figcaption>Figure 1: Q4 Sales Growth</figcaption>\n</figure>'
    },
    {
      title: 'Audio and Video',
      description: 'Embed multimedia with <audio> and <video> tags. Include controls, multiple source formats for browser compatibility, and captions/subtitles for accessibility.',
      syntax: '<video>, <audio>, <source>',
      usage: 'Embed media files',
      code: '<!-- Video with controls -->\n<video controls width="640" height="360">\n  <source src="video.mp4" type="video/mp4">\n  <source src="video.webm" type="video/webm">\n  <p>Your browser doesn\'t support HTML5 video. <a href="video.mp4">Download video</a></p>\n</video>\n\n<!-- Video with poster and autoplay -->\n<video controls poster="thumbnail.jpg" preload="metadata">\n  <source src="movie.mp4" type="video/mp4">\n  <track src="subtitles-en.vtt" kind="subtitles" srclang="en" label="English">\n  <track src="subtitles-es.vtt" kind="subtitles" srclang="es" label="Spanish">\n</video>\n\n<!-- Audio player -->\n<audio controls>\n  <source src="podcast.mp3" type="audio/mpeg">\n  <source src="podcast.ogg" type="audio/ogg">\n  <p>Your browser doesn\'t support HTML5 audio.</p>\n</audio>\n\n<!-- Looping background audio -->\n<audio autoplay loop muted>\n  <source src="background.mp3" type="audio/mpeg">\n</audio>\n\n<!-- YouTube embed (iframe) -->\n<iframe \n  width="560" \n  height="315" \n  src="https://www.youtube.com/embed/VIDEO_ID" \n  frameborder="0" \n  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" \n  allowfullscreen\n></iframe>'
    },
    {
      title: 'Tables',
      description: 'Tables display tabular data with rows and columns. Use semantic elements like thead, tbody, tfoot, and scope attributes for accessibility. Never use tables for layout.',
      syntax: '<table>, <tr>, <th>, <td>, <thead>, <tbody>',
      usage: 'Display structured data',
      code: '<!-- Basic table -->\n<table>\n  <thead>\n    <tr>\n      <th scope="col">Name</th>\n      <th scope="col">Age</th>\n      <th scope="col">City</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>John Doe</td>\n      <td>28</td>\n      <td>New York</td>\n    </tr>\n    <tr>\n      <td>Jane Smith</td>\n      <td>34</td>\n      <td>London</td>\n    </tr>\n  </tbody>\n</table>\n\n<!-- Table with caption and footer -->\n<table>\n  <caption>Q4 Sales Report</caption>\n  <thead>\n    <tr>\n      <th scope="col">Product</th>\n      <th scope="col">Units Sold</th>\n      <th scope="col">Revenue</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Widget A</td>\n      <td>1,200</td>\n      <td>$24,000</td>\n    </tr>\n    <tr>\n      <td>Widget B</td>\n      <td>800</td>\n      <td>$16,000</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope="row">Total</th>\n      <td>2,000</td>\n      <td>$40,000</td>\n    </tr>\n  </tfoot>\n</table>\n\n<!-- Colspan and rowspan -->\n<table>\n  <tr>\n    <th colspan="2">Header spanning 2 columns</th>\n  </tr>\n  <tr>\n    <td rowspan="2">Cell spanning 2 rows</td>\n    <td>Cell 1</td>\n  </tr>\n  <tr>\n    <td>Cell 2</td>\n  </tr>\n</table>'
    },
    {
      title: 'Forms - Basics',
      description: 'Forms collect user input. The <form> element contains inputs, labels, and buttons. Always associate labels with inputs using for attribute or nesting for accessibility.',
      syntax: '<form>, <input>, <label>, <button>',
      usage: 'Create input forms',
      code: '<!-- Basic form -->\n<form action="/submit" method="POST">\n  <!-- Text input with label -->\n  <label for="username">Username:</label>\n  <input type="text" id="username" name="username" required>\n  \n  <!-- Email input -->\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required>\n  \n  <!-- Password input -->\n  <label for="password">Password:</label>\n  <input type="password" id="password" name="password" required>\n  \n  <!-- Submit button -->\n  <button type="submit">Sign Up</button>\n</form>\n\n<!-- Alternative label syntax (wrapping) -->\n<form>\n  <label>\n    Full Name:\n    <input type="text" name="fullname" required>\n  </label>\n  \n  <label>\n    Age:\n    <input type="number" name="age" min="18" max="120">\n  </label>\n  \n  <button type="submit">Submit</button>\n</form>\n\n<!-- Form with fieldset and legend -->\n<form>\n  <fieldset>\n    <legend>Personal Information</legend>\n    <label for="fname">First Name:</label>\n    <input type="text" id="fname" name="fname">\n    \n    <label for="lname">Last Name:</label>\n    <input type="text" id="lname" name="lname">\n  </fieldset>\n  \n  <button type="submit">Submit</button>\n</form>'
    },
    {
      title: 'Form Input Types',
      description: 'HTML5 provides many input types: text, email, password, number, date, color, range, and more. These provide built-in validation and mobile keyboard optimization.',
      syntax: '<input type="...">',
      usage: 'Collect different data types',
      code: '<!-- Text inputs -->\n<input type="text" placeholder="Enter text">\n<input type="email" placeholder="email@example.com">\n<input type="password" placeholder="Password">\n<input type="search" placeholder="Search...">\n<input type="url" placeholder="https://example.com">\n<input type="tel" placeholder="+1 (555) 123-4567">\n\n<!-- Number and range -->\n<input type="number" min="0" max="100" step="5" value="50">\n<input type="range" min="0" max="100" value="50">\n\n<!-- Date and time -->\n<input type="date">\n<input type="time">\n<input type="datetime-local">\n<input type="month">\n<input type="week">\n\n<!-- Color picker -->\n<input type="color" value="#3b82f6">\n\n<!-- File upload -->\n<input type="file" accept="image/*">\n<input type="file" multiple accept=".pdf,.doc,.docx">\n\n<!-- Checkboxes -->\n<label>\n  <input type="checkbox" name="subscribe" value="newsletter">\n  Subscribe to newsletter\n</label>\n\n<!-- Radio buttons -->\n<fieldset>\n  <legend>Choose size:</legend>\n  <label><input type="radio" name="size" value="small"> Small</label>\n  <label><input type="radio" name="size" value="medium" checked> Medium</label>\n  <label><input type="radio" name="size" value="large"> Large</label>\n</fieldset>\n\n<!-- Hidden input -->\n<input type="hidden" name="user_id" value="12345">'
    },
    {
      title: 'Form Elements - Textarea, Select, Button',
      description: 'Use textarea for multi-line text, select for dropdowns, and button for actions. Buttons can be submit, reset, or button type for custom JavaScript handlers.',
      syntax: '<textarea>, <select>, <button>',
      usage: 'Create advanced form controls',
      code: '<!-- Textarea for long text -->\n<label for="message">Message:</label>\n<textarea id="message" name="message" rows="5" cols="40" placeholder="Enter your message..."></textarea>\n\n<!-- Select dropdown -->\n<label for="country">Country:</label>\n<select id="country" name="country">\n  <option value="">Choose a country</option>\n  <option value="us">United States</option>\n  <option value="uk">United Kingdom</option>\n  <option value="ca">Canada</option>\n</select>\n\n<!-- Optgroup for grouped options -->\n<select name="car">\n  <optgroup label="German Cars">\n    <option value="mercedes">Mercedes</option>\n    <option value="audi">Audi</option>\n  </optgroup>\n  <optgroup label="Japanese Cars">\n    <option value="toyota">Toyota</option>\n    <option value="honda">Honda</option>\n  </optgroup>\n</select>\n\n<!-- Multiple select -->\n<select name="skills" multiple size="4">\n  <option value="html">HTML</option>\n  <option value="css">CSS</option>\n  <option value="js">JavaScript</option>\n  <option value="react">React</option>\n</select>\n\n<!-- Buttons -->\n<button type="submit">Submit Form</button>\n<button type="reset">Reset Form</button>\n<button type="button" onclick="alert(\'Clicked!\')">Click Me</button>\n\n<!-- Datalist for autocomplete -->\n<label for="browser">Choose browser:</label>\n<input list="browsers" id="browser" name="browser">\n<datalist id="browsers">\n  <option value="Chrome">\n  <option value="Firefox">\n  <option value="Safari">\n  <option value="Edge">\n</datalist>'
    },
    {
      title: 'Form Validation',
      description: 'HTML5 provides built-in validation with required, pattern, min, max, minlength, maxlength attributes. Custom validation messages enhance user experience.',
      syntax: 'required, pattern, min, max, title',
      usage: 'Validate user input',
      code: '<!-- Required field -->\n<form>\n  <label for="username">Username (required):</label>\n  <input type="text" id="username" name="username" required>\n  \n  <!-- Pattern validation (regex) -->\n  <label for="zip">ZIP Code (5 digits):</label>\n  <input \n    type="text" \n    id="zip" \n    name="zip" \n    pattern="[0-9]{5}" \n    title="Must be exactly 5 digits"\n    required\n  >\n  \n  <!-- Length validation -->\n  <label for="password">Password (8-20 chars):</label>\n  <input \n    type="password" \n    id="password" \n    name="password" \n    minlength="8" \n    maxlength="20" \n    required\n  >\n  \n  <!-- Number range -->\n  <label for="age">Age (18-100):</label>\n  <input type="number" id="age" name="age" min="18" max="100" required>\n  \n  <!-- Email validation -->\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required>\n  \n  <!-- Custom validation message with JavaScript -->\n  <label for="custom">Custom validation:</label>\n  <input type="text" id="custom" name="custom" required oninvalid="this.setCustomValidity(\'Please fill out this field\')" oninput="this.setCustomValidity(\'\')">\n  \n  <button type="submit">Submit</button>\n</form>\n\n<!-- Prevent default HTML5 validation -->\n<form novalidate>\n  <!-- Use JavaScript for custom validation -->\n</form>'
    },
    {
      title: 'Semantic HTML5 Elements',
      description: 'Semantic elements clearly describe their meaning: header, nav, main, article, section, aside, footer. Use these instead of generic divs for better SEO and accessibility.',
      syntax: '<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>',
      usage: 'Structure pages semantically',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Semantic Page</title>\n</head>\n<body>\n  <!-- Page header -->\n  <header>\n    <h1>Site Name</h1>\n    <nav>\n      <ul>\n        <li><a href="#home">Home</a></li>\n        <li><a href="#about">About</a></li>\n        <li><a href="#contact">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n  \n  <!-- Main content -->\n  <main>\n    <!-- Independent article -->\n    <article>\n      <header>\n        <h2>Article Title</h2>\n        <p>Posted on <time datetime="2025-01-15">January 15, 2025</time></p>\n      </header>\n      <p>Article content...</p>\n      <footer>\n        <p>Author: John Doe</p>\n      </footer>\n    </article>\n    \n    <!-- Section of content -->\n    <section>\n      <h2>About Us</h2>\n      <p>Section content...</p>\n    </section>\n  </main>\n  \n  <!-- Sidebar -->\n  <aside>\n    <h3>Related Links</h3>\n    <ul>\n      <li><a href="#">Link 1</a></li>\n      <li><a href="#">Link 2</a></li>\n    </ul>\n  </aside>\n  \n  <!-- Page footer -->\n  <footer>\n    <p>&copy; 2025 Company Name. All rights reserved.</p>\n  </footer>\n</body>\n</html>'
    },
    {
      title: 'Div and Span',
      description: 'Div is a block-level container for grouping content. Span is an inline container for styling text. Use semantic elements when available; use div/span only when no semantic alternative exists.',
      syntax: '<div>, <span>',
      usage: 'Generic containers',
      code: '<!-- Div for layout containers -->\n<div class="container">\n  <div class="row">\n    <div class="column">\n      <p>Content in column 1</p>\n    </div>\n    <div class="column">\n      <p>Content in column 2</p>\n    </div>\n  </div>\n</div>\n\n<!-- Span for inline styling -->\n<p>This is normal text, and <span style="color: red;">this is red text</span>.</p>\n\n<p>Price: <span class="currency">$</span><span class="amount">99.99</span></p>\n\n<!-- When to use div/span -->\n<!-- GOOD: No semantic alternative -->\n<div class="card">\n  <h3>Card Title</h3>\n  <p>Card content</p>\n</div>\n\n<!-- BAD: Use semantic elements instead -->\n<div class="header"> <!-- Use <header> -->\n<div class="navigation"> <!-- Use <nav> -->\n<div class="article"> <!-- Use <article> -->\n\n<!-- GOOD: Semantic elements -->\n<header>\n  <nav>\n    <article>'
    },
    {
      title: 'Meta Tags for SEO',
      description: 'Meta tags provide metadata about your HTML document. Critical for SEO: title, description, keywords, viewport, charset, and Open Graph tags for social media.',
      syntax: '<meta name="..." content="...">',
      usage: 'Optimize for search engines',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <!-- Character encoding -->\n  <meta charset="UTF-8">\n  \n  <!-- Viewport for responsive design -->\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  \n  <!-- Title (appears in search results) -->\n  <title>Your Page Title | Brand Name</title>\n  \n  <!-- Description (appears in search results) -->\n  <meta name="description" content="Comprehensive description of your page content. 150-160 characters optimal.">\n  \n  <!-- Keywords (less important now) -->\n  <meta name="keywords" content="html, seo, meta tags, tutorial">\n  \n  <!-- Author -->\n  <meta name="author" content="Your Name">\n  \n  <!-- Robots -->\n  <meta name="robots" content="index, follow">\n  \n  <!-- Canonical URL (prevent duplicate content) -->\n  <link rel="canonical" href="https://example.com/page">\n  \n  <!-- Open Graph for Facebook/LinkedIn -->\n  <meta property="og:title" content="Your Page Title">\n  <meta property="og:description" content="Page description">\n  <meta property="og:image" content="https://example.com/image.jpg">\n  <meta property="og:url" content="https://example.com/page">\n  <meta property="og:type" content="website">\n  \n  <!-- Twitter Card -->\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="Your Page Title">\n  <meta name="twitter:description" content="Page description">\n  <meta name="twitter:image" content="https://example.com/image.jpg">\n  \n  <!-- Favicon -->\n  <link rel="icon" type="image/png" href="/favicon.png">\n</head>\n<body>\n  <!-- Content -->\n</body>\n</html>'
    },
    {
      title: 'Accessibility - ARIA Attributes',
      description: 'ARIA (Accessible Rich Internet Applications) attributes improve accessibility for screen readers. Use aria-label, aria-labelledby, aria-describedby, role, and aria-hidden appropriately.',
      syntax: 'aria-label, role, aria-describedby',
      usage: 'Make pages accessible',
      code: '<!-- aria-label for elements without visible text -->\n<button aria-label="Close dialog">\n  <svg><!-- X icon --></svg>\n</button>\n\n<!-- aria-labelledby references another element -->\n<div role="dialog" aria-labelledby="dialog-title">\n  <h2 id="dialog-title">Confirm Action</h2>\n  <p>Are you sure?</p>\n</div>\n\n<!-- aria-describedby for additional description -->\n<input \n  type="password" \n  id="password" \n  aria-describedby="password-hint"\n>\n<span id="password-hint">Must be at least 8 characters</span>\n\n<!-- Landmark roles -->\n<header role="banner">\n<nav role="navigation">\n<main role="main">\n<aside role="complementary">\n<footer role="contentinfo">\n\n<!-- aria-hidden to hide decorative elements -->\n<span aria-hidden="true">★</span>\n\n<!-- aria-expanded for collapsible content -->\n<button aria-expanded="false" aria-controls="menu">\n  Menu\n</button>\n<ul id="menu" hidden>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n\n<!-- aria-live for dynamic content -->\n<div aria-live="polite" aria-atomic="true">\n  <!-- Screen reader announces changes here -->\n  <p>Loading complete!</p>\n</div>\n\n<!-- aria-current for current page in navigation -->\n<nav>\n  <a href="/" aria-current="page">Home</a>\n  <a href="/about">About</a>\n</nav>'
    },
    {
      title: 'Accessibility - Focus and Tab Navigation',
      description: 'Ensure keyboard users can navigate your site. Use tabindex, skip links, and focus indicators. All interactive elements should be keyboard accessible.',
      syntax: 'tabindex, accesskey',
      usage: 'Enable keyboard navigation',
      code: '<!-- Skip to main content link -->\n<a href="#main-content" class="skip-link">Skip to main content</a>\n\n<header>\n  <!-- Navigation -->\n</header>\n\n<main id="main-content" tabindex="-1">\n  <!-- Main content -->\n</main>\n\n<!-- Natural tab order (no tabindex needed) -->\n<form>\n  <input type="text"> <!-- Tab order: 1 -->\n  <input type="email"> <!-- Tab order: 2 -->\n  <button>Submit</button> <!-- Tab order: 3 -->\n</form>\n\n<!-- Custom tab order (avoid if possible) -->\n<button tabindex="3">Third</button>\n<button tabindex="1">First</button>\n<button tabindex="2">Second</button>\n\n<!-- Make non-interactive elements focusable -->\n<div tabindex="0" role="button" onclick="handleClick()" onkeypress="handleKeyPress(event)">\n  Custom button\n</div>\n\n<!-- Remove from tab order -->\n<button tabindex="-1">Not keyboard accessible</button>\n\n<!-- Access keys (use sparingly) -->\n<button accesskey="s">Submit (Alt+S)</button>\n\n<!-- Focus styles in CSS -->\n<style>\n  /* Visible focus indicator */\n  :focus-visible {\n    outline: 2px solid #2563eb;\n    outline-offset: 2px;\n  }\n  \n  /* Skip link visible on focus */\n  .skip-link {\n    position: absolute;\n    top: -40px;\n  }\n  .skip-link:focus {\n    top: 0;\n  }\n</style>'
    },
    {
      title: 'Embedding Content - iFrames',
      description: 'iFrames embed external content like videos, maps, or other websites. Use sandbox attribute for security. Set proper width/height or make responsive.',
      syntax: '<iframe src="url"></iframe>',
      usage: 'Embed external content',
      code: '<!-- Basic iframe -->\n<iframe src="https://example.com" width="800" height="600"></iframe>\n\n<!-- Responsive iframe (16:9 aspect ratio) -->\n<div style="position: relative; padding-bottom: 56.25%; height: 0;">\n  <iframe \n    src="https://example.com"\n    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"\n    frameborder="0"\n  ></iframe>\n</div>\n\n<!-- YouTube embed -->\n<iframe \n  width="560" \n  height="315" \n  src="https://www.youtube.com/embed/VIDEO_ID" \n  frameborder="0" \n  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" \n  allowfullscreen\n></iframe>\n\n<!-- Google Maps embed -->\n<iframe \n  src="https://www.google.com/maps/embed?pb=..." \n  width="600" \n  height="450" \n  style="border:0;" \n  allowfullscreen="" \n  loading="lazy"\n></iframe>\n\n<!-- Sandbox for security (restricts iframe capabilities) -->\n<iframe \n  src="https://untrusted.com" \n  sandbox="allow-scripts allow-same-origin"\n></iframe>\n\n<!-- Lazy loading -->\n<iframe src="https://example.com" loading="lazy"></iframe>'
    },
    {
      title: 'SVG - Scalable Vector Graphics',
      description: 'SVG creates scalable graphics with code. Perfect for icons, logos, charts. Can be inline or linked. Fully styleable with CSS.',
      syntax: '<svg>, <circle>, <rect>, <path>',
      usage: 'Create vector graphics',
      code: '<!-- Inline SVG circle -->\n<svg width="100" height="100">\n  <circle cx="50" cy="50" r="40" fill="#3b82f6" />\n</svg>\n\n<!-- Rectangle -->\n<svg width="200" height="100">\n  <rect width="200" height="100" fill="#ef4444" rx="10" />\n</svg>\n\n<!-- Path for complex shapes -->\n<svg width="100" height="100" viewBox="0 0 100 100">\n  <path d="M 10 10 L 90 10 L 50 90 Z" fill="#10b981" />\n</svg>\n\n<!-- Icon example -->\n<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">\n  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n\n<!-- Text in SVG -->\n<svg width="200" height="100">\n  <text x="10" y="40" font-family="Arial" font-size="30" fill="black">SVG Text</text>\n</svg>\n\n<!-- Group elements -->\n<svg width="200" height="200">\n  <g fill="none" stroke="black" stroke-width="2">\n    <circle cx="100" cy="100" r="50" />\n    <circle cx="100" cy="100" r="30" />\n  </g>\n</svg>\n\n<!-- External SVG file -->\n<img src="logo.svg" alt="Logo" width="100">\n\n<!-- Use SVG as background in CSS -->\n<div style="background-image: url(\'icon.svg\'); width: 50px; height: 50px;"></div>'
    },
    {
      title: 'Canvas - Drawing Graphics',
      description: 'Canvas element provides a drawing surface for graphics using JavaScript. Use for charts, games, image manipulation, and dynamic graphics.',
      syntax: '<canvas id="myCanvas"></canvas>',
      usage: 'Draw graphics with JavaScript',
      code: '<!-- Canvas element -->\n<canvas id="myCanvas" width="400" height="300"></canvas>\n\n<script>\n  const canvas = document.getElementById(\'myCanvas\');\n  const ctx = canvas.getContext(\'2d\');\n  \n  // Draw rectangle\n  ctx.fillStyle = \'#3b82f6\';\n  ctx.fillRect(50, 50, 100, 100);\n  \n  // Draw circle\n  ctx.beginPath();\n  ctx.arc(250, 100, 50, 0, 2 * Math.PI);\n  ctx.fillStyle = \'#ef4444\';\n  ctx.fill();\n  \n  // Draw line\n  ctx.beginPath();\n  ctx.moveTo(50, 200);\n  ctx.lineTo(350, 200);\n  ctx.strokeStyle = \'#10b981\';\n  ctx.lineWidth = 3;\n  ctx.stroke();\n  \n  // Draw text\n  ctx.font = \'30px Arial\';\n  ctx.fillStyle = \'black\';\n  ctx.fillText(\'Canvas Text\', 50, 250);\n  \n  // Clear canvas\n  // ctx.clearRect(0, 0, canvas.width, canvas.height);\n</script>\n\n<!-- Responsive canvas -->\n<canvas id="responsive"></canvas>\n<script>\n  const canvas = document.getElementById(\'responsive\');\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n</script>'
    },
    {
      title: 'Character Entities',
      description: 'HTML entities display reserved characters like <, >, &, and special symbols. Use named entities (&nbsp;) or numeric codes (&#8364;).',
      syntax: '&entity; or &#number;',
      usage: 'Display special characters',
      code: '<!-- Reserved characters -->\n<p>&lt; Less than</p>\n<p>&gt; Greater than</p>\n<p>&amp; Ampersand</p>\n<p>&quot; Quote</p>\n<p>&apos; Apostrophe</p>\n\n<!-- Common entities -->\n<p>&nbsp; Non-breaking space</p>\n<p>&copy; Copyright ©</p>\n<p>&reg; Registered ®</p>\n<p>&trade; Trademark ™</p>\n<p>&euro; Euro €</p>\n<p>&pound; Pound £</p>\n<p>&yen; Yen ¥</p>\n<p>&cent; Cent ¢</p>\n\n<!-- Math symbols -->\n<p>&times; Multiplication ×</p>\n<p>&divide; Division ÷</p>\n<p>&plusmn; Plus-minus ±</p>\n<p>&frac12; One half ½</p>\n<p>&frac14; One quarter ¼</p>\n\n<!-- Arrows -->\n<p>&larr; Left arrow ←</p>\n<p>&rarr; Right arrow →</p>\n<p>&uarr; Up arrow ↑</p>\n<p>&darr; Down arrow ↓</p>\n\n<!-- Numeric entities -->\n<p>&#169; Copyright</p>\n<p>&#8364; Euro</p>\n<p>&#128512; Emoji 😀</p>\n\n<!-- Actual symbols (UTF-8) -->\n<p>© ® ™ € £ ¥ × ÷ ± ½ ← → ↑ ↓</p>'
    },
    {
      title: 'Comments and Documentation',
      description: 'HTML comments help document code. They are not displayed in the browser but visible in source code. Use for notes, TODOs, and temporarily disabling code.',
      syntax: '<!-- comment -->',
      usage: 'Add notes to HTML',
      code: '<!-- This is a single-line comment -->\n\n<!-- \n  This is a\n  multi-line comment\n-->\n\n<!-- TODO: Add more content here -->\n\n<!-- Temporarily disable code -->\n<!--\n<section>\n  <h2>Coming Soon</h2>\n  <p>This section is under construction</p>\n</section>\n-->\n\n<!-- Document sections -->\n<!-- ===========================\n     Header Section\n     =========================== -->\n<header>\n  <!-- Logo -->\n  <img src="logo.png" alt="Logo">\n  \n  <!-- Navigation -->\n  <nav>\n    <!-- Main menu items -->\n    <a href="/">Home</a>\n    <a href="/about">About</a>\n  </nav>\n</header>\n\n<!-- WARNING: Comments are visible in page source!\n     Don\'t put sensitive information in comments -->\n\n<!-- FIXME: This needs to be updated -->\n\n<!-- NOTE: Browser compatibility\n     IE11 does not support this feature -->'
    },
    {
      title: 'HTML5 APIs Overview',
      description: 'HTML5 provides JavaScript APIs for geolocation, local storage, drag-and-drop, web workers, and more. These APIs extend HTML capabilities beyond static markup.',
      syntax: 'navigator.geolocation, localStorage, etc.',
      usage: 'Use browser APIs',
      code: '<!-- Geolocation API -->\n<button onclick="getLocation()">Get Location</button>\n<p id="location"></p>\n\n<script>\n  function getLocation() {\n    if (navigator.geolocation) {\n      navigator.geolocation.getCurrentPosition(showPosition);\n    }\n  }\n  \n  function showPosition(position) {\n    document.getElementById(\'location\').innerHTML = \n      "Lat: " + position.coords.latitude + \n      "<br>Long: " + position.coords.longitude;\n  }\n</script>\n\n<!-- Local Storage -->\n<script>\n  // Save data\n  localStorage.setItem(\'username\', \'JohnDoe\');\n  \n  // Get data\n  const username = localStorage.getItem(\'username\');\n  \n  // Remove data\n  localStorage.removeItem(\'username\');\n  \n  // Clear all\n  localStorage.clear();\n  \n  // Session storage (cleared when browser closes)\n  sessionStorage.setItem(\'token\', \'abc123\');\n</script>\n\n<!-- Drag and Drop -->\n<div draggable="true" ondragstart="drag(event)" id="drag1">\n  Drag me\n</div>\n\n<div ondrop="drop(event)" ondragover="allowDrop(event)">\n  Drop here\n</div>\n\n<script>\n  function allowDrop(ev) {\n    ev.preventDefault();\n  }\n  \n  function drag(ev) {\n    ev.dataTransfer.setData("text", ev.target.id);\n  }\n  \n  function drop(ev) {\n    ev.preventDefault();\n    const data = ev.dataTransfer.getData("text");\n    ev.target.appendChild(document.getElementById(data));\n  }\n</script>\n\n<!-- Web Workers (background threads) -->\n<script>\n  const worker = new Worker(\'worker.js\');\n  worker.postMessage(\'Hello\');\n  worker.onmessage = function(e) {\n    console.log(\'Worker says:\', e.data);\n  };\n</script>'
    },
    {
      title: 'Performance Optimization',
      description: 'Optimize HTML for faster loading: defer/async scripts, lazy loading images, preload critical resources, minimize DOM size, and use proper caching headers.',
      syntax: 'defer, async, loading="lazy", preload',
      usage: 'Improve page performance',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Optimized Page</title>\n  \n  <!-- Preload critical resources -->\n  <link rel="preload" href="critical.css" as="style">\n  <link rel="preload" href="main.js" as="script">\n  \n  <!-- Preconnect to external domains -->\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="dns-prefetch" href="https://cdn.example.com">\n  \n  <!-- CSS (blocks rendering) -->\n  <link rel="stylesheet" href="critical.css">\n  \n  <!-- Defer non-critical CSS -->\n  <link rel="preload" href="non-critical.css" as="style" onload="this.rel=\'stylesheet\'">\n</head>\n<body>\n  <!-- Content above the fold -->\n  <header>\n    <h1>Welcome</h1>\n  </header>\n  \n  <!-- Lazy load images below the fold -->\n  <img src="hero.jpg" alt="Hero" loading="eager">\n  <img src="image1.jpg" alt="Image 1" loading="lazy">\n  <img src="image2.jpg" alt="Image 2" loading="lazy">\n  \n  <!-- Async scripts (don\'t block parsing) -->\n  <script src="analytics.js" async></script>\n  \n  <!-- Defer scripts (execute after page load) -->\n  <script src="app.js" defer></script>\n  \n  <!-- Inline critical scripts -->\n  <script>\n    // Critical initialization code\n  </script>\n</body>\n</html>\n\n<!-- Performance Best Practices:\n1. Minimize HTTP requests\n2. Use CDN for static assets\n3. Enable gzip compression\n4. Minify HTML, CSS, JS\n5. Optimize images (use WebP, compress)\n6. Reduce DOM depth (<15 levels)\n7. Limit DOM size (<1500 nodes)\n8. Use lazy loading\n9. Defer non-critical resources\n10. Enable browser caching -->'
    },
    {
      title: 'Progressive Web Apps (PWA)',
      description: 'Make HTML apps installable and work offline with PWA features: manifest file, service workers, and app icons. PWAs provide app-like experience on the web.',
      syntax: 'manifest.json, service worker',
      usage: 'Create installable web apps',
      code: '<!-- In index.html -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My PWA</title>\n  \n  <!-- Link to manifest -->\n  <link rel="manifest" href="/manifest.json">\n  \n  <!-- Theme color -->\n  <meta name="theme-color" content="#2563eb">\n  \n  <!-- iOS specific -->\n  <meta name="apple-mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-status-bar-style" content="black">\n  <meta name="apple-mobile-web-app-title" content="My PWA">\n  <link rel="apple-touch-icon" href="/icons/icon-192x192.png">\n</head>\n<body>\n  <h1>Progressive Web App</h1>\n  \n  <script>\n    // Register service worker\n    if ("serviceWorker" in navigator) {\n      window.addEventListener("load", () => {\n        navigator.serviceWorker.register("/service-worker.js")\n          .then(reg => console.log("SW registered", reg))\n          .catch(err => console.log("SW registration failed", err));\n      });\n    }\n  </script>\n</body>\n</html>\n\n<!-- manifest.json -->\n{\n  "name": "My Progressive Web App",\n  "short_name": "My PWA",\n  "description": "A sample PWA",\n  "start_url": "/",\n  "display": "standalone",\n  "background_color": "#ffffff",\n  "theme_color": "#2563eb",\n  "icons": [\n    {\n      "src": "/icons/icon-192x192.png",\n      "sizes": "192x192",\n      "type": "image/png"\n    },\n    {\n      "src": "/icons/icon-512x512.png",\n      "sizes": "512x512",\n      "type": "image/png"\n    }\n  ]\n}\n\n<!-- service-worker.js -->\nself.addEventListener("install", event => {\n  event.waitUntil(\n    caches.open("v1").then(cache => {\n      return cache.addAll(["/", "/index.html", "/styles.css", "/app.js"]);\n    })\n  );\n});\n\nself.addEventListener("fetch", event => {\n  event.respondWith(\n    caches.match(event.request).then(response => {\n      return response || fetch(event.request);\n    })\n  );\n});'
    },
    {
      title: 'HTML Best Practices',
      description: 'Follow best practices: use semantic HTML, validate your code, keep markup clean, separate concerns (HTML/CSS/JS), optimize for accessibility, and maintain consistent formatting.',
      syntax: 'Semantic elements, validation, accessibility',
      usage: 'Write maintainable HTML',
      code: '<!-- ✅ GOOD PRACTICES -->\n\n<!-- 1. Use semantic elements -->\n<header>\n  <nav>\n    <ul>\n      <li><a href="/">Home</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <article>\n    <h1>Article Title</h1>\n    <p>Content...</p>\n  </article>\n</main>\n\n<!-- 2. Always include alt text -->\n<img src="photo.jpg" alt="Description of photo">\n\n<!-- 3. Use lowercase for tags and attributes -->\n<div class="container">\n  <p>Lowercase is standard</p>\n</div>\n\n<!-- 4. Quote attribute values -->\n<input type="text" id="username" class="form-input">\n\n<!-- 5. Close all tags -->\n<p>Paragraph with closing tag</p>\n<img src="photo.jpg" alt="Self-closing" />\n\n<!-- 6. One h1 per page -->\n<h1>Main Page Title</h1>\n<!-- Then h2, h3, etc. -->\n\n<!-- 7. Use labels with forms -->\n<label for="email">Email:</label>\n<input type="email" id="email">\n\n<!-- 8. Validate your HTML -->\n<!-- Use https://validator.w3.org/ -->\n\n<!-- 9. Indent properly -->\n<div>\n  <div>\n    <p>Indented for readability</p>\n  </div>\n</div>\n\n<!-- 10. Separate concerns -->\n<!-- HTML for structure, CSS for style, JS for behavior -->\n<button class="btn-primary" onclick="handleClick()"> <!-- OK -->\n<button style="color: red;"> <!-- ❌ Avoid inline styles -->\n\n<!-- ❌ BAD PRACTICES TO AVOID -->\n\n<!-- Don\'t skip heading levels -->\n<h1>Title</h1>\n<h4>Wrong! Skipped h2 and h3</h4> <!-- ❌ -->\n\n<!-- Don\'t use tables for layout -->\n<table> <!-- ❌ Use CSS flexbox/grid instead -->\n  <tr>\n    <td>Navigation</td>\n    <td>Content</td>\n  </tr>\n</table>\n\n<!-- Don\'t use deprecated tags -->\n<center> <!-- ❌ Use CSS -->\n<font color="red"> <!-- ❌ Use CSS -->\n<marquee> <!-- ❌ Use CSS animation -->'
    },
    {
      title: 'HTML Validation and Debugging',
      description: 'Validate HTML with W3C validator, use browser DevTools to inspect elements, check console for errors, and test across different browsers.',
      syntax: 'Browser DevTools, validator.w3.org',
      usage: 'Debug and validate HTML',
      code: '<!-- Validate HTML -->\n<!-- Visit: https://validator.w3.org/ -->\n<!-- Paste your HTML or URL to check for errors -->\n\n<!-- Common validation errors: -->\n<!-- 1. Unclosed tags -->\n<div>\n  <p>Missing closing tag <!-- ❌ Missing </p> -->\n</div>\n\n<!-- 2. Overlapping tags -->\n<p><strong>Bold <em>and italic</strong></em></p> <!-- ❌ Wrong nesting -->\n<p><strong>Bold <em>and italic</em></strong></p> <!-- ✅ Correct -->\n\n<!-- 3. Duplicate IDs -->\n<div id="main"></div>\n<div id="main"></div> <!-- ❌ IDs must be unique -->\n\n<!-- 4. Missing required attributes -->\n<img src="photo.jpg"> <!-- ❌ Missing alt -->\n<img src="photo.jpg" alt="Description"> <!-- ✅ Correct -->\n\n<!-- Browser DevTools -->\n<script>\n  // Open DevTools: F12 or Right-click > Inspect\n  \n  // Console errors and warnings\n  console.log(\'Debug message\');\n  console.error(\'Error message\');\n  console.warn(\'Warning message\');\n  \n  // Inspect elements\n  console.dir(document.getElementById(\'myElement\'));\n  \n  // Check element properties\n  const elem = document.querySelector(\'.myClass\');\n  console.log(elem.offsetWidth, elem.offsetHeight);\n</script>\n\n<!-- HTML comments for debugging -->\n<!-- DEBUG: Check if this section loads -->\n<section id="test">\n  <p>Test content</p>\n</section>\n<!-- END DEBUG -->\n\n<!-- Testing checklist: -->\n<!-- ✓ Validate HTML (W3C validator) -->\n<!-- ✓ Check console for errors -->\n<!-- ✓ Test in multiple browsers (Chrome, Firefox, Safari, Edge) -->\n<!-- ✓ Test on mobile devices -->\n<!-- ✓ Check accessibility (screen reader, keyboard navigation) -->\n<!-- ✓ Verify all links work -->\n<!-- ✓ Test forms and interactive elements -->\n<!-- ✓ Check loading speed (Lighthouse) -->'
    },
    {
      title: 'Responsive Design with HTML',
      description: 'Make HTML responsive using viewport meta tag, flexible images, picture element for responsive images, and semantic markup that works well with CSS media queries.',
      syntax: 'meta viewport, picture, srcset',
      usage: 'Create responsive pages',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  \n  <!-- Viewport for responsive design (REQUIRED!) -->\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  \n  <title>Responsive Page</title>\n  \n  <style>\n    /* Mobile-first CSS */\n    .container {\n      width: 100%;\n      padding: 20px;\n    }\n    \n    /* Tablet */\n    @media (min-width: 768px) {\n      .container {\n        max-width: 720px;\n        margin: 0 auto;\n      }\n    }\n    \n    /* Desktop */\n    @media (min-width: 1024px) {\n      .container {\n        max-width: 960px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <!-- Responsive images with srcset -->\n  <img \n    src="medium.jpg" \n    srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w"\n    sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 2000px"\n    alt="Responsive image"\n  >\n  \n  <!-- Picture element for art direction -->\n  <picture>\n    <!-- Mobile: portrait crop -->\n    <source media="(max-width: 767px)" srcset="mobile.jpg">\n    <!-- Tablet: square crop -->\n    <source media="(max-width: 1023px)" srcset="tablet.jpg">\n    <!-- Desktop: landscape crop -->\n    <source media="(min-width: 1024px)" srcset="desktop.jpg">\n    <!-- Fallback -->\n    <img src="desktop.jpg" alt="Responsive with art direction">\n  </picture>\n  \n  <!-- Responsive video -->\n  <video controls style="max-width: 100%; height: auto;">\n    <source src="video.mp4" type="video/mp4">\n  </video>\n  \n  <!-- Responsive iframe -->\n  <div style="position: relative; padding-bottom: 56.25%; height: 0;">\n    <iframe \n      src="https://www.youtube.com/embed/VIDEO_ID"\n      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"\n      frameborder="0"\n      allowfullscreen\n    ></iframe>\n  </div>\n</body>\n</html>'
    },
    {
      title: 'Real-World Project - Portfolio Website',
      description: 'Build a complete portfolio website using semantic HTML, forms, media, and all learned concepts. Include home, about, projects, and contact sections.',
      syntax: 'All HTML elements combined',
      usage: 'Apply all HTML skills',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="John Doe - Web Developer Portfolio">\n  <title>John Doe | Web Developer</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <!-- Skip link for accessibility -->\n  <a href="#main-content" class="skip-link">Skip to main content</a>\n  \n  <!-- Header with navigation -->\n  <header role="banner">\n    <nav role="navigation" aria-label="Main navigation">\n      <a href="#home">Home</a>\n      <a href="#about">About</a>\n      <a href="#projects">Projects</a>\n      <a href="#contact">Contact</a>\n    </nav>\n  </header>\n  \n  <!-- Main content -->\n  <main id="main-content" role="main">\n    <!-- Hero section -->\n    <section id="home" aria-labelledby="hero-heading">\n      <h1 id="hero-heading">Hi, I\'m John Doe</h1>\n      <p>Full-Stack Web Developer specializing in React and Node.js</p>\n      <picture>\n        <source srcset="profile.webp" type="image/webp">\n        <img src="profile.jpg" alt="John Doe" width="300" height="300">\n      </picture>\n    </section>\n    \n    <!-- About section -->\n    <section id="about" aria-labelledby="about-heading">\n      <h2 id="about-heading">About Me</h2>\n      <p>I\'m a passionate web developer with 5+ years of experience...</p>\n      \n      <h3>Skills</h3>\n      <ul>\n        <li>HTML, CSS, JavaScript</li>\n        <li>React, Next.js, Vue.js</li>\n        <li>Node.js, Express, MongoDB</li>\n        <li>Git, Docker, AWS</li>\n      </ul>\n    </section>\n    \n    <!-- Projects section -->\n    <section id="projects" aria-labelledby="projects-heading">\n      <h2 id="projects-heading">My Projects</h2>\n      \n      <article>\n        <h3>E-commerce Platform</h3>\n        <figure>\n          <img src="project1.jpg" alt="E-commerce platform screenshot" loading="lazy">\n          <figcaption>Full-stack e-commerce solution with React and Node.js</figcaption>\n        </figure>\n        <p>Description of the project...</p>\n        <a href="https://github.com/johndoe/ecommerce" target="_blank" rel="noopener noreferrer">View on GitHub</a>\n      </article>\n      \n      <article>\n        <h3>Task Management App</h3>\n        <figure>\n          <img src="project2.jpg" alt="Task management app screenshot" loading="lazy">\n          <figcaption>Task manager with drag-and-drop functionality</figcaption>\n        </figure>\n        <p>Description of the project...</p>\n        <a href="https://github.com/johndoe/taskmanager" target="_blank" rel="noopener noreferrer">View on GitHub</a>\n      </article>\n    </section>\n    \n    <!-- Contact section -->\n    <section id="contact" aria-labelledby="contact-heading">\n      <h2 id="contact-heading">Get in Touch</h2>\n      \n      <form action="/submit" method="POST">\n        <fieldset>\n          <legend>Contact Information</legend>\n          \n          <label for="name">Name:</label>\n          <input type="text" id="name" name="name" required>\n          \n          <label for="email">Email:</label>\n          <input type="email" id="email" name="email" required>\n          \n          <label for="message">Message:</label>\n          <textarea id="message" name="message" rows="5" required></textarea>\n          \n          <button type="submit">Send Message</button>\n        </fieldset>\n      </form>\n      \n      <address>\n        <p>Email: <a href="mailto:john@example.com">john@example.com</a></p>\n        <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>\n      </address>\n    </section>\n  </main>\n  \n  <!-- Footer -->\n  <footer role="contentinfo">\n    <p>&copy; 2025 John Doe. All rights reserved.</p>\n    <nav aria-label="Social media">\n      <a href="https://github.com/johndoe" aria-label="GitHub">GitHub</a>\n      <a href="https://linkedin.com/in/johndoe" aria-label="LinkedIn">LinkedIn</a>\n      <a href="https://twitter.com/johndoe" aria-label="Twitter">Twitter</a>\n    </nav>\n  </footer>\n  \n  <script src="app.js" defer></script>\n</body>\n</html>'
    },
    {
      title: 'Next Steps in HTML',
      description: 'Continue learning: explore Web Components, advanced accessibility, HTML email templates, SEO optimization, performance auditing, and modern HTML APIs. Practice by building real projects.',
      syntax: 'Web Components, Shadow DOM, Custom Elements',
      usage: 'Advanced HTML development',
      code: '<!-- Web Components - Custom Elements -->\n<script>\n  class MyButton extends HTMLElement {\n    constructor() {\n      super();\n      this.attachShadow({ mode: \'open\' });\n      this.shadowRoot.innerHTML = `\n        <style>\n          button {\n            background: #3b82f6;\n            color: white;\n            border: none;\n            padding: 12px 24px;\n            border-radius: 8px;\n            cursor: pointer;\n          }\n          button:hover {\n            background: #2563eb;\n          }\n        </style>\n        <button><slot>Click me</slot></button>\n      `;\n    }\n  }\n  \n  customElements.define(\'my-button\', MyButton);\n</script>\n\n<!-- Use custom element -->\n<my-button>Custom Button</my-button>\n\n<!-- Advanced Topics to Explore: -->\n\n<!-- 1. Web Components -->\n<!-- - Custom Elements\n   - Shadow DOM\n   - HTML Templates\n   - Slots -->\n\n<!-- 2. Advanced Accessibility -->\n<!-- - WCAG 2.1 AA compliance\n   - Automated testing (axe, Lighthouse)\n   - Screen reader testing\n   - Keyboard-only navigation -->\n\n<!-- 3. SEO Optimization -->\n<!-- - Structured data (Schema.org)\n   - Open Graph tags\n   - Twitter Cards\n   - Canonical URLs\n   - XML sitemaps -->\n\n<!-- 4. Performance -->\n<!-- - Critical rendering path\n   - Resource hints (preload, prefetch, preconnect)\n   - Code splitting\n   - Image optimization (WebP, AVIF)\n   - Lighthouse audits -->\n\n<!-- 5. HTML Email -->\n<!-- - Table-based layouts\n   - Inline CSS\n   - Cross-client compatibility\n   - Responsive emails -->\n\n<!-- 6. Modern APIs -->\n<!-- - Intersection Observer\n   - ResizeObserver\n   - MutationObserver\n   - Web Animations API\n   - Web Share API\n   - Payment Request API -->\n\n<!-- Learning Resources: -->\n<!-- 📚 MDN Web Docs: https://developer.mozilla.org\n   📖 W3Schools: https://www.w3schools.com\n   🎓 web.dev: https://web.dev/learn/html\n   ✅ W3C HTML Spec: https://html.spec.whatwg.org/\n   🎯 Practice: Build real projects!\n   💬 Community: Stack Overflow, Reddit (r/webdev) -->\n\n<!-- CONGRATULATIONS! 🎉 -->\n<!-- You\'ve completed the comprehensive HTML tutorial!\n   Keep building, keep learning, and create amazing websites! -->'
    }
  ]
}

// Generic Framework (React-like)
// React - Comprehensive 50+ lesson curriculum
function reactSpecs(languageName: string): SectionSpec[] {
  return [
    {
      title: `${languageName} HOME`,
      description: 'React is a JavaScript library for building user interfaces. Created by Facebook, React makes it easy to create interactive UIs with reusable components. Learn to build modern web applications from scratch to production.',
      syntax: 'JSX, Components, Props, State',
      usage: 'Build interactive web applications',
      code: 'import React from "react";\n\nfunction App() {\n  return <h1>Hello, React!</h1>;\n}\n\nexport default App;'
    },
    {
      title: 'Introduction',
      description: 'React is a declarative, component-based library. It lets you compose complex UIs from small, isolated pieces of code called components. React efficiently updates and renders the right components when your data changes.',
      syntax: 'Component-based architecture',
      usage: 'Understand React philosophy and use cases',
      code: '// React Applications:\n// - Single Page Applications (SPAs)\n// - Progressive Web Apps (PWAs)\n// - Mobile apps (with React Native)\n// - Desktop apps (with Electron)\n// - Static sites (with Next.js/Gatsby)'
    },
    {
      title: 'Getting Started',
      description: 'Set up your React development environment using Create React App or Vite. Install Node.js, create a new project, and start the development server.',
      syntax: 'npx create-react-app my-app\nnpm create vite@latest my-app -- --template react',
      usage: 'Initialize a React project',
      code: '// Using Create React App\nnpx create-react-app my-app\ncd my-app\nnpm start\n\n// Using Vite (faster)\nnpm create vite@latest my-app -- --template react\ncd my-app\nnpm install\nnpm run dev\n\n// Your app runs on http://localhost:3000 or http://localhost:5173'
    },
    {
      title: 'JSX Basics',
      description: 'JSX is a syntax extension for JavaScript that looks like HTML. It produces React "elements" and makes your code more readable. You can embed JavaScript expressions in JSX using curly braces.',
      syntax: 'const element = <h1>Hello {name}</h1>',
      usage: 'Write component templates',
      code: 'function Welcome() {\n  const name = "Alice";\n  const greeting = "Welcome";\n  \n  return (\n    <div>\n      <h1>{greeting}, {name}!</h1>\n      <p>Current time: {new Date().toLocaleTimeString()}</p>\n      <p>Random number: {Math.random()}</p>\n    </div>\n  );\n}'
    },
    {
      title: 'Components',
      description: 'Components are independent, reusable pieces of UI. Function components are the modern way to create components. They return JSX and can use Hooks for state and effects.',
      syntax: 'function ComponentName() { return <jsx/> }',
      usage: 'Build reusable UI pieces',
      code: 'function Button() {\n  return <button>Click me</button>;\n}\n\nfunction Card() {\n  return (\n    <div className="card">\n      <h2>Card Title</h2>\n      <p>Card content</p>\n      <Button />\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <div>\n      <Card />\n      <Card />\n    </div>\n  );\n}'
    },
    {
      title: 'Props',
      description: 'Props (short for properties) let you pass data from parent to child components. They are read-only and make components reusable with different data.',
      syntax: '<Component prop1="value" prop2={expression} />',
      usage: 'Pass data to components',
      code: 'function Greeting({ name, age }) {\n  return <p>Hello {name}, you are {age} years old!</p>;\n}\n\nfunction UserCard({ user }) {\n  return (\n    <div className="card">\n      <h2>{user.name}</h2>\n      <p>Email: {user.email}</p>\n      <p>Role: {user.role}</p>\n    </div>\n  );\n}\n\nfunction App() {\n  const user = { name: "Alice", email: "alice@example.com", role: "Developer" };\n  \n  return (\n    <div>\n      <Greeting name="Bob" age={25} />\n      <UserCard user={user} />\n    </div>\n  );\n}'
    },
    {
      title: 'State with useState',
      description: 'State lets components remember information like user input, toggles, or fetched data. The useState Hook adds state to function components. When state changes, React re-renders the component.',
      syntax: 'const [value, setValue] = useState(initialValue)',
      usage: 'Add interactive state to components',
      code: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n      <button onClick={() => setCount(count - 1)}>Decrement</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}\n\nfunction ToggleSwitch() {\n  const [isOn, setIsOn] = useState(false);\n  \n  return (\n    <button onClick={() => setIsOn(!isOn)}>\n      {isOn ? "ON" : "OFF"}\n    </button>\n  );\n}'
    },
    {
      title: 'Handling Events',
      description: 'React events are named using camelCase. You pass a function as the event handler. Common events include onClick, onChange, onSubmit, onMouseEnter, and onKeyDown.',
      syntax: '<button onClick={handleClick}>Click</button>',
      usage: 'Respond to user interactions',
      code: 'function EventExamples() {\n  const handleClick = () => {\n    alert("Button clicked!");\n  };\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log("Form submitted");\n  };\n  \n  const handleInput = (e) => {\n    console.log("Input value:", e.target.value);\n  };\n  \n  return (\n    <div>\n      <button onClick={handleClick}>Click Me</button>\n      <button onClick={() => alert("Inline handler")}>Alert</button>\n      \n      <form onSubmit={handleSubmit}>\n        <input type="text" onChange={handleInput} />\n        <button type="submit">Submit</button>\n      </form>\n    </div>\n  );\n}'
    },
    {
      title: 'Conditional Rendering',
      description: 'Render different UI based on conditions using if statements, ternary operators, or logical && operator. This makes your components dynamic and responsive to data.',
      syntax: '{condition ? <True /> : <False />}\n{condition && <Component />}',
      usage: 'Show/hide elements based on state',
      code: 'function LoginStatus({ isLoggedIn }) {\n  if (isLoggedIn) {\n    return <p>Welcome back!</p>;\n  }\n  return <p>Please log in</p>;\n}\n\nfunction Greeting({ user }) {\n  return (\n    <div>\n      {user ? <p>Hello, {user.name}!</p> : <p>Please sign up</p>}\n    </div>\n  );\n}\n\nfunction Notification({ count }) {\n  return (\n    <div>\n      <h2>Notifications</h2>\n      {count > 0 && <span>You have {count} new messages</span>}\n      {count === 0 && <span>No new messages</span>}\n    </div>\n  );\n}'
    },
    {
      title: 'Lists and Keys',
      description: 'Render lists using the map() function. Each list item needs a unique "key" prop to help React identify which items have changed, added, or removed.',
      syntax: '{items.map(item => <Component key={item.id} {...item} />)}',
      usage: 'Display collections of data',
      code: 'function TodoList() {\n  const todos = [\n    { id: 1, text: "Learn React", done: true },\n    { id: 2, text: "Build a project", done: false },\n    { id: 3, text: "Deploy app", done: false }\n  ];\n  \n  return (\n    <ul>\n      {todos.map(todo => (\n        <li key={todo.id} style={{ textDecoration: todo.done ? "line-through" : "none" }}>\n          {todo.text}\n        </li>\n      ))}\n    </ul>\n  );\n}\n\nfunction UserList({ users }) {\n  return (\n    <div>\n      {users.map(user => (\n        <div key={user.id} className="user-card">\n          <h3>{user.name}</h3>\n          <p>{user.email}</p>\n        </div>\n      ))}\n    </div>\n  );\n}'
    },
    {
      title: 'Forms & Controlled Components',
      description: 'Controlled components are form inputs whose values are controlled by React state. The component state is the single source of truth for the input value.',
      syntax: '<input value={state} onChange={e => setState(e.target.value)} />',
      usage: 'Build interactive forms',
      code: 'import { useState } from "react";\n\nfunction LoginForm() {\n  const [email, setEmail] = useState("");\n  const [password, setPassword] = useState("");\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log({ email, password });\n  };\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        type="email"\n        value={email}\n        onChange={(e) => setEmail(e.target.value)}\n        placeholder="Email"\n      />\n      <input\n        type="password"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n        placeholder="Password"\n      />\n      <button type="submit">Login</button>\n    </form>\n  );\n}'
    },
    {
      title: 'useEffect Hook',
      description: 'useEffect lets you perform side effects in components: fetching data, subscriptions, timers, or manually changing the DOM. It runs after render and can clean up when the component unmounts.',
      syntax: 'useEffect(() => { /* effect */ return () => {/* cleanup */}}, [dependencies])',
      usage: 'Handle side effects and lifecycle',
      code: 'import { useState, useEffect } from "react";\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  \n  useEffect(() => {\n    const interval = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n    \n    // Cleanup function\n    return () => clearInterval(interval);\n  }, []); // Empty array = run once on mount\n  \n  return <p>Seconds: {seconds}</p>;\n}\n\nfunction DocumentTitle() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]); // Run when count changes\n  \n  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;\n}'
    },
    {
      title: 'Fetching Data',
      description: 'Fetch data from APIs using the fetch API or libraries like axios. Use useState to store data and useEffect to trigger the fetch. Handle loading and error states.',
      syntax: 'useEffect(() => { fetch(url).then(res => res.json()).then(setData) }, [])',
      usage: 'Load data from servers',
      code: 'import { useState, useEffect } from "react";\n\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  \n  useEffect(() => {\n    setLoading(true);\n    fetch(`https://api.example.com/users/${userId}`)\n      .then(res => res.json())\n      .then(data => {\n        setUser(data);\n        setLoading(false);\n      })\n      .catch(err => {\n        setError(err.message);\n        setLoading(false);\n      });\n  }, [userId]);\n  \n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>Error: {error}</p>;\n  if (!user) return <p>No user found</p>;\n  \n  return (\n    <div>\n      <h2>{user.name}</h2>\n      <p>{user.email}</p>\n    </div>\n  );\n}'
    },
    {
      title: 'Custom Hooks',
      description: 'Extract component logic into reusable functions called custom Hooks. Custom Hooks let you share stateful logic between components without changing your component hierarchy.',
      syntax: 'function useCustomHook() { /* use other hooks */ return value; }',
      usage: 'Reuse stateful logic across components',
      code: 'import { useState, useEffect } from "react";\n\n// Custom hook for fetching data\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  \n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(data => {\n        setData(data);\n        setLoading(false);\n      })\n      .catch(err => {\n        setError(err);\n        setLoading(false);\n      });\n  }, [url]);\n  \n  return { data, loading, error };\n}\n\n// Custom hook for localStorage\nfunction useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved !== null ? JSON.parse(saved) : initialValue;\n  });\n  \n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n  \n  return [value, setValue];\n}\n\n// Usage\nfunction App() {\n  const { data, loading } = useFetch("/api/users");\n  const [theme, setTheme] = useLocalStorage("theme", "light");\n  \n  return <div>{loading ? "Loading..." : data.length} users</div>;\n}'
    },
    {
      title: 'Context API',
      description: 'Context provides a way to pass data through the component tree without having to pass props down manually at every level. Perfect for themes, user info, or language preferences.',
      syntax: 'const Context = createContext(defaultValue)\n<Context.Provider value={value}>\nconst value = useContext(Context)',
      usage: 'Share data globally without prop drilling',
      code: 'import { createContext, useContext, useState } from "react";\n\nconst ThemeContext = createContext("light");\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState("light");\n  \n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nfunction ThemedButton() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  \n  return (\n    <button\n      style={{ background: theme === "dark" ? "#333" : "#fff" }}\n      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}\n    >\n      Current theme: {theme}\n    </button>\n  );\n}\n\nfunction App() {\n  return (\n    <ThemeProvider>\n      <ThemedButton />\n    </ThemeProvider>\n  );\n}'
    },
    {
      title: 'useReducer Hook',
      description: 'useReducer is an alternative to useState for managing complex state logic. It works like Redux: you dispatch actions to a reducer function that returns new state.',
      syntax: 'const [state, dispatch] = useReducer(reducer, initialState)',
      usage: 'Manage complex state with actions',
      code: 'import { useReducer } from "react";\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "increment":\n      return { count: state.count + 1 };\n    case "decrement":\n      return { count: state.count - 1 };\n    case "reset":\n      return { count: 0 };\n    default:\n      return state;\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n  \n  return (\n    <div>\n      <p>Count: {state.count}</p>\n      <button onClick={() => dispatch({ type: "increment" })}>+</button>\n      <button onClick={() => dispatch({ type: "decrement" })}>-</button>\n      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>\n    </div>\n  );\n}'
    },
    {
      title: 'useRef Hook',
      description: 'useRef creates a mutable reference that persists across re-renders. Use it to access DOM elements directly or store mutable values that don\'t trigger re-renders.',
      syntax: 'const ref = useRef(initialValue)\n<input ref={ref} />',
      usage: 'Access DOM elements and persist values',
      code: 'import { useRef, useEffect } from "react";\n\nfunction FocusInput() {\n  const inputRef = useRef(null);\n  \n  useEffect(() => {\n    // Focus input on mount\n    inputRef.current.focus();\n  }, []);\n  \n  return <input ref={inputRef} placeholder="Auto-focused" />;\n}\n\nfunction Counter() {\n  const countRef = useRef(0);\n  const [, forceRender] = useState();\n  \n  const increment = () => {\n    countRef.current++;\n    console.log("Count:", countRef.current); // Updates without re-render\n  };\n  \n  return (\n    <div>\n      <p>Count: {countRef.current}</p>\n      <button onClick={increment}>Increment (no render)</button>\n      <button onClick={() => forceRender({})}>Force Render</button>\n    </div>\n  );\n}'
    },
    {
      title: 'useMemo Hook',
      description: 'useMemo memoizes expensive calculations so they only recompute when dependencies change. This optimization prevents unnecessary recalculations on every render.',
      syntax: 'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])',
      usage: 'Optimize expensive computations',
      code: 'import { useState, useMemo } from "react";\n\nfunction ExpensiveComponent({ items }) {\n  const [filter, setFilter] = useState("");\n  \n  // Only recalculates when items or filter changes\n  const filteredItems = useMemo(() => {\n    console.log("Filtering items...");\n    return items.filter(item => \n      item.toLowerCase().includes(filter.toLowerCase())\n    );\n  }, [items, filter]);\n  \n  return (\n    <div>\n      <input\n        value={filter}\n        onChange={(e) => setFilter(e.target.value)}\n        placeholder="Filter..."\n      />\n      <ul>\n        {filteredItems.map((item, i) => (\n          <li key={i}>{item}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}'
    },
    {
      title: 'useCallback Hook',
      description: 'useCallback memoizes callback functions so they maintain the same reference across renders. This prevents unnecessary re-renders of child components that depend on the callback.',
      syntax: 'const memoizedCallback = useCallback(() => {}, [dependencies])',
      usage: 'Prevent unnecessary re-renders',
      code: 'import { useState, useCallback, memo } from "react";\n\n// Child component only re-renders if props change\nconst Button = memo(({ onClick, children }) => {\n  console.log("Button rendered");\n  return <button onClick={onClick}>{children}</button>;\n});\n\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  const [other, setOther] = useState(0);\n  \n  // Without useCallback, this creates a new function on every render\n  const handleClick = useCallback(() => {\n    setCount(c => c + 1);\n  }, []); // No dependencies = function never changes\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <Button onClick={handleClick}>Increment</Button>\n      \n      {/* This won\'t cause Button to re-render */}\n      <button onClick={() => setOther(other + 1)}>Other: {other}</button>\n    </div>\n  );\n}'
    },
    {
      title: 'React.memo',
      description: 'React.memo is a higher-order component that memoizes a component. It only re-renders if props change, preventing expensive renders when parent re-renders.',
      syntax: 'const MemoizedComponent = memo(Component)',
      usage: 'Optimize component re-renders',
      code: 'import { memo, useState } from "react";\n\n// Without memo: re-renders every time parent renders\nconst ExpensiveComponent = memo(({ data }) => {\n  console.log("ExpensiveComponent rendered");\n  // Imagine expensive computation here\n  return <div>{data.map(item => <p key={item}>{item}</p>)}</div>;\n});\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  const [data] = useState(["A", "B", "C"]);\n  \n  return (\n    <div>\n      {/* Clicking this won\'t re-render ExpensiveComponent */}\n      <button onClick={() => setCount(count + 1)}>Count: {count}</button>\n      <ExpensiveComponent data={data} />\n    </div>\n  );\n}'
    },
    {
      title: 'Error Boundaries',
      description: 'Error boundaries catch JavaScript errors anywhere in their child component tree, log errors, and display fallback UI. They catch errors during rendering, lifecycle methods, and constructors.',
      syntax: 'class ErrorBoundary extends React.Component',
      usage: 'Handle errors gracefully',
      code: 'import React from "react";\n\nclass ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n  \n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n  \n  componentDidCatch(error, errorInfo) {\n    console.error("Error:", error, errorInfo);\n  }\n  \n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong.</h1>;\n    }\n    return this.props.children;\n  }\n}\n\n// Usage\nfunction App() {\n  return (\n    <ErrorBoundary>\n      <BuggyComponent />\n    </ErrorBoundary>\n  );\n}'
    },
    {
      title: 'Fragments',
      description: 'Fragments let you group children without adding extra nodes to the DOM. Use <></> shorthand or <Fragment> when you need to pass keys.',
      syntax: '<></> or <Fragment key={value}>',
      usage: 'Group elements without wrapper divs',
      code: 'import { Fragment } from "react";\n\nfunction Table() {\n  return (\n    <table>\n      <tbody>\n        <tr>\n          <Columns />\n        </tr>\n      </tbody>\n    </table>\n  );\n}\n\nfunction Columns() {\n  return (\n    <>\n      <td>Column 1</td>\n      <td>Column 2</td>\n    </>\n  );\n}\n\n// With keys\nfunction ListItems({ items }) {\n  return (\n    <>\n      {items.map(item => (\n        <Fragment key={item.id}>\n          <dt>{item.term}</dt>\n          <dd>{item.description}</dd>\n        </Fragment>\n      ))}\n    </>\n  );\n}'
    },
    {
      title: 'Portals',
      description: 'Portals provide a way to render children into a DOM node outside the parent component hierarchy. Common for modals, tooltips, and dropdowns.',
      syntax: 'ReactDOM.createPortal(child, container)',
      usage: 'Render components outside parent DOM',
      code: 'import { createPortal } from "react-dom";\nimport { useState } from "react";\n\nfunction Modal({ children, isOpen, onClose }) {\n  if (!isOpen) return null;\n  \n  return createPortal(\n    <div className="modal-overlay" onClick={onClose}>\n      <div className="modal-content" onClick={(e) => e.stopPropagation()}>\n        <button onClick={onClose}>×</button>\n        {children}\n      </div>\n    </div>,\n    document.getElementById("modal-root")\n  );\n}\n\nfunction App() {\n  const [showModal, setShowModal] = useState(false);\n  \n  return (\n    <div>\n      <button onClick={() => setShowModal(true)}>Open Modal</button>\n      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>\n        <h2>Modal Content</h2>\n        <p>This is rendered in a portal!</p>\n      </Modal>\n    </div>\n  );\n}'
    },
    {
      title: 'React Router - Setup',
      description: 'React Router enables client-side routing in React apps. Install react-router-dom and wrap your app in BrowserRouter to enable routing.',
      syntax: 'npm install react-router-dom',
      usage: 'Add routing to React apps',
      code: 'import { BrowserRouter, Routes, Route, Link } from "react-router-dom";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to="/">Home</Link>\n        <Link to="/about">About</Link>\n        <Link to="/contact">Contact</Link>\n      </nav>\n      \n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/about" element={<About />} />\n        <Route path="/contact" element={<Contact />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n\nfunction Home() {\n  return <h1>Home Page</h1>;\n}\n\nfunction About() {\n  return <h1>About Page</h1>;\n}\n\nfunction Contact() {\n  return <h1>Contact Page</h1>;\n}'
    },
    {
      title: 'React Router - Dynamic Routes & Params',
      description: 'Create dynamic routes with URL parameters. Use useParams hook to access route parameters, useNavigate for programmatic navigation, and useLocation for current location.',
      syntax: '<Route path="/users/:id" element={<User />} />\nconst { id } = useParams()',
      usage: 'Build dynamic, parameterized routes',
      code: 'import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";\n\nfunction UserProfile() {\n  const { userId } = useParams();\n  const navigate = useNavigate();\n  \n  return (\n    <div>\n      <h1>User Profile {userId}</h1>\n      <button onClick={() => navigate("/")}>Go Home</button>\n      <button onClick={() => navigate(-1)}>Go Back</button>\n    </div>\n  );\n}\n\nfunction PostDetail() {\n  const { postId } = useParams();\n  return <h1>Post {postId}</h1>;\n}\n\nfunction App() {\n  return (\n    <Routes>\n      <Route path="/" element={<Home />} />\n      <Route path="/users/:userId" element={<UserProfile />} />\n      <Route path="/posts/:postId" element={<PostDetail />} />\n      <Route path="*" element={<NotFound />} />\n    </Routes>\n  );\n}'
    },
    {
      title: 'Styling - CSS Modules',
      description: 'CSS Modules scope CSS to individual components, preventing class name conflicts. Import styles as objects and apply to className.',
      syntax: 'import styles from "./Component.module.css"\n<div className={styles.container}>',
      usage: 'Write scoped component styles',
      code: '// Button.module.css\n.button {\n  background: blue;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n}\n\n.button:hover {\n  background: darkblue;\n}\n\n.primary {\n  background: green;\n}\n\n// Button.jsx\nimport styles from "./Button.module.css";\n\nfunction Button({ primary, children }) {\n  const className = primary \n    ? `${styles.button} ${styles.primary}` \n    : styles.button;\n  \n  return <button className={className}>{children}</button>;\n}'
    },
    {
      title: 'Styling - Styled Components',
      description: 'Styled-components uses tagged template literals to write CSS in JavaScript. It creates React components with styles attached.',
      syntax: 'const StyledDiv = styled.div`css here`',
      usage: 'Write CSS-in-JS with component scope',
      code: 'import styled from "styled-components";\n\nconst Button = styled.button`\n  background: ${props => props.primary ? "blue" : "gray"};\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n  \n  &:hover {\n    opacity: 0.8;\n  }\n`;\n\nconst Card = styled.div`\n  background: white;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n`;\n\nfunction App() {\n  return (\n    <Card>\n      <h2>Welcome</h2>\n      <Button primary>Primary</Button>\n      <Button>Secondary</Button>\n    </Card>\n  );\n}'
    },
    {
      title: 'Styling - Tailwind CSS',
      description: 'Tailwind is a utility-first CSS framework. Apply pre-defined utility classes directly to elements for rapid UI development.',
      syntax: 'className="flex items-center justify-between p-4"',
      usage: 'Build UIs with utility classes',
      code: '// Install: npm install -D tailwindcss postcss autoprefixer\n// npx tailwindcss init -p\n\nfunction Card() {\n  return (\n    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">\n      <h2 className="text-2xl font-bold mb-4 text-gray-800">Card Title</h2>\n      <p className="text-gray-600 mb-4">Card description goes here.</p>\n      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">\n        Learn More\n      </button>\n    </div>\n  );\n}\n\nfunction Layout() {\n  return (\n    <div className="min-h-screen bg-gray-100">\n      <nav className="bg-white shadow-sm p-4 flex items-center justify-between">\n        <h1 className="text-xl font-bold">Logo</h1>\n        <div className="flex gap-4">\n          <a href="#" className="hover:text-blue-500">Home</a>\n          <a href="#" className="hover:text-blue-500">About</a>\n        </div>\n      </nav>\n      <main className="container mx-auto p-4">\n        <Card />\n      </main>\n    </div>\n  );\n}'
    },
    {
      title: 'Form Libraries - React Hook Form',
      description: 'React Hook Form provides performant, flexible forms with easy validation. It minimizes re-renders and provides built-in validation.',
      syntax: 'const { register, handleSubmit } = useForm()',
      usage: 'Build forms with minimal re-renders',
      code: 'import { useForm } from "react-hook-form";\n\nfunction RegistrationForm() {\n  const { register, handleSubmit, formState: { errors } } = useForm();\n  \n  const onSubmit = (data) => {\n    console.log(data);\n  };\n  \n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input\n        {...register("email", {\n          required: "Email is required",\n          pattern: {\n            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,\n            message: "Invalid email"\n          }\n        })}\n        placeholder="Email"\n      />\n      {errors.email && <span>{errors.email.message}</span>}\n      \n      <input\n        {...register("password", {\n          required: "Password is required",\n          minLength: {\n            value: 8,\n            message: "Password must be at least 8 characters"\n          }\n        })}\n        type="password"\n        placeholder="Password"\n      />\n      {errors.password && <span>{errors.password.message}</span>}\n      \n      <button type="submit">Register</button>\n    </form>\n  );\n}'
    },
    {
      title: 'State Management - Redux Toolkit',
      description: 'Redux Toolkit is the official, recommended way to write Redux logic. It includes utilities to simplify store setup, reducers, and async logic.',
      syntax: 'createSlice, configureStore, useSelector, useDispatch',
      usage: 'Manage complex app-wide state',
      code: 'import { configureStore, createSlice } from "@reduxjs/toolkit";\nimport { useSelector, useDispatch, Provider } from "react-redux";\n\n// Slice\nconst counterSlice = createSlice({\n  name: "counter",\n  initialState: { value: 0 },\n  reducers: {\n    increment: state => { state.value += 1; },\n    decrement: state => { state.value -= 1; },\n    incrementByAmount: (state, action) => { state.value += action.payload; }\n  }\n});\n\n// Store\nconst store = configureStore({\n  reducer: {\n    counter: counterSlice.reducer\n  }\n});\n\n// Component\nfunction Counter() {\n  const count = useSelector(state => state.counter.value);\n  const dispatch = useDispatch();\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>\n      <button onClick={() => dispatch(counterSlice.actions.decrement())}>-</button>\n    </div>\n  );\n}\n\n// App\nfunction App() {\n  return (\n    <Provider store={store}>\n      <Counter />\n    </Provider>\n  );\n}'
    },
    {
      title: 'State Management - Zustand',
      description: 'Zustand is a small, fast state management solution with a simple API. No providers needed, minimal boilerplate, and great TypeScript support.',
      syntax: 'const useStore = create((set) => ({}))',
      usage: 'Lightweight global state',
      code: 'import create from "zustand";\n\n// Create store\nconst useStore = create((set) => ({\n  count: 0,\n  user: null,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n  decrement: () => set((state) => ({ count: state.count - 1 })),\n  setUser: (user) => set({ user })\n}));\n\n// Use in components\nfunction Counter() {\n  const count = useStore(state => state.count);\n  const increment = useStore(state => state.increment);\n  const decrement = useStore(state => state.decrement);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>+</button>\n      <button onClick={decrement}>-</button>\n    </div>\n  );\n}\n\nfunction UserDisplay() {\n  const user = useStore(state => state.user);\n  return user ? <p>Welcome {user.name}</p> : <p>Not logged in</p>;\n}'
    },
    {
      title: 'Data Fetching - React Query',
      description: 'React Query (TanStack Query) manages server state: fetching, caching, synchronizing, and updating data. It handles loading, error states, and automatic refetching.',
      syntax: 'const { data, isLoading, error } = useQuery("key", fetchFn)',
      usage: 'Manage server state efficiently',
      code: 'import { useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";\n\nconst queryClient = new QueryClient();\n\nfunction Users() {\n  const { data, isLoading, error } = useQuery({\n    queryKey: ["users"],\n    queryFn: () => fetch("/api/users").then(res => res.json())\n  });\n  \n  const mutation = useMutation({\n    mutationFn: (newUser) => fetch("/api/users", {\n      method: "POST",\n      body: JSON.stringify(newUser)\n    }),\n    onSuccess: () => {\n      queryClient.invalidateQueries(["users"]);\n    }\n  });\n  \n  if (isLoading) return <p>Loading...</p>;\n  if (error) return <p>Error: {error.message}</p>;\n  \n  return (\n    <div>\n      <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>\n      <button onClick={() => mutation.mutate({ name: "New User" })}>Add User</button>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <QueryClientProvider client={queryClient}>\n      <Users />\n    </QueryClientProvider>\n  );\n}'
    },
    {
      title: 'Code Splitting & Lazy Loading',
      description: 'Split your app into smaller bundles that load on demand using React.lazy and Suspense. This reduces initial load time by only loading code when needed.',
      syntax: 'const Component = React.lazy(() => import("./Component"))\n<Suspense fallback={<Loading />}>',
      usage: 'Improve initial load performance',
      code: 'import { lazy, Suspense } from "react";\nimport { BrowserRouter, Routes, Route } from "react-router-dom";\n\n// Lazy load components\nconst Home = lazy(() => import("./pages/Home"));\nconst About = lazy(() => import("./pages/About"));\nconst Dashboard = lazy(() => import("./pages/Dashboard"));\n\nfunction Loading() {\n  return <div className="spinner">Loading...</div>;\n}\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Suspense fallback={<Loading />}>\n        <Routes>\n          <Route path="/" element={<Home />} />\n          <Route path="/about" element={<About />} />\n          <Route path="/dashboard" element={<Dashboard />} />\n        </Routes>\n      </Suspense>\n    </BrowserRouter>\n  );\n}'
    },
    {
      title: 'Performance Optimization',
      description: 'Optimize React apps by preventing unnecessary re-renders, lazy loading, code splitting, virtualizing long lists, and using production builds. Profile with React DevTools.',
      syntax: 'React.memo, useMemo, useCallback, lazy loading',
      usage: 'Build fast, efficient apps',
      code: 'import { memo, useMemo, useCallback, useState } from "react";\nimport { FixedSizeList } from "react-window";\n\n// Memoized component\nconst ExpensiveItem = memo(({ item }) => {\n  console.log("Rendering item:", item.id);\n  return <div>{item.name}</div>;\n});\n\n// Virtualized list for 10,000+ items\nfunction VirtualList({ items }) {\n  const Row = ({ index, style }) => (\n    <div style={style}>{items[index].name}</div>\n  );\n  \n  return (\n    <FixedSizeList\n      height={400}\n      itemCount={items.length}\n      itemSize={35}\n      width="100%"\n    >\n      {Row}\n    </FixedSizeList>\n  );\n}\n\n// Optimized filtering\nfunction SearchableList({ items }) {\n  const [query, setQuery] = useState("");\n  \n  const filtered = useMemo(() => {\n    return items.filter(item => \n      item.name.toLowerCase().includes(query.toLowerCase())\n    );\n  }, [items, query]);\n  \n  return (\n    <div>\n      <input value={query} onChange={e => setQuery(e.target.value)} />\n      {filtered.map(item => <ExpensiveItem key={item.id} item={item} />)}\n    </div>\n  );\n}'
    },
    {
      title: 'Testing - Jest & React Testing Library',
      description: 'Test React components using Jest (test runner) and React Testing Library (testing utilities). Write tests that resemble how users interact with your app.',
      syntax: 'render, screen, fireEvent, waitFor',
      usage: 'Ensure components work correctly',
      code: 'import { render, screen, fireEvent } from "@testing-library/react";\nimport "@testing-library/jest-dom";\nimport Counter from "./Counter";\n\ndescribe("Counter", () => {\n  test("renders with initial count of 0", () => {\n    render(<Counter />);\n    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();\n  });\n  \n  test("increments count when button clicked", () => {\n    render(<Counter />);\n    const button = screen.getByText(/increment/i);\n    fireEvent.click(button);\n    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();\n  });\n  \n  test("decrements count", () => {\n    render(<Counter />);\n    fireEvent.click(screen.getByText(/decrement/i));\n    expect(screen.getByText(/count: -1/i)).toBeInTheDocument();\n  });\n});\n\n// Testing async\ntest("loads and displays user", async () => {\n  render(<UserProfile userId={1} />);\n  expect(screen.getByText(/loading/i)).toBeInTheDocument();\n  const userName = await screen.findByText(/john doe/i);\n  expect(userName).toBeInTheDocument();\n});'
    },
    {
      title: 'TypeScript with React',
      description: 'Use TypeScript for type-safe React development. Define types for props, state, events, and API responses to catch errors early and improve developer experience.',
      syntax: 'interface Props { name: string; }\nfunction Component({ name }: Props)',
      usage: 'Add type safety to React',
      code: 'import { useState, FC, ReactNode, ChangeEvent, FormEvent } from "react";\n\n// Props interface\ninterface ButtonProps {\n  variant: "primary" | "secondary";\n  onClick: () => void;\n  children: ReactNode;\n  disabled?: boolean;\n}\n\nconst Button: FC<ButtonProps> = ({ variant, onClick, children, disabled }) => {\n  return (\n    <button\n      className={variant}\n      onClick={onClick}\n      disabled={disabled}\n    >\n      {children}\n    </button>\n  );\n};\n\n// Form with types\ninterface FormData {\n  email: string;\n  password: string;\n}\n\nfunction LoginForm() {\n  const [formData, setFormData] = useState<FormData>({\n    email: "",\n    password: ""\n  });\n  \n  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {\n    setFormData({ ...formData, [e.target.name]: e.target.value });\n  };\n  \n  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {\n    e.preventDefault();\n    console.log(formData);\n  };\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      <input name="email" value={formData.email} onChange={handleChange} />\n      <input name="password" type="password" value={formData.password} onChange={handleChange} />\n      <Button variant="primary" onClick={() => {}}>Login</Button>\n    </form>\n  );\n}'
    },
    {
      title: 'API Integration Patterns',
      description: 'Best practices for integrating APIs: create API service layers, handle errors gracefully, implement retry logic, manage auth tokens, and type API responses.',
      syntax: 'axios, fetch, error handling',
      usage: 'Build robust API integrations',
      code: '// api/client.ts\nimport axios from "axios";\n\nconst api = axios.create({\n  baseURL: process.env.REACT_APP_API_URL,\n  timeout: 10000,\n});\n\n// Request interceptor for auth\napi.interceptors.request.use(config => {\n  const token = localStorage.getItem("token");\n  if (token) {\n    config.headers.Authorization = `Bearer ${token}`;\n  }\n  return config;\n});\n\n// Response interceptor for errors\napi.interceptors.response.use(\n  response => response,\n  error => {\n    if (error.response?.status === 401) {\n      // Redirect to login\n      window.location.href = "/login";\n    }\n    return Promise.reject(error);\n  }\n);\n\n// API service\nexport const userAPI = {\n  getAll: () => api.get("/users"),\n  getById: (id: number) => api.get(`/users/${id}`),\n  create: (data: any) => api.post("/users", data),\n  update: (id: number, data: any) => api.put(`/users/${id}`, data),\n  delete: (id: number) => api.delete(`/users/${id}`)\n};\n\n// Usage in component\nimport { userAPI } from "./api/client";\n\nfunction Users() {\n  const [users, setUsers] = useState([]);\n  const [error, setError] = useState(null);\n  \n  useEffect(() => {\n    userAPI.getAll()\n      .then(res => setUsers(res.data))\n      .catch(err => setError(err.message));\n  }, []);\n  \n  if (error) return <p>Error: {error}</p>;\n  return <div>{users.map(u => <p key={u.id}>{u.name}</p>)}</div>;\n}'
    },
    {
      title: 'Authentication Flow',
      description: 'Implement complete authentication: login/signup forms, JWT token storage, protected routes, auth context, automatic token refresh, and logout functionality.',
      syntax: 'Context API + localStorage + protected routes',
      usage: 'Build secure auth systems',
      code: 'import { createContext, useContext, useState, useEffect } from "react";\nimport { Navigate } from "react-router-dom";\n\nconst AuthContext = createContext(null);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    const token = localStorage.getItem("token");\n    if (token) {\n      // Verify token and get user\n      fetch("/api/me", {\n        headers: { Authorization: `Bearer ${token}` }\n      })\n        .then(res => res.json())\n        .then(setUser)\n        .finally(() => setLoading(false));\n    } else {\n      setLoading(false);\n    }\n  }, []);\n  \n  const login = async (email, password) => {\n    const res = await fetch("/api/login", {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify({ email, password })\n    });\n    const data = await res.json();\n    localStorage.setItem("token", data.token);\n    setUser(data.user);\n  };\n  \n  const logout = () => {\n    localStorage.removeItem("token");\n    setUser(null);\n  };\n  \n  return (\n    <AuthContext.Provider value={{ user, login, logout, loading }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nexport const useAuth = () => useContext(AuthContext);\n\n// Protected route\nfunction ProtectedRoute({ children }) {\n  const { user, loading } = useAuth();\n  \n  if (loading) return <div>Loading...</div>;\n  if (!user) return <Navigate to="/login" />;\n  \n  return children;\n}\n\n// Usage\nfunction App() {\n  return (\n    <AuthProvider>\n      <Routes>\n        <Route path="/login" element={<Login />} />\n        <Route path="/dashboard" element={\n          <ProtectedRoute>\n            <Dashboard />\n          </ProtectedRoute>\n        } />\n      </Routes>\n    </AuthProvider>\n  );\n}'
    },
    {
      title: 'Building for Production',
      description: 'Prepare your React app for production: optimize bundle size, enable minification, configure environment variables, set up error tracking, and deploy to hosting platforms.',
      syntax: 'npm run build, .env files, deployment',
      usage: 'Deploy production-ready apps',
      code: '// Environment variables (.env)\nREACT_APP_API_URL=https://api.myapp.com\nREACT_APP_GA_ID=UA-XXXXXXXXX-X\n\n// Usage in code\nconst API_URL = process.env.REACT_APP_API_URL;\n\n// package.json scripts\n{\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "preview": "vite preview",\n    "analyze": "vite-bundle-visualizer"\n  }\n}\n\n// Build optimization - vite.config.js\nimport { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({\n  plugins: [react()],\n  build: {\n    minify: "terser",\n    sourcemap: false,\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          vendor: ["react", "react-dom"],\n          router: ["react-router-dom"]\n        }\n      }\n    }\n  }\n});\n\n// Deploy commands\n// Vercel: vercel --prod\n// Netlify: netlify deploy --prod\n// GitHub Pages: npm run build && gh-pages -d build'
    },
    {
      title: 'Accessibility (a11y)',
      description: 'Build accessible React apps: use semantic HTML, ARIA attributes, keyboard navigation, focus management, screen reader support, and test with accessibility tools.',
      syntax: 'aria-label, role, tabIndex, semantic HTML',
      usage: 'Make apps usable for everyone',
      code: 'import { useRef, useEffect } from "react";\n\n// Semantic HTML & ARIA\nfunction AccessibleButton() {\n  return (\n    <button\n      aria-label="Close dialog"\n      aria-pressed="false"\n      onClick={handleClose}\n    >\n      ×\n    </button>\n  );\n}\n\n// Skip to main content\nfunction Header() {\n  return (\n    <header>\n      <a href="#main-content" className="skip-link">Skip to main content</a>\n      <nav aria-label="Main navigation">\n        {/* navigation items */}\n      </nav>\n    </header>\n  );\n}\n\n// Focus management\nfunction Modal({ isOpen, onClose }) {\n  const closeButtonRef = useRef(null);\n  \n  useEffect(() => {\n    if (isOpen) {\n      closeButtonRef.current?.focus();\n    }\n  }, [isOpen]);\n  \n  if (!isOpen) return null;\n  \n  return (\n    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">\n      <h2 id="modal-title">Modal Title</h2>\n      <button ref={closeButtonRef} onClick={onClose}>Close</button>\n    </div>\n  );\n}\n\n// Form accessibility\nfunction AccessibleForm() {\n  return (\n    <form>\n      <label htmlFor="email">Email</label>\n      <input\n        id="email"\n        type="email"\n        aria-required="true"\n        aria-invalid="false"\n        aria-describedby="email-error"\n      />\n      <span id="email-error" role="alert">Invalid email format</span>\n    </form>\n  );\n}'
    },
    {
      title: 'React 18 Features',
      description: 'React 18 introduces automatic batching, Transitions for non-urgent updates, Suspense improvements, concurrent rendering, and the new useId, useTransition, and useDeferredValue hooks.',
      syntax: 'useTransition, useDeferredValue, Suspense',
      usage: 'Use latest React features',
      code: 'import { useState, useTransition, useDeferredValue, Suspense } from "react";\n\n// useTransition - mark updates as non-urgent\nfunction SearchResults() {\n  const [query, setQuery] = useState("");\n  const [isPending, startTransition] = useTransition();\n  \n  const handleChange = (e) => {\n    // Urgent: update input\n    setQuery(e.target.value);\n    \n    // Non-urgent: search\n    startTransition(() => {\n      // Heavy search operation\n      performSearch(e.target.value);\n    });\n  };\n  \n  return (\n    <div>\n      <input value={query} onChange={handleChange} />\n      {isPending && <p>Searching...</p>}\n      <Results />\n    </div>\n  );\n}\n\n// useDeferredValue - defer expensive renders\nfunction SearchList({ query }) {\n  const deferredQuery = useDeferredValue(query);\n  const results = search(deferredQuery);\n  \n  return (\n    <ul>\n      {results.map(item => <li key={item.id}>{item.name}</li>)}\n    </ul>\n  );\n}\n\n// Suspense for data fetching\nfunction Profile({ userId }) {\n  return (\n    <Suspense fallback={<Loading />}>\n      <UserData userId={userId} />\n      <UserPosts userId={userId} />\n    </Suspense>\n  );\n}'
    },
    {
      title: 'SEO & Meta Tags',
      description: 'Optimize React apps for search engines: use React Helmet for dynamic meta tags, implement server-side rendering, create sitemaps, and use semantic HTML.',
      syntax: 'React Helmet, meta tags, SSR',
      usage: 'Improve search engine visibility',
      code: 'import { Helmet } from "react-helmet-async";\n\nfunction ProductPage({ product }) {\n  return (\n    <>\n      <Helmet>\n        <title>{product.name} - My Store</title>\n        <meta name="description" content={product.description} />\n        <meta property="og:title" content={product.name} />\n        <meta property="og:description" content={product.description} />\n        <meta property="og:image" content={product.image} />\n        <meta property="og:url" content={`https://mystore.com/products/${product.id}`} />\n        <meta name="twitter:card" content="summary_large_image" />\n        <link rel="canonical" href={`https://mystore.com/products/${product.id}`} />\n      </Helmet>\n      \n      <article itemScope itemType="https://schema.org/Product">\n        <h1 itemProp="name">{product.name}</h1>\n        <p itemProp="description">{product.description}</p>\n        <span itemProp="price">${product.price}</span>\n      </article>\n    </>\n  );\n}\n\n// App wrapper\nimport { HelmetProvider } from "react-helmet-async";\n\nfunction App() {\n  return (\n    <HelmetProvider>\n      <Routes>\n        <Route path="/products/:id" element={<ProductPage />} />\n      </Routes>\n    </HelmetProvider>\n  );\n}'
    },
    {
      title: 'Progressive Web App (PWA)',
      description: 'Convert React apps to PWAs for offline support, installability, and native-like experience. Configure service worker, manifest, and caching strategies.',
      syntax: 'manifest.json, service worker, workbox',
      usage: 'Build installable web apps',
      code: '// public/manifest.json\n{\n  "short_name": "MyApp",\n  "name": "My React App",\n  "icons": [\n    {\n      "src": "icon-192.png",\n      "sizes": "192x192",\n      "type": "image/png"\n    },\n    {\n      "src": "icon-512.png",\n      "sizes": "512x512",\n      "type": "image/png"\n    }\n  ],\n  "start_url": "/",\n  "display": "standalone",\n  "theme_color": "#000000",\n  "background_color": "#ffffff"\n}\n\n// index.html\n<link rel="manifest" href="/manifest.json" />\n<meta name="theme-color" content="#000000" />\n\n// Register service worker (index.tsx)\nimport * as serviceWorkerRegistration from "./serviceWorkerRegistration";\n\nserviceWorkerRegistration.register({\n  onSuccess: () => console.log("PWA installed"),\n  onUpdate: () => console.log("New version available")\n});\n\n// Install prompt\nfunction InstallPrompt() {\n  const [deferredPrompt, setDeferredPrompt] = useState(null);\n  \n  useEffect(() => {\n    window.addEventListener("beforeinstallprompt", (e) => {\n      e.preventDefault();\n      setDeferredPrompt(e);\n    });\n  }, []);\n  \n  const handleInstall = async () => {\n    if (deferredPrompt) {\n      deferredPrompt.prompt();\n      const { outcome } = await deferredPrompt.userChoice;\n      setDeferredPrompt(null);\n    }\n  };\n  \n  return deferredPrompt && (\n    <button onClick={handleInstall}>Install App</button>\n  );\n}'
    },
    {
      title: 'Animations with Framer Motion',
      description: 'Create smooth, production-ready animations using Framer Motion. Animate presence, gestures, layout changes, and create complex animation sequences.',
      syntax: '<motion.div animate={{ }} transition={{ }}>',
      usage: 'Add professional animations',
      code: 'import { motion, AnimatePresence } from "framer-motion";\nimport { useState } from "react";\n\n// Basic animation\nfunction FadeIn() {\n  return (\n    <motion.div\n      initial={{ opacity: 0, y: 20 }}\n      animate={{ opacity: 1, y: 0 }}\n      transition={{ duration: 0.5 }}\n    >\n      Hello World\n    </motion.div>\n  );\n}\n\n// Hover and tap\nfunction Button() {\n  return (\n    <motion.button\n      whileHover={{ scale: 1.1 }}\n      whileTap={{ scale: 0.95 }}\n      transition={{ type: "spring", stiffness: 400 }}\n    >\n      Click me\n    </motion.button>\n  );\n}\n\n// Animate presence\nfunction Modal() {\n  const [isOpen, setIsOpen] = useState(false);\n  \n  return (\n    <div>\n      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>\n      <AnimatePresence>\n        {isOpen && (\n          <motion.div\n            initial={{ opacity: 0, scale: 0.8 }}\n            animate={{ opacity: 1, scale: 1 }}\n            exit={{ opacity: 0, scale: 0.8 }}\n            className="modal"\n          >\n            Modal Content\n          </motion.div>\n        )}\n      </AnimatePresence>\n    </div>\n  );\n}\n\n// Stagger children\nfunction List() {\n  const items = ["Item 1", "Item 2", "Item 3"];\n  \n  return (\n    <motion.ul\n      initial="hidden"\n      animate="visible"\n      variants={{\n        visible: { transition: { staggerChildren: 0.1 } }\n      }}\n    >\n      {items.map((item, i) => (\n        <motion.li\n          key={i}\n          variants={{\n            hidden: { opacity: 0, x: -20 },\n            visible: { opacity: 1, x: 0 }\n          }}\n        >\n          {item}\n        </motion.li>\n      ))}\n    </motion.ul>\n  );\n}'
    },
    {
      title: 'Real-World Project - Dashboard',
      description: 'Build a complete admin dashboard with authentication, data tables, charts, forms, and API integration. Apply all React concepts learned in a production-ready application.',
      syntax: 'Full React application',
      usage: 'Practice building complete apps',
      code: '// Dashboard.jsx - Main Component\nimport { useState, useEffect } from "react";\nimport { useAuth } from "./auth/AuthContext";\nimport { Sidebar, Header, Card, Chart, Table } from "./components";\nimport { useQuery } from "@tanstack/react-query";\nimport { statsAPI, usersAPI } from "./api";\n\nfunction Dashboard() {\n  const { user } = useAuth();\n  const { data: stats } = useQuery(["stats"], statsAPI.getDashboard);\n  const { data: users, isLoading } = useQuery(["users"], usersAPI.getAll);\n  \n  return (\n    <div className="dashboard">\n      <Sidebar />\n      <main>\n        <Header user={user} />\n        \n        <div className="stats-grid">\n          <Card title="Total Users" value={stats?.totalUsers} />\n          <Card title="Revenue" value={`$${stats?.revenue}`} />\n          <Card title="Active" value={stats?.activeUsers} />\n        </div>\n        \n        <div className="charts">\n          <Chart data={stats?.chartData} type="line" />\n        </div>\n        \n        <div className="data-table">\n          <h2>Recent Users</h2>\n          <Table\n            data={users}\n            loading={isLoading}\n            columns={["name", "email", "role", "created"]}\n          />\n        </div>\n      </main>\n    </div>\n  );\n}\n\nexport default Dashboard;\n\n// Features:\n// - Authentication with protected routes\n// - Data fetching with React Query\n// - Responsive layout with CSS Grid/Flexbox\n// - Reusable components\n// - Charts with recharts or chart.js\n// - CRUD operations\n// - Form validation\n// - Error handling\n// - Loading states\n// - TypeScript types'
    },
    {
      title: 'Best Practices & Patterns',
      description: 'Follow React best practices: component composition, prop drilling solutions, folder structure, naming conventions, code splitting, error boundaries, and performance optimization.',
      syntax: 'Architecture patterns and conventions',
      usage: 'Write maintainable production code',
      code: '// Folder structure\n/src\n  /components\n    /Button\n      Button.tsx\n      Button.module.css\n      Button.test.tsx\n      index.ts\n  /pages\n    /Dashboard\n  /hooks\n    useAuth.ts\n    useFetch.ts\n  /context\n    AuthContext.tsx\n  /api\n    client.ts\n    users.ts\n  /utils\n    helpers.ts\n  /types\n    index.ts\n\n// Component patterns\n// 1. Container/Presentational\nfunction UserContainer() {\n  const { data } = useQuery(["users"]);\n  return <UserList users={data} />;\n}\n\nfunction UserList({ users }) {\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}\n\n// 2. Compound Components\nconst Tabs = ({ children }) => {\n  const [activeTab, setActiveTab] = useState(0);\n  return (\n    <TabsContext.Provider value={{ activeTab, setActiveTab }}>\n      {children}\n    </TabsContext.Provider>\n  );\n};\nTabs.List = TabList;\nTabs.Tab = Tab;\nTabs.Panel = TabPanel;\n\n// Usage: <Tabs><Tabs.List><Tabs.Tab>...</Tabs></Tabs>\n\n// 3. Render Props\nfunction DataFetcher({ url, render }) {\n  const { data, loading } = useFetch(url);\n  return render({ data, loading });\n}\n\n// Best Practices:\n// - Keep components small and focused\n// - Use TypeScript for type safety\n// - Write tests for critical logic\n// - Extract reusable logic into hooks\n// - Use composition over prop drilling\n// - Memoize expensive operations\n// - Handle loading and error states\n// - Use absolute imports\n// - Follow consistent naming'
    },
    {
      title: 'Next Steps',
      description: 'Continue your React journey: explore Next.js for SSR, React Native for mobile, advanced patterns, contribute to open source, build projects, and stay updated with React ecosystem.',
      syntax: 'Advanced topics and resources',
      usage: 'Keep learning and growing',
      code: '// Next Learning Paths:\n\n// 1. Framework Mastery\n// - Next.js (SSR, SSG, App Router)\n// - Remix (Full-stack React)\n// - Gatsby (Static sites)\n\n// 2. Mobile Development\n// - React Native\n// - Expo\n\n// 3. Advanced State\n// - Redux Toolkit\n// - Zustand\n// - Jotai\n// - Recoil\n\n// 4. Advanced Patterns\n// - Server Components\n// - Concurrent Features\n// - Micro-frontends\n// - Design systems\n\n// 5. Testing\n// - Unit testing (Jest, Vitest)\n// - Integration testing (RTL)\n// - E2E testing (Playwright, Cypress)\n\n// 6. Performance\n// - React DevTools Profiler\n// - Lighthouse\n// - Web Vitals\n// - Bundle analysis\n\n// Resources:\n// - Official React docs: react.dev\n// - React patterns: patterns.dev\n// - Frontend Masters courses\n// - Epic React by Kent C. Dodds\n// - React Newsletter\n// - Join React communities\n\n// Projects to Build:\n// - E-commerce site\n// - Social media clone\n// - Project management tool\n// - Real-time chat app\n// - Blog platform with CMS'
    }
  ];
}

function frameworkSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} builds UI with components, routing, and data fetching. Learn components, state, effects, routing, and deployment.`, syntax: 'components, props, state', usage: 'Create web apps', code: 'function App(){ return <h1>Hello</h1> }' },
    { title: 'Components and JSX', description: 'Pure components returning JSX/TSX.', syntax: 'function Component() { return <div/> }', usage: 'Reusable UI blocks', code: 'const Card = ({ title }) => <article>{title}</article>' },
    { title: 'Props and State', description: 'Pass data via props and manage local state.', syntax: 'props, useState', usage: 'Dynamic UI', code: 'const [count, setCount] = useState(0)' },
    { title: 'Effects and Data', description: 'Fetch data and sync side effects.', syntax: 'useEffect, data fetching', usage: 'Load remote data', code: 'useEffect(() => { fetch("/api").then(r=>r.json()).then(setData) }, [])' },
    { title: 'Routing', description: 'Create pages and nested layouts with file-based routing.', syntax: 'pages or app router', usage: 'Multi-page apps', code: 'export default function Page(){ return <h1>Home</h1> }' },
    { title: 'Forms and Validation', description: 'Controlled inputs, validation, and submission.', syntax: 'onChange, onSubmit', usage: 'Reliable forms', code: '<form onSubmit={handleSubmit}><input value={email} /></form>' },
    { title: 'Styling Options', description: 'CSS Modules, Tailwind, or styled-components.', syntax: 'className, css-in-js', usage: 'Component styling', code: '<button className="btn">Save</button>' },
    { title: 'State Management', description: 'Context, reducers, and query caches.', syntax: 'context, reducers', usage: 'Shared state', code: 'const UserContext = createContext(null)' },
    { title: 'Performance', description: 'Code-split, memoize, and defer heavy work.', syntax: 'lazy, memo, suspense', usage: 'Smooth UX', code: 'const Chart = React.lazy(() => import("./Chart"))' },
    { title: 'Accessibility', description: 'Semantic elements, aria attributes, focus traps.', syntax: 'aria-label, focus management', usage: 'Inclusive UI', code: '<button aria-expanded="false">Menu</button>' },
    { title: 'Testing', description: 'Test components with RTL/Vitest or Jest.', syntax: 'render, screen, expect', usage: 'Prevent regressions', code: 'render(<Button>Save</Button>)' },
    { title: 'Mini Project', description: 'Dashboard page with cards, list, and form.', syntax: 'components + routing', usage: 'Apply framework skills', code: '<DashboardPage />' },
  ]
}

// Next.js (40+ focused topics for App Router)
function nextSpecs(languageName: string): SectionSpec[] {
  const topics: SectionSpec[] = [
    { title: `${languageName} HOME`, description: `${languageName} combines React, file-system routing, and server-first rendering. Master the App Router, data fetching, caching, and deployment.`, syntax: 'app router, server/client components', usage: 'Build production web apps', code: 'export default function Page(){ return <h1>Welcome</h1> }' },
    { title: 'Project Setup', description: 'Create app router project, TypeScript, ESLint, Tailwind.', syntax: 'npx create-next-app', usage: 'Start quickly', code: 'npx create-next-app@latest my-app' },
    { title: 'App Directory and Routing', description: 'File-system routing with app/; folders become routes.', syntax: 'app/page.tsx, app/blog/page.tsx', usage: 'Define routes', code: 'export default function Page(){ return <main>Home</main> }' },
    { title: 'Layouts and Templates', description: 'Persistent chrome with layout.tsx and optional templates.', syntax: 'layout.tsx', usage: 'Shared UI', code: 'export default function RootLayout({ children }){ return <html><body>{children}</body></html> }' },
    { title: 'Server Components', description: 'Default rendering mode; fetch data without client JS.', syntax: 'async function Page()', usage: 'Fast defaults', code: 'export default async function Page(){ const data = await fetch(api).then(r=>r.json()); return <pre>{JSON.stringify(data)}</pre> }' },
    { title: 'Client Components', description: 'Opt into client with "use client" for state/effects.', syntax: '"use client"', usage: 'Interactive UI', code: '"use client"\nexport function Counter(){ const [n,setN]=useState(0); return <button onClick={()=>setN(n+1)}>{n}</button>; }' },
    { title: 'Route Groups', description: 'Group routes without affecting URL.', syntax: '(marketing)/page.tsx', usage: 'Organize routes', code: 'app/(marketing)/page.tsx' },
    { title: 'Dynamic Routes', description: 'Capture params with [slug] and generateStaticParams.', syntax: 'app/blog/[slug]/page.tsx', usage: 'Param pages', code: 'export function generateStaticParams(){ return [{ slug: "hello" }] }' },
    { title: 'Catch-All and Optional Segments', description: 'Use [...slug] and [[...slug]] for flexible paths.', syntax: '[...slug]', usage: 'Nested segments', code: 'export default function Page({ params }){ return <div>{params.slug?.join("/")}</div> }' },
    { title: 'Parallel Routes', description: 'Render multiple segments in parallel slots.', syntax: '(@slot)/page.tsx', usage: 'Complex UIs', code: 'app/(dashboard)/@metrics/page.tsx' },
    { title: 'Intercepting Routes', description: 'Intercept navigation for modals/sheets.', syntax: '(..)segment', usage: 'Modal routes', code: 'app/feed/(..)profile/page.tsx' },
    { title: 'Loading and Error UI', description: 'Use loading.tsx and error.tsx for skeletons and boundaries.', syntax: 'loading.tsx, error.tsx', usage: 'Better UX', code: 'export default function Loading(){ return <p>Loading...</p> }' },
    { title: 'Not Found Handling', description: 'Customize 404 with not-found.tsx.', syntax: 'not-found.tsx', usage: 'Error UX', code: 'export default function NotFound(){ return <h1>Not Found</h1> }' },
    { title: 'Metadata', description: 'Set titles, descriptions, and Open Graph via metadata export.', syntax: 'export const metadata', usage: 'SEO', code: 'export const metadata = { title: "Home", description: "Landing" }' },
    { title: 'Link and Navigation', description: 'Use next/link, useRouter, and prefetching.', syntax: '<Link href="/about">', usage: 'Navigate fast', code: 'import Link from "next/link"' },
    { title: 'Images and Fonts', description: 'Optimize with next/image and next/font.', syntax: '<Image>, localFont()', usage: 'Fast assets', code: 'import Image from "next/image"; <Image src="/hero.png" alt="" width={800} height={600} />' },
    { title: 'Data Fetching (Fetch API)', description: 'Use fetch with caching and revalidation options.', syntax: 'fetch(url, { cache, next })', usage: 'Load data', code: 'await fetch(api, { next: { revalidate: 60 } })' },
    { title: 'Data Fetching (Server Actions)', description: 'Mutate on the server with form actions.', syntax: '"use server"', usage: 'Secure mutations', code: '"use server"\nexport async function save(formData){ /* db write */ }' },
    { title: 'Data Fetching (Route Handlers)', description: 'Create API endpoints in app/api/*.', syntax: 'app/api/route.ts', usage: 'APIs', code: 'export async function GET(){ return Response.json({ ok: true }) }' },
    { title: 'Revalidation and Cache', description: 'ISR, cache: no-store, revalidate paths.', syntax: 'revalidatePath, cache modes', usage: 'Fresh data', code: 'import { revalidatePath } from "next/cache"' },
    { title: 'Mutations and Forms', description: 'Progressive enhancement with forms and server actions.', syntax: '<form action={action}>', usage: 'Submit securely', code: '<form action={createPost}><input name="title" /><button>Save</button></form>' },
    { title: 'Streaming and Suspense', description: 'Stream data to the client with suspense boundaries.', syntax: '<Suspense>', usage: 'Fast time-to-first-byte', code: '<Suspense fallback={<p>Loading</p>}><Comments /></Suspense>' },
    { title: 'Middleware', description: 'Edge middleware for auth, redirects, rewrites.', syntax: 'middleware.ts', usage: 'Request control', code: 'export function middleware(req){ return NextResponse.next() }' },
    { title: 'Edge and Runtime', description: 'Choose nodejs or edge runtimes per route.', syntax: 'export const runtime', usage: 'Performance/runtime', code: 'export const runtime = "edge"' },
    { title: 'Env and Secrets', description: 'Load env vars, public vs server-only, type safety.', syntax: 'process.env, NEXT_PUBLIC_', usage: 'Config', code: 'const key = process.env.API_KEY' },
    { title: 'Authentication', description: 'Protect routes with middleware or libraries (NextAuth/Auth.js).', syntax: 'middleware, cookies', usage: 'Secure pages', code: 'cookies().get("session")' },
    { title: 'Authorization', description: 'Role-based UI and server checks.', syntax: 'guards in server actions', usage: 'Least privilege', code: 'if(!user?.role){ throw new Error("unauthorized") }' },
    { title: 'State Management', description: 'Server first; use client state sparingly with context or Zustand.', syntax: 'context, Zustand', usage: 'Shared client state', code: 'const useStore = create(set => ({ count: 0 }))' },
    { title: 'Styling Strategies', description: 'CSS Modules, Tailwind, CSS-in-JS, and design tokens.', syntax: 'module.css, tailwind', usage: 'Consistent UI', code: 'import styles from "./page.module.css"' },
    { title: 'Internationalization', description: 'Route-based locales, metadata localization.', syntax: 'i18n config', usage: 'Localized UX', code: 'export const metadata = { title: { default: "Home", template: "%s | Site" } }' },
    { title: 'Accessibility', description: 'Semantic HTML, focus management, skip links.', syntax: 'aria, landmarks', usage: 'Inclusive UX', code: '<a href="#main" className="sr-only">Skip to content</a>' },
    { title: 'Testing', description: 'Component tests with RTL, integration with Playwright.', syntax: 'vitest/jest + playwright', usage: 'Confidence', code: 'import { render } from "@testing-library/react"' },
    { title: 'Performance and Profiling', description: 'Analyze with Lighthouse and React profiler; tune caching.', syntax: 'profile, cache, headers', usage: 'Fast pages', code: 'export const dynamic = "force-dynamic"' },
    { title: 'Observability', description: 'Logging, metrics, tracing with Next instrumentation.', syntax: 'instrumentation.ts', usage: 'Operate safely', code: 'export async function register() { /* tracing init */ }' },
    { title: 'Security and Headers', description: 'CSP, SRI, HTTPS, secure cookies.', syntax: 'next.config headers()', usage: 'Harden app', code: 'async headers(){ return [{ source: "/(.*)", headers: [{ key: "Content-Security-Policy", value: "default-src \'self\'" }] }] }' },
    { title: 'File Uploads', description: 'Handle uploads via route handlers and edge limits.', syntax: 'FormData, blobs', usage: 'Receive files', code: 'const data = await req.formData();' },
    { title: 'Image Optimization', description: 'Remote patterns, loaders, and caching for images.', syntax: 'next.config images', usage: 'Fast media', code: 'images: { remotePatterns: [{ hostname: "images.example.com" }] }' },
    { title: 'Fonts and Icons', description: 'Use next/font and icon sets for performance.', syntax: 'localFont, GoogleFont', usage: 'Consistent type', code: 'const Inter = localFont({ src: "./Inter.woff2" })' },
    { title: 'Analytics', description: 'Integrate privacy-friendly analytics.', syntax: 'layout scripts', usage: 'Measure usage', code: '<Script src="https://analytics" />' },
    { title: 'Deploy and Preview', description: 'Vercel deploys, preview branches, environment promotion.', syntax: 'vercel --prod', usage: 'Ship safely', code: 'vercel --prod' },
    { title: 'CI/CD', description: 'Automate lint, type-check, and build.', syntax: 'github actions', usage: 'Quality gates', code: 'name: CI\non: [push]\njobs: { build: { runs-on: ubuntu-latest } }' },
    { title: 'Troubleshooting', description: 'Common build/runtime errors, cache busting, and dependency fixes.', syntax: 'log, clear cache', usage: 'Stability', code: '// next build --debug' },
  ]
  return topics
}

// Vue 3 (40+ topics)
function vueSpecs(languageName: string): SectionSpec[] {
  const topics: SectionSpec[] = [
    { title: `${languageName} HOME`, description: `${languageName} uses the Composition API for reactive UIs. Learn templates, reactivity, routing, state, testing, and deployment.`, syntax: 'Composition API, SFCs', usage: 'Build SPAs/MPAs', code: '<template><h1>Hello</h1></template>' },
    { title: 'Project Setup', description: 'Create Vite-based Vue project with TypeScript and ESLint.', syntax: 'npm create vue@latest', usage: 'Start quickly', code: 'npm create vue@latest my-app' },
    { title: 'Single File Components', description: 'Organize template, script, and style in .vue files.', syntax: '<template><script setup>', usage: 'Component structure', code: '<template><div>{{ msg }}</div></template>' },
    { title: 'Template Syntax', description: 'Interpolations, directives, and safe rendering.', syntax: '{{ }} v-if v-for', usage: 'Render data', code: '<p>{{ user.name }}</p>' },
    { title: 'Reactivity Fundamentals', description: 'refs, reactive, shallowRef, readonly.', syntax: 'ref(), reactive()', usage: 'Track state', code: 'const count = ref(0)' },
    { title: 'Computed Properties', description: 'Derived state with caching.', syntax: 'computed()', usage: 'Avoid recalculation', code: 'const doubled = computed(() => count.value * 2)' },
    { title: 'Watchers', description: 'Watch state and run side effects.', syntax: 'watch, watchEffect', usage: 'React to changes', code: 'watch(count, (n) => console.log(n))' },
    { title: 'Lifecycle Hooks', description: 'onMounted, onUnmounted, onUpdated.', syntax: 'onMounted()', usage: 'Resource management', code: 'onMounted(() => fetchData())' },
    { title: 'Props and Emits', description: 'Define props with types and emit events.', syntax: 'defineProps, defineEmits', usage: 'Parent-child data flow', code: 'const props = defineProps<{ title: string }>()' },
    { title: 'Slots and Composition', description: 'Default, named, scoped slots.', syntax: '<slot>', usage: 'Flexible children', code: '<slot name="actions"></slot>' },
    { title: 'Forms and v-model', description: 'Two-way binding with modifiers.', syntax: 'v-model.trim', usage: 'Form handling', code: '<input v-model="email" />' },
    { title: 'Directives', description: 'Built-ins (v-if, v-for) and custom directives.', syntax: 'v-if, v-for, custom', usage: 'DOM control', code: 'app.directive("focus", { mounted(el){ el.focus() } })' },
    { title: 'Conditional and List Rendering', description: 'v-if vs v-show, keying lists.', syntax: 'v-if, v-show, :key', usage: 'Efficient rendering', code: '<li v-for="item in items" :key="item.id">{{ item.name }}</li>' },
    { title: 'Transitions and Animations', description: 'Use <Transition> and <TransitionGroup>.', syntax: '<Transition>', usage: 'Motion', code: '<Transition name="fade"><div v-if="open">Panel</div></Transition>' },
    { title: 'Provide/Inject', description: 'Share data down the tree without prop drilling.', syntax: 'provide, inject', usage: 'Dependency sharing', code: 'provide("theme", themeRef)' },
    { title: 'Composables', description: 'Reusable logic with composition functions.', syntax: 'useX composables', usage: 'Share logic', code: 'export function useCounter(){ const n=ref(0); return { n, inc: ()=>n.value++ } }' },
    { title: 'Routing Basics', description: 'vue-router setup, routes array, router-view.', syntax: 'createRouter, createWebHistory', usage: 'Navigation', code: 'const router = createRouter({ history: createWebHistory(), routes })' },
    { title: 'Dynamic and Nested Routes', description: 'Params, children, guards.', syntax: ':id, children, beforeEnter', usage: 'Deep routing', code: '{ path: "/users/:id", component: User }' },
    { title: 'Navigation Guards', description: 'Global, per-route, in-component guards.', syntax: 'beforeEach, beforeEnter', usage: 'Auth and checks', code: 'router.beforeEach((to,from,next)=>{ next() })' },
    { title: 'State Management with Pinia', description: 'Define stores, actions, getters.', syntax: 'defineStore', usage: 'Global state', code: 'export const useUser = defineStore("user", { state: ()=>({ user: null }) })' },
    { title: 'Async Data Fetching', description: 'Fetch in setup with suspensible requests.', syntax: 'fetch + suspense', usage: 'Remote data', code: 'const data = await $fetch("/api/users")' },
    { title: 'Error Handling', description: 'Handle errors with error boundaries and try/catch.', syntax: 'errorCaptured', usage: 'Resilience', code: 'onErrorCaptured((err)=>console.error(err))' },
    { title: 'Performance Tips', description: 'v-memo, lazy components, keep-alive, and devtools profiling.', syntax: '<KeepAlive>, defineAsyncComponent', usage: 'Smooth UX', code: '<KeepAlive><RouterView /></KeepAlive>' },
    { title: 'SSR and Hydration Basics', description: 'Intro to server rendering concepts.', syntax: 'createSSRApp', usage: 'SEO and speed', code: 'const app = createSSRApp(App)' },
    { title: 'Testing Components', description: 'Vitest + Vue Test Utils.', syntax: 'mount, expect', usage: 'Quality', code: 'const wrapper = mount(Component); expect(wrapper.text()).toContain("Hello")' },
    { title: 'TypeScript with Vue', description: 'Props typing, emits typing, and tooling.', syntax: 'defineProps<{ }>', usage: 'Type safety', code: 'const props = defineProps<{ id: string }>()' },
    { title: 'Accessibility', description: 'ARIA, focus traps, and keyboard navigation.', syntax: 'aria-*', usage: 'Inclusive UI', code: '<button aria-expanded="false">Menu</button>' },
    { title: 'Internationalization', description: 'vue-i18n basics for translations and locales.', syntax: 't("key")', usage: 'Localized UX', code: '{{ t("welcome") }}' },
    { title: 'Env and Configuration', description: 'Vite env files, public vs private vars.', syntax: 'import.meta.env', usage: 'Config', code: 'const api = import.meta.env.VITE_API_URL' },
    { title: 'HTTP Clients', description: 'Use fetch/axios with interceptors.', syntax: 'axios.create', usage: 'API integration', code: 'const api = axios.create({ baseURL: "/api" })' },
    { title: 'Forms and Validation', description: 'Custom validators, vee-validate/zod integration.', syntax: 'schema validation', usage: 'Data quality', code: 'const schema = z.object({ email: z.string().email() })' },
    { title: 'File Uploads', description: 'Handle file inputs and progress.', syntax: '<input type="file">', usage: 'Send files', code: 'const form = new FormData(); form.append("file", file)' },
    { title: 'Caching and Suspense', description: 'Cache responses and use suspense for UX.', syntax: 'suspense + cache', usage: 'Fewer spinners', code: '<Suspense><DataView/></Suspense>' },
    { title: 'Animations with Motion/GSAP', description: 'Animate enter/leave with libraries.', syntax: 'motion variants', usage: 'Delightful UI', code: '<Motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" />' },
    { title: 'Deployments', description: 'Build and deploy to Netlify/Vercel.', syntax: 'npm run build', usage: 'Ship app', code: 'npm run build && npm run preview' },
    { title: 'CI/CD', description: 'Automate lint, type-check, and tests.', syntax: 'github actions', usage: 'Quality gates', code: 'name: CI\non: [push]' },
    { title: 'Security Basics', description: 'Sanitize HTML, escape output, and handle auth tokens.', syntax: 'escape, cookies', usage: 'Safe apps', code: 'const sanitized = DOMPurify.sanitize(input)' },
    { title: 'Observability', description: 'Logging and error reporting with Sentry or similar.', syntax: 'captureException', usage: 'Monitor', code: 'Sentry.captureException(err)' },
    { title: 'PWA Essentials', description: 'Service worker, manifest, offline cache.', syntax: 'registerSW', usage: 'Offline UX', code: 'if ("serviceWorker" in navigator) { navigator.serviceWorker.register("/sw.js") }' },
    { title: 'Troubleshooting', description: 'Common template/reactivity mistakes and fixes.', syntax: 'devtools inspect', usage: 'Faster fixes', code: '// check reactive refs and unwrap when needed' },
  ]
  return topics
}

// Angular - Comprehensive 40+ lesson curriculum
function angularSpecs(languageName: string): SectionSpec[] {
  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    { title: `${languageName} HOME`, description: `${languageName} is a platform and framework for building single-page client applications using HTML, CSS, and TypeScript. Developed by Google, it provides a complete solution including routing, forms, HTTP client, and more.`, syntax: 'TypeScript, Components, Templates', usage: 'Build enterprise web apps', code: '@Component({\n  selector: "app-root",\n  template: `<h1>Hello Angular</h1>`\n})\nexport class AppComponent {}' },
    { title: `${languageName} Introduction`, description: `${languageName} uses TypeScript by default and follows the Model-View-Controller (MVC) pattern. It features dependency injection, decorators, RxJS for reactive programming, and a powerful CLI for scaffolding and building.`, syntax: 'ng new, ng serve', usage: 'Get started quickly', code: 'ng new my-app\ncd my-app\nng serve' },
    { title: `${languageName} Architecture`, description: `${languageName} apps are built with components organized into NgModules. Components define views with templates and logic. Services provide functionality via dependency injection. Modules bundle related components and services.`, syntax: 'Components, Modules, Services', usage: 'Understand structure', code: '@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {}' },
    { title: `${languageName} CLI`, description: `The Angular CLI provides commands for creating, building, testing, and deploying apps. Common commands: ng new (create app), ng serve (dev server), ng build (production build), ng generate (scaffold code), ng test (run tests).`, syntax: 'ng command', usage: 'Development workflow', code: 'ng generate component user-list\nng generate service user\nng build --configuration production\nng test' },
    { title: `${languageName} Setup`, description: `Install Node.js and npm, then install Angular CLI globally with npm install -g @angular/cli. Create a new project with ng new. Choose routing, stylesheet format (CSS/SCSS/Less), and other options during setup.`, syntax: 'npm install -g @angular/cli', usage: 'Initialize project', code: 'npm install -g @angular/cli\nng new my-app --routing --style=scss\ncd my-app\nng serve --open' },

    // BASICS (20 lessons)
    { title: `${languageName} Components`, description: `Components are the building blocks of Angular apps. Each component has a TypeScript class, HTML template, and CSS styles. Use @Component decorator to define metadata. Components have selectors for use in templates.`, syntax: '@Component({ selector, template, styles })', usage: 'Create UI elements', code: '@Component({\n  selector: "app-user",\n  template: `<div>{{ user.name }}</div>`,\n  styles: [`div { color: blue; }`]\n})\nexport class UserComponent {\n  user = { name: "Alice" };\n}' },
    { title: `${languageName} Templates`, description: `Templates are HTML with Angular syntax. Use interpolation {{ }} for data binding, *ngIf for conditionals, *ngFor for loops. Bind properties with [property], events with (event), two-way binding with [(ngModel)].`, syntax: '{{ }}, *ngIf, *ngFor, [ ], ( )', usage: 'Render dynamic UI', code: '<div *ngIf="isLoggedIn">\n  <h1>{{ title }}</h1>\n  <ul>\n    <li *ngFor="let item of items">{{ item }}</li>\n  </ul>\n  <button (click)="logout()">Logout</button>\n</div>' },
    { title: `${languageName} Data Binding`, description: `Angular provides four types of data binding: interpolation {{ }} for text, property binding [property]="value", event binding (event)="handler", and two-way binding [(ngModel)]="property". These keep UI in sync with component state.`, syntax: '{{ }}, [prop], (event), [(ngModel)]', usage: 'Sync data and UI', code: '<input [value]="name" (input)="name=$event.target.value">\n<input [(ngModel)]="name">\n<p>Hello, {{ name }}!</p>\n<button [disabled]="!name">Submit</button>' },
    { title: `${languageName} Directives`, description: `Directives add behavior to elements. Structural directives (*ngIf, *ngFor, *ngSwitch) change DOM structure. Attribute directives (ngClass, ngStyle, ngModel) change appearance or behavior. Create custom directives with @Directive.`, syntax: '*ngIf, *ngFor, ngClass, ngStyle', usage: 'Control templates', code: '<div *ngIf="show" [ngClass]="{\'active\': isActive}" [ngStyle]="{\'color\': textColor}">\n  <p *ngFor="let item of items; let i = index">{{ i }}: {{ item }}</p>\n</div>' },
    { title: `${languageName} Pipes`, description: `Pipes transform data in templates. Built-in pipes: date, uppercase, lowercase, currency, json, async. Chain pipes with |. Pass parameters with :. Create custom pipes with @Pipe and PipeTransform interface.`, syntax: '{{ value | pipe:param }}', usage: 'Format display data', code: '<p>{{ today | date:\'fullDate\' }}</p>\n<p>{{ price | currency:\'USD\' }}</p>\n<p>{{ name | uppercase }}</p>\n<p>{{ data$ | async }}</p>' },
    { title: `${languageName} Services`, description: `Services encapsulate reusable logic and data. Use @Injectable decorator to make services injectable. Services are singletons by default when provided in root. Inject services via constructor parameters.`, syntax: '@Injectable({ providedIn: "root" })', usage: 'Share logic and data', code: '@Injectable({ providedIn: "root" })\nexport class UserService {\n  getUsers() {\n    return [{id: 1, name: "Alice"}];\n  }\n}\n\n// In component\nconstructor(private userService: UserService) {}' },
    { title: `${languageName} Dependency Injection`, description: `Angular\'s DI system provides dependencies to classes. Inject services via constructor. Configure providers in @Injectable, @Component, or @NgModule. Use hierarchical injection for different scopes.`, syntax: 'constructor(private service: Service)', usage: 'Manage dependencies', code: 'export class AppComponent {\n  users: User[];\n  \n  constructor(private userService: UserService) {\n    this.users = this.userService.getUsers();\n  }\n}' },
    { title: `${languageName} Lifecycle Hooks`, description: `Lifecycle hooks let you tap into key moments: ngOnInit (initialization), ngOnChanges (input changes), ngOnDestroy (cleanup), ngAfterViewInit (view ready), ngDoCheck (custom change detection). Implement corresponding interfaces.`, syntax: 'ngOnInit(), ngOnDestroy()', usage: 'Component lifecycle management', code: 'export class MyComponent implements OnInit, OnDestroy {\n  ngOnInit() {\n    console.log("Component initialized");\n  }\n  \n  ngOnDestroy() {\n    console.log("Component destroyed");\n  }\n}' },
    { title: `${languageName} Input and Output`, description: `@Input() receives data from parent components. @Output() emits events to parent via EventEmitter. This enables parent-child communication. Use property binding for inputs, event binding for outputs.`, syntax: '@Input(), @Output()', usage: 'Component communication', code: 'export class ChildComponent {\n  @Input() title: string;\n  @Output() delete = new EventEmitter<void>();\n  \n  onDelete() {\n    this.delete.emit();\n  }\n}\n\n// Parent template\n<app-child [title]="name" (delete)="handleDelete()"></app-child>' },
    { title: `${languageName} Forms - Template-Driven`, description: `Template-driven forms use directives in templates. Import FormsModule. Use ngModel for two-way binding. Access form with #formRef="ngForm". Validation with required, minlength, pattern attributes.`, syntax: 'ngModel, #ref="ngForm"', usage: 'Simple forms', code: '<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">\n  <input name="email" ngModel required email>\n  <button [disabled]="!userForm.valid">Submit</button>\n</form>' },
    { title: `${languageName} Forms - Reactive`, description: `Reactive forms use FormControl, FormGroup, FormBuilder. Import ReactiveFormsModule. Define form in component class. More powerful validation and testing. Use formControlName, formGroup in template.`, syntax: 'FormControl, FormGroup, FormBuilder', usage: 'Complex forms', code: 'form = new FormGroup({\n  email: new FormControl(\'\', [Validators.required, Validators.email]),\n  password: new FormControl(\'\', [Validators.minLength(6)])\n});\n\n// Template\n<form [formGroup]="form" (ngSubmit)="onSubmit()">\n  <input formControlName="email">\n</form>' },
    { title: `${languageName} Routing Basics`, description: `Angular Router enables navigation between views. Define routes with Routes array. Use RouterModule.forRoot(). <router-outlet> displays routed components. Navigate with routerLink directive or Router service.`, syntax: 'Routes, RouterModule, router-outlet', usage: 'Multi-page apps', code: 'const routes: Routes = [\n  { path: \'\', component: HomeComponent },\n  { path: \'users\', component: UsersComponent },\n  { path: \'users/:id\', component: UserDetailComponent }\n];\n\n// Template\n<a routerLink="/users">Users</a>\n<router-outlet></router-outlet>' },
    { title: `${languageName} Route Parameters`, description: `Access route parameters with ActivatedRoute. Use snapshot for one-time access or observable for reactive updates. Query parameters with queryParams. Navigate programmatically with Router.navigate().`, syntax: 'ActivatedRoute, params, queryParams', usage: 'Dynamic routing', code: 'constructor(private route: ActivatedRoute, private router: Router) {}\n\nngOnInit() {\n  const id = this.route.snapshot.paramMap.get(\'id\');\n  // or\n  this.route.params.subscribe(params => {\n    const id = params[\'id\'];\n  });\n}' },
    { title: `${languageName} Route Guards`, description: `Route guards control navigation. CanActivate prevents unauthorized access. CanDeactivate prevents leaving with unsaved changes. Resolve pre-fetches data. CanLoad lazy-loads modules conditionally.`, syntax: 'CanActivate, CanDeactivate, Resolve', usage: 'Protect routes', code: '@Injectable({ providedIn: \'root\' })\nexport class AuthGuard implements CanActivate {\n  canActivate(route: ActivatedRouteSnapshot): boolean {\n    // check auth\n    return this.authService.isLoggedIn();\n  }\n}\n\n// Route\n{ path: \'admin\', component: AdminComponent, canActivate: [AuthGuard] }' },
    { title: `${languageName} HTTP Client`, description: `HttpClient makes HTTP requests. Import HttpClientModule. Inject HttpClient. Returns Observables. Methods: get(), post(), put(), delete(). Use pipe() with RxJS operators. Handle errors with catchError.`, syntax: 'HttpClient, get(), post()', usage: 'API communication', code: 'constructor(private http: HttpClient) {}\n\ngetUsers() {\n  return this.http.get<User[]>(\'/api/users\')\n    .pipe(\n      catchError(error => {\n        console.error(error);\n        return of([]);\n      })\n    );\n}' },
    { title: `${languageName} Observables and RxJS`, description: `RxJS provides reactive programming with Observables. Common operators: map (transform), filter (select), tap (side effects), switchMap (switch streams), combineLatest (combine). Subscribe to consume values. Unsubscribe in ngOnDestroy.`, syntax: 'Observable, pipe(), operators', usage: 'Reactive data streams', code: 'this.users$ = this.http.get<User[]>(\'/api/users\')\n  .pipe(\n    map(users => users.filter(u => u.active)),\n    tap(users => console.log(users))\n  );\n\n// Template\n<div *ngFor="let user of users$ | async">{{ user.name }}</div>' },
    { title: `${languageName} Modules`, description: `NgModules organize apps into cohesive blocks. @NgModule decorator with declarations (components), imports (other modules), providers (services), exports (public API), bootstrap (root component). Feature modules separate concerns.`, syntax: '@NgModule({ declarations, imports })', usage: 'Code organization', code: '@NgModule({\n  declarations: [UserListComponent, UserDetailComponent],\n  imports: [CommonModule, RouterModule],\n  exports: [UserListComponent],\n  providers: [UserService]\n})\nexport class UserModule {}' },
    { title: `${languageName} Lazy Loading`, description: `Lazy loading loads feature modules on demand, reducing initial bundle size. Use loadChildren in routes. Modules have their own routing. Improves performance for large apps.`, syntax: 'loadChildren, RouterModule.forChild()', usage: 'Performance optimization', code: '// App routing\nconst routes: Routes = [\n  { path: \'admin\', loadChildren: () => import(\'./admin/admin.module\').then(m => m.AdminModule) }\n];\n\n// Admin module routing\nconst routes: Routes = [\n  { path: \'\', component: AdminDashboardComponent }\n];' },
    { title: `${languageName} Component Styles`, description: `Component styles are encapsulated by default (emulated view encapsulation). Styles in @Component only affect that component. Use :host for component itself, ::ng-deep to penetrate child components. Global styles in styles.css.`, syntax: 'styles, styleUrls, ViewEncapsulation', usage: 'Style components', code: '@Component({\n  selector: \'app-user\',\n  template: `<div class="card">{{ name }}</div>`,\n  styles: [`\n    :host { display: block; }\n    .card { padding: 1rem; background: #f0f0f0; }\n  `]\n})' },
    { title: `${languageName} ViewChild and ContentChild`, description: `@ViewChild accesses child components, directives, or elements in template. @ContentChild accesses projected content. Use for direct DOM access or calling child methods. Access in ngAfterViewInit.`, syntax: '@ViewChild, @ContentChild', usage: 'Access child elements', code: 'export class ParentComponent implements AfterViewInit {\n  @ViewChild(ChildComponent) child!: ChildComponent;\n  \n  ngAfterViewInit() {\n    this.child.doSomething();\n  }\n}' },
    { title: `${languageName} Content Projection`, description: `Content projection (ng-content) passes content into components. Use <ng-content> in template to project content. Named slots with select attribute. Multi-slot projection for complex layouts.`, syntax: '<ng-content>, select', usage: 'Flexible component layouts', code: '// Component\n@Component({\n  template: `\n    <div class="header"><ng-content select="[header]"></ng-content></div>\n    <div class="body"><ng-content></ng-content></div>\n  `\n})\n\n// Usage\n<app-card>\n  <h1 header>Title</h1>\n  <p>Content</p>\n</app-card>' },

    // INTERMEDIATE (10 lessons)
    { title: `${languageName} Change Detection`, description: `Angular checks for changes and updates view. Default strategy checks all components. OnPush strategy checks only when inputs change or events fire. Use ChangeDetectorRef for manual control. Improves performance.`, syntax: 'ChangeDetectionStrategy, markForCheck()', usage: 'Optimize rendering', code: '@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush\n})\nexport class MyComponent {\n  constructor(private cdr: ChangeDetectorRef) {}\n  \n  refresh() {\n    this.cdr.markForCheck();\n  }\n}' },
    { title: `${languageName} Interceptors`, description: `HTTP interceptors intercept requests and responses. Use for auth tokens, error handling, logging. Implement HttpInterceptor interface. Provide in HTTP_INTERCEPTORS. Chain with next.handle().`, syntax: 'HttpInterceptor, intercept()', usage: 'Modify HTTP requests', code: '@Injectable()\nexport class AuthInterceptor implements HttpInterceptor {\n  intercept(req: HttpRequest<any>, next: HttpHandler) {\n    const authReq = req.clone({\n      headers: req.headers.set(\'Authorization\', \'Bearer token\')\n    });\n    return next.handle(authReq);\n  }\n}' },
    { title: `${languageName} Custom Pipes`, description: `Create custom pipes for data transformation. Implement PipeTransform with transform() method. Use @Pipe decorator with name. Pure pipes (default) for immutable data, impure pipes for mutable data.`, syntax: '@Pipe, PipeTransform', usage: 'Custom data formatting', code: '@Pipe({ name: \'truncate\' })\nexport class TruncatePipe implements PipeTransform {\n  transform(value: string, limit: number = 50): string {\n    return value.length > limit ? value.substring(0, limit) + \'...\' : value;\n  }\n}\n\n// Usage\n{{ longText | truncate:100 }}' },
    { title: `${languageName} Custom Directives`, description: `Custom directives add behavior to elements. Structural directives change DOM (use *). Attribute directives change appearance. Use @Directive decorator. Access element with ElementRef, Renderer2 for safe DOM manipulation.`, syntax: '@Directive, ElementRef, Renderer2', usage: 'Extend templates', code: '@Directive({ selector: \'[appHighlight]\' })\nexport class HighlightDirective {\n  constructor(private el: ElementRef, private renderer: Renderer2) {\n    this.renderer.setStyle(this.el.nativeElement, \'background-color\', \'yellow\');\n  }\n}\n\n// Usage\n<p appHighlight>Highlighted text</p>' },
    { title: `${languageName} Dynamic Components`, description: `Load components dynamically at runtime. Use ViewContainerRef to create components. ComponentFactoryResolver creates factories (deprecated in v13+). Standalone components simplify dynamic loading.`, syntax: 'ViewContainerRef, createComponent()', usage: 'Runtime component creation', code: 'constructor(private viewContainer: ViewContainerRef) {}\n\nloadComponent() {\n  this.viewContainer.clear();\n  const componentRef = this.viewContainer.createComponent(DynamicComponent);\n  componentRef.instance.data = this.data;\n}' },
    { title: `${languageName} Animations`, description: `Angular animations use trigger, state, style, transition, animate. Import BrowserAnimationsModule. Define animations in @Component metadata. Trigger with [@triggerName] in template. Animate enter/leave, state changes.`, syntax: 'trigger, state, transition, animate', usage: 'Smooth UI transitions', code: 'animations: [\n  trigger(\'fadeIn\', [\n    transition(\':enter\', [\n      style({ opacity: 0 }),\n      animate(\'300ms\', style({ opacity: 1 }))\n    ])\n  ])\n]\n\n// Template\n<div @fadeIn>Content</div>' },
    { title: `${languageName} Testing Components`, description: `Test components with TestBed and ComponentFixture. TestBed configures testing module. fixture.detectChanges() triggers change detection. Query elements with debugElement. Test interactions, outputs, lifecycle hooks.`, syntax: 'TestBed, ComponentFixture', usage: 'Unit testing', code: 'describe(\'UserComponent\', () => {\n  let component: UserComponent;\n  let fixture: ComponentFixture<UserComponent>;\n  \n  beforeEach(() => {\n    TestBed.configureTestingModule({ declarations: [UserComponent] });\n    fixture = TestBed.createComponent(UserComponent);\n    component = fixture.componentInstance;\n    fixture.detectChanges();\n  });\n  \n  it(\'should display name\', () => {\n    expect(fixture.nativeElement.textContent).toContain(\'Alice\');\n  });\n});' },
    { title: `${languageName} Testing Services`, description: `Test services with TestBed.inject(). Mock HTTP with HttpClientTestingModule and HttpTestingController. Spy on methods with jasmine.createSpyObj(). Test async operations with fakeAsync, tick, flush.`, syntax: 'TestBed.inject(), HttpTestingController', usage: 'Service testing', code: 'describe(\'UserService\', () => {\n  let service: UserService;\n  let httpMock: HttpTestingController;\n  \n  beforeEach(() => {\n    TestBed.configureTestingModule({\n      imports: [HttpClientTestingModule],\n      providers: [UserService]\n    });\n    service = TestBed.inject(UserService);\n    httpMock = TestBed.inject(HttpTestingController);\n  });\n  \n  it(\'should fetch users\', () => {\n    service.getUsers().subscribe(users => {\n      expect(users.length).toBe(2);\n    });\n    const req = httpMock.expectOne(\'/api/users\');\n    req.flush([{id:1}, {id:2}]);\n  });\n});' },
    { title: `${languageName} State Management`, description: `Manage complex state with NgRx or Akita. NgRx uses Redux pattern with store, actions, reducers, effects, selectors. Provides time-travel debugging. Good for large apps with shared state.`, syntax: 'Store, Actions, Reducers, Effects', usage: 'Global state management', code: '// Action\nexport const loadUsers = createAction(\'[User] Load Users\');\n\n// Reducer\nexport const reducer = createReducer(\n  initialState,\n  on(loadUsers, state => ({ ...state, loading: true }))\n);\n\n// Component\nconstructor(private store: Store) {}\nloadUsers() {\n  this.store.dispatch(loadUsers());\n}' },
    { title: `${languageName} Standalone Components`, description: `Standalone components (v14+) don\'t need NgModules. Use standalone: true and imports array. Simplify app structure. Bootstrap with bootstrapApplication(). Use with lazy loading for better tree-shaking.`, syntax: 'standalone: true, imports: []', usage: 'Simplified architecture', code: '@Component({\n  selector: \'app-user\',\n  standalone: true,\n  imports: [CommonModule, FormsModule],\n  template: `<div>{{ name }}</div>`\n})\nexport class UserComponent {}\n\n// Bootstrap\nimport { bootstrapApplication } from \'@angular/platform-browser\';\nbootstrapApplication(AppComponent);' },

    // ADVANCED (7 lessons)
    { title: `${languageName} Performance Optimization`, description: `Optimize with OnPush change detection, pure pipes, trackBy for ngFor, lazy loading, AOT compilation, production builds, code splitting. Use Angular DevTools profiler. Minimize bundle size with tree-shaking.`, syntax: 'trackBy, AOT, lazy loading', usage: 'Fast applications', code: '<div *ngFor="let item of items; trackBy: trackByFn">\n  {{ item.name }}\n</div>\n\ntrackByFn(index: number, item: any) {\n  return item.id;\n}' },
    { title: `${languageName} Server-Side Rendering`, description: `SSR with Angular Universal renders on server for better SEO and performance. Use @nguniversal/express-engine. Improves first contentful paint. Handle platform differences with isPlatformBrowser/Server.`, syntax: '@nguniversal, isPlatformBrowser', usage: 'SEO and performance', code: 'import { isPlatformBrowser } from \'@angular/common\';\n\nconstructor(@Inject(PLATFORM_ID) private platformId: Object) {}\n\nngOnInit() {\n  if (isPlatformBrowser(this.platformId)) {\n    // Browser-only code\n  }\n}' },
    { title: `${languageName} Internationalization`, description: `i18n with @angular/localize. Mark text with i18n attribute. Extract with ng extract-i18n. Create translation files (.xlf). Build for each locale. Runtime switching with libraries like ngx-translate.`, syntax: 'i18n, ng extract-i18n', usage: 'Multi-language apps', code: '<h1 i18n="@@welcome">Welcome</h1>\n<p i18n>Hello, {{ name }}</p>\n\n// Build\nng build --localize' },
    { title: `${languageName} PWA Support`, description: `Add PWA features with @angular/pwa. Includes service worker, manifest, app shell. Use ng add @angular/pwa. Enables offline support, installability, push notifications. Configure in ngsw-config.json.`, syntax: 'ng add @angular/pwa', usage: 'Offline-capable apps', code: 'ng add @angular/pwa\n\n// ngsw-config.json\n{\n  "assetGroups": [{\n    "name": "app",\n    "installMode": "prefetch",\n    "resources": {\n      "files": ["/favicon.ico", "/index.html"]\n    }\n  }]\n}' },
    { title: `${languageName} Security`, description: `Angular sanitizes values to prevent XSS. Use DomSanitizer for trusted content. CSRF protection with HttpClient. Validate inputs. Use HTTPS. Implement authentication with JWT. Route guards for authorization.`, syntax: 'DomSanitizer, HttpClient', usage: 'Secure applications', code: 'constructor(private sanitizer: DomSanitizer) {}\n\ngetSafeHtml(html: string) {\n  return this.sanitizer.sanitize(SecurityContext.HTML, html);\n}\n\n// Or mark as trusted\ntrustedHtml = this.sanitizer.bypassSecurityTrustHtml(html);' },
    { title: `${languageName} Build and Deployment`, description: `Build with ng build --configuration production. Enables AOT, minification, tree-shaking. Output in dist/. Deploy to static hosting (Netlify, Vercel, Firebase Hosting, S3). Configure base-href for subdirectories.`, syntax: 'ng build, deployment', usage: 'Production deployment', code: 'ng build --configuration production\n\n// Deploy to Firebase\nnpm install -g firebase-tools\nfirebase login\nfirebase init\nfirebase deploy\n\n// Or Netlify\nnpm run build\nnetlify deploy --prod --dir=dist/my-app' },
    { title: `${languageName} Best Practices`, description: `Follow Angular style guide. Use TypeScript strict mode. Organize code into feature modules. Keep components focused. Use services for business logic. Unsubscribe from observables. Use async pipe when possible. Write tests. Use linting and formatting tools.`, syntax: 'Style guide, best practices', usage: 'Maintainable code', code: '// Good: focused component with service\nexport class UserListComponent implements OnInit, OnDestroy {\n  users$ = this.userService.getUsers();\n  \n  constructor(private userService: UserService) {}\n  \n  ngOnInit() {}\n  ngOnDestroy() {}\n}\n\n// Template with async pipe (auto-unsubscribe)\n<div *ngFor="let user of users$ | async">{{ user.name }}</div>' },
  ]

  return lessons
}

// Scripting (JavaScript/TypeScript) - COMPREHENSIVE W3Schools-style (116 lessons)
function scriptingSpecs(languageName: string): SectionSpec[] {
  const isJS = languageName.toLowerCase().includes('javascript')
  const isTS = languageName.toLowerCase().includes('typescript')

  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    { title: `${languageName} HOME`, description: `${languageName} is the programming language of the Web. ${languageName} can update and change both HTML and CSS. ${languageName} can calculate, manipulate and validate data.`, syntax: 'script tag or .${isTS ? "ts" : "js"} files', usage: 'Create interactive web pages', code: isTS ? 'const message: string = "Hello World";\nconsole.log(message);' : 'const message = "Hello World";\nconsole.log(message);' },
    { title: `${languageName} Introduction`, description: `This page contains examples of what ${languageName} can do. ${languageName} can change HTML content, attribute values, styles (CSS), and can hide/show HTML elements.`, syntax: 'JavaScript statements', usage: 'Make web pages interactive', code: 'document.getElementById("demo").innerHTML = "Hello JavaScript";' },
    { title: `${languageName} Where To`, description: `${languageName} can be placed in the <body> or <head> section of an HTML page, or in external files. External scripts are practical when the same code is used in many different web pages.`, syntax: '<script> tag or <script src="">', usage: 'Include JavaScript in HTML', code: '<script src="myScript.js"></script>' },
    { title: `${languageName} Output`, description: `${languageName} can display data in different ways: innerHTML, document.write(), window.alert(), console.log(). Using innerHTML requires getElementById or querySelector to access an element.`, syntax: 'console.log(), innerHTML, alert()', usage: 'Display output', code: 'console.log("Hello World");\nalert("This is an alert");\ndocument.getElementById("demo").innerHTML = "Hello";' },
    { title: `${languageName} Statements`, description: `A JavaScript program is a list of programming statements. Statements are composed of values, operators, expressions, keywords, and comments. Statements are separated by semicolons.`, syntax: 'let x = 5; console.log(x);', usage: 'Write instructions', code: 'let x, y, z;\nx = 5;\ny = 6;\nz = x + y;\nconsole.log(z);' },

    // BASICS (25 lessons)
    { title: `${languageName} Syntax`, description: `JavaScript syntax is the set of rules for how programs are constructed. Values can be fixed (literals) or variable. Variables are containers for storing data values. Use let, const, or var to declare variables.`, syntax: 'let name = "John";', usage: 'Understand code structure', code: 'let x = 5;\nlet y = "Hello";\nconst PI = 3.14;' },
    { title: `${languageName} Comments`, description: `Code after double slashes // or between /* and */ is treated as a comment and will be ignored. Comments can explain code and make it more readable. Comments can also prevent execution when testing code.`, syntax: '// single line or /* multi line */', usage: 'Document your code', code: '// This is a single line comment\n/* This is\na multi-line\ncomment */\nlet x = 5; // Declaring a variable' },
    { title: `${languageName} Variables`, description: `Variables are containers for storing data. JavaScript has 3 ways to declare a variable: var, let, const. Always use const if the value should not be changed. Use let if you can't use const. Only use var if you must support old browsers.`, syntax: 'let x = 5; const y = 10;', usage: 'Store and manage data', code: isTS ? 'let name: string = "John";\nconst age: number = 30;\nlet isStudent: boolean = true;' : 'let name = "John";\nconst age = 30;\nlet isStudent = true;' },
    { title: `${languageName} Let`, description: `The let keyword was introduced in ES6 (2015). Variables defined with let cannot be redeclared. Variables defined with let must be declared before use. Variables defined with let have block scope.`, syntax: 'let x = 5;', usage: 'Declare block-scoped variables', code: 'let x = 10;\n{\n  let x = 2;\n  console.log(x); // 2\n}\nconsole.log(x); // 10' },
    { title: `${languageName} Const`, description: `The const keyword was introduced in ES6 (2015). Variables defined with const cannot be redeclared. Variables defined with const cannot be reassigned. Variables defined with const have block scope. Always use const when you declare a new Array, Object, Function, or RegExp.`, syntax: 'const PI = 3.14;', usage: 'Declare constants', code: 'const PI = 3.14159;\nconst person = {name: "John", age: 30};\nconst cars = ["Tesla", "Volvo", "BMW"];' },
    { title: `${languageName} Operators`, description: `JavaScript operators are used to perform operations on variables and values. Arithmetic operators (+, -, *, /, %, ++, --), assignment operators (=, +=, -=), comparison operators (==, ===, !=, !==, >, <), logical operators (&&, ||, !), and more.`, syntax: 'x = 5 + 2;', usage: 'Perform operations', code: 'let x = 10;\nlet y = 5;\nlet sum = x + y; // 15\nlet product = x * y; // 50\nlet isGreater = x > y; // true' },
    { title: `${languageName} Arithmetic`, description: `Arithmetic operators perform arithmetic on numbers (literals or variables). Operators include + (addition), - (subtraction), * (multiplication), / (division), % (modulus), ++ (increment), -- (decrement), ** (exponentiation).`, syntax: 'let x = 5 + 3;', usage: 'Perform math operations', code: 'let a = 10;\nlet b = 3;\nconsole.log(a + b); // 13\nconsole.log(a - b); // 7\nconsole.log(a * b); // 30\nconsole.log(a / b); // 3.333\nconsole.log(a % b); // 1\nconsole.log(a ** b); // 1000' },
    { title: `${languageName} Assignment`, description: `Assignment operators assign values to JavaScript variables. = assigns, += adds and assigns, -= subtracts and assigns, *= multiplies and assigns, /= divides and assigns, %= takes modulus and assigns.`, syntax: 'x += 5; // same as x = x + 5', usage: 'Assign values efficiently', code: 'let x = 10;\nx += 5; // x is now 15\nx -= 3; // x is now 12\nx *= 2; // x is now 24\nx /= 4; // x is now 6' },
    { title: `${languageName} Data Types`, description: `JavaScript has 8 data types: String, Number, Bigint, Boolean, Undefined, Null, Symbol, Object. The Object type includes Object, Array, Date. You can use typeof operator to find the data type.`, syntax: 'typeof "John" // Returns "string"', usage: 'Understand data types', code: isTS ? 'let str: string = "Hello";\nlet num: number = 42;\nlet bool: boolean = true;\nlet arr: number[] = [1, 2, 3];\nlet obj: {name: string} = {name: "John"};' : 'let str = "Hello";\nlet num = 42;\nlet bool = true;\nlet arr = [1, 2, 3];\nlet obj = {name: "John"};' },
    { title: `${languageName} Functions`, description: `A JavaScript function is a block of code designed to perform a particular task. A function is executed when "something" invokes it (calls it). Functions can take parameters and return values.`, syntax: 'function name(params) { code }', usage: 'Reuse code blocks', code: 'function greet(name) {\n  return "Hello " + name;\n}\nconsole.log(greet("John")); // "Hello John"' },
    { title: `${languageName} Objects`, description: `JavaScript objects are containers for named values called properties. Objects are written with curly braces {}. Properties are written as name:value pairs, separated by commas. You can access properties using dot notation or bracket notation.`, syntax: 'const person = {name: "John", age: 30};', usage: 'Group related data', code: 'const car = {\n  brand: "Tesla",\n  model: "Model 3",\n  year: 2023,\n  drive: function() {\n    return "Driving...";\n  }\n};\nconsole.log(car.brand); // "Tesla"' },
    { title: `${languageName} Events`, description: `HTML events are "things" that happen to HTML elements. JavaScript can "react" to these events. Common events: onclick, onchange, onmouseover, onmouseout, onkeydown, onload. Use addEventListener to handle events.`, syntax: 'element.addEventListener("click", function)', usage: 'Respond to user actions', code: 'document.getElementById("myBtn").addEventListener("click", function() {\n  alert("Button clicked!");\n});' },
    { title: `${languageName} Strings`, description: `A JavaScript string is zero or more characters written inside quotes. You can use single or double quotes. Strings can be created as primitives or objects using new String(). Template literals use backticks and \${} for expressions.`, syntax: 'let text = "Hello World";', usage: 'Work with text', code: 'let name = "John";\nlet greeting = `Hello ${name}`;\nlet length = greeting.length;\nlet upper = greeting.toUpperCase();' },
    { title: `${languageName} String Methods`, description: `String methods help you work with strings. Common methods: length, slice(), substring(), substr(), replace(), toUpperCase(), toLowerCase(), concat(), trim(), padStart(), padEnd(), charAt(), charCodeAt(), split().`, syntax: 'str.toUpperCase()', usage: 'Manipulate strings', code: 'let text = "Hello World";\nconsole.log(text.length); // 11\nconsole.log(text.toUpperCase()); // "HELLO WORLD"\nconsole.log(text.slice(0, 5)); // "Hello"\nconsole.log(text.replace("World", "JS")); // "Hello JS"' },
    { title: `${languageName} String Search`, description: `JavaScript search methods: indexOf(), lastIndexOf(), search(), match(), matchAll(), includes(), startsWith(), endsWith(). These methods help you search for values in strings.`, syntax: 'str.indexOf("e")', usage: 'Find text in strings', code: 'let text = "Hello World";\nconsole.log(text.indexOf("World")); // 6\nconsole.log(text.includes("Hello")); // true\nconsole.log(text.startsWith("He")); // true\nconsole.log(text.endsWith("ld")); // true' },
    { title: `${languageName} Template Literals`, description: `Template Literals use back-ticks (\`\`) rather than quotes to define a string. With template literals, you can use both single and double quotes inside a string. Template literals allow multiline strings and string interpolation with \${}.`, syntax: '`Hello ${name}`', usage: 'Create dynamic strings', code: 'let name = "John";\nlet age = 30;\nlet text = `My name is ${name} and I am ${age} years old.`;\nlet multiline = `This is\na multiline\nstring`;' },
    { title: `${languageName} Numbers`, description: `JavaScript has only one type of number. Numbers can be written with or without decimals. Extra large or extra small numbers can be written with scientific (exponent) notation. JavaScript numbers are always 64-bit floating point.`, syntax: 'let x = 3.14;', usage: 'Work with numeric values', code: 'let x = 3.14;\nlet y = 3;\nlet z = 123e5; // 12300000\nlet w = 123e-5; // 0.00123' },
    { title: `${languageName} Number Methods`, description: `Number methods help you work with numbers. Common methods: toString(), toExponential(), toFixed(), toPrecision(), valueOf(). Global methods: Number(), parseFloat(), parseInt(). Number properties: MAX_VALUE, MIN_VALUE, POSITIVE_INFINITY, NaN.`, syntax: 'num.toFixed(2)', usage: 'Format and convert numbers', code: 'let num = 9.656;\nconsole.log(num.toFixed(2)); // "9.66"\nconsole.log(num.toString()); // "9.656"\nconsole.log(Number("10")); // 10\nconsole.log(parseInt("10.5")); // 10' },
    { title: `${languageName} Arrays`, description: `An array is a special variable that can hold more than one value. Arrays are written with square brackets []. Array elements are accessed using index numbers (starting from 0). Arrays are objects and can contain different data types.`, syntax: 'const arr = ["a", "b", "c"];', usage: 'Store multiple values', code: isTS ? 'const fruits: string[] = ["Apple", "Banana", "Orange"];\nconsole.log(fruits[0]); // "Apple"\nfruits.push("Mango");\nconsole.log(fruits.length); // 4' : 'const fruits = ["Apple", "Banana", "Orange"];\nconsole.log(fruits[0]); // "Apple"\nfruits.push("Mango");\nconsole.log(fruits.length); // 4' },
    { title: `${languageName} Array Methods`, description: `Array methods help you work with arrays. Common methods: push(), pop(), shift(), unshift(), concat(), slice(), splice(), toString(), join(). These methods either modify the original array or return a new array.`, syntax: 'arr.push("item")', usage: 'Manipulate arrays', code: 'const arr = [1, 2, 3];\narr.push(4); // [1, 2, 3, 4]\narr.pop(); // [1, 2, 3]\narr.shift(); // [2, 3]\narr.unshift(1); // [1, 2, 3]' },
    { title: `${languageName} Array Sort`, description: `The sort() method sorts an array alphabetically. reverse() reverses the elements. To sort numbers correctly, use a compare function. sort((a,b) => a - b) for ascending, sort((a,b) => b - a) for descending.`, syntax: 'arr.sort((a,b) => a - b)', usage: 'Order array elements', code: 'const numbers = [40, 100, 1, 5, 25];\nnumbers.sort((a,b) => a - b); // [1, 5, 25, 40, 100]\nconst fruits = ["Banana", "Orange", "Apple"];\nfruits.sort(); // ["Apple", "Banana", "Orange"]' },
    { title: `${languageName} Array Iteration`, description: `Array iteration methods operate on every array element: forEach() executes a function for each element, map() creates a new array from calling a function for every element, filter() creates a new array with elements that pass a test, reduce() reduces array to a single value, find() returns first element that passes a test, every() checks if all elements pass a test, some() checks if any element passes a test.`, syntax: 'arr.map(x => x * 2)', usage: 'Process array elements', code: 'const nums = [1, 2, 3, 4];\nconst doubled = nums.map(x => x * 2); // [2, 4, 6, 8]\nconst evens = nums.filter(x => x % 2 === 0); // [2, 4]\nconst sum = nums.reduce((acc, x) => acc + x, 0); // 10' },
    { title: `${languageName} Array Const`, description: `Arrays declared with const cannot be reassigned, but the elements can be changed. You can change an element, add an element, or remove an element. Const does not define a constant array, it defines a constant reference to an array.`, syntax: 'const arr = [1, 2, 3];', usage: 'Understand const with arrays', code: 'const cars = ["Tesla", "Volvo"];\ncars[0] = "BMW"; // OK\ncars.push("Audi"); // OK\n// cars = ["Toyota"]; // ERROR - cannot reassign' },
    { title: `${languageName} Dates`, description: `JavaScript Date objects represent a single moment in time. Date objects are created with new Date(). Dates can be created with: new Date(), new Date(year, month), new Date(milliseconds), new Date(date string).`, syntax: 'new Date()', usage: 'Work with dates and times', code: 'const now = new Date();\nconst birthday = new Date("2000-01-15");\nconst specific = new Date(2023, 0, 1); // Jan 1, 2023' },
    { title: `${languageName} Date Formats`, description: `JavaScript supports ISO 8601 date format (YYYY-MM-DD). Short dates use MM/DD/YYYY. Long dates use MMM DD YYYY. Dates can be input and output in different formats. ISO 8601 is the international standard.`, syntax: 'YYYY-MM-DD', usage: 'Format dates properly', code: 'const d1 = new Date("2023-03-25");\nconst d2 = new Date("03/25/2023");\nconst d3 = new Date("Mar 25 2023");' },
    { title: `${languageName} Date Get Methods`, description: `Date get methods return date values: getFullYear(), getMonth() (0-11), getDate() (1-31), getDay() (0-6), getHours(), getMinutes(), getSeconds(), getMilliseconds(), getTime() (milliseconds since Jan 1, 1970).`, syntax: 'date.getFullYear()', usage: 'Extract date components', code: 'const d = new Date();\nconst year = d.getFullYear();\nconst month = d.getMonth();\nconst day = d.getDate();\nconsole.log(`${year}-${month + 1}-${day}`);' },
    { title: `${languageName} Date Set Methods`, description: `Date set methods set date values: setFullYear(), setMonth(), setDate(), setHours(), setMinutes(), setSeconds(), setMilliseconds(), setTime(). All set methods modify the existing date object.`, syntax: 'date.setFullYear(2024)', usage: 'Modify dates', code: 'const d = new Date();\nd.setFullYear(2024);\nd.setMonth(11); // December\nd.setDate(25); // Christmas' },
    { title: `${languageName} Math`, description: `The Math object allows you to perform mathematical tasks. Math is not a constructor. All properties/methods of Math can be called by using Math as an object, without creating it.`, syntax: 'Math.PI, Math.round()', usage: 'Perform math operations', code: 'console.log(Math.PI); // 3.14159...\nconsole.log(Math.round(4.7)); // 5\nconsole.log(Math.pow(2, 3)); // 8\nconsole.log(Math.sqrt(16)); // 4' },
    { title: `${languageName} Random`, description: `Math.random() returns a random number between 0 (inclusive) and 1 (exclusive). To get random integers, use Math.floor(Math.random() * max). To get random integers between min and max, use Math.floor(Math.random() * (max - min + 1)) + min.`, syntax: 'Math.random()', usage: 'Generate random numbers', code: 'const random = Math.random(); // 0 to 0.999...\nconst dice = Math.floor(Math.random() * 6) + 1; // 1 to 6\nconst range = Math.floor(Math.random() * 100); // 0 to 99' },
    { title: `${languageName} Booleans`, description: `A JavaScript Boolean represents one of two values: true or false. Booleans are often used in conditional testing. Everything with a "value" is true, everything without a "value" is false (0, "", undefined, null, NaN, false).`, syntax: 'let x = true;', usage: 'Handle true/false values', code: 'let isActive = true;\nlet isEmpty = false;\nlet x = 10;\nconsole.log(x > 5); // true\nconsole.log(Boolean("")); // false\nconsole.log(Boolean("Hello")); // true' },

    // CONTROL FLOW (15 lessons)
    { title: `${languageName} Comparisons`, description: `Comparison operators compare two values and return a boolean. Operators: == (equal to), === (equal value and type), != (not equal), !== (not equal value or type), > (greater than), < (less than), >= (greater or equal), <= (less or equal).`, syntax: 'x === y', usage: 'Compare values', code: 'console.log(5 == "5"); // true (loose equality)\nconsole.log(5 === "5"); // false (strict equality)\nconsole.log(10 > 5); // true\nconsole.log(10 !== 5); // true' },
    { title: `${languageName} If Else`, description: `Use if to specify a block of code to be executed if a condition is true. Use else to specify a block of code to be executed if the condition is false. Use else if to specify a new condition if the first condition is false.`, syntax: 'if (condition) {} else {}', usage: 'Make decisions', code: 'let age = 18;\nif (age >= 18) {\n  console.log("Adult");\n} else if (age >= 13) {\n  console.log("Teenager");\n} else {\n  console.log("Child");\n}' },
    { title: `${languageName} Switch`, description: `The switch statement executes different actions based on different conditions. Use break to prevent the code from running into the next case. The default keyword specifies code to run if no case matches.`, syntax: 'switch(expression) { case x: ... }', usage: 'Handle multiple conditions', code: 'let day = 2;\nswitch(day) {\n  case 1: console.log("Monday"); break;\n  case 2: console.log("Tuesday"); break;\n  default: console.log("Other day");\n}' },
    { title: `${languageName} Loop For`, description: `Loops can execute a block of code a number of times. The for loop is often used when you know how many times you want to loop. Syntax: for (initialization; condition; increment) { code }`, syntax: 'for (let i = 0; i < 5; i++) {}', usage: 'Repeat code blocks', code: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n// Output: 0 1 2 3 4' },
    { title: `${languageName} Loop For In`, description: `The for...in loop iterates over the properties of an object. It should be used for objects, not arrays. For each property, the code block is executed.`, syntax: 'for (key in object) {}', usage: 'Iterate object properties', code: 'const person = {name: "John", age: 30, city: "NYC"};\nfor (let key in person) {\n  console.log(key + ": " + person[key]);\n}' },
    { title: `${languageName} Loop For Of`, description: `The for...of loop iterates over iterable objects (Arrays, Strings, Maps, Sets). It gives you direct access to values rather than indexes.`, syntax: 'for (value of iterable) {}', usage: 'Iterate array values', code: 'const fruits = ["Apple", "Banana", "Orange"];\nfor (let fruit of fruits) {\n  console.log(fruit);\n}\n// Output: Apple Banana Orange' },
    { title: `${languageName} Loop While`, description: `The while loop loops through a block of code as long as a specified condition is true. The do...while loop is a variant that executes the code block once before checking the condition.`, syntax: 'while (condition) {}', usage: 'Loop with conditions', code: 'let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++;\n}\n\nlet j = 0;\ndo {\n  console.log(j);\n  j++;\n} while (j < 3);' },
    { title: `${languageName} Break`, description: `The break statement "jumps out" of a loop. The continue statement "jumps over" one iteration in the loop. Break can also be used to jump out of a switch statement.`, syntax: 'break; continue;', usage: 'Control loop execution', code: 'for (let i = 0; i < 10; i++) {\n  if (i === 5) break; // stop at 5\n  if (i === 3) continue; // skip 3\n  console.log(i);\n}\n// Output: 0 1 2 4' },
    { title: `${languageName} Iterables`, description: `Iterables are objects that can be iterated over with for...of. Examples: String, Array, TypedArray, Map, Set. Objects are not iterables by default but can be made iterable by implementing the Symbol.iterator method.`, syntax: 'for (x of iterable) {}', usage: 'Work with iterable objects', code: 'const str = "Hello";\nfor (let char of str) {\n  console.log(char);\n}\n\nconst set = new Set([1, 2, 3]);\nfor (let num of set) {\n  console.log(num);\n}' },
    { title: `${languageName} Sets`, description: `A Set is a collection of unique values. Each value can only occur once in a Set. You can create a Set using new Set(). Common methods: add(), delete(), has(), clear(), forEach(). Use size property for the number of elements.`, syntax: 'new Set([values])', usage: 'Store unique values', code: 'const mySet = new Set([1, 2, 3, 3]);\nconsole.log(mySet.size); // 3\nmySet.add(4);\nmySet.delete(2);\nconsole.log(mySet.has(3)); // true' },
    { title: `${languageName} Maps`, description: `A Map holds key-value pairs where keys can be any datatype. A Map remembers the original insertion order of keys. Common methods: set(), get(), delete(), has(), clear(), forEach(). Use size property for the number of elements.`, syntax: 'new Map()', usage: 'Store key-value pairs', code: 'const map = new Map();\nmap.set("name", "John");\nmap.set(1, "one");\nconsole.log(map.get("name")); // "John"\nconsole.log(map.size); // 2' },
    { title: `${languageName} Typeof`, description: `The typeof operator returns the type of a variable or expression. Possible return values: "string", "number", "boolean", "undefined", "function", "object", "symbol", "bigint". Arrays and null return "object".`, syntax: 'typeof variable', usage: 'Check variable types', code: 'console.log(typeof "John"); // "string"\nconsole.log(typeof 42); // "number"\nconsole.log(typeof true); // "boolean"\nconsole.log(typeof {}); // "object"\nconsole.log(typeof []); // "object"' },
    { title: `${languageName} Type Conversion`, description: `JavaScript variables can be converted to a new variable and another data type by using a JavaScript function or automatically by JavaScript itself. Methods: String(), Number(), Boolean(). Unary + operator can also convert to number.`, syntax: 'Number("3.14")', usage: 'Convert between types', code: 'let num = String(123); // "123"\nlet str = Number("456"); // 456\nlet bool = Boolean(1); // true\nlet auto = "5" * "2"; // 10 (automatic conversion)' },
    { title: `${languageName} Bitwise`, description: `JavaScript bitwise operators work on 32-bit numbers. Any numeric operand is converted to a 32-bit number. Operators: & (AND), | (OR), ~ (NOT), ^ (XOR), << (left shift), >> (right shift), >>> (unsigned right shift).`, syntax: 'x & y', usage: 'Perform bitwise operations', code: 'console.log(5 & 1); // 1 (101 & 001 = 001)\nconsole.log(5 | 1); // 5 (101 | 001 = 101)\nconsole.log(5 ^ 1); // 4 (101 ^ 001 = 100)\nconsole.log(5 << 1); // 10 (1010)' },
    { title: `${languageName} RegExp`, description: `A regular expression is a sequence of characters that forms a search pattern. The pattern can be used for text search and text replace operations. Syntax: /pattern/modifiers. Common methods: test(), exec(), match(), replace(), search().`, syntax: '/pattern/flags', usage: 'Search and validate text', code: 'const pattern = /hello/i; // i = case-insensitive\nconsole.log(pattern.test("Hello World")); // true\nconst email = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nconsole.log(email.test("user@example.com")); // true' },

    // ADVANCED TOPICS (30 lessons)
    { title: `${languageName} Errors`, description: `The try statement lets you test a block of code for errors. The catch statement lets you handle the error. The throw statement lets you create custom errors. The finally statement executes code after try/catch regardless of the result.`, syntax: 'try {} catch(err) {} finally {}', usage: 'Handle errors gracefully', code: 'try {\n  let x = y + 1; // y is not defined\n} catch(err) {\n  console.log("Error: " + err.message);\n} finally {\n  console.log("Done");\n}' },
    { title: `${languageName} Scope`, description: `Scope determines the accessibility of variables. Block scope (let, const) limits variables to the block {}. Function scope (var) limits variables to the function. Global scope makes variables accessible everywhere.`, syntax: 'let (block), var (function)', usage: 'Understand variable accessibility', code: 'let globalVar = "global";\nfunction test() {\n  let functionVar = "function";\n  if (true) {\n    let blockVar = "block";\n    console.log(blockVar); // OK\n  }\n  // console.log(blockVar); // Error\n}' },
    { title: `${languageName} Hoisting`, description: `Hoisting is JavaScript\'s default behavior of moving declarations to the top. Variables declared with var are hoisted and initialized with undefined. Variables declared with let and const are hoisted but not initialized. Functions are fully hoisted.`, syntax: 'Function and var declarations', usage: 'Understand declaration behavior', code: 'console.log(x); // undefined (hoisted)\nvar x = 5;\n\n// Functions are fully hoisted\ngreet(); // Works!\nfunction greet() {\n  console.log("Hello");\n}\n\n// let/const are not initialized when hoisted\n// console.log(y); // Error\nlet y = 10;' },
    { title: `${languageName} Strict Mode`, description: `"use strict"; defines that JavaScript code should be executed in "strict mode". Strict mode makes it easier to write secure JavaScript. It changes silent errors into throw errors and fixes mistakes that make it difficult for JavaScript engines to perform optimizations.`, syntax: '"use strict";', usage: 'Write safer code', code: '"use strict";\n// x = 3.14; // Error: x is not defined\nlet x = 3.14; // Must declare variables\n\nfunction test() {\n  "use strict";\n  // y = 10; // Error in this function only\n}' },
    { title: `${languageName} this Keyword`, description: `The this keyword refers to different objects depending on how it is used. In a method, this refers to the owner object. Alone, this refers to the global object. In a function, this refers to the global object (undefined in strict mode). In an event, this refers to the element that received the event.`, syntax: 'this.property', usage: 'Reference current context', code: 'const person = {\n  name: "John",\n  greet: function() {\n    console.log("Hello " + this.name);\n  }\n};\nperson.greet(); // "Hello John"' },
    { title: `${languageName} Arrow Function`, description: `Arrow functions were introduced in ES6. Arrow functions provide a shorter syntax for writing function expressions. They do not have their own this binding. They are not suited for call, apply and bind methods. They cannot be used as constructors.`, syntax: '() => {}', usage: 'Write concise functions', code: 'const add = (a, b) => a + b;\nconst square = x => x * x;\nconst greet = () => console.log("Hello");\n\nconst nums = [1, 2, 3];\nconst doubled = nums.map(x => x * 2);' },
    { title: `${languageName} Classes`, description: `JavaScript classes are templates for JavaScript objects. Use the class keyword to create a class. Always add a constructor() method. Classes have methods and properties. Use extends to create a class inheritance. Use super to call parent constructor.`, syntax: 'class Name { constructor() {} }', usage: 'Create object templates', code: isTS ? 'class Person {\n  name: string;\n  constructor(name: string) {\n    this.name = name;\n  }\n  greet() {\n    return `Hello ${this.name}`;\n  }\n}\nconst p = new Person("John");' : 'class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return `Hello ${this.name}`;\n  }\n}\nconst p = new Person("John");' },
    { title: `${languageName} Modules`, description: `JavaScript modules allow you to break up your code into separate files. Modules make it easier to maintain code. Modules are imported using import statement and exported using export or export default. Modules work only with HTTP(s) protocol.`, syntax: 'export, import', usage: 'Organize code into files', code: '// math.js\nexport const PI = 3.14;\nexport function add(a, b) {\n  return a + b;\n}\n\n// app.js\nimport { PI, add } from "./math.js";\nconsole.log(add(2, 3));' },
    { title: `${languageName} JSON`, description: `JSON is a format for storing and transporting data. JSON is often used when data is sent from a server to a web page. JSON syntax is derived from JavaScript object notation but is text only. Use JSON.parse() to convert text to object. Use JSON.stringify() to convert object to text.`, syntax: 'JSON.parse(), JSON.stringify()', usage: 'Work with JSON data', code: 'const obj = {name: "John", age: 30};\nconst json = JSON.stringify(obj); // \'{"name":"John","age":30}\'\nconst parsed = JSON.parse(json); // {name: "John", age: 30}' },
    { title: `${languageName} Debugging`, description: `Debugging is the process of finding and fixing errors. Use console.log() to print values. Use debugger; statement to set breakpoints. Use browser developer tools to step through code. Use try...catch to handle runtime errors.`, syntax: 'console.log(), debugger;', usage: 'Find and fix bugs', code: 'function calculateSum(a, b) {\n  console.log("Calculating:", a, b);\n  debugger; // Execution will pause here\n  return a + b;\n}\ncalculateSum(5, 3);' },
    { title: `${languageName} Style Guide`, description: `Coding conventions are style guidelines for programming. Good coding conventions improve code quality, readability, and maintainability. Use meaningful names, consistent spacing, proper indentation, avoid global variables, use === instead of ==, always end statements with semicolon.`, syntax: 'Coding best practices', usage: 'Write clean code', code: '// Good\nconst MAX_USERS = 100;\nfunction getUserName(userId) {\n  return users[userId].name;\n}\n\n// Bad\nconst m = 100;\nfunction g(u) {\n  return users[u].name;\n}' },
    { title: `${languageName} Best Practices`, description: `Best practices for JavaScript: Avoid global variables, always declare local variables, declare variables at the top, initialize variables, never declare numbers, strings, or booleans as objects, use === for comparison, use default parameter values, end switches with defaults, avoid using eval().`, syntax: 'Code quality guidelines', usage: 'Write better code', code: 'function greet(name = "Guest") { // default parameter\n  return `Hello ${name}`;\n}\n\nconst nums = [1, 2, 3];\nconst doubled = nums.map(x => x * 2); // functional approach' },
    { title: `${languageName} Mistakes`, description: `Common JavaScript mistakes: accidentally using = instead of ==, expecting loose comparison, confusing addition and concatenation, misunderstanding floats, breaking a return statement, accessing arrays with named indexes, ending definitions with semicolon, misunderstanding block scope.`, syntax: 'Common pitfalls', usage: 'Avoid common errors', code: '// Mistake: loose equality\nif (x == "5") {} // Avoid this\nif (x === "5") {} // Use this\n\n// Mistake: concatenation\nlet x = 10 + 5 + "5"; // "155" not "205"\n\n// Mistake: block scope\nfor (var i = 0; i < 3; i++) {}\nconsole.log(i); // 3 (leaked)\n\nfor (let j = 0; j < 3; j++) {}\n// console.log(j); // Error (block scoped)' },
    { title: `${languageName} Performance`, description: `Tips to improve JavaScript performance: Reduce DOM access, reduce DOM size, avoid unnecessary variables, delay JavaScript loading, avoid using with, reduce loops, use shorter notation, minimize use of global variables, batch DOM changes, use event delegation.`, syntax: 'Optimization techniques', usage: 'Make code faster', code: '// Slow: multiple DOM access\nfor (let i = 0; i < 100; i++) {\n  document.getElementById("demo").innerHTML += i;\n}\n\n// Fast: batch DOM changes\nlet html = "";\nfor (let i = 0; i < 100; i++) {\n  html += i;\n}\ndocument.getElementById("demo").innerHTML = html;' },
    { title: `${languageName} Reserved Words`, description: `In JavaScript you cannot use reserved words as variable names. Reserved words (keywords) are words that are part of the JavaScript language. Examples: break, case, catch, class, const, continue, debugger, default, delete, do, else, export, extends, finally, for, function, if, import, in, instanceof, let, new, return, super, switch, this, throw, try, typeof, var, void, while, with, yield.`, syntax: 'Language keywords', usage: 'Avoid naming conflicts', code: '// Invalid\n// let class = "Math"; // Error\n// let function = 5; // Error\n\n// Valid\nlet className = "Math";\nlet myFunction = 5;' },
    { title: `${languageName} Callback Functions`, description: `A callback is a function passed as an argument to another function. This technique allows a function to call another function. Callbacks are commonly used in asynchronous operations like setTimeout, event handlers, and array methods.`, syntax: 'function(callback) { callback() }', usage: 'Execute code later', code: 'function processData(data, callback) {\n  console.log("Processing...");\n  callback(data);\n}\n\nprocessData("test", (result) => {\n  console.log("Done:", result);\n});' },
    { title: `${languageName} Asynchronous`, description: `Functions running in parallel with other functions are called asynchronous. Examples of asynchronous operations: setTimeout, setInterval, Promises, async/await, fetch API. Asynchronous programming allows you to perform long-running tasks without blocking the main thread.`, syntax: 'setTimeout, async/await', usage: 'Handle delayed operations', code: 'console.log("Start");\nsetTimeout(() => {\n  console.log("Delayed");\n}, 1000);\nconsole.log("End");\n// Output: Start, End, Delayed' },
    { title: `${languageName} Promises`, description: `A Promise is an object representing the eventual completion or failure of an asynchronous operation. Promises have three states: pending, fulfilled, rejected. Use .then() for success, .catch() for errors, .finally() for cleanup.`, syntax: 'new Promise((resolve, reject) => {})', usage: 'Handle async operations', code: 'const promise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve("Success!");\n  }, 1000);\n});\n\npromise\n  .then(result => console.log(result))\n  .catch(error => console.error(error));' },
    { title: `${languageName} Async/Await`, description: `Async/await makes asynchronous code look synchronous. The async keyword before a function makes it return a Promise. The await keyword can only be used inside async functions and makes JavaScript wait for a Promise to resolve.`, syntax: 'async function, await', usage: 'Write cleaner async code', code: 'async function fetchData() {\n  try {\n    const response = await fetch("/api/data");\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error("Error:", error);\n  }\n}\n\nfetchData();' },
    { title: `${languageName} Fetch API`, description: `The Fetch API provides a JavaScript interface for accessing and manipulating HTTP requests and responses. fetch() returns a Promise. Use .then() or async/await to handle the response. Response methods: .json(), .text(), .blob(), .formData().`, syntax: 'fetch(url, options)', usage: 'Make HTTP requests', code: 'fetch("https://api.example.com/users")\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));\n\n// With async/await\nconst data = await fetch("/api/users").then(r => r.json());' },
    { title: `${languageName} Destructuring`, description: `Destructuring assignment syntax makes it possible to unpack values from arrays or properties from objects into distinct variables. Works with arrays and objects. Supports default values and nested destructuring.`, syntax: 'const {x, y} = obj', usage: 'Extract values easily', code: 'const person = {name: "John", age: 30, city: "NYC"};\nconst {name, age} = person;\n\nconst colors = ["red", "green", "blue"];\nconst [first, second] = colors;\n\nconst {name: userName = "Guest"} = {}; // default value' },
    { title: `${languageName} Spread Operator`, description: `The spread operator (...) expands an iterable into more elements. It can be used to copy arrays, combine arrays, pass array elements as function arguments, copy objects, and merge objects.`, syntax: '...array, ...object', usage: 'Expand and copy collections', code: 'const arr1 = [1, 2, 3];\nconst arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]\n\nconst obj1 = {a: 1, b: 2};\nconst obj2 = {...obj1, c: 3}; // {a:1, b:2, c:3}\n\nMath.max(...arr1); // 3' },
    { title: `${languageName} Rest Parameters`, description: `Rest parameter syntax allows a function to accept an indefinite number of arguments as an array. The rest parameter must be the last parameter in the function definition. It is prefixed with three dots (...).`, syntax: 'function(...args) {}', usage: 'Handle variable arguments', code: 'function sum(...numbers) {\n  return numbers.reduce((acc, num) => acc + num, 0);\n}\n\nconsole.log(sum(1, 2, 3, 4, 5)); // 15' },
    { title: `${languageName} Object Methods`, description: `Object methods for working with objects: Object.keys() returns array of keys, Object.values() returns array of values, Object.entries() returns array of [key, value] pairs, Object.assign() copies properties, Object.freeze() prevents modifications, Object.seal() prevents adding/removing properties.`, syntax: 'Object.keys(obj)', usage: 'Manipulate objects', code: 'const person = {name: "John", age: 30};\nconsole.log(Object.keys(person)); // ["name", "age"]\nconsole.log(Object.values(person)); // ["John", 30]\nconsole.log(Object.entries(person)); // [["name","John"], ["age",30]]' },
    { title: `${languageName} Default Parameters`, description: `Function parameters can have default values. If no argument is provided or undefined is passed, the default value is used. Default parameters allow named parameters to be initialized with default values if no value or undefined is passed.`, syntax: 'function(param = defaultValue) {}', usage: 'Set parameter defaults', code: 'function greet(name = "Guest", greeting = "Hello") {\n  return `${greeting}, ${name}!`;\n}\n\nconsole.log(greet()); // "Hello, Guest!"\nconsole.log(greet("John")); // "Hello, John!"\nconsole.log(greet("John", "Hi")); // "Hi, John!"' },
    { title: `${languageName} Closures`, description: `A closure is a function having access to the parent scope, even after the parent function has closed. JavaScript variables can belong to the local or global scope. Closures make it possible to have private variables.`, syntax: 'Nested function access', usage: 'Create private variables', code: 'function counter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}\n\nconst c = counter();\nc.increment(); // 1\nc.increment(); // 2\nconsole.log(c.getCount()); // 2' },
    { title: `${languageName} Higher Order Functions`, description: `A higher-order function is a function that takes a function as an argument or returns a function. Common examples: map(), filter(), reduce(), forEach(), find(), some(), every(). Higher-order functions enable functional programming patterns.`, syntax: 'function(fn) { fn() }', usage: 'Compose functions', code: 'const numbers = [1, 2, 3, 4, 5];\n\nconst doubled = numbers.map(x => x * 2);\nconst evens = numbers.filter(x => x % 2 === 0);\nconst sum = numbers.reduce((acc, x) => acc + x, 0);\n\nfunction withLogging(fn) {\n  return function(...args) {\n    console.log("Calling function");\n    return fn(...args);\n  };\n}' },
    { title: `${languageName} Symbol`, description: `Symbol is a primitive data type introduced in ES6. Every Symbol value is unique and immutable. Symbols are often used to add unique property keys to objects that won't collide with keys any other code might add. Create symbols with Symbol().`, syntax: 'Symbol(description)', usage: 'Create unique identifiers', code: 'const id = Symbol("id");\nconst user = {\n  name: "John",\n  [id]: 123\n};\n\nconsole.log(user[id]); // 123\nconsole.log(user.id); // undefined' },
    { title: `${languageName} Getters and Setters`, description: `Getters and setters allow you to define Object Accessors (computed properties). A getter is a method that gets the value of a specific property. A setter is a method that sets the value of a specific property. Use get and set keywords.`, syntax: 'get propName() {}, set propName(val) {}', usage: 'Control property access', code: 'const person = {\n  firstName: "John",\n  lastName: "Doe",\n  get fullName() {\n    return `${this.firstName} ${this.lastName}`;\n  },\n  set fullName(value) {\n    const [first, last] = value.split(" ");\n    this.firstName = first;\n    this.lastName = last;\n  }\n};\n\nconsole.log(person.fullName); // "John Doe"\nperson.fullName = "Jane Smith";\nconsole.log(person.firstName); // "Jane"' },
    { title: `${languageName} Proxy`, description: `A Proxy object wraps another object and intercepts operations like property lookup, assignment, enumeration, function invocation, etc. Proxies enable meta-programming in JavaScript. Use new Proxy(target, handler) to create a proxy.`, syntax: 'new Proxy(target, handler)', usage: 'Intercept object operations', code: 'const user = {name: "John", age: 30};\n\nconst proxy = new Proxy(user, {\n  get(target, prop) {\n    console.log(`Getting ${prop}`);\n    return target[prop];\n  },\n  set(target, prop, value) {\n    console.log(`Setting ${prop} to ${value}`);\n    target[prop] = value;\n    return true;\n  }\n});\n\nproxy.name; // "Getting name"' },
    { title: `${languageName} WeakMap and WeakSet`, description: `WeakMap is a collection of key-value pairs where keys must be objects and are held weakly. WeakSet is a collection of objects held weakly. "Weakly held" means if there are no other references to an object stored in WeakMap/WeakSet, it can be garbage collected.`, syntax: 'new WeakMap(), new WeakSet()', usage: 'Store weak references', code: 'const wm = new WeakMap();\nlet obj = {data: "important"};\nwm.set(obj, "metadata");\nconsole.log(wm.get(obj)); // "metadata"\n\nconst ws = new WeakSet();\nws.add(obj);\nconsole.log(ws.has(obj)); // true' },
  ]

  // Add TypeScript-specific lessons if needed
  if (isTS) {
    lessons.push(
      { title: 'TypeScript Basics', description: 'TypeScript is a superset of JavaScript that adds static types. Types help catch errors at compile time. Use type annotations with : to specify types. Common types: string, number, boolean, any, void, null, undefined, never.', syntax: 'let name: string = "John";', usage: 'Add type safety', code: 'let age: number = 30;\nlet isActive: boolean = true;\nlet values: number[] = [1, 2, 3];\nlet tuple: [string, number] = ["John", 30];' },
      { title: 'TypeScript Interfaces', description: 'Interfaces define the structure of objects. They specify what properties an object should have and their types. Interfaces support optional properties with ?, readonly properties, and index signatures.', syntax: 'interface Name { prop: type }', usage: 'Define object shapes', code: 'interface User {\n  id: number;\n  name: string;\n  email?: string;\n  readonly createdAt: Date;\n}\n\nconst user: User = {\n  id: 1,\n  name: "John",\n  createdAt: new Date()\n};' },
      { title: 'TypeScript Types', description: 'Type aliases create custom types. Union types allow multiple types with |. Intersection types combine types with &. Literal types restrict values to specific literals. Use type keyword to define custom types.', syntax: 'type Name = string | number;', usage: 'Create custom types', code: 'type ID = string | number;\ntype Status = "active" | "inactive";\ntype Point = { x: number; y: number };\n\nlet userId: ID = "abc123";\nlet status: Status = "active";' },
      { title: 'TypeScript Generics', description: 'Generics create reusable components that work with multiple types. Use angle brackets <T> to define type parameters. Generics work with functions, interfaces, classes, and type aliases.', syntax: 'function name<T>(param: T): T {}', usage: 'Write type-safe reusable code', code: 'function identity<T>(arg: T): T {\n  return arg;\n}\n\nlet output = identity<string>("Hello");\n\ninterface Box<T> {\n  value: T;\n}\n\nlet box: Box<number> = { value: 123 };' },
      { title: 'TypeScript Advanced Types', description: 'Advanced type features: mapped types transform properties, conditional types (T extends U ? X : Y), utility types (Partial, Required, Readonly, Pick, Omit, Record), template literal types.', syntax: 'Partial<T>, Pick<T, K>', usage: 'Use advanced type features', code: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\ntype PartialUser = Partial<User>;\ntype UserName = Pick<User, "id" | "name">;\ntype UserWithoutEmail = Omit<User, "email">;' }
    )
  }

  return lessons
}

// Python - Comprehensive 50+ lesson curriculum
function pythonSpecs(languageName: string): SectionSpec[] {
  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    { title: `${languageName} HOME`, description: `${languageName} is a high-level, interpreted programming language known for its simplicity and readability. ${languageName} is widely used for web development, data science, artificial intelligence, automation, and scientific computing.`, syntax: 'Python 3.x syntax', usage: 'Build applications and scripts', code: 'print("Hello, World!")' },
    { title: `${languageName} Introduction`, description: `${languageName} was created by Guido van Rossum and first released in 1991. It emphasizes code readability with significant indentation. ${languageName} supports multiple programming paradigms including procedural, object-oriented, and functional programming.`, syntax: 'Python statements', usage: 'Understand Python basics', code: '# This is a comment\nname = "Python"\nprint(f"Hello, {name}!")' },
    { title: `${languageName} Getting Started`, description: `To get started with ${languageName}, download it from python.org and install it. You can run Python interactively in the REPL or save code in .py files. Use the python command to run scripts.`, syntax: 'python script.py', usage: 'Run Python programs', code: '# save as hello.py\nprint("Hello, World!")\n\n# Run: python hello.py' },
    { title: `${languageName} Syntax`, description: `${languageName} uses indentation to define code blocks instead of braces. Typically 4 spaces per indentation level. Lines end without semicolons. Use # for comments and """triple quotes""" for multi-line strings or docstrings.`, syntax: 'Indentation for blocks', usage: 'Write proper Python syntax', code: 'if True:\n    print("Indented block")\n    print("Same level")\nprint("Outside block")' },
    { title: `${languageName} Comments`, description: `Comments in ${languageName} start with #. Everything after # on that line is ignored. Multi-line comments can use triple quotes (""" or \'\'\') or multiple # symbols. Comments help explain code and improve readability.`, syntax: '# single line or """multi-line"""', usage: 'Document code', code: '# This is a single-line comment\n\n"""\nThis is a\nmulti-line comment\nor docstring\n"""\n\nprint("Hello")  # inline comment' },

    // BASICS (20 lessons)
    { title: `${languageName} Variables`, description: `Variables in ${languageName} are created by assignment. No declaration needed. Variables are case-sensitive. Use meaningful names with lowercase and underscores (snake_case). Variables can change type dynamically.`, syntax: 'variable_name = value', usage: 'Store data', code: 'name = "Alice"\nage = 30\nis_student = False\n\n# Multiple assignment\nx, y, z = 1, 2, 3\n\n# Same value\na = b = c = 0' },
    { title: `${languageName} Data Types`, description: `${languageName} has several built-in data types: int, float, complex (numbers); str (text); list, tuple, set, dict (collections); bool (True/False); NoneType (None). Use type() to check a variable\'s type.`, syntax: 'type(variable)', usage: 'Understand data types', code: 'integer = 42\nfloating = 3.14\ntext = "Hello"\nlist_data = [1, 2, 3]\ntuple_data = (1, 2, 3)\ndict_data = {"key": "value"}\n\nprint(type(integer))  # <class \'int\'>' },
    { title: `${languageName} Numbers`, description: `${languageName} supports int (integers), float (decimals), and complex (complex numbers). Use arithmetic operators: + - * / // (floor division) % (modulo) ** (power). Use int(), float() to convert types.`, syntax: 'Arithmetic operations', usage: 'Perform calculations', code: 'a = 10\nb = 3\n\nprint(a + b)   # 13\nprint(a / b)   # 3.333...\nprint(a // b)  # 3 (floor division)\nprint(a % b)   # 1 (modulo)\nprint(a ** b)  # 1000 (power)' },
    { title: `${languageName} Strings`, description: `Strings are sequences of characters in quotes (single, double, or triple). Strings are immutable. Use + for concatenation, * for repetition. Access characters with [index]. Negative indices count from the end.`, syntax: '"text" or \'text\'', usage: 'Work with text', code: 'text = "Hello"\nprint(text[0])     # \'H\'\nprint(text[-1])    # \'o\'\nprint(text * 2)    # \'HelloHello\'\nprint(len(text))   # 5\nprint("Hello" + " " + "World")  # \'Hello World\'' },
    { title: `${languageName} String Methods`, description: `Common string methods: upper(), lower(), strip(), split(), replace(), find(), startswith(), endswith(), join(), format(). Strings are immutable so methods return new strings.`, syntax: 'str.method()', usage: 'Manipulate strings', code: 'text = "  Hello World  "\nprint(text.strip())           # "Hello World"\nprint(text.upper())           # "  HELLO WORLD  "\nprint(text.replace("Hello", "Hi"))  # "  Hi World  "\nprint(text.split())           # [\'Hello\', \'World\']' },
    { title: `${languageName} String Formatting`, description: `Format strings with f-strings (f"...{var}"), .format() method, or % operator. F-strings (Python 3.6+) are the modern, recommended approach. They allow expressions inside {}.`, syntax: 'f"text {variable}"', usage: 'Create dynamic strings', code: 'name = "Alice"\nage = 30\n\n# F-strings (recommended)\nprint(f"My name is {name} and I am {age} years old")\n\n# .format()\nprint("My name is {} and I am {}".format(name, age))\n\n# % operator (old style)\nprint("My name is %s and I am %d" % (name, age))' },
    { title: `${languageName} Booleans`, description: `Boolean type has two values: True and False. Comparison operators return booleans: == != > < >= <=. Logical operators: and, or, not. Truthy values: non-zero numbers, non-empty strings/lists. Falsy values: 0, "", [], None, False.`, syntax: 'True, False', usage: 'Logical operations', code: 'is_active = True\nis_admin = False\n\nprint(5 > 3)        # True\nprint(5 == 5)       # True\nprint(True and False)  # False\nprint(True or False)   # True\nprint(not True)        # False\nprint(bool(""))        # False\nprint(bool("text"))    # True' },
    { title: `${languageName} Operators`, description: `${languageName} operators: arithmetic (+ - * / // % **), comparison (== != > < >= <=), logical (and or not), identity (is is not), membership (in not in), assignment (= += -= *= /=).`, syntax: 'Various operators', usage: 'Perform operations', code: 'x = 10\nx += 5  # x = 15\n\nprint(5 in [1, 2, 3, 4, 5])  # True\nprint("a" in "apple")         # True\nprint(x is None)              # False\nprint(x is not None)          # True' },
    { title: `${languageName} Lists`, description: `Lists are ordered, mutable collections defined with []. Can contain mixed types. Access with [index], slice with [start:end]. Common methods: append(), insert(), remove(), pop(), sort(), reverse().`, syntax: 'list_name = [item1, item2]', usage: 'Store multiple values', code: 'fruits = ["apple", "banana", "cherry"]\nfruits.append("orange")\nfruits[0] = "pear"\nprint(fruits[1:3])   # [\'banana\', \'cherry\']\nprint(len(fruits))   # 4\nfruits.sort()\nprint(fruits)' },
    { title: `${languageName} Tuples`, description: `Tuples are ordered, immutable collections defined with (). Once created, cannot be changed. Faster than lists. Use for fixed data. Can unpack tuples: x, y = (1, 2).`, syntax: 'tuple_name = (item1, item2)', usage: 'Store immutable sequences', code: 'coordinates = (10, 20)\nprint(coordinates[0])  # 10\n\n# Tuple unpacking\nx, y = coordinates\nprint(f"x={x}, y={y}")\n\n# Single element tuple needs trailing comma\nsingle = (42,)\n\n# coordinates[0] = 5  # Error: tuples are immutable' },
    { title: `${languageName} Sets`, description: `Sets are unordered collections of unique elements defined with {}. No duplicates allowed. Common operations: add(), remove(), union(), intersection(), difference(). Use for membership testing and removing duplicates.`, syntax: 'set_name = {item1, item2}', usage: 'Store unique values', code: 'numbers = {1, 2, 3, 3, 4}\nprint(numbers)  # {1, 2, 3, 4}\n\nnumbers.add(5)\nprint(2 in numbers)  # True\n\nset_a = {1, 2, 3}\nset_b = {3, 4, 5}\nprint(set_a | set_b)  # union: {1, 2, 3, 4, 5}\nprint(set_a & set_b)  # intersection: {3}' },
    { title: `${languageName} Dictionaries`, description: `Dictionaries store key-value pairs defined with {}. Keys must be immutable (strings, numbers, tuples). Values can be any type. Access with [key]. Methods: keys(), values(), items(), get(), update(), pop().`, syntax: 'dict_name = {key: value}', usage: 'Store associated data', code: 'person = {"name": "Alice", "age": 30, "city": "NYC"}\nprint(person["name"])  # "Alice"\nperson["age"] = 31\nperson["email"] = "alice@example.com"\n\nfor key, value in person.items():\n    print(f"{key}: {value}")' },
    { title: `${languageName} Type Conversion`, description: `Convert between types with int(), float(), str(), list(), tuple(), set(), dict(). int() truncates floats. str() works on any type. Can convert strings to numbers if they contain valid number format.`, syntax: 'int(value), str(value)', usage: 'Convert data types', code: 'x = "123"\nnum = int(x)       # 123\nflt = float(x)     # 123.0\n\ny = 42\ntext = str(y)      # "42"\n\nz = [1, 2, 3]\nset_z = set(z)     # {1, 2, 3}\ntuple_z = tuple(z) # (1, 2, 3)' },
    { title: `${languageName} Input/Output`, description: `Use print() to output data. Use input() to get user input (always returns string). Convert input with int(input()) or float(input()). Print accepts multiple arguments separated by commas.`, syntax: 'print(value), input(prompt)', usage: 'Interact with users', code: 'print("Hello, World!")\nprint("Value:", 42, "Result:", True)\n\n# Get user input\nname = input("Enter your name: ")\nprint(f"Hello, {name}!")\n\nage = int(input("Enter your age: "))\nprint(f"You are {age} years old")' },
    { title: `${languageName} If Statements`, description: `Conditional execution with if, elif, else. Use indentation for blocks. Conditions can be any expression that evaluates to True/False. Can use and, or, not for complex conditions.`, syntax: 'if condition:', usage: 'Make decisions', code: 'age = 18\n\nif age >= 18:\n    print("Adult")\nelif age >= 13:\n    print("Teenager")\nelse:\n    print("Child")\n\n# Nested if\nif age >= 18:\n    if age >= 65:\n        print("Senior")\n    else:\n        print("Working age")' },
    { title: `${languageName} For Loops`, description: `Iterate over sequences with for loop. Use range() for number sequences: range(n) gives 0 to n-1, range(start, end) gives start to end-1, range(start, end, step) for custom steps.`, syntax: 'for item in sequence:', usage: 'Iterate collections', code: 'fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# Range\nfor i in range(5):\n    print(i)  # 0 1 2 3 4\n\nfor i in range(2, 10, 2):\n    print(i)  # 2 4 6 8\n\n# Enumerate\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")' },
    { title: `${languageName} While Loops`, description: `Repeat while condition is True. Be careful of infinite loops. Use break to exit loop early, continue to skip to next iteration. While loops are useful when you don\'t know how many iterations you need.`, syntax: 'while condition:', usage: 'Loop with conditions', code: 'count = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# Break\nwhile True:\n    response = input("Type \'quit\' to exit: ")\n    if response == "quit":\n        break\n    print(f"You typed: {response}")' },
    { title: `${languageName} Break and Continue`, description: `break exits the loop completely. continue skips the rest of the current iteration and moves to the next one. Both work with for and while loops. Can use else clause with loops (runs if loop completes normally).`, syntax: 'break, continue', usage: 'Control loop flow', code: 'for i in range(10):\n    if i == 3:\n        continue  # skip 3\n    if i == 7:\n        break     # stop at 7\n    print(i)  # 0 1 2 4 5 6\n\n# Else clause\nfor i in range(5):\n    if i == 10:\n        break\nelse:\n    print("Loop completed normally")' },
    { title: `${languageName} Functions`, description: `Define reusable code blocks with def. Functions can take parameters and return values. Use return to send back a value. Functions can have default parameters. Use *args for variable arguments, **kwargs for keyword arguments.`, syntax: 'def function_name(params):', usage: 'Organize code', code: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))              # "Hello, Alice!"\nprint(greet("Bob", "Hi"))          # "Hi, Bob!"\n\ndef sum_all(*numbers):\n    return sum(numbers)\n\nprint(sum_all(1, 2, 3, 4, 5))  # 15' },
    { title: `${languageName} Lambda Functions`, description: `Lambda creates anonymous (unnamed) functions in one line. Syntax: lambda arguments: expression. Common with map(), filter(), sorted(). Use for simple operations, regular functions for complex logic.`, syntax: 'lambda x: expression', usage: 'Create inline functions', code: 'square = lambda x: x ** 2\nprint(square(5))  # 25\n\nnumbers = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x ** 2, numbers))\nprint(squared)  # [1, 4, 9, 16, 25]\n\nevens = list(filter(lambda x: x % 2 == 0, numbers))\nprint(evens)  # [2, 4]' },
    { title: `${languageName} List Comprehensions`, description: `Create lists in a concise way: [expression for item in iterable if condition]. More readable than loops for simple transformations. Can include if conditions for filtering. Can nest comprehensions but keep them simple.`, syntax: '[expr for item in iterable]', usage: 'Create lists efficiently', code: 'numbers = [1, 2, 3, 4, 5]\nsquares = [x ** 2 for x in numbers]\nprint(squares)  # [1, 4, 9, 16, 25]\n\nevens = [x for x in numbers if x % 2 == 0]\nprint(evens)  # [2, 4]\n\n# Nested\nmatrix = [[i*j for j in range(3)] for i in range(3)]\nprint(matrix)  # [[0,0,0], [0,1,2], [0,2,4]]' },

    // INTERMEDIATE (15 lessons)
    { title: `${languageName} Modules`, description: `Modules are files containing ${languageName} code. Import with import module or from module import name. Create your own modules by saving .py files. Use __name__ == "__main__" to run code only when file is executed directly.`, syntax: 'import module, from module import name', usage: 'Organize code into files', code: '# math_utils.py\ndef add(a, b):\n    return a + b\n\n# main.py\nimport math_utils\nprint(math_utils.add(2, 3))\n\nfrom math_utils import add\nprint(add(5, 7))' },
    { title: `${languageName} Standard Library`, description: `${languageName} comes with a rich standard library. Common modules: os (operating system), sys (system), math (mathematics), random (random numbers), datetime (dates/times), json (JSON data), re (regular expressions).`, syntax: 'import module', usage: 'Use built-in functionality', code: 'import math\nprint(math.pi)  # 3.14159...\nprint(math.sqrt(16))  # 4.0\n\nimport random\nprint(random.randint(1, 10))  # random number 1-10\n\nimport datetime\nnow = datetime.datetime.now()\nprint(now.strftime("%Y-%m-%d"))' },
    { title: `${languageName} File Handling`, description: `Open files with open(filename, mode). Modes: "r" (read), "w" (write), "a" (append), "r+" (read/write). Use with statement for automatic closing. Read with read(), readline(), readlines(). Write with write().`, syntax: 'with open(file, mode) as f:', usage: 'Read/write files', code: '# Write file\nwith open("data.txt", "w") as f:\n    f.write("Hello, World!\\n")\n    f.write("Python is awesome!")\n\n# Read file\nwith open("data.txt", "r") as f:\n    content = f.read()\n    print(content)\n\n# Read lines\nwith open("data.txt", "r") as f:\n    for line in f:\n        print(line.strip())' },
    { title: `${languageName} Exception Handling`, description: `Handle errors with try, except, else, finally. Catch specific exceptions or use Exception for all. Raise exceptions with raise. Use finally for cleanup code that always runs. Create custom exceptions by inheriting from Exception.`, syntax: 'try: ... except Exception:', usage: 'Handle errors gracefully', code: 'try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\nexcept Exception as e:\n    print(f"Error: {e}")\nelse:\n    print("No errors")\nfinally:\n    print("Cleanup")\n\n# Raise exception\nif age < 0:\n    raise ValueError("Age cannot be negative")' },
    { title: `${languageName} Classes and Objects`, description: `Define classes with class keyword. __init__() is the constructor. self refers to the instance. Create instances by calling the class. Access attributes and methods with dot notation.`, syntax: 'class ClassName:', usage: 'Create custom types', code: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Hi, I\'m {self.name}"\n\nperson = Person("Alice", 30)\nprint(person.name)      # "Alice"\nprint(person.greet())   # "Hi, I\'m Alice"' },
    { title: `${languageName} Inheritance`, description: `Classes can inherit from other classes with class Child(Parent). Child inherits attributes and methods. Override methods by redefining them. Use super() to call parent methods. ${languageName} supports multiple inheritance.`, syntax: 'class Child(Parent):', usage: 'Extend classes', code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        return "Some sound"\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof!"\n\ndog = Dog("Buddy")\nprint(dog.name)    # "Buddy"\nprint(dog.speak()) # "Woof!"' },
    { title: `${languageName} Iterators`, description: `Iterators are objects that can be iterated over. Implement __iter__() and __next__() methods. Use iter() to get iterator, next() to get next value. StopIteration exception signals end. All collections (list, tuple, dict, set) are iterable.`, syntax: 'iter(obj), next(iterator)', usage: 'Create custom iterators', code: 'class Counter:\n    def __init__(self, max):\n        self.max = max\n        self.current = 0\n    \n    def __iter__(self):\n        return self\n    \n    def __next__(self):\n        if self.current >= self.max:\n            raise StopIteration\n        self.current += 1\n        return self.current\n\nfor num in Counter(5):\n    print(num)  # 1 2 3 4 5' },
    { title: `${languageName} Generators`, description: `Generators are functions that use yield instead of return. They generate values lazily (on demand). More memory efficient than creating full lists. Use next() or for loop to get values. Generator expressions similar to list comprehensions but with ().`, syntax: 'yield value', usage: 'Generate values lazily', code: 'def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nfor num in fibonacci(10):\n    print(num)\n\n# Generator expression\nsquares = (x**2 for x in range(5))\nprint(list(squares))  # [0, 1, 4, 9, 16]' },
    { title: `${languageName} Decorators`, description: `Decorators modify or enhance functions. Use @decorator syntax. Decorators are functions that take a function and return a new function. Common use cases: logging, timing, authentication, caching.`, syntax: '@decorator', usage: 'Extend function behavior', code: 'def uppercase(func):\n    def wrapper():\n        result = func()\n        return result.upper()\n    return wrapper\n\n@uppercase\ndef greet():\n    return "hello"\n\nprint(greet())  # "HELLO"\n\n# Decorator with arguments\ndef repeat(times):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            for _ in range(times):\n                func(*args, **kwargs)\n        return wrapper\n    return decorator' },
    { title: `${languageName} Regular Expressions`, description: `Regular expressions (regex) for pattern matching. Import re module. Common functions: search(), match(), findall(), sub(). Use raw strings r"pattern". Metacharacters: . * + ? [] {} ^ $ | ().`, syntax: 'import re', usage: 'Search and validate text', code: 'import re\n\ntext = "My email is user@example.com"\npattern = r"[\\w.-]+@[\\w.-]+\\.\\w+"\n\nmatch = re.search(pattern, text)\nif match:\n    print(match.group())  # "user@example.com"\n\n# Find all\nphones = "Call 555-1234 or 555-5678"\nnumbers = re.findall(r"\\d{3}-\\d{4}", phones)\nprint(numbers)  # [\'555-1234\', \'555-5678\']' },
    { title: `${languageName} JSON Handling`, description: `Work with JSON data using json module. json.dumps() converts Python to JSON string. json.loads() converts JSON string to Python. json.dump() and json.load() work with files. Common for APIs and config files.`, syntax: 'import json', usage: 'Work with JSON data', code: 'import json\n\n# Python to JSON\ndata = {"name": "Alice", "age": 30, "active": True}\njson_string = json.dumps(data)\nprint(json_string)  # \'{"name": "Alice", "age": 30, "active": true}\'\n\n# JSON to Python\nparsed = json.loads(json_string)\nprint(parsed["name"])  # "Alice"\n\n# Write to file\nwith open("data.json", "w") as f:\n    json.dump(data, f, indent=2)' },
    { title: `${languageName} OS Operations`, description: `os module for operating system operations. Get current directory, list files, create/remove directories, check if file exists. os.path for path operations. pathlib.Path is modern alternative.`, syntax: 'import os', usage: 'Interact with file system', code: 'import os\n\nprint(os.getcwd())  # current directory\nprint(os.listdir("."))  # list files\n\nos.mkdir("new_folder")\nos.remove("file.txt")\n\nif os.path.exists("data.txt"):\n    print("File exists")\n\nfrom pathlib import Path\npath = Path("data") / "file.txt"\npath.write_text("Hello")' },
    { title: `${languageName} Date and Time`, description: `datetime module for working with dates and times. datetime.now() gets current time. Create specific dates with datetime(year, month, day). Format with strftime(), parse with strptime(). timedelta for time arithmetic.`, syntax: 'import datetime', usage: 'Handle dates and times', code: 'from datetime import datetime, timedelta\n\nnow = datetime.now()\nprint(now.strftime("%Y-%m-%d %H:%M:%S"))\n\nbirthday = datetime(2000, 1, 15)\nage_days = (now - birthday).days\nprint(f"Age in days: {age_days}")\n\n# Add/subtract time\ntomorrow = now + timedelta(days=1)\nnext_week = now + timedelta(weeks=1)' },
    { title: `${languageName} Arguments`, description: `Command line arguments accessible via sys.argv. argv[0] is script name, argv[1:] are arguments. Use argparse module for complex CLI. argparse handles types, defaults, help messages automatically.`, syntax: 'import sys, import argparse', usage: 'Parse command line args', code: 'import sys\nprint(sys.argv)  # [\'script.py\', \'arg1\', \'arg2\']\n\nimport argparse\nparser = argparse.ArgumentParser()\nparser.add_argument("name", help="Your name")\nparser.add_argument("--age", type=int, default=0)\nargs = parser.parse_args()\nprint(f"{args.name}, age {args.age}")' },
    { title: `${languageName} Virtual Environments`, description: `Virtual environments isolate project dependencies. Create with python -m venv env_name. Activate with source env/bin/activate (Unix) or env\\Scripts\\activate (Windows). Install packages with pip. requirements.txt lists dependencies.`, syntax: 'python -m venv venv', usage: 'Isolate project dependencies', code: '# Create virtual environment\npython -m venv myenv\n\n# Activate (Unix)\nsource myenv/bin/activate\n\n# Install packages\npip install requests flask\n\n# Save dependencies\npip freeze > requirements.txt\n\n# Install from requirements\npip install -r requirements.txt' },

    // ADVANCED (15 lessons)
    { title: `${languageName} Context Managers`, description: `Context managers handle setup and cleanup with with statement. Implement __enter__() and __exit__() methods. Use @contextmanager decorator for simple cases. Common for file handling, database connections, locks.`, syntax: 'with expression as variable:', usage: 'Manage resources', code: 'from contextlib import contextmanager\n\n@contextmanager\ndef timer():\n    import time\n    start = time.time()\n    yield\n    end = time.time()\n    print(f"Elapsed: {end - start}s")\n\nwith timer():\n    # code to time\n    sum(range(1000000))' },
    { title: `${languageName} Multiple Inheritance`, description: `${languageName} supports inheriting from multiple classes. Method Resolution Order (MRO) determines which method is called. Use super() carefully. Check MRO with ClassName.__mro__. Mixins are common pattern.`, syntax: 'class Child(Parent1, Parent2):', usage: 'Combine behaviors', code: 'class Flyable:\n    def fly(self):\n        return "Flying"\n\nclass Swimmable:\n    def swim(self):\n        return "Swimming"\n\nclass Duck(Flyable, Swimmable):\n    pass\n\nduck = Duck()\nprint(duck.fly())   # "Flying"\nprint(duck.swim())  # "Swimming"\nprint(Duck.__mro__)  # Method Resolution Order' },
    { title: `${languageName} Magic Methods`, description: `Magic methods (dunder methods) customize class behavior. __init__, __str__, __repr__, __len__, __getitem__, __setitem__, __add__, __eq__, etc. Allow operator overloading and custom behavior with built-in functions.`, syntax: '__method__', usage: 'Customize class behavior', code: 'class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    \n    def __str__(self):\n        return f"Point({self.x}, {self.y})"\n    \n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n\np1 = Point(1, 2)\np2 = Point(3, 4)\nprint(p1 + p2)  # Point(4, 6)' },
    { title: `${languageName} Property Decorators`, description: `@property decorator creates computed attributes. Define getter, setter, deleter with @property, @name.setter, @name.deleter. Allows method calls to look like attribute access. Good for validation and computed values.`, syntax: '@property', usage: 'Create managed attributes', code: 'class Person:\n    def __init__(self, name):\n        self._name = name\n    \n    @property\n    def name(self):\n        return self._name\n    \n    @name.setter\n    def name(self, value):\n        if not value:\n            raise ValueError("Name cannot be empty")\n        self._name = value\n\np = Person("Alice")\nprint(p.name)  # "Alice"\np.name = "Bob"  # uses setter' },
    { title: `${languageName} Threading`, description: `threading module for concurrent execution. Create threads with Thread(target=function). Use start() to begin, join() to wait. Threads share memory. Use locks to prevent race conditions. Good for I/O-bound tasks.`, syntax: 'from threading import Thread', usage: 'Run concurrent code', code: 'from threading import Thread\nimport time\n\ndef task(name):\n    print(f"{name} starting")\n    time.sleep(2)\n    print(f"{name} done")\n\nt1 = Thread(target=task, args=("Task 1",))\nt2 = Thread(target=task, args=("Task 2",))\n\nt1.start()\nt2.start()\nt1.join()\nt2.join()' },
    { title: `${languageName} Multiprocessing`, description: `multiprocessing module for true parallel execution. Create processes with Process(target=function). Each process has separate memory. Good for CPU-bound tasks. Pool for parallel map operations. Queue for inter-process communication.`, syntax: 'from multiprocessing import Process', usage: 'Parallel processing', code: 'from multiprocessing import Process, Pool\n\ndef square(n):\n    return n * n\n\n# Using Pool\nwith Pool(4) as p:\n    results = p.map(square, range(10))\n    print(results)\n\n# Using Process\ndef worker(num):\n    print(f"Worker {num}")\n\np1 = Process(target=worker, args=(1,))\np1.start()\np1.join()' },
    { title: `${languageName} Async/Await`, description: `asyncio for asynchronous programming. Define async functions with async def. Use await to wait for async operations. Run with asyncio.run(). Good for I/O-bound and network operations. More efficient than threading for many concurrent tasks.`, syntax: 'async def, await', usage: 'Asynchronous programming', code: 'import asyncio\n\nasync def fetch_data(id):\n    print(f"Fetching {id}")\n    await asyncio.sleep(1)  # simulate I/O\n    return f"Data {id}"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch_data(1),\n        fetch_data(2),\n        fetch_data(3)\n    )\n    print(results)\n\nasyncio.run(main())' },
    { title: `${languageName} Type Hints`, description: `Type hints (PEP 484) add optional static typing. Use : for variables, -> for return types. from typing import List, Dict, Optional, Union. Type hints improve IDE support and enable static analysis with mypy.`, syntax: 'def func(param: type) -> type:', usage: 'Add type information', code: 'from typing import List, Optional\n\ndef greet(name: str) -> str:\n    return f"Hello, {name}"\n\ndef process(items: List[int]) -> int:\n    return sum(items)\n\ndef find_user(id: int) -> Optional[dict]:\n    # returns dict or None\n    return {"id": id, "name": "Alice"}' },
    { title: `${languageName} Data Classes`, description: `@dataclass decorator (Python 3.7+) automatically generates __init__, __repr__, __eq__. Reduces boilerplate for classes that store data. Supports default values, post-init processing, frozen (immutable) instances.`, syntax: '@dataclass', usage: 'Create data containers', code: 'from dataclasses import dataclass\n\n@dataclass\nclass Person:\n    name: str\n    age: int\n    email: str = ""\n    \np = Person("Alice", 30)\nprint(p)  # Person(name=\'Alice\', age=30, email=\'\')\nprint(p.name)  # "Alice"\n\n# Frozen (immutable)\n@dataclass(frozen=True)\nclass Point:\n    x: int\n    y: int' },
    { title: `${languageName} Collections`, description: `collections module provides specialized container datatypes. namedtuple for named fields, Counter for counting, defaultdict for default values, deque for efficient append/pop, OrderedDict for insertion order (dict is ordered in 3.7+).`, syntax: 'from collections import ...', usage: 'Advanced data structures', code: 'from collections import Counter, namedtuple, defaultdict\n\n# Counter\ncounts = Counter("hello world")\nprint(counts)  # Counter({\'l\': 3, \'o\': 2, ...})\n\n# namedtuple\nPoint = namedtuple("Point", ["x", "y"])\np = Point(10, 20)\nprint(p.x, p.y)\n\n# defaultdict\nscores = defaultdict(int)\nscores["Alice"] += 1' },
    { title: `${languageName} Testing`, description: `unittest module for unit testing. Create test classes inheriting from unittest.TestCase. Methods starting with test_ are test cases. Assertions: assertEqual, assertTrue, assertRaises. Run with python -m unittest. pytest is popular alternative.`, syntax: 'import unittest', usage: 'Test your code', code: 'import unittest\n\ndef add(a, b):\n    return a + b\n\nclass TestMath(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(add(2, 3), 5)\n    \n    def test_add_negative(self):\n        self.assertEqual(add(-1, 1), 0)\n\nif __name__ == "__main__":\n    unittest.main()' },
    { title: `${languageName} Packaging`, description: `Create distributable packages with setup.py or pyproject.toml. Structure: package_name/__init__.py for package. Upload to PyPI with twine. Install with pip install package_name. Use __init__.py to expose public API.`, syntax: 'setup.py, pyproject.toml', usage: 'Distribute code', code: '# setup.py\nfrom setuptools import setup, find_packages\n\nsetup(\n    name="mypackage",\n    version="0.1.0",\n    packages=find_packages(),\n    install_requires=[\n        "requests>=2.28.0",\n    ],\n)\n\n# Build: python setup.py sdist\n# Install: pip install dist/mypackage-0.1.0.tar.gz' },
    { title: `${languageName} Web Scraping`, description: `requests library for HTTP requests. BeautifulSoup for parsing HTML. Get page with requests.get(). Parse with BeautifulSoup(html, "html.parser"). Find elements with find(), find_all(). Always respect robots.txt and rate limits.`, syntax: 'import requests, BeautifulSoup', usage: 'Extract web data', code: 'import requests\nfrom bs4 import BeautifulSoup\n\nresponse = requests.get("https://example.com")\nhtml = response.text\n\nsoup = BeautifulSoup(html, "html.parser")\ntitle = soup.find("title").text\nprint(title)\n\nlinks = soup.find_all("a")\nfor link in links:\n    print(link.get("href"))' },
    { title: `${languageName} Web Development`, description: `Flask and Django are popular web frameworks. Flask is lightweight: @app.route() for URLs, return strings/templates. Django is full-featured: MVT pattern, ORM, admin panel. FastAPI for modern async APIs.`, syntax: 'Flask/Django/FastAPI', usage: 'Build web applications', code: '# Flask\nfrom flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return "Hello, World!"\n\n@app.route("/users/<int:id>")\ndef get_user(id):\n    return f"User {id}"\n\nif __name__ == "__main__":\n    app.run(debug=True)' },
    { title: `${languageName} Best Practices`, description: `Follow PEP 8 style guide. Use meaningful names. Keep functions small and focused. Write docstrings for modules, classes, functions. Use type hints. Write tests. Use virtual environments. Keep dependencies updated. Use version control (git).`, syntax: 'Coding standards', usage: 'Write quality code', code: '# Good: descriptive names, docstring, type hints\ndef calculate_average(numbers: List[float]) -> float:\n    """\n    Calculate arithmetic mean of numbers.\n    \n    Args:\n        numbers: List of numbers\n    \n    Returns:\n        Average value\n    """\n    return sum(numbers) / len(numbers)' },
  ]

  return lessons
}

// Node.js backend with rich API examples (40 topics)
function nodeBackendSpecs(languageName: string): SectionSpec[] {
  const topics: SectionSpec[] = [
    { title: `${languageName} Backend HOME`, description: `Use ${languageName} to build APIs, services, and jobs with routing, validation, persistence, and observability.`, syntax: 'HTTP handlers, routing', usage: 'Serve data', code: 'import express from "express"; const app = express(); app.get("/health", (_req,res)=>res.json({ok:true}));' },
    { title: 'Project Setup', description: 'Init package, TypeScript, ts-node, nodemon.', syntax: 'npm init -y, tsconfig', usage: 'Bootstrap API', code: 'npm install express zod typescript ts-node -D' },
    { title: 'App Structure', description: 'Feature-based folders for routes, controllers, services.', syntax: 'routes/, controllers/', usage: 'Organization', code: 'src/routes/user.routes.ts' },
    { title: 'Routing Basics', description: 'Express routers for CRUD endpoints.', syntax: 'router.get/post/put/delete', usage: 'Expose resources', code: 'router.get("/users", listUsers)' },
    { title: 'Controllers', description: 'Thin controllers delegating to services.', syntax: '(req,res) handlers', usage: 'Separation of concerns', code: 'export async function createUser(req,res){ const user = await svc.create(req.body); res.status(201).json(user); }' },
    { title: 'Middleware', description: 'JSON parsing, CORS, logging, compression.', syntax: 'app.use()', usage: 'Cross-cutting concerns', code: 'app.use(express.json()); app.use(cors());' },
    { title: 'Validation', description: 'Validate payloads with zod/yup and return 400 on failure.', syntax: 'schema.safeParse', usage: 'Trust boundaries', code: 'const parsed = schema.safeParse(req.body); if(!parsed.success) return res.status(400).json(parsed.error);' },
    { title: 'Error Handling', description: 'Central error middleware with problem+json responses.', syntax: 'app.use((err,req,res,next)=>{})', usage: 'Consistent errors', code: 'res.status(500).json({ message: err.message })' },
    { title: 'Logging', description: 'Structured logs with pino/winston; include correlation ids.', syntax: 'logger.info({ route })', usage: 'Traceability', code: 'logger.info({ route: req.path, user: req.user?.id })' },
    { title: 'Env and Config', description: 'dotenv, config defaults, schema validation.', syntax: 'process.env, zod', usage: 'Safe config', code: 'const Config = z.object({ PORT: z.string() }).parse(process.env);' },
    { title: 'Persistence with ORM', description: 'Use Prisma/TypeORM/Drizzle for DB access.', syntax: 'prisma.user.findMany', usage: 'Store data', code: 'const users = await prisma.user.findMany();' },
    { title: 'Migrations', description: 'Schema migrations and rollback plans.', syntax: 'prisma migrate deploy', usage: 'Evolve schema', code: 'npx prisma migrate dev --name init' },
    { title: 'CRUD Patterns', description: 'Create, list, detail, update, delete with pagination.', syntax: 'limit/offset, cursor', usage: 'Resource ops', code: 'router.get("/posts", paginatedList)' },
    { title: 'Filtering and Sorting', description: 'Query params for filters and sorts; validate.', syntax: 'req.query', usage: 'Flexible APIs', code: 'const { sort="-createdAt" } = req.query;' },
    { title: 'Pagination', description: 'Cursor or offset pagination with metadata.', syntax: 'limit, offset, nextCursor', usage: 'Scalable lists', code: 'return { data, nextCursor }' },
    { title: 'Authentication (Sessions)', description: 'Cookie/session auth with secure flags.', syntax: 'express-session', usage: 'Stateful auth', code: 'app.use(session({ secret, cookie: { httpOnly: true, secure: true } }))' },
    { title: 'Authentication (JWT)', description: 'Stateless auth with JWT access/refresh tokens.', syntax: 'jwt.sign/verify', usage: 'Token auth', code: 'const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "15m" })' },
    { title: 'Authorization', description: 'Role and permission checks in middleware.', syntax: 'req.user.roles', usage: 'Least privilege', code: 'if(!req.user?.roles.includes("admin")) return res.sendStatus(403)' },
    { title: 'Password Security', description: 'Hash with bcrypt/argon2, salts, pepper.', syntax: 'bcrypt.hash', usage: 'Protect credentials', code: 'const hash = await bcrypt.hash(password, 12)' },
    { title: 'API Contracts', description: 'OpenAPI/Swagger docs for endpoints.', syntax: 'swagger-ui-express', usage: 'Discoverability', code: 'app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec))' },
    { title: 'Response Shaping', description: 'DTOs/serializers to control output.', syntax: 'map entity to view', usage: 'Clean contracts', code: 'return { id: user.id, email: user.email }' },
    { title: 'File Uploads', description: 'Handle multipart uploads with limits and scanning.', syntax: 'multer', usage: 'Receive files', code: 'const upload = multer({ limits: { fileSize: 5_000_000 } })' },
    { title: 'Static Assets', description: 'Serve static files with caching headers.', syntax: 'express.static', usage: 'Assets', code: 'app.use("/public", express.static("public", { maxAge: "1d" }))' },
    { title: 'Caching', description: 'In-memory/Redis caching, cache keys, TTL.', syntax: 'redis.get/set', usage: 'Lower latency', code: 'await redis.set("user:1", JSON.stringify(user), { EX: 300 })' },
    { title: 'Rate Limiting', description: 'Protect APIs with token bucket/sliding window.', syntax: 'rate-limit middleware', usage: 'Abuse prevention', code: 'app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }))' },
    { title: 'CORS and Security Headers', description: 'Set CORS policy, Helmet headers.', syntax: 'cors(), helmet()', usage: 'Harden surface', code: 'app.use(helmet()); app.use(cors({ origin: allowed }))' },
    { title: 'Background Jobs', description: 'Queues for email, billing, reports.', syntax: 'bullmq/agenda', usage: 'Async tasks', code: 'queue.add("send-email", { userId })' },
    { title: 'Scheduling', description: 'Cron jobs for maintenance and reports.', syntax: 'node-cron', usage: 'Timed tasks', code: 'cron.schedule("0 2 * * *", nightlyJob)' },
    { title: 'WebSockets/Realtime', description: 'Socket.io or ws for realtime features.', syntax: 'io.on("connection")', usage: 'Live updates', code: 'io.on("connection", socket => { socket.emit("hello") })' },
    { title: 'GraphQL or tRPC', description: 'Alternate API styles for contracts.', syntax: 'graphql schema, tRPC routers', usage: 'Fit to needs', code: '// define schema or router' },
    { title: 'Testing (Unit)', description: 'Test services with Vitest/Jest.', syntax: 'describe/test', usage: 'Correctness', code: 'expect(service.sum(1,1)).toBe(2)' },
    { title: 'Testing (Integration)', description: 'Supertest against HTTP server.', syntax: 'supertest(app)', usage: 'Endpoint coverage', code: 'await request(app).get("/health").expect(200)' },
    { title: 'Testing (E2E)', description: 'Playwright/Cypress for flows.', syntax: 'browser tests', usage: 'User confidence', code: '// run e2e on staging' },
    { title: 'Monitoring and Metrics', description: 'Expose health, readiness, metrics.', syntax: '/health, /ready, /metrics', usage: 'Ops visibility', code: 'app.get("/health", (_req,res)=>res.json({ ok:true }))' },
    { title: 'Tracing', description: 'OpenTelemetry tracing for services.', syntax: 'otel sdk', usage: 'Request visibility', code: '// configure OTEL exporter' },
    { title: 'Performance Tuning', description: 'Profiling, clustering, connection pooling.', syntax: 'node --prof, cluster', usage: 'Handle load', code: 'if(cluster.isPrimary){ /* fork */ }' },
    { title: 'Streaming and SSE', description: 'Use streams for large payloads, Server-Sent Events.', syntax: 'res.write, res.flushHeaders', usage: 'Progressive responses', code: 'res.write("data: hello\\n\\n")' },
    { title: 'Deployments', description: 'Dockerfile, docker-compose, cloud run options.', syntax: 'docker build/run', usage: 'Ship to prod', code: 'FROM node:20-alpine\nCMD ["node","dist/index.js"]' },
    { title: 'CI/CD', description: 'Automate lint, test, build, deploy.', syntax: 'GitHub Actions', usage: 'Quality gates', code: 'name: api-ci\non: [push]' },
    { title: 'Chaos and Resilience', description: 'Timeouts, retries, circuit breakers.', syntax: 'AbortController, backoff', usage: 'Stability', code: 'const controller = new AbortController(); setTimeout(()=>controller.abort(),5000);' },
    { title: 'Documentation and Onboarding', description: 'README, run scripts, env samples.', syntax: 'docs + scripts', usage: 'Team speed', code: 'npm run dev\nnpm run lint' },
  ]
  return topics
}

// Backend generic (non-Node)
function backendSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} Backend HOME`, description: `Use ${languageName} to build APIs, services, and jobs.`, syntax: 'HTTP handlers, routing', usage: 'Serve data', code: 'app.get("/health", (_req,res)=>res.json({ok:true}))' },
    { title: 'Routing and Controllers', description: 'Group endpoints by resource with clear handlers.', syntax: 'GET/POST/PUT/DELETE', usage: 'API surface', code: 'router.post("/users", createUser)' },
    { title: 'Middleware and Parsing', description: 'Handle JSON, CORS, logging, and errors centrally.', syntax: 'app.use()', usage: 'Cross-cutting concerns', code: 'app.use(express.json())' },
    { title: 'Validation', description: 'Validate payloads with schemas; reject bad input.', syntax: 'zod.safeParse, joi', usage: 'Trust boundaries', code: 'schema.parse(req.body)' },
    { title: 'Data Access', description: 'Connect to databases with parameterized queries or ORMs.', syntax: 'SQL/ORM', usage: 'Persist data', code: 'await db.insert({ table: "users", values: { email } })' },
    { title: 'Authentication and Authorization', description: 'Sessions, JWTs, and role-based access.', syntax: 'cookies, headers, roles', usage: 'Secure endpoints', code: 'if(!req.user) return res.status(401).end()' },
    { title: 'Caching and Performance', description: 'Use Redis or in-memory caching for hot paths.', syntax: 'GET/SET with TTL', usage: 'Reduce latency', code: 'await cache.set("user:1", json, 60)' },
    { title: 'Background Jobs', description: 'Queues for email, billing, or heavy work.', syntax: 'workers, queues', usage: 'Async tasks', code: 'queue.add("send-email", payload)' },
    { title: 'Testing', description: 'Test routes and services with supertest or similar.', syntax: 'supertest, mocks', usage: 'Prevent regressions', code: 'await request(app).get("/health").expect(200)' },
    { title: 'Observability', description: 'Log structure, trace requests, and expose metrics.', syntax: 'structured logs, tracing', usage: 'Operate safely', code: 'logger.info({ route: req.path })' },
    { title: 'Deployment', description: 'Containerize, configure env vars, and run migrations.', syntax: 'Dockerfile, env', usage: 'Ship to prod', code: 'FROM node:20-alpine' },
    { title: 'Mini Project', description: 'CRUD API with auth, validation, and persistence.', syntax: 'routes + db', usage: 'Apply backend skills', code: 'app.listen(3000)' },
  ]
}

// Java Backend (Spring Boot)
function javaBackendSpecs(languageName: string): SectionSpec[] {
  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    { title: `${languageName} Backend HOME`, description: `${languageName} with Spring Boot is the leading platform for building enterprise-grade backend applications. Spring Boot provides auto-configuration, embedded servers, production-ready features, and a rich ecosystem for building REST APIs, microservices, and web applications.`, syntax: 'Spring Boot, Maven/Gradle, @Annotations', usage: 'Enterprise backend development', code: '@SpringBootApplication\npublic class Application {\n  public static void main(String[] args) {\n    SpringApplication.run(Application.class, args);\n  }\n}\n\n@RestController\npublic class HealthController {\n  @GetMapping("/health")\n  public Map<String, Boolean> health() {\n    return Map.of("ok", true);\n  }\n}' },
    { title: `${languageName} Introduction`, description: `${languageName} is a mature, object-oriented programming language with strong typing and excellent tooling. Spring Framework provides comprehensive infrastructure support. Spring Boot simplifies configuration with convention-over-configuration approach.`, syntax: 'Java 17+, Spring Boot 3.x', usage: 'Modern Java development', code: '// Java 17 features\nvar name = "Spring";\nrecord User(Long id, String name) {}\n\n// Spring Boot\n@RestController\nclass UserController {\n  @GetMapping("/users/{id}")\n  User getUser(@PathVariable Long id) {\n    return new User(id, "Alice");\n  }\n}' },
    { title: `${languageName} Project Setup`, description: `Create Spring Boot projects with Spring Initializr (start.spring.io). Choose dependencies: Spring Web, Spring Data JPA, Validation, Security. Build tools: Maven or Gradle. Project structure: src/main/java, src/main/resources.`, syntax: 'Spring Initializr, pom.xml/build.gradle', usage: 'Initialize projects', code: '// pom.xml\n<dependencies>\n  <dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-web</artifactId>\n  </dependency>\n  <dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-data-jpa</artifactId>\n  </dependency>\n</dependencies>' },
    { title: `${languageName} Application Structure`, description: `Organize code by feature or layer. Common packages: controller (REST endpoints), service (business logic), repository (data access), model/entity (domain objects), config (configuration). Main class annotated with @SpringBootApplication.`, syntax: 'Package structure', usage: 'Code organization', code: 'com.example.app\n├── Application.java\n├── controller\n│   └── UserController.java\n├── service\n│   └── UserService.java\n├── repository\n│   └── UserRepository.java\n├── model\n│   └── User.java\n└── config\n    └── SecurityConfig.java' },
    { title: `${languageName} Configuration`, description: `Configure application with application.properties or application.yml. Set port, database, logging levels. Use profiles for different environments (dev, prod). Access properties with @Value or @ConfigurationProperties.`, syntax: 'application.yml, @Value', usage: 'Application settings', code: '# application.yml\nserver:\n  port: 8080\nspring:\n  datasource:\n    url: jdbc:postgresql://localhost:5432/mydb\n    username: user\n    password: pass\n  jpa:\n    hibernate:\n      ddl-auto: update\n\n// Use in code\n@Value("${server.port}")\nprivate int port;' },

    // BASICS (15 lessons)
    { title: `${languageName} Controllers`, description: `Controllers handle HTTP requests. Use @RestController for REST APIs, @Controller for views. Method annotations: @GetMapping, @PostMapping, @PutMapping, @DeleteMapping. @PathVariable for URL params, @RequestParam for query params.`, syntax: '@RestController, @GetMapping', usage: 'Handle HTTP requests', code: '@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n  \n  @GetMapping\n  public List<User> getAll() {\n    return userService.findAll();\n  }\n  \n  @GetMapping("/{id}")\n  public User getById(@PathVariable Long id) {\n    return userService.findById(id);\n  }\n  \n  @PostMapping\n  public User create(@RequestBody User user) {\n    return userService.save(user);\n  }\n}' },
    { title: `${languageName} Request/Response`, description: `Handle request body with @RequestBody. Return objects automatically serialized to JSON. Use ResponseEntity for custom status codes and headers. @RequestParam for query parameters.`, syntax: '@RequestBody, ResponseEntity', usage: 'Process requests', code: '@PostMapping("/users")\npublic ResponseEntity<User> create(@RequestBody User user) {\n  User saved = userService.save(user);\n  return ResponseEntity.status(HttpStatus.CREATED).body(saved);\n}\n\n@GetMapping("/search")\npublic List<User> search(@RequestParam String name) {\n  return userService.findByName(name);\n}' },
    { title: `${languageName} Services`, description: `Services contain business logic. Annotate with @Service for component scanning. Inject dependencies via constructor. Keep controllers thin, services fat. Services are transactional by default.`, syntax: '@Service, constructor injection', usage: 'Business logic layer', code: '@Service\npublic class UserService {\n  private final UserRepository userRepository;\n  \n  public UserService(UserRepository userRepository) {\n    this.userRepository = userRepository;\n  }\n  \n  public User findById(Long id) {\n    return userRepository.findById(id)\n      .orElseThrow(() -> new ResourceNotFoundException("User not found"));\n  }\n  \n  @Transactional\n  public User save(User user) {\n    return userRepository.save(user);\n  }\n}' },
    { title: `${languageName} Dependency Injection`, description: `Spring manages beans (objects) in container. Use @Autowired, @Component, @Service, @Repository annotations. Constructor injection preferred over field injection. Use @Qualifier for multiple beans of same type.`, syntax: '@Autowired, constructor injection', usage: 'Loose coupling', code: '@Service\npublic class UserService {\n  private final UserRepository userRepository;\n  private final EmailService emailService;\n  \n  // Constructor injection (recommended)\n  public UserService(UserRepository userRepository, EmailService emailService) {\n    this.userRepository = userRepository;\n    this.emailService = emailService;\n  }\n}' },
    { title: `${languageName} Entities and JPA`, description: `Entities are Java classes mapped to database tables. Use @Entity, @Id, @GeneratedValue, @Column. JPA (Java Persistence API) handles ORM. Relationships: @OneToMany, @ManyToOne, @ManyToMany.`, syntax: '@Entity, @Id, @Column', usage: 'Database mapping', code: '@Entity\n@Table(name = "users")\npublic class User {\n  @Id\n  @GeneratedValue(strategy = GenerationType.IDENTITY)\n  private Long id;\n  \n  @Column(nullable = false, unique = true)\n  private String email;\n  \n  @Column(nullable = false)\n  private String name;\n  \n  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)\n  private List<Order> orders;\n  \n  // getters, setters, constructors\n}' },
    { title: `${languageName} Repositories`, description: `Repositories handle database operations. Extend JpaRepository for CRUD methods. Custom queries with @Query or method names. Spring Data JPA auto-implements methods based on naming conventions.`, syntax: 'JpaRepository, @Query', usage: 'Data access layer', code: 'public interface UserRepository extends JpaRepository<User, Long> {\n  // Auto-generated from method name\n  List<User> findByEmail(String email);\n  List<User> findByNameContaining(String name);\n  \n  // Custom query\n  @Query("SELECT u FROM User u WHERE u.email = ?1")\n  Optional<User> findByEmailCustom(String email);\n  \n  @Query("SELECT u FROM User u WHERE u.createdAt > :date")\n  List<User> findRecentUsers(@Param("date") LocalDateTime date);\n}' },
    { title: `${languageName} Validation`, description: `Bean Validation with javax.validation. Annotations: @NotNull, @NotEmpty, @Email, @Size, @Min, @Max. Use @Valid in controller. Custom validators with @Constraint. MethodValidation for service methods.`, syntax: '@Valid, @NotNull, @Email', usage: 'Input validation', code: 'public class User {\n  @NotNull(message = "Email is required")\n  @Email(message = "Invalid email format")\n  private String email;\n  \n  @NotEmpty(message = "Name is required")\n  @Size(min = 2, max = 50, message = "Name must be 2-50 characters")\n  private String name;\n  \n  @Min(value = 18, message = "Must be at least 18")\n  private Integer age;\n}\n\n@PostMapping("/users")\npublic User create(@Valid @RequestBody User user) {\n  return userService.save(user);\n}' },
    { title: `${languageName} Exception Handling`, description: `Handle exceptions globally with @ControllerAdvice and @ExceptionHandler. Return custom error responses. @ResponseStatus for HTTP status codes. Create custom exceptions extending RuntimeException.`, syntax: '@ControllerAdvice, @ExceptionHandler', usage: 'Error handling', code: '@ControllerAdvice\npublic class GlobalExceptionHandler {\n  \n  @ExceptionHandler(ResourceNotFoundException.class)\n  @ResponseStatus(HttpStatus.NOT_FOUND)\n  public ErrorResponse handleNotFound(ResourceNotFoundException ex) {\n    return new ErrorResponse(404, ex.getMessage());\n  }\n  \n  @ExceptionHandler(Exception.class)\n  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)\n  public ErrorResponse handleGeneric(Exception ex) {\n    return new ErrorResponse(500, "Internal server error");\n  }\n}\n\npublic class ResourceNotFoundException extends RuntimeException {\n  public ResourceNotFoundException(String message) {\n    super(message);\n  }\n}' },
    { title: `${languageName} DTOs and Mapping`, description: `Data Transfer Objects (DTOs) separate API models from entities. Use record classes for immutable DTOs. Map between DTOs and entities with ModelMapper or MapStruct. Prevents exposing internal structure.`, syntax: 'record, ModelMapper', usage: 'API layer separation', code: '// DTO\npublic record UserDTO(Long id, String name, String email) {}\n\n// Mapping\npublic class UserMapper {\n  public static UserDTO toDTO(User user) {\n    return new UserDTO(user.getId(), user.getName(), user.getEmail());\n  }\n  \n  public static User toEntity(UserDTO dto) {\n    User user = new User();\n    user.setName(dto.name());\n    user.setEmail(dto.email());\n    return user;\n  }\n}' },
    { title: `${languageName} Database Queries`, description: `JPQL (Java Persistence Query Language) for complex queries. Native SQL with @Query(nativeQuery = true). Criteria API for dynamic queries. Use @Transactional for write operations. Pagination and sorting support.`, syntax: 'JPQL, @Query, Pageable', usage: 'Advanced queries', code: '@Query("SELECT u FROM User u JOIN u.orders o WHERE o.total > :amount")\nList<User> findUsersWithOrdersAbove(@Param("amount") Double amount);\n\n@Query(value = "SELECT * FROM users WHERE created_at > ?1", nativeQuery = true)\nList<User> findRecentUsersNative(LocalDateTime date);\n\n// Pagination\nPage<User> findAll(Pageable pageable);\n\n// In controller\npublic Page<User> getUsers(int page, int size) {\n  return userService.findAll(PageRequest.of(page, size, Sort.by("name")));\n}' },
    { title: `${languageName} Transactions`, description: `@Transactional ensures atomic operations. Rollback on RuntimeException by default. Control propagation and isolation levels. Use at service layer. Read-only transactions for queries.`, syntax: '@Transactional, rollback', usage: 'Data consistency', code: '@Service\npublic class OrderService {\n  \n  @Transactional\n  public Order createOrder(Order order) {\n    order = orderRepository.save(order);\n    inventoryService.updateStock(order.getItems());\n    emailService.sendConfirmation(order.getUser().getEmail());\n    return order;\n  }\n  \n  @Transactional(readOnly = true)\n  public List<Order> findAll() {\n    return orderRepository.findAll();\n  }\n}' },
    { title: `${languageName} Testing with JUnit`, description: `Test with JUnit 5 and Spring Boot Test. @SpringBootTest loads full context. @WebMvcTest for controller tests. MockMvc for HTTP testing. @MockBean for mocking dependencies. AssertJ for fluent assertions.`, syntax: '@SpringBootTest, MockMvc, @MockBean', usage: 'Unit and integration tests', code: '@SpringBootTest\nclass UserServiceTest {\n  @Autowired\n  private UserService userService;\n  \n  @MockBean\n  private UserRepository userRepository;\n  \n  @Test\n  void testFindById() {\n    User user = new User(1L, "Alice");\n    when(userRepository.findById(1L)).thenReturn(Optional.of(user));\n    \n    User found = userService.findById(1L);\n    assertThat(found.getName()).isEqualTo("Alice");\n  }\n}' },
    { title: `${languageName} REST Testing`, description: `Test REST endpoints with MockMvc or RestTemplate. @WebMvcTest for lightweight tests. Verify status codes, response bodies, headers. Integration tests with TestRestTemplate.`, syntax: 'MockMvc, @WebMvcTest', usage: 'API testing', code: '@WebMvcTest(UserController.class)\nclass UserControllerTest {\n  @Autowired\n  private MockMvc mockMvc;\n  \n  @MockBean\n  private UserService userService;\n  \n  @Test\n  void testGetUser() throws Exception {\n    User user = new User(1L, "Alice");\n    when(userService.findById(1L)).thenReturn(user);\n    \n    mockMvc.perform(get("/api/users/1"))\n      .andExpect(status().isOk())\n      .andExpect(jsonPath("$.name").value("Alice"));\n  }\n}' },
    { title: `${languageName} Security Basics`, description: `Spring Security for authentication and authorization. Configure with SecurityFilterChain. Basic auth, form login, or JWT. @PreAuthorize for method-level security. Password encoding with BCrypt.`, syntax: 'Spring Security, @PreAuthorize', usage: 'Secure applications', code: '@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n  \n  @Bean\n  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n    http\n      .authorizeHttpRequests(auth -> auth\n        .requestMatchers("/api/public/**").permitAll()\n        .anyRequest().authenticated()\n      )\n      .httpBasic(Customizer.withDefaults());\n    return http.build();\n  }\n  \n  @Bean\n  public PasswordEncoder passwordEncoder() {\n    return new BCryptPasswordEncoder();\n  }\n}' },
    { title: `${languageName} Logging`, description: `Logging with SLF4J and Logback. Log levels: TRACE, DEBUG, INFO, WARN, ERROR. Configure in logback-spring.xml or application.yml. Use @Slf4j (Lombok) for logger injection.`, syntax: 'SLF4J, @Slf4j, logger', usage: 'Application logging', code: 'import lombok.extern.slf4j.Slf4j;\n\n@Slf4j\n@Service\npublic class UserService {\n  \n  public User findById(Long id) {\n    log.info("Finding user with id: {}", id);\n    try {\n      User user = userRepository.findById(id)\n        .orElseThrow(() -> new ResourceNotFoundException("User not found"));\n      log.debug("Found user: {}", user);\n      return user;\n    } catch (Exception e) {\n      log.error("Error finding user: {}", id, e);\n      throw e;\n    }\n  }\n}' },

    // INTERMEDIATE (10 lessons)
    { title: `${languageName} JWT Authentication`, description: `JWT (JSON Web Tokens) for stateless authentication. Generate tokens on login, validate on requests. Custom filter for token validation. Store user details in SecurityContext.`, syntax: 'JWT, JwtTokenProvider, Filter', usage: 'Token-based auth', code: '@Component\npublic class JwtTokenProvider {\n  @Value("${jwt.secret}")\n  private String secret;\n  \n  public String generateToken(String username) {\n    return Jwts.builder()\n      .setSubject(username)\n      .setIssuedAt(new Date())\n      .setExpiration(new Date(System.currentTimeMillis() + 86400000))\n      .signWith(SignatureAlgorithm.HS512, secret)\n      .compact();\n  }\n  \n  public boolean validateToken(String token) {\n    try {\n      Jwts.parser().setSigningKey(secret).parseClaimsJws(token);\n      return true;\n    } catch (Exception e) {\n      return false;\n    }\n  }\n}' },
    { title: `${languageName} Caching`, description: `Improve performance with caching. @EnableCaching and @Cacheable annotations. Cache providers: EhCache, Redis, Caffeine. @CacheEvict to invalidate cache. @CachePut to update cache.`, syntax: '@Cacheable, @CacheEvict, @CachePut', usage: 'Performance optimization', code: '@Configuration\n@EnableCaching\npublic class CacheConfig {}\n\n@Service\npublic class UserService {\n  \n  @Cacheable(value = "users", key = "#id")\n  public User findById(Long id) {\n    return userRepository.findById(id).orElseThrow();\n  }\n  \n  @CacheEvict(value = "users", key = "#user.id")\n  public User update(User user) {\n    return userRepository.save(user);\n  }\n}' },
    { title: `${languageName} Async Processing`, description: `Asynchronous methods with @Async. Run tasks in background thread pool. Returns CompletableFuture. Configure with @EnableAsync. Useful for email sending, notifications, long-running tasks.`, syntax: '@Async, @EnableAsync, CompletableFuture', usage: 'Background processing', code: '@Configuration\n@EnableAsync\npublic class AsyncConfig {}\n\n@Service\npublic class EmailService {\n  \n  @Async\n  public CompletableFuture<Void> sendEmail(String to, String subject, String body) {\n    // Send email logic\n    return CompletableFuture.completedFuture(null);\n  }\n}\n\n// Usage\nCompletableFuture<Void> future = emailService.sendEmail("user@example.com", "Welcome", "Hello!");\n// Continues without waiting' },
    { title: `${languageName} Scheduling`, description: `Schedule tasks with @Scheduled. Cron expressions for complex schedules. Fixed rate or delay. @EnableScheduling to activate. Useful for cleanup jobs, reports, data synchronization.`, syntax: '@Scheduled, @EnableScheduling, cron', usage: 'Periodic tasks', code: '@Configuration\n@EnableScheduling\npublic class SchedulingConfig {}\n\n@Component\npublic class ScheduledTasks {\n  \n  @Scheduled(fixedRate = 60000) // Every minute\n  public void reportStatus() {\n    log.info("Status check");\n  }\n  \n  @Scheduled(cron = "0 0 2 * * ?") // Daily at 2 AM\n  public void dailyCleanup() {\n    log.info("Running daily cleanup");\n  }\n}' },
    { title: `${languageName} File Upload`, description: `Handle file uploads with MultipartFile. Configure max file size. Save to disk or cloud storage. Validation for file types and sizes. Return download URLs.`, syntax: 'MultipartFile, @PostMapping', usage: 'File handling', code: '@PostMapping("/upload")\npublic ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {\n  if (file.isEmpty()) {\n    return ResponseEntity.badRequest().body("File is empty");\n  }\n  \n  try {\n    String filename = file.getOriginalFilename();\n    Path path = Paths.get("uploads/" + filename);\n    Files.write(path, file.getBytes());\n    return ResponseEntity.ok("File uploaded: " + filename);\n  } catch (IOException e) {\n    return ResponseEntity.status(500).body("Upload failed");\n  }\n}' },
    { title: `${languageName} API Documentation`, description: `Document APIs with SpringDoc OpenAPI (Swagger). Auto-generates interactive documentation. Annotations: @Tag, @Operation, @ApiResponse. Access at /swagger-ui.html.`, syntax: 'SpringDoc, @Operation, Swagger UI', usage: 'API documentation', code: '@RestController\n@Tag(name = "Users", description = "User management APIs")\npublic class UserController {\n  \n  @Operation(summary = "Get user by ID", description = "Returns a single user")\n  @ApiResponses(value = {\n    @ApiResponse(responseCode = "200", description = "Success"),\n    @ApiResponse(responseCode = "404", description = "User not found")\n  })\n  @GetMapping("/{id}")\n  public User getById(@PathVariable Long id) {\n    return userService.findById(id);\n  }\n}' },
    { title: `${languageName} Database Migration`, description: `Manage database schema with Flyway or Liquibase. Version-controlled SQL migrations. Auto-run on startup. Rollback support. Better than Hibernate ddl-auto for production.`, syntax: 'Flyway, migration scripts', usage: 'Schema versioning', code: '// src/main/resources/db/migration/V1__create_users_table.sql\nCREATE TABLE users (\n  id BIGSERIAL PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  name VARCHAR(255) NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n// application.yml\nspring:\n  flyway:\n    enabled: true\n    locations: classpath:db/migration' },
    { title: `${languageName} Profiles and Environments`, description: `Use Spring Profiles for environment-specific configuration. application-dev.yml, application-prod.yml. Activate with spring.profiles.active. Different databases, URLs, feature flags per environment.`, syntax: '@Profile, application-{profile}.yml', usage: 'Environment configuration', code: '// application-dev.yml\nspring:\n  datasource:\n    url: jdbc:h2:mem:testdb\n\n// application-prod.yml\nspring:\n  datasource:\n    url: jdbc:postgresql://prod-db:5432/app\n\n@Service\n@Profile("prod")\npublic class ProductionEmailService implements EmailService {}\n\n@Service\n@Profile("dev")\npublic class MockEmailService implements EmailService {}' },
    { title: `${languageName} Actuator and Monitoring`, description: `Spring Boot Actuator provides production-ready features. Health checks, metrics, info endpoints. Integrate with Prometheus, Grafana. Custom health indicators and metrics.`, syntax: 'Actuator, /actuator/health, metrics', usage: 'Production monitoring', code: '// application.yml\nmanagement:\n  endpoints:\n    web:\n      exposure:\n        include: health,info,metrics,prometheus\n  health:\n    show-details: always\n\n// Custom health indicator\n@Component\npublic class DatabaseHealthIndicator implements HealthIndicator {\n  @Override\n  public Health health() {\n    if (isDatabaseUp()) {\n      return Health.up().withDetail("database", "Available").build();\n    }\n    return Health.down().withDetail("database", "Unavailable").build();\n  }\n}' },
    { title: `${languageName} RestTemplate and WebClient`, description: `Call external APIs with RestTemplate (sync) or WebClient (async/reactive). Handle responses, errors. Set timeouts, headers, authentication. WebClient is preferred for new projects.`, syntax: 'RestTemplate, WebClient', usage: 'HTTP client', code: '// RestTemplate (synchronous)\n@Bean\npublic RestTemplate restTemplate() {\n  return new RestTemplate();\n}\n\npublic User fetchUser(Long id) {\n  return restTemplate.getForObject("https://api.example.com/users/" + id, User.class);\n}\n\n// WebClient (reactive)\n@Bean\npublic WebClient webClient() {\n  return WebClient.builder().baseUrl("https://api.example.com").build();\n}\n\npublic Mono<User> fetchUserAsync(Long id) {\n  return webClient.get()\n    .uri("/users/{id}", id)\n    .retrieve()\n    .bodyToMono(User.class);\n}' },

    // ADVANCED (5 lessons)
    { title: `${languageName} Microservices`, description: `Build microservices with Spring Cloud. Service discovery (Eureka), API gateway (Spring Cloud Gateway), config server, circuit breakers (Resilience4j). Inter-service communication with Feign.`, syntax: 'Spring Cloud, Eureka, Gateway', usage: 'Distributed systems', code: '@EnableDiscoveryClient\n@SpringBootApplication\npublic class UserService {}\n\n@FeignClient(name = "order-service")\npublic interface OrderClient {\n  @GetMapping("/api/orders/user/{userId}")\n  List<Order> getOrdersByUser(@PathVariable Long userId);\n}' },
    { title: `${languageName} Reactive Programming`, description: `Reactive programming with Spring WebFlux. Non-blocking I/O with Mono (0-1) and Flux (0-N). Reactive repositories. Better scalability for high-load applications. Functional endpoints.`, syntax: 'WebFlux, Mono, Flux', usage: 'Non-blocking apps', code: '@RestController\npublic class UserController {\n  \n  @GetMapping("/users")\n  public Flux<User> getAll() {\n    return userService.findAll();\n  }\n  \n  @GetMapping("/users/{id}")\n  public Mono<User> getById(@PathVariable Long id) {\n    return userService.findById(id);\n  }\n}\n\npublic interface UserRepository extends ReactiveCrudRepository<User, Long> {\n  Flux<User> findByName(String name);\n}' },
    { title: `${languageName} Messaging with Kafka`, description: `Integrate Apache Kafka for event streaming. Producer sends messages, consumer receives. Topics and partitions. Spring Kafka with @KafkaListener. Useful for decoupling services, event sourcing.`, syntax: 'Spring Kafka, @KafkaListener', usage: 'Event-driven architecture', code: '@Service\npublic class UserEventProducer {\n  @Autowired\n  private KafkaTemplate<String, UserEvent> kafkaTemplate;\n  \n  public void sendUserCreated(User user) {\n    UserEvent event = new UserEvent("USER_CREATED", user);\n    kafkaTemplate.send("user-events", event);\n  }\n}\n\n@Component\npublic class UserEventConsumer {\n  @KafkaListener(topics = "user-events", groupId = "notification-service")\n  public void consume(UserEvent event) {\n    log.info("Received event: {}", event);\n    // Process event\n  }\n}' },
    { title: `${languageName} Performance Tuning`, description: `Optimize performance: connection pooling (HikariCP), query optimization (N+1 problem), lazy loading, caching, async processing. Use database indexes. Profile with JProfiler or VisualVM. Monitor with Actuator metrics.`, syntax: 'HikariCP, @Async, indexing', usage: 'Application performance', code: '// Connection pool\nspring:\n  datasource:\n    hikari:\n      maximum-pool-size: 20\n      minimum-idle: 5\n      connection-timeout: 30000\n\n// Solve N+1 with @EntityGraph\n@EntityGraph(attributePaths = {"orders"})\nList<User> findAll();\n\n// Add index\n@Entity\n@Table(name = "users", indexes = {\n  @Index(name = "idx_email", columnList = "email")\n})\npublic class User {}' },
    { title: `${languageName} Deployment`, description: `Package as JAR with embedded Tomcat. Deploy to cloud (AWS, Azure, GCP), containers (Docker), or Kubernetes. Environment configuration, health checks. CI/CD with Jenkins, GitHub Actions, GitLab CI.`, syntax: 'mvn package, docker, kubernetes', usage: 'Production deployment', code: '// Dockerfile\nFROM eclipse-temurin:17-jre\nWORKDIR /app\nCOPY target/myapp.jar app.jar\nEXPOSE 8080\nENTRYPOINT ["java", "-jar", "app.jar"]\n\n// Build and run\nmvn clean package\ndocker build -t myapp .\ndocker run -p 8080:8080 myapp\n\n// Kubernetes deployment\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n      - name: myapp\n        image: myapp:latest\n        ports:\n        - containerPort: 8080' },
  ]

  return lessons
}

// Go Backend
function goBackendSpecs(languageName: string): SectionSpec[] {
  return [
    {
      title: `${languageName} HOME`,
      description: 'Go is a statically typed, compiled programming language designed at Google. It is known for its simplicity, efficiency, and excellent support for concurrent programming. Go is perfect for building scalable web servers, APIs, microservices, and cloud-native applications.',
      syntax: 'package main\nimport "fmt"\nfunc main() { }',
      usage: 'Build fast, reliable, and efficient server-side applications',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello, Go!")\n}'
    },
    {
      title: 'Introduction',
      description: 'Go (Golang) was created by Robert Griesemer, Rob Pike, and Ken Thompson at Google in 2007. It combines the efficiency of compiled languages with the ease of programming of interpreted languages. Go features garbage collection, built-in concurrency support, and a robust standard library.',
      syntax: 'Simple, C-like syntax',
      usage: 'Understand Go\'s design philosophy and use cases',
      code: '// Go is designed for:\n// - Web servers and APIs\n// - Cloud services\n// - Command-line tools\n// - DevOps and networking\n// - Distributed systems'
    },
    {
      title: 'Get Started',
      description: 'To start with Go, download and install it from golang.org. Set up your GOPATH and create your first Go program. Use "go run" to execute programs and "go build" to compile them.',
      syntax: 'go run filename.go\ngo build filename.go',
      usage: 'Install Go and run your first program',
      code: '// Install: https://golang.org/dl/\n// Verify installation:\n// go version\n\n// Run a program:\n// go run main.go\n\n// Build executable:\n// go build main.go'
    },
    {
      title: 'Syntax',
      description: 'Go syntax is clean and straightforward. Programs start with a package declaration, followed by imports, then declarations. Statements end without semicolons (automatically inserted). Curly braces define blocks. Go uses camelCase for naming.',
      syntax: 'package main\nimport "fmt"\nfunc main() { }',
      usage: 'Write syntactically correct Go code',
      code: 'package main\n\nimport (\n  "fmt"\n  "time"\n)\n\nfunc main() {\n  // This is a comment\n  fmt.Println("Current time:", time.Now())\n}'
    },
    {
      title: 'Variables',
      description: 'Go has multiple ways to declare variables: using var keyword, short declaration (:=), or const for constants. Go is statically typed, but can infer types. Variables must be used or the code won\'t compile.',
      syntax: 'var name type = value\nname := value\nconst PI = 3.14',
      usage: 'Declare and initialize variables',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  // Explicit type\n  var name string = "Alice"\n  \n  // Type inference\n  var age = 25\n  \n  // Short declaration\n  city := "New York"\n  \n  // Constant\n  const Pi = 3.14159\n  \n  fmt.Println(name, age, city, Pi)\n}'
    },
    {
      title: 'Data Types',
      description: 'Go has several data types: bool, string, int (int8, int16, int32, int64), uint, float32, float64, complex64, complex128, byte (uint8), and rune (int32). Use type conversions explicitly as Go doesn\'t allow implicit conversions.',
      syntax: 'var name type\nconverted := type(value)',
      usage: 'Work with different data types',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  var isActive bool = true\n  var count int = 42\n  var price float64 = 19.99\n  var initial rune = \'A\'\n  var message string = "Hello"\n  \n  // Type conversion\n  var x int = 10\n  var y float64 = float64(x)\n  \n  fmt.Println(isActive, count, price, initial, message, y)\n}'
    },
    {
      title: 'Arrays & Slices',
      description: 'Arrays have fixed size, while slices are dynamic. Slices are more common and flexible. Use make() to create slices with capacity. Slices are reference types. Use append() to add elements to slices.',
      syntax: 'var arr [5]int\nslice := []int{1, 2, 3}\nslice = append(slice, 4)',
      usage: 'Store and manipulate collections of data',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  // Array (fixed size)\n  var arr [3]int = [3]int{1, 2, 3}\n  \n  // Slice (dynamic)\n  slice := []string{"Go", "Python", "Java"}\n  slice = append(slice, "Rust")\n  \n  // Make slice with capacity\n  numbers := make([]int, 0, 5)\n  numbers = append(numbers, 10, 20, 30)\n  \n  fmt.Println(arr, slice, numbers)\n  fmt.Println("Length:", len(slice), "Capacity:", cap(numbers))\n}'
    },
    {
      title: 'Maps',
      description: 'Maps are Go\'s built-in hash table/dictionary type. They store key-value pairs. Use make() to create maps or use map literals. Check for key existence with the comma-ok idiom. Delete entries with delete().',
      syntax: 'map[KeyType]ValueType\nm := make(map[string]int)\nvalue, exists := m[key]',
      usage: 'Store and retrieve key-value pairs',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  // Create map\n  ages := make(map[string]int)\n  ages["Alice"] = 25\n  ages["Bob"] = 30\n  \n  // Map literal\n  scores := map[string]int{\n    "Math": 95,\n    "Science": 88,\n  }\n  \n  // Check existence\n  age, exists := ages["Alice"]\n  fmt.Println("Alice:", age, "Exists:", exists)\n  \n  // Delete\n  delete(ages, "Bob")\n  \n  fmt.Println(ages, scores)\n}'
    },
    {
      title: 'Functions',
      description: 'Functions are declared with the func keyword. They can return multiple values. Use named return values for clarity. Functions are first-class citizens and can be passed as arguments. Variadic functions accept variable number of arguments.',
      syntax: 'func name(param type) returnType { }\nfunc name(a, b int) (int, error) { }',
      usage: 'Create reusable code blocks',
      code: 'package main\n\nimport "fmt"\n\nfunc add(a, b int) int {\n  return a + b\n}\n\nfunc divide(a, b float64) (float64, error) {\n  if b == 0 {\n    return 0, fmt.Errorf("division by zero")\n  }\n  return a / b, nil\n}\n\nfunc sum(numbers ...int) int {\n  total := 0\n  for _, n := range numbers {\n    total += n\n  }\n  return total\n}\n\nfunc main() {\n  fmt.Println(add(5, 3))\n  result, _ := divide(10, 2)\n  fmt.Println(result)\n  fmt.Println(sum(1, 2, 3, 4, 5))\n}'
    },
    {
      title: 'Structs',
      description: 'Structs are typed collections of fields. They\'re used to group data together. Define structs with the type keyword. Access fields with dot notation. Structs can be initialized with field names or positionally.',
      syntax: 'type StructName struct { field type }',
      usage: 'Create custom data types',
      code: 'package main\n\nimport "fmt"\n\ntype Person struct {\n  Name string\n  Age  int\n  City string\n}\n\nfunc main() {\n  // Named initialization\n  p1 := Person{\n    Name: "Alice",\n    Age:  25,\n    City: "NYC",\n  }\n  \n  // Positional\n  p2 := Person{"Bob", 30, "LA"}\n  \n  // Access fields\n  fmt.Println(p1.Name, "is", p1.Age, "years old")\n  fmt.Println(p2)\n}'
    },
    {
      title: 'Methods',
      description: 'Methods are functions with a receiver argument. They allow you to define functions on types. Use pointer receivers to modify the receiver or for large structs. Value receivers create a copy.',
      syntax: 'func (receiver Type) methodName() { }',
      usage: 'Add behavior to custom types',
      code: 'package main\n\nimport "fmt"\n\ntype Rectangle struct {\n  Width, Height float64\n}\n\n// Value receiver\nfunc (r Rectangle) Area() float64 {\n  return r.Width * r.Height\n}\n\n// Pointer receiver\nfunc (r *Rectangle) Scale(factor float64) {\n  r.Width *= factor\n  r.Height *= factor\n}\n\nfunc main() {\n  rect := Rectangle{Width: 10, Height: 5}\n  fmt.Println("Area:", rect.Area())\n  \n  rect.Scale(2)\n  fmt.Println("Scaled:", rect)\n}'
    },
    {
      title: 'Interfaces',
      description: 'Interfaces define behavior as a set of method signatures. Types implement interfaces implicitly by implementing their methods. Empty interface (interface{}) can hold any type. Use type assertions to access underlying values.',
      syntax: 'type InterfaceName interface { Method() }',
      usage: 'Define contracts and enable polymorphism',
      code: 'package main\n\nimport "fmt"\n\ntype Shape interface {\n  Area() float64\n}\n\ntype Circle struct {\n  Radius float64\n}\n\nfunc (c Circle) Area() float64 {\n  return 3.14 * c.Radius * c.Radius\n}\n\ntype Rectangle struct {\n  Width, Height float64\n}\n\nfunc (r Rectangle) Area() float64 {\n  return r.Width * r.Height\n}\n\nfunc printArea(s Shape) {\n  fmt.Println("Area:", s.Area())\n}\n\nfunc main() {\n  c := Circle{Radius: 5}\n  r := Rectangle{Width: 10, Height: 5}\n  \n  printArea(c)\n  printArea(r)\n}'
    },
    {
      title: 'Pointers',
      description: 'Pointers hold memory addresses. Use & to get the address of a variable and * to dereference a pointer. Go passes arguments by value, use pointers to modify the original value. Go has no pointer arithmetic.',
      syntax: 'var ptr *Type\nptr = &variable\nvalue := *ptr',
      usage: 'Reference and modify values efficiently',
      code: 'package main\n\nimport "fmt"\n\nfunc increment(n *int) {\n  *n = *n + 1\n}\n\nfunc main() {\n  x := 10\n  fmt.Println("Before:", x)\n  \n  // Pass pointer\n  increment(&x)\n  fmt.Println("After:", x)\n  \n  // Pointer variable\n  ptr := &x\n  *ptr = 20\n  fmt.Println("Modified:", x)\n}'
    },
    {
      title: 'Error Handling',
      description: 'Go uses explicit error returns instead of exceptions. Functions return error as the last return value. Always check errors with if err != nil. Create custom errors with errors.New() or fmt.Errorf(). Use panic() only for unrecoverable errors.',
      syntax: 'if err != nil { }\nerrors.New("message")\nfmt.Errorf("error: %v", value)',
      usage: 'Handle errors gracefully',
      code: 'package main\n\nimport (\n  "errors"\n  "fmt"\n)\n\nfunc divide(a, b float64) (float64, error) {\n  if b == 0 {\n    return 0, errors.New("cannot divide by zero")\n  }\n  return a / b, nil\n}\n\nfunc main() {\n  result, err := divide(10, 2)\n  if err != nil {\n    fmt.Println("Error:", err)\n    return\n  }\n  fmt.Println("Result:", result)\n  \n  _, err = divide(10, 0)\n  if err != nil {\n    fmt.Println("Error:", err)\n  }\n}'
    },
    {
      title: 'Goroutines',
      description: 'Goroutines are lightweight threads managed by Go runtime. Launch a goroutine with the "go" keyword. They enable concurrent execution. Use sync.WaitGroup to wait for goroutines to finish. Goroutines communicate via channels.',
      syntax: 'go functionName()\ngo func() { }()',
      usage: 'Execute code concurrently',
      code: 'package main\n\nimport (\n  "fmt"\n  "sync"\n  "time"\n)\n\nfunc worker(id int, wg *sync.WaitGroup) {\n  defer wg.Done()\n  fmt.Printf("Worker %d starting\\n", id)\n  time.Sleep(time.Second)\n  fmt.Printf("Worker %d done\\n", id)\n}\n\nfunc main() {\n  var wg sync.WaitGroup\n  \n  for i := 1; i <= 3; i++ {\n    wg.Add(1)\n    go worker(i, &wg)\n  }\n  \n  wg.Wait()\n  fmt.Println("All workers done")\n}'
    },
    {
      title: 'Channels',
      description: 'Channels are typed conduits for communication between goroutines. Create with make(chan Type). Send with ch <- value and receive with value := <-ch. Channels can be buffered or unbuffered. Close channels when done sending.',
      syntax: 'ch := make(chan Type)\nch <- value\nvalue := <-ch\nclose(ch)',
      usage: 'Synchronize and communicate between goroutines',
      code: 'package main\n\nimport "fmt"\n\nfunc sum(nums []int, ch chan int) {\n  total := 0\n  for _, n := range nums {\n    total += n\n  }\n  ch <- total\n}\n\nfunc main() {\n  nums := []int{1, 2, 3, 4, 5, 6}\n  ch := make(chan int)\n  \n  go sum(nums[:len(nums)/2], ch)\n  go sum(nums[len(nums)/2:], ch)\n  \n  x, y := <-ch, <-ch\n  fmt.Println("Sum:", x+y)\n}'
    },
    {
      title: 'Packages',
      description: 'Packages organize code into reusable modules. Every Go file belongs to a package. Use import to use other packages. Exported identifiers start with a capital letter. The main package is the entry point for executables.',
      syntax: 'package packagename\nimport "path/to/package"',
      usage: 'Organize and reuse code',
      code: '// In file math/calc.go\npackage math\n\n// Exported function (capital letter)\nfunc Add(a, b int) int {\n  return a + b\n}\n\n// unexported function\nfunc subtract(a, b int) int {\n  return a - b\n}\n\n// In main.go\npackage main\n\nimport (\n  "fmt"\n  "myproject/math"\n)\n\nfunc main() {\n  result := math.Add(5, 3)\n  fmt.Println(result)\n}'
    },
    {
      title: 'Modules',
      description: 'Go modules are collections of packages. Use "go mod init" to create a new module. The go.mod file tracks dependencies. Use "go get" to add dependencies. Modules enable versioning and dependency management.',
      syntax: 'go mod init module-name\ngo get package-path',
      usage: 'Manage project dependencies',
      code: '// Initialize module\n// go mod init github.com/username/project\n\n// go.mod file:\nmodule github.com/username/project\n\ngo 1.21\n\nrequire (\n  github.com/gorilla/mux v1.8.0\n  gorm.io/gorm v1.25.0\n)\n\n// Add dependency:\n// go get github.com/gorilla/mux\n\n// Update dependencies:\n// go mod tidy'
    },
    {
      title: 'Web Server Basics',
      description: 'Go\'s net/http package makes it easy to build web servers. Use http.HandleFunc to define routes and handlers. Start server with http.ListenAndServe. Handle JSON with encoding/json. Use http.ResponseWriter and *http.Request for HTTP operations.',
      syntax: 'http.HandleFunc(pattern, handler)\nhttp.ListenAndServe(addr, nil)',
      usage: 'Build web servers and REST APIs',
      code: 'package main\n\nimport (\n  "encoding/json"\n  "net/http"\n  "fmt"\n)\n\ntype Response struct {\n  Message string `json:"message"`\n  Status  string `json:"status"`\n}\n\nfunc homeHandler(w http.ResponseWriter, r *http.Request) {\n  fmt.Fprintf(w, "Welcome to Go Web Server!")\n}\n\nfunc apiHandler(w http.ResponseWriter, r *http.Request) {\n  w.Header().Set("Content-Type", "application/json")\n  response := Response{\n    Message: "API is running",\n    Status:  "success",\n  }\n  json.NewEncoder(w).Encode(response)\n}\n\nfunc main() {\n  http.HandleFunc("/", homeHandler)\n  http.HandleFunc("/api", apiHandler)\n  \n  fmt.Println("Server starting on :8080")\n  http.ListenAndServe(":8080", nil)\n}'
    },
    {
      title: 'HTTP Routing',
      description: 'Use gorilla/mux for advanced routing with path variables, query parameters, and method-based routing.',
      syntax: 'r := mux.NewRouter()\nr.HandleFunc("/users/{id}", handler).Methods("GET")',
      usage: 'Advanced HTTP routing',
      code: 'import "github.com/gorilla/mux"\n\nfunc getUserHandler(w http.ResponseWriter, r *http.Request) {\n  vars := mux.Vars(r)\n  userID := vars["id"]\n  fmt.Fprintf(w, "User ID: %s", userID)\n}\n\nfunc main() {\n  r := mux.NewRouter()\n  r.HandleFunc("/users", getUsers).Methods("GET")\n  r.HandleFunc("/users/{id}", getUserHandler).Methods("GET")\n  r.HandleFunc("/users", createUser).Methods("POST")\n  http.ListenAndServe(":8080", r)\n}'
    },
    {
      title: 'Middleware',
      description: 'Create middleware functions to handle cross-cutting concerns like logging, authentication, and CORS.',
      syntax: 'func middleware(next http.Handler) http.Handler { }',
      usage: 'Add reusable functionality to handlers',
      code: 'func loggingMiddleware(next http.Handler) http.Handler {\n  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n    fmt.Printf("%s %s\\n", r.Method, r.URL.Path)\n    next.ServeHTTP(w, r)\n  })\n}\n\nfunc authMiddleware(next http.Handler) http.Handler {\n  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n    token := r.Header.Get("Authorization")\n    if token == "" {\n      http.Error(w, "Unauthorized", http.StatusUnauthorized)\n      return\n    }\n    next.ServeHTTP(w, r)\n  })\n}\n\nfunc main() {\n  r := mux.NewRouter()\n  r.Use(loggingMiddleware)\n  r.Handle("/protected", authMiddleware(http.HandlerFunc(protectedHandler)))\n  http.ListenAndServe(":8080", r)\n}'
    },
    {
      title: 'JSON Handling',
      description: 'Marshal and unmarshal JSON with encoding/json. Use struct tags to control JSON field names.',
      syntax: 'json.Marshal(v)\njson.Unmarshal(data, &v)',
      usage: 'Work with JSON data',
      code: 'type User struct {\n  ID    int    `json:"id"`\n  Name  string `json:"name"`\n  Email string `json:"email,omitempty"`\n}\n\nfunc createUser(w http.ResponseWriter, r *http.Request) {\n  var user User\n  err := json.NewDecoder(r.Body).Decode(&user)\n  if err != nil {\n    http.Error(w, err.Error(), http.StatusBadRequest)\n    return\n  }\n  user.ID = 1\n  w.Header().Set("Content-Type", "application/json")\n  json.NewEncoder(w).Encode(user)\n}'
    },
    {
      title: 'Database with database/sql',
      description: 'Connect to databases using database/sql package with drivers like pq (PostgreSQL) or mysql.',
      syntax: 'db, err := sql.Open("postgres", dsn)\ndb.Query(query, args...)',
      usage: 'Database operations',
      code: 'import (\n  "database/sql"\n  _ "github.com/lib/pq"\n)\n\nfunc main() {\n  db, err := sql.Open("postgres", "user=postgres dbname=mydb sslmode=disable")\n  if err != nil {\n    panic(err)\n  }\n  defer db.Close()\n  \n  rows, err := db.Query("SELECT id, name FROM users WHERE age > $1", 18)\n  if err != nil {\n    panic(err)\n  }\n  defer rows.Close()\n  \n  for rows.Next() {\n    var id int\n    var name string\n    rows.Scan(&id, &name)\n    fmt.Printf("%d: %s\\n", id, name)\n  }\n}'
    },
    {
      title: 'GORM ORM',
      description: 'Use GORM for object-relational mapping with auto-migration, associations, and query building.',
      syntax: 'db.Create(&model)\ndb.First(&model, id)\ndb.Where("age > ?", 18).Find(&users)',
      usage: 'Elegant database operations',
      code: 'import "gorm.io/gorm"\n\ntype User struct {\n  gorm.Model\n  Name  string\n  Email string `gorm:"uniqueIndex"`\n  Age   int\n}\n\nfunc main() {\n  db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})\n  db.AutoMigrate(&User{})\n  \n  user := User{Name: "Alice", Email: "alice@example.com", Age: 25}\n  db.Create(&user)\n  \n  var users []User\n  db.Where("age > ?", 18).Find(&users)\n  \n  db.First(&user, 1)\n  user.Age = 26\n  db.Save(&user)\n}'
    },
    {
      title: 'Environment Variables',
      description: 'Use os.Getenv() to read environment variables. Use godotenv for .env file support.',
      syntax: 'os.Getenv("VAR_NAME")\ngodotenv.Load()',
      usage: 'Configuration management',
      code: 'import (\n  "os"\n  "github.com/joho/godotenv"\n)\n\nfunc main() {\n  godotenv.Load()\n  \n  dbHost := os.Getenv("DB_HOST")\n  dbPort := os.Getenv("DB_PORT")\n  apiKey := os.Getenv("API_KEY")\n  \n  port := os.Getenv("PORT")\n  if port == "" {\n    port = "8080"\n  }\n  \n  fmt.Printf("Starting server on port %s\\n", port)\n}'
    },
    {
      title: 'Logging',
      description: 'Use log package for basic logging or logrus/zap for structured logging.',
      syntax: 'log.Println()\nlog.Fatal()\nlogrus.WithFields()',
      usage: 'Application logging',
      code: 'import (\n  "log"\n  "github.com/sirupsen/logrus"\n)\n\nfunc main() {\n  log.Println("Server starting")\n  log.Printf("Port: %d", 8080)\n  \n  // Structured logging with logrus\n  logrus.WithFields(logrus.Fields{\n    "user": "alice",\n    "action": "login",\n  }).Info("User logged in")\n  \n  logrus.Error("Something went wrong")\n}'
    },
    {
      title: 'Context',
      description: 'Use context.Context for cancellation, timeouts, and request-scoped values.',
      syntax: 'ctx, cancel := context.WithTimeout(parent, duration)\nctx.Done()',
      usage: 'Request lifecycle management',
      code: 'import "context"\n\nfunc doWork(ctx context.Context) error {\n  select {\n  case <-time.After(2 * time.Second):\n    fmt.Println("Work done")\n    return nil\n  case <-ctx.Done():\n    return ctx.Err()\n  }\n}\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n  ctx, cancel := context.WithTimeout(r.Context(), 1*time.Second)\n  defer cancel()\n  \n  if err := doWork(ctx); err != nil {\n    http.Error(w, err.Error(), http.StatusRequestTimeout)\n  }\n}'
    },
    {
      title: 'Testing',
      description: 'Write tests with testing package. Use table-driven tests for multiple test cases.',
      syntax: 'func TestName(t *testing.T) { }\nt.Run(name, func(t *testing.T) { })',
      usage: 'Unit and integration testing',
      code: 'import "testing"\n\nfunc Add(a, b int) int {\n  return a + b\n}\n\nfunc TestAdd(t *testing.T) {\n  tests := []struct {\n    name string\n    a, b int\n    want int\n  }{\n    {"positive", 2, 3, 5},\n    {"negative", -1, -1, -2},\n    {"zero", 0, 5, 5},\n  }\n  \n  for _, tt := range tests {\n    t.Run(tt.name, func(t *testing.T) {\n      got := Add(tt.a, tt.b)\n      if got != tt.want {\n        t.Errorf("Add(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want)\n      }\n    })\n  }\n}'
    },
    {
      title: 'Benchmarking',
      description: 'Benchmark code performance with testing.B. Run with go test -bench=.',
      syntax: 'func BenchmarkName(b *testing.B) { }',
      usage: 'Performance testing',
      code: 'func Fibonacci(n int) int {\n  if n < 2 {\n    return n\n  }\n  return Fibonacci(n-1) + Fibonacci(n-2)\n}\n\nfunc BenchmarkFibonacci(b *testing.B) {\n  for i := 0; i < b.N; i++ {\n    Fibonacci(10)\n  }\n}\n\n// Run: go test -bench=.\n// Output: BenchmarkFibonacci-8  1000000  1234 ns/op'
    },
    {
      title: 'File Uploads',
      description: 'Handle file uploads with multipart/form-data. Save uploaded files to disk or cloud storage.',
      syntax: 'r.ParseMultipartForm(maxSize)\nfile, header, err := r.FormFile("field")',
      usage: 'File upload handling',
      code: 'func uploadHandler(w http.ResponseWriter, r *http.Request) {\n  r.ParseMultipartForm(10 << 20) // 10 MB max\n  \n  file, header, err := r.FormFile("file")\n  if err != nil {\n    http.Error(w, err.Error(), http.StatusBadRequest)\n    return\n  }\n  defer file.Close()\n  \n  dst, err := os.Create("./uploads/" + header.Filename)\n  if err != nil {\n    http.Error(w, err.Error(), http.StatusInternalServerError)\n    return\n  }\n  defer dst.Close()\n  \n  io.Copy(dst, file)\n  fmt.Fprintf(w, "File uploaded: %s", header.Filename)\n}'
    },
    {
      title: 'JWT Authentication',
      description: 'Implement JWT-based authentication with jwt-go library.',
      syntax: 'token := jwt.NewWithClaims()\ntoken.SignedString(secret)',
      usage: 'Secure authentication',
      code: 'import "github.com/golang-jwt/jwt/v5"\n\nvar jwtSecret = []byte("secret-key")\n\ntype Claims struct {\n  UserID int `json:"user_id"`\n  jwt.RegisteredClaims\n}\n\nfunc generateToken(userID int) (string, error) {\n  claims := Claims{\n    UserID: userID,\n    RegisteredClaims: jwt.RegisteredClaims{\n      ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),\n    },\n  }\n  token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)\n  return token.SignedString(jwtSecret)\n}\n\nfunc validateToken(tokenString string) (*Claims, error) {\n  token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {\n    return jwtSecret, nil\n  })\n  if claims, ok := token.Claims.(*Claims); ok && token.Valid {\n    return claims, nil\n  }\n  return nil, err\n}'
    },
    {
      title: 'CORS',
      description: 'Handle Cross-Origin Resource Sharing with gorilla/handlers or custom middleware.',
      syntax: 'handlers.CORS(options...)(router)',
      usage: 'Enable cross-origin requests',
      code: 'import "github.com/gorilla/handlers"\n\nfunc main() {\n  r := mux.NewRouter()\n  r.HandleFunc("/api/users", getUsers).Methods("GET")\n  \n  corsOptions := handlers.CORS(\n    handlers.AllowedOrigins([]string{"http://localhost:3000"}),\n    handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),\n    handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),\n  )\n  \n  http.ListenAndServe(":8080", corsOptions(r))\n}'
    },
    {
      title: 'Rate Limiting',
      description: 'Implement rate limiting to prevent abuse using time/rate or third-party libraries.',
      syntax: 'limiter := rate.NewLimiter(rate.Limit(r), b)',
      usage: 'API protection',
      code: 'import "golang.org/x/time/rate"\n\nvar limiter = rate.NewLimiter(rate.Limit(10), 20) // 10 req/sec, burst 20\n\nfunc rateLimitMiddleware(next http.Handler) http.Handler {\n  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n    if !limiter.Allow() {\n      http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)\n      return\n    }\n    next.ServeHTTP(w, r)\n  })\n}'
    },
    {
      title: 'Caching',
      description: 'Implement caching with in-memory stores like go-cache or external stores like Redis.',
      syntax: 'cache.Set(key, value, expiration)\nvalue, found := cache.Get(key)',
      usage: 'Performance optimization',
      code: 'import "github.com/patrickmn/go-cache"\n\nvar c = cache.New(5*time.Minute, 10*time.Minute)\n\nfunc getUser(id int) (*User, error) {\n  key := fmt.Sprintf("user:%d", id)\n  \n  if cached, found := c.Get(key); found {\n    return cached.(*User), nil\n  }\n  \n  user, err := fetchUserFromDB(id)\n  if err != nil {\n    return nil, err\n  }\n  \n  c.Set(key, user, cache.DefaultExpiration)\n  return user, nil\n}'
    },
    {
      title: 'WebSockets',
      description: 'Implement real-time bidirectional communication with gorilla/websocket.',
      syntax: 'upgrader.Upgrade(w, r, nil)\nconn.WriteMessage(messageType, data)',
      usage: 'Real-time features',
      code: 'import "github.com/gorilla/websocket"\n\nvar upgrader = websocket.Upgrader{\n  CheckOrigin: func(r *http.Request) bool { return true },\n}\n\nfunc wsHandler(w http.ResponseWriter, r *http.Request) {\n  conn, err := upgrader.Upgrade(w, r, nil)\n  if err != nil {\n    return\n  }\n  defer conn.Close()\n  \n  for {\n    messageType, p, err := conn.ReadMessage()\n    if err != nil {\n      return\n    }\n    if err := conn.WriteMessage(messageType, p); err != nil {\n      return\n    }\n  }\n}'
    },
    {
      title: 'gRPC',
      description: 'Build high-performance RPC services with gRPC and Protocol Buffers.',
      syntax: 'protoc --go_out=. *.proto',
      usage: 'Microservices communication',
      code: '// user.proto\nsyntax = "proto3";\npackage user;\n\nservice UserService {\n  rpc GetUser(UserRequest) returns (UserResponse);\n}\n\nmessage UserRequest {\n  int32 id = 1;\n}\n\nmessage UserResponse {\n  int32 id = 1;\n  string name = 2;\n}\n\n// server.go\ntype server struct {\n  pb.UnimplementedUserServiceServer\n}\n\nfunc (s *server) GetUser(ctx context.Context, req *pb.UserRequest) (*pb.UserResponse, error) {\n  return &pb.UserResponse{Id: req.Id, Name: "Alice"}, nil\n}'
    },
    {
      title: 'Docker',
      description: 'Containerize Go applications with Docker for consistent deployment.',
      syntax: 'docker build -t app .\ndocker run -p 8080:8080 app',
      usage: 'Container deployment',
      code: '# Dockerfile\nFROM golang:1.21-alpine AS builder\nWORKDIR /app\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN go build -o main .\n\nFROM alpine:latest\nRUN apk --no-cache add ca-certificates\nWORKDIR /root/\nCOPY --from=builder /app/main .\nEXPOSE 8080\nCMD ["./main"]\n\n# Build and run\n# docker build -t myapp .\n# docker run -p 8080:8080 myapp'
    },
    {
      title: 'Deployment',
      description: 'Deploy Go applications to cloud platforms, VPS, or Kubernetes.',
      syntax: 'Production deployment strategies',
      usage: 'Ship to production',
      code: '# Build for Linux\nGOOS=linux GOARCH=amd64 go build -o app\n\n# Systemd service\n[Unit]\nDescription=Go App\nAfter=network.target\n\n[Service]\nType=simple\nUser=www-data\nWorkingDirectory=/var/www/app\nExecStart=/var/www/app/main\nRestart=on-failure\n\n[Install]\nWantedBy=multi-user.target\n\n# Kubernetes deployment\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: go-app\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n      - name: app\n        image: myapp:latest\n        ports:\n        - containerPort: 8080'
    },
    {
      title: 'Best Practices',
      description: 'Go coding best practices: error handling, naming conventions, code organization, and performance tips.',
      syntax: 'Best practices and idioms',
      usage: 'Write idiomatic Go code',
      code: '// Best Practices:\n// 1. Handle errors explicitly\nif err != nil {\n  return fmt.Errorf("failed to do X: %w", err)\n}\n\n// 2. Use short variable names in small scopes\nfor i, v := range items {\n  // i and v are clear in context\n}\n\n// 3. Accept interfaces, return structs\nfunc ProcessData(r io.Reader) (*Result, error)\n\n// 4. Use defer for cleanup\nfile, err := os.Open("file.txt")\nif err != nil {\n  return err\n}\ndefer file.Close()\n\n// 5. Avoid naked returns in long functions\n// 6. Use context for cancellation\n// 7. Prefer composition over inheritance\n// 8. Keep interfaces small\n// 9. Run gofmt and golint'
    },
    {
      title: 'Performance Optimization',
      description: 'Optimize Go applications with profiling, benchmarking, and efficient algorithms.',
      syntax: 'go test -cpuprofile=cpu.prof -bench=.',
      usage: 'Optimize application performance',
      code: 'import _ "net/http/pprof"\n\n// Enable pprof\ngo func() {\n  log.Println(http.ListenAndServe("localhost:6060", nil))\n}()\n\n// Optimization tips:\n// 1. Use pointers for large structs\n// 2. Pre-allocate slices with make([]T, 0, capacity)\n// 3. Use sync.Pool for frequently allocated objects\nvar pool = sync.Pool{\n  New: func() interface{} {\n    return &Buffer{}\n  },\n}\n\n// 4. Avoid unnecessary allocations\n// 5. Use string builders for concatenation\nvar sb strings.Builder\nsb.WriteString("hello")\nsb.WriteString(" world")\n\n// 6. Profile with pprof\n// go tool pprof http://localhost:6060/debug/pprof/profile'
    },
  ]
}

// Rust Backend
function rustBackendSpecs(languageName: string): SectionSpec[] {
  return [
    {
      title: `${languageName} HOME`,
      description: 'Rust is a systems programming language focused on safety, speed, and concurrency. It guarantees memory safety without a garbage collector, making it perfect for building high-performance, reliable backend systems, web servers, and system tools.',
      syntax: 'fn main() { }\nlet variable = value;',
      usage: 'Build safe, fast, and concurrent backend applications',
      code: 'fn main() {\n    println!("Hello, Rust!");\n}'
    },
    {
      title: 'Introduction',
      description: 'Rust was created by Mozilla Research with contributions from the open-source community. It prevents common bugs like null pointer dereferences and data races at compile time. Rust is used by companies like Dropbox, Cloudflare, and Discord for performance-critical backend services.',
      syntax: 'Zero-cost abstractions, memory safety',
      usage: 'Understand Rust\'s advantages and use cases',
      code: '// Rust excels at:\n// - Web APIs and microservices\n// - System programming\n// - Command-line tools\n// - Network services\n// - Embedded systems'
    },
    {
      title: 'Installation',
      description: 'Install Rust using rustup, the official installer and version manager. Rustup installs the Rust compiler (rustc), Cargo (package manager), and standard library. Use "cargo new" to create projects and "cargo run" to execute them.',
      syntax: 'curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh',
      usage: 'Set up Rust development environment',
      code: '// Install: https://rustup.rs/\n// Verify: rustc --version\n\n// Create project:\n// cargo new my_project\n// cd my_project\n\n// Run:\n// cargo run\n\n// Build:\n// cargo build --release'
    },
    {
      title: 'Variables',
      description: 'Variables in Rust are immutable by default. Use "let" to declare variables and "let mut" for mutable ones. Rust uses type inference but you can specify types explicitly. Constants are declared with "const" and must have type annotations.',
      syntax: 'let name = value;\nlet mut count = 0;\nconst MAX: u32 = 100;',
      usage: 'Declare and manage variables',
      code: 'fn main() {\n    // Immutable (default)\n    let x = 5;\n    // x = 6; // Error!\n    \n    // Mutable\n    let mut y = 10;\n    y = 20; // OK\n    \n    // Type annotation\n    let z: i32 = 30;\n    \n    // Constant\n    const MAX_POINTS: u32 = 100_000;\n    \n    // Shadowing\n    let x = x + 1;\n    println!("{}, {}, {}, {}", x, y, z, MAX_POINTS);\n}'
    },
    {
      title: 'Data Types',
      description: 'Rust is statically typed with scalar types (integers, floats, booleans, characters) and compound types (tuples, arrays). Integer types include i8, i16, i32, i64, i128, u8, u16, u32, u64, u128. Floats are f32 and f64.',
      syntax: 'let num: i32 = 42;\nlet tuple: (i32, f64, u8) = (500, 6.4, 1);',
      usage: 'Work with different data types',
      code: 'fn main() {\n    // Integers\n    let decimal = 98_222;\n    let hex = 0xff;\n    let binary = 0b1111_0000;\n    \n    // Float\n    let x = 2.0; // f64\n    let y: f32 = 3.0; // f32\n    \n    // Boolean\n    let is_active: bool = true;\n    \n    // Character\n    let c: char = \'A\';\n    \n    // Tuple\n    let tup: (i32, f64, char) = (500, 6.4, \'x\');\n    let (a, b, c) = tup;\n    \n    println!("{}, {}, {}", a, b, c);\n}'
    },
    {
      title: 'Functions',
      description: 'Functions are declared with "fn" keyword. Parameters must have type annotations. Use "->" to specify return type. The last expression in a function is returned (no semicolon). Use "return" for early returns.',
      syntax: 'fn name(param: Type) -> ReturnType { }',
      usage: 'Create reusable code blocks',
      code: 'fn main() {\n    let result = add(5, 3);\n    println!("Sum: {}", result);\n    \n    let (q, r) = divide(10, 3);\n    println!("Quotient: {}, Remainder: {}", q, r);\n}\n\nfn add(a: i32, b: i32) -> i32 {\n    a + b // No semicolon = return value\n}\n\nfn divide(a: i32, b: i32) -> (i32, i32) {\n    (a / b, a % b)\n}'
    },
    {
      title: 'Ownership',
      description: 'Ownership is Rust\'s most unique feature. Each value has an owner. Only one owner at a time. When owner goes out of scope, value is dropped. Moving ownership transfers it. This prevents memory leaks and data races at compile time.',
      syntax: 'let s1 = String::from("hello");\nlet s2 = s1; // s1 moved',
      usage: 'Manage memory safely without garbage collection',
      code: 'fn main() {\n    // String (heap allocated)\n    let s1 = String::from("hello");\n    let s2 = s1; // s1 moved to s2\n    // println!("{}", s1); // Error! s1 no longer valid\n    println!("{}", s2);\n    \n    // Clone for deep copy\n    let s3 = s2.clone();\n    println!("{}, {}", s2, s3);\n    \n    // Function takes ownership\n    takes_ownership(s2);\n    // println!("{}", s2); // Error!\n}\n\nfn takes_ownership(s: String) {\n    println!("{}", s);\n} // s dropped here'
    },
    {
      title: 'References & Borrowing',
      description: 'References allow you to refer to a value without taking ownership. Use & for immutable references and &mut for mutable references. You can have multiple immutable references OR one mutable reference, but not both simultaneously.',
      syntax: 'let r = &value;\nlet r = &mut value;',
      usage: 'Access data without transferring ownership',
      code: 'fn main() {\n    let mut s = String::from("hello");\n    \n    // Immutable borrow\n    let len = calculate_length(&s);\n    println!("Length of \'{}\' is {}", s, len);\n    \n    // Mutable borrow\n    change(&mut s);\n    println!("{}", s);\n}\n\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}\n\nfn change(s: &mut String) {\n    s.push_str(", world");\n}'
    },
    {
      title: 'Structs',
      description: 'Structs group related data together. Define with "struct" keyword. Create instances with field: value syntax. Access fields with dot notation. Use tuple structs for unnamed fields. Derive traits for common functionality.',
      syntax: 'struct Name { field: Type }\nimpl Name { fn method(&self) { } }',
      usage: 'Create custom data structures',
      code: 'struct User {\n    username: String,\n    email: String,\n    active: bool,\n}\n\nimpl User {\n    fn new(username: String, email: String) -> User {\n        User {\n            username,\n            email,\n            active: true,\n        }\n    }\n    \n    fn deactivate(&mut self) {\n        self.active = false;\n    }\n}\n\nfn main() {\n    let mut user = User::new(\n        String::from("alice"),\n        String::from("alice@example.com")\n    );\n    println!("{}: {}", user.username, user.active);\n    user.deactivate();\n}'
    },
    {
      title: 'Enums',
      description: 'Enums define types with multiple variants. Each variant can hold different types of data. Use enum to model state or different cases. Option<T> (Some/None) and Result<T, E> (Ok/Err) are built-in enums for handling nullable values and errors.',
      syntax: 'enum Name { Variant1, Variant2(Type) }',
      usage: 'Model data with distinct variants',
      code: 'enum Message {\n    Quit,\n    Move { x: i32, y: i32 },\n    Write(String),\n    ChangeColor(i32, i32, i32),\n}\n\nimpl Message {\n    fn call(&self) {\n        match self {\n            Message::Quit => println!("Quit"),\n            Message::Move { x, y } => println!("Move to {}, {}", x, y),\n            Message::Write(text) => println!("Text: {}", text),\n            Message::ChangeColor(r, g, b) => println!("RGB({}, {}, {})", r, g, b),\n        }\n    }\n}\n\nfn main() {\n    let msg = Message::Write(String::from("Hello"));\n    msg.call();\n}'
    },
    {
      title: 'Pattern Matching',
      description: 'Pattern matching with "match" is exhaustive and powerful. Match against literal values, variables, wildcards, and more. Must cover all cases. Use "if let" for single pattern matching. Match is an expression that returns a value.',
      syntax: 'match value { pattern => expression }',
      usage: 'Handle different cases elegantly',
      code: 'fn main() {\n    let number = 7;\n    \n    match number {\n        1 => println!("One"),\n        2 | 3 | 5 | 7 => println!("Prime"),\n        8..=10 => println!("Eight to ten"),\n        _ => println!("Other"),\n    }\n    \n    // Match Option\n    let some_value = Some(5);\n    match some_value {\n        Some(x) if x > 3 => println!("Greater than 3: {}", x),\n        Some(x) => println!("{}", x),\n        None => println!("No value"),\n    }\n    \n    // if let\n    if let Some(x) = some_value {\n        println!("Value: {}", x);\n    }\n}'
    },
    {
      title: 'Error Handling',
      description: 'Rust uses Result<T, E> for recoverable errors and panic! for unrecoverable ones. Use ? operator to propagate errors. Match on Result or use unwrap/expect for quick prototyping. Define custom error types for better error handling.',
      syntax: 'Result<T, E>\nfn function() -> Result<T, Error> { }',
      usage: 'Handle errors safely and explicitly',
      code: 'use std::fs::File;\nuse std::io::{self, Read};\n\nfn read_file(path: &str) -> Result<String, io::Error> {\n    let mut file = File::open(path)?;\n    let mut contents = String::new();\n    file.read_to_string(&mut contents)?;\n    Ok(contents)\n}\n\nfn main() {\n    match read_file("test.txt") {\n        Ok(contents) => println!("{}", contents),\n        Err(e) => println!("Error: {}", e),\n    }\n    \n    // Using if let\n    if let Ok(data) = read_file("config.txt") {\n        println!("Config: {}", data);\n    }\n}'
    },
    {
      title: 'Collections',
      description: 'Rust provides Vec<T> for growable arrays, String for UTF-8 text, and HashMap<K, V> for key-value storage. Vectors use push/pop for adding/removing. Strings are UTF-8 encoded. HashMaps require keys to implement Hash and Eq traits.',
      syntax: 'Vec::new()\nString::from("text")\nHashMap::new()',
      usage: 'Store and manipulate collections of data',
      code: 'use std::collections::HashMap;\n\nfn main() {\n    // Vector\n    let mut v = Vec::new();\n    v.push(1);\n    v.push(2);\n    v.push(3);\n    println!("Vector: {:?}", v);\n    \n    // String\n    let mut s = String::from("Hello");\n    s.push_str(", world!");\n    println!("{}", s);\n    \n    // HashMap\n    let mut scores = HashMap::new();\n    scores.insert(String::from("Blue"), 10);\n    scores.insert(String::from("Red"), 50);\n    \n    if let Some(score) = scores.get("Blue") {\n        println!("Blue score: {}", score);\n    }\n}'
    },
    {
      title: 'Traits',
      description: 'Traits define shared behavior across types, similar to interfaces. Types implement traits using "impl Trait for Type". Standard library provides many traits like Clone, Debug, Display. Use trait bounds to constrain generic types.',
      syntax: 'trait Name { fn method(&self); }\nimpl Name for Type { }',
      usage: 'Define and implement shared behavior',
      code: 'trait Summary {\n    fn summarize(&self) -> String;\n    \n    fn default_summary(&self) -> String {\n        String::from("(Read more...)")\n    }\n}\n\nstruct Article {\n    title: String,\n    content: String,\n}\n\nimpl Summary for Article {\n    fn summarize(&self) -> String {\n        format!("{}: {}", self.title, self.content)\n    }\n}\n\nfn main() {\n    let article = Article {\n        title: String::from("Rust Traits"),\n        content: String::from("Traits are powerful!"),\n    };\n    println!("{}", article.summarize());\n}'
    },
    {
      title: 'Generics',
      description: 'Generics enable code reuse by allowing types to be parameters. Use <T> syntax for generic type parameters. Combine with trait bounds to constrain what types are acceptable. Zero runtime cost - monomorphization at compile time.',
      syntax: 'fn name<T>(param: T) { }\nstruct Name<T> { field: T }',
      usage: 'Write flexible, reusable code',
      code: 'fn largest<T: PartialOrd>(list: &[T]) -> &T {\n    let mut largest = &list[0];\n    for item in list {\n        if item > largest {\n            largest = item;\n        }\n    }\n    largest\n}\n\nstruct Point<T> {\n    x: T,\n    y: T,\n}\n\nimpl<T> Point<T> {\n    fn new(x: T, y: T) -> Self {\n        Point { x, y }\n    }\n}\n\nfn main() {\n    let numbers = vec![34, 50, 25, 100, 65];\n    println!("Largest: {}", largest(&numbers));\n    \n    let p = Point::new(5, 10);\n}'
    },
    {
      title: 'Modules',
      description: 'Modules organize code into namespaces. Use "mod" to declare modules. "pub" makes items public. "use" brings items into scope. Modules can be in the same file, separate files, or directories with mod.rs.',
      syntax: 'mod module_name { }\nuse module::item;\npub fn public_function() { }',
      usage: 'Organize and structure code',
      code: '// In lib.rs or main.rs\nmod math {\n    pub fn add(a: i32, b: i32) -> i32 {\n        a + b\n    }\n    \n    fn private_function() {\n        // Not accessible outside\n    }\n}\n\nmod utils {\n    pub mod helpers {\n        pub fn greet(name: &str) {\n            println!("Hello, {}!", name);\n        }\n    }\n}\n\nfn main() {\n    let sum = math::add(5, 3);\n    println!("Sum: {}", sum);\n    \n    use utils::helpers;\n    helpers::greet("Alice");\n}'
    },
    {
      title: 'Cargo',
      description: 'Cargo is Rust\'s build system and package manager. It manages dependencies, compiles packages, runs tests, and publishes crates. Cargo.toml defines project metadata and dependencies. Use cargo build, cargo run, cargo test commands.',
      syntax: 'cargo new project\ncargo build\ncargo run\ncargo test',
      usage: 'Manage Rust projects and dependencies',
      code: '# Create new project\n# cargo new my_project\n# cd my_project\n\n# Cargo.toml:\n[package]\nname = "my_project"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]\nserde = { version = "1.0", features = ["derive"] }\ntokio = { version = "1", features = ["full"] }\n\n# Commands:\n# cargo build          # Debug build\n# cargo build --release  # Optimized build\n# cargo run            # Build and run\n# cargo test           # Run tests\n# cargo doc            # Generate docs'
    },
    {
      title: 'Web Development Basics',
      description: 'Rust offers excellent web frameworks like Actix-web, Rocket, and Axum. These provide routing, middleware, JSON handling, and async support. Use Tokio for async runtime. Serde for serialization. Build fast, safe REST APIs and web services.',
      syntax: 'use actix_web::{web, App, HttpServer};\n#[tokio::main]\nasync fn main() { }',
      usage: 'Build web applications and APIs',
      code: 'use actix_web::{get, post, web, App, HttpServer, Responder, HttpResponse};\nuse serde::{Deserialize, Serialize};\n\n#[derive(Serialize, Deserialize)]\nstruct User {\n    id: u32,\n    name: String,\n}\n\n#[get("/")]\nasync fn hello() -> impl Responder {\n    HttpResponse::Ok().body("Hello, Rust!")\n}\n\n#[get("/users/{id}")]\nasync fn get_user(id: web::Path<u32>) -> impl Responder {\n    let user = User {\n        id: *id,\n        name: String::from("Alice"),\n    };\n    web::Json(user)\n}\n\n#[actix_web::main]\nasync fn main() -> std::io::Result<()> {\n    HttpServer::new(|| {\n        App::new()\n            .service(hello)\n            .service(get_user)\n    })\n    .bind("127.0.0.1:8080")?\n    .run()\n    .await\n}'
    },
    {
      title: 'Async/Await',
      description: 'Rust supports asynchronous programming with async/await syntax. Use Tokio runtime for async execution.',
      syntax: 'async fn name() -> T { }\n.await',
      usage: 'Asynchronous programming',
      code: 'use tokio::time::{sleep, Duration};\n\nasync fn fetch_data() -> String {\n    sleep(Duration::from_secs(1)).await;\n    String::from("Data loaded")\n}\n\n#[tokio::main]\nasync fn main() {\n    let result = fetch_data().await;\n    println!("{}", result);\n    \n    // Concurrent execution\n    let task1 = tokio::spawn(async { fetch_data().await });\n    let task2 = tokio::spawn(async { fetch_data().await });\n    \n    let (r1, r2) = tokio::join!(task1, task2);\n    println!("{:?}, {:?}", r1, r2);\n}'
    },
    {
      title: 'Error Handling Advanced',
      description: 'Use Result and Option for error handling. Create custom error types. Use ? operator for error propagation.',
      syntax: 'Result<T, E>, Option<T>, ?',
      usage: 'Robust error handling',
      code: 'use std::fs::File;\nuse std::io::{self, Read};\n\nfn read_file(path: &str) -> Result<String, io::Error> {\n    let mut file = File::open(path)?;\n    let mut contents = String::new();\n    file.read_to_string(&mut contents)?;\n    Ok(contents)\n}\n\n// Custom error type\n#[derive(Debug)]\nenum AppError {\n    Io(io::Error),\n    Parse(String),\n}\n\nimpl From<io::Error> for AppError {\n    fn from(err: io::Error) -> AppError {\n        AppError::Io(err)\n    }\n}'
    },
    {
      title: 'Traits',
      description: 'Traits define shared behavior. Implement traits for types. Use trait bounds for generic functions.',
      syntax: 'trait Name { fn method(&self); }\nimpl Name for Type { }',
      usage: 'Shared behavior and polymorphism',
      code: 'trait Summary {\n    fn summarize(&self) -> String;\n}\n\nstruct Article {\n    title: String,\n    content: String,\n}\n\nimpl Summary for Article {\n    fn summarize(&self) -> String {\n        format!("{}: {}", self.title, &self.content[..50])\n    }\n}\n\n// Trait bounds\nfn print_summary<T: Summary>(item: &T) {\n    println!("{}", item.summarize());\n}\n\nfn main() {\n    let article = Article {\n        title: String::from("Rust"),\n        content: String::from("Rust is awesome..."),\n    };\n    print_summary(&article);\n}'
    },
    {
      title: 'Lifetimes Advanced',
      description: 'Use lifetime annotations to express relationships between references. Generic lifetimes for structs and functions.',
      syntax: "'a, 'static",
      usage: 'Reference validity',
      code: 'fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str {\n    if x.len() > y.len() { x } else { y }\n}\n\nstruct ImportantExcerpt<\'a> {\n    part: &\'a str,\n}\n\nimpl<\'a> ImportantExcerpt<\'a> {\n    fn level(&self) -> i32 {\n        3\n    }\n}\n\nfn main() {\n    let s1 = String::from("long string");\n    let s2 = "short";\n    let result = longest(&s1, s2);\n    println!("{}", result);\n}'
    },
    {
      title: 'Smart Pointers',
      description: 'Use Box<T> for heap allocation, Rc<T> for reference counting, RefCell<T> for interior mutability.',
      syntax: 'Box<T>, Rc<T>, RefCell<T>',
      usage: 'Advanced memory management',
      code: 'use std::rc::Rc;\nuse std::cell::RefCell;\n\n// Box for heap allocation\nlet b = Box::new(5);\nprintln!("{}", b);\n\n// Rc for shared ownership\nlet a = Rc::new(String::from("hello"));\nlet b = Rc::clone(&a);\nprintln!("Count: {}", Rc::strong_count(&a));\n\n// RefCell for interior mutability\nlet x = RefCell::new(5);\n*x.borrow_mut() += 1;\nprintln!("{}", x.borrow());'
    },
    {
      title: 'Concurrency with Threads',
      description: 'Create threads with thread::spawn. Use channels for communication between threads.',
      syntax: 'thread::spawn, mpsc::channel',
      usage: 'Parallel execution',
      code: 'use std::thread;\nuse std::sync::mpsc;\nuse std::time::Duration;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    \n    thread::spawn(move || {\n        let vals = vec!["hi", "from", "thread"];\n        for val in vals {\n            tx.send(val).unwrap();\n            thread::sleep(Duration::from_secs(1));\n        }\n    });\n    \n    for received in rx {\n        println!("Got: {}", received);\n    }\n}'
    },
    {
      title: 'Mutex and Arc',
      description: 'Use Mutex for mutual exclusion and Arc for atomic reference counting in concurrent contexts.',
      syntax: 'Arc<Mutex<T>>',
      usage: 'Thread-safe shared state',
      code: 'use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let counter = Arc::new(Mutex::new(0));\n    let mut handles = vec![];\n    \n    for _ in 0..10 {\n        let counter = Arc::clone(&counter);\n        let handle = thread::spawn(move || {\n            let mut num = counter.lock().unwrap();\n            *num += 1;\n        });\n        handles.push(handle);\n    }\n    \n    for handle in handles {\n        handle.join().unwrap();\n    }\n    \n    println!("Result: {}", *counter.lock().unwrap());\n}'
    },
    {
      title: 'Testing',
      description: 'Write unit tests with #[test], integration tests, and doc tests. Use assertions and test organization.',
      syntax: '#[test], assert_eq!, cargo test',
      usage: 'Code quality assurance',
      code: '#[cfg(test)]\nmod tests {\n    use super::*;\n    \n    #[test]\n    fn test_add() {\n        assert_eq!(add(2, 2), 4);\n    }\n    \n    #[test]\n    fn test_divide() {\n        let result = divide(10.0, 2.0);\n        assert_eq!(result, 5.0);\n    }\n    \n    #[test]\n    #[should_panic(expected = "divide by zero")]\n    fn test_divide_by_zero() {\n        divide(10.0, 0.0);\n    }\n}\n\n// Run: cargo test'
    },
    {
      title: 'Actix-web Advanced',
      description: 'Build complete REST APIs with Actix-web: routing, middleware, state, JSON, error handling.',
      syntax: 'web::Data, middleware',
      usage: 'Production web APIs',
      code: 'use actix_web::{web, App, HttpServer, middleware};\n\nstruct AppState {\n    app_name: String,\n}\n\nasync fn index(data: web::Data<AppState>) -> String {\n    format!("App: {}", data.app_name)\n}\n\n#[actix_web::main]\nasync fn main() -> std::io::Result<()> {\n    let app_state = web::Data::new(AppState {\n        app_name: String::from("MyApp"),\n    });\n    \n    HttpServer::new(move || {\n        App::new()\n            .app_data(app_state.clone())\n            .wrap(middleware::Logger::default())\n            .route("/", web::get().to(index))\n    })\n    .bind("127.0.0.1:8080")?\n    .run()\n    .await\n}'
    },
    {
      title: 'Serde Serialization',
      description: 'Serialize and deserialize data with Serde. Support JSON, YAML, TOML, and more.',
      syntax: '#[derive(Serialize, Deserialize)], serde_json',
      usage: 'Data serialization',
      code: 'use serde::{Deserialize, Serialize};\nuse serde_json::Result;\n\n#[derive(Serialize, Deserialize, Debug)]\nstruct User {\n    id: u32,\n    name: String,\n    email: String,\n}\n\nfn main() -> Result<()> {\n    let user = User {\n        id: 1,\n        name: String::from("Alice"),\n        email: String::from("alice@example.com"),\n    };\n    \n    // Serialize to JSON\n    let json = serde_json::to_string(&user)?;\n    println!("{}", json);\n    \n    // Deserialize from JSON\n    let user2: User = serde_json::from_str(&json)?;\n    println!("{:?}", user2);\n    \n    Ok(())\n}'
    },
    {
      title: 'Diesel ORM',
      description: 'Use Diesel for type-safe database operations with PostgreSQL, MySQL, or SQLite.',
      syntax: 'diesel::prelude::*',
      usage: 'Database ORM',
      code: '#[macro_use]\nextern crate diesel;\n\nuse diesel::prelude::*;\n\n#[derive(Queryable)]\nstruct User {\n    id: i32,\n    name: String,\n    email: String,\n}\n\ntable! {\n    users (id) {\n        id -> Int4,\n        name -> Varchar,\n        email -> Varchar,\n    }\n}\n\nfn get_users(conn: &PgConnection) -> Vec<User> {\n    use self::users::dsl::*;\n    users.load::<User>(conn).expect("Error loading users")\n}\n\n// Migrations: diesel migration run'
    },
    {
      title: 'Environment Variables',
      description: 'Read configuration from environment variables with std::env or dotenv.',
      syntax: 'std::env::var, dotenv',
      usage: 'Configuration management',
      code: 'use std::env;\nuse dotenv::dotenv;\n\nfn main() {\n    dotenv().ok();\n    \n    let database_url = env::var("DATABASE_URL")\n        .expect("DATABASE_URL must be set");\n    \n    let port = env::var("PORT")\n        .unwrap_or_else(|_| "8080".to_string());\n    \n    println!("Database: {}", database_url);\n    println!("Port: {}", port);\n}'
    },
    {
      title: 'Logging',
      description: 'Implement logging with env_logger or tracing for structured logging.',
      syntax: 'log::info!, env_logger',
      usage: 'Application logging',
      code: 'use log::{info, warn, error};\nuse env_logger::Env;\n\nfn main() {\n    env_logger::Builder::from_env(Env::default().default_filter_or("info"))\n        .init();\n    \n    info!("Starting application");\n    warn!("This is a warning");\n    error!("This is an error");\n    \n    // Set RUST_LOG=debug cargo run\n}'
    },
    {
      title: 'Middleware',
      description: 'Create custom middleware for Actix-web: authentication, logging, CORS, rate limiting.',
      syntax: 'Transform trait, wrap',
      usage: 'Request/response processing',
      code: 'use actix_web::{dev::ServiceRequest, HttpMessage};\nuse actix_web::middleware::{self, Logger};\n\nasync fn auth_middleware(\n    req: ServiceRequest,\n    next: Next<impl MessageBody>,\n) -> Result<ServiceResponse<impl MessageBody>, Error> {\n    let token = req.headers().get("Authorization");\n    if token.is_none() {\n        return Err(ErrorUnauthorized("No token"));\n    }\n    next.call(req).await\n}\n\n// Apply\nApp::new()\n    .wrap(Logger::default())\n    .wrap(middleware::Compress::default())'
    },
    {
      title: 'JWT Authentication',
      description: 'Implement JWT-based authentication with jsonwebtoken crate.',
      syntax: 'encode, decode, Claims',
      usage: 'Secure authentication',
      code: 'use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};\nuse serde::{Serialize, Deserialize};\n\n#[derive(Debug, Serialize, Deserialize)]\nstruct Claims {\n    sub: String,\n    exp: usize,\n}\n\nfn create_token(user_id: &str) -> String {\n    let claims = Claims {\n        sub: user_id.to_owned(),\n        exp: 10000000000, // expiration\n    };\n    encode(&Header::default(), &claims, &EncodingKey::from_secret("secret".as_ref())).unwrap()\n}\n\nfn validate_token(token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {\n    decode::<Claims>(token, &DecodingKey::from_secret("secret".as_ref()), &Validation::default())\n        .map(|data| data.claims)\n}'
    },
    {
      title: 'Database Pooling',
      description: 'Use connection pooling with r2d2 for efficient database connections.',
      syntax: 'r2d2::Pool',
      usage: 'Connection management',
      code: 'use r2d2::Pool;\nuse diesel::r2d2::ConnectionManager;\nuse diesel::PgConnection;\n\ntype DbPool = Pool<ConnectionManager<PgConnection>>;\n\nfn create_pool(database_url: &str) -> DbPool {\n    let manager = ConnectionManager::<PgConnection>::new(database_url);\n    Pool::builder()\n        .max_size(15)\n        .build(manager)\n        .expect("Failed to create pool")\n}\n\nasync fn handler(pool: web::Data<DbPool>) -> HttpResponse {\n    let conn = pool.get().expect("Failed to get DB connection");\n    // Use connection\n    HttpResponse::Ok().finish()\n}'
    },
    {
      title: 'CORS',
      description: 'Handle Cross-Origin Resource Sharing with actix-cors middleware.',
      syntax: 'Cors::default()',
      usage: 'Cross-origin requests',
      code: 'use actix_cors::Cors;\nuse actix_web::http::header;\n\nHttpServer::new(|| {\n    let cors = Cors::default()\n        .allowed_origin("http://localhost:3000")\n        .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])\n        .allowed_headers(vec![header::AUTHORIZATION, header::CONTENT_TYPE])\n        .max_age(3600);\n    \n    App::new()\n        .wrap(cors)\n        .route("/api/users", web::get().to(get_users))\n})'
    },
    {
      title: 'File Uploads',
      description: 'Handle multipart file uploads with actix-multipart.',
      syntax: 'Multipart, Field',
      usage: 'File upload handling',
      code: 'use actix_multipart::Multipart;\nuse futures::StreamExt;\nuse std::io::Write;\n\nasync fn upload(mut payload: Multipart) -> Result<HttpResponse, Error> {\n    while let Some(Ok(mut field)) = payload.next().await {\n        let filename = field.content_disposition()\n            .get_filename()\n            .unwrap_or("file");\n        \n        let filepath = format!("./uploads/{}", filename);\n        let mut f = web::block(|| std::fs::File::create(filepath))\n            .await?;\n        \n        while let Some(chunk) = field.next().await {\n            let data = chunk?;\n            f = web::block(move || f.write_all(&data).map(|_| f)).await?;\n        }\n    }\n    Ok(HttpResponse::Ok().finish())\n}'
    },
    {
      title: 'WebSockets',
      description: 'Implement real-time communication with actix-web-actors and WebSockets.',
      syntax: 'ws::WebsocketContext',
      usage: 'Real-time features',
      code: 'use actix::prelude::*;\nuse actix_web_actors::ws;\n\nstruct MyWebSocket;\n\nimpl Actor for MyWebSocket {\n    type Context = ws::WebsocketContext<Self>;\n}\n\nimpl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWebSocket {\n    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {\n        match msg {\n            Ok(ws::Message::Text(text)) => ctx.text(text),\n            Ok(ws::Message::Binary(bin)) => ctx.binary(bin),\n            Ok(ws::Message::Close(reason)) => ctx.close(reason),\n            _ => (),\n        }\n    }\n}'
    },
    {
      title: 'Docker',
      description: 'Containerize Rust applications with Docker for deployment.',
      syntax: 'docker build, docker run',
      usage: 'Container deployment',
      code: '# Dockerfile\nFROM rust:1.70 as builder\nWORKDIR /app\nCOPY Cargo.toml Cargo.lock ./\nCOPY src ./src\nRUN cargo build --release\n\nFROM debian:bullseye-slim\nRUN apt-get update && apt-get install -y libpq5\nWORKDIR /app\nCOPY --from=builder /app/target/release/myapp .\nEXPOSE 8080\nCMD ["./myapp"]\n\n# Build and run\n# docker build -t myapp .\n# docker run -p 8080:8080 myapp'
    },
    {
      title: 'Deployment',
      description: 'Deploy Rust applications to production servers, cloud platforms, or Kubernetes.',
      syntax: 'Production deployment',
      usage: 'Ship to production',
      code: '# Build for release\ncargo build --release\n\n# Systemd service\n[Unit]\nDescription=Rust App\nAfter=network.target\n\n[Service]\nType=simple\nUser=www-data\nWorkingDirectory=/var/www/app\nEnvironment="DATABASE_URL=postgres://..."\nExecStart=/var/www/app/target/release/myapp\nRestart=on-failure\n\n[Install]\nWantedBy=multi-user.target\n\n# Kubernetes deployment\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: rust-app\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n      - name: app\n        image: myapp:latest\n        ports:\n        - containerPort: 8080'
    },
    {
      title: 'Best Practices',
      description: 'Rust coding best practices: error handling, ownership patterns, naming conventions, and performance tips.',
      syntax: 'Coding standards',
      usage: 'Write idiomatic Rust',
      code: '// Best Practices:\n// 1. Use Result for recoverable errors\nfn process() -> Result<(), Error> { Ok(()) }\n\n// 2. Prefer borrowing over cloning\nfn analyze(data: &[u8]) { }\n\n// 3. Use iterators over loops\nlet sum: i32 = vec.iter().sum();\n\n// 4. Implement traits for custom types\nimpl Display for MyType { }\n\n// 5. Use enums for state machines\nenum State { Ready, Processing, Done }\n\n// 6. Keep ownership clear\n// 7. Use cargo fmt and clippy\n// 8. Write tests\n// 9. Document public APIs\n// 10. Leverage type system for correctness'
    },
  ]
}

// PHP Backend
function phpBackendSpecs(languageName: string): SectionSpec[] {
  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    {
      title: `${languageName} Backend HOME`,
      description: 'PHP is a widely-used server-side scripting language perfect for web development. It powers major platforms like WordPress, Laravel, and Symfony. PHP excels at building dynamic websites, REST APIs, and content management systems.',
      syntax: '<?php ... ?>',
      usage: 'Build dynamic web applications and APIs',
      code: '<?php\necho "Hello, PHP!";\n\n$name = "World";\necho "Hello, $name!";\n?>'
    },
    {
      title: 'Introduction to PHP',
      description: 'Learn why PHP is one of the most popular server-side languages. Understand its role in web development, major frameworks (Laravel, Symfony), and where it excels.',
      syntax: 'Server-side scripting',
      usage: 'Understand PHP ecosystem',
      code: '// PHP powers:\n// - WordPress (CMS)\n// - Laravel (Framework)\n// - Facebook (early days)\n// - Wikipedia\n// Great for: Web apps, APIs, CMS'
    },
    {
      title: 'Setup and Environment',
      description: 'Install PHP via your package manager or download from php.net. Use the built-in server for development. PHP files use .php extension and can mix HTML with PHP code.',
      syntax: 'php -S localhost:8000',
      usage: 'Set up PHP development environment',
      code: '<?php\n// index.php\n?>\n<!DOCTYPE html>\n<html>\n<body>\n  <h1><?php echo "Welcome!"; ?></h1>\n  <p>Time: <?php echo date("Y-m-d H:i:s"); ?></p>\n</body>\n</html>'
    },
    {
      title: 'PHP Basics',
      description: 'Learn PHP syntax: echo for output, variables with $ prefix, statements end with semicolons. PHP code is embedded in <?php ?> tags.',
      syntax: '<?php echo, $variable ?>',
      usage: 'First PHP program',
      code: '<?php\necho "Hello, World!";\n\n// Variables start with $\n$message = "Learning PHP";\necho $message;\n\n// Concatenation\necho "Hello " . "World";\n?>'
    },
    {
      title: 'Variables and Data Types',
      description: 'PHP is loosely typed. Main types: string, integer, float, boolean, array, object, null. Use var_dump() to inspect types.',
      syntax: '$variable = value',
      usage: 'Store data',
      code: '<?php\n$name = "Alice"; // string\n$age = 25; // integer\n$price = 19.99; // float\n$isActive = true; // boolean\n$items = [1, 2, 3]; // array\n\nvar_dump($name);\necho gettype($age);\n?>'
    },

    // BASICS (20 lessons)
    {
      title: 'Strings',
      description: 'Work with strings using single quotes or double quotes. Double quotes allow variable interpolation. Use string functions for manipulation.',
      syntax: '"string $var", strlen(), substr()',
      usage: 'String manipulation',
      code: '<?php\n$name = "Alice";\necho "Hello, $name!"; // interpolation\necho strlen($name); // 5\necho substr($name, 0, 2); // "Al"\necho strtoupper($name); // "ALICE"\necho str_replace("A", "B", $name); // "Blice"\n?>'
    },
    {
      title: 'Arrays',
      description: 'Indexed arrays store ordered values. Access elements by numeric index starting at 0.',
      syntax: '$array = [val1, val2]',
      usage: 'Store ordered data',
      code: '<?php\n$fruits = ["apple", "banana", "cherry"];\necho $fruits[0]; // "apple"\necho count($fruits); // 3\n\n$fruits[] = "date"; // append\narray_push($fruits, "elderberry");\nprint_r($fruits);\n?>'
    },
    {
      title: 'Associative Arrays',
      description: 'Associative arrays use named keys instead of numeric indexes. Perfect for key-value data.',
      syntax: '$array = ["key" => "value"]',
      usage: 'Key-value storage',
      code: '<?php\n$user = [\n  "name" => "Alice",\n  "email" => "alice@example.com",\n  "age" => 25\n];\n\necho $user["name"]; // "Alice"\n$user["city"] = "Paris";\nforeach ($user as $key => $value) {\n  echo "$key: $value\\n";\n}\n?>'
    },
    {
      title: 'Control Flow - If/Else/Switch',
      description: 'Use if, elseif, else for conditional logic. Switch statements for multiple conditions.',
      syntax: 'if, elseif, else, switch',
      usage: 'Conditional logic',
      code: '<?php\n$age = 20;\nif ($age >= 18) {\n  echo "Adult";\n} else {\n  echo "Minor";\n}\n\n$role = "admin";\nswitch ($role) {\n  case "admin":\n    echo "Full access";\n    break;\n  case "user":\n    echo "Limited access";\n    break;\n  default:\n    echo "No access";\n}\n?>'
    },
    {
      title: 'Loops',
      description: 'Iterate with for, while, do-while, and foreach loops.',
      syntax: 'for, while, foreach',
      usage: 'Iteration',
      code: '<?php\nfor ($i = 0; $i < 5; $i++) {\n  echo $i;\n}\n\n$fruits = ["apple", "banana"];\nforeach ($fruits as $fruit) {\n  echo $fruit;\n}\n\nforeach ($fruits as $index => $fruit) {\n  echo "$index: $fruit";\n}\n?>'
    },
    {
      title: 'Functions',
      description: 'Define reusable code blocks with function keyword. Use parameters and return values.',
      syntax: 'function name($param) { return $value; }',
      usage: 'Reusable logic',
      code: '<?php\nfunction greet($name) {\n  return "Hello, $name!";\n}\n\necho greet("Alice");\n\nfunction add($a, $b = 0) {\n  return $a + $b;\n}\n\necho add(5, 3); // 8\necho add(5); // 5\n?>'
    },
    {
      title: 'Superglobals',
      description: 'Built-in arrays available everywhere: $_GET, $_POST, $_SERVER, $_SESSION, $_COOKIE, $_FILES.',
      syntax: '$_GET, $_POST, $_SERVER',
      usage: 'Access request data',
      code: '<?php\n// URL: page.php?name=Alice&age=25\necho $_GET["name"]; // "Alice"\necho $_GET["age"]; // 25\n\n// Form POST\necho $_POST["username"];\n\n// Server info\necho $_SERVER["REQUEST_METHOD"];\necho $_SERVER["HTTP_USER_AGENT"];\n?>'
    },
    {
      title: 'Forms and POST/GET',
      description: 'Handle HTML form submissions using $_POST and $_GET. Validate and sanitize user input.',
      syntax: '$_POST, $_GET, htmlspecialchars()',
      usage: 'Process forms',
      code: '<?php\nif ($_SERVER["REQUEST_METHOD"] == "POST") {\n  $name = htmlspecialchars($_POST["name"]);\n  $email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);\n  \n  if ($email) {\n    echo "Valid email: $email";\n  } else {\n    echo "Invalid email";\n  }\n}\n?>\n<form method="post">\n  <input name="name" required>\n  <input name="email" type="email" required>\n  <button>Submit</button>\n</form>'
    },
    {
      title: 'File Handling',
      description: 'Read, write, and manipulate files using file functions.',
      syntax: 'fopen(), fread(), fwrite(), file_get_contents()',
      usage: 'File operations',
      code: '<?php\n// Read file\n$content = file_get_contents("data.txt");\necho $content;\n\n// Write file\nfile_put_contents("output.txt", "Hello, File!");\n\n// Append\n$file = fopen("log.txt", "a");\nfwrite($file, "New log entry\\n");\nfclose($file);\n?>'
    },
    {
      title: 'Include and Require',
      description: 'Include external PHP files with include/require. Use _once variants to prevent multiple inclusions.',
      syntax: 'include, require, include_once, require_once',
      usage: 'Code organization',
      code: '<?php\n// header.php\ninclude "header.php";\n\n// Will error if not found\nrequire "config.php";\n\n// Include once (prevent duplicates)\nrequire_once "database.php";\ninclude_once "functions.php";\n?>'
    },
    {
      title: 'Object-Oriented PHP - Classes',
      description: 'Define classes with properties and methods. Create objects with new keyword.',
      syntax: 'class Name { properties, methods }',
      usage: 'Object-oriented programming',
      code: '<?php\nclass User {\n  public $name;\n  public $email;\n  \n  public function greet() {\n    return "Hello, " . $this->name;\n  }\n}\n\n$user = new User();\n$user->name = "Alice";\necho $user->greet();\n?>'
    },
    {
      title: 'Constructors and Properties',
      description: 'Use __construct() to initialize objects. Define property visibility: public, private, protected.',
      syntax: '__construct(), public/private',
      usage: 'Initialize objects',
      code: '<?php\nclass User {\n  private $name;\n  private $email;\n  \n  public function __construct($name, $email) {\n    $this->name = $name;\n    $this->email = $email;\n  }\n  \n  public function getName() {\n    return $this->name;\n  }\n}\n\n$user = new User("Alice", "alice@example.com");\necho $user->getName();\n?>'
    },
    {
      title: 'Methods and Visibility',
      description: 'Define methods with public, private, or protected visibility. Static methods belong to the class.',
      syntax: 'public/private function, static',
      usage: 'Encapsulation',
      code: '<?php\nclass Math {\n  public static function add($a, $b) {\n    return $a + $b;\n  }\n  \n  private function secret() {\n    return "Hidden";\n  }\n}\n\necho Math::add(5, 3); // 8\n// Math::secret(); // Error: private\n?>'
    },
    {
      title: 'Inheritance',
      description: 'Extend classes to inherit properties and methods. Override methods in child classes.',
      syntax: 'extends, parent::',
      usage: 'Code reuse',
      code: '<?php\nclass Animal {\n  public function speak() {\n    return "Some sound";\n  }\n}\n\nclass Dog extends Animal {\n  public function speak() {\n    return "Woof!";\n  }\n  \n  public function parentSpeak() {\n    return parent::speak();\n  }\n}\n\n$dog = new Dog();\necho $dog->speak(); // "Woof!"\n?>'
    },
    {
      title: 'Interfaces',
      description: 'Define contracts that classes must implement. Use implements keyword.',
      syntax: 'interface, implements',
      usage: 'Define contracts',
      code: '<?php\ninterface Logger {\n  public function log($message);\n}\n\nclass FileLogger implements Logger {\n  public function log($message) {\n    file_put_contents("log.txt", $message, FILE_APPEND);\n  }\n}\n\n$logger = new FileLogger();\n$logger->log("Error occurred");\n?>'
    },
    {
      title: 'Namespaces',
      description: 'Organize code with namespaces to avoid name conflicts. Use use keyword to import.',
      syntax: 'namespace, use',
      usage: 'Code organization',
      code: '<?php\n// File: App/Models/User.php\nnamespace App\\Models;\n\nclass User {\n  // ...\n}\n\n// File: index.php\nuse App\\Models\\User;\n\n$user = new User();\n// Or: $user = new \\App\\Models\\User();\n?>'
    },
    {
      title: 'Composer and Autoloading',
      description: 'Use Composer for dependency management and PSR-4 autoloading.',
      syntax: 'composer require, autoload',
      usage: 'Package management',
      code: '# Install Composer package\ncomposer require guzzlehttp/guzzle\n\n<?php\n// composer.json\n{\n  "autoload": {\n    "psr-4": {\n      "App\\\\": "src/"\n    }\n  }\n}\n\n// index.php\nrequire "vendor/autoload.php";\nuse App\\Models\\User;\n?>'
    },
    {
      title: 'Error Handling',
      description: 'Handle errors with try-catch blocks. Throw and catch exceptions.',
      syntax: 'try, catch, throw',
      usage: 'Manage errors',
      code: '<?php\ntry {\n  $result = riskyOperation();\n  if (!$result) {\n    throw new Exception("Operation failed");\n  }\n} catch (Exception $e) {\n  error_log($e->getMessage());\n  echo "Error: " . $e->getMessage();\n} finally {\n  echo "Cleanup";\n}\n?>'
    },
    {
      title: 'Date and Time',
      description: 'Work with dates using date(), time(), strtotime(), and DateTime class.',
      syntax: 'date(), DateTime',
      usage: 'Date operations',
      code: '<?php\necho date("Y-m-d H:i:s"); // 2024-01-15 14:30:00\necho time(); // Unix timestamp\n\n$date = new DateTime("2024-01-15");\necho $date->format("Y-m-d");\n\n$date->modify("+7 days");\necho $date->format("Y-m-d");\n?>'
    },
    {
      title: 'Regular Expressions',
      description: 'Pattern matching with preg_match(), preg_replace(), and PCRE syntax.',
      syntax: 'preg_match(), preg_replace()',
      usage: 'Pattern matching',
      code: '<?php\n$email = "user@example.com";\nif (preg_match("/^[a-z0-9]+@[a-z]+\\.[a-z]{2,}$/i", $email)) {\n  echo "Valid email";\n}\n\n$text = "Hello 123 World 456";\n$numbers = preg_replace("/[^0-9]/", "", $text);\necho $numbers; // "123456"\n?>'
    },

    // INTERMEDIATE (10 lessons)
    {
      title: 'MySQL with PDO',
      description: 'Connect to MySQL using PDO. Use prepared statements to prevent SQL injection.',
      syntax: 'PDO, prepare(), execute()',
      usage: 'Database operations',
      code: '<?php\n$pdo = new PDO("mysql:host=localhost;dbname=myapp", "user", "pass");\n$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n\n// Prepared statement\n$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");\n$stmt->execute(["id" => $userId]);\n$user = $stmt->fetch(PDO::FETCH_ASSOC);\n?>'
    },
    {
      title: 'CRUD Operations',
      description: 'Create, Read, Update, Delete operations with PDO.',
      syntax: 'INSERT, SELECT, UPDATE, DELETE',
      usage: 'Database manipulation',
      code: '<?php\n// Create\n$stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");\n$stmt->execute(["Alice", "alice@example.com"]);\n\n// Read\n$stmt = $pdo->query("SELECT * FROM users");\n$users = $stmt->fetchAll();\n\n// Update\n$stmt = $pdo->prepare("UPDATE users SET email = ? WHERE id = ?");\n$stmt->execute(["newemail@example.com", 1]);\n\n// Delete\n$stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");\n$stmt->execute([1]);\n?>'
    },
    {
      title: 'Eloquent ORM (Laravel)',
      description: 'Use Laravel Eloquent for elegant database operations with ActiveRecord pattern.',
      syntax: 'Model::all(), find(), create()',
      usage: 'ORM operations',
      code: '<?php\n// Define model\nclass User extends Model {}\n\n// Query\n$users = User::all();\n$user = User::find(1);\n$active = User::where("active", true)->get();\n\n// Create\n$user = User::create([\n  "name" => "Alice",\n  "email" => "alice@example.com"\n]);\n\n// Update\n$user->email = "new@example.com";\n$user->save();\n?>'
    },
    {
      title: 'Routing (Laravel)',
      description: 'Define routes to map URLs to controllers. Use route parameters and middleware.',
      syntax: 'Route::get(), Route::post()',
      usage: 'URL mapping',
      code: '<?php\n// routes/web.php\nRoute::get("/", function () {\n  return view("welcome");\n});\n\nRoute::get("/users", [UserController::class, "index"]);\nRoute::post("/users", [UserController::class, "store"]);\nRoute::get("/users/{id}", [UserController::class, "show"]);\n\n// Route groups\nRoute::middleware("auth")->group(function () {\n  Route::get("/dashboard", [DashboardController::class, "index"]);\n});\n?>'
    },
    {
      title: 'Controllers',
      description: 'Handle business logic in controllers. Use resource controllers for REST operations.',
      syntax: 'Controller classes',
      usage: 'Business logic',
      code: '<?php\nclass UserController extends Controller {\n  public function index() {\n    $users = User::all();\n    return view("users.index", compact("users"));\n  }\n  \n  public function store(Request $request) {\n    $user = User::create($request->all());\n    return redirect("/users");\n  }\n  \n  public function show($id) {\n    $user = User::findOrFail($id);\n    return view("users.show", compact("user"));\n  }\n}\n?>'
    },
    {
      title: 'Blade Templates',
      description: 'Use Laravel Blade templating engine for views. Includes layouts, sections, and directives.',
      syntax: '@extends, @section, @foreach',
      usage: 'View rendering',
      code: '{{-- layout.blade.php --}}\n<!DOCTYPE html>\n<html>\n<head><title>@yield("title")</title></head>\n<body>\n  @yield("content")\n</body>\n</html>\n\n{{-- users.blade.php --}}\n@extends("layout")\n\n@section("title", "Users")\n\n@section("content")\n  @foreach($users as $user)\n    <p>{{ $user->name }}</p>\n  @endforeach\n@endsection'
    },
    {
      title: 'Validation',
      description: 'Validate user input with built-in validators or Laravel validation rules.',
      syntax: 'validate(), filter_var()',
      usage: 'Input validation',
      code: '<?php\n// Laravel validation\n$validated = $request->validate([\n  "name" => "required|max:255",\n  "email" => "required|email|unique:users",\n  "age" => "required|integer|min:18",\n  "password" => "required|min:8|confirmed"\n]);\n\n// Built-in\nif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {\n  die("Invalid email");\n}\n?>'
    },
    {
      title: 'Sessions',
      description: 'Maintain user state across requests with sessions. Store and retrieve session data.',
      syntax: 'session_start(), $_SESSION',
      usage: 'State management',
      code: '<?php\nsession_start();\n\n// Set session\n$_SESSION["user_id"] = 1;\n$_SESSION["username"] = "Alice";\n\n// Get session\nif (isset($_SESSION["user_id"])) {\n  echo "User ID: " . $_SESSION["user_id"];\n}\n\n// Destroy session\nsession_destroy();\n?>'
    },
    {
      title: 'Cookies',
      description: 'Store data in user browser with cookies. Set expiration and security flags.',
      syntax: 'setcookie(), $_COOKIE',
      usage: 'Client-side storage',
      code: '<?php\n// Set cookie (expires in 1 hour)\nsetcookie("username", "Alice", time() + 3600, "/", "", true, true);\n\n// Get cookie\nif (isset($_COOKIE["username"])) {\n  echo $_COOKIE["username"];\n}\n\n// Delete cookie\nsetcookie("username", "", time() - 3600);\n?>'
    },
    {
      title: 'Authentication',
      description: 'Implement user authentication with password hashing, login, and logout.',
      syntax: 'password_hash(), password_verify()',
      usage: 'User authentication',
      code: '<?php\n// Register\n$hash = password_hash($password, PASSWORD_DEFAULT);\n$stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");\n$stmt->execute([$email, $hash]);\n\n// Login\n$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");\n$stmt->execute([$email]);\n$user = $stmt->fetch();\n\nif ($user && password_verify($password, $user["password"])) {\n  $_SESSION["user_id"] = $user["id"];\n  echo "Login successful";\n}\n?>'
    },

    // ADVANCED (7 lessons)
    {
      title: 'RESTful APIs',
      description: 'Build REST APIs with proper HTTP methods and JSON responses.',
      syntax: 'json_encode(), header()',
      usage: 'API development',
      code: '<?php\nheader("Content-Type: application/json");\n\n$method = $_SERVER["REQUEST_METHOD"];\n\nswitch ($method) {\n  case "GET":\n    echo json_encode(User::all());\n    break;\n  case "POST":\n    $data = json_decode(file_get_contents("php://input"), true);\n    $user = User::create($data);\n    http_response_code(201);\n    echo json_encode($user);\n    break;\n}\n?>'
    },
    {
      title: 'Middleware',
      description: 'Process requests before they reach controllers. Implement auth, logging, CORS.',
      syntax: 'Middleware classes',
      usage: 'Request processing',
      code: '<?php\n// Laravel Middleware\nclass Authenticate {\n  public function handle($request, Closure $next) {\n    if (!Auth::check()) {\n      return redirect("/login");\n    }\n    return $next($request);\n  }\n}\n\n// Apply\nRoute::middleware("auth")->group(function () {\n  Route::get("/dashboard", [DashboardController::class, "index"]);\n});\n?>'
    },
    {
      title: 'Caching',
      description: 'Improve performance with Redis, Memcached, or file caching.',
      syntax: 'Cache::get(), Redis',
      usage: 'Performance optimization',
      code: '<?php\n// Laravel Cache\n$users = Cache::remember("users", 3600, function () {\n  return User::all();\n});\n\nCache::forget("users"); // Clear cache\n\n// Redis\n$redis = new Redis();\n$redis->connect("127.0.0.1", 6379);\n$redis->set("key", "value");\necho $redis->get("key");\n?>'
    },
    {
      title: 'Queue and Jobs',
      description: 'Process time-consuming tasks asynchronously with queues.',
      syntax: 'dispatch(), Queue::push()',
      usage: 'Background processing',
      code: '<?php\n// Laravel Job\nclass SendEmail implements ShouldQueue {\n  public function handle() {\n    Mail::to($this->user)->send(new WelcomeEmail());\n  }\n}\n\n// Dispatch job\nSendEmail::dispatch($user);\n\n// Process queue\nphp artisan queue:work\n?>'
    },
    {
      title: 'Testing with PHPUnit',
      description: 'Write unit and feature tests with PHPUnit. Test controllers, models, and APIs.',
      syntax: 'PHPUnit, assertions',
      usage: 'Quality assurance',
      code: '<?php\nclass UserTest extends TestCase {\n  public function test_user_creation() {\n    $user = User::create([\n      "name" => "Test",\n      "email" => "test@example.com"\n    ]);\n    \n    $this->assertDatabaseHas("users", [\n      "email" => "test@example.com"\n    ]);\n    $this->assertEquals("Test", $user->name);\n  }\n}\n?>'
    },
    {
      title: 'Security Best Practices',
      description: 'Prevent SQL injection, XSS, CSRF attacks. Use prepared statements, escape output, validate input.',
      syntax: 'Security patterns',
      usage: 'Secure applications',
      code: '<?php\n// SQL Injection prevention\n$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");\n$stmt->execute([$id]);\n\n// XSS prevention\necho htmlspecialchars($userInput, ENT_QUOTES, "UTF-8");\n\n// CSRF protection (Laravel)\n@csrf\n\n// Password hashing\n$hash = password_hash($password, PASSWORD_DEFAULT);\n?>'
    },
    {
      title: 'Deployment',
      description: 'Deploy PHP applications to production servers. Configure Apache/Nginx, set environment variables, optimize for production.',
      syntax: 'Deployment strategies',
      usage: 'Production deployment',
      code: '# Apache .htaccess\nRewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule ^ index.php [L]\n\n# Nginx config\nlocation / {\n  try_files $uri $uri/ /index.php?$query_string;\n}\n\n# Optimize\ncomposer install --optimize-autoloader --no-dev\nphp artisan config:cache\nphp artisan route:cache'
    }
  ]
  return lessons
}

// Ruby Backend (Ruby on Rails)
function rubyBackendSpecs(languageName: string): SectionSpec[] {
  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    {
      title: `${languageName} Backend HOME`,
      description: 'Ruby is an elegant, readable programming language. Ruby on Rails is a full-stack web framework that emphasizes convention over configuration, making it perfect for rapid development of web applications and APIs.',
      syntax: 'class, def, end',
      usage: 'Build web applications quickly',
      code: '# Hello Ruby\nputs "Hello, Ruby!"\n\n# Variables and methods\nname = "World"\ndef greet(name)\n  "Hello, #{name}!"\nend\n\nputs greet(name)'
    },
    {
      title: 'Introduction to Ruby',
      description: 'Learn why Ruby is beloved for its elegant syntax and developer happiness. Understand its principles: everything is an object, duck typing, and the principle of least surprise.',
      syntax: 'Object-oriented, expressive',
      usage: 'Understand Ruby philosophy',
      code: '# Everything is an object\n5.times { puts "Hello" }\n"hello".upcase # "HELLO"\n\n# Blocks and iterators\n[1, 2, 3].each { |n| puts n }\n[1, 2, 3].map { |n| n * 2 } # [2, 4, 6]'
    },
    {
      title: 'Setup and Environment',
      description: 'Install Ruby via rbenv or RVM for version management. Install Rails gem and create a new Rails app. Set up database and dependencies.',
      syntax: 'rbenv, gem install rails',
      usage: 'Development environment',
      code: '# Install rbenv\ncurl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-installer | bash\n\n# Install Ruby\nrbenv install 3.2.0\nrbenv global 3.2.0\n\n# Install Rails\ngem install rails\n\n# Create app\nrails new myapp --database=postgresql'
    },
    {
      title: 'Ruby Basics',
      description: 'Learn Ruby syntax: variables, strings, numbers, symbols, and basic operations. Use irb for interactive Ruby.',
      syntax: 'Variables, strings, symbols',
      usage: 'First Ruby program',
      code: '# Variables (no declaration needed)\nname = "Alice"\nage = 25\nprice = 19.99\n\n# String interpolation\nputs "Hello, #{name}!"\n\n# Symbols (immutable strings)\nstatus = :active\nrole = :admin'
    },
    {
      title: 'Ruby Data Types',
      description: 'Work with arrays, hashes, strings, numbers, and ranges. Ruby has flexible, dynamic typing.',
      syntax: 'Array, Hash, String, Integer',
      usage: 'Data structures',
      code: '# Arrays\nfruits = ["apple", "banana", "cherry"]\nfruits << "date"\nfruits.each { |f| puts f }\n\n# Hashes (key-value pairs)\nuser = { name: "Alice", age: 25, email: "alice@example.com" }\nuser[:city] = "Paris"\n\n# Ranges\n(1..5).each { |i| puts i }'
    },

    // BASICS (20 lessons)
    {
      title: 'Strings and Symbols',
      description: 'Work with strings and symbols. String interpolation, concatenation, and common methods.',
      syntax: '"string", :symbol',
      usage: 'Text manipulation',
      code: 'name = "Alice"\ngreeting = "Hello, #{name}!"\n\n# String methods\nname.upcase # "ALICE"\nname.length # 5\nname.include?("Al") # true\n\n# Symbols (immutable, efficient)\nstatus = :active\nrole = :admin'
    },
    {
      title: 'Arrays',
      description: 'Create and manipulate arrays. Use iteration methods like each, map, select, reduce.',
      syntax: '[elements]',
      usage: 'Ordered collections',
      code: 'numbers = [1, 2, 3, 4, 5]\nnumbers.push(6)\nnumbers << 7\n\n# Iteration\nnumbers.each { |n| puts n }\ndoubled = numbers.map { |n| n * 2 }\nevens = numbers.select { |n| n.even? }\nsum = numbers.reduce(:+)'
    },
    {
      title: 'Hashes',
      description: 'Work with hashes for key-value data. Access, iteration, and common operations.',
      syntax: '{key: value}',
      usage: 'Key-value storage',
      code: 'user = { name: "Alice", age: 25, email: "alice@example.com" }\n\n# Access\nuser[:name] # "Alice"\nuser[:city] = "Paris"\n\n# Iteration\nuser.each do |key, value|\n  puts "#{key}: #{value}"\nend'
    },
    {
      title: 'Control Flow',
      description: 'Conditional logic with if, elsif, else, unless, and case statements.',
      syntax: 'if, elsif, else, case',
      usage: 'Branching logic',
      code: 'age = 20\nif age >= 18\n  puts "Adult"\nelsif age >= 13\n  puts "Teen"\nelse\n  puts "Child"\nend\n\n# Case statement\nrole = :admin\ncase role\nwhen :admin\n  puts "Full access"\nwhen :user\n  puts "Limited access"\nelse\n  puts "No access"\nend'
    },
    {
      title: 'Loops and Iterators',
      description: 'Iterate with while, until, for, and powerful iterator methods.',
      syntax: 'while, each, times, upto',
      usage: 'Iteration',
      code: '# While loop\ni = 0\nwhile i < 5\n  puts i\n  i += 1\nend\n\n# Times\n5.times { |i| puts i }\n\n# Each\n[1, 2, 3].each { |n| puts n }\n\n# Upto\n1.upto(5) { |i| puts i }'
    },
    {
      title: 'Methods',
      description: 'Define methods with def keyword. Use parameters, default values, and return values.',
      syntax: 'def method_name(params)',
      usage: 'Reusable logic',
      code: 'def greet(name)\n  "Hello, #{name}!"\nend\n\nputs greet("Alice")\n\n# Default parameters\ndef greet(name = "World", prefix = "Hello")\n  "#{prefix}, #{name}!"\nend\n\n# Implicit return\ndef add(a, b)\n  a + b # Returns last expression\nend'
    },
    {
      title: 'Blocks and Procs',
      description: 'Use blocks, lambdas, and procs for functional programming patterns.',
      syntax: '{  block  }, lambda, proc',
      usage: 'Higher-order functions',
      code: '# Blocks\n[1, 2, 3].each { |n| puts n }\n\n# Lambda\ngreet = lambda { |name| "Hello, #{name}!" }\nputs greet.call("Alice")\n\n# Proc\ndouble = Proc.new { |n| n * 2 }\nputs double.call(5) # 10'
    },
    {
      title: 'Classes and Objects',
      description: 'Define classes with initialize constructor and instance methods.',
      syntax: 'class Name',
      usage: 'Object-oriented programming',
      code: 'class User\n  def initialize(name, email)\n    @name = name\n    @email = email\n  end\n  \n  def greet\n    "Hello, I am #{@name}"\n  end\nend\n\nuser = User.new("Alice", "alice@example.com")\nputs user.greet'
    },
    {
      title: 'Instance Variables and Accessors',
      description: 'Use @instance variables and attr_reader, attr_writer, attr_accessor for properties.',
      syntax: '@variable, attr_accessor',
      usage: 'Object state',
      code: 'class User\n  attr_accessor :name, :email\n  attr_reader :id\n  \n  def initialize(id, name, email)\n    @id = id\n    @name = name\n    @email = email\n  end\nend\n\nuser = User.new(1, "Alice", "alice@example.com")\nuser.name = "Bob"\nputs user.name # "Bob"'
    },
    {
      title: 'Inheritance',
      description: 'Extend classes with inheritance. Use super to call parent methods.',
      syntax: 'class Child < Parent',
      usage: 'Code reuse',
      code: 'class Animal\n  def speak\n    "Some sound"\n  end\nend\n\nclass Dog < Animal\n  def speak\n    "Woof!"\n  end\n  \n  def parent_speak\n    super\n  end\nend\n\ndog = Dog.new\nputs dog.speak # "Woof!"'
    },
    {
      title: 'Modules and Mixins',
      description: 'Use modules for namespacing and mixins for shared behavior.',
      syntax: 'module Name, include, extend',
      usage: 'Code organization',
      code: 'module Greetable\n  def greet\n    "Hello from #{self.class}"\n  end\nend\n\nclass User\n  include Greetable\nend\n\nuser = User.new\nputs user.greet'
    },
    {
      title: 'File I/O',
      description: 'Read and write files with File class. Handle file operations safely.',
      syntax: 'File.read, File.write',
      usage: 'File operations',
      code: '# Write file\nFile.write("data.txt", "Hello, File!")\n\n# Read file\ncontent = File.read("data.txt")\nputs content\n\n# Block form (auto-closes)\nFile.open("log.txt", "a") do |file|\n  file.puts "New log entry"\nend'
    },
    {
      title: 'Exception Handling',
      description: 'Handle errors with begin, rescue, ensure, and raise.',
      syntax: 'begin, rescue, ensure, raise',
      usage: 'Error management',
      code: 'begin\n  result = risky_operation\n  raise "Error!" unless result\nrescue StandardError => e\n  puts "Error: #{e.message}"\nensure\n  puts "Cleanup"\nend\n\n# Inline rescue\nvalue = may_fail rescue "default"'
    },
    {
      title: 'Regular Expressions',
      description: 'Pattern matching with regex. Use match, scan, and gsub.',
      syntax: '/pattern/, match, gsub',
      usage: 'Pattern matching',
      code: 'email = "user@example.com"\nif email.match?(/\\w+@\\w+\\.\\w+/)\n  puts "Valid email"\nend\n\n# Extract matches\ntext = "Phone: 123-456-7890"\nphone = text[/(\\d{3})-(\\d{3})-(\\d{4})/, 0]\n\n# Replace\ntext.gsub(/\\d/, "*")'
    },
    {
      title: 'Gems and Bundler',
      description: 'Manage dependencies with Bundler and Gemfile. Install and use gems.',
      syntax: 'gem install, bundle install',
      usage: 'Package management',
      code: '# Gemfile\nsource "https://rubygems.org"\n\ngem "rails", "~> 7.0"\ngem "pg"\ngem "puma"\n\n# Install\nbundle install\n\n# Use gem\nrequire "httparty"\nresponse = HTTParty.get("https://api.example.com/users")'
    },
    {
      title: 'Rails MVC Architecture',
      description: 'Understand Model-View-Controller pattern in Rails. How components interact.',
      syntax: 'Models, Views, Controllers',
      usage: 'Application structure',
      code: '# MVC Flow:\n# 1. Request hits Router\n# 2. Router directs to Controller\n# 3. Controller uses Model to fetch data\n# 4. Controller renders View with data\n# 5. View returns HTML response\n\n# Directories:\n# app/models - Business logic and data\n# app/views - Templates\n# app/controllers - Request handlers'
    },
    {
      title: 'Rails Generators',
      description: 'Use Rails generators to scaffold code quickly. Generate models, controllers, migrations.',
      syntax: 'rails generate',
      usage: 'Code generation',
      code: '# Generate model\nrails generate model User name:string email:string\n\n# Generate controller\nrails generate controller Users index show\n\n# Generate scaffold (all at once)\nrails generate scaffold Post title:string body:text\n\n# Run migrations\nrails db:migrate'
    },
    {
      title: 'Database Migrations',
      description: 'Create and modify database schema with migrations. Version control for database changes.',
      syntax: 'rails db:migrate',
      usage: 'Schema management',
      code: '# Create migration\nrails generate migration AddAgeToUsers age:integer\n\n# Migration file\nclass AddAgeToUsers < ActiveRecord::Migration[7.0]\n  def change\n    add_column :users, :age, :integer\n    add_index :users, :email, unique: true\n  end\nend\n\n# Run\nrails db:migrate\n\n# Rollback\nrails db:rollback'
    },
    {
      title: 'ActiveRecord Queries',
      description: 'Query database with ActiveRecord methods. Chain queries for complex operations.',
      syntax: 'Model.where, .find, .includes',
      usage: 'Database queries',
      code: '# Find\nUser.find(1)\nUser.find_by(email: "alice@example.com")\n\n# Where\nUser.where(active: true)\nUser.where("age > ?", 18)\n\n# Chaining\nUser.where(active: true).order(created_at: :desc).limit(10)\n\n# Joins\nPost.joins(:user).where(users: { active: true })'
    },
    {
      title: 'ActiveRecord Associations',
      description: 'Define relationships between models: has_many, belongs_to, has_one, has_and_belongs_to_many.',
      syntax: 'has_many, belongs_to',
      usage: 'Model relationships',
      code: '# app/models/user.rb\nclass User < ApplicationRecord\n  has_many :posts, dependent: :destroy\n  has_many :comments\nend\n\n# app/models/post.rb\nclass Post < ApplicationRecord\n  belongs_to :user\n  has_many :comments, dependent: :destroy\nend\n\n# Usage\nuser = User.first\nuser.posts # All posts by user\npost = user.posts.create(title: "Hello")'
    },

    // INTERMEDIATE (10 lessons)
    {
      title: 'Routing',
      description: 'Define routes with resourceful routing. Nested routes and custom routes.',
      syntax: 'resources, namespace',
      usage: 'URL mapping',
      code: '# config/routes.rb\nRails.application.routes.draw do\n  root "posts#index"\n  \n  resources :posts do\n    resources :comments\n  end\n  \n  namespace :api do\n    namespace :v1 do\n      resources :users\n    end\n  end\n  \n  get "/about", to: "pages#about"\nend'
    },
    {
      title: 'Controllers',
      description: 'Handle requests in controllers. Use before_action, params, and render.',
      syntax: 'before_action, params, render',
      usage: 'Request handling',
      code: 'class PostsController < ApplicationController\n  before_action :set_post, only: [:show, :edit, :update, :destroy]\n  \n  def index\n    @posts = Post.all\n  end\n  \n  def show\n  end\n  \n  def create\n    @post = Post.new(post_params)\n    if @post.save\n      redirect_to @post\n    else\n      render :new\n    end\n  end\n  \n  private\n  \n  def set_post\n    @post = Post.find(params[:id])\n  end\n  \n  def post_params\n    params.require(:post).permit(:title, :body)\n  end\nend'
    },
    {
      title: 'Views and ERB',
      description: 'Create views with ERB templates. Use layouts, partials, and helpers.',
      syntax: '<% %>, <%= %>, render',
      usage: 'Template rendering',
      code: '<!-- app/views/layouts/application.html.erb -->\n<html>\n  <head><%= yield :head %></head>\n  <body>\n    <%= yield %>\n  </body>\n</html>\n\n<!-- app/views/posts/index.html.erb -->\n<h1>Posts</h1>\n<% @posts.each do |post| %>\n  <%= render "post", post: post %>\n<% end %>\n\n<!-- app/views/posts/_post.html.erb -->\n<div class="post">\n  <h2><%= post.title %></h2>\n  <p><%= post.body %></p>\n</div>'
    },
    {
      title: 'Validations',
      description: 'Validate model data with built-in and custom validators.',
      syntax: 'validates, validate',
      usage: 'Data integrity',
      code: 'class User < ApplicationRecord\n  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }\n  validates :username, presence: true, length: { minimum: 3, maximum: 20 }\n  validates :age, numericality: { greater_than: 0 }, allow_nil: true\n  \n  validate :custom_validation\n  \n  private\n  \n  def custom_validation\n    if email && email.end_with?("@blocked.com")\n      errors.add(:email, "domain not allowed")\n    end\n  end\nend'
    },
    {
      title: 'Callbacks',
      description: 'Use Active Record callbacks for lifecycle hooks: before_save, after_create, etc.',
      syntax: 'before_save, after_create',
      usage: 'Lifecycle hooks',
      code: 'class User < ApplicationRecord\n  before_save :downcase_email\n  after_create :send_welcome_email\n  before_destroy :cleanup_data\n  \n  private\n  \n  def downcase_email\n    self.email = email.downcase\n  end\n  \n  def send_welcome_email\n    UserMailer.welcome_email(self).deliver_later\n  end\n  \n  def cleanup_data\n    # Remove associated data\n  end\nend'
    },
    {
      title: 'Strong Parameters',
      description: 'Whitelist parameters to prevent mass assignment vulnerabilities.',
      syntax: 'params.require().permit()',
      usage: 'Security',
      code: 'class UsersController < ApplicationController\n  def create\n    @user = User.new(user_params)\n    if @user.save\n      redirect_to @user\n    else\n      render :new\n    end\n  end\n  \n  private\n  \n  def user_params\n    params.require(:user).permit(:name, :email, :age)\n  end\nend'
    },
    {
      title: 'Sessions and Cookies',
      description: 'Maintain state with sessions and cookies. Store user data across requests.',
      syntax: 'session[], cookies[]',
      usage: 'State management',
      code: 'class SessionsController < ApplicationController\n  def create\n    user = User.find_by(email: params[:email])\n    if user&.authenticate(params[:password])\n      session[:user_id] = user.id\n      redirect_to root_path\n    else\n      flash[:error] = "Invalid credentials"\n      render :new\n    end\n  end\n  \n  def destroy\n    session[:user_id] = nil\n    redirect_to root_path\n  end\nend\n\n# Set cookie\ncookies[:user_preference] = "dark_mode"'
    },
    {
      title: 'Authentication',
      description: 'Implement authentication with has_secure_password or Devise gem.',
      syntax: 'has_secure_password, Devise',
      usage: 'User authentication',
      code: '# Gemfile\ngem "bcrypt"\n\n# app/models/user.rb\nclass User < ApplicationRecord\n  has_secure_password\n  validates :email, presence: true, uniqueness: true\nend\n\n# Migration\nrails generate migration AddPasswordDigestToUsers password_digest:string\n\n# Login\nuser = User.find_by(email: email)\nif user&.authenticate(password)\n  session[:user_id] = user.id\nend'
    },
    {
      title: 'Action Mailer',
      description: 'Send emails with Action Mailer. Configure SMTP and create mailer classes.',
      syntax: 'ActionMailer::Base',
      usage: 'Email notifications',
      code: '# app/mailers/user_mailer.rb\nclass UserMailer < ApplicationMailer\n  def welcome_email(user)\n    @user = user\n    mail(to: @user.email, subject: "Welcome!")\n  end\nend\n\n# app/views/user_mailer/welcome_email.html.erb\n<h1>Welcome <%= @user.name %>!</h1>\n\n# Usage\nUserMailer.welcome_email(user).deliver_now\nUserMailer.welcome_email(user).deliver_later # Background job'
    },
    {
      title: 'Active Storage',
      description: 'Handle file uploads with Active Storage. Upload to local disk, S3, or other services.',
      syntax: 'has_one_attached, has_many_attached',
      usage: 'File uploads',
      code: '# app/models/user.rb\nclass User < ApplicationRecord\n  has_one_attached :avatar\n  has_many_attached :documents\nend\n\n# Upload\nuser.avatar.attach(params[:avatar])\n\n# Display in view\n<%= image_tag user.avatar if user.avatar.attached? %>\n\n# URL\nuser.avatar.url'
    },

    // ADVANCED (7 lessons)
    {
      title: 'REST APIs with Rails',
      description: 'Build JSON APIs with Rails API mode. Use serializers and proper status codes.',
      syntax: 'render json:, status:',
      usage: 'API development',
      code: '# app/controllers/api/v1/users_controller.rb\nmodule Api\n  module V1\n    class UsersController < ApplicationController\n      def index\n        users = User.all\n        render json: users, status: :ok\n      end\n      \n      def create\n        user = User.new(user_params)\n        if user.save\n          render json: user, status: :created\n        else\n          render json: { errors: user.errors }, status: :unprocessable_entity\n        end\n      end\n    end\n  end\nend'
    },
    {
      title: 'Background Jobs',
      description: 'Process tasks asynchronously with ActiveJob and Sidekiq.',
      syntax: 'perform_later, Sidekiq',
      usage: 'Async processing',
      code: '# app/jobs/email_job.rb\nclass EmailJob < ApplicationJob\n  queue_as :default\n  \n  def perform(user_id)\n    user = User.find(user_id)\n    UserMailer.welcome_email(user).deliver_now\n  end\nend\n\n# Usage\nEmailJob.perform_later(user.id)\n\n# Delayed\nEmailJob.set(wait: 1.hour).perform_later(user.id)\n\n# Gemfile\ngem "sidekiq"'
    },
    {
      title: 'Caching',
      description: 'Improve performance with Rails caching strategies.',
      syntax: 'Rails.cache, cache do',
      usage: 'Performance optimization',
      code: '# Low-level caching\nRails.cache.fetch("users/all", expires_in: 12.hours) do\n  User.all.to_a\nend\n\n# Fragment caching\n<% cache @post do %>\n  <%= render @post %>\n<% end %>\n\n# Russian doll caching\n<% cache [@post, @post.comments.maximum(:updated_at)] do %>\n  <%= render @post %>\n  <%= render @post.comments %>\n<% end %>'
    },
    {
      title: 'Testing with RSpec',
      description: 'Write comprehensive tests with RSpec and FactoryBot.',
      syntax: 'describe, it, expect',
      usage: 'Quality assurance',
      code: '# Gemfile\ngem "rspec-rails"\ngem "factory_bot_rails"\n\n# spec/models/user_spec.rb\nRSpec.describe User, type: :model do\n  it { should validate_presence_of(:email) }\n  it { should validate_uniqueness_of(:email) }\n  \n  describe "#full_name" do\n    it "returns first and last name" do\n      user = User.new(first_name: "Alice", last_name: "Smith")\n      expect(user.full_name).to eq("Alice Smith")\n    end\n  end\nend\n\n# spec/factories/users.rb\nFactoryBot.define do\n  factory :user do\n    email { Faker::Internet.email }\n    name { Faker::Name.name }\n  end\nend'
    },
    {
      title: 'ActionCable and WebSockets',
      description: 'Real-time features with ActionCable for WebSocket connections.',
      syntax: 'ActionCable, channels',
      usage: 'Real-time communication',
      code: '# app/channels/chat_channel.rb\nclass ChatChannel < ApplicationCable::Channel\n  def subscribed\n    stream_from "chat_#{params[:room]}"\n  end\n  \n  def speak(data)\n    ActionCable.server.broadcast("chat_#{params[:room]}", message: data["message"])\n  end\nend\n\n# JavaScript\nimport consumer from "./consumer"\n\nconsumer.subscriptions.create({ channel: "ChatChannel", room: 1 }, {\n  received(data) {\n    console.log(data.message)\n  }\n})'
    },
    {
      title: 'Security Best Practices',
      description: 'Prevent common vulnerabilities: SQL injection, XSS, CSRF, mass assignment.',
      syntax: 'Security patterns',
      usage: 'Secure applications',
      code: '# CSRF protection (automatic)\nprotect_from_forgery with: :exception\n\n# SQL injection prevention (use ActiveRecord)\nUser.where("email = ?", params[:email]) # Safe\nUser.where("email = #{params[:email]}") # Unsafe!\n\n# XSS prevention (automatic in ERB)\n<%= user_input %> # Auto-escaped\n<%== user_input %> # Unescaped (dangerous!)\n\n# Mass assignment protection\nparams.require(:user).permit(:name, :email) # Whitelist'
    },
    {
      title: 'Deployment',
      description: 'Deploy Rails apps to production with Heroku, Capistrano, or Docker.',
      syntax: 'Deployment strategies',
      usage: 'Production deployment',
      code: '# Heroku\ngit push heroku main\nheroku run rails db:migrate\nheroku run rails db:seed\n\n# Procfile\nweb: bundle exec puma -C config/puma.rb\nworker: bundle exec sidekiq\n\n# Environment variables\nheroku config:set DATABASE_URL=...\n\n# Capistrano (config/deploy.rb)\nset :application, "myapp"\nset :repo_url, "git@github.com:user/myapp.git"\nset :deploy_to, "/var/www/myapp"\n\n# Deploy\ncap production deploy'
    }
  ]
  return lessons
}

// Database
function databaseSpecs(languageName: string): SectionSpec[] {
  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    { title: `${languageName} HOME`, description: 'SQL (Structured Query Language) is the standard language for managing and querying relational databases. Learn to store, retrieve, and manipulate data efficiently.', syntax: 'DDL, DML, DCL', usage: 'Persist and query data', code: 'SELECT * FROM users WHERE age >= 18;' },
    { title: 'Introduction to Databases', description: 'Understand databases, DBMS (Database Management Systems), and the difference between SQL and NoSQL databases.', syntax: 'Relational databases', usage: 'Store structured data', code: '-- Relational: MySQL, PostgreSQL, SQLite\n-- NoSQL: MongoDB, Redis, Cassandra' },
    { title: 'Setup and Environment', description: 'Install and set up a database system like PostgreSQL, MySQL, or SQLite. Connect using command line or GUI tools.', syntax: 'Installation, psql, mysql', usage: 'Development environment', code: '-- Connect to PostgreSQL\npsql -U username -d database_name\n\n-- Or use GUI tools like pgAdmin, MySQL Workbench' },
    { title: 'SQL Basics', description: 'Learn the fundamental SQL commands: SELECT, INSERT, UPDATE, DELETE, and their basic syntax.', syntax: 'SELECT, INSERT, UPDATE, DELETE', usage: 'Basic operations', code: 'SELECT name, email FROM users;\nINSERT INTO users (name, email) VALUES ("Ada", "ada@example.com");' },
    { title: 'Database Fundamentals', description: 'Understand tables, rows, columns, schemas, and how relational databases organize data.', syntax: 'Tables, Columns, Rows', usage: 'Data organization', code: '-- Table: users\n-- Columns: id, name, email, age\n-- Rows: individual user records' },

    // BASICS (20 lessons)
    { title: 'Creating Databases', description: 'Create and drop databases. Switch between databases.', syntax: 'CREATE DATABASE, DROP DATABASE', usage: 'Database management', code: 'CREATE DATABASE my_app;\nUSE my_app;\nDROP DATABASE old_app;' },
    { title: 'Creating Tables', description: 'Define table structure with columns and data types.', syntax: 'CREATE TABLE, DROP TABLE', usage: 'Define schema', code: 'CREATE TABLE users (\n  id INT PRIMARY KEY,\n  name VARCHAR(100),\n  email VARCHAR(100),\n  age INT\n);' },
    { title: 'Data Types', description: 'Common SQL data types: INT, VARCHAR, TEXT, DATE, BOOLEAN, DECIMAL, TIMESTAMP.', syntax: 'INT, VARCHAR, DATE, BOOLEAN', usage: 'Type safety', code: 'CREATE TABLE products (\n  id INT,\n  name VARCHAR(100),\n  price DECIMAL(10, 2),\n  in_stock BOOLEAN,\n  created_at TIMESTAMP\n);' },
    { title: 'INSERT Data', description: 'Add new rows to tables with INSERT statement.', syntax: 'INSERT INTO', usage: 'Add records', code: 'INSERT INTO users (id, name, email, age)\nVALUES (1, "Alice", "alice@example.com", 25);\n\n-- Multiple rows\nINSERT INTO users VALUES\n  (2, "Bob", "bob@example.com", 30),\n  (3, "Carol", "carol@example.com", 28);' },
    { title: 'SELECT Queries', description: 'Retrieve data with SELECT. Use * for all columns or specify column names.', syntax: 'SELECT columns FROM table', usage: 'Retrieve data', code: 'SELECT * FROM users;\nSELECT name, email FROM users;\nSELECT DISTINCT age FROM users;' },
    { title: 'WHERE Clause', description: 'Filter results with WHERE using conditions and operators.', syntax: 'WHERE condition', usage: 'Filter data', code: 'SELECT * FROM users WHERE age >= 18;\nSELECT * FROM users WHERE name = "Alice";\nSELECT * FROM users WHERE age BETWEEN 20 AND 30;' },
    { title: 'ORDER BY', description: 'Sort query results in ascending (ASC) or descending (DESC) order.', syntax: 'ORDER BY column ASC/DESC', usage: 'Sort results', code: 'SELECT * FROM users ORDER BY age DESC;\nSELECT * FROM users ORDER BY name ASC;\nSELECT * FROM users ORDER BY age DESC, name ASC;' },
    { title: 'LIMIT and OFFSET', description: 'Limit the number of results and skip rows with OFFSET for pagination.', syntax: 'LIMIT n OFFSET m', usage: 'Pagination', code: 'SELECT * FROM users LIMIT 10;\nSELECT * FROM users LIMIT 10 OFFSET 20;\n-- Get page 3 (20 per page)\nSELECT * FROM users LIMIT 20 OFFSET 40;' },
    { title: 'UPDATE Data', description: 'Modify existing records with UPDATE statement.', syntax: 'UPDATE table SET column = value', usage: 'Modify records', code: 'UPDATE users SET age = 26 WHERE id = 1;\nUPDATE users SET email = "newemail@example.com", age = 31 WHERE name = "Bob";' },
    { title: 'DELETE Data', description: 'Remove records from tables with DELETE statement.', syntax: 'DELETE FROM table WHERE condition', usage: 'Remove records', code: 'DELETE FROM users WHERE id = 3;\nDELETE FROM users WHERE age < 18;\n-- Delete all (be careful!)\nDELETE FROM users;' },
    { title: 'Primary Keys', description: 'Define unique identifiers for table rows with PRIMARY KEY constraint.', syntax: 'PRIMARY KEY, AUTO_INCREMENT', usage: 'Unique identification', code: 'CREATE TABLE users (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  email VARCHAR(100) UNIQUE,\n  name VARCHAR(100)\n);' },
    { title: 'Foreign Keys', description: 'Create relationships between tables using FOREIGN KEY constraints.', syntax: 'FOREIGN KEY REFERENCES', usage: 'Table relationships', code: 'CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  user_id INT,\n  total DECIMAL(10, 2),\n  FOREIGN KEY (user_id) REFERENCES users(id)\n);' },
    { title: 'Constraints', description: 'Enforce data integrity with constraints: NOT NULL, UNIQUE, CHECK, DEFAULT.', syntax: 'NOT NULL, UNIQUE, CHECK, DEFAULT', usage: 'Data validation', code: 'CREATE TABLE products (\n  id INT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  price DECIMAL(10, 2) CHECK (price > 0),\n  status VARCHAR(20) DEFAULT "active"\n);' },
    { title: 'NULL Values', description: 'Handle NULL (missing/unknown) values with IS NULL and IS NOT NULL.', syntax: 'IS NULL, IS NOT NULL, COALESCE', usage: 'Handle missing data', code: 'SELECT * FROM users WHERE email IS NULL;\nSELECT * FROM users WHERE email IS NOT NULL;\nSELECT COALESCE(phone, "N/A") FROM users;' },
    { title: 'DISTINCT', description: 'Retrieve unique values by eliminating duplicates.', syntax: 'SELECT DISTINCT', usage: 'Remove duplicates', code: 'SELECT DISTINCT city FROM users;\nSELECT DISTINCT age FROM users ORDER BY age;' },
    { title: 'Aliases', description: 'Rename columns and tables temporarily using AS keyword.', syntax: 'AS alias_name', usage: 'Readable queries', code: 'SELECT name AS full_name, age AS years FROM users;\nSELECT u.name, o.total FROM users AS u, orders AS o;' },
    { title: 'Basic Functions', description: 'Use built-in SQL functions for data manipulation and calculation.', syntax: 'COUNT, SUM, AVG, MIN, MAX', usage: 'Data analysis', code: 'SELECT COUNT(*) FROM users;\nSELECT AVG(age) FROM users;\nSELECT MIN(price), MAX(price) FROM products;' },
    { title: 'String Functions', description: 'Manipulate strings with UPPER, LOWER, CONCAT, SUBSTRING, LENGTH.', syntax: 'UPPER, LOWER, CONCAT, SUBSTRING', usage: 'String manipulation', code: 'SELECT UPPER(name) FROM users;\nSELECT CONCAT(first_name, " ", last_name) AS full_name FROM users;\nSELECT SUBSTRING(email, 1, 5) FROM users;' },
    { title: 'Date Functions', description: 'Work with dates using NOW, CURDATE, DATE_ADD, DATEDIFF, DATE_FORMAT.', syntax: 'NOW, DATE_ADD, DATEDIFF', usage: 'Date operations', code: 'SELECT NOW();\nSELECT DATE_ADD(created_at, INTERVAL 7 DAY) FROM users;\nSELECT DATEDIFF(NOW(), created_at) AS days_since FROM users;' },
    { title: 'Numeric Functions', description: 'Mathematical operations with ROUND, CEIL, FLOOR, ABS, POWER.', syntax: 'ROUND, CEIL, FLOOR, ABS', usage: 'Math operations', code: 'SELECT ROUND(price, 2) FROM products;\nSELECT CEIL(4.3); -- Returns 5\nSELECT ABS(-10); -- Returns 10' },

    // INTERMEDIATE (10 lessons)
    { title: 'INNER JOIN', description: 'Combine rows from two tables based on matching values.', syntax: 'INNER JOIN ... ON', usage: 'Combine related data', code: 'SELECT users.name, orders.total\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;' },
    { title: 'LEFT and RIGHT JOIN', description: 'Include all rows from one table even if no match exists.', syntax: 'LEFT JOIN, RIGHT JOIN', usage: 'Include unmatched rows', code: 'SELECT users.name, orders.total\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id;\n\n-- Shows all users, even those with no orders' },
    { title: 'Multiple Joins', description: 'Join more than two tables in a single query.', syntax: 'Multiple JOIN clauses', usage: 'Complex relationships', code: 'SELECT u.name, o.total, p.name AS product\nFROM users u\nJOIN orders o ON u.id = o.user_id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id;' },
    { title: 'GROUP BY', description: 'Group rows that have the same values in specified columns.', syntax: 'GROUP BY column', usage: 'Aggregate by groups', code: 'SELECT city, COUNT(*) AS user_count\nFROM users\nGROUP BY city;\n\nSELECT user_id, SUM(total) AS total_spent\nFROM orders\nGROUP BY user_id;' },
    { title: 'HAVING Clause', description: 'Filter groups created by GROUP BY (unlike WHERE which filters rows).', syntax: 'HAVING condition', usage: 'Filter aggregates', code: 'SELECT city, COUNT(*) AS user_count\nFROM users\nGROUP BY city\nHAVING COUNT(*) > 10;\n\nSELECT user_id, SUM(total)\nFROM orders\nGROUP BY user_id\nHAVING SUM(total) > 1000;' },
    { title: 'Aggregate Functions', description: 'Advanced aggregation with COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT.', syntax: 'Aggregate functions with GROUP BY', usage: 'Statistical analysis', code: 'SELECT category, COUNT(*) AS count, AVG(price) AS avg_price\nFROM products\nGROUP BY category;\n\nSELECT user_id, GROUP_CONCAT(product_name) AS products\nFROM purchases\nGROUP BY user_id;' },
    { title: 'Subqueries', description: 'Nest queries inside other queries for complex filtering and data retrieval.', syntax: 'SELECT in WHERE/FROM', usage: 'Complex queries', code: 'SELECT * FROM users\nWHERE id IN (SELECT user_id FROM orders WHERE total > 100);\n\nSELECT name, (SELECT COUNT(*) FROM orders WHERE user_id = users.id) AS order_count\nFROM users;' },
    { title: 'UNION and UNION ALL', description: 'Combine results from multiple SELECT statements.', syntax: 'UNION, UNION ALL', usage: 'Merge results', code: 'SELECT name FROM customers\nUNION\nSELECT name FROM suppliers;\n\n-- UNION ALL includes duplicates\nSELECT email FROM users\nUNION ALL\nSELECT email FROM subscribers;' },
    { title: 'Indexes', description: 'Create indexes to speed up query performance on frequently searched columns.', syntax: 'CREATE INDEX, DROP INDEX', usage: 'Query optimization', code: 'CREATE INDEX idx_email ON users(email);\nCREATE INDEX idx_name_age ON users(name, age);\nDROP INDEX idx_email ON users;' },
    { title: 'Views', description: 'Create virtual tables based on SELECT queries for reusability and security.', syntax: 'CREATE VIEW, DROP VIEW', usage: 'Reusable queries', code: 'CREATE VIEW active_users AS\nSELECT id, name, email FROM users WHERE status = "active";\n\nSELECT * FROM active_users;\nDROP VIEW active_users;' },

    // ADVANCED (7 lessons)
    { title: 'Transactions', description: 'Group multiple operations atomically with ACID properties: BEGIN, COMMIT, ROLLBACK.', syntax: 'BEGIN, COMMIT, ROLLBACK', usage: 'Data consistency', code: 'BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n\n-- Or ROLLBACK to undo' },
    { title: 'Stored Procedures', description: 'Create reusable SQL code blocks that can accept parameters and return results.', syntax: 'CREATE PROCEDURE, CALL', usage: 'Code reusability', code: 'CREATE PROCEDURE GetUserOrders(IN userId INT)\nBEGIN\n  SELECT * FROM orders WHERE user_id = userId;\nEND;\n\nCALL GetUserOrders(1);' },
    { title: 'Triggers', description: 'Automatically execute code in response to INSERT, UPDATE, or DELETE events.', syntax: 'CREATE TRIGGER', usage: 'Automatic actions', code: 'CREATE TRIGGER update_timestamp\nBEFORE UPDATE ON users\nFOR EACH ROW\nBEGIN\n  SET NEW.updated_at = NOW();\nEND;' },
    { title: 'Database Design', description: 'Design effective database schemas with proper entity relationships and ER diagrams.', syntax: 'ER diagrams, relationships', usage: 'Schema planning', code: '-- One-to-Many: User -> Orders\n-- Many-to-Many: Students <-> Courses (junction table)\n-- One-to-One: User -> Profile' },
    { title: 'Normalization', description: 'Organize data to reduce redundancy using normal forms (1NF, 2NF, 3NF, BCNF).', syntax: 'Normal forms', usage: 'Reduce redundancy', code: '-- 1NF: Atomic values, no repeating groups\n-- 2NF: No partial dependencies\n-- 3NF: No transitive dependencies\n-- BCNF: Every determinant is a candidate key' },
    { title: 'Performance Optimization', description: 'Optimize queries with EXPLAIN, proper indexing, query rewriting, and caching.', syntax: 'EXPLAIN, indexes, query optimization', usage: 'Fast queries', code: 'EXPLAIN SELECT * FROM users WHERE email = "test@example.com";\n\n-- Add indexes, avoid SELECT *, use WHERE efficiently' },
    { title: 'Backup and Recovery', description: 'Implement backup strategies, point-in-time recovery, and disaster recovery plans.', syntax: 'pg_dump, mysqldump, restore', usage: 'Data protection', code: '-- PostgreSQL backup\npg_dump mydb > backup.sql\n\n-- MySQL backup\nmysqldump -u root -p mydb > backup.sql\n\n-- Restore\npsql mydb < backup.sql' },
  ]
  return lessons
}

// Machine Learning / AI
function mlSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} powers data prep, modeling, and evaluation.`, syntax: 'arrays, tensors, models', usage: 'Train/evaluate models', code: 'import numpy as np' },
    { title: 'Data Collection', description: 'Load CSV/JSON and handle missing data.', syntax: 'pandas read_csv, dropna', usage: 'Clean datasets', code: 'df = pd.read_csv("data.csv").dropna()' },
    { title: 'Exploration', description: 'Visualize distributions and correlations.', syntax: 'describe(), plot()', usage: 'Find signal', code: 'df.describe()' },
    { title: 'Feature Engineering', description: 'Encode categoricals, scale numbers, and split data.', syntax: 'OneHotEncoder, StandardScaler', usage: 'Prepare inputs', code: 'X_train, X_test = train_test_split(X, y)' },
    { title: 'Model Selection', description: 'Choose baseline models and compare.', syntax: 'LogReg, RandomForest, CNN', usage: 'Fit models', code: 'model.fit(X_train, y_train)' },
    { title: 'Training', description: 'Train with validation and checkpoints.', syntax: 'epochs, learning rate', usage: 'Improve accuracy', code: 'history = model.fit(X_train, y_train, epochs=10)' },
    { title: 'Evaluation', description: 'Accuracy, F1, ROC, RMSE depending on task.', syntax: 'metrics', usage: 'Judge models', code: 'f1_score(y_test, preds)' },
    { title: 'Inference', description: 'Serve predictions and handle drift.', syntax: 'predict(), pipelines', usage: 'Use models', code: 'model.predict(sample)' },
    { title: 'MLOps', description: 'Track experiments, version data, automate training.', syntax: 'MLflow, DVC, pipelines', usage: 'Reliable delivery', code: '# mlflow run .' },
    { title: 'Ethics and Safety', description: 'Mitigate bias, ensure privacy, monitor misuse.', syntax: 'fairness checks, PII handling', usage: 'Responsible AI', code: '# run bias evaluation' },
    { title: 'Deployment', description: 'Package models for APIs/batch jobs.', syntax: 'Docker, FastAPI, TF Serving', usage: 'Ship models', code: 'uvicorn api:app' },
    { title: 'Mini Project', description: 'Train and evaluate a model end-to-end on a small dataset.', syntax: 'prep + train + eval', usage: 'Apply ML skills', code: '# notebook or script run' },
  ]
}

// DevOps
function devopsSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} keeps software delivery fast and reliable.`, syntax: 'Git, CI/CD, containers', usage: 'Ship changes safely', code: 'name: CI\non: [push]' },
    { title: 'Version Control', description: 'Branching, reviews, and trunk-based workflows.', syntax: 'git flow basics', usage: 'Collaborate effectively', code: 'git status' },
    { title: 'CI Pipelines', description: 'Automate builds, tests, and lint on every change.', syntax: 'workflows, jobs, steps', usage: 'Catch regressions early', code: 'uses: actions/checkout@v4' },
    { title: 'Containers', description: 'Build minimal images and run containers locally.', syntax: 'Dockerfile, docker run', usage: 'Consistent envs', code: 'docker build -t app .' },
    { title: 'Infrastructure as Code', description: 'Provision with Terraform/CloudFormation.', syntax: 'terraform apply', usage: 'Repeatable infra', code: 'resource "aws_s3_bucket" "site" {}' },
    { title: 'Observability', description: 'Collect logs, metrics, and traces.', syntax: 'logging, metrics, tracing', usage: 'Understand systems', code: 'logger.info({ route })' },
    { title: 'Security and Secrets', description: 'Manage secrets, scanning, and least privilege.', syntax: 'vault, OIDC, iam', usage: 'Harden delivery', code: 'secrets.AWS_ACCESS_KEY_ID' },
    { title: 'Scaling and Reliability', description: 'Health checks, autoscaling, load balancing.', syntax: 'probes, HPA, LB', usage: 'Stay resilient', code: 'readinessProbe: { httpGet: { path: /health } }' },
    { title: 'Release Management', description: 'Blue/green, canary, and rollback strategies.', syntax: 'traffic splitting', usage: 'Safe deploys', code: '# shift 10% traffic' },
    { title: 'Incident Response', description: 'On-call, runbooks, and postmortems.', syntax: 'SLOs, SLIs', usage: 'Recover quickly', code: '# follow runbook link' },
    { title: 'Cost and Efficiency', description: 'Right-size resources and monitor spend.', syntax: 'budgets, quotas', usage: 'Control costs', code: '# set budgets' },
    { title: 'Mini Project', description: 'Create a CI/CD pipeline deploying a containerized app.', syntax: 'pipeline + container', usage: 'Apply DevOps skills', code: '# see workflow yaml' },
  ]
}

// Security
function securitySpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} Security HOME`, description: 'Security fundamentals for building and operating safe software.', syntax: 'CIA, threat modeling', usage: 'Protect systems', code: '// identify assets and threats' },
    { title: 'Threat Modeling', description: 'Identify assets, actors, and abuse cases.', syntax: 'STRIDE, DREAD', usage: 'Plan defenses', code: '# enumerate threats' },
    { title: 'Authentication and Authorization', description: 'Strong auth flows, MFA, and least-privilege roles.', syntax: 'OIDC, JWT, RBAC', usage: 'Verify and limit access', code: 'if(!user) return 401' },
    { title: 'Input Validation and Output Encoding', description: 'Prevent injection and XSS with validation and encoding.', syntax: 'allow-lists, escape', usage: 'Data safety', code: 'sanitize(input)' },
    { title: 'Secrets and Storage', description: 'Manage secrets safely and encrypt data at rest.', syntax: 'KMS, vault, hashing', usage: 'Protect data', code: 'hash(password)' },
    { title: 'Transport Security', description: 'TLS everywhere; secure headers.', syntax: 'HTTPS, HSTS, CSP', usage: 'Secure channels', code: 'Strict-Transport-Security' },
    { title: 'Logging and Monitoring', description: 'Capture auth events and detect anomalies.', syntax: 'centralized logs, alerts', usage: 'Detect issues', code: 'logger.warn({ userId, action })' },
    { title: 'Security Testing', description: 'Static analysis, dependency scanning, dynamic testing.', syntax: 'SAST, DAST, SCA', usage: 'Find flaws early', code: '# npm audit' },
    { title: 'Hardening', description: 'Least privilege, firewalls, patching.', syntax: 'firewalls, patching', usage: 'Reduce risk', code: '# apply updates' },
    { title: 'Incident Response', description: 'Detection, containment, recovery steps.', syntax: 'IR playbooks', usage: 'Respond effectively', code: '# follow IR plan' },
    { title: 'Compliance and Privacy', description: 'Handle PII, consent, retention.', syntax: 'GDPR/CCPA basics', usage: 'Stay compliant', code: '# data retention rules' },
    { title: 'Mini Project', description: 'Harden a web service with auth, validation, and logging.', syntax: 'controls + testing', usage: 'Apply security skills', code: '# add security middleware' },
  ]
}

// Blockchain
function blockchainSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} enables decentralized apps and smart contracts.`, syntax: 'accounts, transactions', usage: 'Build on-chain logic', code: '// connect to provider' },
    { title: 'Accounts and Keys', description: 'Manage wallets, addresses, and key safety.', syntax: 'private/public keys', usage: 'Identity on-chain', code: '// never expose private keys' },
    { title: 'Transactions and Gas', description: 'Send transactions and estimate gas costs.', syntax: 'nonce, gasPrice', usage: 'Execute safely', code: '// send transaction' },
    { title: 'Smart Contracts', description: 'Author, compile, and deploy contracts.', syntax: 'Solidity/Vyper basics', usage: 'On-chain programs', code: 'function greet() public pure returns(string memory){ return "hi"; }' },
    { title: 'Tokens', description: 'Work with ERC-20/721 standards.', syntax: 'ERC-20, ERC-721', usage: 'Represent value', code: '// totalSupply(), transfer()' },
    { title: 'Oracles and Data', description: 'Bring external data on-chain securely.', syntax: 'oracle patterns', usage: 'Trusted inputs', code: '// price feed example' },
    { title: 'Security', description: 'Avoid reentrancy, overflows, and access bugs.', syntax: 'checks-effects-interactions', usage: 'Safe contracts', code: 'require(msg.sender == owner);' },
    { title: 'Testing', description: 'Test contracts locally with hardhat/foundry.', syntax: 'unit + integration tests', usage: 'Prevent exploits', code: '// write tests for each function' },
    { title: 'Tooling', description: 'Linters, formatters, analyzers.', syntax: 'slither, prettier', usage: 'Code quality', code: '// run slither' },
    { title: 'Deployment', description: 'Deploy to testnets then mainnet.', syntax: 'verify, migrate', usage: 'Ship safely', code: '// npx hardhat deploy --network sepolia' },
    { title: 'Integrating dApps', description: 'Connect contracts to web/mobile clients.', syntax: 'ethers/web3 providers', usage: 'UX for users', code: '// use ethers.js' },
    { title: 'Mini Project', description: 'Launch a token or simple marketplace contract with tests.', syntax: 'contract + client', usage: 'Apply blockchain skills', code: '// deploy and interact' },
  ]
}

// Game Dev
function gameSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} Game HOME`, description: `${languageName} can power 2D/3D gameplay loops and rendering.`, syntax: 'update, render, input', usage: 'Build games', code: '// game loop' },
    { title: 'Game Loop', description: 'Structure update, render, and timing.', syntax: 'requestAnimationFrame', usage: 'Stable gameplay', code: 'function loop(){ update(); render(); requestAnimationFrame(loop); }' },
    { title: 'Input Handling', description: 'Capture keyboard, mouse, or controller input.', syntax: 'event listeners', usage: 'Player controls', code: 'window.addEventListener("keydown", onKey)' },
    { title: 'Physics and Movement', description: 'Position, velocity, and collision basics.', syntax: 'vectors, delta time', usage: 'Realistic motion', code: 'pos += velocity * dt' },
    { title: 'Rendering', description: 'Draw sprites or meshes efficiently.', syntax: 'canvas/webgl', usage: 'Visual output', code: 'ctx.drawImage(sprite, x, y)' },
    { title: 'State Management', description: 'Manage scenes, entities, and lifecycles.', syntax: 'state machines', usage: 'Organized flow', code: 'state = "menu" | "play"' },
    { title: 'UI and HUD', description: 'Display health, score, and inventory.', syntax: 'overlay layers', usage: 'Player feedback', code: '// draw HUD elements' },
    { title: 'Audio', description: 'Play effects and music with proper layering.', syntax: 'audio API', usage: 'Immersive feel', code: '// play sound effect' },
    { title: 'Performance', description: 'Batch draws and avoid expensive allocations.', syntax: 'object pooling', usage: 'Smooth FPS', code: '// pool entities' },
    { title: 'Testing', description: 'Test core logic and collision routines.', syntax: 'unit tests', usage: 'Reduce bugs', code: '// assert collision outcomes' },
    { title: 'Distribution', description: 'Package builds for web/desktop/mobile.', syntax: 'build pipeline', usage: 'Ship game', code: '// export build' },
    { title: 'Mini Project', description: 'Build a small playable level with scoring and restart.', syntax: 'loop + input + render', usage: 'Apply game skills', code: '// final build' },
  ]
}

// React Native (13 lessons)
// React Native - Comprehensive 40+ lesson curriculum
function reactNativeSpecs(languageName: string): SectionSpec[] {
  return [
    {
      title: `${languageName} HOME`,
      description: 'React Native lets you build native mobile apps using React and JavaScript. Write once, run on iOS and Android with true native performance and components. Learn to build professional mobile applications from scratch.',
      syntax: 'JSX, React Components, Native APIs',
      usage: 'Cross-platform mobile development',
      code: 'import React from "react";\nimport { View, Text, StyleSheet } from "react-native";\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>Hello React Native!</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },\n  title: { fontSize: 24, fontWeight: "bold", color: "#333" }\n});'
    },
    {
      title: 'Introduction',
      description: 'React Native uses React framework to build truly native mobile apps. Unlike hybrid frameworks, React Native compiles to native components. It powers apps from Facebook, Instagram, Airbnb, Tesla, and more.',
      syntax: 'Component-based mobile development',
      usage: 'Understand React Native architecture',
      code: '// Why React Native?\n// 1. Truly native apps (not webviews)\n// 2. Share code between iOS and Android (60-95%)\n// 3. Fast development with hot reload\n// 4. Large community and ecosystem\n// 5. Use same React skills for web and mobile\n// 6. Access to native modules and APIs\n// 7. Performance close to native\n\n// React Native renders:\n// <View> → UIView (iOS) / android.view.View (Android)\n// <Text> → UITextView / TextView\n// <Image> → UIImageView / ImageView\n// <ScrollView> → UIScrollView / ScrollView'
    },
    {
      title: 'Setup & Installation - Expo',
      description: 'Expo is the easiest way to start with React Native. It provides a complete workflow without native code configuration. Perfect for beginners and rapid prototyping.',
      syntax: 'npx create-expo-app, expo start',
      usage: 'Quick start with Expo',
      code: '// Install Expo CLI\nnpm install -g expo-cli\n\n// Create new project\nnpx create-expo-app MyApp\ncd MyApp\n\n// Start development server\nnpx expo start\n// OR\nnpm start\n\n// This opens Expo DevTools in browser\n// Scan QR code with Expo Go app (iOS/Android)\n// Or press "i" for iOS simulator, "a" for Android emulator\n\n// Project structure:\n// App.js - Main entry point\n// app.json - App configuration\n// assets/ - Images, fonts, etc.\n// node_modules/ - Dependencies\n\n// Advantages of Expo:\n// - No Xcode or Android Studio required\n// - Easy access to device features (camera, location, etc.)\n// - Over-the-air updates\n// - Easy sharing via QR code'
    },
    {
      title: 'Setup & Installation - React Native CLI',
      description: 'React Native CLI gives you full control and access to native code. Required for apps that need custom native modules or specific native configurations.',
      syntax: 'npx react-native init',
      usage: 'Full native control setup',
      code: '// Prerequisites:\n// 1. Node.js (v14+)\n// 2. Watchman (Mac): brew install watchman\n// 3. Xcode (Mac) for iOS\n// 4. Android Studio for Android\n\n// Create new project\nnpx react-native init MyApp\ncd MyApp\n\n// Run on iOS (Mac only)\nnpx react-native run-ios\n// OR specific simulator\nnpx react-native run-ios --simulator="iPhone 14 Pro"\n\n// Run on Android\nnpx react-native run-android\n\n// Project structure:\n// android/ - Android native code\n// ios/ - iOS native code\n// App.tsx - Main component\n// index.js - Entry point\n// metro.config.js - Bundler config\n\n// When to use CLI over Expo:\n// - Need custom native modules\n// - App size concerns (Expo adds extra)\n// - Need specific native configurations\n// - Enterprise requirements'
    },
    {
      title: 'Core Components - View',
      description: 'View is the fundamental building block for UI. It maps to UIView (iOS) and android.view.View (Android). Use for layout containers, flex layouts, and component grouping.',
      syntax: '<View style={{ }}></View>',
      usage: 'Create containers and layouts',
      code: 'import { View, Text } from "react-native";\n\nfunction ViewExamples() {\n  return (\n    <View style={{ flex: 1, padding: 20 }}>\n      {/* Simple container */}\n      <View style={{ backgroundColor: "#f0f0f0", padding: 10 }}>\n        <Text>Container</Text>\n      </View>\n\n      {/* Flex layout */}\n      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>\n        <View style={{ width: 50, height: 50, backgroundColor: "red" }} />\n        <View style={{ width: 50, height: 50, backgroundColor: "blue" }} />\n      </View>\n\n      {/* Nested views */}\n      <View style={{ marginTop: 20 }}>\n        <View style={{ backgroundColor: "#e0e0e0", padding: 10 }}>\n          <View style={{ backgroundColor: "white", padding: 10 }}>\n            <Text>Nested View</Text>\n          </View>\n        </View>\n      </View>\n    </View>\n  );\n}'
    },
    {
      title: 'Core Components - Text',
      description: 'Text component displays text content. All text must be wrapped in Text tags. Supports styling, nesting, press events, and accessibility features.',
      syntax: '<Text style={{ }}>content</Text>',
      usage: 'Display and style text',
      code: 'import { Text, View, StyleSheet } from "react-native";\n\nfunction TextExamples() {\n  return (\n    <View style={styles.container}>\n      {/* Basic text */}\n      <Text>Simple text</Text>\n\n      {/* Styled text */}\n      <Text style={styles.title}>Styled Title</Text>\n      <Text style={styles.subtitle}>Subtitle text</Text>\n\n      {/* Nested text (inherits parent styles) */}\n      <Text style={{ fontSize: 16 }}>\n        Regular text with <Text style={{ fontWeight: "bold" }}>bold</Text> and\n        <Text style={{ fontStyle: "italic" }}> italic</Text> parts\n      </Text>\n\n      {/* Pressable text */}\n      <Text \n        onPress={() => alert("Pressed!")}\n        style={{ color: "blue", textDecorationLine: "underline" }}\n      >\n        Click me\n      </Text>\n\n      {/* Number of lines */}\n      <Text numberOfLines={2}>\n        This is a very long text that will be truncated after two lines...\n      </Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { padding: 20 },\n  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },\n  subtitle: { fontSize: 16, color: "#666" }\n});'
    },
    {
      title: 'Core Components - Image',
      description: 'Display images from various sources: local files, network URLs, or base64. Supports resizing, tinting, and loading events. Use FastImage for better performance.',
      syntax: '<Image source={{ }} style={{ }} />',
      usage: 'Display images in your app',
      code: 'import { View, Image, StyleSheet } from "react-native";\n\nfunction ImageExamples() {\n  return (\n    <View style={styles.container}>\n      {/* Local image */}\n      <Image \n        source={require("./assets/logo.png")}\n        style={styles.logo}\n      />\n\n      {/* Network image */}\n      <Image\n        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}\n        style={styles.networkImage}\n      />\n\n      {/* Image with events */}\n      <Image\n        source={{ uri: "https://placekitten.com/200/200" }}\n        style={styles.image}\n        onLoadStart={() => console.log("Loading...")}\n        onLoad={() => console.log("Loaded!")}\n        onError={(e) => console.log("Error:", e.nativeEvent.error)}\n      />\n\n      {/* Resize modes */}\n      <Image\n        source={{ uri: "https://placekitten.com/400/300" }}\n        style={styles.resizeImage}\n        resizeMode="cover" // or "contain", "stretch", "center"\n      />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { padding: 20 },\n  logo: { width: 100, height: 100 },\n  networkImage: { width: 50, height: 50, marginVertical: 10 },\n  image: { width: 200, height: 200, borderRadius: 10 },\n  resizeImage: { width: "100%", height: 200, marginTop: 10 }\n});'
    },
    {
      title: 'Core Components - ScrollView',
      description: 'ScrollView creates a scrollable container for content that exceeds screen height. Use for small lists. For large datasets, use FlatList instead for better performance.',
      syntax: '<ScrollView horizontal={bool}></ScrollView>',
      usage: 'Create scrollable content',
      code: 'import { ScrollView, View, Text, Image, StyleSheet } from "react-native";\n\nfunction ScrollViewExample() {\n  return (\n    <View style={{ flex: 1 }}>\n      {/* Vertical scrolling */}\n      <ScrollView \n        style={styles.scroll}\n        showsVerticalScrollIndicator={false}\n        bounces={true}\n      >\n        {[...Array(20)].map((_, i) => (\n          <View key={i} style={styles.item}>\n            <Text>Item {i + 1}</Text>\n          </View>\n        ))}\n      </ScrollView>\n\n      {/* Horizontal scrolling */}\n      <ScrollView \n        horizontal\n        showsHorizontalScrollIndicator={false}\n        style={{ marginTop: 20 }}\n      >\n        {[...Array(10)].map((_, i) => (\n          <View key={i} style={styles.horizontalItem}>\n            <Text>{i + 1}</Text>\n          </View>\n        ))}\n      </ScrollView>\n\n      {/* Refresh control */}\n      <ScrollView\n        refreshControl={\n          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />\n        }\n      >\n        <Text>Pull to refresh</Text>\n      </ScrollView>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  scroll: { flex: 1 },\n  item: { padding: 20, borderBottomWidth: 1, borderColor: "#ddd" },\n  horizontalItem: { width: 100, height: 100, backgroundColor: "#3b82f6", margin: 5, justifyContent: "center", alignItems: "center" }\n});'
    },
    {
      title: 'Core Components - TextInput',
      description: 'TextInput allows users to enter text. Support various keyboard types, auto-correction, secure entry, and validation. Essential for forms and user input.',
      syntax: '<TextInput value={state} onChangeText={setState} />',
      usage: 'Collect user input',
      code: 'import React, { useState } from "react";\nimport { View, TextInput, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";\n\nfunction TextInputExample() {\n  const [name, setName] = useState("");\n  const [email, setEmail] = useState("");\n  const [password, setPassword] = useState("");\n  const [bio, setBio] = useState("");\n\n  return (\n    <KeyboardAvoidingView \n      behavior={Platform.OS === "ios" ? "padding" : "height"}\n      style={styles.container}\n    >\n      {/* Simple text input */}\n      <TextInput\n        value={name}\n        onChangeText={setName}\n        placeholder="Enter your name"\n        style={styles.input}\n      />\n\n      {/* Email input */}\n      <TextInput\n        value={email}\n        onChangeText={setEmail}\n        placeholder="Email"\n        keyboardType="email-address"\n        autoCapitalize="none"\n        autoCorrect={false}\n        style={styles.input}\n      />\n\n      {/* Password input */}\n      <TextInput\n        value={password}\n        onChangeText={setPassword}\n        placeholder="Password"\n        secureTextEntry\n        style={styles.input}\n      />\n\n      {/* Multiline input */}\n      <TextInput\n        value={bio}\n        onChangeText={setBio}\n        placeholder="Bio"\n        multiline\n        numberOfLines={4}\n        style={[styles.input, { height: 100, textAlignVertical: "top" }]}\n      />\n\n      <Text>Name: {name}</Text>\n    </KeyboardAvoidingView>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, padding: 20 },\n  input: { borderWidth: 1, borderColor: "#ddd", padding: 12, marginBottom: 10, borderRadius: 8 }\n});'
    },
    {
      title: 'StyleSheet API',
      description: 'StyleSheet.create() optimizes styles for better performance. Styles are JavaScript objects similar to CSS but use camelCase properties. Supports flexbox,colors, transforms, and shadows.',
      syntax: 'StyleSheet.create({ styleName: { property: value } })',
      usage: 'Define and organize component styles',
      code: 'import { View, Text, StyleSheet } from "react-native";\n\nconst styles = StyleSheet.create({\n  // Layout\n  container: {\n    flex: 1,\n    padding: 20,\n    backgroundColor: "#f5f5f5"\n  },\n\n  // Typography\n  title: {\n    fontSize: 24,\n    fontWeight: "700", // or "bold", "300", etc.\n    color: "#333",\n    marginBottom: 8\n  },\n  text: {\n    fontSize: 16,\n    lineHeight: 24,\n    color: "#666"\n  },\n\n  // Box model\n  card: {\n    backgroundColor: "white",\n    padding: 16,\n    margin: 10,\n    borderRadius: 12,\n    borderWidth: 1,\n    borderColor: "#e0e0e0"\n  },\n\n  // Shadows (iOS)\n  shadowedBox: {\n    shadowColor: "#000",\n    shadowOffset: { width: 0, height: 2 },\n    shadowOpacity: 0.25,\n    shadowRadius: 3.84\n  },\n\n  // Elevation (Android)\n  elevatedBox: {\n    elevation: 5\n  },\n\n  // Transform\n  rotated: {\n    transform: [{ rotate: "45deg" }, { scale: 1.2 }]\n  },\n\n  // Positioning\n  absolute: {\n    position: "absolute",\n    top: 20,\n    right: 20\n  }\n});\n\nfunction StyledComponent() {\n  return (\n    <View style={styles.container}>\n      <View style={[styles.card, styles.shadowedBox]}> {/* Combine styles */}\n        <Text style={styles.title}>Title</Text>\n        <Text style={styles.text}>Content</Text>\n      </View>\n    </View>\n  );\n}'
    },
    {
      title: 'Flexbox Layout',
      description: 'React Native uses Flexbox for layouts (like CSS Flexbox but with some differences). Default flexDirection is "column". Master flex, flexDirection, justifyContent, and alignItems for responsive layouts.',
      syntax: 'flexDirection, justifyContent, alignItems, flex',
      usage: 'Create responsive layouts',
      code: 'import { View, Text, StyleSheet } from "react-native";\n\nfunction FlexboxExamples() {\n  return (\n    <View style={{ flex: 1 }}>\n      {/* Row layout */}\n      <View style={styles.row}>\n        <View style={styles.box}><Text>1</Text></View>\n        <View style={styles.box}><Text>2</Text></View>\n        <View style={styles.box}><Text>3</Text></View>\n      </View>\n\n      {/* Space between */}\n      <View style={[styles.row, { justifyContent: "space-between" }]}>\n        <View style={styles.box}><Text>A</Text></View>\n        <View style={styles.box}><Text>B</Text></View>\n      </View>\n\n      {/* Centered */}\n      <View style={styles.centered}>\n        <Text>Perfectly Centered</Text>\n      </View>\n\n      {/* Flex ratios */}\n      <View style={styles.row}>\n        <View style={[styles.box, { flex: 1 }]}><Text>flex: 1</Text></View>\n        <View style={[styles.box, { flex: 2 }]}><Text>flex: 2</Text></View>\n        <View style={[styles.box, { flex: 1 }]}><Text>flex: 1</Text></View>\n      </View>\n\n      {/* Wrap */}\n      <View style={[styles.row, { flexWrap: "wrap" }]}>\n        {[...Array(10)].map((_, i) => (\n          <View key={i} style={[styles.box, { width: 60 }]}>\n            <Text>{i}</Text>\n          </View>\n        ))}\n      </View>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  row: {\n    flexDirection: "row",\n    padding: 10\n  },\n  box: {\n    backgroundColor: "#3b82f6",\n    padding: 10,\n    margin: 5,\n    alignItems: "center",\n    justifyContent: "center"\n  },\n  centered: {\n    flex: 1,\n    justifyContent: "center",\n    alignItems: "center"\n  }\n});'
    },
    {
      title: 'Touchable Components',
      description: 'Handle touches with TouchableOpacity, TouchableHighlight, or Pressable (modern). Each provides different visual feedback. Pressable is the most flexible and recommended.',
      syntax: '<Pressable onPress={}>, <TouchableOpacity>',
      usage: 'Create interactive elements',
      code: 'import { View, Text, TouchableOpacity, Pressable, StyleSheet } from "react-native";\n\nfunction TouchableExamples() {\n  return (\n    <View style={styles.container}>\n      {/* TouchableOpacity - fades on press */}\n      <TouchableOpacity\n        style={styles.button}\n        onPress={() => console.log("Pressed")}\n        activeOpacity={0.7}\n      >\n        <Text style={styles.buttonText}>TouchableOpacity</Text>\n      </TouchableOpacity>\n\n      {/* Pressable - modern, flexible */}\n      <Pressable\n        style={({ pressed }) => [\n          styles.button,\n          pressed && styles.pressed\n        ]}\n        onPress={() => console.log("Pressed")}\n        onLongPress={() => console.log("Long pressed")}\n        onPressIn={() => console.log("Press started")}\n        onPressOut={() => console.log("Press ended")}\n      >\n        {({ pressed }) => (\n          <Text style={styles.buttonText}>\n            {pressed ? "Pressed!" : "Pressable"}\n          </Text>\n        )}\n      </Pressable>\n\n      {/* Disabled state */}\n      <Pressable\n        style={[styles.button, styles.disabled]}\n        disabled\n      >\n        <Text style={styles.buttonText}>Disabled</Text>\n      </Pressable>\n\n      {/* Hit slop - expand touch area */}\n      <Pressable\n        onPress={() => console.log("Hit!")}\n        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}\n      >\n        <Text>Small target with big hit area</Text>\n      </Pressable>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { padding: 20 },\n  button: { backgroundColor: "#3b82f6", padding: 16, borderRadius: 8, marginBottom: 10, alignItems: "center" },\n  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },\n  pressed: { backgroundColor: "#2563eb", transform: [{ scale: 0.98 }] },\n  disabled: { backgroundColor: "#d1d5db" }\n});'
    },
    {
      title: 'FlatList - Efficient Lists',
      description: 'FlatList renders large lists efficiently using virtualization (only renders visible items). Much better performance than ScrollView for long lists. Essential for production apps.',
      syntax: '<FlatList data={array} renderItem={({ item }) => {}} keyExtractor={} />',
      usage: 'Display large scrollable lists efficiently',
      code: 'import React, { useState } from "react";\nimport { FlatList, View, Text, StyleSheet, RefreshControl } from "react-native";\n\nconst DATA = [\n  { id: "1", title: "First Item", description: "Description 1" },\n  { id: "2", title: "Second Item", description: "Description 2" },\n  { id: "3", title: "Third Item", description: "Description 3" },\n  // ... many more items\n];\n\nfunction FlatListExample() {\n  const [refreshing, setRefreshing] = useState(false);\n\n  const renderItem = ({ item, index }) => (\n    <View style={styles.item}>\n      <Text style={styles.title}>{item.title}</Text>\n      <Text style={styles.description}>{item.description}</Text>\n    </View>\n  );\n\n  const onRefresh = () => {\n    setRefreshing(true);\n    // Fetch new data\n    setTimeout(() => setRefreshing(false), 2000);\n  };\n\n  return (\n    <FlatList\n      data={DATA}\n      renderItem={renderItem}\n      keyExtractor={item => item.id}\n      // Performance optimizations\n      initialNumToRender={10}\n      maxToRenderPerBatch={10}\n      windowSize={5}\n      // Pull to refresh\n      refreshControl={\n        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />\n      }\n      // Separators\n      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#ddd" }} />}\n      // Empty state\n      ListEmptyComponent={<Text style={{ padding: 20, textAlign: "center" }}>No items</Text>}\n      // Header/Footer\n      ListHeaderComponent={<Text style={styles.header}>My List</Text>}\n      ListFooterComponent={<Text style={{ padding: 20 }}>End of list</Text>}\n    />\n  );\n}\n\nconst styles = StyleSheet.create({\n  item: { padding: 16, backgroundColor: "white" },\n  title: { fontSize: 18, fontWeight: "600" },\n  description: { fontSize: 14, color: "#666", marginTop: 4 },\n  header: { fontSize: 24, fontWeight: "bold", padding: 16, backgroundColor: "#f0f0f0" }\n});'
    },
    {
      title: 'SectionList - Grouped Lists',
      description: 'SectionList displays data in sections with headers (like iOS Settings). Perfect for grouped content like contacts, settings, or categorized items.',
      syntax: '<SectionList sections={[]} renderItem={} renderSectionHeader={} />',
      usage: 'Display grouped/sectioned lists',
      code: 'import { SectionList, View, Text, StyleSheet } from "react-native";\n\nconst DATA = [\n  {\n    title: "Fruits",\n    data: ["Apple", "Banana", "Orange"]\n  },\n  {\n    title: "Vegetables",\n    data: ["Carrot", "Broccoli", "Spinach"]\n  },\n  {\n    title: "Dairy",\n    data: ["Milk", "Cheese", "Yogurt"]\n  }\n];\n\nfunction SectionListExample() {\n  return (\n    <SectionList\n      sections={DATA}\n      keyExtractor={(item, index) => item + index}\n      renderItem={({ item }) => (\n        <View style={styles.item}>\n          <Text style={styles.itemText}>{item}</Text>\n        </View>\n      )}\n      renderSectionHeader={({ section: { title } }) => (\n        <View style={styles.sectionHeader}>\n          <Text style={styles.sectionText}>{title}</Text>\n        </View>\n      )}\n      renderSectionFooter={({ section }) => (\n        <Text style={styles.footer}>{section.data.length} items</Text>\n      )}\n      stickySectionHeadersEnabled={true}\n      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#e0e0e0" }} />}\n      SectionSeparatorComponent={() => <View style={{ height: 10 }} />}\n    />\n  );\n}\n\nconst styles = StyleSheet.create({\n  sectionHeader: { backgroundColor: "#f0f0f0", padding: 12 },\n  sectionText: { fontSize: 18, fontWeight: "700", color: "#333" },\n  item: { padding: 16, backgroundColor: "white" },\n  itemText: { fontSize: 16 },\n  footer: { padding: 8, fontSize: 12, color: "#999", textAlign: "right" }\n});'
    },
    {
      title: 'Networking & Fetch API',
      description: 'Use the Fetch API to make HTTP requests. React Native includes fetch built-in. Handle loading states, errors, and JSON data. Use axios for more features.',
      syntax: 'fetch(url, options).then().catch()',
      usage: 'Make API calls and handle responses',
      code: 'import React, { useState, useEffect } from "react";\nimport { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";\n\nfunction NetworkingExample() {\n  const [data, setData] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    fetchData();\n  }, []);\n\n  const fetchData = async () => {\n    try {\n      setLoading(true);\n      const response = await fetch("https://jsonplaceholder.typicode.com/posts");\n      \n      if (!response.ok) {\n        throw new Error(`HTTP error! status: ${response.status}`);\n      }\n      \n      const json = await response.json();\n      setData(json.slice(0, 10)); // First 10 items\n    } catch (err) {\n      setError(err.message);\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  // POST request example\n  const createPost = async () => {\n    try {\n      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json"\n        },\n        body: JSON.stringify({\n          title: "New Post",\n          body: "Post content",\n          userId: 1\n        })\n      });\n      const json = await response.json();\n      console.log("Created:", json);\n    } catch (err) {\n      console.error(err);\n    }\n  };\n\n  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;\n  if (error) return <Text style={styles.error}>Error: {error}</Text>;\n\n  return (\n    <FlatList\n      data={data}\n      keyExtractor={item => item.id.toString()}\n      renderItem={({ item }) => (\n        <View style={styles.item}>\n          <Text style={styles.title}>{item.title}</Text>\n          <Text style={styles.body}>{item.body}</Text>\n        </View>\n      )}\n    />\n  );\n}\n\nconst styles = StyleSheet.create({\n  item: { padding: 16, borderBottomWidth: 1, borderColor: "#ddd" },\n  title: { fontSize: 16, fontWeight: "600", marginBottom: 4 },\n  body: { fontSize: 14, color: "#666" },\n  error: { padding: 20, color: "red", textAlign: "center" }\n});'
    },
    {
      title: 'Navigation - Stack Navigator',
      description: 'React Navigation provides stack-based navigation (push/pop screens). The most common navigation pattern. Install @react-navigation/native and @react-navigation/native-stack.',
      syntax: 'createNativeStackNavigator(), navigation.navigate()',
      usage: 'Navigate between screens',
      code: '// Install: npm install @react-navigation/native @react-navigation/native-stack\n// Expo: expo install react-native-screens react-native-safe-area-context\n\nimport { NavigationContainer } from "@react-navigation/native";\nimport { createNativeStackNavigator } from "@react-navigation/native-stack";\nimport { View, Text, Button, StyleSheet } from "react-native";\n\nconst Stack = createNativeStackNavigator();\n\nfunction HomeScreen({ navigation }) {\n  return (\n    <View style={styles.screen}>\n      <Text style={styles.title}>Home Screen</Text>\n      <Button\n        title="Go to Details"\n        onPress={() => navigation.navigate("Details", { itemId: 42, name: "Item" })}\n      />\n    </View>\n  );\n}\n\nfunction DetailsScreen({ route, navigation }) {\n  const { itemId, name } = route.params;\n\n  return (\n    <View style={styles.screen}>\n      <Text style={styles.title}>Details Screen</Text>\n      <Text>Item ID: {itemId}</Text>\n      <Text>Name: {name}</Text>\n      <Button title="Go Back" onPress={() => navigation.goBack()} />\n      <Button title="Go to Details Again" onPress={() => navigation.push("Details", { itemId: Math.random() })} />\n    </View>\n  );\n}\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator\n        screenOptions={{\n          headerStyle: { backgroundColor: "#3b82f6" },\n          headerTintColor: "#fff",\n          headerTitleStyle: { fontWeight: "bold" }\n        }}\n      >\n        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "My Home" }} />\n        <Stack.Screen name="Details" component={DetailsScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}\n\nconst styles = StyleSheet.create({\n  screen: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },\n  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 }\n});'
    },
    {
      title: 'Navigation - Tab Navigator',
      description: 'Bottom tab navigation is the most common mobile navigation pattern. Shows multiple screens with tabs at the bottom. Perfect for main app sections.',
      syntax: 'createBottomTabNavigator(), Tab.Screen',
      usage: 'Create bottom tab navigation',
      code: '// Install: npm install @react-navigation/bottom-tabs\nimport { NavigationContainer } from "@react-navigation/native";\nimport { createBottomTabNavigator } from "@react-navigation/bottom-tabs";\nimport { View, Text, StyleSheet } from "react-native";\nimport { Ionicons } from "@expo/vector-icons"; // or react-native-vector-icons\n\nconst Tab = createBottomTabNavigator();\n\nfunction HomeScreen() {\n  return (\n    <View style={styles.screen}>\n      <Text style={styles.title}>Home</Text>\n    </View>\n  );\n}\n\nfunction ProfileScreen() {\n  return (\n    <View style={styles.screen}>\n      <Text style={styles.title}>Profile</Text>\n    </View>\n  );\n}\n\nfunction SettingsScreen() {\n  return (\n    <View style={styles.screen}>\n      <Text style={styles.title}>Settings</Text>\n    </View>\n  );\n}\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Tab.Navigator\n        screenOptions={({ route }) => ({\n          tabBarIcon: ({ focused, color, size }) => {\n            let iconName;\n            if (route.name === "Home") iconName = focused ? "home" : "home-outline";\n            else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";\n            else if (route.name === "Settings") iconName = focused ? "settings" : "settings-outline";\n            return <Ionicons name={iconName} size={size} color={color} />;\n          },\n          tabBarActiveTintColor: "#3b82f6",\n          tabBarInactiveTintColor: "gray",\n          headerStyle: { backgroundColor: "#3b82f6" },\n          headerTintColor: "#fff"\n        })}\n      >\n        <Tab.Screen name="Home" component={HomeScreen} />\n        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarBadge: 3 }} />\n        <Tab.Screen name="Settings" component={SettingsScreen} />\n      </Tab.Navigator>\n    </NavigationContainer>\n  );\n}\n\nconst styles = StyleSheet.create({\n  screen: { flex: 1, justifyContent: "center", alignItems: "center" },\n  title: { fontSize: 24, fontWeight: "bold" }\n});'
    },
    {
      title: 'AsyncStorage - Local Persistence',
      description: 'AsyncStorage is an async, persistent, key-value storage system for React Native. Use for saving user preferences, auth tokens, cached data, and app state.',
      syntax: 'AsyncStorage.setItem(), getItem(), removeItem()',
      usage: 'Store data locally on device',
      code: '// Install: expo install @react-native-async-storage/async-storage\n// or: npm install @react-native-async-storage/async-storage\nimport AsyncStorage from "@react-native-async-storage/async-storage";\nimport React, { useState, useEffect } from "react";\nimport { View, Text, TextInput, Button, StyleSheet } from "react-native";\n\nfunction AsyncStorageExample() {\n  const [name, setName] = useState("");\n  const [savedName, setSavedName] = useState("");\n\n  // Load data on mount\n  useEffect(() => {\n    loadData();\n  }, []);\n\n  const loadData = async () => {\n    try {\n      const value = await AsyncStorage.getItem("@user_name");\n      if (value !== null) {\n        setSavedName(value);\n      }\n    } catch (e) {\n      console.error("Failed to load data", e);\n    }\n  };\n\n  const saveData = async () => {\n    try {\n      await AsyncStorage.setItem("@user_name", name);\n      setSavedName(name);\n      alert("Saved!");\n    } catch (e) {\n      console.error("Failed to save data", e);\n    }\n  };\n\n  const clearData = async () => {\n    try {\n      await AsyncStorage.removeItem("@user_name");\n      setSavedName("");\n      setName("");\n    } catch (e) {\n      console.error("Failed to clear data", e);\n    }\n  };\n\n  // Store objects\n  const saveObject = async () => {\n    const user = { id: 1, name: "John", email: "john@example.com" };\n    try {\n      await AsyncStorage.setItem("@user", JSON.stringify(user));\n    } catch (e) {\n      console.error(e);\n    }\n  };\n\n  const loadObject = async () => {\n    try {\n      const jsonValue = await AsyncStorage.getItem("@user");\n      return jsonValue != null ? JSON.parse(jsonValue) : null;\n    } catch (e) {\n      console.error(e);\n    }\n  };\n\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>AsyncStorage Demo</Text>\n      {savedName ? <Text style={styles.saved}>Saved: {savedName}</Text> : null}\n      \n      <TextInput\n        style={styles.input}\n        value={name}\n        onChangeText={setName}\n        placeholder="Enter your name"\n      />\n      \n      <Button title="Save" onPress={saveData} />\n      <Button title="Clear" onPress={clearData} color="red" />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, padding: 20, justifyContent: "center" },\n  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },\n  saved: { fontSize: 18, color: "green", marginBottom: 10, textAlign: "center" },\n  input: { borderWidth: 1, borderColor: "#ddd", padding: 12, marginBottom: 10, borderRadius: 8 }\n});'
    },
    {
      title: 'Platform Specific Code',
      description: 'Write different code for iOS and Android using Platform module or platform-specific file extensions (.ios.js, .android.js). Handle platform differences gracefully.',
      syntax: 'Platform.OS, Platform.select(), .ios.js / .android.js',
      usage: 'Handle iOS and Android differences',
      code: 'import { Platform, StyleSheet, Text, View } from "react-native";\n\n// Method 1: Platform.OS\nfunction PlatformExample() {\n  return (\n    <View style={styles.container}>\n      <Text>Platform: {Platform.OS}</Text>\n      <Text>Version: {Platform.Version}</Text>\n      \n      {Platform.OS === "ios" && <Text>This is iOS</Text>}\n      {Platform.OS === "android" && <Text>This is Android</Text>}\n    </View>\n  );\n}\n\n// Method 2: Platform.select()\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: Platform.select({\n      ios: 20,\n      android: 16\n    }),\n    marginTop: Platform.select({\n      ios: 44, // iOS status bar\n      android: 0\n    })\n  },\n  text: {\n    fontFamily: Platform.select({\n      ios: "System",\n      android: "Roboto"\n    }),\n    fontSize: Platform.select({\n      ios: 17,\n      android: 16\n    })\n  }\n});\n\n// Method 3: Platform-specific files\n// Create: Button.ios.js and Button.android.js\n// Then import: import Button from "./Button";\n// React Native automatically picks the right file\n\n// Button.ios.js\nexport default function Button({ title, onPress }) {\n  return (\n    <View style={{ backgroundColor: "#007AFF", padding: 12, borderRadius: 8 }}>\n      <Text style={{ color: "white", textAlign: "center" }}>{title}</Text>\n    </View>\n  );\n}\n\n// Button.android.js\nexport default function Button({ title, onPress }) {\n  return (\n    <View style={{ backgroundColor: "#2196F3", padding: 12, borderRadius: 4, elevation: 3 }}>\n      <Text style={{ color: "white", textAlign: "center" }}>{title.toUpperCase()}</Text>\n    </View>\n  );\n}\n\n// Check specific platform version\nif (Platform.OS === "android" && Platform.Version >= 30) {\n  // Android 11+\n}\n\nif (Platform.OS === "ios" && parseInt(Platform.Version, 10) >= 15) {\n  // iOS 15+\n}'
    },
    {
      title: 'Keyboard Handling',
      description: 'Handle the keyboard appearing/disappearing with KeyboardAvoidingView, Keyboard API, and keyboard events. Essential for forms and chat interfaces.',
      syntax: 'KeyboardAvoidingView, Keyboard.dismiss()',
      usage: 'Handle keyboard interactions',
      code: 'import React, { useState, useEffect } from "react";\nimport { View, Text, TextInput, Button, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, StyleSheet } from "react-native";\n\nfunction KeyboardExample() {\n  const [keyboardVisible, setKeyboardVisible] = useState(false);\n\n  useEffect(() => {\n    // Listen to keyboard events\n    const keyboardDidShowListener = Keyboard.addListener(\n      "keyboardDidShow",\n      () => setKeyboardVisible(true)\n    );\n    const keyboardDidHideListener = Keyboard.addListener(\n      "keyboardDidHide",\n      () => setKeyboardVisible(false)\n    );\n\n    return () => {\n      keyboardDidShowListener.remove();\n      keyboardDidHideListener.remove();\n    };\n  }, []);\n\n  return (\n    // Dismiss keyboard when tapping outside\n    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>\n      <KeyboardAvoidingView\n        behavior={Platform.OS === "ios" ? "padding" : "height"}\n        style={styles.container}\n        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}\n      >\n        <ScrollView contentContainerStyle={styles.content}>\n          <Text style={styles.title}>Login Form</Text>\n          \n          <TextInput\n            style={styles.input}\n            placeholder="Email"\n            keyboardType="email-address"\n            autoCapitalize="none"\n            returnKeyType="next"\n          />\n          \n          <TextInput\n            style={styles.input}\n            placeholder="Password"\n            secureTextEntry\n            returnKeyType="done"\n            onSubmitEditing={Keyboard.dismiss}\n          />\n          \n          <Button title="Login" onPress={() => {}} />\n          \n          {keyboardVisible && (\n            <Text style={styles.hint}>Keyboard is visible</Text>\n          )}\n        </ScrollView>\n      </KeyboardAvoidingView>\n    </TouchableWithoutFeedback>\n  );\n}\n\n// Alternative: Use react-native-keyboard-aware-scroll-view\n// npm install react-native-keyboard-aware-scroll-view\nimport { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";\n\nfunction BetterKeyboardHandling() {\n  return (\n    <KeyboardAwareScrollView\n      style={styles.container}\n      resetScrollToCoords={{ x: 0, y: 0 }}\n      contentContainerStyle={{ flexGrow: 1 }}\n      scrollEnabled={true}\n      enableOnAndroid={true}\n      extraScrollHeight={20}\n    >\n      {/* Your form here */}\n    </KeyboardAwareScrollView>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, backgroundColor: "#fff" },\n  content: { padding: 20, justifyContent: "center", flexGrow: 1 },\n  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },\n  input: { borderWidth: 1, borderColor: "#ddd", padding: 12, marginBottom: 12, borderRadius: 8 },\n  hint: { marginTop: 10, color: "gray", fontSize: 12, textAlign: "center" }\n});'
    },
    {
      title: 'Animations - Animated API',
      description: 'React Native\'s Animated API provides smooth, performant animations. Use Animated.Value, timing, spring, and interpolate for complex animations running on the native thread.',
      syntax: 'Animated.Value, Animated.timing(), Animated.spring()',
      usage: 'Create smooth animations',
      code: 'import React, { useRef, useEffect } from "react";\nimport { Animated, View, Button, StyleSheet, Easing } from "react-native";\n\nfunction AnimationExample() {\n  // Create animated value\n  const fadeAnim = useRef(new Animated.Value(0)).current;\n  const slideAnim = useRef(new Animated.Value(-100)).current;\n  const scaleAnim = useRef(new Animated.Value(1)).current;\n\n  // Fade in on mount\n  useEffect(() => {\n    Animated.timing(fadeAnim, {\n      toValue: 1,\n      duration: 1000,\n      useNativeDriver: true // Better performance\n    }).start();\n  }, []);\n\n  const slideIn = () => {\n    Animated.spring(slideAnim, {\n      toValue: 0,\n      friction: 5,\n      tension: 40,\n      useNativeDriver: true\n    }).start();\n  };\n\n  const pulse = () => {\n    Animated.sequence([\n      Animated.timing(scaleAnim, {\n        toValue: 1.2,\n        duration: 200,\n        easing: Easing.ease,\n        useNativeDriver: true\n      }),\n      Animated.timing(scaleAnim, {\n        toValue: 1,\n        duration: 200,\n        useNativeDriver: true\n      })\n    ]).start();\n  };\n\n  // Interpolation\n  const rotation = fadeAnim.interpolate({\n    inputRange: [0, 1],\n    outputRange: ["0deg", "360deg"]\n  });\n\n  // Parallel animations\n  const animateAll = () => {\n    Animated.parallel([\n      Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),\n      Animated.timing(slideAnim, { toValue: -100, duration: 500, useNativeDriver: true })\n    ]).start(() => {\n      // Callback after animation\n      console.log("Animations complete");\n    });\n  };\n\n  // Loop animation\n  const spin = useRef(new Animated.Value(0)).current;\n  useEffect(() => {\n    Animated.loop(\n      Animated.timing(spin, {\n        toValue: 1,\n        duration: 2000,\n        easing: Easing.linear,\n        useNativeDriver: true\n      })\n    ).start();\n  }, []);\n\n  const spinRotation = spin.interpolate({\n    inputRange: [0, 1],\n    outputRange: ["0deg", "360deg"]\n  });\n\n  return (\n    <View style={styles.container}>\n      <Animated.View\n        style={[styles.box, {\n          opacity: fadeAnim,\n          transform: [\n            { translateY: slideAnim },\n            { scale: scaleAnim },\n            { rotate: rotation }\n          ]\n        }]}\n      />\n\n      <Animated.View\n        style={[styles.spinner, {\n          transform: [{ rotate: spinRotation }]\n        }]}\n      />\n\n      <Button title="Slide In" onPress={slideIn} />\n      <Button title="Pulse" onPress={pulse} />\n      <Button title="Reset" onPress={animateAll} />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },\n  box: { width: 100, height: 100, backgroundColor: "#3b82f6", marginBottom: 20 },\n  spinner: { width: 50, height: 50, backgroundColor: "#ef4444", marginVertical: 20 }\n});'
    },
    {
      title: 'Gestures - PanResponder',
      description: 'PanResponder handles complex touch gestures like drag, swipe, pinch. Use for draggable components, swipeable cards, custom controls. For advanced gestures, use react-native-gesture-handler.',
      syntax: 'PanResponder.create({ onStartShouldSetPanResponder, onPanResponderMove })',
      usage: 'Handle touch gestures and dragging',
      code: 'import React, { useRef } from "react";\nimport { View, PanResponder, Animated, StyleSheet } from "react-native";\n\nfunction DraggableBox() {\n  const pan = useRef(new Animated.ValueXY()).current;\n\n  const panResponder = useRef(\n    PanResponder.create({\n      // Ask to be the responder\n      onStartShouldSetPanResponder: () => true,\n      onMoveShouldSetPanResponder: () => true,\n\n      onPanResponderGrant: () => {\n        // Set offset to current value\n        pan.setOffset({\n          x: pan.x._value,\n          y: pan.y._value\n        });\n        pan.setValue({ x: 0, y: 0 });\n      },\n\n      onPanResponderMove: Animated.event(\n        [\n          null,\n          { dx: pan.x, dy: pan.y }\n        ],\n        { useNativeDriver: false }\n      ),\n\n      onPanResponderRelease: (e, gestureState) => {\n        pan.flattenOffset();\n        \n        // Snap back if dragged too far\n        if (Math.abs(gestureState.dx) > 200) {\n          Animated.spring(pan, {\n            toValue: { x: 0, y: 0 },\n            useNativeDriver: false\n          }).start();\n        }\n      }\n    })\n  ).current;\n\n  return (\n    <View style={styles.container}>\n      <Animated.View\n        style={[\n          styles.box,\n          {\n            transform: [\n              { translateX: pan.x },\n              { translateY: pan.y }\n            ]\n          }\n        ]}\n        {...panResponder.panHandlers}\n      />\n    </View>\n  );\n}\n\n// Swipeable Card Example\nfunction SwipeableCard() {\n  const position = useRef(new Animated.ValueXY()).current;\n\n  const panResponder = PanResponder.create({\n    onStartShouldSetPanResponder: () => true,\n    onPanResponderMove: (e, gesture) => {\n      position.setValue({ x: gesture.dx, y: gesture.dy });\n    },\n    onPanResponderRelease: (e, gesture) => {\n      if (gesture.dx > 120) {\n        // Swipe right - like\n        Animated.spring(position, {\n          toValue: { x: 500, y: gesture.dy },\n          useNativeDriver: false\n        }).start(() => console.log("Liked!"));\n      } else if (gesture.dx < -120) {\n        // Swipe left - dislike\n        Animated.spring(position, {\n          toValue: { x: -500, y: gesture.dy },\n          useNativeDriver: false\n        }).start(() => console.log("Nope!"));\n      } else {\n        // Return to center\n        Animated.spring(position, {\n          toValue: { x: 0, y: 0 },\n          friction: 4,\n          useNativeDriver: false\n        }).start();\n      }\n    }\n  });\n\n  const rotate = position.x.interpolate({\n    inputRange: [-200, 0, 200],\n    outputRange: ["-30deg", "0deg", "30deg"]\n  });\n\n  return (\n    <Animated.View\n      style={[\n        styles.card,\n        {\n          transform: [\n            { translateX: position.x },\n            { translateY: position.y },\n            { rotate }\n          ]\n        }\n      ]}\n      {...panResponder.panHandlers}\n    />\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: "center", alignItems: "center" },\n  box: { width: 100, height: 100, backgroundColor: "#3b82f6", borderRadius: 12 },\n  card: { width: 300, height: 400, backgroundColor: "white", borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }\n});'
    },
    {
      title: 'Modal & Alerts',
      description: 'Modal displays content over the current screen. Alert shows native alert dialogs. Use for confirmations, forms, and important messages. Third-party libraries offer more customization.',
      syntax: '<Modal visible={bool}>, Alert.alert()',
      usage: 'Display overlays and alerts',
      code: 'import React, { useState } from "react";\nimport { View, Text, Modal, Button, Alert, StyleSheet, Pressable } from "react-native";\n\nfunction ModalExample() {\n  const [modalVisible, setModalVisible] = useState(false);\n\n  // Simple alert\n  const showSimpleAlert = () => {\n    Alert.alert("Alert Title", "Alert message");\n  };\n\n  // Alert with buttons\n  const showConfirmAlert = () => {\n    Alert.alert(\n      "Delete Item",\n      "Are you sure you want to delete this item?",\n      [\n        { text: "Cancel", style: "cancel" },\n        { text: "Delete", onPress: () => console.log("Deleted"), style: "destructive" }\n      ],\n      { cancelable: true }\n    );\n  };\n\n  // Alert with input (iOS only)\n  const showPromptAlert = () => {\n    Alert.prompt(\n      "Enter Name",\n      "What is your name?",\n      (text) => console.log("Name:", text),\n      "plain-text",\n      "Default value"\n    );\n  };\n\n  return (\n    <View style={styles.container}>\n      <Button title="Show Simple Alert" onPress={showSimpleAlert} />\n      <Button title="Show Confirm" onPress={showConfirmAlert} />\n      <Button title="Show Modal" onPress={() => setModalVisible(true)} />\n\n      {/* Custom Modal */}\n      <Modal\n        animationType="slide" // "none" | "slide" | "fade"\n        transparent={true}\n        visible={modalVisible}\n        onRequestClose={() => setModalVisible(false)}\n      >\n        <View style={styles.modalOverlay}>\n          <View style={styles.modalContent}>\n            <Text style={styles.modalTitle}>Modal Title</Text>\n            <Text style={styles.modalText}>This is a custom modal!</Text>\n            \n            <Pressable\n              style={styles.closeButton}\n              onPress={() => setModalVisible(false)}\n            >\n              <Text style={styles.closeText}>Close</Text>\n            </Pressable>\n          </View>\n        </View>\n      </Modal>\n\n      {/* Full Screen Modal */}\n      <Modal\n        visible={modalVisible}\n        animationType="slide"\n        presentationStyle="fullScreen" // or "pageSheet", "formSheet", "overFullScreen"\n      >\n        <View style={styles.fullModal}>\n          <Text style={styles.title}>Full Screen Modal</Text>\n          <Button title="Close" onPress={() => setModalVisible(false)} />\n        </View>\n      </Modal>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: "center", padding: 20, gap: 10 },\n  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" },\n  modalContent: { backgroundColor: "white", borderRadius: 12, padding: 24, width: "80%", maxWidth: 400, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },\n  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },\n  modalText: { fontSize: 16, marginBottom: 20, color: "#666" },\n  closeButton: { backgroundColor: "#3b82f6", padding: 12, borderRadius: 8, alignItems: "center" },\n  closeText: { color: "white", fontSize: 16, fontWeight: "600" },\n  fullModal: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: 20 },\n  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 }\n});'
    },
    {
      title: 'Camera & Image Picker',
      description: 'Access device camera and photo library using expo-image-picker or react-native-image-picker. Handle permissions, crop images, and upload photos.',
      syntax: 'ImagePicker.launchCameraAsync(), launchImageLibraryAsync()',
      usage: 'Take photos and select images',
      code: '// Expo: expo install expo-image-picker\n// CLI: npm install react-native-image-picker\nimport * as ImagePicker from "expo-image-picker";\nimport React, { useState } from "react";\nimport { View, Image, Button, StyleSheet, Alert } from "react-native";\n\nfunction CameraExample() {\n  const [image, setImage] = useState(null);\n\n  // Request permissions\n  const requestPermissions = async () => {\n    const { status } = await ImagePicker.requestCameraPermissionsAsync();\n    if (status !== "granted") {\n      Alert.alert("Permission needed", "Camera permission is required");\n      return false;\n    }\n    return true;\n  };\n\n  // Take photo\n  const takePhoto = async () => {\n    const hasPermission = await requestPermissions();\n    if (!hasPermission) return;\n\n    const result = await ImagePicker.launchCameraAsync({\n      mediaTypes: ImagePicker.MediaTypeOptions.Images,\n      allowsEditing: true,\n      aspect: [4, 3],\n      quality: 1\n    });\n\n    if (!result.canceled) {\n      setImage(result.assets[0].uri);\n    }\n  };\n\n  // Pick from gallery\n  const pickImage = async () => {\n    const result = await ImagePicker.launchImageLibraryAsync({\n      mediaTypes: ImagePicker.MediaTypeOptions.Images,\n      allowsEditing: true,\n      aspect: [1, 1],\n      quality: 0.8\n    });\n\n    if (!result.canceled) {\n      setImage(result.assets[0].uri);\n    }\n  };\n\n  // Pick video\n  const pickVideo = async () => {\n    const result = await ImagePicker.launchImageLibraryAsync({\n      mediaTypes: ImagePicker.MediaTypeOptions.Videos,\n      allowsEditing: true,\n      quality: 1\n    });\n\n    if (!result.canceled) {\n      console.log("Video:", result.assets[0]);\n    }\n  };\n\n  // Upload image to server\n  const uploadImage = async (uri) => {\n    const formData = new FormData();\n    formData.append("photo", {\n      uri,\n      type: "image/jpeg",\n      name: "photo.jpg"\n    });\n\n    try {\n      const response = await fetch("https://api.example.com/upload", {\n        method: "POST",\n        body: formData,\n        headers: {\n          "Content-Type": "multipart/form-data"\n        }\n      });\n      const data = await response.json();\n      console.log("Uploaded:", data);\n    } catch (error) {\n      console.error("Upload failed:", error);\n    }\n  };\n\n  return (\n    <View style={styles.container}>\n      {image && (\n        <Image source={{ uri: image }} style={styles.image} />\n      )}\n\n      <View style={styles.buttons}>\n        <Button title="Take Photo" onPress={takePhoto} />\n        <Button title="Pick Image" onPress={pickImage} />\n        <Button title="Pick Video" onPress={pickVideo} />\n        {image && (\n          <Button title="Upload" onPress={() => uploadImage(image)} />\n        )}\n      </View>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },\n  image: { width: 300, height: 300, marginBottom: 20, borderRadius: 12 },\n  buttons: { gap: 10, width: "100%" }\n});'
    },
    {
      title: 'Location Services',
      description: 'Access device location using expo-location or react-native-geolocation. Get current position, watch position changes, and handle permissions.',
      syntax: 'Location.getCurrentPositionAsync(), watchPositionAsync()',
      usage: 'Get device location coordinates',
      code: '// Expo: expo install expo-location\nimport * as Location from "expo-location";\nimport React, { useState, useEffect } from "react";\nimport { View, Text, Button, StyleSheet } from "react-native";\n\nfunction LocationExample() {\n  const [location, setLocation] = useState(null);\n  const [address, setAddress] = useState(null);\n  const [errorMsg, setErrorMsg] = useState(null);\n\n  useEffect(() => {\n    requestLocation();\n  }, []);\n\n  const requestLocation = async () => {\n    try {\n      // Request permission\n      const { status } = await Location.requestForegroundPermissionsAsync();\n      if (status !== "granted") {\n        setErrorMsg("Permission to access location was denied");\n        return;\n      }\n\n      // Get current location\n      const location = await Location.getCurrentPositionAsync({\n        accuracy: Location.Accuracy.High\n      });\n      setLocation(location);\n\n      // Reverse geocoding (coordinates to address)\n      const addresses = await Location.reverseGeocodeAsync({\n        latitude: location.coords.latitude,\n        longitude: location.coords.longitude\n      });\n      if (addresses.length > 0) {\n        setAddress(addresses[0]);\n      }\n    } catch (error) {\n      setErrorMsg(error.message);\n    }\n  };\n\n  // Watch location updates\n  const watchLocation = async () => {\n    const subscription = await Location.watchPositionAsync(\n      {\n        accuracy: Location.Accuracy.High,\n        timeInterval: 5000, // Update every 5 seconds\n        distanceInterval: 10 // Update every 10 meters\n      },\n      (newLocation) => {\n        console.log("Location updated:", newLocation);\n        setLocation(newLocation);\n      }\n    );\n\n    // Stop watching later\n    // subscription.remove();\n  };\n\n  // Forward geocoding (address to coordinates)\n  const geocodeAddress = async () => {\n    const result = await Location.geocodeAsync("1600 Amphitheatre Parkway, Mountain View, CA");\n    console.log("Coordinates:", result);\n  };\n\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>Location Demo</Text>\n\n      {errorMsg ? (\n        <Text style={styles.error}>{errorMsg}</Text>\n      ) : location ? (\n        <View style={styles.info}>\n          <Text style={styles.label}>Latitude:</Text>\n          <Text style={styles.value}>{location.coords.latitude}</Text>\n          \n          <Text style={styles.label}>Longitude:</Text>\n          <Text style={styles.value}>{location.coords.longitude}</Text>\n          \n          <Text style={styles.label}>Accuracy:</Text>\n          <Text style={styles.value}>{location.coords.accuracy}m</Text>\n          \n          {address && (\n            <View style={styles.addressBox}>\n              <Text style={styles.label}>Address:</Text>\n              <Text style={styles.value}>\n                {address.street}, {address.city}, {address.region} {address.postalCode}\n              </Text>\n              <Text style={styles.value}>{address.country}</Text>\n            </View>\n          )}\n        </View>\n      ) : (\n        <Text>Getting location...</Text>\n      )}\n\n      <View style={styles.buttons}>\n        <Button title="Refresh Location" onPress={requestLocation} />\n        <Button title="Watch Location" onPress={watchLocation} />\n      </View>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, padding: 20, justifyContent: "center" },\n  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },\n  info: { backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8, marginBottom: 20 },\n  label: { fontSize: 14, fontWeight: "600", color: "#666", marginTop: 8 },\n  value: { fontSize: 16, color: "#333", marginBottom: 4 },\n  addressBox: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#ddd" },\n  error: { color: "red", textAlign: "center", marginBottom: 20 },\n  buttons: { gap: 10 }\n});'
    },
    {
      title: 'Push Notifications',
      description: 'Send and receive push notifications using expo-notifications or Firebase Cloud Messaging. Handle local notifications, remote notifications, and notification permissions.',
      syntax: 'Notifications.scheduleNotificationAsync(), getExpoPushTokenAsync()',
      usage: 'Send and receive push notifications',
      code: '// Expo: expo install expo-notifications expo-device expo-constants\nimport * as Notifications from "expo-notifications";\nimport * as Device from "expo-device";\nimport { Platform } from "react-native";\nimport React, { useState, useEffect, useRef } from "react";\nimport { View, Text, Button, StyleSheet } from "react-native";\n\n// Configure notification behavior\nNotifications.setNotificationHandler({\n  handleNotification: async () => ({\n    shouldShowAlert: true,\n    shouldPlaySound: true,\n    shouldSetBadge: true\n  })\n});\n\nfunction PushNotificationExample() {\n  const [expoPushToken, setExpoPushToken] = useState("");\n  const [notification, setNotification] = useState(false);\n  const notificationListener = useRef();\n  const responseListener = useRef();\n\n  useEffect(() => {\n    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));\n\n    // Listen for notifications\n    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {\n      setNotification(notification);\n    });\n\n    // Listen for notification taps\n    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {\n      console.log("Notification tapped:", response);\n    });\n\n    return () => {\n      Notifications.removeNotificationSubscription(notificationListener.current);\n      Notifications.removeNotificationSubscription(responseListener.current);\n    };\n  }, []);\n\n  // Schedule local notification\n  const scheduleNotification = async () => {\n    await Notifications.scheduleNotificationAsync({\n      content: {\n        title: "Hello!",\n        body: "This is a local notification",\n        data: { customData: "goes here" },\n        sound: true,\n        badge: 1\n      },\n      trigger: { seconds: 5 } // or null for immediate\n    });\n  };\n\n  // Cancel all notifications\n  const cancelAll = async () => {\n    await Notifications.cancelAllScheduledNotificationsAsync();\n  };\n\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>Push Notifications</Text>\n      <Text>Token: {expoPushToken}</Text>\n      \n      {notification && (\n        <View style={styles.notification}>\n          <Text style={styles.notifTitle}>{notification.request.content.title}</Text>\n          <Text>{notification.request.content.body}</Text>\n        </View>\n      )}\n\n      <Button title="Schedule Notification" onPress={scheduleNotification} />\n      <Button title="Cancel All" onPress={cancelAll} />\n    </View>\n  );\n}\n\n// Register for push notifications\nasync function registerForPushNotificationsAsync() {\n  let token;\n\n  if (Platform.OS === "android") {\n    await Notifications.setNotificationChannelAsync("default", {\n      name: "default",\n      importance: Notifications.AndroidImportance.MAX,\n      vibrationPattern: [0, 250, 250, 250],\n      lightColor: "#FF231F7C"\n    });\n  }\n\n  if (Device.isDevice) {\n    const { status: existingStatus } = await Notifications.getPermissionsAsync();\n    let finalStatus = existingStatus;\n    \n    if (existingStatus !== "granted") {\n      const { status } = await Notifications.requestPermissionsAsync();\n      finalStatus = status;\n    }\n    \n    if (finalStatus !== "granted") {\n      alert("Failed to get push token for push notification!");\n      return;\n    }\n    \n    token = (await Notifications.getExpoPushTokenAsync()).data;\n  } else {\n    alert("Must use physical device for Push Notifications");\n  }\n\n  return token;\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, padding: 20, justifyContent: "center", gap: 10 },\n  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },\n  notification: { backgroundColor: "#f0f0f0", padding: 16, borderRadius: 8, marginVertical: 10 },\n  notifTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 }\n});'
    },
    {
      title: 'Performance Optimization',
      description: 'Optimize React Native apps for better performance: use PureComponent, React.memo, useMemo, useCallback, FlatList optimization, image optimization, and native driver for animations.',
      syntax: 'React.memo, useMemo, useCallback, getItemLayout',
      usage: 'Improve app performance',
      code: 'import React, { useState, useMemo, useCallback, memo } from "react";\nimport { View, Text, FlatList, Image, StyleSheet } from "react-native";\n\n// 1. Memoize components to prevent re-renders\nconst ExpensiveComponent = memo(({ data }) => {\n  console.log("ExpensiveComponent rendered");\n  return <Text>{data}</Text>;\n});\n\n// 2. Use useMemo for expensive calculations\nfunction OptimizedList({ items }) {\n  const sortedItems = useMemo(() => {\n    console.log("Sorting...");\n    return items.sort((a, b) => a.value - b.value);\n  }, [items]); // Only re-sort when items change\n\n  return <FlatList data={sortedItems} renderItem={renderItem} />;\n}\n\n// 3. Use useCallback for event handlers\nfunction ParentComponent() {\n  const [count, setCount] = useState(0);\n  \n  // Without useCallback, new function created on every render\n  const handlePress = useCallback(() => {\n    console.log("Pressed");\n  }, []); // Empty deps = function never changes\n\n  return <ChildComponent onPress={handlePress} />;\n}\n\n// 4. FlatList optimizations\nconst OptimizedFlatList = ({ data }) => {\n  const renderItem = useCallback(({ item }) => (\n    <View style={styles.item}>\n      <Text>{item.title}</Text>\n    </View>\n  ), []);\n\n  // Provide item layout for better performance\n  const getItemLayout = useCallback(\n    (data, index) => ({\n      length: 80,\n      offset: 80 * index,\n      index\n    }),\n    []\n  );\n\n  return (\n    <FlatList\n      data={data}\n      renderItem={renderItem}\n      keyExtractor={item => item.id}\n      getItemLayout={getItemLayout} // Skip measurement\n      removeClippedSubviews={true} // Unmount offscreen views\n      maxToRenderPerBatch={10}\n      updateCellsBatchingPeriod={50}\n      initialNumToRender={10}\n      windowSize={5}\n    />\n  );\n};\n\n// 5. Image optimization\nfunction ImageOptimization() {\n  return (\n    <Image\n      source={{ uri: "https://example.com/large-image.jpg" }}\n      style={{ width: 100, height: 100 }}\n      resizeMode="cover"\n      // Use FastImage for better performance:\n      // npm install react-native-fast-image\n    />\n  );\n}\n\n// 6. Avoid inline functions and styles\n// BAD:\nfunction Bad() {\n  return (\n    <View style={{ flex: 1 }}> {/* New object every render */}\n      <Button onPress={() => console.log("hi")} /> {/* New function every render */}\n    </View>\n  );\n}\n\n// GOOD:\nconst styles = StyleSheet.create({ container: { flex: 1 } });\nfunction Good() {\n  const handlePress = useCallback(() => console.log("hi"), []);\n  return (\n    <View style={styles.container}>\n      <Button onPress={handlePress} />\n    </View>\n  );\n}\n\n// 7. Use native driver for animations\nimport { Animated } from "react-native";\nAnimated.timing(value, {\n  toValue: 1,\n  duration: 500,\n  useNativeDriver: true // Run on native thread\n}).start();\n\n// 8. Profile with Flipper\n// - Install Flipper\n// - Enable Hermes engine\n// - Use Flipper\'s React DevTools and Performance monitor\n\n// 9. Enable Hermes (improves startup time)\n// android/app/build.gradle:\n// project.ext.react = [\n//   enableHermes: true\n// ]'
    },
    {
      title: 'Testing with Jest & React Native Testing Library',
      description: 'Test React Native components with Jest and @testing-library/react-native. Write unit tests, integration tests, and test user interactions.',
      syntax: 'render(), fireEvent, waitFor()',
      usage: 'Test React Native components',
      code: '// Install: npm install --save-dev @testing-library/react-native @testing-library/jest-native\n// package.json:\n// "jest": {\n//   "preset": "react-native",\n//   "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]\n// }\n\nimport React from "react";\nimport { render, fireEvent, waitFor } from "@testing-library/react-native";\nimport { Text, Button, View } from "react-native";\n\n// Component to test\nfunction Counter() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <View>\n      <Text testID="count">Count: {count}</Text>\n      <Button testID="increment" title="Increment" onPress={() => setCount(count + 1)} />\n      <Button testID="decrement" title="Decrement" onPress={() => setCount(count - 1)} />\n    </View>\n  );\n}\n\n// Tests\ndescribe("Counter", () => {\n  it("renders initial count", () => {\n    const { getByTestId } = render(<Counter />);\n    expect(getByTestId("count")).toHaveTextContent("Count: 0");\n  });\n\n  it("increments count when button pressed", () => {\n    const { getByTestId } = render(<Counter />);\n    const incrementButton = getByTestId("increment");\n    \n    fireEvent.press(incrementButton);\n    expect(getByTestId("count")).toHaveTextContent("Count: 1");\n    \n    fireEvent.press(incrementButton);\n    expect(getByTestId("count")).toHaveTextContent("Count: 2");\n  });\n\n  it("decrements count", () => {\n    const { getByTestId } = render(<Counter />);\n    fireEvent.press(getByTestId("decrement"));\n    expect(getByTestId("count")).toHaveTextContent("Count: -1");\n  });\n});\n\n// Async test example\nfunction UserProfile({ userId }) {\n  const [user, setUser] = React.useState(null);\n  const [loading, setLoading] = React.useState(true);\n\n  React.useEffect(() => {\n    fetch(`https://api.example.com/users/${userId}`)\n      .then(res => res.json())\n      .then(data => {\n        setUser(data);\n        setLoading(false);\n      });\n  }, [userId]);\n\n  if (loading) return <Text testID="loading">Loading...</Text>;\n  return <Text testID="user-name">{user.name}</Text>;\n}\n\ndescribe("UserProfile", () => {\n  it("loads and displays user", async () => {\n    // Mock fetch\n    global.fetch = jest.fn(() =>\n      Promise.resolve({\n        json: () => Promise.resolve({ id: 1, name: "John Doe" })\n      })\n    );\n\n    const { getByTestId } = render(<UserProfile userId={1} />);\n    \n    // Initially loading\n    expect(getByTestId("loading")).toBeTruthy();\n    \n    // Wait for user to load\n    await waitFor(() => {\n      expect(getByTestId("user-name")).toHaveTextContent("John Doe");\n    });\n  });\n});\n\n// Test navigation\nimport { NavigationContainer } from "@react-navigation/native";\nimport { createNativeStackNavigator } from "@react-navigation/native-stack";\n\nconst Stack = createNativeStackNavigator();\n\nfunction TestNavigationWrapper({ children }) {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator>{children}</Stack.Navigator>\n    </NavigationContainer>\n  );\n}\n\nit("navigates to details screen", () => {\n  const { getByText } = render(\n    <TestNavigationWrapper>\n      <Stack.Screen name="Home" component={HomeScreen} />\n      <Stack.Screen name="Details" component={DetailsScreen} />\n    </TestNavigationWrapper>\n  );\n\n  fireEvent.press(getByText("Go to Details"));\n  expect(getByText("Details Screen")).toBeTruthy();\n});\n\n// Run tests: npm test'
    },
    {
      title: 'Building for iOS',
      description: 'Build and deploy React Native apps to iOS. Configure app icons, splash screens, signing, and submit to App Store. Use Xcode, TestFlight, and EAS Build.',
      syntax: 'npx react-native run-ios, eas build --platform ios',
      usage: 'Build iOS apps',
      code: '// DEVELOPMENT BUILD\n\n// 1. Run on simulator (Mac only)\nnpx react-native run-ios\n// Or specific simulator\nnpx react-native run-ios --simulator="iPhone 14 Pro"\n\n// 2. Run on physical device\n// - Open ios/YourApp.xcworkspace in Xcode\n// - Select your device\n// - Click Run (⌘R)\n\n// PRODUCTION BUILD - React Native CLI\n\n// 1. Configure app.json\n{\n  "name": "MyApp",\n  "displayName": "My App",\n  "ios": {\n    "bundleIdentifier": "com.yourcompany.myapp",\n    "buildNumber": "1",\n    "supportsTablet": true\n  }\n}\n\n// 2. Set up signing in Xcode\n// - Open Xcode workspace\n// - Select project → Signing & Capabilities\n// - Select team\n// - Configure bundle identifier\n\n// 3. Create archive\n// - Product → Archive in Xcode\n// - OR use command line:\nxcodebuild -workspace ios/MyApp.xcworkspace \\\n  -scheme MyApp \\\n  -configuration Release \\\n  -archivePath build/MyApp.xcarchive \\\n  archive\n\n// PRODUCTION BUILD - Expo (EAS Build)\n\n// 1. Install EAS CLI\nnpm install -g eas-cli\neas login\n\n// 2. Configure EAS\neas build:configure\n\n// 3. Build for iOS\neas build --platform ios --profile production\n\n// 4. Submit to App Store\neas submit --platform ios\n\n// APP ICONS & SPLASH SCREEN\n\n// Expo: Use app.json\n{\n  "expo": {\n    "icon": "./assets/icon.png", // 1024x1024\n    "splash": {\n      "image": "./assets/splash.png",\n      "backgroundColor": "#ffffff"\n    },\n    "ios": {\n      "icon": "./assets/ios-icon.png"\n    }\n  }\n}\n\n// CLI: Use app icon generator or manual:\n// - Create AppIcon.appiconset in Xcode\n// - Add all required sizes (20x20 to 1024x1024)\n\n// TESTFLIGHT\n\n// 1. Upload build via Xcode or EAS\n// 2. Go to App Store Connect\n// 3. Add internal/external testers\n// 4. Distribute build\n\n// APP STORE SUBMISSION\n\n// 1. Create app in App Store Connect\n// 2. Fill app information:\n//    - Name, subtitle, description\n//    - Screenshots (required sizes)\n//    - Privacy policy URL\n//    - Category\n// 3. Upload build via Xcode/EAS\n// 4. Submit for review\n\n// COMMON ISSUES\n\n// Code signing error:\n// - Check team and bundle ID\n// - Ensure provisioning profile is valid\n\n// Build fails:\n// - Clean build folder: Product → Clean Build Folder\n// - Delete Pods and reinstall: cd ios && pod install\n\n// Missing permissions:\n// - Add to Info.plist:\n<key>NSCameraUsageDescription</key>\n<string>We need camera access to take photos</string>'
    },
    {
      title: 'Building for Android',
      description: 'Build and deploy React Native apps to Android. Configure signing, generate APK/AAB, and publish to Google Play Store.',
      syntax: 'npx react-native run-android, ./gradlew assembleRelease',
      usage: 'Build Android apps',
      code: '// DEVELOPMENT BUILD\n\n// 1. Run on emulator/device\nnpx react-native run-android\n\n// 2. Run on specific device\nadb devices // List devices\nnpx react-native run-android --deviceId=DEVICE_ID\n\n// PRODUCTION BUILD - React Native CLI\n\n// 1. Generate signing key\ncd android/app\nkeytool -genkeypair -v -storetype PKCS12 \\\n  -keystore my-release-key.keystore \\\n  -alias my-key-alias \\\n  -keyalg RSA -keysize 2048 \\\n  -validity 10000\n\n// 2. Configure gradle (android/gradle.properties)\nMYAPP_RELEASE_STORE_FILE=my-release-key.keystore\nMYAPP_RELEASE_KEY_ALIAS=my-key-alias\nMYAPP_RELEASE_STORE_PASSWORD=*****\nMYAPP_RELEASE_KEY_PASSWORD=*****\n\n// 3. Configure signing (android/app/build.gradle)\nandroid {\n  ...\n  signingConfigs {\n    release {\n      if (project.hasProperty("MYAPP_RELEASE_STORE_FILE")) {\n        storeFile file(MYAPP_RELEASE_STORE_FILE)\n        storePassword MYAPP_RELEASE_STORE_PASSWORD\n        keyAlias MYAPP_RELEASE_KEY_ALIAS\n        keyPassword MYAPP_RELEASE_KEY_PASSWORD\n      }\n    }\n  }\n  buildTypes {\n    release {\n      signingConfig signingConfigs.release\n      minifyEnabled true\n      proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"\n    }\n  }\n}\n\n// 4. Build APK\ncd android\n./gradlew assembleRelease\n// APK: android/app/build/outputs/apk/release/app-release.apk\n\n// 5. Build AAB (for Play Store)\n./gradlew bundleRelease\n// AAB: android/app/build/outputs/bundle/release/app-release.aab\n\n// PRODUCTION BUILD - Expo (EAS Build)\n\n// 1. Configure EAS\neas build:configure\n\n// 2. Build APK/AAB\neas build --platform android --profile production\n\n// 3. Submit to Play Store\neas submit --platform android\n\n// APP ICON & SPLASH SCREEN\n\n// Expo: Configure in app.json\n{\n  "expo": {\n    "android": {\n      "icon": "./assets/android-icon.png",\n      "adaptiveIcon": {\n        "foregroundImage": "./assets/adaptive-icon.png",\n        "backgroundColor": "#FFFFFF"\n      },\n      "splash": {\n        "image": "./assets/splash.png"\n      },\n      "package": "com.yourcompany.myapp",\n      "versionCode": 1\n    }\n  }\n}\n\n// CLI: Place icons in:\n// android/app/src/main/res/mipmap-*/ic_launcher.png\n// Use Android Studio → Image Asset Studio\n\n// GOOGLE PLAY STORE SUBMISSION\n\n// 1. Create app in Play Console\n// 2. Fill app information:\n//    - App name, description\n//    - Screenshots (phone, tablet, 7-inch tablet)\n//    - Feature graphic (1024x500)\n//    - Privacy policy\n// 3. Upload AAB file\n// 4. Create release:\n//    - Internal testing\n//    - Closed testing\n//    - Open testing\n//    - Production\n// 5. Submit for review\n\n// COMMON ISSUES\n\n// Build fails:\n// - Clean: cd android && ./gradlew clean\n// - Delete: rm -rf node_modules && npm install\n\n// Signing error:\n// - Check keystore path and passwords\n// - Ensure keystore file is in android/app/\n\n// App crashes on release:\n// - Check ProGuard rules\n// - Enable Hermes: android/app/build.gradle\n//   project.ext.react = [ enableHermes: true ]'
    },
    {
      title: 'Debugging Tools',
      description: 'Debug React Native apps with Chrome DevTools, React DevTools, Flipper, and logging. Handle errors, inspect network requests, and profile performance.',
      syntax: '__DEV__, console.log, Flipper',
      usage: 'Debug and troubleshoot apps',
      code: '// DEVELOPMENT MENU\n// - iOS Simulator: ⌘D\n// - Android Emulator: ⌘M (Mac) or Ctrl+M (Windows)\n// - Physical device: Shake\n\n// REMOTE JS DEBUGGING (Old method, deprecated)\n// Open Dev Menu → Debug → Chrome DevTools opens\n// NOTE: Use Flipper instead for better experience\n\n// FLIPPER (Recommended)\n// - Download Flipper Desktop\n// - Run app in dev mode\n// - Flipper auto-connects\n// Features:\n// - React DevTools\n// - Network inspector\n// - Logs\n// - Crash reporter\n// - Layout inspector\n// - Database viewer\n\n// REACT DEVTOOLS\nimport { Platform } from "react-native";\n\nif (__DEV__) {\n  // Only in development\n  import("react-devtools").then(() => {\n    console.log("React DevTools connected");\n  });\n}\n\n// LOGGING\n\n// Basic logging\nconsole.log("Message");\nconsole.warn("Warning"); // Shows yellow box\nconsole.error("Error"); // Shows red box\n\n// Structured logging\nconsole.log("User data:", {\n  id: 1,\n  name: "John",\n  email: "john@example.com"\n});\n\n// Performance timing\nconsole.time("fetchData");\nawait fetchData();\nconsole.timeEnd("fetchData"); // Prints: fetchData: 234ms\n\n// Conditional logging\nif (__DEV__) {\n  console.log("Development only log");\n}\n\n// Custom logger\nclass Logger {\n  static log(message, data) {\n    if (__DEV__) {\n      console.log(`[${new Date().toISOString()}] ${message}`, data);\n    }\n  }\n  \n  static error(message, error) {\n    console.error(`[ERROR] ${message}`, error);\n    // Send to error tracking service\n    // Sentry.captureException(error);\n  }\n}\n\nLogger.log("User logged in", { userId: 123 });\n\n// NETWORK DEBUGGING\n\n// Monitor all fetch requests\nconst originalFetch = global.fetch;\nglobal.fetch = async (...args) => {\n  console.log("Fetch:", args[0]);\n  const response = await originalFetch(...args);\n  console.log("Response:", response.status);\n  return response;\n};\n\n// Or use Flipper Network plugin\n\n// ERROR BOUNDARY\nimport React from "react";\nimport { View, Text } from "react-native";\n\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false, error: null };\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true, error };\n  }\n\n  componentDidCatch(error, errorInfo) {\n    console.error("Error caught:", error, errorInfo);\n    // Log to error tracking\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return (\n        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>\n          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Something went wrong</Text>\n          <Text>{this.state.error?.toString()}</Text>\n        </View>\n      );\n    }\n    return this.props.children;\n  }\n}\n\n// Usage:\n<ErrorBoundary>\n  <App />\n</ErrorBoundary>\n\n// DEBUGGING NAVIGATION\nimport { NavigationContainer } from "@react-navigation/native";\n\nfunction App() {\n  return (\n    <NavigationContainer\n      onStateChange={state => console.log("Navigation state:", state)}\n    >\n      {/* Your screens */}\n    </NavigationContainer>\n  );\n}\n\n// REACTOTRON (Alternative debugging tool)\n// npm install --save-dev reactotron-react-native\nimport Reactotron from "reactotron-react-native";\n\nif (__DEV__) {\n  Reactotron.configure()\n    .useReactNative()\n    .connect();\n}\n\n// Then use:\nReactotron.log("Hello!");\nReactotron.display({\n  name: "User Data",\n  value: { id: 1, name: "John" }\n});'
    },
    {
      title: 'Environment Variables & Config',
      description: 'Manage environment variables, API keys, and configuration for different environments (dev, staging, production) using react-native-config or Expo Constants.',
      syntax: 'Config.API_URL, Constants.expoConfig',
      usage: 'Manage app configuration',
      code: '// EXPO - Using app.json and Constants\n\n// 1. app.json\n{\n  "expo": {\n    "name": "MyApp",\n    "extra": {\n      "apiUrl": "https://api.example.com",\n      "apiKey": "your-api-key"\n    }\n  }\n}\n\n// 2. Access in code\nimport Constants from "expo-constants";\n\nconst API_URL = Constants.expoConfig.extra.apiUrl;\nconst API_KEY = Constants.expoConfig.extra.apiKey;\n\nfetch(`${API_URL}/users`, {\n  headers: { "X-API-Key": API_KEY }\n});\n\n// 3. Different configs per environment\n// app.json (development)\n{\n  "expo": {\n    "extra": {\n      "apiUrl": "http://localhost:3000"\n    }\n  }\n}\n\n// app.production.json\n{\n  "expo": {\n    "extra": {\n      "apiUrl": "https://api.production.com"\n    }\n  }\n}\n\n// REACT NATIVE CLI - Using react-native-config\n\n// 1. Install\nnpm install react-native-config\nnpx pod-install // iOS\n\n// 2. Create .env file\nAPI_URL=https://api.example.com\nAPI_KEY=your-api-key\nENVIRONMENT=development\n\n// 3. Create .env.production\nAPI_URL=https://api.production.com\nAPI_KEY=prod-api-key\nENVIRONMENT=production\n\n// 4. Access in code\nimport Config from "react-native-config";\n\nconsole.log(Config.API_URL);\nconsole.log(Config.API_KEY);\nconsole.log(Config.ENVIRONMENT);\n\nfetch(`${Config.API_URL}/users`, {\n  headers: {\n    "X-API-Key": Config.API_KEY\n  }\n});\n\n// 5. Build with specific environment\n// Android:\nENVFILE=.env.production ./gradlew assembleRelease\n\n// iOS:\nENVFILE=.env.production npx react-native run-ios --configuration Release\n\n// GITIGNORE - IMPORTANT!\n// .gitignore\n.env\n.env.local\n.env.production\n.env.staging\n\n// Create .env.example for team\nAPI_URL=\nAPI_KEY=\nENVIRONMENT=\n\n// TYPED CONFIG (TypeScript)\n// config.ts\nexport const Config = {\n  API_URL: process.env.API_URL || "http://localhost:3000",\n  API_KEY: process.env.API_KEY || "",\n  IS_DEV: __DEV__,\n  VERSION: "1.0.0"\n} as const;\n\n// Usage\nimport { Config } from "./config";\nfetch(Config.API_URL);\n\n// MULTIPLE ENVIRONMENTS\n\n// config/index.ts\nimport devConfig from "./dev";\nimport stagingConfig from "./staging";\nimport prodConfig from "./prod";\n\nconst ENV = process.env.ENVIRONMENT || "development";\n\nconst configs = {\n  development: devConfig,\n  staging: stagingConfig,\n  production: prodConfig\n};\n\nexport default configs[ENV];\n\n// config/dev.ts\nexport default {\n  apiUrl: "http://localhost:3000",\n  debug: true,\n  analytics: false\n};\n\n// config/prod.ts\nexport default {\n  apiUrl: "https://api.production.com",\n  debug: false,\n  analytics: true\n};\n\n// SECURE STORAGE for sensitive data\nimport * as SecureStore from "expo-secure-store";\n\n// Save\nawait SecureStore.setItemAsync("apiKey", "secret-key");\n\n// Retrieve\nconst apiKey = await SecureStore.getItemAsync("apiKey");'
    },
    {
      title: 'Best Practices & Patterns',
      description: 'Follow React Native best practices: project structure, code organization, state management patterns, error handling, accessibility, and performance guidelines.',
      syntax: 'Folder structure, naming conventions, patterns',
      usage: 'Write maintainable React Native code',
      code: '// PROJECT STRUCTURE\n\n/*\nmy-app/\n├── src/\n│   ├── components/          # Reusable components\n│   │   ├── Button/\n│   │   │   ├── Button.tsx\n│   │   │   ├── Button.styles.ts\n│   │   │   └── index.ts\n│   │   └── Card/\n│   ├── screens/             # Screen components\n│   │   ├── HomeScreen/\n│   │   ├── ProfileScreen/\n│   │   └── SettingsScreen/\n│   ├── navigation/          # Navigation config\n│   │   └── RootNavigator.tsx\n│   ├── services/            # API calls, utilities\n│   │   ├── api.ts\n│   │   └── storage.ts\n│   ├── hooks/               # Custom hooks\n│   │   ├── useAuth.ts\n│   │   └── useFetch.ts\n│   ├── context/             # React Context\n│   │   └── AuthContext.tsx\n│   ├── store/               # State management (Redux/Zustand)\n│   │   ├── slices/\n│   │   └── store.ts\n│   ├── types/               # TypeScript types\n│   │   └── index.ts\n│   ├── utils/               # Helper functions\n│   │   └── formatters.ts\n│   ├── constants/           # Constants, config\n│   │   └── theme.ts\n│   └── App.tsx\n├── assets/                  # Images, fonts\n├── __tests__/              # Tests\n└── package.json\n*/\n\n// NAMING CONVENTIONS\n\n// Components: PascalCase\nfunction UserProfile() {}\nfunction NavigationBar() {}\n\n// Files: Match component name\n// UserProfile.tsx, NavigationBar.tsx\n\n// Hooks: camelCase with "use" prefix\nfunction useAuth() {}\nfunction useFetch() {}\n\n// Constants: UPPER_SNAKE_CASE\nconst API_URL = "https://api.example.com";\nconst MAX_RETRIES = 3;\n\n// COMPONENT PATTERNS\n\n// 1. Container/Presenter Pattern\n// Container (logic)\nfunction UserProfileContainer() {\n  const [user, setUser] = useState(null);\n  useEffect(() => { /* fetch user */ }, []);\n  return <UserProfilePresenter user={user} />;\n}\n\n// Presenter (UI only)\nfunction UserProfilePresenter({ user }) {\n  return (\n    <View>\n      <Text>{user?.name}</Text>\n    </View>\n  );\n}\n\n// 2. Custom Hooks Pattern\nfunction useUser(userId) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    fetchUser(userId)\n      .then(setUser)\n      .catch(setError)\n      .finally(() => setLoading(false));\n  }, [userId]);\n\n  return { user, loading, error };\n}\n\n// Usage\nfunction UserScreen({ userId }) {\n  const { user, loading, error } = useUser(userId);\n  if (loading) return <Loader />;\n  if (error) return <Error error={error} />;\n  return <UserProfile user={user} />;\n}\n\n// 3. Composition Pattern\nfunction Card({ children, ...props }) {\n  return <View style={styles.card} {...props}>{children}</View>;\n}\n\nCard.Header = ({ children }) => <View style={styles.header}>{children}</View>;\nCard.Body = ({ children }) => <View style={styles.body}>{children}</View>;\nCard.Footer = ({ children }) => <View style={styles.footer}>{children}</View>;\n\n// Usage\n<Card>\n  <Card.Header><Text>Title</Text></Card.Header>\n  <Card.Body><Text>Content</Text></Card.Body>\n  <Card.Footer><Button title="Action" /></Card.Footer>\n</Card>\n\n// ERROR HANDLING\n\ntry {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data = await response.json();\n  return data;\n} catch (error) {\n  if (error.message === "Network request failed") {\n    // No internet\n    Alert.alert("No Internet", "Please check your connection");\n  } else {\n    // Other errors\n    console.error(error);\n    Alert.alert("Error", "Something went wrong");\n  }\n}\n\n// ACCESSIBILITY\n\nimport { View, Text, TouchableOpacity } from "react-native";\n\n<TouchableOpacity\n  accessible={true}\n  accessibilityLabel="Delete button"\n  accessibilityHint="Deletes the selected item"\n  accessibilityRole="button"\n>\n  <Text>Delete</Text>\n</TouchableOpacity>\n\n// CODE QUALITY\n\n// Use TypeScript\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction UserCard({ user }: { user: User }) {\n  return <Text>{user.name}</Text>;\n}\n\n// Use ESLint & Prettier\n// npm install --save-dev eslint prettier\n\n// Extract constants\nconst COLORS = {\n  primary: "#3b82f6",\n  secondary: "#64748b",\n  error: "#ef4444"\n};\n\nconst SPACING = {\n  xs: 4,\n  sm: 8,\n  md: 16,\n  lg: 24\n};\n\n// Keep components small\n// If > 200 lines, consider splitting'
    },
    {
      title: 'Security Best Practices',
      description: 'Secure your React Native app: protect API keys, validate input, use secure storage, implement SSL pinning, and follow OWASP mobile security guidelines.',
      syntax: 'SecureStore, SSL Pinning, Input validation',
      usage: 'Implement security measures',
      code: '// 1. SECURE STORAGE - Never store sensitive data in AsyncStorage\n\nimport * as SecureStore from "expo-secure-store"; // Expo\n// OR\nimport RNSecureStorage from "react-native-secure-storage"; // CLI\n\n// Store sensitive data\nawait SecureStore.setItemAsync("authToken", token);\nawait SecureStore.setItemAsync("apiKey", apiKey);\n\n// Retrieve\nconst token = await SecureStore.getItemAsync("authToken");\n\n// Delete\nawait SecureStore.deleteItemAsync("authToken");\n\n// 2. PROTECT API KEYS - Never hardcode\n\n// BAD ❌\nconst API_KEY = "sk_live_123456789";\nfetch(`https://api.example.com?key=${API_KEY}`);\n\n// GOOD ✅\nimport Config from "react-native-config";\nconst API_KEY = Config.API_KEY; // From .env file\n\n// Even better: Use backend proxy\n// Client → Your Backend → Third-party API\n// API key stays on server, never exposed\n\n// 3. INPUT VALIDATION\n\nfunction validateEmail(email: string): boolean {\n  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return emailRegex.test(email);\n}\n\nfunction sanitizeInput(input: string): string {\n  // Remove dangerous characters\n  return input.replace(/[<>\"\'&]/g, "");\n}\n\nfunction handleLogin(email: string, password: string) {\n  if (!validateEmail(email)) {\n    Alert.alert("Invalid email");\n    return;\n  }\n  if (password.length < 8) {\n    Alert.alert("Password must be at least 8 characters");\n    return;\n  }\n  // Proceed with login\n}\n\n// 4. HTTPS ONLY\n\nconst API_URL = "https://api.example.com"; // ✅\nconst API_URL = "http://api.example.com";  // ❌ Never use HTTP\n\n// 5. SSL PINNING - Prevent man-in-the-middle attacks\n\n// Expo: Not supported directly, use expo-dev-client with native modules\n// CLI: Use react-native-ssl-pinning\n\nimport { fetch } from "react-native-ssl-pinning";\n\nfetch("https://api.example.com/data", {\n  method: "GET",\n  sslPinning: {\n    certs: ["cert1"] // Certificate in android/app/src/main/assets/cert1.cer\n  }\n});\n\n// 6. AUTHENTICATION BEST PRACTICES\n\n// Use JWT tokens with expiration\ninterface AuthResponse {\n  accessToken: string;\n  refreshToken: string;\n  expiresIn: number;\n}\n\nasync function login(email: string, password: string) {\n  const response = await fetch("https://api.example.com/login", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ email, password })\n  });\n  \n  const data: AuthResponse = await response.json();\n  \n  // Store tokens securely\n  await SecureStore.setItemAsync("accessToken", data.accessToken);\n  await SecureStore.setItemAsync("refreshToken", data.refreshToken);\n  \n  return data;\n}\n\n// Include token in requests\nasync function fetchUserData() {\n  const token = await SecureStore.getItemAsync("accessToken");\n  \n  const response = await fetch("https://api.example.com/user", {\n    headers: {\n      "Authorization": `Bearer ${token}`\n    }\n  });\n  \n  return response.json();\n}\n\n// 7. CODE OBFUSCATION (Release builds)\n\n// android/app/build.gradle\nandroid {\n  buildTypes {\n    release {\n      minifyEnabled true\n      shrinkResources true\n      proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"\n    }\n  }\n}\n\n// 8. PREVENT SCREENSHOTS (Sensitive screens)\n\nimport { Platform } from "react-native";\nimport { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";\n\n// Android: Add to MainActivity.java\n// getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);\n\n// iOS: Limited options, consider blurring on background\n\n// 9. RATE LIMITING\n\nlet requestCount = 0;\nlet lastRequestTime = Date.now();\n\nasync function rateLimitedFetch(url: string) {\n  const now = Date.now();\n  if (now - lastRequestTime < 1000) {\n    requestCount++;\n    if (requestCount > 5) {\n      throw new Error("Too many requests");\n    }\n  } else {\n    requestCount = 0;\n    lastRequestTime = now;\n  }\n  \n  return fetch(url);\n}\n\n// 10. SECURITY CHECKLIST\n\n/*\n✅ Use HTTPS for all network requests\n✅ Store sensitive data in SecureStore\n✅ Never commit .env files with secrets\n✅ Validate and sanitize all user input\n✅ Implement SSL pinning for critical APIs\n✅ Use authentication tokens with expiration\n✅ Enable code obfuscation for release builds\n✅ Keep dependencies updated\n✅ Use TypeScript for type safety\n✅ Implement proper error handling\n✅ Add rate limiting for API calls\n✅ Follow OWASP Mobile Top 10\n*/'
    },
    {
      title: 'Real-World Project - Social Media App',
      description: 'Build a complete social media app with authentication, posts feed, comments, likes, image upload, push notifications, and real-time updates.',
      syntax: 'Full-stack React Native app',
      usage: 'Apply all React Native skills',
      code: '// PROJECT OVERVIEW\n/*\nFeatures:\n- User authentication (email/password)\n- Create posts with images\n- Like and comment on posts\n- User profiles\n- Follow/unfollow users\n- Real-time feed updates\n- Push notifications\n- Image upload to cloud storage\n*/\n\n// PROJECT STRUCTURE\n/*\nsrc/\n├── screens/\n│   ├── AuthScreen.tsx\n│   ├── FeedScreen.tsx\n│   ├── ProfileScreen.tsx\n│   ├── CreatePostScreen.tsx\n│   └── PostDetailScreen.tsx\n├── components/\n│   ├── PostCard.tsx\n│   ├── Comment.tsx\n│   └── UserAvatar.tsx\n├── navigation/\n│   └── AppNavigator.tsx\n├── services/\n│   ├── api.ts\n│   ├── auth.ts\n│   └── storage.ts\n├── hooks/\n│   ├── useAuth.ts\n│   ├── usePosts.ts\n│   └── useComments.ts\n├── context/\n│   └── AuthContext.tsx\n└── types/\n    └── index.ts\n*/\n\n// TYPES (types/index.ts)\nexport interface User {\n  id: string;\n  username: string;\n  email: string;\n  avatar?: string;\n  bio?: string;\n}\n\nexport interface Post {\n  id: string;\n  userId: string;\n  user: User;\n  content: string;\n  imageUrl?: string;\n  likes: number;\n  comments: number;\n  createdAt: string;\n  isLiked: boolean;\n}\n\nexport interface Comment {\n  id: string;\n  postId: string;\n  userId: string;\n  user: User;\n  content: string;\n  createdAt: string;\n}\n\n// AUTH CONTEXT (context/AuthContext.tsx)\nimport React, { createContext, useState, useEffect } from "react";\nimport * as SecureStore from "expo-secure-store";\nimport { User } from "../types";\n\ninterface AuthContextType {\n  user: User | null;\n  login: (email: string, password: string) => Promise<void>;\n  logout: () => Promise<void>;\n  loading: boolean;\n}\n\nexport const AuthContext = createContext<AuthContextType>(null!);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState<User | null>(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    checkAuth();\n  }, []);\n\n  const checkAuth = async () => {\n    const token = await SecureStore.getItemAsync("authToken");\n    if (token) {\n      // Verify token and get user\n      const response = await fetch("https://api.example.com/me", {\n        headers: { Authorization: `Bearer ${token}` }\n      });\n      if (response.ok) {\n        const userData = await response.json();\n        setUser(userData);\n      }\n    }\n    setLoading(false);\n  };\n\n  const login = async (email: string, password: string) => {\n    const response = await fetch("https://api.example.com/login", {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify({ email, password })\n    });\n    const data = await response.json();\n    await SecureStore.setItemAsync("authToken", data.token);\n    setUser(data.user);\n  };\n\n  const logout = async () => {\n    await SecureStore.deleteItemAsync("authToken");\n    setUser(null);\n  };\n\n  return (\n    <AuthContext.Provider value={{ user, login, logout, loading }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\n// FEED SCREEN (screens/FeedScreen.tsx)\nimport React from "react";\nimport { FlatList, StyleSheet, RefreshControl } from "react-native";\nimport { usePosts } from "../hooks/usePosts";\nimport PostCard from "../components/PostCard";\n\nexport default function FeedScreen({ navigation }) {\n  const { posts, loading, refresh, loadMore } = usePosts();\n\n  return (\n    <FlatList\n      data={posts}\n      renderItem={({ item }) => (\n        <PostCard\n          post={item}\n          onPress={() => navigation.navigate("PostDetail", { postId: item.id })}\n        />\n      )}\n      keyExtractor={item => item.id}\n      refreshControl={\n        <RefreshControl refreshing={loading} onRefresh={refresh} />\n      }\n      onEndReached={loadMore}\n      onEndReachedThreshold={0.5}\n    />\n  );\n}\n\n// POST CARD COMPONENT (components/PostCard.tsx)\nimport React, { useState } from "react";\nimport { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";\nimport { Post } from "../types";\nimport { likePost } from "../services/api";\n\ninterface Props {\n  post: Post;\n  onPress: () => void;\n}\n\nexport default function PostCard({ post, onPress }: Props) {\n  const [likes, setLikes] = useState(post.likes);\n  const [isLiked, setIsLiked] = useState(post.isLiked);\n\n  const handleLike = async () => {\n    setIsLiked(!isLiked);\n    setLikes(isLiked ? likes - 1 : likes + 1);\n    await likePost(post.id);\n  };\n\n  return (\n    <TouchableOpacity style={styles.card} onPress={onPress}>\n      <View style={styles.header}>\n        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />\n        <Text style={styles.username}>{post.user.username}</Text>\n      </View>\n      \n      {post.imageUrl && (\n        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />\n      )}\n      \n      <Text style={styles.content}>{post.content}</Text>\n      \n      <View style={styles.actions}>\n        <TouchableOpacity onPress={handleLike}>\n          <Text style={styles.action}>\n            {isLiked ? "❤️" : "🤍"} {likes}\n          </Text>\n        </TouchableOpacity>\n        <Text style={styles.action}>💬 {post.comments}</Text>\n      </View>\n    </TouchableOpacity>\n  );\n}\n\nconst styles = StyleSheet.create({\n  card: { backgroundColor: "white", marginBottom: 8, padding: 16 },\n  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },\n  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },\n  username: { fontSize: 16, fontWeight: "600" },\n  postImage: { width: "100%", height: 300, marginBottom: 12, borderRadius: 8 },\n  content: { fontSize: 16, marginBottom: 12 },\n  actions: { flexDirection: "row", gap: 20 },\n  action: { fontSize: 14, color: "#666" }\n});\n\n// This is a simplified example. Full implementation would include:\n// - Image upload with expo-image-picker\n// - Real-time updates with WebSockets\n// - Infinite scroll pagination\n// - Comment system\n// - User profiles\n// - Follow system\n// - Push notifications\n// - Error handling\n// - Loading states\n// - Offline support'
    },
    {
      title: 'Next Steps & Advanced Topics',
      description: 'Continue your React Native journey: explore advanced patterns, native modules, web compatibility, monorepos, CI/CD, and the latest React Native features.',
      syntax: 'Advanced React Native development',
      usage: 'Level up your skills',
      code: '// ADVANCED TOPICS TO EXPLORE\n\n// 1. NATIVE MODULES\n// Create custom native code (Java/Kotlin for Android, Swift/Objective-C for iOS)\n// - Access platform-specific APIs\n// - Optimize performance-critical code\n// - Integrate third-party native SDKs\n// Tutorial: https://reactnative.dev/docs/native-modules-intro\n\n// 2. TURBO MODULES & FABRIC (New Architecture)\n// - Faster native module initialization\n// - Improved rendering performance\n// - Type safety between JS and native\n// Enable in react-native 0.68+:\n// RN_NEW_ARCH_ENABLED=1 npx react-native run-android\n\n// 3. WEB COMPATIBILITY (React Native Web)\n// Share code between mobile and web\nnpm install react-native-web\n// Use Expo or Next.js for web support\n\n// 4. MONOREPO SETUP\n// Share code between multiple apps\n// Tools: Yarn Workspaces, Nx, Turborepo\n/*\nmy-monorepo/\n├── packages/\n│   ├── mobile/          # React Native app\n│   ├── web/             # Next.js web app\n│   ├── shared/          # Shared components\n│   └── api-client/      # Shared API logic\n└── package.json\n*/\n\n// 5. ANIMATIONS LIBRARIES\nimport Animated from "react-native-reanimated";      // Best performance\nimport { Gesture } from "react-native-gesture-handler"; // Advanced gestures\nimport { MotiView } from "moti";                     // Declarative animations\nimport Lottie from "lottie-react-native";           // JSON animations\n\n// 6. STATE MANAGEMENT AT SCALE\n// Redux Toolkit\nimport { configureStore, createSlice } from "@reduxjs/toolkit";\n\n// Zustand (lighter alternative)\nimport create from "zustand";\n\n// Recoil (atomic state)\nimport { atom, useRecoilState } from "recoil";\n\n// React Query (server state)\nimport { useQuery, useMutation } from "@tanstack/react-query";\n\n// 7. OFFLINE-FIRST APPS\nimport NetInfo from "@react-native-community/netinfo";\nimport { useNetInfo } from "@react-native-community/netinfo";\n// Implement offline queue for API calls\n// Cache data with AsyncStorage or SQLite\n\n// 8. DATABASE (On-Device)\nimport { openDatabase } from "react-native-sqlite-storage";  // SQLite\nimport Realm from "realm";                                    // Realm\nimport { watermelonDB } from "@nozbe/watermelondb";          // WatermelonDB\n\n// 9. ANALYTICS & CRASH REPORTING\nimport analytics from "@react-native-firebase/analytics";\nimport crashlytics from "@react-native-firebase/crashlytics";\nimport * as Sentry from "@sentry/react-native";\n\n// 10. ADVANCED NAVIGATION\n// Deep linking\nconst config = {\n  screens: {\n    Home: "",\n    Profile: "user/:id",\n    Post: "post/:postId"\n  }\n};\n\n// Nested navigators\n<Stack.Navigator>\n  <Stack.Screen name="Main" component={TabNavigator} />\n  <Stack.Screen name="Modal" component={ModalScreen} options={{ presentation: "modal" }} />\n</Stack.Navigator>\n\n// 11. INTERNATIONALIZATION (i18n)\nimport i18n from "i18next";\nimport { useTranslation } from "react-i18next";\n\nfunction MyComponent() {\n  const { t } = useTranslation();\n  return <Text>{t("welcome_message")}</Text>;\n}\n\n// 12. CI/CD PIPELINE\n// GitHub Actions example:\n/*\nname: Build\non: [push]\njobs:\n  build-ios:\n    runs-on: macos-latest\n    steps:\n      - uses: actions/checkout@v2\n      - run: npm install\n      - run: npx react-native run-ios\n  build-android:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - run: npm install\n      - run: cd android && ./gradlew assembleRelease\n*/\n\n// 13. CODEGEN (Type-safe APIs)\n// Generate TypeScript types from GraphQL schema\nimport { gql, useQuery } from "@apollo/client";\n\n// 14. E2E TESTING\nimport { by, element, expect } from "detox";\n\ndescribe("Login Flow", () => {\n  it("should login successfully", async () => {\n    await element(by.id("email")).typeText("test@example.com");\n    await element(by.id("password")).typeText("password");\n    await element(by.id("login-button")).tap();\n    await expect(element(by.text("Welcome"))).toBeVisible();\n  });\n});\n\n// 15. LEARNING RESOURCES\n/*\n📚 Official Docs: https://reactnative.dev\n📱 Expo Docs: https://docs.expo.dev\n🎓 React Native School: https://reactnativeschool.com\n💬 Community: React Native Discord\n📺 YouTube: William Candillon, Catalin Miron\n📖 Books: "Fullstack React Native"\n🎯 Practice: Build real projects!\n*/\n\n// CONGRATULATIONS! 🎉\n// You\'ve completed the React Native tutorial!\n// Keep building, keep learning, and share your knowledge!'
    }
  ];
}

// Flutter
function flutterSpecs(languageName: string): SectionSpec[] {
  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    { title: `${languageName} HOME`, description: `${languageName} is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. Uses Dart language and provides fast development with hot reload.`, syntax: 'Dart, Widgets, Material Design', usage: 'Cross-platform native apps', code: 'import \'package:flutter/material.dart\';\n\nvoid main() => runApp(MyApp());\n\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: Scaffold(\n        appBar: AppBar(title: Text(\'Hello Flutter\')),\n        body: Center(child: Text(\'Welcome!\')),\n      ),\n    );\n  }\n}' },
    { title: `${languageName} Introduction`, description: `${languageName} was created by Google and released in 2017. It uses the Dart programming language and provides widgets for Material Design (Android) and Cupertino (iOS). Everything in Flutter is a widget.`, syntax: 'flutter create, flutter run', usage: 'Get started', code: '// Install Flutter SDK\n// flutter create my_app\n// cd my_app\n// flutter run' },
    { title: `${languageName} Setup`, description: `Install Flutter SDK, set up an editor (VS Code or Android Studio), and configure Android/iOS emulators or physical devices. Use flutter doctor to check your setup. Hot reload enables instant updates during development.`, syntax: 'flutter doctor, flutter devices', usage: 'Development environment', code: 'flutter doctor\nflutter devices\nflutter create my_app\ncd my_app\nflutter run' },
    { title: `${languageName} Dart Basics`, description: `Flutter uses Dart, a client-optimized language. Dart has strong typing, async/await, null safety, and modern syntax. Variables with var, const, final. Functions and classes similar to Java/C#.`, syntax: 'var, final, const, class, function', usage: 'Understand Dart fundamentals', code: 'void main() {\n  var name = \'Flutter\';\n  final age = 7;\n  const pi = 3.14;\n  \n  print(\'Hello \$name\');\n  \n  int add(int a, int b) => a + b;\n  print(add(2, 3));\n}' },
    { title: `${languageName} Project Structure`, description: `Flutter projects have lib/ (Dart code), pubspec.yaml (dependencies), android/ and ios/ (platform code), test/ (tests). Main entry point is lib/main.dart. Assets go in pubspec.yaml and folders like assets/.`, syntax: 'lib/, pubspec.yaml, assets/', usage: 'Organize project', code: '// pubspec.yaml\nname: my_app\ndescription: My Flutter app\n\ndependencies:\n  flutter:\n    sdk: flutter\n  http: ^1.1.0\n\nflutter:\n  assets:\n    - assets/images/' },

    // BASICS (20 lessons)
    { title: `${languageName} Widgets Basics`, description: `Everything in Flutter is a widget. Widgets describe what their view should look like. StatelessWidget for static content, StatefulWidget for dynamic content. Compose widgets into a tree.`, syntax: 'StatelessWidget, StatefulWidget', usage: 'Build UI', code: 'class MyWidget extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Container(\n      padding: EdgeInsets.all(16),\n      child: Text(\'Hello Widget\'),\n    );\n  }\n}' },
    { title: `${languageName} StatelessWidget`, description: `StatelessWidget is immutable and doesn\'t change over time. Override build() method to describe UI. Use for static content like labels, icons, layouts that don\'t change.`, syntax: 'extends StatelessWidget, build()', usage: 'Static UI elements', code: 'class WelcomeScreen extends StatelessWidget {\n  final String title;\n  \n  const WelcomeScreen({Key? key, required this.title}) : super(key: key);\n  \n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: Text(title)),\n      body: Center(child: Text(\'Welcome!\')),\n    );\n  }\n}' },
    { title: `${languageName} StatefulWidget`, description: `StatefulWidget can change over time. Has mutable State object. Call setState() to trigger rebuild. Use for interactive UI, forms, animations, data that changes.`, syntax: 'StatefulWidget, State, setState()', usage: 'Dynamic UI', code: 'class Counter extends StatefulWidget {\n  @override\n  _CounterState createState() => _CounterState();\n}\n\nclass _CounterState extends State<Counter> {\n  int count = 0;\n  \n  @override\n  Widget build(BuildContext context) {\n    return Column(\n      children: [\n        Text(\'\$count\'),\n        ElevatedButton(\n          onPressed: () => setState(() => count++),\n          child: Text(\'Increment\'),\n        ),\n      ],\n    );\n  }\n}' },
    { title: `${languageName} Layout Widgets`, description: `Layout widgets arrange children: Container (padding, margin, decoration), Row (horizontal), Column (vertical), Stack (overlay), Expanded (fill space), Padding, Center, Align.`, syntax: 'Row, Column, Container, Stack', usage: 'Arrange UI', code: 'Column(\n  crossAxisAlignment: CrossAxisAlignment.start,\n  children: [\n    Text(\'Title\'),\n    Row(\n      children: [\n        Expanded(child: Text(\'Left\')),\n        Text(\'Right\'),\n      ],\n    ),\n  ],\n)' },
    { title: `${languageName} Material Widgets`, description: `Material Design widgets: Scaffold (screen structure), AppBar (top bar), FloatingActionButton, Card, ListTile, Drawer, BottomNavigationBar, SnackBar, Dialog.`, syntax: 'Scaffold, AppBar, Card', usage: 'Material Design UI', code: 'Scaffold(\n  appBar: AppBar(\n    title: Text(\'My App\'),\n    actions: [IconButton(icon: Icon(Icons.search), onPressed: () {})],\n  ),\n  body: Card(\n    child: ListTile(\n      leading: Icon(Icons.person),\n      title: Text(\'John Doe\'),\n      subtitle: Text(\'Developer\'),\n    ),\n  ),\n  floatingActionButton: FloatingActionButton(\n    onPressed: () {},\n    child: Icon(Icons.add),\n  ),\n)' },
    { title: `${languageName} Text and Styling`, description: `Display text with Text widget. Style with TextStyle (fontSize, color, fontWeight, fontFamily). Rich text with RichText and TextSpan. Selectable text with SelectableText.`, syntax: 'Text, TextStyle, RichText', usage: 'Display formatted text', code: 'Text(\n  \'Hello Flutter\',\n  style: TextStyle(\n    fontSize: 24,\n    fontWeight: FontWeight.bold,\n    color: Colors.blue,\n    letterSpacing: 1.5,\n  ),\n)\n\nRichText(\n  text: TextSpan(\n    text: \'Hello \',\n    style: TextStyle(color: Colors.black),\n    children: [\n      TextSpan(text: \'World\', style: TextStyle(fontWeight: FontWeight.bold)),\n    ],\n  ),\n)' },
    { title: `${languageName} Images and Icons`, description: `Display images with Image.asset(), Image.network(), Image.file(). Icons with Icon() or ImageIcon(). Configure in pubspec.yaml. Use CircleAvatar for profile images.`, syntax: 'Image, Icon, AssetImage', usage: 'Display media', code: 'Image.asset(\'assets/logo.png\', width: 100, height: 100)\nImage.network(\'https://example.com/image.jpg\')\nIcon(Icons.favorite, color: Colors.red, size: 48)\nCircleAvatar(\n  radius: 30,\n  backgroundImage: NetworkImage(\'https://example.com/avatar.jpg\'),\n)' },
    { title: `${languageName} Buttons`, description: `Button types: ElevatedButton (raised), TextButton (flat), OutlinedButton (bordered), IconButton (icon only), FloatingActionButton. Handle taps with onPressed callback.`, syntax: 'ElevatedButton, TextButton, IconButton', usage: 'User interactions', code: 'ElevatedButton(\n  onPressed: () => print(\'Pressed\'),\n  child: Text(\'Click Me\'),\n)\n\nTextButton(\n  onPressed: () {},\n  child: Text(\'Cancel\'),\n)\n\nIconButton(\n  icon: Icon(Icons.delete),\n  onPressed: () {},\n)' },
    { title: `${languageName} Forms and Input`, description: `Collect input with TextField, Form, and TextFormField. Use TextEditingController to read values. Validation with validator. InputDecoration for styling.`, syntax: 'TextField, TextFormField, Form', usage: 'User input', code: 'final controller = TextEditingController();\n\nTextField(\n  controller: controller,\n  decoration: InputDecoration(\n    labelText: \'Email\',\n    hintText: \'Enter your email\',\n    prefixIcon: Icon(Icons.email),\n    border: OutlineInputBorder(),\n  ),\n)\n\nTextFormField(\n  validator: (value) {\n    if (value == null || value.isEmpty) return \'Required\';\n    return null;\n  },\n)' },
    { title: `${languageName} ListView`, description: `Scrollable list of widgets. ListView for simple lists, ListView.builder for dynamic/long lists, ListView.separated for dividers. Scroll direction: vertical or horizontal.`, syntax: 'ListView, ListView.builder', usage: 'Scrollable content', code: 'ListView.builder(\n  itemCount: items.length,\n  itemBuilder: (context, index) {\n    return ListTile(\n      title: Text(items[index]),\n      leading: Icon(Icons.star),\n      onTap: () => print(\'Tapped \${items[index]}\'),\n    );\n  },\n)' },
    { title: `${languageName} GridView`, description: `Grid layout for items. GridView.count (fixed count), GridView.builder (dynamic), GridView.extent (max size). Configure crossAxisCount, spacing, aspectRatio.`, syntax: 'GridView, GridView.builder', usage: 'Grid layouts', code: 'GridView.count(\n  crossAxisCount: 2,\n  crossAxisSpacing: 10,\n  mainAxisSpacing: 10,\n  children: List.generate(20, (index) {\n    return Card(\n      child: Center(child: Text(\'Item \$index\')),\n    );\n  }),\n)' },
    { title: `${languageName} State Management with setState`, description: `setState() rebuilds widget with new state. Call inside State class. Use for simple local state. For complex state, consider Provider, Riverpod, or Bloc.`, syntax: 'setState(() {})', usage: 'Update UI', code: 'class _MyWidgetState extends State<MyWidget> {\n  bool isLoading = false;\n  \n  void fetchData() async {\n    setState(() => isLoading = true);\n    await Future.delayed(Duration(seconds: 2));\n    setState(() => isLoading = false);\n  }\n  \n  @override\n  Widget build(BuildContext context) {\n    return isLoading ? CircularProgressIndicator() : Text(\'Ready\');\n  }\n}' },
    { title: `${languageName} Navigation Basics`, description: `Navigate between screens with Navigator.push() and Navigator.pop(). Use MaterialPageRoute or CupertinoPageRoute. Pass data to new screen and get result back.`, syntax: 'Navigator.push, Navigator.pop', usage: 'Multi-screen apps', code: '// Navigate to new screen\nNavigator.push(\n  context,\n  MaterialPageRoute(builder: (context) => DetailScreen(id: 123)),\n);\n\n// Return to previous screen\nNavigator.pop(context);\n\n// Pop with result\nNavigator.pop(context, \'Result\');' },
    { title: `${languageName} Named Routes`, description: `Define routes in MaterialApp. Navigate with Navigator.pushNamed(). Pass arguments with RouteSettings. Extract arguments in build method.`, syntax: 'routes, pushNamed', usage: 'Organized navigation', code: 'MaterialApp(\n  initialRoute: \'/\',\n  routes: {\n    \'/\': (context) => HomeScreen(),\n    \'/details\': (context) => DetailsScreen(),\n    \'/settings\': (context) => SettingsScreen(),\n  },\n)\n\n// Navigate\nNavigator.pushNamed(context, \'/details\', arguments: {\'id\': 123});' },
    { title: `${languageName} GestureDetector`, description: `Detect taps, double taps, long press, swipes, drags. Wrap any widget with GestureDetector. Callbacks: onTap, onDoubleTap, onLongPress, onPanUpdate.`, syntax: 'GestureDetector, InkWell', usage: 'Touch interactions', code: 'GestureDetector(\n  onTap: () => print(\'Tapped\'),\n  onDoubleTap: () => print(\'Double tapped\'),\n  onLongPress: () => print(\'Long pressed\'),\n  child: Container(\n    width: 200,\n    height: 100,\n    color: Colors.blue,\n    child: Center(child: Text(\'Tap Me\')),\n  ),\n)' },
    { title: `${languageName} Themes`, description: `Customize app appearance with ThemeData. Define colors, text styles, button themes globally. Access theme with Theme.of(context). Support light and dark themes.`, syntax: 'ThemeData, Theme.of(context)', usage: 'Consistent styling', code: 'MaterialApp(\n  theme: ThemeData(\n    primarySwatch: Colors.blue,\n    brightness: Brightness.light,\n    textTheme: TextTheme(\n      headlineLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),\n    ),\n  ),\n  darkTheme: ThemeData.dark(),\n)\n\n// Use theme\nText(\'Styled\', style: Theme.of(context).textTheme.headlineLarge)' },
    { title: `${languageName} MediaQuery`, description: `Get device info: screen size, orientation, padding, insets. Responsive layouts based on screen dimensions. SafeArea for notches and system UI.`, syntax: 'MediaQuery.of(context)', usage: 'Responsive design', code: 'final size = MediaQuery.of(context).size;\nfinal width = size.width;\nfinal height = size.height;\nfinal orientation = MediaQuery.of(context).orientation;\n\nContainer(\n  width: width * 0.8,  // 80% of screen width\n  child: Text(\'Responsive\'),\n)' },
    { title: `${languageName} Async and Future`, description: `Handle asynchronous operations with Future and async/await. Load data, make API calls, delays. Use FutureBuilder to build UI from async data.`, syntax: 'async, await, Future', usage: 'Asynchronous operations', code: 'Future<String> fetchData() async {\n  await Future.delayed(Duration(seconds: 2));\n  return \'Data loaded\';\n}\n\n// Usage\nfinal data = await fetchData();\n\n// FutureBuilder\nFutureBuilder<String>(\n  future: fetchData(),\n  builder: (context, snapshot) {\n    if (snapshot.hasData) return Text(snapshot.data!);\n    return CircularProgressIndicator();\n  },\n)' },
    { title: `${languageName} HTTP Requests`, description: `Make HTTP requests with http package. GET, POST, PUT, DELETE. Parse JSON with dart:convert. Handle errors with try/catch.`, syntax: 'http.get, jsonDecode', usage: 'API calls', code: 'import \'package:http/http.dart\' as http;\nimport \'dart:convert\';\n\nFuture<List<User>> fetchUsers() async {\n  final response = await http.get(Uri.parse(\'https://api.example.com/users\'));\n  \n  if (response.statusCode == 200) {\n    final List data = jsonDecode(response.body);\n    return data.map((json) => User.fromJson(json)).toList();\n  } else {\n    throw Exception(\'Failed to load\');\n  }\n}' },
    { title: `${languageName} JSON Serialization`, description: `Convert JSON to Dart objects. Create fromJson() factory and toJson() method. Use for API responses and storage. Consider code generation with json_serializable.`, syntax: 'fromJson, toJson, jsonDecode', usage: 'Parse data', code: 'class User {\n  final int id;\n  final String name;\n  \n  User({required this.id, required this.name});\n  \n  factory User.fromJson(Map<String, dynamic> json) {\n    return User(id: json[\'id\'], name: json[\'name\']);\n  }\n  \n  Map<String, dynamic> toJson() => {\'id\': id, \'name\': name};\n}' },

    // INTERMEDIATE (10 lessons)
    { title: `${languageName} Provider State Management`, description: `Provider package for state management. ChangeNotifier for reactive state. Provider.of() or Consumer to access. Scoped state without boilerplate.`, syntax: 'Provider, ChangeNotifier, Consumer', usage: 'App-wide state', code: 'class CounterModel extends ChangeNotifier {\n  int _count = 0;\n  int get count => _count;\n  \n  void increment() {\n    _count++;\n    notifyListeners();\n  }\n}\n\n// Provide\nChangeNotifierProvider(create: (_) => CounterModel(), child: MyApp())\n\n// Consume\nConsumer<CounterModel>(\n  builder: (context, counter, child) => Text(\'\${counter.count}\'),\n)' },
    { title: `${languageName} Animations`, description: `Animate widgets with AnimationController, Tween, and AnimatedBuilder. Implicit animations: AnimatedContainer, AnimatedOpacity. Hero animations for transitions.`, syntax: 'AnimationController, Tween, AnimatedContainer', usage: 'Smooth transitions', code: 'class _MyWidgetState extends State<MyWidget> with SingleTickerProviderStateMixin {\n  late AnimationController _controller;\n  \n  @override\n  void initState() {\n    super.initState();\n    _controller = AnimationController(\n      duration: Duration(seconds: 2),\n      vsync: this,\n    )..repeat(reverse: true);\n  }\n  \n  @override\n  Widget build(BuildContext context) {\n    return FadeTransition(\n      opacity: _controller,\n      child: Text(\'Animated\'),\n    );\n  }\n}' },
    { title: `${languageName} Local Storage`, description: `Store data locally with shared_preferences (key-value), sqflite (SQL database), or hive (NoSQL). Persist settings, cache, offline data.`, syntax: 'SharedPreferences, sqflite, hive', usage: 'Data persistence', code: 'import \'package:shared_preferences/shared_preferences.dart\';\n\n// Save\nfinal prefs = await SharedPreferences.getInstance();\nawait prefs.setString(\'username\', \'Alice\');\nawait prefs.setInt(\'age\', 30);\n\n// Read\nfinal username = prefs.getString(\'username\') ?? \'Guest\';\nfinal age = prefs.getInt(\'age\') ?? 0;' },
    { title: `${languageName} Forms and Validation`, description: `Complex forms with Form widget and GlobalKey. Validate with TextFormField validators. Save and reset forms. Custom validation logic.`, syntax: 'Form, GlobalKey<FormState>', usage: 'Data collection', code: 'final _formKey = GlobalKey<FormState>();\n\nForm(\n  key: _formKey,\n  child: Column(\n    children: [\n      TextFormField(\n        validator: (value) {\n          if (value == null || value.isEmpty) return \'Required\';\n          if (!value.contains(\'@\')) return \'Invalid email\';\n          return null;\n        },\n      ),\n      ElevatedButton(\n        onPressed: () {\n          if (_formKey.currentState!.validate()) {\n            _formKey.currentState!.save();\n          }\n        },\n        child: Text(\'Submit\'),\n      ),\n    ],\n  ),\n)' },
    { title: `${languageName} Custom Widgets`, description: `Create reusable custom widgets. Extract common patterns into StatelessWidget or StatefulWidget. Accept parameters through constructor. Build widget library.`, syntax: 'Custom StatelessWidget', usage: 'Reusable components', code: 'class PrimaryButton extends StatelessWidget {\n  final String text;\n  final VoidCallback onPressed;\n  final bool isLoading;\n  \n  const PrimaryButton({\n    Key? key,\n    required this.text,\n    required this.onPressed,\n    this.isLoading = false,\n  }) : super(key: key);\n  \n  @override\n  Widget build(BuildContext context) {\n    return ElevatedButton(\n      onPressed: isLoading ? null : onPressed,\n      child: isLoading ? CircularProgressIndicator() : Text(text),\n    );\n  }\n}' },
    { title: `${languageName} StreamBuilder`, description: `Build UI from Stream data. Real-time updates, live data, Firebase listeners. snapshot.hasData, snapshot.data, snapshot.error.`, syntax: 'StreamBuilder, Stream', usage: 'Real-time data', code: 'StreamBuilder<List<Message>>(\n  stream: messageStream,\n  builder: (context, snapshot) {\n    if (snapshot.hasError) return Text(\'Error: \${snapshot.error}\');\n    if (!snapshot.hasData) return CircularProgressIndicator();\n    \n    final messages = snapshot.data!;\n    return ListView.builder(\n      itemCount: messages.length,\n      itemBuilder: (context, index) => Text(messages[index].text),\n    );\n  },\n)' },
    { title: `${languageName} Platform Channels`, description: `Communicate with native iOS/Android code. MethodChannel for method calls, EventChannel for streams. Access platform-specific features.`, syntax: 'MethodChannel, platform code', usage: 'Native integration', code: 'import \'package:flutter/services.dart\';\n\nfinal platform = MethodChannel(\'com.example/battery\');\n\nFuture<int> getBatteryLevel() async {\n  try {\n    final int result = await platform.invokeMethod(\'getBatteryLevel\');\n    return result;\n  } catch (e) {\n    return -1;\n  }\n}' },
    { title: `${languageName} Responsive Design`, description: `Build responsive layouts with LayoutBuilder, MediaQuery, OrientationBuilder. Different layouts for phone/tablet. Breakpoints for screen sizes.`, syntax: 'LayoutBuilder, MediaQuery', usage: 'Multi-device support', code: 'LayoutBuilder(\n  builder: (context, constraints) {\n    if (constraints.maxWidth > 600) {\n      // Tablet layout\n      return Row(children: [Sidebar(), MainContent()]);\n    } else {\n      // Phone layout\n      return Column(children: [MainContent()]);\n    }\n  },\n)' },
    { title: `${languageName} Testing`, description: `Unit tests for logic, widget tests for UI, integration tests for flows. Use flutter_test package. Test interactions, state changes, navigation.`, syntax: 'testWidgets, expect, find', usage: 'Quality assurance', code: 'testWidgets(\'Counter increments\', (WidgetTester tester) async {\n  await tester.pumpWidget(MyApp());\n  \n  expect(find.text(\'0\'), findsOneWidget);\n  \n  await tester.tap(find.byIcon(Icons.add));\n  await tester.pump();\n  \n  expect(find.text(\'1\'), findsOneWidget);\n});' },
    { title: `${languageName} Error Handling`, description: `Handle errors gracefully. Try/catch for sync code, catchError for Futures. ErrorWidget for widget errors. Global error handling with FlutterError.onError.`, syntax: 'try/catch, catchError', usage: 'Robust apps', code: 'try {\n  await riskyOperation();\n} on NetworkException {\n  showSnackBar(\'Network error\');\n} catch (e) {\n  print(\'Error: \$e\');\n}\n\nfetchData().catchError((error) {\n  print(\'Failed to fetch: \$error\');\n  return [];\n});' },

    // ADVANCED (7 lessons)
    { title: `${languageName} Advanced State Management`, description: `Complex state with Riverpod, Bloc, or GetX. Separate business logic from UI. Testable, scalable architecture. State management patterns for large apps.`, syntax: 'Riverpod, Bloc, GetX', usage: 'Enterprise apps', code: '// Riverpod example\nfinal counterProvider = StateProvider<int>((ref) => 0);\n\nclass MyWidget extends ConsumerWidget {\n  @override\n  Widget build(BuildContext context, WidgetRef ref) {\n    final count = ref.watch(counterProvider);\n    return Text(\'\$count\');\n  }\n}' },
    { title: `${languageName} Firebase Integration`, description: `Integrate Firebase for auth, database, storage, messaging. FirebaseAuth for users, Firestore for data, Cloud Storage for files. Real-time sync.`, syntax: 'Firebase, FirebaseAuth, Firestore', usage: 'Backend services', code: 'import \'package:firebase_auth/firebase_auth.dart\';\nimport \'package:cloud_firestore/cloud_firestore.dart\';\n\nfinal auth = FirebaseAuth.instance;\nfinal db = FirebaseFirestore.instance;\n\n// Sign in\nawait auth.signInWithEmailAndPassword(email: email, password: password);\n\n// Save data\nawait db.collection(\'users\').doc(userId).set({\'name\': \'Alice\'});' },
    { title: `${languageName} Performance Optimization`, description: `Optimize with const constructors, RepaintBoundary, ListView.builder, cached images. Analyze with DevTools profiler. Reduce rebuilds, lazy loading.`, syntax: 'const, RepaintBoundary, DevTools', usage: 'Fast apps', code: '// Use const for static widgets\nconst Text(\'Static\');\n\n// Repaint boundary\nRepaintBoundary(\n  child: ExpensiveWidget(),\n)\n\n// Cached network image\nCachedNetworkImage(imageUrl: url)' },
    { title: `${languageName} Custom Painters`, description: `Draw custom graphics with CustomPaint and CustomPainter. Use Canvas and Paint for shapes, paths, text. Create charts, diagrams, custom UI.`, syntax: 'CustomPaint, Canvas, Paint', usage: 'Custom graphics', code: 'class CirclePainter extends CustomPainter {\n  @override\n  void paint(Canvas canvas, Size size) {\n    final paint = Paint()\n      ..color = Colors.blue\n      ..style = PaintingStyle.fill;\n    \n    canvas.drawCircle(\n      Offset(size.width / 2, size.height / 2),\n      50,\n      paint,\n    );\n  }\n  \n  @override\n  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;\n}\n\nCustomPaint(painter: CirclePainter())' },
    { title: `${languageName} Platform-Specific UI`, description: `Use Platform.isIOS/isAndroid for platform detection. Cupertino widgets for iOS, Material for Android. Adaptive widgets that switch automatically.`, syntax: 'Platform, Cupertino, Material', usage: 'Native look and feel', code: 'import \'dart:io\';\nimport \'package:flutter/cupertino.dart\';\nimport \'package:flutter/material.dart\';\n\nWidget buildButton() {\n  if (Platform.isIOS) {\n    return CupertinoButton(child: Text(\'iOS\'), onPressed: () {});\n  }\n  return ElevatedButton(child: Text(\'Android\'), onPressed: () {});\n}' },
    { title: `${languageName} Internationalization`, description: `Support multiple languages with flutter_localizations and intl. Generate ARB files, translate strings. Format dates, numbers per locale. RTL support.`, syntax: 'intl, l10n, ARB files', usage: 'Multi-language apps', code: '// pubspec.yaml\nflutter:\n  generate: true\n\n// l10n.yaml\narb-dir: lib/l10n\ntemplate-arb-file: app_en.arb\n\n// Usage\nText(AppLocalizations.of(context)!.helloWorld)' },
    { title: `${languageName} Build and Deployment`, description: `Build APK/AAB for Android, IPA for iOS. Configure app signing, version, permissions. Deploy to Play Store and App Store. CI/CD with GitHub Actions or Codemagic.`, syntax: 'flutter build, app signing', usage: 'Production release', code: '// Build Android\nflutter build apk --release\nflutter build appbundle --release\n\n// Build iOS\nflutter build ios --release\n\n// Web\nflutter build web --release' },
  ]

  return lessons
}

// Swift
function swiftSpecs(languageName: string): SectionSpec[] {
  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    { title: `${languageName} HOME`, description: `${languageName} is Apple's modern programming language for iOS, macOS, watchOS, and tvOS. Created by Apple in 2014, Swift is designed to be safe, fast, and expressive with modern syntax that's easy to read and write.`, syntax: 'var, let, func, class, struct', usage: 'Build Apple platform apps', code: 'import SwiftUI\n\n@main\nstruct MyApp: App {\n  var body: some Scene {\n    WindowGroup {\n      ContentView()\n    }\n  }\n}\n\nstruct ContentView: View {\n  var body: some View {\n    Text("Hello, Swift!")\n      .font(.largeTitle)\n      .padding()\n  }\n}' },
    { title: `${languageName} Introduction`, description: `${languageName} combines the best of C and Objective-C without compatibility constraints. Features type safety, optionals for null safety, automatic memory management, and modern syntax. SwiftUI provides declarative UI framework.`, syntax: 'Type safety, Optionals, ARC', usage: 'Modern iOS development', code: 'let greeting = "Hello"\nvar count: Int = 0\n\nfunc greet(name: String) -> String {\n  return "\\(greeting), \\(name)!"\n}\n\nprint(greet(name: "World"))' },
    { title: `${languageName} Setup`, description: `Install Xcode from Mac App Store for Swift development. Xcode includes Swift compiler, iOS simulator, Interface Builder. Create new project with iOS App template. Choose SwiftUI for modern UI or Storyboard for UIKit.`, syntax: 'Xcode, iOS Simulator, Playgrounds', usage: 'Development environment', code: '// Create new Xcode project\n// File > New > Project\n// iOS > App\n// Interface: SwiftUI\n// Language: Swift\n\n// Or use Swift Playgrounds for learning' },
    { title: `${languageName} Basics`, description: `${languageName} syntax: statements end without semicolons, use camelCase naming. let for constants, var for variables. Type inference but can specify types. String interpolation with \\(). Comments with // or /* */.`, syntax: 'let, var, type inference', usage: 'Write Swift code', code: 'let name = "Alice"  // Constant\nvar age = 30        // Variable\nlet city: String = "NYC"  // Explicit type\n\nlet message = "\\(name) is \\(age) years old"\nprint(message)\n\n// Multi-line comment\n/* This is a\n   multi-line comment */' },
    { title: `${languageName} Data Types`, description: `Basic types: Int, Double, Float, Bool, String, Character. Collections: Array, Dictionary, Set. Tuples for grouping values. Type aliases with typealias. Use type(of:) to check types.`, syntax: 'Int, String, Bool, Array, Dictionary', usage: 'Store different data', code: 'let integer: Int = 42\nlet decimal: Double = 3.14\nlet flag: Bool = true\nlet text: String = "Hello"\n\nlet numbers = [1, 2, 3, 4, 5]\nlet scores = ["Alice": 95, "Bob": 87]\nlet colors: Set = ["red", "blue", "green"]\n\nlet tuple = ("Alice", 30)\nlet (name, age) = tuple' },

    // BASICS (20 lessons)
    { title: `${languageName} Variables and Constants`, description: `Use let for immutable constants, var for mutable variables. Swift encourages immutability for safety. Constants must be assigned once before use. Can declare without value if type is specified.`, syntax: 'let constant, var variable', usage: 'Store values', code: 'let pi = 3.14159  // Cannot change\nvar counter = 0   // Can change\ncounter += 1\n\nlet x: Int  // Declare\nx = 10      // Initialize once\n\nlet maxAttempts = 3\nvar currentAttempt = 0' },
    { title: `${languageName} Strings`, description: `Strings are collections of characters. String interpolation with \\(). Multi-line strings with """. String methods: count, isEmpty, uppercased(), lowercased(), contains(), split(). Concatenate with +.`, syntax: 'String, \\(), """, methods', usage: 'Text manipulation', code: 'let name = "Alice"\nlet age = 30\nlet message = "Hello, \\(name)! You are \\(age)."\n\nlet multiline = """\n  Line 1\n  Line 2\n  Line 3\n  """\n\nlet uppercase = name.uppercased()\nlet contains = message.contains("Alice")  // true\nlet words = message.split(separator: " ")' },
    { title: `${languageName} Optionals`, description: `Optionals handle absence of value safely. Type? means optional. Unwrap with if let, guard let, or force unwrap !. Nil coalescing ?? for defaults. Optional chaining with ?.`, syntax: 'Type?, if let, guard let, ??, ?.', usage: 'Null safety', code: 'var name: String? = "Alice"\nvar age: Int? = nil\n\n// Optional binding\nif let unwrappedName = name {\n  print("Name is \\(unwrappedName)")\n}\n\n// Guard\nguard let unwrappedAge = age else {\n  print("No age"); return\n}\n\n// Nil coalescing\nlet displayName = name ?? "Guest"\n\n// Optional chaining\nlet length = name?.count' },
    { title: `${languageName} Arrays`, description: `Arrays store ordered collections of same type. Create with [] or Array<Type>(). Access with subscript [index]. Methods: append(), insert(), remove(), count, isEmpty, sorted(), filter(), map().`, syntax: 'Array, [Type], methods', usage: 'Ordered collections', code: 'var fruits = ["Apple", "Banana", "Cherry"]\nfruits.append("Date")\nfruits.insert("Avocado", at: 0)\nfruits.remove(at: 1)\n\nprint(fruits.count)      // 4\nprint(fruits[0])         // "Avocado"\nprint(fruits.first)      // Optional("Avocado")\n\nlet sorted = fruits.sorted()\nlet uppercase = fruits.map { $0.uppercased() }' },
    { title: `${languageName} Dictionaries`, description: `Dictionaries store key-value pairs. Keys must be unique and hashable. Access with [key] returns optional. Methods: updateValue(), removeValue(), keys, values, count.`, syntax: '[Key: Value], subscript', usage: 'Key-value storage', code: 'var scores = ["Alice": 95, "Bob": 87, "Carol": 92]\n\nscores["David"] = 88\nscores["Alice"] = 97  // Update\n\nif let aliceScore = scores["Alice"] {\n  print("Alice: \\(aliceScore)")\n}\n\nfor (name, score) in scores {\n  print("\\(name): \\(score)")\n}\n\nlet names = Array(scores.keys)\nlet values = Array(scores.values)' },
    { title: `${languageName} Control Flow`, description: `If/else for conditionals. Conditions don\'t need parentheses. Switch statements are powerful with pattern matching. Must be exhaustive or have default case. No fallthrough by default.`, syntax: 'if, else, switch, case', usage: 'Make decisions', code: 'let age = 18\n\nif age >= 18 {\n  print("Adult")\n} else if age >= 13 {\n  print("Teen")\n} else {\n  print("Child")\n}\n\nlet grade = "B"\nswitch grade {\ncase "A": print("Excellent")\ncase "B", "C": print("Good")\ncase "D": print("Pass")\ndefault: print("Fail")\n}' },
    { title: `${languageName} Loops`, description: `For-in loops iterate collections or ranges. While and repeat-while loops. Use where clause for filtering. break exits loop, continue skips iteration.`, syntax: 'for-in, while, repeat-while', usage: 'Iteration', code: '// For-in with array\nfor fruit in ["Apple", "Banana"] {\n  print(fruit)\n}\n\n// Range\nfor i in 1...5 {\n  print(i)  // 1, 2, 3, 4, 5\n}\n\n// Where clause\nfor i in 1...10 where i % 2 == 0 {\n  print(i)  // Even numbers\n}\n\n// While\nvar count = 0\nwhile count < 5 {\n  print(count)\n  count += 1\n}' },
    { title: `${languageName} Functions`, description: `Functions with func keyword. Parameter labels for readability. Return type with ->. Multiple return values with tuples. Default parameters. Variadic parameters with ....`, syntax: 'func name(param: Type) -> ReturnType', usage: 'Reusable code', code: 'func greet(person name: String) -> String {\n  return "Hello, \\(name)!"\n}\ngreet(person: "Alice")\n\n// Multiple returns\nfunc minMax(array: [Int]) -> (min: Int, max: Int) {\n  return (array.min()!, array.max()!)\n}\nlet bounds = minMax(array: [1, 5, 3])\nprint(bounds.min)\n\n// Default param\nfunc greet(_ name: String = "Guest") -> String {\n  return "Hello, \\(name)"\n}' },
    { title: `${languageName} Closures`, description: `Closures are self-contained blocks of functionality. Similar to lambdas or anonymous functions. Trailing closure syntax for last parameter. Shorthand argument names $0, $1. Capture values from surrounding context.`, syntax: '{ params in code }, trailing closure', usage: 'Inline functions', code: 'let numbers = [1, 2, 3, 4, 5]\n\n// Full syntax\nlet doubled = numbers.map({ (number: Int) -> Int in\n  return number * 2\n})\n\n// Shorthand\nlet tripled = numbers.map { $0 * 3 }\n\n// Trailing closure\nfunc perform(operation: () -> Void) {\n  operation()\n}\n\nperform {\n  print("Hello from closure")\n}' },
    { title: `${languageName} Enums`, description: `Enumerations define types with finite set of related values. Associated values store additional data. Raw values for underlying values. Switch over all cases.`, syntax: 'enum Name { case value }', usage: 'Type-safe constants', code: 'enum Direction {\n  case north, south, east, west\n}\n\nlet heading = Direction.north\n\n// Associated values\nenum Result {\n  case success(String)\n  case failure(Error)\n}\n\n// Raw values\nenum Planet: Int {\n  case mercury = 1, venus, earth, mars\n}\n\nlet earth = Planet.earth\nprint(earth.rawValue)  // 3' },
    { title: `${languageName} Structs`, description: `Structures are value types with properties and methods. Memberwise initializer auto-generated. Copied when assigned or passed. Lightweight for simple data. Prefer over classes for immutability.`, syntax: 'struct Name { }', usage: 'Value types', code: 'struct User {\n  var name: String\n  var age: Int\n  \n  func greet() -> String {\n    return "Hi, I\'m \\(name)"\n  }\n}\n\nvar user1 = User(name: "Alice", age: 30)\nvar user2 = user1  // Copy\nuser2.name = "Bob"\nprint(user1.name)  // "Alice" (unchanged)\n\nmutating func haveBirthday() {\n  age += 1\n}' },
    { title: `${languageName} Classes`, description: `Classes are reference types with inheritance. Reference counted (ARC). Use init for initialization, deinit for cleanup. Inherit from parent classes. Override methods. Reference semantics.`, syntax: 'class Name { init, deinit }', usage: 'Reference types', code: 'class Animal {\n  var name: String\n  \n  init(name: String) {\n    self.name = name\n  }\n  \n  func makeSound() -> String {\n    return "Some sound"\n  }\n}\n\nclass Dog: Animal {\n  override func makeSound() -> String {\n    return "Woof!"\n  }\n}\n\nlet dog = Dog(name: "Buddy")\nprint(dog.makeSound())  // "Woof!"' },
    { title: `${languageName} Properties`, description: `Stored properties hold values. Computed properties calculate values. Property observers: willSet, didSet. Lazy properties delay initialization. Static/class properties shared across instances.`, syntax: 'var, computed var, lazy var', usage: 'Object state', code: 'struct Circle {\n  var radius: Double\n  \n  // Computed property\n  var area: Double {\n    return .pi * radius * radius\n  }\n  \n  var diameter: Double {\n    get { radius * 2 }\n    set { radius = newValue / 2 }\n  }\n}\n\n// Property observer\nvar score = 0 {\n  didSet {\n    print("Score changed from \\(oldValue) to \\(score)")\n  }\n}' },
    { title: `${languageName} Protocols`, description: `Protocols define blueprint of methods, properties, and requirements. Classes, structs, enums can conform. Multiple protocol conformance. Protocol extensions add default implementations. Protocol-oriented programming.`, syntax: 'protocol Name { }', usage: 'Define interfaces', code: 'protocol Drivable {\n  var speed: Int { get set }\n  func drive()\n}\n\nstruct Car: Drivable {\n  var speed: Int\n  \n  func drive() {\n    print("Driving at \\(speed) mph")\n  }\n}\n\n// Protocol extension\nextension Drivable {\n  func stop() {\n    print("Stopping")\n  }\n}' },
    { title: `${languageName} Extensions`, description: `Add functionality to existing types without modifying source. Add computed properties, methods, initializers, subscripts. Conform to protocols. Can extend Int, String, Array, etc.`, syntax: 'extension Type { }', usage: 'Extend types', code: 'extension Int {\n  var squared: Int {\n    return self * self\n  }\n  \n  func times(_ block: () -> Void) {\n    for _ in 0..<self {\n      block()\n    }\n  }\n}\n\nlet num = 5\nprint(num.squared)  // 25\n\n3.times {\n  print("Hello")\n}' },
    { title: `${languageName} Error Handling`, description: `Errors conform to Error protocol. Throw errors with throw. Handle with do-try-catch. Propagate with throws. Convert to optional with try?. Force with try!. Defer for cleanup.`, syntax: 'throw, do-try-catch, throws', usage: 'Handle failures', code: 'enum NetworkError: Error {\n  case badURL\n  case timeout\n}\n\nfunc fetchData(from url: String) throws -> String {\n  guard !url.isEmpty else {\n    throw NetworkError.badURL\n  }\n  return "Data"\n}\n\ndo {\n  let data = try fetchData(from: "https://api.com")\n  print(data)\n} catch NetworkError.badURL {\n  print("Invalid URL")\n} catch {\n  print("Error: \\(error)")\n}' },
    { title: `${languageName} Generics`, description: `Write flexible, reusable functions and types. Type parameters in angle brackets <T>. Generic functions, structs, classes, enums. Type constraints with where clause. Associated types in protocols.`, syntax: 'func name<T>(param: T)', usage: 'Type-safe reusability', code: 'func swap<T>(_ a: inout T, _ b: inout T) {\n  let temp = a\n  a = b\n  b = temp\n}\n\nstruct Stack<Element> {\n  private var items: [Element] = []\n  \n  mutating func push(_ item: Element) {\n    items.append(item)\n  }\n  \n  mutating func pop() -> Element? {\n    return items.popLast()\n  }\n}\n\nvar intStack = Stack<Int>()\nintStack.push(5)' },
    { title: `${languageName} Guard and Defer`, description: `Guard exits early if condition fails, improving readability. Defer runs code when exiting scope, useful for cleanup. Multiple defer statements run in reverse order.`, syntax: 'guard condition else { }, defer { }', usage: 'Control flow helpers', code: 'func greet(person: String?) {\n  guard let name = person else {\n    print("No name")\n    return\n  }\n  print("Hello, \\(name)")\n}\n\nfunc processFile() {\n  let file = openFile()\n  defer {\n    closeFile(file)  // Always runs\n  }\n  \n  // Work with file\n  readFile(file)\n}' },
    { title: `${languageName} Higher-Order Functions`, description: `Functions that take functions as parameters or return functions. Array methods: map, filter, reduce, compactMap, flatMap, sorted, forEach. Chainable for powerful data transformations.`, syntax: 'map, filter, reduce', usage: 'Functional programming', code: 'let numbers = [1, 2, 3, 4, 5]\n\nlet doubled = numbers.map { $0 * 2 }\nlet evens = numbers.filter { $0 % 2 == 0 }\nlet sum = numbers.reduce(0, +)\n\nlet words = ["Hello", "", "World"]\nlet nonEmpty = words.compactMap { $0.isEmpty ? nil : $0 }\n\nlet sorted = numbers.sorted { $0 > $1 }' },
    { title: `${languageName} Memory Management`, description: `Automatic Reference Counting (ARC) manages memory. Strong references keep objects alive. Weak references don\'t increase count. Unowned for non-optional references. Capture lists in closures prevent retain cycles.`, syntax: 'weak, unowned, [weak self]', usage: 'Prevent memory leaks', code: 'class Person {\n  var name: String\n  weak var friend: Person?  // Prevent cycle\n  \n  init(name: String) {\n    self.name = name\n  }\n}\n\n// Closure capture\nclass ViewController {\n  func setupHandler() {\n    someAsyncCall { [weak self] in\n      guard let self = self else { return }\n      self.updateUI()\n    }\n  }\n}' },

    // SWIFTUI (10 lessons)
    { title: `${languageName} SwiftUI Basics`, description: `SwiftUI is declarative UI framework. Views described as functions of state. Struct-based views conform to View protocol. Body property returns view hierarchy. Modifiers style and configure views.`, syntax: 'struct ContentView: View, body, modifiers', usage: 'Build modern UI', code: 'struct ContentView: View {\n  var body: some View {\n    VStack {\n      Text("Hello, SwiftUI!")\n        .font(.largeTitle)\n        .foregroundColor(.blue)\n      \n      Button("Tap Me") {\n        print("Tapped")\n      }\n      .buttonStyle(.borderedProminent)\n    }\n    .padding()\n  }\n}' },
    { title: `${languageName} SwiftUI State`, description: `@State for view-local mutable state. Changes trigger view updates. Use for simple UI state. @Binding creates two-way connection. $ prefix accesses binding.`, syntax: '@State, @Binding', usage: 'Reactive UI', code: 'struct CounterView: View {\n  @State private var count = 0\n  \n  var body: some View {\n    VStack {\n      Text("Count: \\(count)")\n      Button("Increment") {\n        count += 1\n      }\n    }\n  }\n}\n\nstruct ChildView: View {\n  @Binding var value: Int\n  \n  var body: some View {\n    Stepper("Value", value: $value)\n  }\n}' },
    { title: `${languageName} SwiftUI Lists`, description: `List displays scrollable rows. Use ForEach for dynamic content. Identifiable protocol or id parameter. Sections for grouping. Swipe actions, delete, move.`, syntax: 'List, ForEach, id', usage: 'Scrollable content', code: 'struct Todo: Identifiable {\n  let id = UUID()\n  var title: String\n  var done: Bool\n}\n\nstruct TodoListView: View {\n  @State private var todos = [Todo(title: "Task 1", done: false)]\n  \n  var body: some View {\n    List {\n      ForEach(todos) { todo in\n        HStack {\n          Image(systemName: todo.done ? "checkmark.circle.fill" : "circle")\n          Text(todo.title)\n        }\n      }\n      .onDelete { indices in\n        todos.remove(atOffsets: indices)\n      }\n    }\n  }\n}' },
    { title: `${languageName} SwiftUI Navigation`, description: `NavigationStack for navigation hierarchy. NavigationLink for transitions. Pass data to destination. Toolbar for buttons. Present sheets with .sheet(). Alerts with .alert().`, syntax: 'NavigationStack, NavigationLink, .sheet', usage: 'Multi-screen apps', code: 'struct MasterView: View {\n  var body: some View {\n    NavigationStack {\n      List(1..<20) { item in\n        NavigationLink("Item \\(item)", value: item)\n      }\n      .navigationDestination(for: Int.self) { item in\n        DetailView(item: item)\n      }\n      .navigationTitle("Items")\n      .toolbar {\n        Button("Add") { }\n      }\n    }\n  }\n}' },
    { title: `${languageName} SwiftUI Forms`, description: `Form container for grouped input controls. TextField, Toggle, Picker, Stepper, Slider. Sections for organization. Validation and submission.`, syntax: 'Form, TextField, Toggle', usage: 'User input', code: 'struct SettingsView: View {\n  @State private var username = ""\n  @State private var notificationsEnabled = true\n  @State private var theme = "Light"\n  \n  var body: some View {\n    Form {\n      Section("Account") {\n        TextField("Username", text: $username)\n      }\n      \n      Section("Preferences") {\n        Toggle("Notifications", isOn: $notificationsEnabled)\n        Picker("Theme", selection: $theme) {\n          Text("Light").tag("Light")\n          Text("Dark").tag("Dark")\n        }\n      }\n    }\n  }\n}' },
    { title: `${languageName} ObservableObject`, description: `@ObservableObject for reference types that publish changes. Classes conform to ObservableObject. @Published marks properties that trigger updates. @StateObject creates and owns instance. @EnvironmentObject shares across view hierarchy.`, syntax: '@ObservableObject, @Published, @StateObject', usage: 'Shared state', code: 'class UserData: ObservableObject {\n  @Published var name = ""\n  @Published var age = 0\n}\n\nstruct ContentView: View {\n  @StateObject private var userData = UserData()\n  \n  var body: some View {\n    VStack {\n      TextField("Name", text: $userData.name)\n      Text("Hello, \\(userData.name)")\n      ChildView()\n    }\n    .environmentObject(userData)\n  }\n}\n\nstruct ChildView: View {\n  @EnvironmentObject var userData: UserData\n  var body: some View { Text(userData.name) }\n}' },
    { title: `${languageName} SwiftUI Animations`, description: `Implicit animations with .animation() modifier. Explicit animations with withAnimation. Spring, linear, easeIn animations. Transitions for insertion/removal. Custom timing curves.`, syntax: 'withAnimation, .animation(), .transition', usage: 'Smooth UI', code: 'struct AnimatedView: View {\n  @State private var isExpanded = false\n  \n  var body: some View {\n    VStack {\n      RoundedRectangle(cornerRadius: isExpanded ? 50 : 10)\n        .fill(isExpanded ? Color.blue : Color.red)\n        .frame(width: isExpanded ? 200 : 100,\n               height: isExpanded ? 200 : 100)\n        .animation(.spring(response: 0.5), value: isExpanded)\n      \n      Button("Toggle") {\n        withAnimation {\n          isExpanded.toggle()\n        }\n      }\n    }\n  }\n}' },
    { title: `${languageName} AsyncImage and Images`, description: `AsyncImage loads images from URLs. Image displays local images from assets. Resizable, aspectRatio, clipped modifiers. SF Symbols for icons.`, syntax: 'AsyncImage, Image, SF Symbols', usage: 'Display images', code: 'struct ImageView: View {\n  var body: some View {\n    VStack {\n      // Remote image\n      AsyncImage(url: URL(string: "https://example.com/image.jpg")) { image in\n        image.resizable()\n          .aspectRatio(contentMode: .fit)\n      } placeholder: {\n        ProgressView()\n      }\n      .frame(width: 200, height: 200)\n      \n      // SF Symbol\n      Image(systemName: "heart.fill")\n        .foregroundColor(.red)\n        .font(.largeTitle)\n    }\n  }\n}' },
    { title: `${languageName} Task and Async/Await`, description: `Task runs async code in SwiftUI. async/await for sequential async operations. .task() modifier for view lifecycle. @MainActor for UI updates. Structured concurrency with Task groups.`, syntax: 'async/await, Task, .task()', usage: 'Asynchronous operations', code: 'struct DataView: View {\n  @State private var users: [User] = []\n  \n  var body: some View {\n    List(users) { user in\n      Text(user.name)\n    }\n    .task {\n      await loadUsers()\n    }\n  }\n  \n  func loadUsers() async {\n    do {\n      let url = URL(string: "https://api.example.com/users")!\n      let (data, _) = try await URLSession.shared.data(from: url)\n      users = try JSONDecoder().decode([User].self, from: data)\n    } catch {\n      print("Error: \\(error)")\n    }\n  }\n}' },
    { title: `${languageName} SwiftUI Best Practices`, description: `Extract subviews for complex UIs. Use ViewBuilder for custom containers. PreferenceKey for child-to-parent communication. Equatable for performance. @ViewBuilder for conditional views.`, syntax: '@ViewBuilder, PreferenceKey', usage: 'Clean, performant code', code: 'struct ContentView: View {\n  var body: some View {\n    VStack {\n      HeaderView()\n      ContentSection()\n      FooterView()\n    }\n  }\n}\n\n// Extract subviews\nstruct HeaderView: View {\n  var body: some View {\n    Text("Header").font(.title)\n  }\n}\n\n// Custom ViewBuilder\n@ViewBuilder\nfunc buildContent(for state: State) -> some View {\n  switch state {\n  case .loading: ProgressView()\n  case .loaded: Text("Done")\n  case .error: Text("Error")\n  }\n}' },

    // ADVANCED (5 lessons)
    { title: `${languageName} URLSession and Networking`, description: `URLSession for HTTP requests. async/await with data(from:). Decode JSON with Codable. Handle errors. Upload/download tasks. Custom URLSession configuration.`, syntax: 'URLSession, Codable, async/await', usage: 'API communication', code: 'struct User: Codable {\n  let id: Int\n  let name: String\n  let email: String\n}\n\nfunc fetchUsers() async throws -> [User] {\n  let url = URL(string: "https://api.example.com/users")!\n  let (data, response) = try await URLSession.shared.data(from: url)\n  \n  guard let httpResponse = response as? HTTPURLResponse,\n        httpResponse.statusCode == 200 else {\n    throw NetworkError.invalidResponse\n  }\n  \n  return try JSONDecoder().decode([User].self, from: data)\n}' },
    { title: `${languageName} Core Data`, description: `Core Data for local persistence. NSManagedObject for entities. NSFetchRequest for queries. @FetchRequest in SwiftUI. NSPersistentContainer manages stack. Relationships, predicates, sorting.`, syntax: 'Core Data, @FetchRequest, NSManagedObject', usage: 'Local database', code: '// Define entity in .xcdatamodeld\n\nstruct TodoListView: View {\n  @Environment(\\.managedObjectContext) private var viewContext\n  @FetchRequest(\n    sortDescriptors: [NSSortDescriptor(keyPath: \\Todo.timestamp, ascending: true)],\n    animation: .default)\n  private var todos: FetchedResults<Todo>\n  \n  var body: some View {\n    List {\n      ForEach(todos) { todo in\n        Text(todo.title ?? "")\n      }\n    }\n  }\n  \n  func addTodo() {\n    let newTodo = Todo(context: viewContext)\n    newTodo.title = "New Task"\n    try? viewContext.save()\n  }\n}' },
    { title: `${languageName} UserDefaults and Storage`, description: `UserDefaults for simple key-value storage. Store strings, numbers, bools, data, arrays, dictionaries. @AppStorage wrapper in SwiftUI. FileManager for file operations. Documents directory for user files.`, syntax: 'UserDefaults, @AppStorage, FileManager', usage: 'Data persistence', code: '// SwiftUI\nstruct SettingsView: View {\n  @AppStorage("username") private var username = ""\n  @AppStorage("notificationsEnabled") private var notifications = true\n  \n  var body: some View {\n    Form {\n      TextField("Username", text: $username)\n      Toggle("Notifications", isOn: $notifications)\n    }\n  }\n}\n\n// Traditional\nUserDefaults.standard.set("Alice", forKey: "username")\nlet name = UserDefaults.standard.string(forKey: "username")' },
    { title: `${languageName} Testing`, description: `XCTest framework for unit and UI tests. XCTestCase subclasses. test methods. Assertions: XCTAssertEqual, XCTAssertTrue. UI testing with XCUIApplication. Async testing with expectations.`, syntax: 'XCTest, XCTAssert, XCUIApplication', usage: 'Quality assurance', code: 'import XCTest\n\nclass CalculatorTests: XCTestCase {\n  func testAddition() {\n    let calculator = Calculator()\n    let result = calculator.add(2, 3)\n    XCTAssertEqual(result, 5)\n  }\n  \n  func testAsync() async {\n    let data = await fetchData()\n    XCTAssertNotNil(data)\n  }\n}\n\nclass UITests: XCTestCase {\n  func testButtonTap() {\n    let app = XCUIApplication()\n    app.launch()\n    app.buttons["Login"].tap()\n    XCTAssertTrue(app.staticTexts["Welcome"].exists)\n  }\n}' },
    { title: `${languageName} App Deployment`, description: `Build and archive app in Xcode. App Store Connect for submission. Provisioning profiles and certificates. TestFlight for beta testing. Version and build numbers. App icons and screenshots.`, syntax: 'Archive, App Store Connect, TestFlight', usage: 'Publish apps', code: '// 1. Update version/build in Xcode\n// 2. Product > Archive\n// 3. Upload to App Store Connect\n// 4. TestFlight for beta testing\n// 5. Submit for review\n\n// Info.plist\nCFBundleShortVersionString: 1.0\nCFBundleVersion: 1\n\n// TestFlight beta\n// Distribute to internal/external testers\n// Collect feedback and crash reports' },
  ]

  return lessons
}

// Kotlin
function kotlinSpecs(languageName: string): SectionSpec[] {
  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    { title: `${languageName} HOME`, description: 'Kotlin is a modern, statically-typed programming language for Android, server, and multiplatform apps. Concise, safe, and fully interoperable with Java.', syntax: 'val, var, fun, class', usage: 'Android and backend', code: 'fun main() {\n  println("Hello, Kotlin!")\n}' },
    { title: 'Introduction to Kotlin', description: 'Learn why Kotlin is the preferred language for Android development and its key features like null safety, conciseness, and Java interoperability.', syntax: 'Modern JVM language', usage: 'Understand Kotlin benefits', code: '// Concise, Safe, Interoperable\n// Official Android language\n// Multiplatform support' },
    { title: 'Setup and Environment', description: 'Set up Kotlin with IntelliJ IDEA or Android Studio. Configure your first Kotlin project.', syntax: 'IDE setup, build.gradle', usage: 'Development environment', code: 'plugins {\n  kotlin("jvm") version "1.9.0"\n}\n\ndependencies {\n  implementation(kotlin("stdlib"))\n}' },
    { title: 'Kotlin Basics', description: 'Learn the basic syntax: functions, print statements, and running your first program.', syntax: 'fun main(), println()', usage: 'First program', code: 'fun main() {\n  println("Welcome to Kotlin")\n  val greeting = "Hello"\n  println(greeting)\n}' },
    { title: 'Variables and Data Types', description: 'Understand val (immutable) vs var (mutable) and basic types: Int, String, Double, Boolean.', syntax: 'val, var, Int, String', usage: 'Store data', code: 'val name: String = "Ada"\nvar age: Int = 25\nval pi = 3.14159\nvar isActive = true' },

    // BASICS (20 lessons)
    { title: 'Type Inference', description: 'Kotlin can infer types automatically, making code more concise without losing type safety.', syntax: 'Type inference', usage: 'Concise declarations', code: 'val name = "Kotlin" // String inferred\nval count = 42 // Int inferred\nval price = 19.99 // Double inferred' },
    { title: 'Strings and String Templates', description: 'Work with strings and use string templates for easy interpolation.', syntax: '$variable, ${expression}', usage: 'String manipulation', code: 'val name = "Ada"\nval age = 25\nprintln("Name: $name, Age: $age")\nprintln("Next year: ${age + 1}")' },
    { title: 'Numbers and Operators', description: 'Numeric types (Int, Long, Double, Float) and arithmetic operators.', syntax: '+, -, *, /, %', usage: 'Math operations', code: 'val x = 10\nval y = 3\nprintln(x + y) // 13\nprintln(x / y) // 3\nprintln(x % y) // 1' },
    { title: 'Booleans and Logic', description: 'Boolean type and logical operators for conditions.', syntax: '&&, ||, !, ==, !=', usage: 'Logic operations', code: 'val isAdult = age >= 18\nval hasPermission = true\nif (isAdult && hasPermission) {\n  println("Allowed")\n}' },
    { title: 'Null Safety', description: 'Nullable vs non-nullable types. Use safe calls (?.) and Elvis operator (?:) to handle nulls.', syntax: '?, ?., ?:, !!', usage: 'Avoid NullPointerException', code: 'var name: String? = null\nval length = name?.length ?: 0\nprintln(length) // 0' },
    { title: 'Control Flow - If and When', description: 'Use if expressions and when for branching logic.', syntax: 'if, when', usage: 'Conditional logic', code: 'val score = 85\nval grade = when {\n  score >= 90 -> "A"\n  score >= 80 -> "B"\n  else -> "C"\n}' },
    { title: 'Loops - For and While', description: 'Iterate with for loops (ranges, collections) and while loops.', syntax: 'for, while, do-while', usage: 'Iteration', code: 'for (i in 1..5) {\n  println(i)\n}\n\nvar x = 0\nwhile (x < 3) {\n  println(x++)\n}' },
    { title: 'Ranges', description: 'Create ranges with .. and use them in loops and conditions.', syntax: '1..10, 1 until 10, downTo', usage: 'Range expressions', code: 'val range = 1..5\nfor (i in 1..10 step 2) {\n  println(i)\n}\nif (5 in range) println("In range")' },
    { title: 'Functions', description: 'Define functions with fun keyword. Use return types and parameters.', syntax: 'fun name(params): ReturnType', usage: 'Reusable logic', code: 'fun add(a: Int, b: Int): Int {\n  return a + b\n}\n\nfun greet(name: String) = "Hello, $name"' },
    { title: 'Function Parameters', description: 'Default parameters, named arguments, and varargs.', syntax: 'default params, vararg', usage: 'Flexible functions', code: 'fun greet(name: String = "World", prefix: String = "Hello") {\n  println("$prefix, $name")\n}\n\ngreet()\ngreet(name = "Ada")' },
    { title: 'Lambda Expressions', description: 'Anonymous functions with concise syntax. Use them with higher-order functions.', syntax: '{ params -> body }', usage: 'Functional programming', code: 'val sum = { a: Int, b: Int -> a + b }\nprintln(sum(3, 4)) // 7\n\nval numbers = listOf(1, 2, 3)\nnumbers.forEach { println(it) }' },
    { title: 'Collections Overview', description: 'Immutable (List, Set, Map) vs mutable (MutableList, MutableSet, MutableMap) collections.', syntax: 'List, Set, Map', usage: 'Data structures', code: 'val list = listOf(1, 2, 3)\nval mutableList = mutableListOf(1, 2, 3)\nmutableList.add(4)' },
    { title: 'Lists', description: 'Work with lists: creation, access, iteration, and common operations.', syntax: 'listOf, get, size', usage: 'Ordered collections', code: 'val fruits = listOf("Apple", "Banana", "Cherry")\nprintln(fruits[0]) // Apple\nprintln(fruits.size) // 3\nfruits.forEach { println(it) }' },
    { title: 'Maps', description: 'Key-value pairs with mapOf. Access, iteration, and modification.', syntax: 'mapOf, get, put', usage: 'Key-value storage', code: 'val ages = mapOf("Ada" to 25, "Bob" to 30)\nprintln(ages["Ada"]) // 25\nages.forEach { (name, age) -> println("$name: $age") }' },
    { title: 'Sets', description: 'Unique elements with setOf. Operations like union, intersection, difference.', syntax: 'setOf, contains', usage: 'Unique collections', code: 'val numbers = setOf(1, 2, 3, 2)\nprintln(numbers.size) // 3\nprintln(2 in numbers) // true' },
    { title: 'Collection Operations', description: 'Functional operations: filter, map, reduce, flatMap, groupBy.', syntax: 'filter, map, reduce', usage: 'Transform collections', code: 'val numbers = listOf(1, 2, 3, 4)\nval evens = numbers.filter { it % 2 == 0 }\nval doubled = numbers.map { it * 2 }\nval sum = numbers.reduce { acc, n -> acc + n }' },
    { title: 'Classes and Objects', description: 'Define classes with properties and methods. Create object instances.', syntax: 'class, constructor', usage: 'Object-oriented programming', code: 'class Person(val name: String, var age: Int) {\n  fun greet() = "Hello, I am $name"\n}\n\nval person = Person("Ada", 25)\nprintln(person.greet())' },
    { title: 'Properties', description: 'Getters, setters, and backing fields for class properties.', syntax: 'get(), set(value)', usage: 'Custom property logic', code: 'class User {\n  var name: String = ""\n    get() = field.uppercase()\n    set(value) {\n      field = value.trim()\n    }\n}' },
    { title: 'Data Classes', description: 'Classes for holding data with auto-generated equals, hashCode, toString, and copy.', syntax: 'data class', usage: 'Model data', code: 'data class User(val id: Int, val name: String)\n\nval user = User(1, "Ada")\nval copy = user.copy(name = "Bob")\nprintln(user)' },
    { title: 'Inheritance', description: 'Extend classes with open keyword. Override methods and properties.', syntax: 'open, override', usage: 'Code reuse', code: 'open class Animal(val name: String) {\n  open fun sound() = "Some sound"\n}\n\nclass Dog(name: String) : Animal(name) {\n  override fun sound() = "Woof"\n}' },

    // INTERMEDIATE (10 lessons)
    { title: 'Interfaces', description: 'Define contracts with interfaces. Implement multiple interfaces.', syntax: 'interface, implement', usage: 'Abstraction', code: 'interface Clickable {\n  fun click()\n  fun showOff() = println("Clickable")\n}\n\nclass Button : Clickable {\n  override fun click() = println("Clicked")\n}' },
    { title: 'Abstract Classes', description: 'Abstract classes with abstract and concrete members.', syntax: 'abstract class', usage: 'Partial implementation', code: 'abstract class Shape {\n  abstract fun area(): Double\n  fun describe() = "A shape"\n}\n\nclass Circle(val radius: Double) : Shape() {\n  override fun area() = Math.PI * radius * radius\n}' },
    { title: 'Sealed Classes', description: 'Restricted class hierarchies for when expressions.', syntax: 'sealed class', usage: 'Represent restricted types', code: 'sealed class Result {\n  data class Success(val data: String) : Result()\n  data class Error(val error: String) : Result()\n}\n\nfun handle(result: Result) = when(result) {\n  is Result.Success -> println(result.data)\n  is Result.Error -> println(result.error)\n}' },
    { title: 'Object Declarations', description: 'Singleton objects with object keyword.', syntax: 'object', usage: 'Single instance', code: 'object Database {\n  fun connect() = println("Connected")\n}\n\nDatabase.connect()' },
    { title: 'Companion Objects', description: 'Factory methods and constants with companion object.', syntax: 'companion object', usage: 'Static-like members', code: 'class User(val id: Int, val name: String) {\n  companion object {\n    fun create(name: String) = User(0, name)\n  }\n}\n\nval user = User.create("Ada")' },
    { title: 'Extensions', description: 'Add functions and properties to existing classes without inheritance.', syntax: 'fun Type.functionName()', usage: 'Extend classes', code: 'fun String.isPalindrome(): Boolean {\n  return this == this.reversed()\n}\n\nprintln("madam".isPalindrome()) // true' },
    { title: 'Generics', description: 'Type parameters for classes, functions, and interfaces.', syntax: '<T>', usage: 'Type-safe code', code: 'class Box<T>(val value: T)\n\nfun <T> singletonList(item: T): List<T> {\n  return listOf(item)\n}\n\nval box = Box(42)\nval list = singletonList("Hello")' },
    { title: 'Enum Classes', description: 'Define a fixed set of constants with enum class.', syntax: 'enum class', usage: 'Represent states', code: 'enum class Direction {\n  NORTH, SOUTH, EAST, WEST\n}\n\nval dir = Direction.NORTH\nwhen(dir) {\n  Direction.NORTH -> println("Going north")\n  else -> println("Other direction")\n}' },
    { title: 'Coroutines Basics', description: 'Launch coroutines for asynchronous programming with launch and async.', syntax: 'launch, async, runBlocking', usage: 'Async operations', code: 'import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n  launch {\n    delay(1000)\n    println("World")\n  }\n  println("Hello")\n}' },
    { title: 'Suspend Functions', description: 'Create suspendable functions that can be paused and resumed.', syntax: 'suspend fun', usage: 'Async building blocks', code: 'suspend fun fetchData(): String {\n  delay(1000)\n  return "Data loaded"\n}\n\nfun main() = runBlocking {\n  val data = fetchData()\n  println(data)\n}' },

    // ADVANCED (7 lessons)
    { title: 'Coroutines Advanced', description: 'Structured concurrency, coroutine scopes, and dispatchers.', syntax: 'CoroutineScope, Dispatchers', usage: 'Production async code', code: 'GlobalScope.launch(Dispatchers.IO) {\n  val data = fetchData()\n  withContext(Dispatchers.Main) {\n    updateUI(data)\n  }\n}' },
    { title: 'Flow and Channels', description: 'Reactive streams with Flow for cold streams and Channels for hot streams.', syntax: 'Flow, Channel', usage: 'Stream processing', code: 'fun numbers(): Flow<Int> = flow {\n  for (i in 1..3) {\n    delay(100)\n    emit(i)\n  }\n}\n\nnumbers().collect { value -> println(value) }' },
    { title: 'Android Development', description: 'Build Android apps with Activities, Fragments, and ViewModels.', syntax: 'Activity, Fragment, ViewModel', usage: 'Android apps', code: 'class MainActivity : AppCompatActivity() {\n  override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(savedInstanceState)\n    setContentView(R.layout.activity_main)\n  }\n}' },
    { title: 'Jetpack Compose', description: 'Modern declarative UI toolkit for Android.', syntax: '@Composable, remember, State', usage: 'UI development', code: '@Composable\nfun Greeting(name: String) {\n  Text(text = "Hello $name!")\n}\n\n@Composable\nfun Counter() {\n  var count by remember { mutableStateOf(0) }\n  Button(onClick = { count++ }) {\n    Text("Clicked $count times")\n  }\n}' },
    { title: 'Ktor Server', description: 'Build server-side applications and REST APIs with Ktor.', syntax: 'embeddedServer, routing', usage: 'Backend services', code: 'fun main() {\n  embeddedServer(Netty, port = 8080) {\n    routing {\n      get("/") {\n        call.respondText("Hello, Ktor!")\n      }\n    }\n  }.start(wait = true)\n}' },
    { title: 'Testing', description: 'Unit testing with JUnit and MockK. UI testing with Espresso and Compose Test.', syntax: 'JUnit, MockK, Espresso', usage: 'Quality assurance', code: 'class CalculatorTest {\n  @Test\n  fun testAddition() {\n    val calc = Calculator()\n    assertEquals(4, calc.add(2, 2))\n  }\n}' },
    { title: 'Best Practices', description: 'Kotlin idioms, naming conventions, null safety best practices, and performance tips.', syntax: 'Coding standards', usage: 'Professional code', code: '// Use data classes for data\n// Prefer val over var\n// Use sealed classes for state\n// Leverage extension functions\n// Use coroutines for async' },
  ]
  return lessons
}

// General fallback
function generalSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} overview and how you will learn it quickly.`, syntax: 'basics', usage: 'Start here', code: '// welcome' },
    { title: 'Syntax Basics', description: 'Core syntax rules and style.', syntax: 'keywords, operators', usage: 'Write valid code', code: '// syntax sample' },
    { title: 'Variables and Data', description: 'Store and manipulate values.', syntax: 'vars, types', usage: 'Handle state', code: '// variables' },
    { title: 'Control Flow', description: 'Branching and looping constructs.', syntax: 'if/else, loops', usage: 'Direct execution', code: '// control flow' },
    { title: 'Functions', description: 'Encapsulate reusable logic.', syntax: 'def/function', usage: 'Reuse code', code: '// function sample' },
    { title: 'Modules', description: 'Import/export code across files.', syntax: 'modules/packages', usage: 'Organize code', code: '// module sample' },
    { title: 'Error Handling', description: 'Handle and log errors gracefully.', syntax: 'try/catch', usage: 'Robust apps', code: '// error handling' },
    { title: 'Testing', description: 'Basic tests for confidence.', syntax: 'assert/test', usage: 'Prevent regressions', code: '// test sample' },
    { title: 'Tooling', description: 'Linters, formatters, build tools.', syntax: 'lint, format', usage: 'Consistent code', code: '// tooling' },
    { title: 'Performance', description: 'Simple tips to keep programs fast.', syntax: 'profiling basics', usage: 'Efficient code', code: '// profile' },
    { title: 'Security Basics', description: 'Input validation and secrets handling.', syntax: 'validation, secrets', usage: 'Safe defaults', code: '// validate' },
    { title: 'Mini Project', description: 'Build a small end-to-end sample applying the concepts.', syntax: 'combine all topics', usage: 'Capstone', code: '// project' },
  ]
}
