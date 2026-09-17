"use client";

import { signOutAction } from "@/lib/auth-actions";
import { LeagueSwitcher } from "./league-switcher";
import type { LeagueValue, SeasonValue } from "@/lib/leagues";
import type { PlayerStatRow } from "@/lib/stats";
import { AccountSettings } from "@/app/account-settings/account-settings";

export function FanView({
  league,
  season,
  players,
  email,
  displayName,
  initialTheme,
}: {
  league: LeagueValue;
  season: SeasonValue;
  players: PlayerStatRow[];
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

      <main className="card">
        <h1>PLAYERS STATISTICS</h1>
        <p className="subtitle">
          Switch between leagues to see their statistics.
        </p>

        <LeagueSwitcher
          selectedLeague={league}
          selectedSeason={season}
          players={players}
        />
      </main>

      <style jsx>{`
        .fan-root {
          --green: #1a6b2e;
          --lime: #a8e063;
          --white: var(--ui-text);
          --dark: var(--ui-bg);
          --glass-bg: color-mix(in srgb, var(--ui-panel) 92%, transparent);
          --glass-border: var(--ui-border);
          --input-bg: var(--ui-subtle);
          --input-border: var(--ui-border);
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
          background: var(--input-bg);
          border: 1px solid var(--input-border);
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

        .card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1240px;
          margin: 24px auto 60px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(22px) saturate(1.4);
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(168, 224, 99, 0.06) inset;
          animation: fadeUp 0.6s ease both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        h1 {
          font-family: var(--font-display);
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -0.6px;
          color: var(--white);
          line-height: 1;
          margin-bottom: 6px;
        }

        .subtitle {
          font-size: 14px;
          color: var(--ui-muted);
          margin-bottom: 28px;
          font-weight: 300;
        }

        @media (max-width: 640px) {
          .topbar { padding: 18px; }
          .card { margin: 8px 12px 36px; width: calc(100% - 24px); padding: 22px 16px; }
          .brand-name { display: none; }
          .signout { padding-inline: 11px; }
        }
      `}</style>
    </div>
  );
}
