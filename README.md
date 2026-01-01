# 💻 **CodeLikeBasics** - Interactive Learning Platform

> An interactive, gamified learning platform where beginners master programming and technology through engaging tutorials, quiz games, and hands-on coding sandboxes. Progress through multiple difficulty levels, earn XP, unlock achievements, and receive certificates.

<div align="center">

![Status](https://img.shields.io/badge/Status-Live-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![React](https://img.shields.io/badge/React-18-61dafb)

[🚀 Quick Start](#-quick-start) • [📖 Features](#-key-features) • [💻 Tech Stack](#-tech-stack) • [📁 Structure](#-project-structure)

</div>

---

## ✨ Key Features

### 🎓 **Three Learning Paths Per Topic**

| Path | Description | Certification |
|------|-------------|---------------|
| 📖 **Tutorials** | Interactive animated lessons with quizzes | Complete all lessons |
| 🎮 **Quiz Games** | Multiple-choice questions across difficulty levels | Score 75%+ to earn certificate |
| 💻 **Code Sandboxes** | Live code editor with exercises | Complete 75%+ exercises correctly |

### 🏆 **Certificate System**

- Complete tutorial lessons to unlock certificate
- Pass quiz games with **75% or higher** final score
- Submit sandbox exercises and achieve **75% accuracy**
- Certificates display your name and completion date
- Download and share your achievements

### 📚 **9 Technology Modules with 43+ Languages**

```
🌐 Web Development        📱 Mobile App Development    📊 Data Science
🤖 AI & Machine Learning  🎮 Game Development          🔧 Backend Development
🔐 DevOps & Cloud         🛡️ Cybersecurity            ⛓️ Blockchain & Database
```

**All languages include:**
- Easy, Medium, Hard difficulty levels
- 8 exercises per difficulty level  
- Progressive learning path
- Real-time code output simulation
- XP rewards for completion

### 🎯 **Gamification System**

- ⭐ **XP Rewards** — Earn points for tutorials, games, and sandbox exercises
- 🌳 **Learning Tree Progress** — Watch your knowledge tree grow as you learn
- 🏆 **Achievements** — 12+ badges including First Steps, Speed Demon, Night Owl, and more
- 🔥 **Streak System** — Build daily learning habits with bonus XP
- 📊 **Real-time Dashboard** — Track XP, level, achievements, and completion status
- 🎯 **User Profiles** — Personalized learning experience with goal-based paths (career/hobby/school)

### 🎨 **Modern Professional UI**

- 💜 **Brand Colors** — Beautiful purple, blue, and gold gradient design
- 🌳 **Learning Tree** — Visual progress tracker that grows with your knowledge
- ✨ **Smooth Animations** — Powered by Framer Motion
- 🎯 **Goal-Based Learning** — Choose your path: career, hobby, or school
- 🎊 **Celebrations** — Confetti and animations for achievements
- 📱 **Responsive Design** — Perfect on desktop, tablet, and mobile

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/codelikebasics.git
cd codelikebasics

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start development server
npm run dev

# 4️⃣ Open in browser
# Visit http://localhost:3000
```

That's it! 🎉 Your app is running.

### Available Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

---

## 📦 **Tech Stack**

| Category | Technologies |
|----------|---------------|
| **Framework** | Next.js 15.5.9 (App Router) |
| **Frontend** | React 18.3, TypeScript 5.3 |
| **Styling** | Tailwind CSS 3.4, CSS Modules |
| **Animations** | Framer Motion 11.15, canvas-confetti |
| **State Management** | Zustand 5.0 |
| **Database** | Firebase 11.1 (Firestore, Auth) |
| **Icons** | Lucide React 0.468 |
| **Code Editor** | react-simple-code-editor 0.14 |
| **Deployment** | Vercel |

---

## 📁 **Project Structure**

```
codelikebasics/
├── app/                      # Next.js 15 App Router
│   ├── page.tsx             # Onboarding (new/returning user)
│   ├── dashboard/           # Main learning dashboard
│   ├── tutorial/[tutorialId]/ # Interactive tutorials
│   ├── game/[gameId]/       # Quiz games
│   ├── sandbox/[sandboxId]/ # Code sandboxes
│   ├── module/[moduleId]/   # Language selection
│   ├── achievements/        # Achievements page
│   └── progress/            # Progress tracking page
│
├── components/
│   ├── Layout/             # Navbar, ClientShell, ErrorBoundary
│   ├── Tutorials/          # TutorialPlayer, InteractiveTutorial, QuizComponent
│   ├── Games/              # UniversalGame, GameHUD, GameContainer
│   ├── Sandbox/            # UniversalSandbox, SandboxContainer
│   ├── Dashboard/          # ModuleCard, LanguageCard
│   ├── Progress/           # LearningTree, TreeCelebration, GlobalLearningTree
│   ├── Common/             # Certificate, AchievementNotification
│   ├── Onboarding/         # WelcomeScreen, NewUserForm, ReturningUserForm, GoalSelection
│   └── AICoach/            # AICoachButton, AICoachPopup
│
├── games/
│   ├── SoftwareDev/        # CodeBlockGame
│   ├── WebDev/             # HTMLBuilderGame
│   ├── MobileApp/          # UserFlowGame
│   ├── AIML/               # NeuralNetworkGame
│   ├── DataScience/        # DataPipelineGame
│   ├── GraphicsDesign/     # DesignMatcherGame
│   └── ContentCreation/    # ContentMixerGame
│
├── tutorials/              # Tutorial content for all 7 topics
│   ├── softwareDev.tsx
│   ├── webDev.tsx
│   ├── mobileAppDev.tsx
│   ├── aiMachineLearning.tsx
│   ├── dataScience.tsx
│   ├── graphicsDesign.tsx
│   └── contentCreation.tsx
│
├── stores/                 # Zustand state management
│   ├── userStore.ts        # User profile & session
│   ├── gameStore.ts        # Game state
│   └── tutorialStore.ts    # Tutorial progress
│
├── utils/
│   ├── techModules.ts      # 9 modules with 43+ languages
│   ├── topicConfig.ts      # 7 main topic configurations
│   ├── achievementManager.ts # Achievement system
│   ├── sessionManager.ts   # Session security
│   ├── storage.ts          # localStorage utilities
│   └── tutorialContent.ts  # Tutorial generators
│
├── hooks/
│   └── useXP.ts            # XP rewards system
│
├── lib/
│   ├── firebase.ts         # Firebase config
│   └── firebaseService.ts  # Firestore operations
│
├── public/
│   └── assets/             # Static assets
│
└── styles/
    └── globals.css         # Global styles & Tailwind
```

---

## 🎮 **Usage**

### For Learners

1. **First Visit**
   - Choose "New User" or "Returning User"
   - Enter your name and age
   - Select your learning goal (career/hobby/school)
   - Get unique session code (save it to track progress)

2. **Dashboard**
   - View 9 technology modules with 43+ languages
   - See your level, total XP, and learning streak
   - Watch your learning tree grow with progress
   - Track achievements and certificates

3. **Learning Paths**
   - **Tutorials**: Complete animated lessons with embedded quizzes
   - **Quiz Games**: Answer questions across Easy/Medium/Hard levels
   - **Code Sandboxes**: Write code, submit exercises, get instant feedback

4. **Certification**
   - **Tutorials**: Complete all lessons
   - **Quiz Games**: Score 75%+ across all questions to earn certificate
   - **Sandboxes**: Submit all exercises, score 75%+ correct answers

5. **Progress Tracking**
   - Earn XP for every activity
   - Watch your learning tree grow (10% per 100 XP)
   - Unlock achievements (12+ available)
   - Build daily learning streaks with bonus XP

---

## 📊 **Available Content**

### 9 Technology Modules (With 43+ Languages)

| Module | Languages Available |
|--------|-------------------|
| 🌐 **Web Development** | HTML, CSS, JavaScript, React, TypeScript, Next.js |
| 📱 **Mobile Development** | React Native, Flutter, Swift, Kotlin |
| 📊 **Data Science** | Python, R, SQL, Pandas |
| 🤖 **AI & ML** | Python ML, TensorFlow, PyTorch, Scikit-learn |
| 🎮 **Game Development** | Unity C#, Unreal, Godot, JavaScript Games |
| 🔧 **Backend Development** | Node.js, Python, Java, Go, Rust |
| ☁️ **DevOps & Cloud** | Docker, Kubernetes, AWS, Terraform, GitHub Actions |
| 🛡️ **Cybersecurity** | Penetration Testing, Network Security, Cryptography, Security Tools |
| ⛓️ **Blockchain & Database** | Solidity, Web3.js, Ethereum, PostgreSQL, MongoDB, Redis, Firebase |

**Each language includes:**
- 3 difficulty levels (Easy, Medium, Hard)
- 8 coding exercises per difficulty level (24 total per language)
- Live code editor with smart output simulation
- Certificate awarded for 75%+ completion
- XP rewards and progress tracking

**Total: 43+ Programming Languages & Technologies**

### 5 Classic Learning Topics (Tutorial + Game + Sandbox)

| Topic | Tutorial | Quiz Game | Sandbox |
|-------|----------|-----------|---------|
| 💻 Software Development | ✅ 6 Lessons | ✅ Code Block Game | ✅ Code Simulator |
| 🌐 Web Development | ✅ 6 Lessons | ✅ HTML Builder Game | ✅ Web Builder |
| 📱 Mobile App Development | ✅ 6 Lessons | ✅ User Flow Game | ✅ App Designer |
| 🤖 AI & Machine Learning | ✅ 6 Lessons | ✅ Neural Network Game | ✅ AI Playground |
| 📊 Data Science | ✅ 6 Lessons | ✅ Data Pipeline Game | ✅ Data Lab |

---

## � **Configuration**

### Key Configuration Files

| File | Purpose |
|------|---------|
| `utils/topicConfig.ts` | 7 main topics with game/tutorial/sandbox IDs |
| `utils/techModules.ts` | 9 modules with 43+ language definitions |
| `utils/achievementManager.ts` | 12+ achievement badges and triggers |
| `lib/firebase.ts` | Firebase configuration |
| `tailwind.config.ts` | Theme colors and design system |
| `next.config.js` | Next.js 15 configuration |
| `tsconfig.json` | TypeScript strict mode settings |

### Environment Variables

Create `.env.local`:

```env
# Firebase Configuration (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 🎯 **Features in Detail**

### XP Reward System

| Activity | XP Earned |
|----------|-----------|
| Complete tutorial lesson | 50 XP |
| Correct quiz answer | 20 XP |
| Finish quiz game (75%+) | 300 XP bonus |
| Execute sandbox code | 10 XP |
| Complete sandbox exercise | 20 XP |
| Finish sandbox (75%+) | 500 XP bonus |

### Achievement System

12+ achievements including:
- 🎯 First Steps (Complete first tutorial)
- 🔥 On Fire (3-day streak)
- ⚡ Speed Demon (Complete 3 tutorials in one day)
- 🦉 Night Owl (Learn between 10 PM - 6 AM)
- 🏆 Triple Threat (Complete tutorial + game + sandbox)
- 🎓 Certified Learner (Earn first certificate)
- And more...

### Progress Tracking

- **Learning Tree**: Visual progress tracker that grows through 5 stages (seedling → sapling → growing → mature → flourishing)
- **Firebase Sync**: All progress saved to Firestore in real-time
- **Session Management**: Secure 8-character codes for user authentication
- **Real-time Updates**: Instant XP, level-up, and achievement notifications
- **Difficulty Progression**: Auto-unlock next difficulty levels
- **Streak Bonuses**: Earn +50 XP bonus for maintaining daily streaks

---

## 🚢 **Deployment**

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add Firebase environment variables
4. Deploy automatically on push to `main`

### Manual Build

```bash
npm run build    # Creates optimized production build
npm start        # Runs production server on port 3000
```

---

## 🤝 **Contributing**

Contributions are welcome! Here's how:

### How to Contribute

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes
# 4. Commit with clear message
git commit -m "feat: add your feature"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Open a Pull Request
```

### Areas for Improvement

- 🎮 Add more quiz questions to games
- 📝 Enhance tutorial content
- 💻 Add more sandbox exercises
- 🎨 Improve UI/UX design
- 🐛 Bug fixes and optimizations
- 📚 Documentation improvements
- 🌍 Add internationalization support

### Code Guidelines

- Follow existing TypeScript patterns
- Use ESLint and TypeScript strict mode
- Test changes locally before submitting
- Update README if adding new features

---

## 📱 **Browser Support**

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Mobile Safari | 14+ | ✅ Fully Supported |
| Chrome Mobile | Latest | ✅ Fully Supported |

---

## 📄 **License**

MIT License © 2025 CodeLikeBasics

Permission is hereby granted, free of charge, to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.

---

<div align="center">

**💻 Made with love for beginners learning to code! 💻**

[🌐 Live Demo](https://code-like-basics.vercel.app) • [⭐ Star on GitHub](https://github.com/yourusername/codelikebasics) • [🐛 Report Issues](https://github.com/yourusername/codelikebasics/issues)

**Happy Learning! 🚀**

</div>
