import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactNode } from "react";
import cx from "classnames";

import s from "./Button.module.scss";

interface BaseProps {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
  };

export const Button: FC<ButtonProps | AnchorProps> = ({
  variant = "primary",
  children,
  className,
  as = "button",
  ...props
}) => {
  const classes = cx(s.button, s[variant], className);

  if (as === "a") {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};
