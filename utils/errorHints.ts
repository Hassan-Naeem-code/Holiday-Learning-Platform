// Error hints utility: provides contextual help for common programming errors

export interface ErrorHint {
  pattern: RegExp
  hint: string
  suggestion?: string
}

// Common error patterns and hints by language
export const ERROR_HINTS: Record<string, ErrorHint[]> = {
  javascript: [
    {
      pattern: /ReferenceError: (\w+) is not defined/i,
      hint: 'Variable or function "$1" hasn\'t been declared.',
      suggestion: 'Make sure to declare variables with let, const, or var before using them.'
    },
    {
      pattern: /SyntaxError: Unexpected token/i,
      hint: 'There\'s a syntax error in your code: possibly a missing or extra bracket, parenthesis, or quote.',
      suggestion: 'Check for matching brackets {}, parentheses (), and quotes "" or \'\'.'
    },
    {
      pattern: /TypeError: Cannot read propert(y|ies) of undefined/i,
      hint: 'You\'re trying to access a property of something that is undefined.',
      suggestion: 'Check if the object or array exists before accessing its properties.'
    },
    {
      pattern: /TypeError: Cannot read propert(y|ies) of null/i,
      hint: 'You\'re trying to access a property of null.',
      suggestion: 'The value you\'re accessing is null. Add a null check before accessing properties.'
    },
    {
      pattern: /TypeError: (\w+) is not a function/i,
      hint: '"$1" is not a function - it might be undefined or a different type.',
      suggestion: 'Make sure the function is defined and spelled correctly.'
    },
    {
      pattern: /SyntaxError: Unexpected end of input/i,
      hint: 'Your code is incomplete: possibly missing a closing bracket or parenthesis.',
      suggestion: 'Check that all opening brackets {, (, [ have matching closing brackets }, ), ].'
    },
    {
      pattern: /RangeError: Maximum call stack size exceeded/i,
      hint: 'Infinite recursion detected - a function is calling itself without stopping.',
      suggestion: 'Add a base case to stop the recursion.'
    },
    {
      pattern: /SyntaxError: Identifier .* has already been declared/i,
      hint: 'You\'re trying to declare a variable that already exists in this scope.',
      suggestion: 'Use a different variable name or remove the duplicate declaration.'
    }
  ],

  typescript: [
    {
      pattern: /error TS\d+: Cannot find name '(\w+)'/i,
      hint: 'TypeScript cannot find "$1": it may not be imported or declared.',
      suggestion: 'Import the missing module or declare the variable/type.'
    },
    {
      pattern: /Type '(.+)' is not assignable to type '(.+)'/i,
      hint: 'Type mismatch: expected "$2" but got "$1".',
      suggestion: 'Check that you\'re using the correct type or add a type conversion.'
    },
    {
      pattern: /Property '(\w+)' does not exist on type/i,
      hint: 'Property "$1" doesn\'t exist on this type.',
      suggestion: 'Check the spelling or add the property to the type definition.'
    },
    {
      pattern: /error TS\d+: Parameter '(\w+)' implicitly has an 'any' type/i,
      hint: 'TypeScript needs a type for parameter "$1".',
      suggestion: 'Add a type annotation like: function name(param: Type) {}'
    }
  ],

  python: [
    {
      pattern: /NameError: name '(\w+)' is not defined/i,
      hint: 'Variable or function "$1" hasn\'t been defined.',
      suggestion: 'Make sure to define variables before using them.'
    },
    {
      pattern: /IndentationError: (expected an indented block|unexpected indent)/i,
      hint: 'Python uses indentation to define code blocks.',
      suggestion: 'Use consistent indentation (4 spaces is recommended) after if, for, while, def, class statements.'
    },
    {
      pattern: /SyntaxError: invalid syntax/i,
      hint: 'There\'s a syntax error in your code.',
      suggestion: 'Check for missing colons after if/for/while/def/class, matching parentheses, and proper indentation.'
    },
    {
      pattern: /TypeError: '(\w+)' object is not (callable|subscriptable|iterable)/i,
      hint: 'You\'re trying to use "$1" incorrectly.',
      suggestion: 'Check if you\'re calling a non-function or indexing a non-list/dict.'
    },
    {
      pattern: /IndexError: (list|string) index out of range/i,
      hint: 'You\'re trying to access an index that doesn\'t exist.',
      suggestion: 'Check that your index is within the valid range (0 to len-1).'
    },
    {
      pattern: /KeyError: '?(\w+)'?/i,
      hint: 'Key "$1" doesn\'t exist in the dictionary.',
      suggestion: 'Use .get("key", default) to safely access dictionary values.'
    },
    {
      pattern: /ZeroDivisionError/i,
      hint: 'You\'re trying to divide by zero.',
      suggestion: 'Add a check to ensure the divisor is not zero before dividing.'
    },
    {
      pattern: /ModuleNotFoundError: No module named '(\w+)'/i,
      hint: 'Module "$1" is not installed or doesn\'t exist.',
      suggestion: 'Install the module with pip or check the module name spelling.'
    }
  ],

  java: [
    {
      pattern: /error: cannot find symbol/i,
      hint: 'Java cannot find a variable, method, or class you\'re using.',
      suggestion: 'Check spelling, imports, and ensure variables are declared before use.'
    },
    {
      pattern: /error: ';' expected/i,
      hint: 'Missing semicolon at the end of a statement.',
      suggestion: 'Add a semicolon (;) at the end of each statement in Java.'
    },
    {
      pattern: /error: class .* is public, should be declared in a file named/i,
      hint: 'Public class name must match the file name.',
      suggestion: 'Rename the class to "Main" or change the file accordingly.'
    },
    {
      pattern: /NullPointerException/i,
      hint: 'You\'re trying to use an object that is null.',
      suggestion: 'Check if the object is null before using it.'
    },
    {
      pattern: /ArrayIndexOutOfBoundsException/i,
      hint: 'Array index is out of bounds.',
      suggestion: 'Make sure your index is between 0 and array.length: 1.'
    },
    {
      pattern: /error: incompatible types/i,
      hint: 'Type mismatch: you\'re assigning a value of the wrong type.',
      suggestion: 'Check that variable types match or add explicit type casting.'
    }
  ],

  go: [
    {
      pattern: /undefined: (\w+)/i,
      hint: '"$1" is undefined: it hasn\'t been declared.',
      suggestion: 'Declare the variable or function before using it.'
    },
    {
      pattern: /syntax error: unexpected/i,
      hint: 'Go encountered unexpected syntax.',
      suggestion: 'Check for missing braces, parentheses, or incorrect statement structure.'
    },
    {
      pattern: /declared but not used/i,
      hint: 'Go requires all declared variables to be used.',
      suggestion: 'Either use the variable or remove it. Use _ for intentionally unused values.'
    },
    {
      pattern: /cannot use .* as .* in/i,
      hint: 'Type mismatch in Go.',
      suggestion: 'Convert the value to the expected type.'
    }
  ],

  rust: [
    {
      pattern: /error\[E0425\]: cannot find value `(\w+)`/i,
      hint: 'Cannot find value "$1" in this scope.',
      suggestion: 'Declare the variable with let or const before using it.'
    },
    {
      pattern: /error\[E0382\]: borrow of moved value/i,
      hint: 'You\'re trying to use a value after it has been moved.',
      suggestion: 'Clone the value if you need to use it multiple times, or use references.'
    },
    {
      pattern: /error\[E0308\]: mismatched types/i,
      hint: 'Type mismatch in Rust.',
      suggestion: 'Check that types match or add explicit type conversion.'
    },
    {
      pattern: /error\[E0599\]: no method named `(\w+)`/i,
      hint: 'Method "$1" doesn\'t exist on this type.',
      suggestion: 'Check the spelling or ensure the trait is in scope.'
    }
  ],

  ruby: [
    {
      pattern: /NameError: undefined local variable or method `(\w+)'/i,
      hint: '"$1" is not defined.',
      suggestion: 'Define the variable or method before using it.'
    },
    {
      pattern: /SyntaxError: unexpected/i,
      hint: 'Ruby encountered a syntax error.',
      suggestion: 'Check for missing end keywords, parentheses, or incorrect syntax.'
    },
    {
      pattern: /NoMethodError: undefined method `(\w+)'/i,
      hint: 'Method "$1" doesn\'t exist.',
      suggestion: 'Check the method name spelling or ensure it\'s defined.'
    }
  ],

  php: [
    {
      pattern: /Parse error: syntax error/i,
      hint: 'PHP syntax error detected.',
      suggestion: 'Check for missing semicolons, brackets, or incorrect PHP tags <?php ?>.'
    },
    {
      pattern: /Undefined variable: (\w+)/i,
      hint: 'Variable "$1" is not defined.',
      suggestion: 'Define the variable before using it. Variable names in PHP start with $.'
    },
    {
      pattern: /Call to undefined function (\w+)/i,
      hint: 'Function "$1" doesn\'t exist.',
      suggestion: 'Check the function name spelling or include the required file.'
    }
  ],

  c: [
    {
      pattern: /error: '(\w+)' undeclared/i,
      hint: '"$1" hasn\'t been declared.',
      suggestion: 'Declare variables at the start of your function or include the necessary header.'
    },
    {
      pattern: /error: expected ';' before/i,
      hint: 'Missing semicolon in your code.',
      suggestion: 'C requires semicolons at the end of each statement.'
    },
    {
      pattern: /Segmentation fault/i,
      hint: 'Memory access error: you\'re accessing invalid memory.',
      suggestion: 'Check for null pointers, array bounds, and uninitialized pointers.'
    }
  ],

  cpp: [
    {
      pattern: /error: '(\w+)' was not declared in this scope/i,
      hint: '"$1" hasn\'t been declared in this scope.',
      suggestion: 'Declare the variable or include the necessary header file.'
    },
    {
      pattern: /error: no matching function for call to/i,
      hint: 'No function matches the arguments you provided.',
      suggestion: 'Check the function signature and argument types.'
    },
    {
      pattern: /Segmentation fault/i,
      hint: 'Memory access error: accessing invalid memory.',
      suggestion: 'Check for null pointers, array bounds, and proper memory allocation.'
    }
  ]
}

