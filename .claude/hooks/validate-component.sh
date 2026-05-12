#!/bin/bash
# Validate component structure before creation

FILE_PATH="$CLAUDE_TOOL_INPUT_FILE_PATH"

# Only validate React component files
if [[ ! "$FILE_PATH" =~ \.(tsx|jsx)$ ]]; then
  exit 0
fi

# Get the component name from file path
COMPONENT_NAME=$(basename "$FILE_PATH" | sed 's/\.[^.]*$//')

# Read the file content from stdin if available
CONTENT="$CLAUDE_TOOL_INPUT_FILE_CONTENT"

# Validation checks
WARNINGS=()

# Check 1: Component name should be PascalCase
if [[ ! "$COMPONENT_NAME" =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
  WARNINGS+=("⚠️  Component name should be PascalCase: $COMPONENT_NAME")
fi

# Check 2: File in components/ should export a component
if [[ "$FILE_PATH" =~ /components/ ]] && [[ -n "$CONTENT" ]]; then
  if [[ ! "$CONTENT" =~ "export" ]]; then
    WARNINGS+=("⚠️  Component file should export a component")
  fi
fi

# Check 3: Warn if creating in wrong directory
if [[ "$FILE_PATH" =~ /app/.*\.(tsx|jsx)$ ]] && [[ "$FILE_PATH" != *"page.tsx"* ]] && [[ "$FILE_PATH" != *"layout.tsx"* ]] && [[ "$FILE_PATH" != *"loading.tsx"* ]] && [[ "$FILE_PATH" != *"error.tsx"* ]]; then
  WARNINGS+=("⚠️  Consider creating reusable components in /components directory")
fi

# Print warnings
if [ ${#WARNINGS[@]} -gt 0 ]; then
  echo "Component validation warnings:"
  for warning in "${WARNINGS[@]}"; do
    echo "$warning"
  done
  echo ""
fi

exit 0  # Allow creation to proceed
