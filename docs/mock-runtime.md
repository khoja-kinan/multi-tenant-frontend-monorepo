# Mock Runtime

Every app in this repository runs completely on mock data by default. This
document explains how, so it's clear why no backend, database, or
third-party account is needed to explore the demo.

## Why

The goal is for anyone cloning this repository to run `pnpm dev` and get a
fully working demo — Nova and Aurora's home pages making a live request
through the mock API, and the entire `/account` login → profile → activity
flow — without provisioning infrastructure or secrets.

## The mock request dispatcher (`web-client` / `tenant-client`)

`@repo/api` exposes a single seam, `setMockDispatcher`, that every request
made through `@repo/query`'s hooks passes through. `@repo/mock-api` registers
a dispatcher there via `installMockApi()`, called once at app boot in each
app's `main.tsx`:

```ts
import { installMockApi } from "@repo/mock-api";

if (import.meta.env.VITE_ENABLE_API_MOCKS !== "false") {
  installMockApi();
}
```

The dispatcher (`packages/mock-api/src/dispatcher.ts`):

1. Simulates realistic network latency.
2. Normalizes the request URL and matches it against a list of `RouteDef`
   entries (`{ method, pattern, handler }`) using simple path matching.
3. Runs the first matching handler and returns its data.
4. **Fails loudly** if nothing matches — it throws an Axios-shaped 501 error
   and logs to the console, rather than silently falling through to a real
   network call. This means a missing mock route is always visible during
   development, never a silent no-op.

Routes are grouped by domain in `packages/mock-api/src/handlers/` (`session`,
`profile`, `wallet`, `runtimeStatus`) under a single fictional `/demo/*`
namespace, and backed by fixtures in `packages/mock-api/src/fixtures/`
(session, profile, wallet, runtime status, pagination). Handlers mutate an
in-memory `mockState` (login/logout flip `isAuthenticated`, profile/
preference edits persist for the session, wallet transactions are created
and auto-settle after a few seconds), so the mock backend behaves statefully
within a single session; `resetMockState()` clears it back to the initial
fixtures.

## What's actually exercised

Both home pages call `useQueryApi` against `/demo/runtime-status` on load and
render the result as a live "Mock API status" stat. The `/account` route in
both apps exercises the rest of the route surface end to end:

```
POST demo/session          — step 1 of login: validates credentials, returns { mfaRequired: true }
POST demo/session/otp      — step 2: verifies the one-time code, establishes the session
GET  demo/session          — session hydration check on mount (AuthProvider)
POST demo/session/refresh  — manual "Refresh session" control
DELETE demo/session        — sign out
GET/PATCH demo/profile     — ProfileForm
GET/PATCH demo/preferences — SecuritySettings toggles
GET  demo/wallet           — AccountSummary balance stats
GET  demo/wallet/transactions — RecentActivity list
```

Every one of these routes is reachable by clicking through the real UI —
there is no mocked-but-unused route surface left in the workspace.

## Mock auth

`@repo/mock-api` includes a small mock session surface: a fixed demo account
(`DEMO_CREDENTIALS` — `demo@example.com` / `demo1234`) and a fixed one-time
code (`DEMO_OTP_CODE` — `123456`), both shown directly in `@repo/auth-demo`'s
UI as hint text, plus a login/OTP-verify/session/refresh/logout handler set
that works without a persistence layer. This is exercised live at `/account`
in both `web-client` and `tenant-client`.

## Toggling mocks off

Every app's `.env.example` documents `VITE_ENABLE_API_MOCKS` (default
`true`) and the real-infrastructure variable that only matters when it's set
to `false` (base API URL). It isn't required, or read, in the default demo
mode.
