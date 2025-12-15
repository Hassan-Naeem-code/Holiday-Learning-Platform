# Manual Testing Guide

## Overview
This guide provides step-by-step manual testing procedures for the Holiday Interactive Learning Platform.

---

## Test Suite 1: User Onboarding

### Test 1.1: New User Registration
**Objective:** Verify new user can create an account

**Steps:**
1. Open app in incognito/private browser window
2. Click "First Time Here?"
3. Enter name: "Test User"
4. Enter age: "25"
5. Click "Continue"
6. Select drink preference
7. Click drink option

**Expected Result:**
- ✅ User code generated (8 characters, lowercase alphanumeric)
- ✅ Redirected to dashboard
- ✅ User stats show: Level 1, 0 XP, Streak 0
- ✅ User code saved in localStorage (as session, not plain)

**Verify in Firebase Console:**
- Go to Firestore → users collection
- Find user with the generated code
- Check: name, age, totalXP=0, level=1, achievements=[]

---

### Test 1.2: Returning User Login
**Objective:** Verify returning user can log in with code

**Steps:**
1. Copy user code from Test 1.1
2. Open new incognito window
3. Click "Already Have a Code?"
4. Enter the user code
5. Click "Continue"

**Expected Result:**
- ✅ Redirected to dashboard
- ✅ User stats restored from Firebase
- ✅ Same name/age/progress as before

---

### Test 1.3: Invalid User Code
**Objective:** Verify invalid codes are rejected

**Steps:**
1. Open app
2. Click "Already Have a Code?"
3. Enter invalid code: "invalid1"

**Expected Result:**
- ✅ Error message: "Invalid code format"
- ✅ Does NOT redirect
- ✅ Stays on login screen

---

## Test Suite 2: Game Functionality

### Test 2.1: Start New Game
**Objective:** Verify game starts correctly

**Steps:**
1. Login as user
2. Navigate to dashboard
3. Select any module → any language → Game tab
4. Select difficulty: Easy
5. Click "Start Game"

**Expected Result:**
- ✅ Game loads
- ✅ Question displayed
- ✅ 4 answer options shown
- ✅ Lives: 3, Hints: 2, Score: 0
- ✅ Back button works

---

### Test 2.2: Answer Correctly
**Objective:** Verify correct answer flow

**Steps:**
1. In game, select correct answer
2. Wait for explanation

**Expected Result:**
- ✅ Answer highlights green
- ✅ Explanation shows
- ✅ "+100" score animation
- ✅ Confetti animation
- ✅ "Next" button appears
- ✅ XP notification shows (if loading indicators integrated)

**Verify in Firebase:**
- Check Firestore → users → [userCode] → languageProgress
- completedLevels should include current level
- score should have increased
- totalXP should have increased by 20

---

### Test 2.3: Answer Incorrectly
**Objective:** Verify wrong answer flow

**Steps:**
1. In game, select wrong answer
2. Wait for explanation

**Expected Result:**
- ✅ Answer highlights red
- ✅ Explanation shows
- ✅ Lives decrease by 1
- ✅ Score unchanged
- ✅ Can try again (if lives > 0)

**Verify in Firebase:**
- lives should decrease and be saved

---

### Test 2.4: Game Over (No Lives Left)
**Objective:** Verify game over state

**Steps:**
1. Answer incorrectly 3 times to lose all lives

**Expected Result:**
- ✅ Lives reach 0
- ✅ Wait 2 seconds
- ✅ Lives reset to 3
- ✅ Hints reset to 2
- ✅ Can try question again
- ✅ Question state resets (no selected answer)

---

### Test 2.5: Use Hint
**Objective:** Verify hint system

**Steps:**
1. In game, click "Use Hint" button
2. Read alert message

**Expected Result:**
- ✅ Hints decrease by 1
- ✅ Alert shows which option is WRONG
- ✅ Can still answer question

**Verify in Firebase:**
- hints should decrease and be saved

---

### Test 2.6: Complete All Levels
**Objective:** Verify game completion

**Steps:**
1. Answer all questions correctly to complete all levels

**Expected Result:**
- ✅ Big confetti animation
- ✅ "All Completed!" message
- ✅ Bonus XP awarded (300)
- ✅ Certificate modal appears after 2 seconds
- ✅ Certificate shows user name, language, difficulty
- ✅ Can download certificate

