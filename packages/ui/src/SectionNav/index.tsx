import { FC, useEffect, useState } from "react";
import cx from "classnames";

import s from "./SectionNav.module.scss";

export interface SectionNavLink {
  /** Same-page anchor target, e.g. "#architecture". */
  href: string;
  label: string;
}

interface SectionNavProps {
  links: SectionNavLink[];
  className?: string;
}

/**
 * Same-page section navigation. Relies on native anchor + CSS smooth
 * scrolling (see `scroll-behavior` / `scroll-margin-top` in each app's
 * globals) rather than JS-driven scrolling, so keyboard navigation and
 * browser history stay native. Only adds IntersectionObserver-based
 * active-link highlighting on top.
 */
export const SectionNav: FC<SectionNavProps> = ({ links, className }) => {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = links
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) setActiveHref(`#${mostVisible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav className={cx(s.nav, className)}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cx(s.link, { [s.active]: activeHref === link.href })}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};