// Generic hints for any language
export const GENERIC_HINTS: ErrorHint[] = [
  {
    pattern: /timeout|timed out/i,
    hint: 'Your code took too long to execute.',
    suggestion: 'Check for infinite loops or reduce the complexity of your algorithm.'
  },
  {
    pattern: /memory|out of memory|heap/i,
    hint: 'Your code used too much memory.',
    suggestion: 'Avoid creating very large data structures or storing too much data.'
  },
  {
    pattern: /permission denied/i,
    hint: 'Permission denied: the operation is not allowed.',
    suggestion: 'Some system operations are restricted for security reasons.'
  }
]

/**
 * Get contextual hints for an error message based on the language
 */
export function getErrorHints(errorMessage: string, language: string): { hint: string; suggestion?: string } | null {
  // Normalize language name
  const normalizedLanguage = language.toLowerCase().replace(/[^a-z]/g, '')

  // Check language-specific hints
  const languageHints = ERROR_HINTS[normalizedLanguage] || []
  for (const hintConfig of languageHints) {
    const match = errorMessage.match(hintConfig.pattern)
    if (match) {
      // Replace placeholders in hint with matched groups
      let hint = hintConfig.hint
      for (let i = 1; i < match.length; i++) {
        hint = hint.replace(`$${i}`, match[i] || '')
      }
      return { hint, suggestion: hintConfig.suggestion }
    }
  }

  // Check generic hints
  for (const hintConfig of GENERIC_HINTS) {
    if (hintConfig.pattern.test(errorMessage)) {
      return { hint: hintConfig.hint, suggestion: hintConfig.suggestion }
    }
  }

  return null
}

/**
 * Format an error message with contextual hints
 */
export function formatErrorWithHints(errorMessage: string, language: string): string {
  const hints = getErrorHints(errorMessage, language)

  if (hints) {
    let formatted = errorMessage
    formatted += `\n\n💡 Hint: ${hints.hint}`
    if (hints.suggestion) {
      formatted += `\n📝 Suggestion: ${hints.suggestion}`
    }
    return formatted
  }

  return errorMessage
}