---

### Test 2.7: Game Resume After Refresh
**Objective:** Verify game state persists after refresh

**Steps:**
1. Start a game
2. Answer 2 questions correctly
3. Lose 1 life on purpose
4. Use 1 hint
5. **Refresh the page (F5)**
6. Navigate back to the same game

**Expected Result:**
- ✅ Resumes at correct level (level 2, not 0)
- ✅ Score preserved (200, not 0)
- ✅ Lives preserved (2, not 3)
- ✅ Hints preserved (1, not 2)
- ✅ Completed levels preserved
- ✅ Question is fresh (no stuck selected answer)
- ✅ Can continue playing normally

**This tests the Phase 3 fix!**

---

## Test Suite 3: Tutorial Functionality

### Test 3.1: Start Tutorial
**Objective:** Verify tutorial starts correctly

**Steps:**
1. Navigate to dashboard
2. Select module → language → Tutorial tab
3. Select difficulty
4. Click "Start Tutorial"

**Expected Result:**
- ✅ Tutorial loads
- ✅ First section displayed
- ✅ Content shown
- ✅ Code examples visible
- ✅ Sandbox available

---

### Test 3.2: Navigate Sections
**Objective:** Verify section navigation

**Steps:**
1. Click "Mark as Complete" on section 1
2. Click "Next Section"
3. Repeat for section 2

**Expected Result:**
- ✅ Progress bar updates
- ✅ Section marked complete
- ✅ Can navigate to next section
- ✅ Completed sections saved to Firebase

---

### Test 3.3: Code Sandbox
**Objective:** Verify code sandbox works

**Steps:**
1. Type code in sandbox textarea
2. Click "Run Code"

**Expected Result:**
- ✅ Output shown
- ✅ XP awarded (+10)
- ✅ No errors

---

### Test 3.4: Complete Tutorial
**Objective:** Verify tutorial completion

**Steps:**
1. Complete all sections
2. Complete quiz if present

**Expected Result:**
- ✅ Celebration modal shows
- ✅ Bonus XP awarded
- ✅ Certificate appears after 4 seconds
- ✅ Can download certificate

---

## Test Suite 4: Achievements

### Test 4.1: First Steps Achievement
**Objective:** Verify achievement unlocks

**Steps:**
1. As new user, complete first tutorial section

**Expected Result:**
- ✅ Achievement notification appears
- ✅ Shows "First Steps 🎯"
- ✅ Auto-dismisses after a few seconds

**Verify in Firebase:**
- Check users → [userCode] → achievements
- Should include "first-steps"

---

### Test 4.2: Achievement Persistence
**Objective:** Verify achievements sync across devices

**Steps:**
1. On device 1, unlock an achievement
2. On device 2, login with same user code
3. Check achievements page

**Expected Result:**
- ✅ Achievement shows on device 2
- ✅ Unlocked achievements match between devices

---

### Test 4.3: Event-Driven Achievement Check
**Objective:** Verify achievements check after actions (not constantly polling)

**Steps:**
1. Open DevTools → Network tab
2. Filter by "firestore"
3. Complete a game level
4. Watch network requests

**Expected Result:**
- ✅ Achievement check triggered IMMEDIATELY after level completion
- ✅ NOT checking achievements every 2 seconds
- ✅ Minimal Firebase reads (should be ~60 second polling as fallback)

**This tests the Phase 3 polling fix!**

---

## Test Suite 5: Progress & XP System

### Test 5.1: XP Gain
**Objective:** Verify XP is awarded correctly

**Steps:**
1. Complete a game level
2. Watch XP counter

**Expected Result:**
- ✅ +20 XP awarded
- ✅ Progress glass fills slightly
- ✅ XP counter updates in navbar

---

### Test 5.2: Level Up
**Objective:** Verify leveling system

**Steps:**
1. Earn 1000 XP total
2. Watch level indicator

**Expected Result:**
- ✅ Level increases from 1 to 2
- ✅ Level shown in navbar
- ✅ Saved to Firebase

---

### Test 5.3: Progress Glass Full
**Objective:** Verify Santa animation

