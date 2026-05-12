#!/bin/bash
# Pre-stop validation - ensure code quality before marking task complete

echo "🔍 Running final code quality checks..."
echo ""

ERRORS=()
WARNINGS=()

# Check 1: TypeScript compilation
if [ -f "tsconfig.json" ]; then
  echo "Checking TypeScript..."
  if ! npx tsc --noEmit 2>&1 | head -20; then
    ERRORS+=("TypeScript compilation has errors")
  else
    echo "✅ TypeScript check passed"
  fi
fi

# Check 2: ESLint
if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ] || [ -f "eslint.config.js" ]; then
  echo ""
  echo "Checking ESLint..."
  ESLINT_OUTPUT=$(npx eslint . --ext .ts,.tsx,.js,.jsx 2>&1 | head -30)
  if echo "$ESLINT_OUTPUT" | grep -q "error"; then
    ERRORS+=("ESLint found errors")
    echo "$ESLINT_OUTPUT"
  else
    echo "✅ ESLint check passed"
  fi
fi

# Check 3: Git status
if command -v git &> /dev/null && [ -d ".git" ]; then
  echo ""
  echo "Checking git status..."
  
  # Check for untracked files that look important
  UNTRACKED=$(git ls-files --others --exclude-standard | grep -E '\.(ts|tsx|js|jsx)$' | head -5)
  if [ -n "$UNTRACKED" ]; then
    WARNINGS+=("Untracked files found: $UNTRACKED")
  fi
  
  # Check for staged changes
  if git diff --cached --quiet; then
    WARNINGS+=("No changes staged for commit")
  else
    echo "✅ Changes are staged for commit"
  fi
fi

# Print results
echo ""
echo "============================================"

if [ ${#ERRORS[@]} -gt 0 ]; then
  echo "❌ ERRORS FOUND:"
  for error in "${ERRORS[@]}"; do
    echo "  - $error"
  done
  echo ""
  echo "Please fix errors before completing the task."
  echo "============================================"
  exit 2  # Block stop - force user to fix
fi

if [ ${#WARNINGS[@]} -gt 0 ]; then
  echo "⚠️  WARNINGS:"
  for warning in "${WARNINGS[@]}"; do
    echo "  - $warning"
  done
  echo ""
fi

echo "✅ All quality checks passed!"
echo "============================================"

exit 0  # Allow stop
