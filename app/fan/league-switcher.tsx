"use client";

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LEAGUES, SEASONS, type LeagueValue, type SeasonValue } from "@/lib/leagues";
import type { PlayerStatRow } from "@/lib/stats";
import { StatsLeaderboards } from "./stats-leaderboards";

export function LeagueSwitcher({
  selectedLeague,
  selectedSeason,
  players,
}: {
  selectedLeague: LeagueValue;
  selectedSeason: SeasonValue;
  players: PlayerStatRow[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const league = LEAGUES.find((l) => l.value === selectedLeague)!;

  function updateParams(next: { league?: LeagueValue; season?: SeasonValue }) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.league) params.set("league", next.league);
    if (next.season) params.set("season", next.season);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div>
      <div className="league-grid">
        {LEAGUES.map((l) => (
          <button
            type="button"
            key={l.value}
            className={`league-card ${selectedLeague === l.value ? "active" : ""}`}
            onClick={() => updateParams({ league: l.value })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.icon} alt={l.label} />
            <span>{l.label}</span>
          </button>
        ))}
      </div>

      <div className="season-row">
        {SEASONS.map((s) => (
          <button
            type="button"
            key={s.value}
            className={`season-pill ${selectedSeason === s.value ? "active" : ""}`}
            onClick={() => updateParams({ season: s.value })}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className={`stats-panel ${isPending ? "pending" : ""}`}>
        <h2>{league.label}</h2>
        <p className="season-label">
          {SEASONS.find((s) => s.value === selectedSeason)?.label} Season
        </p>

        {players.length === 0 ? (
          <p className="empty">No stats available for this season yet.</p>
        ) : (
          <StatsLeaderboards players={players} />
        )}
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

        .season-row {
          display: flex;
          gap: 10px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .season-pill {
          border: 1px solid var(--input-border);
          background: var(--input-bg);
          color: rgba(245, 245, 240, 0.6);
          font-family: "DM Sans", sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          padding: 9px 18px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .season-pill:hover {
          border-color: rgba(168, 224, 99, 0.45);
          color: var(--white);
        }

        .season-pill.active {
          border-color: var(--accent);
          background: rgba(168, 224, 99, 0.12);
          color: var(--accent);
        }

        .stats-panel {
          border: 1px solid var(--input-border);
          background: var(--input-bg);
          border-radius: 14px;
          padding: 28px;
          transition: opacity 0.15s ease;
        }

        .stats-panel.pending {
          opacity: 0.5;
        }

        .stats-panel h2 {
          font-family: "Bebas Neue", sans-serif;
          font-size: 24px;
          letter-spacing: 1px;
          color: var(--white);
          margin-bottom: 2px;
          text-align: center;
        }

        .season-label {
          font-size: 12.5px;
          color: rgba(245, 245, 240, 0.4);
          text-align: center;
          margin-bottom: 24px;
        }

        .empty {
          font-size: 13px;
          color: rgba(245, 245, 240, 0.4);
          text-align: center;
          padding: 20px 0;
        }
      `}</style>
    </div>
  );
}
