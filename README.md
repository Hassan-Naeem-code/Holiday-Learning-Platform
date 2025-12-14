# 🎄 **CodeLikeBasics** - Interactive Learning Platform

> An interactive, festive learning platform where beginners master technology through **three engaging paths**: tutorials, games, and sandboxes. Learn at your own pace, earn XP, and unlock achievements—all starting from the basics.

<div align="center">

![Status](https://img.shields.io/badge/Status-Live-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![React](https://img.shields.io/badge/React-18-61dafb)

[🚀 Deploy](#-deployment) • [📖 Docs](#-project-structure) • [🤝 Contribute](#-contributing) • [📄 License](#-license)

</div>

---

## ✨ Key Features

### 🎓 **Three Learning Paths**

| Path | Description | Best For |
|------|-------------|----------|
| 📖 **Tutorials** | Animated, interactive lessons with diagrams | Understanding concepts |
| 🎮 **Games** | Engaging drag-and-drop challenges | Active, gamified learning |
| 🛠️ **Sandboxes** | Hands-on code experimentation | Practical application |

### 🎯 **7 Tech Domains**

```
💻 Software Development    🌐 Web Development         📱 Mobile App Dev
🤖 AI & Machine Learning   📊 Data Science            🎨 Graphics Design
📝 Content Creation
```

### 🎁 **Gamification System**

- ⭐ **XP Rewards** — Earn experience for every activity
- 📈 **Level Progression** — Unlock new content as you advance
- 🏆 **12+ Achievements** — Unlock exclusive badges
- 🔥 **Streak Tracking** — Build daily learning habits
- 📊 **Progress Dashboard** — Real-time analytics

### 🎅 **Festive Experience**

- ❄️ Animated falling snow
- 🎅 Interactive Santa character
- 🎄 Holiday-themed UI with smooth animations
- ✨ Polished user experience

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
| **Frontend** | Next.js 15, React 18, TypeScript |
| **Styling** | Tailwind CSS, CSS Modules |
| **Animations** | Framer Motion, GSAP |
| **Interactions** | dnd-kit (Drag & Drop) |
| **State** | Zustand |
| **Visualization** | Recharts |
| **Icons** | Lucide React |
| **Storage** | localStorage |
| **Deployment** | Vercel |

---

## 📁 **Project Structure**

```
codelikebasics/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Home page
│   ├── dashboard/           # Learning dashboard
│   ├── tutorial/[id]/       # Tutorial pages
│   ├── game/[id]/           # Game pages
│   ├── sandbox/[id]/        # Sandbox pages
│   └── achievements/        # Achievements page
│
├── components/              # React components
│   ├── Layout/             # Layout (Navbar, Santa, Snow)
│   ├── Tutorials/          # Tutorial UI
│   ├── Games/              # Game UI
│   ├── Sandbox/            # Sandbox UI
│   ├── Progress/           # Progress tracking
│   ├── Common/             # Shared components
│   └── Music/              # Audio components
│
├── games/                  # Game implementations
│   ├── SoftwareDev/
│   ├── WebDev/
│   ├── MobileApp/
│   ├── AIML/
│   ├── DataScience/
│   ├── GraphicsDesign/
│   └── ContentCreation/
│
├── tutorials/              # Tutorial content modules
├── stores/                 # Zustand state management
├── utils/                  # Utility functions
├── hooks/                  # Custom React hooks
├── styles/                 # Global styles
└── public/                 # Static assets
```

---

## 🎮 **Usage**

### For Users

1. **Select a Topic** — Choose from 7 tech domains
2. **Pick Your Path** — Tutorial, Game, or Sandbox
3. **Learn & Play** — Engage with interactive content
4. **Earn XP** — Complete activities for experience points
5. **Track Progress** — Monitor your learning journey on the dashboard
6. **Unlock Achievements** — Complete challenges for badges

### For Developers

#### Adding a New Game

1. Create a new game component in `games/YourTopic/YourGame.tsx`
2. Register in `utils/techModules.ts`
3. Create game page at `app/game/[gameId]/page.tsx`

#### Adding a Tutorial

1. Create tutorial content in `tutorials/yourTopic.tsx`
2. Register in `utils/topicConfig.ts`
3. Link from dashboard

#### Customizing Topics

Edit `utils/topicConfig.ts` to add new tech domains.

---

## 🔧 **Configuration**

### Key Files

| File | Purpose |
|------|---------|
| `utils/topicConfig.ts` | Topics & modules |
| `utils/achievementManager.ts` | Badge system |
| `tailwind.config.ts` | Theme colors |
| `next.config.js` | Next.js settings |
| `tsconfig.json` | TypeScript config |

---

## 📊 **Content Status**

| Domain | Tutorials | Games | Sandboxes |
|--------|-----------|-------|-----------|
| Software Dev | ✅ Complete | ✅ Complete | ✅ Complete |
| Web Dev | 🚧 In Progress | 🚧 In Progress | 🚧 In Progress |
| Mobile Dev | ⏳ Planned | ⏳ Planned | ⏳ Planned |
| AI & ML | ⏳ Planned | ⏳ Planned | ⏳ Planned |
| Data Science | ⏳ Planned | ⏳ Planned | ⏳ Planned |
| Graphics Design | ⏳ Planned | ⏳ Planned | ⏳ Planned |
| Content Creation | ⏳ Planned | ⏳ Planned | ⏳ Planned |

---

## 🤝 **Contributing**

We love contributions! Here's how:

### Areas for Help

- 📖 Complete remaining tutorials (6 topics)
- 🎮 Create new games (6 topics)
- 🛠️ Build more sandboxes (6 topics)
- 🎨 Design new themes
- 🐛 Bug fixes
- 📝 Documentation improvements
- 🔊 Sound effects & music

### How to Contribute

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes
# 4. Commit with clear message
git commit -m "feat: add amazing feature"

# 5. Push to your fork
git push origin feature/amazing-feature

# 6. Open a Pull Request
```

### Contribution Guidelines

- Follow existing code style (ESLint enforced)
- Add TypeScript types
- Test your changes
- Update documentation

---

## 📱 **Browser Support**

| Browser | Version | Status |
|---------|---------|--------|
| Chrome/Edge | 90+ | ✅ Supported |
| Firefox | 88+ | ✅ Supported |
| Safari | 14+ | ✅ Supported |
| Mobile Safari | 14+ | ✅ Supported |
| Chrome Mobile | Latest | ✅ Supported |

---

## 🎨 **Design Philosophy**

- **Beautiful First** — Stunning visuals & smooth animations
- **Engaging Always** — Multiple learning styles for everyone
- **No Barriers** — 100% free, no sign-up required
- **Accessible** — WCAG 2.1 AA compliant
- **Fast** — Optimized for Lighthouse 85+

---

## 📄 **License**

MIT License © 2024 CodeLikeBasics Contributors

Feel free to use this for your own projects!

---

<div align="center">

**Made with 🎄 for beginners learning the basics!**

[🌐 Visit CodeLikeBasics](#) • [⭐ Star on GitHub](#) • [🐛 Report Issues](#)

</div>
