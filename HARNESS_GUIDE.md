# Next.js Frontend Harness Engineering System

## 시스템 구조

```
프로젝트 루트/
│
├── CLAUDE.md                           # 에이전트 위임 규칙 (orchestration)
├── AGENTS.md                           # FSD 도메인 지식 (항상 로드됨)
│
└── .claude/
    ├── settings.json                   # Hooks & 권한 설정
    │
    ├── agents/                         # 전문 에이전트
    │   ├── component-generator.md      # 컴포넌트 생성
    │   ├── business-logic-generator.md # API/Query/Store 비즈니스 로직 생성
    │   └── code-reviewer.md            # 코드 품질 리뷰
    │
    └── hooks/                          # 자동화 스크립트
        ├── block-dangerous-commands.sh # 위험 명령어 차단
        ├── validate-component.sh       # FSD 컴포넌트 구조 검증
        ├── validate-fsd-imports.sh     # FSD import 규칙 검증
        ├── session-start.sh            # 세션 시작 정보 로드
        └── pre-stop-validation.sh      # 작업 완료 전 품질 체크
```

---

## 설계 원칙

이 시스템은 **passive context** 방식을 채택합니다.

- **AGENTS.md**: 항상 시스템 프롬프트에 로드되는 FSD 도메인 지식. 에이전트가 "불러올지 말지"를 결정할 필요가 없어 규칙 적용 실패율이 0에 가까워집니다.
- **CLAUDE.md**: 얇은 orchestration 파일. "어떤 작업은 어떤 에이전트가 한다"는 위임 규칙만 담습니다.
- **에이전트**: 생성(component-generator, business-logic-generator), 리뷰(code-reviewer) 역할 분리.

> Vercel 실험 결과: 문서 없음 53% → Skills 79% → passive agents.md 방식 100% 통과율

---

## 시작하기

### 1단계: 프로젝트에 복사

```bash
cd your-nextjs-project

cp CLAUDE.md AGENTS.md .
cp -r .claude .

chmod +x .claude/hooks/*.sh
```

### 2단계: Claude Code 실행

```bash
claude
# 세션 시작 시 자동으로:
# - CLAUDE.md + AGENTS.md 로드 (FSD 규칙 항상 적용)
# - session-start.sh 실행
# - hooks 활성화
```

---

## 사용 방법

### 컴포넌트 생성

```
"component-generator 에이전트로 로그인 폼 컴포넌트를 만들어줘"
```

자동 수행:

1. FSD 레이어 결정 (AGENTS.md 참조)
2. Server/Client Component 판단
3. TypeScript 인터페이스 생성
4. Tailwind CSS 스타일링
5. 접근성(ARIA) 적용
6. 파일 생성 → Prettier → ESLint → TypeScript 체크 → FSD import 검증

### 비즈니스 로직 생성

```
"business-logic-generator 에이전트로 User entity의 TanStack Query hooks를 만들어줘"
"business-logic-generator 에이전트로 장바구니 Zustand 스토어를 만들어줘"
"business-logic-generator 에이전트로 Axios 기반 API 클라이언트를 만들어줘"
```

자동 수행:

1. FSD 배치 레이어 결정
2. Zod 스키마 우선 작성 → `z.infer<>` 타입 추론
3. Axios 인스턴스 + 인터셉터
4. Query Keys Factory + useQuery / useMutation
5. Optimistic update 기본 적용
6. Zustand + devtools + persist 미들웨어
7. Public API (index.ts) export

### 코드 리뷰

```
"code-reviewer 에이전트로 방금 만든 컴포넌트를 검토해줘"
```

---

## Hooks 동작 방식

### PreToolUse — 파일 생성/수정 전

| Hook                          | 대상                  | 동작                                                                                |
| ----------------------------- | --------------------- | ----------------------------------------------------------------------------------- |
| `block-dangerous-commands.sh` | Bash 명령             | `rm -rf /`, `sudo rm` 등 차단                                                       |
| `validate-component.sh`       | Write (.tsx/.jsx)     | FSD ui/ 세그먼트 위치 확인, app/ 내 비예약 파일 차단, PascalCase 확인               |
| `validate-fsd-imports.sh`     | Write/Edit (.ts/.tsx) | 상위 레이어 import → exit 2 차단, 같은 레이어 import → 경고, Public API 우회 → 경고 |

**FSD import 차단 예시:**

