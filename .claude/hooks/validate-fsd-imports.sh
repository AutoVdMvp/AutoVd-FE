#!/bin/bash
# FSD import 규칙 검증: 상위 레이어 참조 및 Public API 우회 차단

FILE_PATH="$CLAUDE_TOOL_INPUT_FILE_PATH"
CONTENT="$CLAUDE_TOOL_INPUT_FILE_CONTENT"

# .ts / .tsx 파일만 검사
if [[ ! "$FILE_PATH" =~ \.(ts|tsx)$ ]]; then
  exit 0
fi

# node_modules, .next 제외
if [[ "$FILE_PATH" =~ node_modules|\.next ]]; then
  exit 0
fi

# src/ 아래 경로에서 현재 레이어 판별
LAYER=""
if [[ "$FILE_PATH" =~ /src/shared/ ]]; then   LAYER="shared"; fi
if [[ "$FILE_PATH" =~ /src/entities/ ]]; then  LAYER="entities"; fi
if [[ "$FILE_PATH" =~ /src/features/ ]]; then  LAYER="features"; fi
if [[ "$FILE_PATH" =~ /src/widgets/ ]]; then   LAYER="widgets"; fi
if [[ "$FILE_PATH" =~ /src/views/ ]]; then     LAYER="views"; fi
if [[ "$FILE_PATH" =~ /src/app/ ]]; then       LAYER="app"; fi

# src/ 밖 파일은 검사 불필요
if [[ -z "$LAYER" ]]; then
  exit 0
fi

ERRORS=()
WARNINGS=()

# ── 레이어별 금지 import 검사 ──────────────────────────────────────

check_import() {
  local pattern="$1"
  local message="$2"
  if echo "$CONTENT" | grep -qE "$pattern"; then
    ERRORS+=("🚨 FSD 위반: $message")
  fi
}

warn_import() {
  local pattern="$1"
  local message="$2"
  if echo "$CONTENT" | grep -qE "$pattern"; then
    WARNINGS+=("⚠️  FSD 경고: $message")
  fi
}

case "$LAYER" in
  shared)
    # shared는 외부 패키지만 import 가능
    check_import 'from "@/entities/' 'shared에서 entities import 금지'
    check_import 'from "@/features/' 'shared에서 features import 금지'
    check_import 'from "@/widgets/'  'shared에서 widgets import 금지'
    check_import 'from "@/views/'    'shared에서 views import 금지'
    ;;
  entities)
    # entities는 shared만 import 가능
    check_import 'from "@/features/' 'entities에서 features import 금지'
    check_import 'from "@/widgets/'  'entities에서 widgets import 금지'
    check_import 'from "@/views/'    'entities에서 views import 금지'
    ;;
  features)
    # features는 entities, shared만 import 가능
    check_import 'from "@/widgets/'  'features에서 widgets import 금지'
    check_import 'from "@/views/'    'features에서 views import 금지'
    # 같은 레이어 내 다른 feature import 경고 (위반이지만 때로 불가피한 경우가 있어 warning으로)
    warn_import  'from "@/features/' 'features 간 직접 import — widget으로 끌어올려 조합 권장'
    ;;
  widgets)
    # widgets는 features, entities, shared만 import 가능
    check_import 'from "@/views/'    'widgets에서 views import 금지'
    warn_import  'from "@/widgets/'  'widgets 간 직접 import — views로 끌어올려 조합 권장'
    ;;
esac

# ── Public API 우회 검사 (index.ts 없이 내부 경로 직접 접근) ────────
# 예: @/entities/user/ui/UserCard (index.ts를 거치지 않음)
if echo "$CONTENT" | grep -qE 'from "@/(entities|features|widgets|views)/[^"]+/(ui|model|api|lib|config)/'; then
  WARNINGS+=("⚠️  Public API 우회 가능성: @/layer/slice/segment 직접 접근 — index.ts를 통해 import 권장")
fi

# ── 결과 출력 ────────────────────────────────────────────────────────

if [ ${#ERRORS[@]} -gt 0 ]; then
  echo "━━━ FSD Import 규칙 위반 ━━━"
  for err in "${ERRORS[@]}"; do
    echo "$err"
  done
  echo "파일: $FILE_PATH"
  echo ""
  exit 2  # 작업 차단
fi

if [ ${#WARNINGS[@]} -gt 0 ]; then
  echo "━━━ FSD Import 경고 ━━━"
  for warn in "${WARNINGS[@]}"; do
    echo "$warn"
  done
  echo "파일: $FILE_PATH"
  echo ""
fi

exit 0
