import type { FC } from "react";
import cx from "classnames";

import s from "./Spinner.module.scss";

export interface SpinnerProps {
  className?: string;
}

/** Single-element rotating-border loading indicator. */
export const Spinner: FC<SpinnerProps> = ({ className }) => (
  <span className={cx(s.spinner, className)} role="status" aria-label="Loading" />
);