```
🚨 FSD 위반: entities에서 features import 금지
파일: src/entities/user/api/queries.ts
```

### PostToolUse — 파일 생성/수정 후

```
[파일 Write/Edit]
  → Prettier (포맷팅)
  → ESLint --fix (린트 자동 수정)
  → tsc --noEmit (전체 프로젝트 타입 체크)
```

### Stop — 작업 완료 전

```
[완료 요청]
  → TypeScript 컴파일 체크
  → ESLint 에러 확인
  → Git 상태 확인
  → 오류 있으면 exit 2 (완료 차단)
```

---

## 실전 예시

### 예시 1: Entity 데이터 레이어 구축

```
USER: "business-logic-generator 에이전트로 Product entity의 데이터 레이어를 만들어줘"

CLAUDE:
1. [AGENTS.md] entities/ 레이어로 결정
2. [business-logic-generator 에이전트] 패턴 적용

생성 파일:
  src/entities/product/model/schema.ts     ← Zod 스키마 + z.infer 타입
  src/entities/product/api/productApi.ts   ← Axios API 함수
  src/entities/product/api/queries.ts      ← Query Keys + useQuery 훅
  src/entities/product/api/mutations.ts    ← useMutation + optimistic update
  src/entities/product/index.ts            ← Public API

[PreToolUse] FSD import 규칙 검증 통과
[PostToolUse] Prettier → ESLint → tsc --noEmit
```

### 예시 2: Feature 비즈니스 로직

```
USER: "business-logic-generator 에이전트로 로그인 비즈니스 로직을 만들어줘"

CLAUDE:
1. [AGENTS.md] features/ 레이어로 결정
2. 생성 파일:
   src/features/auth/login/model/schema.ts     ← 폼 검증 Zod 스키마
   src/features/auth/login/api/loginApi.ts     ← Axios API 호출
   src/features/auth/login/model/useLogin.ts   ← useMutation 비즈니스 로직
   src/features/auth/login/index.ts            ← Public API
```

### 예시 3: 컴포넌트 생성 + 리뷰 루프

```
USER: "component-generator 에이전트로 UserCard 컴포넌트를 만들어줘"
→ entities/user/ui/UserCard.tsx 생성

USER: "code-reviewer 에이전트로 검토해줘"
→ 타입 안전성, 접근성, 성능 리뷰

USER: "제안사항 반영해줘"
→ 수정 → FSD import 재검증 → 완료
```

---

## 지원 패턴

### 비즈니스 로직

- Axios 인스턴스 + 요청/응답 인터셉터
- TanStack Query v5 (useQuery, useSuspenseQuery, useMutation, optimistic update)
- Query Keys Factory (일관된 캐시 무효화)
- Zustand + devtools + persist 미들웨어
- Zod 스키마 우선 + `z.infer<>` 타입 추론
- 순수 함수 유틸 (pipe 합성 포함)

### 컴포넌트

- Server Components (기본) / Client Components ("use client" 최소화)
- Tailwind CSS + cn() 조건부 클래스
- 접근성(WCAG AA), 반응형 디자인

### FSD 레이어 검증 (자동)

- 상위 레이어 import 차단
- 같은 레이어 간 import 경고
- Public API 우회 경고
- app/ 내 비예약 컴포넌트 차단

---

## 트러블슈팅

### Hook이 실행되지 않을 때

```bash
chmod +x .claude/hooks/*.sh
# Claude Code 재시작
```

### FSD import 오류가 잘못 차단될 때

`.claude/hooks/validate-fsd-imports.sh`의 레이어 패턴 확인.
`src/` 경로가 올바르게 인식되는지 확인.

### TypeScript 에러가 계속 발생할 때

```bash
npx tsc --noEmit  # 전체 에러 목록 확인
cat tsconfig.json  # strict 모드 활성화 여부 확인
```

---

## 커스터마이징

### 새 에이전트 추가

`.claude/agents/your-agent.md` 생성 후 `CLAUDE.md` 위임 테이블에 등록.

### 새 Hook 추가

`.claude/hooks/your-hook.sh` 생성 후 `.claude/settings.json`에 등록:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/your-hook.sh"
          }
        ]
      }
    ]
  }
}
```

### FSD import 규칙 조정

`.claude/hooks/validate-fsd-imports.sh` 내 `case "$LAYER"` 블록에서 레이어별 금지 패턴 수정.
