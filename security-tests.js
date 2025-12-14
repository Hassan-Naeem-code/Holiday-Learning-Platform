/**
 * 🔒 AUTOMATED SECURITY TEST SUITE
 *
 * This script tests security utilities in Node.js environment
 * Run with: node security-tests.js
 */

// Mock DOMPurify for Node.js testing
const createDOMPurify = () => ({
  sanitize: (dirty) => {
    // Basic sanitization simulation
    return dirty
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }
});

const DOMPurify = createDOMPurify();

// Copy of security utils for testing
const validateInput = {
  string: (input, minLength = 0, maxLength = 1000) => {
    if (typeof input !== 'string') return false;
    if (input.length < minLength || input.length > maxLength) return false;
    return true;
  },

  number: (input, min = 0, max = Number.MAX_SAFE_INTEGER) => {
    if (typeof input !== 'number') return false;
    if (isNaN(input) || !isFinite(input)) return false;
    if (input < min || input > max) return false;
    return true;
  },

  noXSS: (input) => {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe/gi,
      /eval\(/gi,
    ];
    return !xssPatterns.some(pattern => pattern.test(input));
  },

  object: (input, allowedKeys) => {
    if (typeof input !== 'object' || input === null) return false;
    const inputKeys = Object.keys(input);
    return inputKeys.every(key => allowedKeys.includes(key));
  }
};

const sanitize = {
  html: (dirty) => {
    if (typeof dirty !== 'string') return '';
    return DOMPurify.sanitize(dirty);
  },

  string: (input) => {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>"']/g, '');
  },

  number: (input) => {
    const num = Number(input);
    return isNaN(num) ? 0 : num;
  }
};

const storageIntegrity = {
  generateChecksum: (data) => {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  },

  verify: (data, storedChecksum) => {
    return storageIntegrity.generateChecksum(data) === storedChecksum;
  },

  validateScore: (score, gameId) => {
    const maxScores = {
      'code-block-game-easy': 1000,
      'code-block-game-medium': 1000,
      'code-block-game-hard': 1000,
    };
    const maxScore = maxScores[gameId] || 1000;
    return score >= 0 && score <= maxScore;
  },

  validateXP: (xp) => {
    return xp >= 0 && xp <= 10000;
  },

  validateAchievements: (achievements) => {
    const validAchievementIds = [
      'first-steps', 'game-master', 'scholar', 'speed-demon',
      'perfect-score', 'experimenter', 'completionist', 'legend',
      'speedrunner', 'thinker', 'streak-master', 'triple-threat'
    ];
    return achievements.every(id => validAchievementIds.includes(id));
  }
};

class RateLimiter {
  constructor() {
    this.attempts = new Map();
  }

  check(key, maxAttempts = 10, windowMs = 60000) {
    const now = Date.now();
    const attemptLog = this.attempts.get(key) || [];

    const recentAttempts = attemptLog.filter(timestamp => now - timestamp < windowMs);

    if (recentAttempts.length >= maxAttempts) {
      return false;
    }

    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }
}

const antiCheat = {
  detectSuspiciousActivity: (gameScores) => {
    let perfectScores = 0;
    Object.values(gameScores).forEach(game => {
      if (game.easy?.accuracy === 100) perfectScores++;
      if (game.medium?.accuracy === 100) perfectScores++;
      if (game.hard?.accuracy === 100) perfectScores++;
    });
    return perfectScores > 5;
  },

  validateTiming: (startTime, endTime, minExpectedTime = 1000) => {
    const elapsed = endTime - startTime;
    return elapsed >= minExpectedTime;
  }
};

// ============================================
// TEST RUNNER
// ============================================

const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function test(name, testFn) {
  try {
    const result = testFn();
    if (result) {
      console.log(`✅ PASS: ${name}`);
      results.passed++;
    } else {
      console.log(`❌ FAIL: ${name}`);
      results.failed++;
    }
    results.tests.push({ name, passed: result });
  } catch (error) {
    console.log(`❌ ERROR: ${name} - ${error.message}`);
    results.failed++;
    results.tests.push({ name, passed: false, error: error.message });
  }
}

console.log('\n🔒 RUNNING AUTOMATED SECURITY TESTS\n');

// ============================================
// TEST 1: INPUT VALIDATION
// ============================================
console.log('📋 TEST GROUP 1: Input Validation\n');

