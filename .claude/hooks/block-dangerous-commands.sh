#!/bin/bash
# Block dangerous bash commands

COMMAND="$CLAUDE_TOOL_INPUT_COMMAND"

# Dangerous patterns to block
DANGEROUS_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \*"
  "> /dev/sda"
  "mkfs"
  "dd if="
  ":(){ :|:& };:"
  "sudo rm"
  "chmod 777"
  "chown root"
  "--no-preserve-root"
)

# Check for dangerous patterns
for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if [[ "$COMMAND" == *"$pattern"* ]]; then
    echo "❌ BLOCKED: Dangerous command detected: $pattern"
    echo "This command could cause system damage."
    exit 2  # Exit 2 blocks the command
  fi
done

# Warn about risky patterns but allow
RISKY_PATTERNS=(
  "rm -rf"
  "npm install -g"
  "curl.*|.*sh"
  "wget.*|.*sh"
)

for pattern in "${RISKY_PATTERNS[@]}"; do
  if [[ "$COMMAND" =~ $pattern ]]; then
    echo "⚠️  WARNING: Potentially risky command: $COMMAND"
    echo "Please review carefully before executing."
  fi
done

exit 0  # Allow command to proceed
