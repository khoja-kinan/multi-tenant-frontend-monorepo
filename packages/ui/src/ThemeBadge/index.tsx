import { FC } from "react";
import cx from "classnames";

import s from "./ThemeBadge.module.scss";

interface ThemeBadgeProps {
  label: string;
  className?: string;
}

export const ThemeBadge: FC<ThemeBadgeProps> = ({ label, className }) => (
  <span className={cx(s.badge, className)}>
    <span className={s.dot} />
    {label}
  </span>
);
