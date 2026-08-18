import React from "react";

import {
  AppShell,
  PageContainer,
  SectionHeader,
  FeatureCard,
  StatCard,
  SurfaceCard,
  ThemeBadge,
  Button,
  SectionNav,
  SectionNavLink,
} from "@repo/ui";
import { useQueryApi } from "@repo/query";

import s from "./home.module.scss";

const NAV_LINKS: SectionNavLink[] = [
  { href: "#architecture", label: "Architecture" },
  { href: "#packages", label: "Shared Packages" },
  { href: "#stats", label: "Live Demo" },
];

const ARCHITECTURE_HIGHLIGHTS = [
  { title: "Turborepo + pnpm", description: "Cached, parallelized builds across every app and package in the workspace." },
  { title: "Shared UI package", description: "Buttons, cards, containers, and layout primitives reused across tenants." },
  { title: "Mock API layer", description: "A route-matching dispatcher swapped in at the transport layer — no backend required." },
  { title: "React Query data hooks", description: "Typed useQueryApi / useMutationApi hooks abstract away the request layer." },
  { title: "White-label theming", description: "Aurora and Nova share every package, differing by configuration, theme, and tenant-specific data." },
];

const SHARED_PACKAGES = [
  { title: "@repo/ui", description: "Shared component library used by both tenant apps." },
  { title: "@repo/api", description: "Single request layer with a swappable mock dispatcher." },
  { title: "@repo/mock-api", description: "Route handlers and fixtures powering the mock runtime." },
  { title: "@repo/query", description: "React Query hooks wrapping the request layer." },
  { title: "@repo/theme", description: "Theme tokens and provider shared by every tenant." },
];

const HomeScreen: React.FC = () => {
  const { data: mockStatus, isLoading } = useQueryApi<{ status: string }>({
    url: "/demo/runtime-status",
    key: "DEMO_RUNTIME_STATUS",
    isPublicApi: true,
  });

  return (
    <AppShell
      header={
        <PageContainer className={s.headerBar}>
          <span className={s.wordmark}>AURORA</span>
          <SectionNav links={NAV_LINKS} className={s.nav} />
        </PageContainer>
      }
      footer={
        <PageContainer className={s.footerBar}>
          <span>Multi-Tenant Frontend Monorepo — portfolio architecture demo.</span>
          <span className={s.footerMeta}>No backend required. Mock runtime enabled by default.</span>
        </PageContainer>
      }
    >
      <section className={s.hero}>
        <PageContainer className={s.heroContent}>
          <ThemeBadge label="Aurora · Tenant Theme Example" />
          <h1 className={s.heroTitle}>Same Architecture, Different Tenant Configuration</h1>
          <p className={s.heroSubtitle}>
            Aurora runs on the exact same Turborepo, shared packages, and mock runtime as Nova —
            only the theme tokens, app-level configuration, and mock data differ. This page
            demonstrates white-label architecture, not a separate product.
          </p>
          <div className={s.heroActions}>
            <Button as="a" href="#architecture">
              View Architecture
            </Button>
            <Button as="a" href="#packages" variant="secondary">
              Shared Packages
            </Button>
            <Button as="a" href="/account" variant="secondary">
              Account Demo →
            </Button>
          </div>
        </PageContainer>
      </section>

      <section id="architecture" className={s.section}>
        <PageContainer>
          <SectionHeader
            title="Architecture Highlights"
            description="What this monorepo demonstrates, end to end."
          />
          <div className={s.grid}>
            {ARCHITECTURE_HIGHLIGHTS.map((item) => (
              <FeatureCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section id="packages" className={s.section}>
        <PageContainer>
          <SectionHeader
            title="Shared Packages"
            description="The same packages power both Aurora and Nova — only configuration and tenant-specific data differ."
          />
          <div className={s.grid}>
            {SHARED_PACKAGES.map((item) => (
              <FeatureCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section id="stats" className={s.section}>
        <PageContainer>
          <SectionHeader
            title="Live Demo"
            description="These values are fetched from the local mock API through the shared React Query hooks."
          />
          <div className={s.statsGrid}>
            <StatCard label="Apps in workspace" value="2" />
            <StatCard label="Shared packages" value="12" />
            <StatCard label="Mock API status" value={isLoading ? "Loading…" : mockStatus ? "Connected" : "—"} />
          </div>
          <SurfaceCard className={s.note} padding="md">
            <p className={s.noteText}>
              This request went through <code>useQueryApi</code> → <code>@repo/api</code> →
              the mock dispatcher registered by <code>@repo/mock-api</code> — the same path a real
              backend call would take, with a mock transport swapped in underneath.
            </p>
          </SurfaceCard>
        </PageContainer>
      </section>
    </AppShell>
  );
};

export default HomeScreen;
