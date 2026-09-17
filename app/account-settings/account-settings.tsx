"use client";

import { useActionState, useEffect, useId, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { updateAccountSettings, updateThemePreference } from "./actions";
import styles from "./account-settings.module.css";

type Theme = "dark" | "light";

type AccountSettingsProps = {
  email: string;
  displayName: string;
  clubName?: string;
  initialTheme?: Theme;
  compact?: boolean;
};

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.cookie = `nova-theme=${theme}; Path=/; Max-Age=${60 * 60 * 24 * 400}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent("nova-theme-change", { detail: theme }));
}

export function AccountSettings({
  email,
  displayName,
  clubName,
  initialTheme,
  compact = false,
}: AccountSettingsProps) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (initialTheme) return initialTheme;
    if (typeof document === "undefined") return "dark";
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
  });
  const [state, formAction, pending] = useActionState(updateAccountSettings, undefined);
  const [themePending, startThemeTransition] = useTransition();
  const [themeError, setThemeError] = useState("");
  const titleId = useId();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const syncTheme = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;
      if (nextTheme === "dark" || nextTheme === "light") setTheme(nextTheme);
    };
    window.addEventListener("nova-theme-change", syncTheme);
    return () => window.removeEventListener("nova-theme-change", syncTheme);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function chooseTheme(nextTheme: Theme) {
    const previousTheme = theme;
    setTheme(nextTheme);
    setThemeError("");
    startThemeTransition(async () => {
      const result = await updateThemePreference(nextTheme);
      if (result.status === "error") {
        setTheme(previousTheme);
        setThemeError(result.message);
      }
    });
  }

  const dialog = open && typeof document !== "undefined" ? createPortal(
    <div className={styles.backdrop} onMouseDown={() => setOpen(false)}>
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <span>ACCOUNT</span>
            <h2 id={titleId}>Settings</h2>
          </div>
          <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Close settings">×</button>
        </header>

        <form action={formAction} className={styles.form}>
          <div className={styles.sectionHeading}>
            <span>01</span>
            <div><h3>Profile</h3><p>Your basic account information.</p></div>
          </div>

          <div className={styles.fieldGrid}>
            <label>
              <span>Display name</span>
              <input name="displayName" defaultValue={displayName} minLength={2} maxLength={60} required />
            </label>
            <label>
              <span>Email address</span>
              <input value={email} readOnly aria-readonly="true" />
            </label>
            {clubName && (
              <label>
                <span>Club</span>
                <input value={clubName} readOnly aria-readonly="true" />
              </label>
            )}
          </div>

          <div className={styles.sectionHeading}>
            <span>02</span>
            <div><h3>Appearance</h3><p>Saved to your account and this browser.</p></div>
          </div>
          <div className={styles.themePicker} aria-label="Color theme" aria-busy={themePending}>
            <button type="button" disabled={themePending} className={theme === "light" ? styles.selected : ""} onClick={() => chooseTheme("light")} aria-pressed={theme === "light"}>
              <i className={styles.sun}>☀</i><span><b>Light</b><small>Bright background</small></span>
            </button>
            <button type="button" disabled={themePending} className={theme === "dark" ? styles.selected : ""} onClick={() => chooseTheme("dark")} aria-pressed={theme === "dark"}>
              <i>◐</i><span><b>Dark</b><small>Dark background</small></span>
            </button>
          </div>
          {themeError && <p className={styles.error} role="alert">{themeError}</p>}

          <footer className={styles.footer}>
            <div aria-live="polite" className={state?.status === "error" ? styles.error : styles.success}>
              {state?.message}
            </div>
            <button type="button" className={styles.cancel} onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className={styles.save} disabled={pending}>
              {pending ? "Saving…" : "Save profile"}
            </button>
          </footer>
        </form>
      </section>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button
        type="button"
        className={`${styles.trigger} ${compact ? styles.compact : ""}`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 15.25A3.25 3.25 0 1 0 12 8.75a3.25 3.25 0 0 0 0 6.5Z" />
          <path d="M19.4 13.5a7.8 7.8 0 0 0 0-3l2-1.55-2-3.4-2.45 1a8 8 0 0 0-2.6-1.5L14 2.5h-4l-.35 2.55a8 8 0 0 0-2.6 1.5l-2.45-1-2 3.4 2 1.55a7.8 7.8 0 0 0 0 3l-2 1.55 2 3.4 2.45-1a8 8 0 0 0 2.6 1.5L10 21.5h4l.35-2.55a8 8 0 0 0 2.6-1.5l2.45 1 2-3.4-2-1.55Z" />
        </svg>
        <span>Settings</span>
      </button>

      {dialog}
    </>
  );
}