**Steps:**
1. Earn XP until glass is 100% full (1000 XP)
2. Wait for animation

**Expected Result:**
- ✅ Santa animation plays
- ✅ Glass empties after animation
- ✅ Can fill again

---

### Test 5.4: Event-Driven Profile Refresh
**Objective:** Verify profile updates after actions (not constantly polling)

**Steps:**
1. Open DevTools → Network tab
2. Filter by "firestore"
3. Earn some XP (complete level)
4. Watch network requests

**Expected Result:**
- ✅ Profile refresh triggered IMMEDIATELY after XP gain
- ✅ NOT refreshing profile every 5 seconds
- ✅ Minimal Firebase reads (should be ~30 second polling as fallback)

**This tests the Phase 3 polling fix!**

---

## Test Suite 6: Certificate System

### Test 6.1: Generate Certificate
**Objective:** Verify certificate generation

**Steps:**
1. Complete all levels of a game
2. Wait for certificate modal

**Expected Result:**
- ✅ Certificate shows correct name
- ✅ Certificate shows correct language
- ✅ Certificate shows correct difficulty
- ✅ Certificate shows date
- ✅ Certificate has unique ID

---

### Test 6.2: Edit Certificate Name
**Objective:** Verify name editing

**Steps:**
1. In certificate modal, click name to edit
2. Type new name: "John Doe"
3. Click outside input

**Expected Result:**
- ✅ Name updates on certificate
- ✅ Can still edit again
- ✅ Edit icon shows on hover

---

### Test 6.3: Download Certificate
**Objective:** Verify download functionality

**Steps:**
1. In certificate modal, click "Download Certificate"
2. Check downloads folder

**Expected Result:**
- ✅ PNG file downloaded
- ✅ Filename is sanitized (no special characters)
- ✅ Filename format: `Name-Language-Difficulty-certificate.png`
- ✅ Image quality is good (2x scale)

---

### Test 6.4: Certificate ID Security
**Objective:** Verify certificate IDs are secure

**Steps:**
1. Generate 2 certificates (same language, same difficulty)
2. Compare certificate IDs

**Expected Result:**
- ✅ IDs are different (not just timestamp)
- ✅ IDs include hash of user code
- ✅ Format: `CLB-DIFFICULTY-HASH-TIMESTAMP`

**This tests the Phase 2 security fix!**

---

## Test Suite 7: Security

### Test 7.1: Session Validation
**Objective:** Verify session integrity checks

**Steps:**
1. Login as user
2. Open DevTools → Application → localStorage
3. Find `userSession` key
4. Modify the value (add a character)
5. Refresh page

**Expected Result:**
- ✅ Session detected as tampered
- ✅ Logged out
- ✅ Redirected to login page

**This tests the Phase 1 session security fix!**

---

### Test 7.2: XP Validation
**Objective:** Verify XP cannot be cheated

**Steps:**
1. Login as user
2. Open DevTools → Console
3. Try to add 10000 XP:
   ```javascript
   const { addUserXP } = await import('./lib/firebaseService')
   const code = localStorage.getItem('userCode')
   await addUserXP(code, 10000)
   ```

**Expected Result:**
- ✅ Error: "Invalid XP amount"
- ✅ XP does NOT increase
- ✅ Client-side validation prevents it

**Then try in Firebase Console directly:**
1. Go to Firestore → users → [userCode]
2. Try to update totalXP to 99999
3. Click Save

**Expected Result:**
- ✅ Firebase rules reject the update
- ✅ Error: "Invalid XP update"

**This tests Phase 1 & 2 security fixes!**

---

### Test 7.3: Cross-User Data Access
**Objective:** Verify users cannot access other users' data

**Steps:**
1. Login as User A
2. Get User A's code
3. Logout
4. Login as User B
5. Open DevTools → Console
6. Try to read User A's data:
   ```javascript
   const { getUserProfile } = await import('./lib/firebaseService')
   await getUserProfile('userAcode')
   ```

**Expected Result:**
- ✅ Firebase rules block the request
- ✅ Error: "Permission denied"
- ✅ Cannot access other user's data

**This tests Firebase Security Rules!**

---

## Test Suite 8: Responsive Design

### Test 8.1: Mobile View (< 768px)
**Objective:** Verify UI works on mobile

