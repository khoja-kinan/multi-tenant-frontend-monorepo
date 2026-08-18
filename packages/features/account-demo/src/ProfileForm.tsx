import { FC, FormEvent, useEffect, useState } from "react";
import { SurfaceCard, SectionHeader, FormField, Button, Spinner } from "@repo/ui";

import { useProfile, useUpdateProfile } from "./hooks/useAccountQueries";

import s from "./ProfileForm.module.scss";

export const ProfileForm: FC = () => {
  const { data, isLoading } = useProfile();
  const { mutate, isLoading: isSaving, isSuccess, isError, error, reset } = useUpdateProfile();

  const [displayName, setDisplayName] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (data) {
      setDisplayName(data.displayName);
      setMobile(data.mobile);
    }
  }, [data]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    reset();
    mutate({ displayName, mobile });
  };

  const errorMessage =
    (error?.data as { message?: string } | undefined)?.message ?? "Couldn't save your changes.";

  return (
    <SurfaceCard padding="lg" className={s.card}>
      <SectionHeader title="Profile" description="Your public display details." />

      {isLoading ? (
        <div className={s.loading} role="status" aria-live="polite">
          <Spinner />
          <span>Loading profile…</span>
        </div>
      ) : (
        <form className={s.form} onSubmit={handleSubmit} noValidate>
          <FormField
            label="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <FormField
            label="Mobile number"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          {isError && (
            <p className={s.error} role="alert">
              {errorMessage}
            </p>
          )}
          {isSuccess && (
            <p className={s.success} role="status">
              Saved.
            </p>
          )}
          <Button type="submit" disabled={isSaving} className={s.submit}>
            {isSaving ? "Saving…" : "Save changes"}
          </Button>
        </form>
      )}
    </SurfaceCard>
  );
};
