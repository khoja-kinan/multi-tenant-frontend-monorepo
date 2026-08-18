import { FC, useState } from "react";

import { AuthCard } from "./components/AuthCard";
import { LoginForm } from "./components/LoginForm";
import { OtpStep } from "./components/OtpStep";

/**
 * The unauthenticated fallback for ProtectedRoute: a compact two-step
 * credentials → one-time-code flow, sharing one card shell. Renders
 * identically across tenants — only the surrounding theme tokens differ.
 */
export const LoginFlow: FC = () => {
  const [step, setStep] = useState<"credentials" | "otp">("credentials");

  return step === "credentials" ? (
    <AuthCard title="Sign in" description="Two-step demo login — no real account required.">
      <LoginForm onVerified={() => setStep("otp")} />
    </AuthCard>
  ) : (
    <AuthCard title="Verify it's you" description="Enter the 6-digit code to finish signing in.">
      <OtpStep onBack={() => setStep("credentials")} />
    </AuthCard>
  );
};