**Steps:**
1. Open DevTools → Toggle device toolbar
2. Select "iPhone SE" or similar
3. Navigate through app

**Expected Result:**
- ✅ All text readable
- ✅ Music player: **bottom-left** position
- ✅ Progress glass: bottom-right position
- ✅ **No overlap** between music player and progress glass
- ✅ Navbar compact with bottom navigation
- ✅ Certificates scale properly
- ✅ Buttons are touch-friendly

**This tests Phase 3 UI overlap fix!**

---

### Test 8.2: Tablet View (768px - 1024px)
**Objective:** Verify UI works on tablet

**Steps:**
1. DevTools → Toggle device toolbar
2. Select "iPad" or similar
3. Navigate through app

**Expected Result:**
- ✅ Elements properly sized
- ✅ Music player: bottom-right
- ✅ No UI overlaps
- ✅ Text readable

---

### Test 8.3: Desktop View (>= 1024px)
**Objective:** Verify UI works on desktop

**Steps:**
1. View at full screen (1920x1080)
2. Navigate through app

**Expected Result:**
- ✅ Elements properly sized
- ✅ Music player: bottom-right
- ✅ Progress glass: bottom-right (above music)
- ✅ No UI overlaps
- ✅ Proper spacing

---

## Test Suite 9: Error Handling

### Test 9.1: Network Failure
**Objective:** Verify app handles offline gracefully

**Steps:**
1. Open app
2. Disconnect internet
3. Try to save progress

**Expected Result:**
- ✅ Error message shown
- ✅ App doesn't crash
- ✅ Can retry when back online

---

### Test 9.2: localStorage Full
**Objective:** Verify quota exceeded handling

**Steps:**
1. (Difficult to test, but in theory:)
2. Fill localStorage completely
3. Try to save data

**Expected Result:**
- ✅ Clears cached data automatically
- ✅ Retries save
- ✅ Shows alert if still fails

**This tests Phase 3 edge case handling!**

---

### Test 9.3: Empty Tutorial
**Objective:** Verify empty tutorial handling

**Steps:**
1. (If possible) Access tutorial with no sections
2. OR modify tutorial data to have 0 sections

**Expected Result:**
- ✅ Shows friendly error message
- ✅ "Tutorial Not Available" screen
- ✅ Can navigate back to dashboard
- ✅ App doesn't crash

**This tests Phase 3 edge case handling!**

---

## Test Suite 10: Performance

### Test 10.1: Memory Leaks
**Objective:** Verify no memory leaks

**Steps:**
1. Open DevTools → Memory tab
2. Take heap snapshot
3. Play music, navigate around, play games for 5 minutes
4. Take another heap snapshot
5. Compare

**Expected Result:**
- ✅ Memory growth < 50MB
- ✅ No significant leaks
- ✅ Audio elements properly cleaned up

**This tests Phase 2 memory leak fix!**

---

### Test 10.2: Polling Frequency
**Objective:** Verify reduced polling

**Steps:**
1. Open DevTools → Network tab
2. Filter by "firestore"
3. Monitor for 2 minutes

**Expected Result:**
- ✅ Achievement checks: ~2 per minute (60s polling)
- ✅ Profile refreshes: ~4 per minute (30s polling)
- ✅ NOT checking every 2-5 seconds

**This tests Phase 3 polling reduction!**

---

## Bug Reporting Template

If you find a bug, report it with:

```markdown
**Title:** Brief description

**Severity:** Critical / High / Medium / Low

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. ...

**Expected Result:**
What should happen

**Actual Result:**
What actually happened

**Environment:**
- Browser: Chrome 120
- Device: Desktop / Mobile
- OS: Windows 11
- Screen size: 1920x1080

**Screenshots:**
[Attach if relevant]

**Console Errors:**
[Paste any errors from DevTools Console]

**Additional Context:**
Any other relevant information
```

---

## Test Sign-Off

**Tester:** ________________

**Date:** ________________

**Tests Passed:** _____ / _____

**Tests Failed:** _____ / _____

**Critical Bugs Found:** _____ (List below)

**Notes:**
___________________________________
___________________________________
___________________________________

---

**Version:** 1.0
**Last Updated:** December 15, 2025
