"use client";

import { useMemo, useState } from "react";
import { STAT_CATEGORIES, STAT_COLUMNS, type PlayerStatRow, type StatKey } from "@/lib/stats";

const PAGE_SIZE = 10;
const MAX_VISIBLE = 50;

type Entry = {
  player_name: string;
  team_name: string;
  value: number;
};

export function StatsLeaderboards({ players }: { players: PlayerStatRow[] }) {
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
          <StatLeaderboard key={col.key} label={col.label} statKey={col.key} players={players} />
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
          color: rgba(245, 245, 240, 0.6);
          font-family: "DM Sans", sans-serif;
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
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
      `}</style>
    </div>
  );
}

function StatLeaderboard({
  label,
  statKey,
  players,
}: {
  label: string;
  statKey: StatKey;
  players: PlayerStatRow[];
}) {
  const [expanded, setExpanded] = useState(false);

  const entries = useMemo<Entry[]>(() => {
    return players
      .map((p) => ({
        player_name: p.player_name,
        team_name: p.team_name,
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
              <td className="team">{entry.team_name}</td>
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
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
        }

        h3 {
          font-family: "Bebas Neue", sans-serif;
          font-size: 16px;
          letter-spacing: 0.5px;
          color: var(--accent);
          margin-bottom: 10px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-family: "DM Sans", sans-serif;
        }

        th {
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(245, 245, 240, 0.4);
          text-align: left;
          padding: 4px 6px;
          font-weight: 600;
        }

        td {
          font-size: 12.5px;
          color: rgba(245, 245, 240, 0.85);
          padding: 5px 6px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .rank {
          width: 24px;
          color: rgba(245, 245, 240, 0.4);
        }

        .team {
          color: rgba(245, 245, 240, 0.5);
          font-size: 11.5px;
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
