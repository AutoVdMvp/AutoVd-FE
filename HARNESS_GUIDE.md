# 🎯 Next.js Frontend Harness Engineering System

## 📦 설치된 시스템 구조

```
프로젝트 루트/
│
├── CLAUDE.md                           # 핵심 행동 규칙 (Next.js 15/16 트렌드)
│
└── .claude/
    ├── settings.json                   # Hooks & 권한 설정
    │
    ├── agents/                         # 전문 에이전트 (팀원)
    │   ├── component-generator.md      # 컴포넌트 생성 전문가
    │   └── code-reviewer.md            # 코드 품질 검사관
    │
    ├── skills/                         # 재사용 가능한 스킬
    │   ├── component-generator.md      # 컴포넌트 생성 패턴
    │   └── business-logic-generator.md # 비즈니스 로직 패턴
    │
    └── hooks/                          # 자동화 스크립트 (실행권한 설정됨)
        ├── block-dangerous-commands.sh # 위험 명령어 차단
        ├── validate-component.sh       # 컴포넌트 검증
        ├── session-start.sh            # 세션 시작 정보 로드
        └── pre-stop-validation.sh      # 작업 완료 전 품질 체크
```

---

## 🚀 시작하기

### 1단계: 프로젝트에 복사

생성된 파일들을 당신의 Next.js 프로젝트에 복사하세요:

```bash
# 프로젝트 루트로 이동
cd your-nextjs-project

# CLAUDE.md 복사
cp /home/claude/CLAUDE.md .

# .claude 디렉토리 전체 복사
cp -r /home/claude/.claude .

# 실행 권한 확인
chmod +x .claude/hooks/*.sh
```

### 2단계: Claude Code 실행

```bash
# 프로젝트 디렉토리에서 Claude Code 실행
claude

# 세션 시작 시 자동으로:
# - CLAUDE.md 로드
# - session-start.sh 실행 (프로젝트 정보 표시)
# - hooks 활성화
```

---

## 💡 사용 방법

### 컴포넌트 생성 (에이전트 활용)

```bash
# Claude Code 채팅에서:
"컴포넌트 생성 에이전트를 사용해서 로그인 폼 컴포넌트를 만들어줘"
```

**자동으로 수행되는 작업:**

1. ✅ Server/Client Component 판단
2. ✅ TypeScript 인터페이스 생성
3. ✅ Tailwind CSS 스타일링
4. ✅ 접근성(ARIA) 적용
5. ✅ Zod 유효성 검사 (폼의 경우)
6. ✅ 파일 생성 후 자동 Prettier 포맷팅
7. ✅ ESLint 자동 수정
8. ✅ TypeScript 타입 체크

### 비즈니스 로직 생성 (스킬 활용)

```bash
# TanStack Query 설정
"비즈니스 로직 스킬을 사용해서 유저 API를 위한 TanStack Query hooks를 만들어줘"

# Zustand Store 생성
"Zustand로 장바구니 상태 관리 스토어를 만들어줘"

# API 클라이언트 생성
"상품 API를 위한 API 클라이언트 함수들을 만들어줘"
```

### 코드 리뷰 (피드백 루프)

```bash
# 1단계: 코드 생성
"로그인 폼 컴포넌트를 만들어줘"

# 2단계: 자동 리뷰 요청
"코드 리뷰어 에이전트를 사용해서 방금 만든 컴포넌트를 검토해줘"

# 3단계: 수정 반영
에이전트가 제안한 수정사항을 검토하고 반영

# 4단계: 재검토
"다시 리뷰해줘"

# 반복하여 완벽한 코드 달성 ✨
```

---

## 🔧 Hooks 동작 방식

### 자동 포맷팅 (PostToolUse)

파일을 Write/Edit 할 때마다 자동으로:

- **Prettier**: 코드 포맷팅
- **ESLint**: 린트 에러 자동 수정
- **TypeScript**: 타입 체크

```
[파일 생성] → [Prettier 실행] → [ESLint 수정] → [TypeScript 체크] → ✅ 완료
```

### 안전 가드 (PreToolUse)

위험한 명령어 실행 전 차단:

- `rm -rf /` ❌ 차단
- `sudo rm` ❌ 차단
- `chmod 777` ❌ 차단
- `rm -rf node_modules` ⚠️ 경고 후 허용

### 작업 완료 검증 (Stop Hook)

작업을 완료하려고 할 때 자동으로:

1. TypeScript 컴파일 체크
2. ESLint 에러 확인
3. Git 상태 확인
4. 모든 체크 통과해야 완료 가능

---

## 📚 실전 예시

### 예시 1: 대시보드 컴포넌트 생성

```
👤 USER: "대시보드 통계 카드 컴포넌트를 만들어줘. 숫자, 제목, 아이콘, 증감률을 표시해야 해."

🤖 CLAUDE:
1. [CLAUDE.md 참조] - Server Component로 판단
2. [component-generator 스킬 참조] - 패턴 선택
3. 컴포넌트 생성
4. [PostToolUse hooks 실행] - 자동 포맷팅, 린트
5. 완성된 코드 제공 ✅

👤 USER: "코드 리뷰어 에이전트로 검토해줘"

🤖 CODE REVIEWER:
📊 리뷰 결과:
- ✅ 11개 체크 통과
- ⚠️  1개 경고: 반응형 디자인 개선 가능
- 💡 2개 제안: 스켈레톤 로딩, 애니메이션 추가

👤 USER: "제안사항 반영해줘"

🤖 CLAUDE:
[수정 반영] → [hooks 실행] → ✅ 개선 완료
```

