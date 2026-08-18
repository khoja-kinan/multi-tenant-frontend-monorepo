# Multi-Tenant Theming

`web-client` ("Nova") and `tenant-client` ("Aurora") are the same shared
architecture compiled as two separate apps with different configuration.
Neither app, nor any shared package, contains a branch like
`if (tenant === "nova")` — everything that differs between them is expressed
as data, not code. Both apps are built from the same `@repo/ui` components
(`AppShell`, `PageContainer`, `SectionHeader`, `FeatureCard`, `StatCard`,
`SurfaceCard`, `Button`, `ThemeBadge`) and the same shared feature pair
(`@repo/auth-demo`, `@repo/account-demo`) at `/account`; only the theme
tokens and copy passed into them differ.

## What each tenant supplies

Every app owns two tenant-specific inputs, passed *into* shared packages
rather than read by them from a global:

1. **`AppConfig`** (`apps/<app>/src/config/AppConfig.ts`) — brand name and
   environment URLs used by `@repo/query`'s request context.
2. **Theme token values** implementing `ThemeDefinition` from `@repo/theme`
   (`apps/<app>/src/themes/`). Both apps supply the same two token families:
   a small "app chrome" set (background, header/hero surfaces, text,
   accent, borders — read by `@repo/ui`'s layout components as
   `var(--app_accent)`, `var(--surface_bg)`, etc.) and a compact semantic
   set built by `@repo/theme`'s `buildFeatureTokens` (`--color-*`,
   `--control-*`, `--shadow-*` — read by `@repo/ui`'s newer form primitives
   and both feature packages). Every shared component reads only these
   tokens, so the same component and the same feature package render
   correctly in either app.

## Visual identity

| | Nova (`web-client`) | Aurora (`tenant-client`) |
| --- | --- | --- |
| Base | Near-black graphite (`#0B0D0F`) | Warm off-white (`#F7F5F2`) |
| Accent | Emerald (`#10B981` dark mode / `#059669` light mode) | Cobalt blue-gray (`#34558B`) |
| Modes | Light + dark, switchable via the shared `ThemeToggle` | Single light theme |
| Surfaces | Dark elevated panels (`#15181B` / `#1B1F23`) | White cards on a warm-neutral page background |
| Feel | Dark ops/dashboard product | Light SaaS product |

The two palettes share no colors and no gradients — they were built
independently against the same `ThemeDefinition` contract, which is the
point: nothing about `@repo/ui`'s components, or `@repo/auth-demo`'s /
`@repo/account-demo`'s components, assumes a particular palette shape beyond
"here are some CSS variables to read."

## Where this is demonstrated

Both apps' home pages (`/`) are one half of the demonstration: the same
`FeatureCard`/`StatCard`/`SectionHeader` grid, the same `AppShell` header/
footer structure, and the same live mock-API-backed stat, rendered twice
with two unrelated palettes. `/account` is the other half, and arguably the
stronger proof: the same `LoginForm`, `OtpStep`, `AccountSummary`,
`ProfileForm`, `SecuritySettings`, and `RecentActivity` components — not
just the same design system, the same *feature* — rendered with two
unrelated palettes and no tenant-specific code anywhere in either package.

## How a third tenant would be added

Because nothing shared hardcodes Nova or Aurora, adding a third tenant is:

1. New `apps/<name>/` Vite app (copy the `tenant-client` structure).
2. New `AppConfig` with that tenant's name and environment URLs.
3. A new theme-token file implementing the same `ThemeDefinition` shape.
4. Reuse the same `@repo/ui` components and the same `@repo/auth-demo` /
   `@repo/account-demo` feature pair at `/account` — no changes needed to
   either package.

No shared package needs to change.
