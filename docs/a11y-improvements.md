# 접근성(a11y) 개선 작업 목록

> 전체 UI 컴포넌트 접근성 점검 결과. 순서대로 커밋 단위로 진행.

---

## 발견된 문제 요약

| #   | 파일                                        | 문제                                                        | 심각도 |
| --- | ------------------------------------------- | ----------------------------------------------------------- | ------ |
| 1   | `shared/ui/Button.tsx`                      | `aria-label` 등 aria-\* 속성이 DOM에 전달 안 됨 (버그)      | 🔴     |
| 2   | `entities/video/ui/VideoCard.tsx`           | 클릭 가능한 `<div>` → 키보드 접근 불가                      | 🔴     |
| 3   | `widgets/sidebar/ui/NavItem.tsx`            | `aria-current="page"` 없음, button에 `aria-label` 없음      | 🔴     |
| 4   | `widgets/sidebar/ui/SidebarNav.tsx`         | `<nav>/<ul>/<li>` 시맨틱 구조 없음                          | 🟠     |
| 5   | `widgets/sidebar/ui/Sidebar.tsx`            | `<div>` → `<aside>` 로 변경 필요                            | 🟠     |
| 6   | `widgets/sidebar/ui/SidebarFooter.tsx`      | 클릭 가능한 `<div>` → `aria-expanded`, `aria-haspopup` 없음 | 🔴     |
| 7   | `widgets/sidebar/ui/MobileDrawerFooter.tsx` | 동일 (클릭 가능한 `<div>`)                                  | 🔴     |
| 8   | `widgets/sidebar/ui/FooterDropdown.tsx`     | `role="menu"`, `aria-hidden` 없음                           | 🟠     |
| 9   | `features/auth/ui/GoogleLoginButton.tsx` 외 | 장식 SVG에 `aria-hidden="true"` 없음                        | 🟡     |
| 10  | `entities/video/ui/VideoCardSkeleton.tsx`   | 로딩 상태 스크린리더 알림 없음                              | 🟡     |

---

## 작업 1 — `shared/ui/Button.tsx` 버그 수정

**문제:** `ButtonProps`에 `aria-label` 등 aria-\* 속성이 없고 DOM에도 전달 안 됨.
codebase 곳곳에서 `<Button aria-label="...">` 사용 중이나 실제 DOM에 반영 안 됨.

**수정:** `ComponentPropsWithoutRef<"button">` extend → `...props` spread

```tsx
type ButtonProps = VariantProps<typeof buttonVariants> &
  Omit<ComponentPropsWithoutRef<"button">, "children"> & {
    children: ReactNode;
  };

export function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

**효과:** `type`, `disabled`, `aria-*`, `data-*` 등 네이티브 button 속성 전체 지원.

---

## 작업 2 — `entities/video/ui/VideoCard.tsx`

**문제:** `<div onClick>` — 키보드로 Tab 접근, Enter/Space 실행 불가.

```tsx
// 변경 전
<div onClick={() => onClick(video)} className={cn("group cursor-pointer ...", ...)}>

// 변경 후
<button
  type="button"
  onClick={() => onClick(video)}
  aria-label={`${video.title} 재생`}
  className={cn("group cursor-pointer w-full text-left ...", ...)}
>
```

---

## 작업 3 — `widgets/sidebar/ui/NavItem.tsx`

**문제:** 활성 링크에 `aria-current` 없음. 버튼 타입 항목에 `aria-label` 없음 (사이드바 축소 시 텍스트 사라짐).

```tsx
// Link
<Link href={item.href} className={innerClass} aria-current={isActive ? "page" : undefined}>

// button
<button type="button" onClick={item.onClick} className={innerClass} aria-label={item.label}>
```

---

## 작업 4 — `widgets/sidebar/ui/SidebarNav.tsx`

**문제:** `<div>` 래퍼. 스크린리더가 네비게이션 영역 인식 불가.

```tsx
<nav aria-label="주 네비게이션" className="flex flex-col flex-1 ...">
  <ul className="flex flex-col gap-1">
    {items.map((item) => (
      <li key={item.id}>
        <NavItem ... />
      </li>
    ))}
  </ul>
</nav>
```

---

## 작업 5 — `widgets/sidebar/ui/Sidebar.tsx`

**문제:** `<div id="sidebar">` — 보조 네비게이션 영역임을 시맨틱으로 표현 안 됨.

```tsx
// div → aside
<aside id="sidebar" aria-label="사이드바" className={cn(...)}>
```

---

## 작업 6 — `widgets/sidebar/ui/SidebarFooter.tsx`

**문제:** 드롭다운 트리거가 `<div onClick>`. 키보드 접근 불가, `aria-expanded` 없음.

```tsx
<button
  type="button"
  onClick={() => setIsDropdownOpen((prev) => !prev)}
  aria-expanded={isSidebarOpen ? isDropdownOpen : false}
  aria-haspopup="menu"
  aria-label="사용자 메뉴"
  className="group hover:bg-peach-pastel/25 ... w-full text-left"
>
```

---

## 작업 7 — `widgets/sidebar/ui/MobileDrawerFooter.tsx`

**문제:** 작업 6과 동일.

```tsx
<button
  type="button"
  onClick={() => setIsOpen((prev) => !prev)}
  aria-expanded={isOpen}
  aria-haspopup="menu"
  aria-label="사용자 메뉴"
  className="group flex items-center ... w-full text-left"
>
```

---

## 작업 8 — `widgets/sidebar/ui/FooterDropdown.tsx`

**문제:** 드롭다운 메뉴에 `role="menu"`, 닫힌 상태에서 `aria-hidden` 없음.

```tsx
<div role="menu" aria-hidden={!isOpen} className={cn("absolute z-50 ...", ...)}>
  {MENU_ITEMS.map((item) => (
    <button role="menuitem" ... />
  ))}
</div>
```

---

## 작업 9 — 장식 SVG `aria-hidden` (3곳)

- `features/auth/ui/GoogleLoginButton.tsx` — SVG에 `aria-hidden="true"`
- `features/auth/ui/KakaoLoginButton.tsx` — SVG에 `aria-hidden="true"`
- `shared/ui/EmptyState.tsx` — icon div에 `aria-hidden="true"`

---

## 작업 10 — `entities/video/ui/VideoCardSkeleton.tsx`

**문제:** 로딩 상태를 스크린리더에 알리지 않음.

```tsx
<div role="status" aria-busy="true" aria-label="영상 목록 로딩 중" className="...">
```