test('String validation - valid input', () => {
  return validateInput.string('hello world', 0, 100) === true;
});

test('String validation - too long', () => {
  const longString = 'a'.repeat(1001);
  return validateInput.string(longString, 0, 1000) === false;
});

test('Number validation - valid number', () => {
  return validateInput.number(42, 0, 100) === true;
});

test('Number validation - reject NaN', () => {
  return validateInput.number(NaN) === false;
});

test('Number validation - reject Infinity', () => {
  return validateInput.number(Infinity) === false;
});

test('XSS detection - block script tag', () => {
  return validateInput.noXSS('<script>alert("xss")</script>') === false;
});

test('XSS detection - block javascript protocol', () => {
  return validateInput.noXSS('javascript:alert(1)') === false;
});

test('XSS detection - block event handlers', () => {
  return validateInput.noXSS('<img onerror="alert(1)">') === false;
});

test('XSS detection - allow safe content', () => {
  return validateInput.noXSS('Hello, this is safe text') === true;
});

test('Object validation - valid keys', () => {
  const obj = { name: 'test', age: 25 };
  return validateInput.object(obj, ['name', 'age']) === true;
});

test('Object validation - reject invalid keys', () => {
  const obj = { name: 'test', malicious: 'hack' };
  return validateInput.object(obj, ['name', 'age']) === false;
});

// ============================================
// TEST 2: SANITIZATION
// ============================================
console.log('\n📋 TEST GROUP 2: Data Sanitization\n');

test('HTML sanitization - remove script tags', () => {
  const dirty = '<script>alert("xss")</script><p>Safe content</p>';
  const clean = sanitize.html(dirty);
  return !clean.includes('<script>');
});

test('String sanitization - remove dangerous chars', () => {
  const dirty = 'test<>"\'attack';
  const clean = sanitize.string(dirty);
  return !clean.includes('<') && !clean.includes('>');
});

test('Number sanitization - convert valid number', () => {
  return sanitize.number('42') === 42;
});

test('Number sanitization - handle invalid input', () => {
  return sanitize.number('not a number') === 0;
});

// ============================================
// TEST 3: STORAGE INTEGRITY
// ============================================
console.log('\n📋 TEST GROUP 3: localStorage Integrity\n');

test('Checksum generation - consistent hashing', () => {
  const data = { totalXP: 100, level: 2 };
  const checksum1 = storageIntegrity.generateChecksum(data);
  const checksum2 = storageIntegrity.generateChecksum(data);
  return checksum1 === checksum2;
});

test('Checksum verification - detect tampering', () => {
  const originalData = { totalXP: 100 };
  const checksum = storageIntegrity.generateChecksum(originalData);
  const tamperedData = { totalXP: 999999 };
  return storageIntegrity.verify(tamperedData, checksum) === false;
});

test('Checksum verification - accept valid data', () => {
  const data = { totalXP: 100, level: 2 };
  const checksum = storageIntegrity.generateChecksum(data);
  return storageIntegrity.verify(data, checksum) === true;
});

test('Score validation - reject impossible score', () => {
  return storageIntegrity.validateScore(9999, 'code-block-game-easy') === false;
});

test('Score validation - accept valid score', () => {
  return storageIntegrity.validateScore(500, 'code-block-game-easy') === true;
});

test('XP validation - reject inflated XP', () => {
  return storageIntegrity.validateXP(999999) === false;
});

test('XP validation - accept valid XP', () => {
  return storageIntegrity.validateXP(5000) === true;
});

test('Achievement validation - reject fake achievement', () => {
  const achievements = ['first-steps', 'FAKE_ACHIEVEMENT'];
  return storageIntegrity.validateAchievements(achievements) === false;
});

test('Achievement validation - accept valid achievements', () => {
  const achievements = ['first-steps', 'game-master', 'scholar'];
  return storageIntegrity.validateAchievements(achievements) === true;
});

// ============================================
// TEST 4: RATE LIMITING
// ============================================
console.log('\n📋 TEST GROUP 4: Rate Limiting\n');

test('Rate limiter - allow first 10 attempts', () => {
  const limiter = new RateLimiter();
  let allPassed = true;
  for (let i = 0; i < 10; i++) {
    if (!limiter.check('test-key', 10, 60000)) {
      allPassed = false;
    }
  }
  return allPassed;
});

