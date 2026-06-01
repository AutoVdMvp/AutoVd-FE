# 프론트엔드 작업 목록 (백엔드 API 대기 중)

> 백엔드 API 개발 지연 기간 동안 독립적으로 진행 가능한 프론트엔드 작업 목록.
> 모든 항목은 백엔드 없이 진행 가능.

---

## 현황 요약

| 항목             | 상태                                        |
| ---------------- | ------------------------------------------- |
| 프레임워크       | Next.js 15 App Router + FSD                 |
| 전체 완성도      | 약 70%                                      |
| 인증 시스템      | ✅ 완성 (RT/AT 분리, 자동 갱신)             |
| 공통 API 레이어  | ✅ 완성 (axios 인터셉터, 에러 정규화)       |
| 상태관리         | ✅ 완성 (authStore, uiStore, tutorialStore) |
| 공통 UI 컴포넌트 | ⚠️ 미흡 (Button, EditorInput만 있음)        |
| 라우팅 가드      | ⚠️ 주석 처리된 상태                         |
| API 쿼리 훅      | ⚠️ Mock 데이터 사용 중                      |

---

## 우선순위별 작업

### 🔴 1순위 — 공통 UI 인프라 (`src/shared/ui/`)

`src/shared/ui/modal/` 폴더가 비어있고, 알림/에러 시스템이 없음.
API 연동 시 반드시 필요하고 지금 바로 구현 가능.

| 컴포넌트      | 위치                          | 비고                                            |
| ------------- | ----------------------------- | ----------------------------------------------- |
| 범용 Dialog   | `shared/ui/modal/`            | VideoModal·TutorialModal이 제각각 구현 중       |
| Toast / 알림  | `shared/ui/Toast/`            | `usePostLink` 훅이 이미 이 기능을 기다리고 있음 |
| Spinner       | `shared/ui/Spinner.tsx`       | 전역 로딩 스피너                                |
| EmptyState    | `shared/ui/EmptyState.tsx`    | 비디오 목록 비었을 때 등                        |
| ErrorBoundary | `shared/ui/ErrorBoundary.tsx` | React 에러 경계                                 |

---

### 🟠 2순위 — 미들웨어 라우팅 가드 활성화

**파일:** `src/middleware.ts`

보호 로직이 이미 작성되어 있지만 전부 주석 처리된 상태.
백엔드 `/api/auth/refresh` 엔드포인트 연동 전에 로직을 활성화하고 테스트 필요.

```typescript
// 활성화 대상 로직
if (!token && !isPublic) {
  return NextResponse.redirect(new URL("/login", request.url));
}
if (token && pathname === "/login") {
  return NextResponse.redirect(new URL("/", request.url));
}
```

**함께 만들 것:**

- `src/app/not-found.tsx` — 404 페이지
- `src/app/error.tsx` — 500 에러 페이지

---

### 🟠 3순위 — Query Key Factory 패턴 구현

`src/views/videos/ui/VideosView.tsx`에 아래 주석이 있음:

```typescript
// const { data: videos } = useSuspenseQuery(videoQueries.list())
```

`videoQueries` 객체가 없어서 주석 상태. 지금 만들어두면 API 연동 시 바로 연결 가능.

**구현 위치:** `src/entities/video/api/queries.ts`

```typescript
export const videoQueries = {
  all: () => ["videos"] as const,
  list: () => [...videoQueries.all(), "list"] as const,
  detail: (id: string) => [...videoQueries.all(), id] as const,
};
```

authQueries도 동일 패턴: `src/shared/api/queries/authQueries.ts`

---

### 🟡 4순위 — 폼 Validation 시스템

`ArticleEditor`에 URL 형식 검증이 없고, 에러 메시지 UI도 없음.
`EditorInput`이 contentEditable div라 기본 HTML validation API를 쓸 수 없음.

**구현 대상:**

- `src/shared/ui/FormError.tsx` — 에러 메시지 표시 컴포넌트
- `src/shared/lib/validators.ts` — URL 형식, 필수 입력 등 검증 함수

---

### 🟡 5순위 — 접근성(a11y) 개선

나중에 몰아서 하면 수정량이 많아지는 작업.

| 파일                                    | 수정 내용                                        |
| --------------------------------------- | ------------------------------------------------ |
| `entities/video/ui/VideoCard.tsx`       | `alt` 텍스트, `role`, `aria-label` 추가          |
| `widgets/video-modal/ui/VideoModal.tsx` | `role="dialog"`, `aria-modal`, `aria-label` 추가 |
| `shared/ui/Button.tsx`                  | `disabled`, `aria-disabled` props 지원 추가      |
| `widgets/sidebar/ui/NavItem.tsx`        | 현재 페이지 표시 `aria-current="page"` 추가      |

---

### 🟡 6순위 — `shared/config` 폴더 생성

API 엔드포인트가 각 파일에 문자열로 흩어져 있음.
백엔드 명세가 확정됐을 때 한 곳만 수정하면 되도록 중앙화.

```
src/shared/config/
├── endpoints.ts    ← API 엔드포인트 상수
└── env.ts         ← 환경 변수 검증 (NEXT_PUBLIC_API_URL 존재 여부 등)
```

---

### 🔵 7순위 — 추가 페이지 구현

`src/shared/lib/navigation.ts`에 정의되어 있지만 뷰가 없는 라우트들.
Mock 데이터로 UI 먼저 구현 가능.

- 비디오 상세 페이지 (`/videos/[id]`) — 기존 VideoModal 활용
- 에러 페이지 (`not-found`, `error`) — 2순위와 겹침

---

## 요약 표

| 작업                                      | 주요 파일/위치                       | 백엔드 필요 | 규모 |
| ----------------------------------------- | ------------------------------------ | ----------- | ---- |
| 공통 UI 인프라 (Toast, Modal, Spinner...) | `shared/ui/`                         | ❌          | 중   |
| 미들웨어 라우팅 가드 활성화               | `middleware.ts`                      | ❌          | 소   |
| 404/500 에러 페이지                       | `app/`                               | ❌          | 소   |
| Query Key Factory                         | `entities/video/api/`, `shared/api/` | ❌          | 소   |
| 폼 Validation                             | `shared/ui/`, `shared/lib/`          | ❌          | 중   |
| 접근성 개선                               | 각 컴포넌트                          | ❌          | 중   |
| shared/config                             | `shared/config/`                     | ❌          | 소   |
