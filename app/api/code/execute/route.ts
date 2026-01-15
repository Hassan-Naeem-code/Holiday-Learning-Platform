import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/utils/rateLimit'

// Piston API endpoint (can be overridden via env)
const PISTON_API = process.env.PISTON_API_URL || 'https://emkc.org/api/v2/piston/execute'

// Request timeout in milliseconds
const REQUEST_TIMEOUT = 30000

// Language mapping from platform IDs to Piston language names
const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  // JavaScript/TypeScript
  'javascript': { language: 'javascript', version: '18.15.0' },
  'javascript-games': { language: 'javascript', version: '18.15.0' },
  'typescript': { language: 'typescript', version: '5.0.3' },

  // Python
  'python': { language: 'python', version: '3.10.0' },
  'python-ml': { language: 'python', version: '3.10.0' },
  'python-backend': { language: 'python', version: '3.10.0' },

  // Java
  'java': { language: 'java', version: '15.0.2' },

  // Go
  'go': { language: 'go', version: '1.16.2' },

  // Rust
  'rust': { language: 'rust', version: '1.68.2' },

  // C/C++
  'c': { language: 'c', version: '10.2.0' },
  'cpp': { language: 'cpp', version: '10.2.0' },

  // C#
  'csharp': { language: 'csharp', version: '6.12.0' },

  // Ruby
  'ruby': { language: 'ruby', version: '3.0.1' },

  // PHP
  'php': { language: 'php', version: '8.2.3' },

  // Kotlin
  'kotlin': { language: 'kotlin', version: '1.8.20' },

  // Swift
  'swift': { language: 'swift', version: '5.3.3' },

  // R
  'r': { language: 'r', version: '4.1.1' },

  // SQL (simulated - Piston doesn't support SQL)
  'sql': { language: 'sqlite3', version: '3.36.0' },
  'postgresql': { language: 'sqlite3', version: '3.36.0' },
  'mongodb': { language: 'javascript', version: '18.15.0' },

  // Bash
  'bash': { language: 'bash', version: '5.2.0' },
}

// Languages that should use simulated preview (not executed)
const PREVIEW_ONLY_LANGUAGES = ['html', 'css', 'markdown', 'json', 'yaml']

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request)
    const rateLimit = checkRateLimit(`code-exec:${clientId}`, RATE_LIMITS.codeExecution)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment before trying again.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          }
        }
      )
    }

    const body = await request.json()
    const { language, code, stdin = '' } = body

    if (!language || !code) {
      return NextResponse.json(
        { success: false, error: 'Language and code are required' },
        { status: 400 }
      )
    }

    // Check if this is a preview-only language
    if (PREVIEW_ONLY_LANGUAGES.includes(language)) {
      return NextResponse.json({
        success: true,
        output: `[Preview Mode]\n\nThis language (${language}) shows a preview rather than execution.\n\nYour code:\n${code.substring(0, 500)}${code.length > 500 ? '...' : ''}`,
        stderr: '',
        exitCode: 0,
        executionTime: 0,
        isPreview: true
      })
    }

    // Get Piston language config
    const pistonConfig = LANGUAGE_MAP[language]

    if (!pistonConfig) {
      return NextResponse.json({
        success: true,
        output: `[Simulated Output]\n\nLanguage "${language}" is not yet supported for real execution.\nShowing simulated output for demonstration purposes.`,
        stderr: '',
        exitCode: 0,
        executionTime: 0,
        isSimulated: true
      })
    }

    // Execute code via Piston API with timeout
    const startTime = Date.now()
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

    let pistonResponse: Response
    try {
      pistonResponse = await fetch(PISTON_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: pistonConfig.language,
          version: pistonConfig.version,
          files: [
            {
              name: getFileName(pistonConfig.language),
              content: code
            }
          ],
          stdin: stdin,
          compile_timeout: 10000,
          run_timeout: 5000,
          compile_memory_limit: -1,
          run_memory_limit: -1
        }),
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeoutId)
    }

    const executionTime = Date.now() - startTime

    if (!pistonResponse.ok) {
      console.error('Piston API error:', pistonResponse.status)
      return NextResponse.json({
        success: false,
        error: 'Code execution service temporarily unavailable. Please try again.',
        executionTime
      })
    }

    const result = await pistonResponse.json()

    // Handle compilation errors
    if (result.compile && result.compile.code !== 0) {
      return NextResponse.json({
        success: false,
        output: '',
        stderr: result.compile.stderr || result.compile.output || 'Compilation failed',
        exitCode: result.compile.code,
        executionTime,
        stage: 'compile'
      })
    }

    // Handle runtime results
    const runResult = result.run || {}
    const output = runResult.stdout || runResult.output || ''
    const stderr = runResult.stderr || ''
    const exitCode = runResult.code ?? 0

    return NextResponse.json({
      success: exitCode === 0,
      output: output || (exitCode === 0 ? 'Program executed successfully (no output)' : ''),
      stderr,
      exitCode,
      executionTime,
      language: pistonConfig.language,
      version: pistonConfig.version
    })

  } catch (error) {
    // Log server-side only
    console.error('Code execution error:', error instanceof Error ? error.message : 'Unknown')

    // Check if it was a timeout
    const isTimeout = error instanceof Error && error.name === 'AbortError'

    return NextResponse.json(
      {
        success: false,
        error: isTimeout
          ? 'Code execution timed out. Please simplify your code and try again.'
          : 'Code execution failed. Please try again.',
        output: '',
        stderr: '',
        exitCode: 1
      },
      { status: 500 }
    )
  }
}

function getFileName(language: string): string {
  const extensions: Record<string, string> = {
    'javascript': 'main.js',
    'typescript': 'main.ts',
    'python': 'main.py',
    'java': 'Main.java',
    'go': 'main.go',
    'rust': 'main.rs',
    'c': 'main.c',
    'cpp': 'main.cpp',
    'csharp': 'Main.cs',
    'ruby': 'main.rb',
    'php': 'main.php',
    'kotlin': 'Main.kt',
    'swift': 'main.swift',
    'r': 'main.r',
    'bash': 'main.sh',
    'sqlite3': 'main.sql',
  }
  return extensions[language] || 'main.txt'
}
