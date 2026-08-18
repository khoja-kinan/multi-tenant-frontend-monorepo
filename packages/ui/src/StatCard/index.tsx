import { FC, ReactNode } from "react";
import cx from "classnames";

import s from "./StatCard.module.scss";

interface StatCardProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export const StatCard: FC<StatCardProps> = ({ label, value, className }) => (
  <div className={cx(s.statCard, className)}>
    <span className={s.label}>{label}</span>
    <span className={s.value}>{value}</span>
  </div>
);
