"use client";

import Link from "next/link";
import { signOutAction } from "@/lib/auth-actions";
import { AccountSettings } from "@/app/account-settings/account-settings";

export function FanOverviewView({
  firstName,
  email,
  displayName,
  initialTheme,
}: {
  firstName: string;
  email: string;
  displayName: string;
  initialTheme?: "dark" | "light";
}) {
  return (
    <div className="fan-root">
      <div className="bg" />
      <div className="bg-pattern" />

      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="#0b0e0c" strokeWidth="1.8" />
              <path d="M12 3 L14.5 8H9.5Z" fill="#0b0e0c" />
              <path d="M12 21 L9.5 16H14.5Z" fill="#0b0e0c" />
              <path d="M3 12 L8 9.5V14.5Z" fill="#0b0e0c" />
              <path d="M21 12 L16 14.5V9.5Z" fill="#0b0e0c" />
              <polygon points="12,9 14,12 12,15 10,12" fill="#0b0e0c" />
            </svg>
          </div>
          <span className="brand-name">NOVA SOLUTION</span>
        </div>

        <div className="account-actions">
          <AccountSettings
            compact
            email={email}
            displayName={displayName}
            initialTheme={initialTheme}
          />
          <form action={signOutAction}>
            <button className="signout" type="submit">Sign out</button>
          </form>
        </div>
      </header>

      <main className="hero">
        <span className="kicker">FAN WORKSPACE</span>
        <h1>Welcome back, {firstName}.</h1>
        <p className="subtitle">Here&apos;s what you can do from here.</p>

        <div className="card-grid">
          <Link href="/fan/leaderboard" className="card">
            <i className="card-icon">◎</i>
            <h2>Leaderboards</h2>
            <p>Switch between every covered league and season, then compare stat-category rankings.</p>
            <b className="open-link">OPEN LEADERBOARDS →</b>
          </Link>

          <Link href="/fan/leaderboard" className="card">
            <i className="card-icon">▣</i>
            <h2>Club pages</h2>
            <p>Click any team name on the leaderboard to see its squad and aggregated team stats.</p>
            <b className="open-link">BROWSE VIA LEADERBOARDS →</b>
          </Link>

          <Link href="/fan/compare" className="card">
            <i className="card-icon">⇄</i>
            <h2>Compare players</h2>
            <p>Pick 2–4 players and see them side by side — a radar chart plus a full stat table.</p>
            <b className="open-link">OPEN COMPARE →</b>
          </Link>
        </div>
      </main>

      <style jsx>{`
        .fan-root {
          --white: var(--ui-text);
          --dark: var(--ui-bg);
          --glass-bg: color-mix(in srgb, var(--ui-panel) 92%, transparent);
          --glass-border: var(--ui-border);
          --accent: var(--ui-accent);

          font-family: var(--font-body);
          color: var(--ui-text);
          min-height: 100vh;
          width: 100%;
          background: var(--dark);
          position: relative;
          overflow-x: hidden;
        }

        .bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 30% 20%, var(--ui-accent-soft) 0%, transparent 55%), var(--ui-bg);
        }

        .bg-pattern {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.05;
          background-image: repeating-linear-gradient(
              0deg,
              rgba(168, 224, 99, 0.5) 0px,
              transparent 1px,
              transparent 56px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(168, 224, 99, 0.5) 0px,
              transparent 1px,
              transparent 56px
            );
        }

        .topbar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 40px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-icon {
          width: 36px;
          height: 36px;
          background: var(--accent);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-icon svg {
          width: 22px;
          height: 22px;
        }

        .brand-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 0.4px;
          color: var(--white);
        }

        .account-actions { display: flex; align-items: center; gap: 9px; }

        .signout {
          background: var(--ui-input);
          border: 1px solid var(--ui-border);
          color: var(--ui-muted);
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 600;
          padding: 9px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .signout:hover {
          border-color: rgba(224, 80, 80, 0.5);
          color: #ff8a8a;
          background: rgba(224, 80, 80, 0.08);
        }

        .hero {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1100px;
          margin: 24px auto 60px;
          padding: 0 40px;
        }

        .kicker {
          display: block;
          font: 700 11px var(--font-body);
          letter-spacing: 1.8px;
          color: var(--accent);
          margin-bottom: 10px;
        }

        h1 {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 46px);
          font-weight: 800;
          letter-spacing: -0.8px;
          color: var(--white);
          line-height: 1.05;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 14px;
          color: var(--ui-muted);
          margin-bottom: 32px;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 190px;
          padding: 24px;
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          background: var(--glass-bg);
          backdrop-filter: blur(22px) saturate(1.4);
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s, transform 0.2s;
          position: relative;
        }

        .card:hover {
          border-color: rgba(172, 233, 107, 0.5);
          transform: translateY(-3px);
        }

        .card-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: var(--ui-accent-soft);
          color: var(--accent);
          font-size: 20px;
          font-style: normal;
        }

        .card h2 {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.3px;
          color: var(--white);
        }

        .card p {
          font-size: 12.5px;
          line-height: 1.6;
          color: var(--ui-muted);
          flex: 1;
        }

        .open-link {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.6px;
          color: var(--accent);
        }

        @media (max-width: 860px) {
          .card-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .topbar { padding: 18px; }
          .hero { padding: 0 18px; margin: 8px auto 36px; }
          .brand-name { display: none; }
        }
      `}</style>
    </div>
  );
}
