import { ButtonHTMLAttributes, ReactNode } from "react";
import cx from "classnames";

import s from "./Toggle.module.scss";

interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: ReactNode;
  description?: ReactNode;
}

/** Accessible switch control, keyboard- and screen-reader-friendly (role="switch"). */
export const Toggle = ({ checked, onChange, label, description, className, disabled, ...props }: ToggleProps) => (
  <label className={cx(s.row, { [s.disabled]: disabled }, className)}>
    <span className={s.text}>
      <span className={s.label}>{label}</span>
      {description && <span className={s.description}>{description}</span>}
    </span>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cx(s.track, { [s.on]: checked })}
      onClick={() => onChange(!checked)}
      {...props}
    >
      <span className={s.thumb} />
    </button>
  </label>
);
