import { FC, ReactNode } from "react";
import cx from "classnames";

import s from "./SurfaceCard.module.scss";

interface SurfaceCardProps {
  children: ReactNode;
  className?: string;
  level?: "base" | "raised";
  padding?: "none" | "sm" | "md" | "lg";
}

export const SurfaceCard: FC<SurfaceCardProps> = ({
  children,
  className,
  level = "base",
  padding = "md",
}) => (
  <div
    className={cx(s.surface, s[`level-${level}`], s[`padding-${padding}`], className)}
  >
    {children}
  </div>
);
