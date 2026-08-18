import { FC, FormEvent, useState } from "react";
import { Button, FormField } from "@repo/ui";
import { DEMO_OTP_CODE } from "@repo/mock-api";

import { useVerifyOtpStep } from "../hooks/useAuthMutations";

import s from "./OtpStep.module.scss";

interface OtpStepProps {
  onBack: () => void;
}

export const OtpStep: FC<OtpStepProps> = ({ onBack }) => {
  const [code, setCode] = useState("");
  const { mutate, isLoading, isError, error, reset } = useVerifyOtpStep();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutate({ code });
  };

  const errorMessage =
    (error?.data as { message?: string } | undefined)?.message ?? "Verification failed. Try again.";

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <FormField
        label="Verification code"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={code}
        onChange={(e) => {
          setCode(e.target.value.replace(/\D/g, ""));
          if (isError) reset();
        }}
        placeholder="000000"
        className={s.codeField}
        error={isError ? errorMessage : undefined}
        required
      />
      <p className={s.hint}>
        Demo code: <code>{DEMO_OTP_CODE}</code>
      </p>
      <div className={s.actions}>
        <Button type="button" variant="ghost" onClick={onBack} className={s.back}>
          Back
        </Button>
        <Button type="submit" disabled={isLoading || code.length < 6} className={s.submit}>
          {isLoading ? "Verifying…" : "Verify & sign in"}
        </Button>
      </div>
    </form>
  );
};
