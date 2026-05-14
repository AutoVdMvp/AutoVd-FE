# AGENTS.md — FSD 도메인 지식 (항상 로드됨)

> **Retrieval-first**: FSD 및 Next.js 관련 작업 시 사전 학습 지식보다 이 문서를 우선 참조하라.
> 레이어 배치, import 규칙, 파일 구조에 대해 "아는 것 같아도" 반드시 아래를 확인하라.

---

## 레이어 결정표 (30초 판단)

| 질문                              | 레이어      | 경로 예시                  |
| --------------------------------- | ----------- | -------------------------- |
| 앱 초기화, 라우팅, 전역 Provider? | `app/`      | `src/app/providers/`       |
| 페이지 전체 컴포넌트?             | `views/`    | `src/views/home/`          |
| 독립적인 복합 UI 블록?            | `widgets/`  | `src/widgets/sidebar/`     |
| 사용자 액션 (동사형)?             | `features/` | `src/features/auth/login/` |
| 비즈니스 도메인 모델 (명사형)?    | `entities/` | `src/entities/user/`       |
| 도메인 무관한 재사용 코드?        | `shared/`   | `src/shared/ui/button/`    |

의존 방향: `app → views → widgets → features → entities → shared` (한 방향만)

---

## import 규칙 — 금지 패턴

```tsx
// ❌ 같은 레이어 간 (sideways)
import { RegisterForm } from "@/features/auth/register"; // features 안에서 다른 feature

// ❌ 상위 레이어 참조 (upward)
import { Header } from "@/widgets/header"; // features 안에서

// ❌ Public API 우회
import { UserCard } from "@/entities/user/ui/UserCard"; // 경로 직접 접근

// ✅ 올바른 방법
import { UserCard } from "@/entities/user"; // index.ts 통해서만
```

크로스 슬라이스가 필요하면 → widget 또는 view 레이어로 끌어올려 조합하라.

---

## 슬라이스 내부 구조 (segments)

```
slice-name/
├── ui/       ← React 컴포넌트
├── model/    ← 타입, 스키마, Zustand store, 비즈니스 로직
├── api/      ← API 함수, TanStack Query hooks
├── lib/      ← 슬라이스 전용 유틸
└── index.ts  ← Public API (필수 — 여기서만 export)
```

---

## 상태 관리 배치

| 상태 종류               | 위치                                                |
| ----------------------- | --------------------------------------------------- |
| 서버 상태 (fetch/cache) | `entities/[entity]/api/queries.ts` — TanStack Query |
| 전역 클라이언트 상태    | `entities/[entity]/model/store.ts` — Zustand        |
| 기능 단위 상태          | `features/[feature]/model/store.ts` — Zustand       |
| UI 상태 (사이드바 등)   | `widgets/[widget]/model/` 또는 `shared/model/`      |

---

## Next.js App Router 패턴

```tsx
// app/dashboard/page.tsx — 라우팅만. 로직 없음.
import { DashboardPage } from "@/views/dashboard";
export default function Page() {
  return <DashboardPage />;
}

// src/views/dashboard/ui/DashboardPage.tsx — 페이지 조합
import { DashboardStats } from "@/widgets/dashboard-stats";
import { Header } from "@/widgets/header";
```

---

## 자주 틀리는 것

- `app/` 디렉토리에 컴포넌트 로직 작성 → `views/`로
- entity끼리 서로 import → 공통 로직은 `shared/`로
- feature에서 다른 feature import → `widgets/`로 끌어올려 조합
- `index.ts` 없이 경로 직접 import → 항상 `index.ts` 통해서

---

## 상세 참조 문서

- 컴포넌트 생성 패턴: `.claude/agents/component-generator.md`
- 비즈니스 로직 패턴: `.claude/agents/business-logic-generator.md`
- 코드 리뷰 기준: `.claude/agents/code-reviewer.md`
