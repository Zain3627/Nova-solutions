"use client";

import { useState } from "react";
import { STAT_CATEGORIES, STAT_COLUMNS, type PlayerStatRow } from "@/lib/stats";
import { LEAGUES, SEASONS, type LeagueValue, type SeasonValue } from "@/lib/leagues";
import coachStyles from "../../coach.module.css";
import styles from "./profile.module.css";

export function PlayerProfileView({
  player,
  league,
  season,
}: {
  player: PlayerStatRow;
  league: LeagueValue;
  season: SeasonValue;
}) {
  const [category, setCategory] = useState(STAT_CATEGORIES[0].id);

  const leagueLabel = LEAGUES.find((l) => l.value === league)?.label ?? league;
  const seasonLabel = SEASONS.find((s) => s.value === season)?.label ?? season;
  const columns = STAT_COLUMNS.filter((c) => c.category === category);
  const rating = player.rating;

  return (
    <div className={styles.wrap}>
      <section className={styles.heroCard}>
        <div className={styles.avatar}>{player.player_name.slice(0, 1).toUpperCase()}</div>
        <div className={styles.identity}>
          <span className={coachStyles.kicker}>
            {leagueLabel.toUpperCase()} · {seasonLabel}
          </span>
          <h2>{player.player_name}</h2>
          <p>{player.team_name}</p>
        </div>
        <div className={styles.ratingBadge}>
          <b>{typeof rating === "number" ? rating.toFixed(2) : "—"}</b>
          <small>RATING</small>
        </div>
        <button type="button" className={styles.shortlistBtn}>+ ADD TO SHORTLIST</button>
      </section>

      <div className={coachStyles.sectionTitle}>
        <div><span>02</span><h3>Statistical profile</h3></div>
        <small>SELECT A CATEGORY</small>
      </div>

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

      <div className={styles.statGrid}>
        {columns.map((col) => {
          const value = player[col.key];
          return (
            <div key={col.key} className={styles.statTile}>
              <span>{col.label}</span>
              <b>{typeof value === "number" ? formatValue(value) : "—"}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatValue(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}
