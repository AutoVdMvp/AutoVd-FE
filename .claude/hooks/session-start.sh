#!/bin/bash
# Load project context on session start

echo "🚀 Claude Code Session Starting..."
echo ""

# Check if this is a Next.js project
if [ -f "next.config.js" ] || [ -f "next.config.mjs" ] || [ -f "next.config.ts" ]; then
  echo "✅ Next.js project detected"
  
  # Show Next.js version
  if command -v npm &> /dev/null; then
    NEXT_VERSION=$(npm list next 2>/dev/null | grep next@ | head -1 | sed 's/.*next@//')
    if [ -n "$NEXT_VERSION" ]; then
      echo "   Next.js version: $NEXT_VERSION"
    fi
  fi
fi

# Check for TypeScript
if [ -f "tsconfig.json" ]; then
  echo "✅ TypeScript configured"
fi

# Check for TanStack Query
if command -v npm &> /dev/null; then
  if npm list @tanstack/react-query &> /dev/null; then
    echo "✅ TanStack Query installed"
  fi
fi

# Check for Zustand
if command -v npm &> /dev/null; then
  if npm list zustand &> /dev/null; then
    echo "✅ Zustand installed"
  fi
fi

# Show recent git changes
if command -v git &> /dev/null && [ -d ".git" ]; then
  echo ""
  echo "📝 Recent changes:"
  git log --oneline -5 2>/dev/null || true
fi

# Show current branch
if command -v git &> /dev/null && [ -d ".git" ]; then
  BRANCH=$(git branch --show-current 2>/dev/null)
  if [ -n "$BRANCH" ]; then
    echo ""
    echo "🌿 Current branch: $BRANCH"
  fi
fi

# Check for uncommitted changes
if command -v git &> /dev/null && [ -d ".git" ]; then
  if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "⚠️  You have uncommitted changes"
  fi
fi

echo ""
echo "✨ Ready to code!"
echo ""

exit 0
