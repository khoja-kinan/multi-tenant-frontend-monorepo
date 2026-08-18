import { InputHTMLAttributes, ReactNode, forwardRef, useId } from "react";
import cx from "classnames";

import s from "./FormField.module.scss";

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id?: string;
  label: string;
  hint?: string;
  error?: string;
  endAdornment?: ReactNode;
}

/**
 * Compact labeled input with helper/error text. Styled off the feature-token
 * contract (--color-*, --control-*, --input-radius) so it matches whichever
 * palette the active theme supplies, rather than hard-coded colors.
 */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, hint, error, endAdornment, className, id, ...inputProps }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const hintId = `${fieldId}-hint`;

    return (
      <div className={cx(s.field, className)}>
        <label className={s.label} htmlFor={fieldId}>
          {label}
        </label>
        <div className={cx(s.inputRow, { [s.hasError]: Boolean(error) })}>
          <input
            ref={ref}
            id={fieldId}
            className={s.input}
            aria-invalid={Boolean(error)}
            aria-describedby={hint || error ? hintId : undefined}
            {...inputProps}
          />
          {endAdornment && <div className={s.adornment}>{endAdornment}</div>}
        </div>
        {(hint || error) && (
          <p id={hintId} className={cx(s.helper, { [s.helperError]: Boolean(error) })} role={error ? "alert" : undefined}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";
