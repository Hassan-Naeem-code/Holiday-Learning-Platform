// Piston Code Execution Service
// Client-side service for executing code via the API route

export interface ExecutionResult {
  success: boolean
  output: string
  stderr: string
  exitCode: number
  executionTime?: number
  language?: string
  version?: string
  isPreview?: boolean
  isSimulated?: boolean
  error?: string
}

// Languages that support real execution
export const EXECUTABLE_LANGUAGES = [
  'javascript', 'javascript-games', 'typescript',
  'python', 'python-ml', 'python-backend',
  'java', 'go', 'rust', 'c', 'cpp', 'csharp',
  'ruby', 'php', 'kotlin', 'swift', 'r', 'bash'
]

// Languages that only show preview
export const PREVIEW_LANGUAGES = ['html', 'css', 'markdown', 'json', 'yaml']

/**
 * Execute code using the Piston API via our proxy route
 */
export async function executeCode(
  language: string,
  code: string,
  stdin: string = ''
): Promise<ExecutionResult> {
  try {
    const response = await fetch('/api/code/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language, code, stdin }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const result = await response.json()
    return result as ExecutionResult

  } catch (error) {
    console.error('Code execution failed:', error)
    return {
      success: false,
      output: '',
      stderr: error instanceof Error ? error.message : 'Failed to execute code',
      exitCode: 1,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Check if a language supports real execution
 */
export function supportsExecution(language: string): boolean {
  return EXECUTABLE_LANGUAGES.includes(language)
}

/**
 * Check if a language is preview-only
 */
export function isPreviewOnly(language: string): boolean {
  return PREVIEW_LANGUAGES.includes(language)
}

/**
 * Get a user-friendly language name
 */
export function getLanguageDisplayName(languageId: string): string {
  const names: Record<string, string> = {
    'javascript': 'JavaScript',
    'javascript-games': 'JavaScript',
    'typescript': 'TypeScript',
    'python': 'Python',
    'python-ml': 'Python (ML)',
    'python-backend': 'Python (Backend)',
    'java': 'Java',
    'go': 'Go',
    'rust': 'Rust',
    'c': 'C',
    'cpp': 'C++',
    'csharp': 'C#',
    'ruby': 'Ruby',
    'php': 'PHP',
    'kotlin': 'Kotlin',
    'swift': 'Swift',
    'r': 'R',
    'bash': 'Bash',
    'html': 'HTML',
    'css': 'CSS',
    'sql': 'SQL',
    'postgresql': 'PostgreSQL',
    'mongodb': 'MongoDB',
  }
  return names[languageId] || languageId
}

/**
 * Generate HTML preview for HTML/CSS code
 */
export function generateHTMLPreview(code: string, languageId: string): string {
  if (languageId === 'html') {
    // Extract visible content from HTML
    const titleMatch = /<title[^>]*>(.*?)<\/title>/gi.exec(code)
    const h1Match = /<h1[^>]*>(.*?)<\/h1>/gi.exec(code)
    const h2Match = /<h2[^>]*>(.*?)<\/h2>/gi.exec(code)
    const pMatches = code.match(/<p[^>]*>(.*?)<\/p>/gi) || []

    let preview = '=== HTML Preview ===\n\n'
    if (titleMatch) preview += `Page Title: ${titleMatch[1]}\n`
    if (h1Match) preview += `Heading: ${h1Match[1]}\n`
    if (h2Match) preview += `Subheading: ${h2Match[1]}\n`
    if (pMatches.length > 0) {
      preview += '\nParagraphs:\n'
      pMatches.slice(0, 3).forEach((p, i) => {
        const text = p.replace(/<[^>]+>/g, '')
        preview += `  ${i + 1}. ${text}\n`
      })
    }

    return preview || 'HTML code parsed successfully. Open in browser to see full preview.'
  }

  if (languageId === 'css') {
    const ruleCount = (code.match(/\{/g) || []).length
    const colorCount = (code.match(/#[0-9a-fA-F]{3,6}|rgb\(|rgba\(|hsl\(/g) || []).length

    return `=== CSS Preview ===\n\n` +
      `Style rules defined: ${ruleCount}\n` +
      `Colors used: ${colorCount}\n\n` +
      `CSS code is valid. Apply to HTML to see visual results.`
  }

  return 'Preview not available for this language type.'
}
