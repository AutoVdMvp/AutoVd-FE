# AutoVD - Auto Vision Design Platform

Next.js 기반의 프로젝트입니다. Feature-Sliced Design(F.S.D) 아키텍처를 따릅니다.

## 기술 스택

- **Framework**: Next.js 16.2.6
- **React**: 19.2.4
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Linting**: ESLint 9

## 프로젝트 구조

```
src/
├── app/              # App Router (라우팅)
├── features/         # 비즈니스 로직 (기능별)
├── widgets/          # 복합 UI 컴포넌트
├── templates/        # 페이지 레이아웃 템플릿
├── entities/         # 데이터 엔티티 및 타입
└── shared/           # 공유 자산
    ├── ui/           # 기본 UI 컴포넌트
    ├── lib/          # 유틸리티, 상수
    ├── styles/       # 전역 스타일
    ├── api/          # API 클라이언트
    ├── store/        # Zustand stores
    ├── hooks/        # 커스텀 hooks
    └── providers/    # Context providers
```

## 개발 가이드

### Feature-Sliced Design (F.S.D)

- **app**: Next.js App Router 구조 (라우팅, 레이아웃)
- **features**: 독립적인 비즈니스 로직 모음 (로그인, 검색 등)
- **widgets**: 여러 컴포넌트를 조합한 복합 UI
- **pages**: 페이지 레벨의 레이아웃과 구성
- **entities**: 비즈니스 데이터 모델 및 타입
- **shared**: 전역으로 사용되는 공유 자산

## 주요 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## 경로 별칭 (Path Aliases)

```typescript
@/*         → 루트
@templates/*→ src/templates
@widgets/*  → src/widgets
@features/* → src/features
@entities/* → src/entities
@shared/*   → src/shared
```

## 시작하기

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

---

**Framework**: Next.js 16 | **UI**: Tailwind CSS 4 | **Language**: TypeScript
