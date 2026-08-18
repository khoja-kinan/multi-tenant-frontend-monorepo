import { FC, ReactNode } from "react";
import cx from "classnames";

import s from "./EmptyState.module.scss";

interface EmptyStateProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => (
  <div className={cx(s.container, className)}>
    {icon && <div className={s.icon}>{icon}</div>}
    <span className={s.title}>{title}</span>
    {description && <span className={s.description}>{description}</span>}
    {action && <div className={s.action}>{action}</div>}
  </div>
);
