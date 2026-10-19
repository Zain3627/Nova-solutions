"use client";

import { useState } from "react";
import {
  STAT_CATEGORIES,
  STAT_COLUMNS,
  LOWER_IS_BETTER,
  type PlayerStatRow,
  type StatKey,
} from "@/lib/stats";
import styles from "./compare.module.css";

const PLAYER_COLORS = ["#ace96b", "#6fb8ff", "#ffb84a", "#ff6f91"];

const RADAR_KEYS: StatKey[] = [
  "rating",
  "goals",
  "assists",
  "successfulDribbles",
  "tackles",
  "interceptions",
];

export function CompareView({ players }: { players: PlayerStatRow[] }) {
  const [category, setCategory] = useState(STAT_CATEGORIES[0].id);
  const columns = STAT_COLUMNS.filter((c) => c.category === category);

  return (
    <>
      <section className={styles.legend}>
        {players.map((p, i) => (
          <span key={p.player_name} className={styles.legendItem}>
            <i style={{ background: PLAYER_COLORS[i] }} />
            {p.player_name} <small>{p.team_name}</small>
          </span>
        ))}
      </section>

      <RadarChart players={players} />

      <div className={styles.tabs}>
        {STAT_CATEGORIES.map((c) => (
          <button
            type="button"
            key={c.id}
            className={category === c.id ? styles.tabActive : undefined}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              {players.map((p) => (
                <th key={p.player_name} className={styles.num}>{p.player_name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columns.map((col) => {
              const values = players.map((p) => p[col.key]);
              const numeric = values.filter((v): v is number => typeof v === "number");
              const lowerBetter = LOWER_IS_BETTER.has(col.key);
              const best = numeric.length > 1
                ? (lowerBetter ? Math.min(...numeric) : Math.max(...numeric))
                : null;

              return (
                <tr key={col.key}>
                  <td>{col.label}</td>
                  {values.map((value, i) => {
                    const isBest = best !== null && typeof value === "number" && value === best;
                    return (
                      <td key={players[i].player_name} className={`${styles.num} ${isBest ? styles.best : ""}`}>
                        {formatValue(value)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function RadarChart({ players }: { players: PlayerStatRow[] }) {
  const size = 320;
  const center = size / 2;
  const radius = center - 56;
  const axisCount = RADAR_KEYS.length;

  const maxByKey = RADAR_KEYS.map((key) => {
    const values = players.map((p) => p[key]).filter((v): v is number => typeof v === "number");
    const max = Math.max(0, ...values);
    return max > 0 ? max : 1;
  });

  function pointFor(valueIndex: number, ratio: number) {
    const angle = (Math.PI * 2 * valueIndex) / axisCount - Math.PI / 2;
    return {
      x: center + Math.cos(angle) * radius * ratio,
      y: center + Math.sin(angle) * radius * ratio,
    };
  }

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className={styles.radarWrap}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={RADAR_KEYS.map((_, i) => {
              const { x, y } = pointFor(i, level);
              return `${x},${y}`;
            }).join(" ")}
            fill="none"
            stroke="var(--ui-border)"
            strokeWidth={1}
          />
        ))}

        {RADAR_KEYS.map((key, i) => {
          const { x, y } = pointFor(i, 1);
          const label = STAT_COLUMNS.find((c) => c.key === key)?.label ?? key;
          const labelPoint = pointFor(i, 1.18);
          return (
            <g key={key}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="var(--ui-border)" strokeWidth={1} />
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                fill="var(--ui-muted)"
                fontSize="9"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {label}
              </text>
            </g>
          );
        })}

        {players.map((player, pIndex) => {
          const points = RADAR_KEYS.map((key, i) => {
            const raw = player[key];
            const value = typeof raw === "number" ? raw : 0;
            const ratio = Math.min(1, value / maxByKey[i]);
            const { x, y } = pointFor(i, ratio);
            return `${x},${y}`;
          }).join(" ");

          return (
            <polygon
              key={player.player_name}
              points={points}
              fill={PLAYER_COLORS[pIndex]}
              fillOpacity={0.12}
              stroke={PLAYER_COLORS[pIndex]}
              strokeWidth={2}
            />
          );
        })}
      </svg>
    </div>
  );
}

function formatValue(value: number | null): string {
  if (typeof value !== "number") return "—";
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}
