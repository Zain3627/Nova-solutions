"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { STAT_CATEGORIES, STAT_COLUMNS, type PlayerStatRow, type StatKey } from "@/lib/stats";
import type { LeagueValue, SeasonValue } from "@/lib/leagues";

const PAGE_SIZE = 15;
const MAX_VISIBLE = 50;

type Entry = {
  player_name: string;
  team_name: string;
  team_id: number;
  value: number;
};

export function StatsLeaderboards({
  players,
  league,
  season,
}: {
  players: PlayerStatRow[];
  league: LeagueValue;
  season: SeasonValue;
}) {
  const [category, setCategory] = useState(STAT_CATEGORIES[0].id);

  const columns = STAT_COLUMNS.filter((c) => c.category === category);

  return (
    <div>
      <div className="tabs">
        {STAT_CATEGORIES.map((c) => (
          <button
            type="button"
            key={c.id}
            className={`tab ${category === c.id ? "active" : ""}`}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid">
        {columns.map((col) => (
          <StatLeaderboard
            key={col.key}
            label={col.label}
            statKey={col.key}
            players={players}
            league={league}
            season={season}
          />
        ))}
      </div>

      <style jsx>{`
        .tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .tab {
          border: 1px solid var(--input-border);
          background: var(--input-bg);
          color: var(--ui-muted);
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab:hover {
          border-color: rgba(168, 224, 99, 0.45);
          color: var(--white);
        }

        .tab.active {
          border-color: var(--accent);
          background: rgba(168, 224, 99, 0.12);
          color: var(--accent);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
}

function StatLeaderboard({
  label,
  statKey,
  players,
  league,
  season,
}: {
  label: string;
  statKey: StatKey;
  players: PlayerStatRow[];
  league: LeagueValue;
  season: SeasonValue;
}) {
  const [expanded, setExpanded] = useState(false);

  const entries = useMemo<Entry[]>(() => {
    return players
      .map((p) => ({
        player_name: p.player_name,
        team_name: p.team_name,
        team_id: p.team_id,
        value: p[statKey],
      }))
      .filter((e): e is Entry => typeof e.value === "number" && e.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [players, statKey]);

  if (entries.length === 0) return null;

  const visible = expanded ? entries.slice(0, MAX_VISIBLE) : entries.slice(0, PAGE_SIZE);
  const hasMore = entries.length > PAGE_SIZE;

  return (
    <div className="leaderboard">
      <h3>{label}</h3>
      <table>
        <thead>
          <tr>
            <th className="rank">#</th>
            <th>Player</th>
            <th>Team</th>
            <th className="value">{label}</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((entry, i) => (
            <tr key={`${entry.player_name}-${entry.team_name}`}>
              <td className="rank">{i + 1}</td>
              <td className="player">{entry.player_name}</td>
              <td className="team">
                <Link href={`/fan/club/${entry.team_id}?league=${league}&season=${season}`}>
                  {entry.team_name}
                </Link>
              </td>
              <td className="value">{formatValue(entry.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {hasMore && (
        <button type="button" className="toggle" onClick={() => setExpanded((v) => !v)}>
          {expanded
            ? "Show less"
            : `Show more (${Math.min(entries.length, MAX_VISIBLE) - PAGE_SIZE})`}
        </button>
      )}

      <style jsx>{`
        .leaderboard {
          border: 1px solid var(--input-border);
          background: var(--ui-panel);
          border-radius: 12px;
          padding: 22px;
          display: flex;
          flex-direction: column;
        }

        h3 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.15px;
          color: var(--accent);
          margin-bottom: 12px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-body);
        }

        th {
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--ui-muted);
          text-align: left;
          padding: 6px 8px;
          font-weight: 600;
        }

        td {
          font-size: 13.5px;
          color: var(--ui-text);
          padding: 7px 8px;
          border-top: 1px solid var(--ui-border);
        }

        .rank {
          width: 24px;
          color: var(--ui-muted);
        }

        .team {
          color: var(--ui-muted);
          font-size: 11.5px;
        }

        .team a {
          color: inherit;
          text-decoration: none;
        }

        .team a:hover {
          color: var(--ui-accent);
          text-decoration: underline;
        }

        .value {
          text-align: right;
          font-weight: 700;
          color: var(--accent);
        }

        .toggle {
          margin-top: 10px;
          align-self: center;
          background: none;
          border: none;
          color: rgba(168, 224, 99, 0.7);
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 8px;
        }

        .toggle:hover {
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}

function formatValue(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}
