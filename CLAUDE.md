@AGENTS.md

# CLAUDE.md - Next.js Frontend Development Guidelines (FSD Architecture)

Behavioral guidelines for Next.js 15/16 + React Server Components + Feature-Sliced Design. Follows 2026 best practices.

**Philosophy:** Feature-Sliced Design (FSD) + TypeScript strict mode + Modern patterns.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- **State layer placement**: Which FSD layer does this belong to? (features? entities? shared?)
- **If multiple approaches exist, present them** - don't pick silently.
- **If a simpler approach exists, say so.** 
- **If something is unclear, stop.** Name what's confusing. Ask.

---

## 2. Feature-Sliced Design (FSD) Architecture

**Organize by business domain, not technical role. Strict layer hierarchy.**

### FSD Layer Hierarchy (Top → Bottom)

```
┌─────────────────┐
│     app         │ ← Initialization, routing, global providers
├─────────────────┤
│     views       │ ← Page business logic (Next.js pages)
├─────────────────┤
│    widgets      │ ← Self-contained UI blocks (Dashboard, Header)
├─────────────────┤
│    features     │ ← User actions (Login, AddToCart, RateProduct)
├─────────────────┤
│    entities     │ ← Business models (User, Product, Order)
├─────────────────┤
│     shared      │ ← Reusable code (UI kit, utils, API client)
└─────────────────┘

Dependency Rule: Can ONLY import from layers below ⬇️
```

### Project Structure

```
project-root/
├── app/                    # Next.js App Router (routing only)
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx   # Imports from src/views
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx       # Imports from src/views
│   ├── layout.tsx
│   └── page.tsx
│
├── pages/                  # Empty (Next.js compatibility)
│   └── README.md          # "This folder prevents build errors"
│
└── src/                    # FSD layers
    ├── app/               # App layer: initialization
    │   ├── providers/
    │   │   ├── query-provider.tsx
    │   │   └── theme-provider.tsx
    │   ├── styles/
    │   │   └── globals.css
    │   └── index.ts       # Public API
    │
    ├── views/             # Views layer: page logic
    │   ├── home/
    │   │   ├── ui/
    │   │   │   └── HomePage.tsx
    │   │   └── index.ts
    │   ├── dashboard/
    │   │   ├── ui/
    │   │   │   └── DashboardPage.tsx
    │   │   ├── model/
    │   │   │   └── useDashboardData.ts
    │   │   └── index.ts
    │   └── login/
    │       ├── ui/
    │       │   └── LoginPage.tsx
    │       └── index.ts
    │
    ├── widgets/           # Widgets layer: complex UI blocks
    │   ├── header/
    │   │   ├── ui/
    │   │   │   ├── Header.tsx
    │   │   │   └── UserMenu.tsx
    │   │   ├── model/
    │   │   │   └── useHeaderState.ts
    │   │   └── index.ts
    │   ├── sidebar/
    │   │   ├── ui/
    │   │   │   └── Sidebar.tsx
    │   │   ├── model/
    │   │   │   └── useSidebarState.ts
    │   │   └── index.ts
    │   └── dashboard-stats/
    │       ├── ui/
    │       │   └── DashboardStats.tsx
    │       └── index.ts
    │
    ├── features/          # Features layer: user actions
    │   ├── auth/
    │   │   ├── login/
    │   │   │   ├── ui/
    │   │   │   │   └── LoginForm.tsx
    │   │   │   ├── model/
    │   │   │   │   ├── useLogin.ts
    │   │   │   │   └── schema.ts
    │   │   │   ├── api/
    │   │   │   │   └── loginApi.ts
    │   │   │   └── index.ts
    │   │   └── logout/
    │   │       ├── ui/
    │   │       │   └── LogoutButton.tsx
    │   │       ├── model/
    │   │       │   └── useLogout.ts
    │   │       └── index.ts
    │   ├── cart/
    │   │   ├── add-to-cart/
    │   │   │   ├── ui/
    │   │   │   │   └── AddToCartButton.tsx
    │   │   │   ├── model/
    │   │   │   │   └── useAddToCart.ts
    │   │   │   └── index.ts
    │   │   └── remove-from-cart/
    │   │       ├── ui/
    │   │       │   └── RemoveButton.tsx
    │   │       └── index.ts
    │   └── rating/
    │       ├── rate-product/
    │       │   ├── ui/
    │       │   │   └── RatingForm.tsx
    │       │   └── index.ts
    │       └── index.ts
    │
    ├── entities/          # Entities layer: business models
    │   ├── user/
    │   │   ├── ui/
    │   │   │   ├── UserCard.tsx
    │   │   │   └── UserAvatar.tsx
    │   │   ├── model/
    │   │   │   ├── types.ts
    │   │   │   ├── schema.ts
    │   │   │   └── store.ts  # Zustand store
    │   │   ├── api/
    │   │   │   ├── userApi.ts
    │   │   │   └── queries.ts  # TanStack Query
    │   │   ├── lib/
    │   │   │   └── formatUserName.ts
    │   │   └── index.ts       # Public API
    │   ├── product/
    │   │   ├── ui/
    │   │   │   ├── ProductCard.tsx
    │   │   │   └── ProductImage.tsx
    │   │   ├── model/
    │   │   │   ├── types.ts
    │   │   │   └── schema.ts
    │   │   ├── api/
    │   │   │   ├── productApi.ts
    │   │   │   └── queries.ts
    │   │   └── index.ts
    │   └── order/
    │       ├── ui/
    │       │   └── OrderCard.tsx
    │       ├── model/
    │       │   ├── types.ts
    │       │   └── store.ts
    │       ├── api/
    │       │   └── orderApi.ts
    │       └── index.ts
    │
    └── shared/            # Shared layer: reusable code
        ├── ui/            # UI kit
        │   ├── button/
        │   │   ├── Button.tsx
        │   │   └── index.ts
        │   ├── input/
        │   │   ├── Input.tsx
        │   │   └── index.ts
        │   ├── card/
        │   │   ├── Card.tsx
        │   │   └── index.ts
        │   └── index.ts   # Barrel export
        ├── api/           # API client
        │   ├── client.ts
        │   ├── config.ts
        │   └── index.ts
        ├── lib/           # Utilities
        │   ├── cn.ts
        │   ├── format.ts
        │   ├── validation.ts
        │   └── index.ts
        ├── config/
        │   ├── routes.ts
        │   └── env.ts
        ├── types/
        │   └── common.ts
        └── hooks/         # Generic hooks
            ├── useDebounce.ts
            ├── useMediaQuery.ts
            └── index.ts
```

