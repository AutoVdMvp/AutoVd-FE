# Business Logic Generator Skill (FSD Architecture)

## Purpose

Generate production-ready business logic (TanStack Query, Zustand, API clients, utilities) following Feature-Sliced Design architecture for Next.js 15/16 applications.

## When to Use

- Setting up entity data layer
- Creating feature business logic
- Building shared API client
- Implementing utility functions

---

## FSD Business Logic Placement

```
entities/[entity]/
├── model/          # Types, schemas, Zustand stores
├── api/            # API calls, TanStack Query hooks
└── lib/            # Entity-specific utilities

features/[feature]/
├── model/          # Feature state, validation schemas
├── api/            # Feature-specific API calls
└── lib/            # Feature utilities

shared/
├── api/            # Base API client, interceptors
├── lib/            # Generic utilities
└── hooks/          # Reusable hooks
```

---

## Part 1: Entity Data Layer

### Entity Model Structure

```
entities/user/
├── model/
│   ├── types.ts           # TypeScript interfaces
│   ├── schema.ts          # Zod validation schemas
│   └── store.ts           # Zustand store (if needed)
├── api/
│   ├── userApi.ts         # Raw API functions
│   ├── queries.ts         # TanStack Query hooks
│   └── mutations.ts       # TanStack Mutations
├── ui/
│   └── UserCard.tsx
└── index.ts               # Public API
```

### 1.1 Entity Types

```ts
// entities/user/model/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user" | "moderator";
  createdAt: string;
  updatedAt: string;
}

export type UserRole = User["role"];

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
}
```

### 1.2 Entity Schemas

```ts
// entities/user/model/schema.ts
import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  avatar: z.string().url().optional(),
  role: z.enum(["admin", "user", "moderator"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
});
```

### 1.3 Entity API Functions

```ts
// entities/user/api/userApi.ts
import { apiClient } from "@/shared/api/client";
import type { User, CreateUserDTO, UpdateUserDTO } from "../model/types";

export const userApi = {
  getAll: async (): Promise<User[]> => {
    return apiClient.get<User[]>("/users");
  },

  getById: async (id: string): Promise<User> => {
    return apiClient.get<User>(`/users/${id}`);
  },

  create: async (data: CreateUserDTO): Promise<User> => {
    return apiClient.post<User>("/users", data);
  },

  update: async (id: string, data: UpdateUserDTO): Promise<User> => {
    return apiClient.patch<User>(`/users/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/users/${id}`);
  },
};
```

### 1.4 Entity Query Hooks

```ts
// entities/user/api/queries.ts
"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { userApi } from "./userApi";

// Query keys factory
export const userKeys = {
  all: () => ["users"] as const,
  lists: () => [...userKeys.all(), "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all(), "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Hooks
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: userApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSuspenseUsers() {
  return useSuspenseQuery({
    queryKey: userKeys.lists(),
    queryFn: userApi.getAll,
  });
}
```

### 1.5 Entity Mutations

```ts
// entities/user/api/mutations.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "./userApi";
import { userKeys } from "./queries";
import type { CreateUserDTO, UpdateUserDTO, User } from "../model/types";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.create,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDTO }) =>
      userApi.update(id, data),
    // Optimistic update
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: userKeys.detail(id) });

      const previousUser = queryClient.getQueryData<User>(userKeys.detail(id));

      if (previousUser) {
        queryClient.setQueryData<User>(userKeys.detail(id), {
          ...previousUser,
          ...data,
        });
      }

      return { previousUser };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(userKeys.detail(id), context.previousUser);
      }
    },
    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.delete,
    onSuccess: (data, id) => {
      queryClient.removeQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
```

### 1.6 Entity Store (Optional)

```ts
// entities/user/model/store.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "./types";

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  clearCurrentUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: null,

      setCurrentUser: (user) => set({ currentUser: user }),

      updateCurrentUser: (updates) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...updates }
            : null,
        })),

      clearCurrentUser: () => set({ currentUser: null }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ currentUser: state.currentUser }),
    },
  ),
);
```

### 1.7 Entity Public API

```ts
// entities/user/index.ts
// UI exports
export { UserCard } from "./ui/UserCard";
export { UserAvatar } from "./ui/UserAvatar";

// Type exports
export type {
  User,
  UserRole,
  UserProfile,
  CreateUserDTO,
  UpdateUserDTO,
} from "./model/types";

// Schema exports
export { userSchema, createUserSchema, updateUserSchema } from "./model/schema";

// API exports
export { userApi } from "./api/userApi";
export { userKeys, useUsers, useUser, useSuspenseUsers } from "./api/queries";
export { useCreateUser, useUpdateUser, useDeleteUser } from "./api/mutations";

// Store exports (if exists)
export { useUserStore } from "./model/store";
```

