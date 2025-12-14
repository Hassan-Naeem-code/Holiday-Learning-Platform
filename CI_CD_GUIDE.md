# CI/CD and Code Quality Setup

This project uses automated CI/CD pipelines and code quality checks.

## GitHub Actions CI/CD

### Workflow Triggers
- **Push** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop` branches

### Pipeline Jobs

1. **Lint** - ESLint and TypeScript checks
2. **Build** - Builds production-ready application
3. **Security Scan** - npm audit and secret detection

### Required GitHub Secrets

Add these secrets in your GitHub repository settings:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**To add secrets:**
1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each variable with its value from your `.env.local`

## Local Development

### Automatic Checks

When you run `npm run dev`, ESLint will automatically check your code.

### Pre-commit Hooks

Before each commit, the following checks run automatically:
- ✅ ESLint validation
- ✅ TypeScript type checking

If checks fail, the commit will be blocked until you fix the issues.

### Available Scripts

```bash
# Start development with lint check
npm run dev

# Build for production (with full validation)
npm run build

# Run ESLint manually
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Check TypeScript types
npm run type-check
```

## ESLint Configuration

Rules configured in `.eslintrc.json`:
- Unused variables → Warning
- `any` type → Warning
- Missing dependencies in hooks → Warning
- Console logs → Warning (except console.warn/error)

## Troubleshooting

### Skip pre-commit hooks (not recommended)
```bash
git commit --no-verify -m "your message"
```

### Fix all auto-fixable ESLint issues
```bash
npm run lint:fix
```

### If hooks aren't working
```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```
