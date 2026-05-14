#!/bin/bash
# FSD 컴포넌트 구조 검증

FILE_PATH="$CLAUDE_TOOL_INPUT_FILE_PATH"
CONTENT="$CLAUDE_TOOL_INPUT_FILE_CONTENT"

# .tsx / .jsx 파일만 검사
if [[ ! "$FILE_PATH" =~ \.(tsx|jsx)$ ]]; then
  exit 0
fi

COMPONENT_NAME=$(basename "$FILE_PATH" | sed 's/\.[^.]*$//')
WARNINGS=()
ERRORS=()

# ── 1. 컴포넌트 이름 PascalCase 확인 ────────────────────────────────
# index.ts, page.tsx, layout.tsx 등 Next.js 예약 파일은 제외
RESERVED="^(page|layout|loading|error|not-found|template|default|route)$"
if [[ ! "$COMPONENT_NAME" =~ ^[A-Z][a-zA-Z0-9]*$ ]] && [[ ! "$COMPONENT_NAME" =~ $RESERVED ]]; then
  WARNINGS+=("⚠️  컴포넌트 파일명은 PascalCase 권장: $COMPONENT_NAME")
fi

# ── 2. export 존재 확인 (ui/ 세그먼트 내 파일) ──────────────────────
if [[ "$FILE_PATH" =~ /ui/ ]] && [[ -n "$CONTENT" ]]; then
  if ! echo "$CONTENT" | grep -qE "^export (default |function |const |class )"; then
    WARNINGS+=("⚠️  컴포넌트 파일에 export가 없습니다")
  fi
fi

# ── 3. app/ 라우트 파일이 아닌데 app/ 에 생성하는 경우 ──────────────
# app/ 내에서는 page.tsx, layout.tsx 등 Next.js 파일만 허용
NEXTJS_FILES="page|layout|loading|error|not-found|template|default"
if [[ "$FILE_PATH" =~ /app/.*\.(tsx|jsx)$ ]]; then
  if [[ ! "$COMPONENT_NAME" =~ ^($NEXTJS_FILES)$ ]]; then
    ERRORS+=("🚨 app/ 디렉토리에는 Next.js 예약 파일만 허용됩니다 ($COMPONENT_NAME)")
    ERRORS+=("   컴포넌트는 FSD 레이어(views/widgets/features/entities/shared)에 생성하세요")
  fi
fi

# ── 4. FSD ui/ 세그먼트 외부에 컴포넌트 생성 경고 ───────────────────
# src/ 아래이지만 ui/ 세그먼트가 아닌 곳에 .tsx 파일 생성 시 경고
if [[ "$FILE_PATH" =~ /src/(views|widgets|features|entities|shared)/ ]]; then
  if [[ ! "$FILE_PATH" =~ /ui/ ]] && [[ ! "$FILE_PATH" =~ /app/ ]]; then
    WARNINGS+=("⚠️  컴포넌트는 슬라이스의 ui/ 세그먼트에 위치해야 합니다")
    WARNINGS+=("   예: src/entities/user/ui/$COMPONENT_NAME.tsx")
  fi
fi

# ── 결과 출력 ────────────────────────────────────────────────────────

if [ ${#ERRORS[@]} -gt 0 ]; then
  echo "━━━ 컴포넌트 구조 오류 ━━━"
  for err in "${ERRORS[@]}"; do
    echo "$err"
  done
  echo ""
  exit 2  # 작업 차단
fi

if [ ${#WARNINGS[@]} -gt 0 ]; then
  echo "━━━ 컴포넌트 구조 경고 ━━━"
  for warn in "${WARNINGS[@]}"; do
    echo "$warn"
  done
  echo ""
fi

exit 0
