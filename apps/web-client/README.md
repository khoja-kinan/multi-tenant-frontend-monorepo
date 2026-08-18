# Web Client

1. [Overview](#overview)
2. [Installation](#installation)
3. [Scripts](#scripts)
4. [Folder Structure](#folder-structure)
5. [Best Practices](#best-practices)

---

## Overview

This project is a modern frontend application built with:

- **Vite.js** for fast development
- **React.js** for building UI components
- **React Query** for state and data management
- **Zustand** for lightweight state management
- **@repo/mock-api** for a fully local, backend-free demo runtime
- **i18n** for language support
- **SCSS** for css styling

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Use node version 22:

   ```bash
   nvm use 22.12.0
   ```

3. Copy the example env file (mock mode works out of the box, no secrets needed):

   ```bash
   cp .env.example .env
   ```

4. Install dependencies:

   ```bash
   pnpm install
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

---

## Scripts

- **`pnpm dev`**: Start the development server.
- **`pnpm build`**: Build the app for production.
- **`pnpm preview`**: Preview the production build.
- **`pnpm typecheck`**: Type-check the project.
- **`pnpm lint`**: Lint the project.

---

## Folder Structure

```
src/
├── assets/                # All img and video assets here.
├── components/            # Reusable UI components
├── config/                # All necessary configs here, nav, footer etc..
├── hooks/                 # Custom hooks
├── icons/                 # All icons should be in one place
├── layout/                # Layout components of the app, header, content, footer
├── pages/                 # Entry point that plugs into router
├── router/                # App routing logic
├── Screens/                # Components required in each full view screen
├── services/               # Api and services goes here
├── stores/                 # Zustand store configurations
├── styles/                # Main styles here
├── themes/                # Theme related files
├── types/                 # Types used in pages, reusable types should be defined here
├── utils/                 # Utility functions and API logic
├── App.tsx                # Main app component
├── main.tsx               # Entry point
```

---

## Best Practices

### **1. State Management**

- Use Zustand for lightweight and modular state management.
- Keep the global state minimal and push local state management to components whenever possible.
- Avoid other state management approaches like useContext for shared app state.

### **2. API Integration**

- Use `useQueryApi` / `useMutationApi` from `@repo/query` for data fetching. All requests flow through `@repo/api`'s `apiRequest`, which is transparently served by `@repo/mock-api` in demo mode.

### **3. Component Structure**

- Write reusable and modular components.
- Maintain separation of concerns by breaking down large components into smaller pieces.
- Keep UI related parts of a screen under `src/Screens/<your-screen>`.

### **4. Routing**

- To navigate, always use the `handleNavigate` function from the navigation store:

```tsx
const { handleNavigate } = useNavigationStore();
handleNavigate("path/to/page");

// if you redirect to login and pass parameters like below, useful behavior happens automatically.
handleNavigate(NavItemPaths[NavItemEnum.LOGIN], {
  withLoginAlert: true, // to show a "please log in" confirmation modal
  loginCallback: () => console.log("Called after a successful login."),
});
```

### **5. Recommendations**

- To create a new page, duplicate an existing page and update `router/routes.tsx`.
- To create a new service, look at existing usages of `useQueryApi`/`useMutationApi` for the established pattern.
- When updating shared logic, search the whole codebase — many utilities are reused across several places.
