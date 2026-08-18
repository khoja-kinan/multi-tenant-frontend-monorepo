import { FC, FormEvent, useState } from "react";
import { Button, FormField } from "@repo/ui";
import { DEMO_CREDENTIALS } from "@repo/mock-api";

import { useLoginStep } from "../hooks/useAuthMutations";

import s from "./LoginForm.module.scss";

interface LoginFormProps {
  onVerified: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onVerified }) => {
  const [username, setUsername] = useState(DEMO_CREDENTIALS.username);
  const [password, setPassword] = useState("");
  const { mutate, isLoading, isError, error, reset } = useLoginStep();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutate(
      { username, password },
      {
        onSuccess: onVerified,
      },
    );
  };

  const errorMessage =
    (error?.data as { message?: string } | undefined)?.message ?? "Something went wrong. Try again.";

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <FormField
        label="Email"
        type="email"
        autoComplete="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          if (isError) reset();
        }}
        required
      />
      <FormField
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (isError) reset();
        }}
        required
        error={isError ? errorMessage : undefined}
      />
      <p className={s.hint}>
        Demo credentials: <code>{DEMO_CREDENTIALS.username}</code> / <code>{DEMO_CREDENTIALS.password}</code>
      </p>
      <Button type="submit" disabled={isLoading} className={s.submit}>
        {isLoading ? "Checking…" : "Continue"}
      </Button>
    </form>
  );
};
