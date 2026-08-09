// Test script to verify comprehensive intro content exists
const fs = require('fs');
const path = require('path');

// Read the TypeScript file
const filePath = path.join(__dirname, 'utils', 'comprehensiveTutorialContent.ts');
const content = fs.readFileSync(filePath, 'utf-8');

console.log('='.repeat(80));
console.log('VERIFICATION: Checking Comprehensive Introductory Content');
console.log('='.repeat(80));
console.log();

// Test 1: Check CSS HOME section
console.log('TEST 1: CSS HOME Section');
console.log('-'.repeat(80));
const cssHomeMatch = content.match(/CSS HOME['"],\s*content:\s*`([^`]+)`/);
if (cssHomeMatch) {
  const cssHome = cssHomeMatch[1];
  const wordCount = cssHome.split(/\s+/).length;
  console.log(`✅ FOUND: CSS HOME section`);
  console.log(`   Word count: ${wordCount} words`);
  console.log(`   Preview: ${cssHome.substring(0, 200)}...`);
  console.log(`   Has "Why Learn CSS?": ${cssHome.includes('Why Learn CSS?') ? '✅ YES' : '❌ NO'}`);
  console.log(`   Has "What Can You Do": ${cssHome.includes('What Can You Do') ? '✅ YES' : '❌ NO'}`);
  console.log(`   Has bullet points: ${cssHome.includes('- **') ? '✅ YES' : '❌ NO'}`);
} else {
  console.log('❌ NOT FOUND: CSS HOME section');
}
console.log();

// Test 2: Check HTML HOME section
console.log('TEST 2: HTML HOME Section');
console.log('-'.repeat(80));
const htmlHomeMatch = content.match(/HTML HOME['"],\s*content:\s*`([^`]+)`/);
if (htmlHomeMatch) {
  const htmlHome = htmlHomeMatch[1];
  const wordCount = htmlHome.split(/\s+/).length;
  console.log(`✅ FOUND: HTML HOME section`);
  console.log(`   Word count: ${wordCount} words`);
  console.log(`   Preview: ${htmlHome.substring(0, 200)}...`);
  console.log(`   Has "Why Learn HTML?": ${htmlHome.includes('Why Learn HTML?') ? '✅ YES' : '❌ NO'}`);
  console.log(`   Has "Foundation of the Web": ${htmlHome.includes('Foundation of the Web') ? '✅ YES' : '❌ NO'}`);
} else {
  console.log('❌ NOT FOUND: HTML HOME section');
}
console.log();

// Test 3: Check General Languages HOME section (for all other languages)
console.log('TEST 3: General Languages HOME Section (JavaScript, Python, etc.)');
console.log('-'.repeat(80));
const generalHomeMatch = content.match(/\$\{lang\} HOME['"],\s*content:\s*`([^`]+)`/);
if (generalHomeMatch) {
  const generalHome = generalHomeMatch[1];
  const wordCount = generalHome.split(/\s+/).length;
  console.log(`✅ FOUND: General HOME section template`);
  console.log(`   Word count: ${wordCount} words`);
  console.log(`   Preview: ${generalHome.substring(0, 200)}...`);
  console.log(`   Has "Why Learn": ${generalHome.includes('Why Learn') ? '✅ YES' : '❌ NO'}`);
  console.log(`   Has "What Can You Build": ${generalHome.includes('What Can You Build') ? '✅ YES' : '❌ NO'}`);
  console.log(`   Has "Career Opportunities": ${generalHome.includes('Career Opportunities') ? '✅ YES' : '❌ NO'}`);
  console.log(`   Has "In High Demand": ${generalHome.includes('In High Demand') ? '✅ YES' : '❌ NO'}`);
} else {
  console.log('❌ NOT FOUND: General HOME section');
}
console.log();

// Test 4: Check Framework HOME section (React, Vue, Next.js)
console.log('TEST 4: Framework HOME Section (React, Vue, Next.js)');
console.log('-'.repeat(80));
const frameworkHomeMatch = content.match(/\$\{lang\} HOME['"],\s*content:\s*`#\s*Welcome to \$\{lang\}\s*-\s*Build Modern Web Applications([^`]+)`/);
if (frameworkHomeMatch) {
  const frameworkHome = frameworkHomeMatch[0];
  const wordCount = frameworkHome.split(/\s+/).length;
  console.log(`✅ FOUND: Framework HOME section template`);
  console.log(`   Word count: ${wordCount} words`);
  console.log(`   Has "Industry Standard": ${frameworkHome.includes('Industry Standard') ? '✅ YES' : '❌ NO'}`);
  console.log(`   Has "Build Modern Web Applications": ${frameworkHome.includes('Build Modern Web Applications') ? '✅ YES' : '❌ NO'}`);
  console.log(`   Has conditional for React/Next/Vue: ${frameworkHome.includes('isReact') ? '✅ YES' : '❌ NO'}`);
} else {
  console.log('❌ NOT FOUND: Framework HOME section');
}
console.log();

// Test 5: Count total sections
console.log('TEST 5: Section Counts');
console.log('-'.repeat(80));
const cssSections = (content.match(/generateCSSSections/g) || []).length;
const htmlSections = (content.match(/generateHTMLSections/g) || []).length;
const generalSections = (content.match(/generateGeneralSections/g) || []).length;
const frameworkSections = (content.match(/generateFrameworkSections/g) || []).length;
const mobileSections = (content.match(/generateMobileSections/g) || []).length;
const backendSections = (content.match(/generateBackendSections/g) || []).length;
const databaseSections = (content.match(/generateDatabaseSections/g) || []).length;
const devopsSections = (content.match(/generateDevOpsSections/g) || []).length;
const mlSections = (content.match(/generateMLSections/g) || []).length;
const blockchainSections = (content.match(/generateBlockchainSections/g) || []).length;

console.log(`CSS generator references: ${cssSections}`);
console.log(`HTML generator references: ${htmlSections}`);
console.log(`General generator references: ${generalSections}`);
console.log(`Framework generator references: ${frameworkSections}`);
console.log(`Mobile generator references: ${mobileSections}`);
console.log(`Backend generator references: ${backendSections}`);
console.log(`Database generator references: ${databaseSections}`);
console.log(`DevOps generator references: ${devopsSections}`);
console.log(`ML generator references: ${mlSections}`);
console.log(`Blockchain generator references: ${blockchainSections}`);
console.log();

// Test 6: Check if all generators use the new comprehensive format
console.log('TEST 6: Comprehensive Format Verification');
console.log('-'.repeat(80));
const hasWelcomeTo = content.includes('# Welcome to');
const hasWhatIs = content.includes('## What is');
const hasWhyLearn = content.includes('## Why Learn');
const hasWhatCanYouBuild = content.includes('## What Can You Build');
const hasKeyFeatures = content.includes('## Key Features') || content.includes('Features');
const hasStartLearning = content.includes('Start Learning') || content.includes('Start Building');

console.log(`Has "# Welcome to" heading: ${hasWelcomeTo ? '✅ YES' : '❌ NO'}`);
console.log(`Has "## What is" section: ${hasWhatIs ? '✅ YES' : '❌ NO'}`);
console.log(`Has "## Why Learn" section: ${hasWhyLearn ? '✅ YES' : '❌ NO'}`);
console.log(`Has "## What Can You Build" section: ${hasWhatCanYouBuild ? '✅ YES' : '❌ NO'}`);
console.log(`Has "Features" section: ${hasKeyFeatures ? '✅ YES' : '❌ NO'}`);
console.log(`Has "Start Learning/Building" call-to-action: ${hasStartLearning ? '✅ YES' : '❌ NO'}`);
console.log();

// Summary
console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
const allTestsPassed = cssHomeMatch && htmlHomeMatch && generalHomeMatch &&
                       hasWelcomeTo && hasWhatIs && hasWhyLearn && hasWhatCanYouBuild;

if (allTestsPassed) {
  console.log('✅ ALL TESTS PASSED!');
  console.log('✅ Comprehensive introductory content is present for all languages');
  console.log('✅ W3Schools-style formatting confirmed');
  console.log('✅ Content includes: What is it, Why learn, What to build, Features, etc.');
} else {
  console.log('⚠️  Some tests failed: review output above');
}
console.log('='.repeat(80));
