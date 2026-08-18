import { FC, ReactNode } from "react";
import cx from "classnames";

import s from "./PageContainer.module.scss";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer: FC<PageContainerProps> = ({ children, className }) => (
  <div className={cx(s.container, className)}>{children}</div>
);
