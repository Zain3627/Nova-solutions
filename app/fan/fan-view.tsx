"use client";

import { signOutAction } from "@/lib/auth-actions";
import { LeagueSwitcher } from "./league-switcher";

export function FanView() {
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

        <form action={signOutAction}>
          <button className="signout" type="submit">
            Sign Out
          </button>
        </form>
      </header>

      <main className="card">
        <h1>LEAGUE STATISTICS</h1>
        <p className="subtitle">
          Switch between leagues to see their statistics.
        </p>

        <LeagueSwitcher />
      </main>

      <style jsx>{`
        .fan-root {
          --green: #1a6b2e;
          --lime: #a8e063;
          --white: #f5f5f0;
          --dark: #0b0e0c;
          --glass-bg: rgba(10, 20, 13, 0.62);
          --glass-border: rgba(168, 224, 99, 0.18);
          --input-bg: rgba(255, 255, 255, 0.07);
          --input-border: rgba(168, 224, 99, 0.25);
          --accent: #a8e063;

          font-family: "DM Sans", sans-serif;
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
          background:
            radial-gradient(ellipse at 30% 20%, rgba(26, 107, 46, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 75% 80%, rgba(168, 224, 99, 0.14) 0%, transparent 50%),
            linear-gradient(160deg, #0b0e0c 0%, #0e1a10 55%, #0b0e0c 100%);
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
          font-family: "Bebas Neue", sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          color: var(--white);
        }

        .signout {
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          color: rgba(245, 245, 240, 0.75);
          font-family: "DM Sans", sans-serif;
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
          max-width: 620px;
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
          font-family: "Bebas Neue", sans-serif;
          font-size: 34px;
          letter-spacing: 1.5px;
          color: var(--white);
          line-height: 1;
          margin-bottom: 6px;
        }

        .subtitle {
          font-size: 13px;
          color: rgba(245, 245, 240, 0.45);
          margin-bottom: 28px;
          font-weight: 300;
        }
      `}</style>
    </div>
  );
}
