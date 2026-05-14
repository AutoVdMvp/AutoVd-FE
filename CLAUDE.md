@AGENTS.md

# CLAUDE.md — 에이전트 지시 및 위임 규칙

이 프로젝트는 **Next.js 15/16 + FSD(Feature-Sliced Design) + TypeScript strict** 기반입니다.
FSD 아키텍처 규칙은 AGENTS.md에 항상 로드됩니다. 코드 작업 전 반드시 참조하세요.

---

## 핵심 원칙: 코딩 전에 생각하라

구현 전 반드시 확인:

- **어떤 FSD 레이어**에 속하는가? → AGENTS.md의 레이어 결정표 참조
- **여러 접근 방법**이 존재하면 조용히 선택하지 말고 제시하라
- **더 단순한 방법**이 있으면 말하라
- **불명확한 것**이 있으면 멈추고 질문하라

---

## 에이전트 위임 규칙

작업 유형에 따라 아래 전문 에이전트를 사용하라:

| 작업                                              | 사용 에이전트              |
| ------------------------------------------------- | -------------------------- |
| 컴포넌트 생성 (UI, Entity, Feature, Widget, View) | `component-generator`      |
| 비즈니스 로직 (TanStack Query, Zustand, API)      | `business-logic-generator` |
| 코드 리뷰 (타입 안전성, 성능, 접근성, 보안)       | `code-reviewer`            |

에이전트 호출 예시: "component-generator 에이전트로 UserCard 컴포넌트를 만들어줘"

---

## TypeScript

`any` 금지. strict mode 비협상. 모든 props에 인터페이스 정의.
