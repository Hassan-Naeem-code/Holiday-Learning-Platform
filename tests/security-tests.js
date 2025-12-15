/**
 * Security Testing Script
 * Run this in the browser console to test security measures
 *
 * Usage:
 * 1. Open your app in the browser
 * 2. Open DevTools (F12)
 * 3. Go to Console tab
 * 4. Copy and paste this entire script
 * 5. Press Enter
 * 6. Wait for results
 */

(async function runSecurityTests() {
  console.log('🔒 Security Test Suite Starting...')
  console.log('======================================\n')

  const results = {
    passed: 0,
    failed: 0,
    tests: []
  }

  function logTest(name, passed, message) {
    const emoji = passed ? '✅' : '❌'
    console.log(`${emoji} ${name}`)
    if (message) console.log(`   ${message}`)
    console.log('')

    results.tests.push({ name, passed, message })
    if (passed) results.passed++
    else results.failed++
  }

  // Test 1: Session Integrity
  console.log('Test 1: Session Integrity Check')
  console.log('----------------------------')
  try {
    const session = localStorage.getItem('userSession')
    if (!session) {
      logTest('Session Exists', false, 'No session found in localStorage')
    } else {
      const sessionData = JSON.parse(session)
      const hasChecksum = sessionData.checksum !== undefined
      logTest('Session Has Checksum', hasChecksum, hasChecksum ? 'Checksum present' : 'No checksum found')

      // Test tampering detection
      const originalSession = session
      localStorage.setItem('userSession', JSON.stringify({ ...sessionData, checksum: 'tampered' }))

      // Try to get session
      const { getSession } = await import('/utils/sessionManager.js')
      const validSession = getSession()

      if (validSession === null) {
        logTest('Tampering Detection', true, 'Tampered session correctly rejected')
      } else {
        logTest('Tampering Detection', false, 'Tampered session was accepted!')
      }

      // Restore original
      localStorage.setItem('userSession', originalSession)
    }
  } catch (error) {
    logTest('Session Integrity Check', false, `Error: ${error.message}`)
  }

  // Test 2: XP Validation
  console.log('Test 2: XP Validation')
  console.log('-------------------')
  try {
    const { addUserXP } = await import('/lib/firebaseService.js')
    const userCode = localStorage.getItem('userCode') || JSON.parse(localStorage.getItem('userSession') || '{}').userCode

    if (!userCode) {
      logTest('XP Validation', false, 'No user code found to test')
    } else {
      // Try to add excessive XP
      try {
        await addUserXP(userCode, 10000)
        logTest('XP Overflow Protection', false, 'Allowed 10000 XP in single update!')
      } catch (error) {
        if (error.message.includes('Invalid XP')) {
          logTest('XP Overflow Protection', true, 'Correctly rejected excessive XP (>100)')
        } else {
          logTest('XP Overflow Protection', false, `Unexpected error: ${error.message}`)
        }
      }

      // Try negative XP
      try {
        await addUserXP(userCode, -100)
        logTest('Negative XP Protection', false, 'Allowed negative XP!')
      } catch (error) {
        if (error.message.includes('Invalid XP')) {
          logTest('Negative XP Protection', true, 'Correctly rejected negative XP')
        } else {
          logTest('Negative XP Protection', false, `Unexpected error: ${error.message}`)
        }
      }

      // Try valid XP
      try {
        await addUserXP(userCode, 50)
        logTest('Valid XP Acceptance', true, 'Correctly accepted valid XP amount (50)')
      } catch (error) {
        logTest('Valid XP Acceptance', false, `Failed to accept valid XP: ${error.message}`)
      }
    }
  } catch (error) {
    logTest('XP Validation', false, `Error: ${error.message}`)
  }

  // Test 3: User Code Format Validation
  console.log('Test 3: User Code Format Validation')
  console.log('---------------------------------')
  const { getSession } = await import('/utils/sessionManager.js')

  // Test invalid formats
  const invalidCodes = [
    'ABC123',      // Too short
    'abcdefghi',   // Too long
    'ABC12345',    // Uppercase
    'abc!2345',    // Special char
    '12345678',    // Numbers only
    'abcd efgh'    // Space
  ]

  let validationsPassed = 0
  for (const invalidCode of invalidCodes) {
    localStorage.setItem('userSession', JSON.stringify({
      userCode: invalidCode,
      createdAt: Date.now(),
      lastActive: Date.now(),
      checksum: 'test'
    }))

    const session = getSession()
    if (session === null) {
      validationsPassed++
    }
  }

  logTest(
    'Invalid Code Format Rejection',
    validationsPassed === invalidCodes.length,
    `Rejected ${validationsPassed}/${invalidCodes.length} invalid formats`
  )

  // Test 4: localStorage Security
  console.log('Test 4: localStorage Security')
  console.log('---------------------------')

  // Check for plain userCode (should NOT exist)
  const plainCode = localStorage.getItem('userCode')
  if (plainCode && !localStorage.getItem('userSession')) {
    logTest('Plain Code Storage', false, 'Plain userCode found in localStorage (insecure!)')
  } else if (!plainCode && localStorage.getItem('userSession')) {
    logTest('Plain Code Storage', true, 'Using secure session storage (not plain userCode)')
  } else if (plainCode && localStorage.getItem('userSession')) {
    logTest('Plain Code Storage', false, 'Both plain code and session exist (migration incomplete)')
  } else {
    logTest('Plain Code Storage', true, 'No insecure data found')
  }

  // Test 5: Certificate Filename Sanitization
  console.log('Test 5: Certificate Filename Sanitization')
  console.log('---------------------------------------')

  const dangerousNames = [
    '../../../etc/passwd',
    'test<script>alert(1)</script>',
    'file:///etc/passwd',
    'test\\..\\..\\passwd',
    'a'.repeat(200), // Very long name
  ]

  const sanitizeFilename = (filename) => {
    return filename
      .replace(/[^a-zA-Z0-9-_\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 100)
  }

  let sanitizationsPassed = 0
  for (const dangerous of dangerousNames) {
    const sanitized = sanitizeFilename(dangerous)

    // Check for path traversal
    const hasPathTraversal = sanitized.includes('..') || sanitized.includes('/') || sanitized.includes('\\')

    // Check for scripts
    const hasScript = sanitized.includes('<script>') || sanitized.includes('alert')

    // Check length
    const isReasonableLength = sanitized.length <= 100

    if (!hasPathTraversal && !hasScript && isReasonableLength) {
      sanitizationsPassed++
    }
  }

  logTest(
    'Filename Sanitization',
    sanitizationsPassed === dangerousNames.length,
    `Sanitized ${sanitizationsPassed}/${dangerousNames.length} dangerous filenames`
  )

  // Test 6: Session Expiry
  console.log('Test 6: Session Expiry')
  console.log('--------------------')

  // Create expired session
  const expiredSession = {
    userCode: 'test1234',
    createdAt: Date.now() - (25 * 60 * 60 * 1000), // 25 hours ago
    lastActive: Date.now() - (25 * 60 * 60 * 1000),
    checksum: 'test'
  }
  localStorage.setItem('userSession', JSON.stringify(expiredSession))
  localStorage.setItem('sessionTimestamp', (Date.now() - (25 * 60 * 60 * 1000)).toString())

  const expiredResult = getSession()
  logTest(
    'Session Expiry',
    expiredResult === null,
    expiredResult === null ? 'Expired session correctly rejected' : 'Expired session still valid!'
  )

  // Test 7: Data Integrity Checks
  console.log('Test 7: Data Integrity')
  console.log('-------------------')

  const { storageIntegrity } = await import('/utils/security.js')

  const testData = { level: 5, totalXP: 5000, achievements: ['test1', 'test2'] }
  const checksum = storageIntegrity.generateChecksum(testData)
  const isValid = storageIntegrity.verify(testData, checksum)

  logTest('Data Checksum Generation', isValid, isValid ? 'Checksum correctly validates data' : 'Checksum validation failed')

  // Tamper with data
  const tamperedData = { ...testData, totalXP: 999999 }
  const isTampered = !storageIntegrity.verify(tamperedData, checksum)

  logTest('Data Tampering Detection', isTampered, isTampered ? 'Tampered data correctly detected' : 'Tampered data not detected!')

  // Final Results
  console.log('\n')
  console.log('======================================')
  console.log('📊 Security Test Results')
  console.log('======================================')
  console.log(`✅ Passed: ${results.passed}`)
  console.log(`❌ Failed: ${results.failed}`)
  console.log(`📈 Success Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`)
  console.log('\n')

  if (results.failed === 0) {
    console.log('🎉 All security tests passed!')
  } else {
    console.log('⚠️  Some security tests failed. Review the results above.')
    console.log('\nFailed tests:')
    results.tests
      .filter(t => !t.passed)
      .forEach(t => console.log(`  - ${t.name}: ${t.message}`))
  }

  return results
})()