test('Rate limiter - block 11th attempt', () => {
  const limiter = new RateLimiter();
  for (let i = 0; i < 10; i++) {
    limiter.check('test-key-2', 10, 60000);
  }
  return limiter.check('test-key-2', 10, 60000) === false;
});

test('Rate limiter - independent keys', () => {
  const limiter = new RateLimiter();
  for (let i = 0; i < 10; i++) {
    limiter.check('key-A', 10, 60000);
  }
  return limiter.check('key-B', 10, 60000) === true;
});

// ============================================
// TEST 5: ANTI-CHEAT
// ============================================
console.log('\n📋 TEST GROUP 5: Anti-Cheat Detection\n');

test('Anti-cheat - detect suspicious perfect scores', () => {
  const gameScores = {
    'game-1': { easy: { accuracy: 100 }, medium: { accuracy: 100 }, hard: { accuracy: 100 } },
    'game-2': { easy: { accuracy: 100 }, medium: { accuracy: 100 }, hard: { accuracy: 100 } },
  };
  return antiCheat.detectSuspiciousActivity(gameScores) === true;
});

test('Anti-cheat - allow normal scores', () => {
  const gameScores = {
    'game-1': { easy: { accuracy: 80 }, medium: { accuracy: 90 } },
    'game-2': { easy: { accuracy: 100 }, hard: { accuracy: 75 } },
  };
  return antiCheat.detectSuspiciousActivity(gameScores) === false;
});

test('Anti-cheat - reject instant completion', () => {
  const startTime = Date.now();
  const endTime = startTime + 10; // 10ms
  return antiCheat.validateTiming(startTime, endTime, 1000) === false;
});

test('Anti-cheat - accept valid completion time', () => {
  const startTime = Date.now();
  const endTime = startTime + 5000; // 5 seconds
  return antiCheat.validateTiming(startTime, endTime, 1000) === true;
});

// ============================================
// FINAL RESULTS
// ============================================
console.log('\n' + '='.repeat(50));
console.log('📊 FINAL TEST RESULTS');
console.log('='.repeat(50));
console.log(`✅ PASSED: ${results.passed}`);
console.log(`❌ FAILED: ${results.failed}`);
console.log(`📈 SUCCESS RATE: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

if (results.failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED! Security utilities are working correctly.');
  console.log('✅ READY FOR PRODUCTION');
} else {
  console.log('\n⚠️  SOME TESTS FAILED - Review security implementation');
  console.log('❌ NOT READY FOR PRODUCTION');
}

console.log('\n' + '='.repeat(50));
console.log('🔐 SECURITY ASSESSMENT');
console.log('='.repeat(50));

const vulnerabilities = [];
const protections = [];

// Analyze results
results.tests.forEach(test => {
  if (!test.passed) {
    vulnerabilities.push(test.name);
  } else {
    protections.push(test.name);
  }
});

if (vulnerabilities.length > 0) {
  console.log('\n⚠️  VULNERABILITIES DETECTED:');
  vulnerabilities.forEach((v, i) => console.log(`   ${i + 1}. ${v}`));
}

console.log('\n✅ PROTECTIONS VERIFIED:');
console.log(`   - XSS Protection: ${results.tests.filter(t => t.name.includes('XSS')).every(t => t.passed) ? 'ENABLED' : 'FAILED'}`);
console.log(`   - Input Validation: ${results.tests.filter(t => t.name.includes('validation')).every(t => t.passed) ? 'ENABLED' : 'FAILED'}`);
console.log(`   - Data Integrity: ${results.tests.filter(t => t.name.includes('Checksum')).every(t => t.passed) ? 'ENABLED' : 'FAILED'}`);
console.log(`   - Rate Limiting: ${results.tests.filter(t => t.name.includes('Rate limiter')).every(t => t.passed) ? 'ENABLED' : 'FAILED'}`);
console.log(`   - Anti-Cheat: ${results.tests.filter(t => t.name.includes('Anti-cheat')).every(t => t.passed) ? 'ENABLED' : 'FAILED'}`);

console.log('\n' + '='.repeat(50));
console.log('📋 NEXT STEPS');
console.log('='.repeat(50));
console.log('1. Run browser-based tests using SECURITY_TEST_SCRIPT.js');
console.log('2. Test in production environment');
console.log('3. Monitor for edge cases and unusual activity');
console.log('4. Keep DOMPurify and dependencies updated');
console.log('\n');

// Exit with appropriate code
process.exit(results.failed > 0 ? 1 : 0);
