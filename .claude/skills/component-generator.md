# Component Generator Skill (FSD Architecture)

## Purpose

Generate production-ready React components following Feature-Sliced Design (FSD) architecture, Next.js 15/16 best practices, and TypeScript strict mode.

## When to Use

- Creating components in any FSD layer
- Building feature slices
- Implementing entity models
- Creating shared UI components

---

## FSD Layer Decision Matrix

### Before generating, determine the FSD layer:

**app/** - Application initialization

- Global providers (QueryProvider, ThemeProvider)
- Root layout
- Global styles
- Router configuration

**views/** - Page business logic

- Full page components
- Page-level data fetching
- Page layouts

**widgets/** - Self-contained UI blocks

- Header, Footer, Sidebar
- Dashboard panels
- Complex feature combinations
- Reusable across multiple pages

**features/** - User actions (business value)

- Login, Register, Logout
- Add to Cart, Remove from Cart
- Rate Product, Leave Comment
- Upload File, Export Data
- **Rule**: If it's a verb (action), it's a feature

**entities/** - Business domain objects

- User, Product, Order, Invoice
- Blog Post, Comment, Category
- **Rule**: If it's a noun (thing with identity), it's an entity

**shared/** - Reusable, domain-agnostic

- UI kit (Button, Input, Card)
- Utilities (cn, format, validate)
- API client
- Generic hooks

---

## Component Generation Workflow

### Step 1: Identify Layer & Slice

```
Question Checklist:
1. Is this app initialization? → app/
2. Is this a full page? → views/
3. Is this a complex, self-contained UI block? → widgets/
4. Is this a user action with business value? → features/
5. Is this a business domain object? → entities/
6. Is this reusable and domain-agnostic? → shared/
```

### Step 2: Determine Server/Client Component

Same rules as before:

- **Server Component**: Default (async data, no interactivity)
- **Client Component**: Hooks, events, browser APIs

### Step 3: Create Slice Structure

```
layer/slice-name/
├── ui/              # Components
├── model/           # Types, state, schemas
├── api/             # API calls (if needed)
├── lib/             # Utilities (if needed)
└── index.ts         # Public API (required)
```

### Step 4: Implement Public API

Every slice MUST export through `index.ts`:

```tsx
// entities/user/index.ts
export { UserCard } from "./ui/UserCard";
export { UserAvatar } from "./ui/UserAvatar";
export type { User, UserRole } from "./model/types";
export { useUser } from "./api/queries";
```

---

## Pattern Library by Layer

### Shared UI Component Pattern

```tsx
// shared/ui/button/Button.tsx
"use client";

import { cn } from "@/shared/lib/cn";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  variant = "default",
  size = "md",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90":
            variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90":
            variant === "destructive",
          "border border-input bg-background hover:bg-accent":
            variant === "outline",
        },
        {
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4": size === "md",
          "h-12 px-6 text-lg": size === "lg",
        },
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      {children}
    </button>
  );
}
```

```tsx
// shared/ui/button/index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
```

---

### Entity Component Pattern

```tsx
// entities/user/model/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
  createdAt: string;
}

export type UserRole = User["role"];
```

```tsx
// entities/user/ui/UserCard.tsx
import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import type { User } from "../model/types";

interface UserCardProps {
  user: User;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

// Server Component (no "use client")
export function UserCard({ user, size = "md", onClick }: UserCardProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card p-4",
        onClick && "cursor-pointer hover:bg-accent",
        {
          "max-w-xs": size === "sm",
          "max-w-sm": size === "md",
          "max-w-md": size === "lg",
        },
      )}
    >
      <Image
        src={user.avatar || "/default-avatar.png"}
        alt={`${user.name}'s avatar`}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{user.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
          {user.role}
        </span>
      </div>
    </Component>
  );
}
```

```tsx
// entities/user/api/userApi.ts
import { apiClient } from "@/shared/api/client";
import type { User } from "../model/types";

export const getUser = async (id: string): Promise<User> => {
  return apiClient.get<User>(`/users/${id}`);
};

export const getUsers = async (): Promise<User[]> => {
  return apiClient.get<User[]>("/users");
};
```

```tsx
// entities/user/api/queries.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "./userApi";

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
```

```tsx
// entities/user/index.ts (Public API)
export { UserCard } from "./ui/UserCard";
export { UserAvatar } from "./ui/UserAvatar";
export type { User, UserRole } from "./model/types";
export { useUser, useUsers } from "./api/queries";
export { getUser, getUsers } from "./api/userApi";
```

---

### Feature Component Pattern

```tsx
// features/auth/login/model/schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

```tsx
// features/auth/login/model/useLogin.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginApi } from "../api/loginApi";
import type { LoginFormData } from "./schema";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginFormData) => loginApi(data),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
}
```

```tsx
// features/auth/login/ui/LoginForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useLogin } from "../model/useLogin";
import { loginSchema, type LoginFormData } from "../model/schema";

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    login(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errors.password}
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
```

```tsx
// features/auth/login/index.ts
export { LoginForm } from "./ui/LoginForm";
export { useLogin } from "./model/useLogin";
export { loginSchema, type LoginFormData } from "./model/schema";
```

---

### Widget Component Pattern

```tsx
// widgets/header/model/useHeaderState.ts
"use client";

import { useUser } from "@/entities/user";

export function useHeaderState() {
  const { data: user, isLoading } = useUser();

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
```

```tsx
// widgets/header/ui/Header.tsx
"use client";

import { Logo } from "@/shared/ui/logo";
import { Button } from "@/shared/ui/button";
import { UserMenu } from "./UserMenu";
import { useHeaderState } from "../model/useHeaderState";

export function Header() {
  const { user, isAuthenticated, isLoading } = useHeaderState();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <nav className="flex items-center gap-6">
          <a href="/features" className="text-sm font-medium">
            Features
          </a>
          <a href="/pricing" className="text-sm font-medium">
            Pricing
          </a>
          <a href="/docs" className="text-sm font-medium">
            Docs
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated && user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Button variant="outline" href="/login">
                Log in
              </Button>
              <Button href="/register">Sign up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
```

```tsx
// widgets/header/index.ts
export { Header } from "./ui/Header";
```

---

### View Component Pattern

```tsx
// views/dashboard/ui/DashboardPage.tsx
import { Suspense } from "react";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { DashboardStats } from "@/widgets/dashboard-stats";
import { RecentActivity } from "@/widgets/recent-activity";

export function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          <Suspense fallback={<div>Loading stats...</div>}>
            <DashboardStats />
          </Suspense>

          <Suspense fallback={<div>Loading activity...</div>}>
            <RecentActivity />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
```

```tsx
// views/dashboard/index.ts
export { DashboardPage } from "./ui/DashboardPage";
```

```tsx
// app/dashboard/page.tsx (Next.js routing)
import { DashboardPage } from "@/views/dashboard";

export default function Page() {
  return <DashboardPage />;
}
```

---

## FSD Component Checklist

Before generating:

- [ ] **Layer identified** (shared/entities/features/widgets/views)
- [ ] **Slice name decided** (descriptive, noun or action)
- [ ] **Server/Client decision** made
- [ ] **Segments planned** (ui/, model/, api/, lib/)
- [ ] **Public API** will be created (index.ts)
- [ ] **Import rules** verified (no upward/sideways imports)
- [ ] **Dependencies** checked (only from lower layers)

After generating:

- [ ] **TypeScript strict** mode compliant
- [ ] **Tailwind CSS** used (no inline styles)
- [ ] **Accessibility** considered
- [ ] **Public API** exported
- [ ] **Path alias** used (@/layer/slice)

---

## Common FSD Component Scenarios

### Scenario 1: "Create a product card"

→ **Entity**: `entities/product/ui/ProductCard.tsx`

### Scenario 2: "Create an add to cart button"

→ **Feature**: `features/cart/add-to-cart/ui/AddToCartButton.tsx`

### Scenario 3: "Create a dashboard header"

→ **Widget**: `widgets/header/ui/Header.tsx`

### Scenario 4: "Create a button component"

→ **Shared**: `shared/ui/button/Button.tsx`

### Scenario 5: "Create a login page"

→ **View**: `views/login/ui/LoginPage.tsx`

### Scenario 6: "Create a product catalog page"

→ **View** + **Widget**:

- `views/catalog/ui/CatalogPage.tsx`
- `widgets/product-grid/ui/ProductGrid.tsx`
- Uses `entities/product` and `features/cart/add-to-cart`

---

## Anti-Patterns to Avoid

### ❌ Direct Cross-Feature Import

```tsx
// features/cart/add-to-cart/ui/AddToCartButton.tsx
import { LoginForm } from "@/features/auth/login"; // Wrong!
```

### ✅ Lift to Widget

```tsx
// widgets/product-item/ui/ProductItem.tsx
import { AddToCartButton } from "@/features/cart/add-to-cart";
import { LoginForm } from "@/features/auth/login";
```

### ❌ Bypassing Public API

```tsx
import { ProductCard } from "@/entities/product/ui/ProductCard"; // Wrong
```

### ✅ Use Public API

```tsx
import { ProductCard } from "@/entities/product"; // Correct
```

---

## Best Practices Summary

1. **Think FSD First** - Identify layer before writing code
2. **Public API Always** - Every slice exports through index.ts
3. **Import Rules Strict** - No upward/sideways imports
4. **Server by Default** - Only "use client" when necessary
5. **Type Everything** - TypeScript strict mode, no `any`
6. **Segment Convention** - ui/, model/, api/, lib/
7. **Path Aliases** - Always use @/layer/slice

You are ready to generate FSD-compliant React components. Let's build with architecture! 🏗️