---

## Part 2: Feature Business Logic

### Feature Structure

```
features/auth/login/
├── model/
│   ├── schema.ts          # Form validation
│   └── useLogin.ts        # Business logic hook
├── api/
│   └── loginApi.ts        # API call
├── ui/
│   └── LoginForm.tsx
└── index.ts
```

### 2.1 Feature Schema

```ts
// features/auth/login/model/schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

### 2.2 Feature API

```ts
// features/auth/login/api/loginApi.ts
import { apiClient } from "@/shared/api/client";
import type { LoginFormData } from "../model/schema";
import type { User } from "@/entities/user";

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export const loginApi = async (data: LoginFormData): Promise<LoginResponse> => {
  return apiClient.post<LoginResponse>("/auth/login", data);
};
```

### 2.3 Feature Business Logic Hook

```ts
// features/auth/login/model/useLogin.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginApi } from "../api/loginApi";
import { useUserStore } from "@/entities/user";
import type { LoginFormData } from "./schema";

export function useLogin() {
  const router = useRouter();
  const setCurrentUser = useUserStore((s) => s.setCurrentUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      // Save token
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);

      // Update user store
      setCurrentUser(response.user);

      // Navigate to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}
```

### 2.4 Feature Public API

```ts
// features/auth/login/index.ts
export { LoginForm } from "./ui/LoginForm";
export { useLogin } from "./model/useLogin";
export { loginSchema, type LoginFormData } from "./model/schema";
```

---

## Part 3: Shared API Client

### 3.1 Base API Client

```ts
// shared/api/client.ts
interface APIError {
  message: string;
  code: string;
  details?: unknown;
}

class APIClient {
  private baseURL: string;
  private getAuthToken: () => string | null;

  constructor(baseURL: string, getAuthToken: () => string | null) {
    this.baseURL = baseURL;
    this.getAuthToken = getAuthToken;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const token = this.getAuthToken();

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error: APIError = await response.json().catch(() => ({
          message: "An error occurred",
          code: "UNKNOWN_ERROR",
        }));
        throw new Error(error.message);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error");
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new APIClient(
  process.env.NEXT_PUBLIC_API_URL || "/api",
  () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },
);
```

```ts
// shared/api/index.ts
export { apiClient } from "./client";
```

---

## Part 4: Shared Utilities

### 4.1 Formatting Utilities

```ts
// shared/lib/format.ts
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(
  date: Date | string,
  format: "short" | "long" | "relative" = "short",
): string {
  const d = new Date(date);

  if (format === "relative") {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: format === "long" ? "long" : "short",
    day: "numeric",
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
```

### 4.2 Validation Utilities

```ts
// shared/lib/validation.ts
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isStrongPassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Must contain uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Must contain lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Must contain number");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Must contain special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

### 4.3 Shared Hooks

```ts
// shared/hooks/useDebounce.ts
"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

```ts
// shared/hooks/index.ts
export { useDebounce } from "./useDebounce";
export { useMediaQuery } from "./useMediaQuery";
export { useLocalStorage } from "./useLocalStorage";
```

---

## FSD Business Logic Checklist

### Entity Layer

- [ ] Types defined in `model/types.ts`
- [ ] Zod schemas in `model/schema.ts`
- [ ] API functions in `api/[entity]Api.ts`
- [ ] TanStack Query hooks in `api/queries.ts`
- [ ] Mutations in `api/mutations.ts`
- [ ] Query keys factory created
- [ ] Public API exported via `index.ts`

### Feature Layer

- [ ] Form validation schema in `model/schema.ts`
- [ ] Business logic hook in `model/use[Feature].ts`
- [ ] API function in `api/[feature]Api.ts`
- [ ] Only uses entities and shared
- [ ] Public API exported

### Shared Layer

- [ ] API client initialized
- [ ] Utilities are pure functions
- [ ] Hooks are generic and reusable
- [ ] No imports from upper layers

---

## Best Practices Summary

1. **Entity = Data Model** - Place in `entities/[entity]/`
2. **Feature = User Action** - Place in `features/[feature]/`
3. **Shared = Generic** - Place in `shared/`
4. **Public API Always** - Export through `index.ts`
5. **Query Keys Factory** - Consistent cache management
6. **Optimistic Updates** - Better UX
7. **Type Safety** - No `any`, strict TypeScript
8. **Separation of Concerns** - api/, model/, ui/ segments

You are ready to generate FSD-compliant business logic. Let's build with architecture! 🏗️
