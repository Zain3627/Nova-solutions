"use client";

import { useState } from "react";
import { LEAGUES, type LeagueValue } from "@/lib/leagues";

export function LeagueSwitcher() {
  const [selected, setSelected] = useState<LeagueValue>(LEAGUES[0].value);
  const league = LEAGUES.find((l) => l.value === selected)!;

  return (
    <div>
      <div className="league-grid">
        {LEAGUES.map((l) => (
          <button
            type="button"
            key={l.value}
            className={`league-card ${selected === l.value ? "active" : ""}`}
            onClick={() => setSelected(l.value)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.icon} alt={l.label} />
            <span>{l.label}</span>
          </button>
        ))}
      </div>

      <div className="stats-panel">
        <h2>{league.label}</h2>
        <p>Statistics coming soon.</p>
      </div>

      <style jsx>{`
        .league-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }

        @media (max-width: 560px) {
          .league-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .league-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--input-border);
          background: var(--input-bg);
          border-radius: 14px;
          padding: 18px 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          color: rgba(245, 245, 240, 0.6);
          font-family: "DM Sans", sans-serif;
        }

        .league-card img {
          width: 44px;
          height: 44px;
          object-fit: contain;
        }

        .league-card span {
          font-size: 12.5px;
          font-weight: 600;
          text-align: center;
          line-height: 1.3;
          color: inherit;
        }

        .league-card:hover {
          border-color: rgba(168, 224, 99, 0.45);
          background: rgba(168, 224, 99, 0.06);
          color: var(--white);
        }

        .league-card.active {
          border-color: var(--accent);
          background: rgba(168, 224, 99, 0.12);
          color: var(--accent);
          box-shadow: 0 0 16px rgba(168, 224, 99, 0.18);
        }

        .stats-panel {
          border: 1px solid var(--input-border);
          background: var(--input-bg);
          border-radius: 14px;
          padding: 28px;
          text-align: center;
        }

        .stats-panel h2 {
          font-family: "Bebas Neue", sans-serif;
          font-size: 24px;
          letter-spacing: 1px;
          color: var(--white);
          margin-bottom: 6px;
        }

        .stats-panel p {
          font-size: 13px;
          color: rgba(245, 245, 240, 0.4);
        }
      `}</style>
    </div>
  );
}
