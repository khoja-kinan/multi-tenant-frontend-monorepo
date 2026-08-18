import { FC, ReactNode } from "react";
import cx from "classnames";

import s from "./SectionHeader.module.scss";

interface SectionHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  description,
  action,
  className,
}) => (
  <div className={cx(s.header, className)}>
    <div className={s.titleGroup}>
      <h2 className={s.title}>{title}</h2>
      {description && <p className={s.description}>{description}</p>}
    </div>
    {action && <div className={s.action}>{action}</div>}
  </div>
);
