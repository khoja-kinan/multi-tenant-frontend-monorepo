import { FC, ReactNode } from "react";

import s from "./AppShell.module.scss";

interface AppShellProps {
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export const AppShell: FC<AppShellProps> = ({ header, children, footer }) => (
  <div className={s.shell}>
    <header className={s.header}>{header}</header>
    <main className={s.main}>{children}</main>
    {footer && <footer className={s.footer}>{footer}</footer>}
  </div>
);