---

## 3. FSD Import Rules (CRITICAL)

**Strict hierarchy. No circular dependencies.**

### ✅ Allowed Imports

```tsx
// app → can import all layers
import { QueryProvider } from '@/app/providers';
import { HomePage } from '@/views/home';
import { Header } from '@/widgets/header';
import { LoginForm } from '@/features/auth/login';
import { UserCard } from '@/entities/user';
import { Button } from '@/shared/ui/button';

// views → widgets, features, entities, shared
import { DashboardStats } from '@/widgets/dashboard-stats';
import { LoginForm } from '@/features/auth/login';
import { UserCard } from '@/entities/user';
import { Button } from '@/shared/ui/button';

// widgets → features, entities, shared
import { AddToCartButton } from '@/features/cart/add-to-cart';
import { ProductCard } from '@/entities/product';
import { Button } from '@/shared/ui/button';

// features → entities, shared
import { UserAvatar } from '@/entities/user';
import { Button } from '@/shared/ui/button';

// entities → shared only
import { Button } from '@/shared/ui/button';
import { apiClient } from '@/shared/api';

// shared → external packages only
import { clsx } from 'clsx';
import { z } from 'zod';
```

### ❌ Forbidden Imports

```tsx
// ❌ Same layer (sideways)
import { LoginForm } from '@/features/auth/login';  // from another feature
import { ProductCard } from '@/entities/product';   // from another entity

// ❌ Upper layer
import { Header } from '@/widgets/header';          // from features
import { HomePage } from '@/views/home';            // from widgets

// ❌ Direct segment import (bypass Public API)
import { UserCard } from '@/entities/user/ui/UserCard';  // Wrong!
import { UserCard } from '@/entities/user';              // Correct!
```

---

## 4. Public API Pattern (Required)

**Every slice MUST expose a Public API via index.ts**

```tsx
// entities/user/index.ts
export { UserCard } from './ui/UserCard';
export { UserAvatar } from './ui/UserAvatar';
export { getUser, updateUser } from './api/userApi';
export { useUser, useUpdateUser } from './api/queries';
export { useUserStore } from './model/store';
export type { User, UserRole } from './model/types';
export { userSchema } from './model/schema';

// ✅ Correct external import
import { UserCard, type User, useUser } from '@/entities/user';

// ❌ Wrong - bypassing Public API
import { UserCard } from '@/entities/user/ui/UserCard';
import type { User } from '@/entities/user/model/types';
```

---

## 5. Segment Structure (Inside Each Slice)

```
feature-name/
├── ui/              # React components
├── model/           # State, types, schemas, business logic
├── api/             # API calls, TanStack Query
├── lib/             # Slice-specific utilities
├── config/          # Feature flags, constants
└── index.ts         # Public API (required)
```

### Segment Naming Convention

