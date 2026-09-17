"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { updateAccountSettings } from "./actions";
import styles from "./account-settings.module.css";

type Theme = "dark" | "light";

type AccountSettingsProps = {
  email: string;
  displayName: string;
  jobTitle: string;
  clubName?: string;
  language?: string;
  matchAlerts?: boolean;
  compact?: boolean;
};

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("nova-theme", theme);
  window.dispatchEvent(new CustomEvent("nova-theme-change", { detail: theme }));
}

export function AccountSettings({
  email,
  displayName,
  jobTitle,
  clubName,
  language = "English",
  matchAlerts = true,
  compact = false,
}: AccountSettingsProps) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("nova-theme") === "light" ? "light" : "dark";
  });
  const [state, formAction, pending] = useActionState(updateAccountSettings, undefined);
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
    setTheme(nextTheme);
  }

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

      {open && (
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
                <p>Manage your profile and workspace preferences.</p>
              </div>
              <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Close settings">×</button>
            </header>

            <form action={formAction} className={styles.form}>
              <div className={styles.sectionHeading}>
                <span>01</span>
                <div><h3>Profile</h3><p>How you appear in Nova Solution.</p></div>
              </div>

              <div className={styles.fieldGrid}>
                <label>
                  <span>Display name</span>
                  <input name="displayName" defaultValue={displayName} minLength={2} maxLength={60} required />
                </label>
                <label>
                  <span>Role or title</span>
                  <input name="jobTitle" defaultValue={jobTitle} maxLength={60} placeholder="e.g. Head coach" />
                </label>
                <label>
                  <span>Email address</span>
                  <input value={email} readOnly aria-readonly="true" />
                  <small>Contact support to change your sign-in email.</small>
                </label>
                {clubName && (
                  <label>
                    <span>Club</span>
                    <input value={clubName} readOnly aria-readonly="true" />
                    <small>Your club is linked to your workspace.</small>
                  </label>
                )}
                <label>
                  <span>Language</span>
                  <select name="language" defaultValue={language}>
                    <option>English</option>
                    <option>Arabic</option>
                    <option>French</option>
                    <option>Spanish</option>
                  </select>
                </label>
              </div>

              <div className={styles.sectionHeading}>
                <span>02</span>
                <div><h3>Appearance</h3><p>Choose the contrast that works best for you.</p></div>
              </div>
              <div className={styles.themePicker} aria-label="Color theme">
                <button type="button" className={theme === "light" ? styles.selected : ""} onClick={() => chooseTheme("light")} aria-pressed={theme === "light"}>
                  <i className={styles.sun}>☀</i><span><b>Light</b><small>Bright and clear</small></span>
                </button>
                <button type="button" className={theme === "dark" ? styles.selected : ""} onClick={() => chooseTheme("dark")} aria-pressed={theme === "dark"}>
                  <i>◐</i><span><b>Dark</b><small>Easy on the eyes</small></span>
                </button>
              </div>

              <div className={styles.sectionHeading}>
                <span>03</span>
                <div><h3>Notifications</h3><p>Control the updates you receive.</p></div>
              </div>
              <label className={styles.checkRow}>
                <span><b>Match and analysis alerts</b><small>Get notified when reports and player data are ready.</small></span>
                <input type="checkbox" name="matchAlerts" defaultChecked={matchAlerts} />
              </label>

              <footer className={styles.footer}>
                <div aria-live="polite" className={state?.status === "error" ? styles.error : styles.success}>
                  {state?.message}
                </div>
                <button type="button" className={styles.cancel} onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" className={styles.save} disabled={pending}>
                  {pending ? "Saving…" : "Save changes"}
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
