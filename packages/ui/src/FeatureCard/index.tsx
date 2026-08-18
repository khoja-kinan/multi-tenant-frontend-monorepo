import { FC, ReactNode } from "react";
import cx from "classnames";

import s from "./FeatureCard.module.scss";

interface FeatureCardProps {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  className?: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, className }) => (
  <div className={cx(s.card, className)}>
    {icon && <div className={s.icon}>{icon}</div>}
    <span className={s.title}>{title}</span>
    <p className={s.description}>{description}</p>
  </div>
);