- **ui/** - Components and styles
- **model/** - Types, schemas, stores (Zustand), business logic
- **api/** - API client, TanStack Query definitions
- **lib/** - Utilities specific to this slice
- **config/** - Configuration, feature flags

---

## 6. Next.js Integration Pattern

### App Router (Routing Only)

```tsx
// app/dashboard/page.tsx
import { DashboardPage } from '@/views/dashboard';

export default function Page() {
  return <DashboardPage />;
}
```

### Views Layer (Page Logic)

```tsx
// src/views/dashboard/ui/DashboardPage.tsx
import { DashboardStats } from '@/widgets/dashboard-stats';
import { Header } from '@/widgets/header';

export function DashboardPage() {
  return (
    <div>
      <Header />
      <main>
        <DashboardStats />
      </main>
    </div>
  );
}
```

---

## 7. TypeScript Strict Mode (Non-Negotiable)

**Same as before - no changes**

---

## 8. State Management Architecture (FSD Style)

### Server State (TanStack Query)

Place in **entities/[entity]/api/**:

```tsx
// entities/user/api/queries.ts
import { useQuery } from '@tanstack/react-query';
import { getUser } from './userApi';

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
}
```

### Client State (Zustand)

Place in **entities/[entity]/model/store.ts** or **features/[feature]/model/store.ts**:

```tsx
// entities/user/model/store.ts
import { create } from 'zustand';

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
```

### UI State (Local Zustand)

Place in **shared/model/** or **widgets/[widget]/model/**:

```tsx
// shared/model/uiStore.ts
import { create } from 'zustand';

interface UIStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
}));
```

---

## 9. Component Design Patterns (FSD Context)

### Feature Component

```tsx
// features/auth/login/ui/LoginForm.tsx
"use client";

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useLogin } from '../model/useLogin';

export function LoginForm() {
  const { login, isLoading } = useLogin();
  
  return (
    <form onSubmit={login}>
      <Input name="email" />
      <Input name="password" type="password" />
      <Button type="submit" disabled={isLoading}>
        Login
      </Button>
    </form>
  );
}
```

### Entity Component

```tsx
// entities/user/ui/UserCard.tsx
import { Avatar } from '@/shared/ui/avatar';
import type { User } from '../model/types';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={user.avatar} alt={user.name} />
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
}
```

### Widget Component

```tsx
// widgets/header/ui/Header.tsx
import { UserMenu } from './UserMenu';
import { Logo } from '@/shared/ui/logo';
import { useUser } from '@/entities/user';

export function Header() {
  const { data: user } = useUser();
  
  return (
    <header className="flex justify-between items-center p-4">
      <Logo />
      {user && <UserMenu user={user} />}
    </header>
  );
}
```

---

## 10. Code Placement Decision Tree

```
Is it app initialization/routing?          → app/
Is it a full page component?               → views/
Is it a self-contained complex UI block?   → widgets/
Is it a user action with business value?   → features/
Is it a business domain object?            → entities/
Is it reusable, domain-agnostic?           → shared/
```

### Examples

- "Login form" → `features/auth/login/`
- "User profile card" → `entities/user/ui/`
- "Dashboard stats widget" → `widgets/dashboard-stats/`
- "Button component" → `shared/ui/button/`
- "Add to cart" → `features/cart/add-to-cart/`
- "Product model & API" → `entities/product/`

---

## 11. Cross-Slice Communication

### ❌ Don't: Direct Cross-Slice Imports

```tsx
// ❌ Bad: Feature importing another feature
import { AddToCartButton } from '@/features/cart/add-to-cart';
```

### ✅ Do: Lift to Widget or View

```tsx
// widgets/product-item/ui/ProductItem.tsx
import { ProductCard } from '@/entities/product';
import { AddToCartButton } from '@/features/cart/add-to-cart';
import { RatingButton } from '@/features/rating/rate-product';

export function ProductItem({ product }: { product: Product }) {
  return (
    <div>
      <ProductCard product={product} />
      <AddToCartButton productId={product.id} />
      <RatingButton productId={product.id} />
    </div>
  );
}
```

---

## 12. Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/app/*": ["src/app/*"],
      "@/views/*": ["src/views/*"],
      "@/widgets/*": ["src/widgets/*"],
      "@/features/*": ["src/features/*"],
      "@/entities/*": ["src/entities/*"],
      "@/shared/*": ["src/shared/*"]
    }
  }
}
```

---

## FSD Checklist

Before creating/modifying code:

- [ ] Identified correct FSD layer
- [ ] Checked import rules (no upward/sideways imports)
- [ ] Created Public API (index.ts)
- [ ] Placed files in correct segments (ui/, model/, api/)
- [ ] Used path aliases (@/layer/slice)
- [ ] TypeScript strict mode compliance
- [ ] Server/Client Component decision made

---

## Common Anti-Patterns (FSD)

### ❌ Bypassing Public API
```tsx
import { UserCard } from '@/entities/user/ui/UserCard';  // Wrong
import { UserCard } from '@/entities/user';              // Correct
```

### ❌ Cross-Feature Imports
```tsx
// features/auth/login/ui/LoginForm.tsx
import { RegisterButton } from '@/features/auth/register';  // Wrong!
```

### ❌ Upward Imports
```tsx
// entities/user/ui/UserCard.tsx
import { LoginForm } from '@/features/auth/login';  // Wrong! Going up
```

### ❌ Shared Importing from Layers
```tsx
// shared/ui/button/Button.tsx
import { useUser } from '@/entities/user';  // Wrong! Shared can't import layers
```

---

**FSD Guidelines are working if:**
- Clear layer boundaries
- No circular dependencies
- Easy to find where code lives
- Features are truly independent
- Shared code is genuinely reusable

**Remember:** FSD = Organize by WHAT it does (business domain), not HOW it's built (technical role)
