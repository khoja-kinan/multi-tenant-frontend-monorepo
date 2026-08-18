import { FC, ReactNode } from "react";
import { SurfaceCard } from "@repo/ui";

import s from "./AuthCard.module.scss";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const AuthCard: FC<AuthCardProps> = ({ title, description, children }) => (
  <SurfaceCard level="raised" padding="lg" className={s.card}>
    <h2 className={s.title}>{title}</h2>
    {description && <p className={s.description}>{description}</p>}
    {children}
  </SurfaceCard>
);
