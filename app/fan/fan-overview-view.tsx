"use client";

import Link from "next/link";
import { signOutAction } from "@/lib/auth-actions";
import { AccountSettings } from "@/app/account-settings/account-settings";

const CARDS = [
  {
    href: "/fan/leaderboard",
    index: "01 / STATISTICS",
    icon: "◎",
    title: "LEADERBOARDS",
    desc: "Switch between every covered league and season, then compare stat-category rankings.",
    tags: ["LEAGUES", "SEASONS", "RANKINGS"],
    cta: "OPEN LEADERBOARDS",
  },
  {
    href: "/fan/leaderboard",
    index: "02 / TEAMS",
    icon: "▣",
    title: "CLUB PAGES",
    desc: "Click any team name on the leaderboard to see its squad and aggregated team stats.",
    tags: ["SQUADS", "TEAM STATS"],
    cta: "BROWSE VIA LEADERBOARDS",
  },
  {
    href: "/fan/compare",
    index: "03 / ANALYSIS",
    icon: "⇄",
    title: "COMPARE PLAYERS",
    desc: "Pick 2–4 players and see them side by side — a radar chart plus a full stat table.",
    tags: ["RADAR CHART", "HEAD-TO-HEAD"],
    cta: "OPEN COMPARE",
  },
] as const;

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

      <main className="page">
        <section className="hero">
          <div>
            <span className="kicker">FAN WORKSPACE</span>
            <h1>Welcome back,<br /><em>{firstName}.</em></h1>
            <p>Here&apos;s what you can do from here — browse live stats, dig into a club, or line players up side by side.</p>
          </div>
          <div className="hero-graphic" aria-hidden="true">
            <div className="orbit" />
            <div className="orbit-ring" />
            <span className="orbit-badge">N</span>
          </div>
        </section>

        <div className="section-title">
          <div><span>01</span><h3>Your tools</h3></div>
          <small>SELECT A WORKSPACE TO BEGIN</small>
        </div>

        <section className="card-grid">
          {CARDS.map((card) => (
            <Link key={card.title} href={card.href} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
              <div className="card">
                <div className="card-icon">{card.icon}</div>
                <span className="card-index">{card.index}</span>
                <h2>{card.title}</h2>
                <p>{card.desc}</p>
                <div className="card-tags">
                  {card.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <b className="open-link">{card.cta} <i>→</i></b>
              </div>
            </Link>
          ))}
        </section>
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

        .page {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1180px;
          margin: 12px auto 60px;
          padding: 0 40px;
        }

        .kicker {
          display: block;
          font: 700 11px var(--font-body);
          letter-spacing: 1.8px;
          color: var(--accent);
          margin-bottom: 12px;
        }

        .hero {
          min-height: 240px;
          padding: 40px 46px;
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          background: radial-gradient(circle at 85% 30%, var(--ui-accent-soft), transparent 32%), var(--ui-panel);
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          align-items: center;
          gap: 24px;
          margin-bottom: 30px;
          overflow: hidden;
        }

        .hero h1 {
          font-family: var(--font-display);
          font-size: clamp(34px, 4.6vw, 52px);
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1;
          color: var(--white);
          margin-bottom: 14px;
        }

        .hero h1 em {
          font-style: normal;
          color: var(--accent);
        }

        .hero p {
          max-width: 440px;
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--ui-muted);
        }

        .hero-graphic {
          position: relative;
          height: 170px;
          justify-self: end;
          display: grid;
          place-items: center;
        }

        .orbit {
          position: absolute;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--ui-accent-soft), transparent 70%);
        }

        .orbit-ring {
          position: absolute;
          width: 130px;
          height: 130px;
          border: 1px dashed rgba(172, 233, 107, 0.3);
          border-radius: 50%;
          animation: spin 18s linear infinite;
        }

        .orbit-ring::before,
        .orbit-ring::after {
          content: "";
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
        }

        .orbit-ring::before {
          top: -3.5px;
          left: calc(50% - 3.5px);
        }

        .orbit-ring::after {
          bottom: -3.5px;
          left: calc(50% - 3.5px);
        }

        .orbit-badge {
          width: 64px;
          height: 64px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: var(--ui-panel);
          border: 1px solid var(--glass-border);
          color: var(--accent);
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 800;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .section-title {
          margin: 0 0 14px;
          display: flex;
          align-items: end;
          justify-content: space-between;
        }

        .section-title > div {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-title > div > span {
          width: 26px;
          height: 26px;
          display: grid;
          place-items: center;
          background: var(--accent);
          color: var(--ui-accent-ink);
          border-radius: 7px;
          font: 800 10px var(--font-body);
        }

        .section-title h3 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 750;
          letter-spacing: -0.25px;
          color: var(--white);
        }

        .section-title small {
          font: 700 10px var(--font-body);
          color: var(--ui-muted);
          letter-spacing: 0.8px;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .card {
          min-height: 260px;
          padding: 26px;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--glass-border);
          border-radius: 15px;
          background: linear-gradient(145deg, var(--ui-accent-soft), var(--ui-panel));
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
        }

        .card::after {
          content: "";
          position: absolute;
          width: 160px;
          height: 160px;
          right: -70px;
          top: -60px;
          border: 1px solid rgba(172, 233, 107, 0.12);
          border-radius: 50%;
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
          background: rgba(172, 233, 107, 0.1);
          color: var(--accent);
          font-size: 19px;
          font-style: normal;
          margin-bottom: 18px;
        }

        .card-index {
          font: 700 9px var(--font-body);
          letter-spacing: 1px;
          color: var(--accent);
        }

        .card h2 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.6px;
          line-height: 1.05;
          color: var(--white);
          margin: 8px 0 10px;
        }

        .card p {
          font-size: 12px;
          line-height: 1.55;
          color: var(--ui-muted);
          max-width: 300px;
          flex: 1;
        }

        .card-tags {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          margin-top: 14px;
        }

        .card-tags span {
          padding: 5px 7px;
          border: 1px solid var(--glass-border);
          border-radius: 5px;
          font: 700 8.5px var(--font-body);
          color: var(--ui-muted);
        }

        .open-link {
          display: block;
          margin-top: 16px;
          font: 750 10px var(--font-body);
          color: var(--white);
          letter-spacing: 0.4px;
        }

        .open-link i {
          color: var(--accent);
          font-style: normal;
          margin-left: 6px;
        }

        @media (max-width: 860px) {
          .hero {
            grid-template-columns: 1fr;
          }
          .hero-graphic {
            display: none;
          }
          .card-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .topbar { padding: 18px; }
          .page { padding: 0 18px; margin: 8px auto 36px; }
          .brand-name { display: none; }
        }
      `}</style>
    </div>
  );
}