### 예시 2: API 레이어 구축

```
👤 USER: "상품 목록을 가져오는 TanStack Query 설정을 만들어줘"

🤖 CLAUDE:
1. [business-logic-generator 스킬 참조]
2. 생성 파일:
   - lib/api/client.ts
   - lib/api/queries/products.ts
   - lib/api/queries/products.hooks.ts
3. [PostToolUse hooks] - 자동 포맷팅
4. ✅ 완료

[자동 생성된 내용]
- TypeScript 타입 정의
- Query key factory
- Custom hooks (useProducts, useSuspenseProducts)
- Prefetch helper
```

### 예시 3: 상태 관리 스토어 생성

```
👤 USER: "장바구니 Zustand 스토어를 만들어줘"

🤖 CLAUDE:
[business-logic-generator 스킬 사용]

생성된 기능:
- addItem (상품 추가)
- removeItem (상품 제거)
- updateQuantity (수량 변경)
- clearCart (장바구니 비우기)
- total 자동 계산
- itemCount 자동 계산
- localStorage 자동 저장 (persist middleware)
- DevTools 연동

✅ 완료 - lib/stores/cart-store.ts
```

---

## 🎨 지원되는 패턴

### 컴포넌트 패턴

- ✅ Server Components (기본)
- ✅ Client Components ("use client")
- ✅ Compound Components (공유 상태)
- ✅ Form Components (Zod 검증)
- ✅ Data Display Components
- ✅ Layout Components

### 상태 관리

- ✅ TanStack Query (서버 상태)
- ✅ Zustand (클라이언트 상태)
- ✅ Context API (간단한 전역 상태)

### 스타일링

- ✅ Tailwind CSS (유틸리티 우선)
- ✅ cn() 헬퍼 (조건부 클래스)
- ✅ 반응형 디자인
- ✅ 다크모드 지원

### 타입 안정성

- ✅ TypeScript strict mode
- ✅ No `any` 타입
- ✅ Zod 스키마 검증
- ✅ API 타입 정의

---

## 🔍 트러블슈팅

### Hook이 실행되지 않을 때

```bash
# 실행 권한 확인
ls -la .claude/hooks/

# 권한 부여
chmod +x .claude/hooks/*.sh

# Claude Code 재시작
```

### TypeScript 에러가 계속 발생할 때

```bash
# 프로젝트 TypeScript 설정 확인
cat tsconfig.json

# strict 모드 활성화 여부 확인
"strict": true,
"noUncheckedIndexedAccess": true
```

### 에이전트가 응답하지 않을 때

```bash
# 에이전트 파일 위치 확인
ls -la .claude/agents/

# 파일 내용 확인
cat .claude/agents/component-generator.md
```

---

## ⚙️ 커스터마이징

### 자신만의 규칙 추가

`CLAUDE.md` 파일을 편집하여 프로젝트 특화 규칙을 추가하세요:

```markdown
## 우리 팀의 규칙

### 네이밍 컨벤션

- 컴포넌트: PascalCase (UserCard.tsx)
- Hook: camelCase with "use" prefix (useAuth.ts)
- Utils: camelCase (formatDate.ts)

### 폴더 구조

- API 함수: lib/api/
- 상태 관리: lib/stores/
- 유틸리티: lib/utils/
```

### 새로운 Hook 추가

`.claude/hooks/` 디렉토리에 새 스크립트를 추가하고,
`.claude/settings.json`에 등록:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/custom-validation.sh"
          }
        ]
      }
    ]
  }
}
```

---

## 📊 품질 지표

이 시스템으로 기대할 수 있는 품질:

### 타입 안정성

- ✅ 0개의 `any` 타입
- ✅ 100% TypeScript strict mode
- ✅ 컴파일 에러 사전 차단

### 성능

- ✅ Server Component 우선 사용
- ✅ 최소화된 클라이언트 번들
- ✅ Next.js Image 자동 최적화

### 접근성

- ✅ WCAG AA 준수
- ✅ 의미론적 HTML
- ✅ 키보드 네비게이션
- ✅ 스크린 리더 지원

### 유지보수성

- ✅ 일관된 코드 스타일
- ✅ 명확한 파일 구조
- ✅ 자체 문서화 코드
- ✅ 재사용 가능한 패턴

---

## 🎓 학습 자료

이 시스템을 최대한 활용하려면:

1. **CLAUDE.md 읽기**
   - Next.js 15/16 규칙
   - TypeScript 패턴
   - 상태 관리 아키텍처

2. **스킬 파일 탐색**
   - component-generator.md
   - business-logic-generator.md

3. **에이전트 이해하기**
   - 각 에이전트의 전문 분야
   - 협업 워크플로우

---

## 💬 피드백 & 개선

이 시스템은 계속 진화합니다:

1. **잘 작동하는 패턴 발견 시**
   - CLAUDE.md에 추가
   - 스킬로 문서화

2. **반복되는 실수 발견 시**
   - Hook으로 자동 차단
   - 검증 규칙 추가

3. **새로운 트렌드 발견 시**
   - 문서 업데이트
   - 패턴 추가

---

## 🎉 완성!

당신의 Next.js 프론트엔드 개발이 이제:

- 🚀 **더 빠르게** - 자동화된 워크플로우
- 🛡️ **더 안전하게** - 타입 안정성과 검증
- 🎨 **더 일관되게** - 통일된 패턴
- ✨ **더 품질 높게** - 자동 코드 리뷰

**Happy Coding with Harness Engineering! 🎯**
