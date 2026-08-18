# Shared Packages

This document covers what each shared package is responsible for and, where
it matters, which other packages it depends on. As a rule, dependencies flow
one direction: `apps/*` depend on `packages/features/*` and `packages/*`;
`packages/features/*` depend on `packages/*`; low-level packages (`api`,
`config`) have no dependencies on feature packages.

Every package below has a real, traced consumer in `apps/*` or
`packages/features/*` — nothing here is kept around only to make the
workspace look larger. A prior pass removed `@repo/hooks` and `@repo/utils`
entirely, and trimmed several packages down to only their actively-used
surface, once tracing actual imports showed the rest had no consumer.

## Data & transport

- **`@repo/api`** — the request layer every app uses: a single `sendRequest`
  function built on native `fetch`, with `setMockDispatcher`/
  `getMockDispatcher` as the seam between "real network" and "mocked" mode.
  Every failure, mocked or real, throws one `ApiError` shape (`status`,
  `data`). No HTTP client dependency, no interceptor pipeline. Has no
  dependency on any other workspace package.
- **`@repo/mock-api`** — depends on `@repo/api`. Registers a
  pattern-matching route dispatcher (`RouteDef[]`) against in-memory fixtures
  and mutable state (`resetMockState`), and exports the demo login
  credentials (`DEMO_CREDENTIALS`, `DEMO_OTP_CODE`). `installMockApi()` is
  called once at app boot.
- **`@repo/query`** — depends on `@repo/api`. A single `ApiProvider` owns the
  React Query client and makes `{ baseUrl, auth }` available to two typed
  hooks, `useQueryApi` and `useMutationApi`, so feature code never imports
  `@repo/api` directly.

## UI & theming

- **`@repo/ui`** — the shared component library, trimmed to what Nova,
  Aurora, `auth-demo`, and `account-demo` actually render: layout (`AppShell`,
  `PageContainer`), cards (`SurfaceCard`, `StatCard`, `FeatureCard`), section
  chrome (`SectionHeader`, `SectionNav`, `ThemeBadge`), form primitives
  (`FormField`, `Toggle`), `Button`, `EmptyState`, and a `Spinner` loading
  indicator. Consumed by both `web-client` and `tenant-client`.
- **`@repo/theme`** — `ThemeModeProvider`, a small React context (no external
  state library) that resolves a `"dark" | "light"` mode against a supplied
  `ThemeRegistry`, applies the resulting CSS custom properties, and persists
  the choice to `localStorage`. `useThemeMode()` reads the active mode and
  setter. `buildFeatureTokens` builds the compact semantic token contract
  (`--color-*`/`--control-*`/`--shadow-*`) that `@repo/ui`'s form primitives
  and both feature packages theme off of. `ThemeToggle` is self-contained —
  it reads `useThemeMode()` itself rather than being prop-drilled `mode`/
  `onChange`/`registry` from the page that renders it. Each app owns its own
  token *values*; this package only owns the shape and the mode mechanics.

## Config

- **`@repo/config`** — SCSS-only: `design-tokens/_tokens.scss` (spacing,
  radius, shadow scale, breakpoints), consumed via
  `@use "@repo/config/tokens.scss"`. No JS entrypoint — a JS twin of the
  breakpoint constants existed at one point but was removed once tracing
  showed its only consumer (a hook) had no caller anywhere in the workspace.

## Feature packages (`packages/features/*`)

Two small packages that together demonstrate a shared, tenant-agnostic
feature: session/auth state and an account page, each driven entirely by the
theme tokens and mock API — never by an `if (tenant === ...)` branch. Both
are mounted, with identical code, by both `web-client` and `tenant-client` at
`/account`.

- **`@repo/auth-demo`** — `useSessionStore` (session state), a two-step mock
  login (`LoginForm` → `OtpStep`), `AuthProvider` (session hydration on
  mount), and `ProtectedRoute` (the auth gate `/account` is built on).
  Depends on `@repo/query`, `@repo/ui`, `@repo/mock-api`.
- **`@repo/account-demo`** — `AccountSummary`, `ProfileForm`,
  `SecuritySettings`, `RecentActivity`, composed into `AccountDemoPage`. Each
  piece is backed by a real `useQueryApi`/`useMutationApi` call against
  `@repo/mock-api`'s session/profile/preferences/wallet routes. Depends on
  `@repo/auth-demo` (for session state and sign-out), `@repo/query`,
  `@repo/ui`.

## Why the dependency direction matters

Because `apps/*` are the only consumers that know about *both* tenants,
nothing under `packages/` needs to special-case Nova vs. Aurora. That's what
makes the white-label story credible: swapping in a third tenant means
writing a new `apps/*` entry with its own `AppConfig` and theme tokens, not
editing any shared package.
