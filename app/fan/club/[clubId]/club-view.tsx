import Image from "next/image";
import Link from "next/link";
import type { LeagueValue, SeasonValue } from "@/lib/leagues";
import type { PlayerStatRow } from "@/lib/stats";
import styles from "./club.module.css";

export function ClubView({
  clubId,
  squad,
  league,
  season,
  leagueLabel,
  seasonLabel,
}: {
  clubId: string;
  squad: PlayerStatRow[];
  league: LeagueValue;
  season: SeasonValue;
  leagueLabel: string;
  seasonLabel: string;
}) {
  if (squad.length === 0) {
    return (
      <section className={styles.empty}>
        <span className={styles.kicker}>NO SQUAD DATA</span>
        <h2>Nothing here yet</h2>
        <p>No players were found for this club in {leagueLabel} {seasonLabel}.</p>
      </section>
    );
  }

  const clubName = squad[0].team_name;
  const ratings = squad.map((p) => p.rating).filter((v): v is number => typeof v === "number" && v > 0);
  const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;
  const totalGoals = sumStat(squad, "goals");
  const totalAssists = sumStat(squad, "assists");

  const sortedSquad = [...squad].sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1));

  return (
    <>
      <section className={styles.heroCard}>
        <span className={styles.crest}>
          <Image src={`/club-icons/${clubId}.png`} alt="" width={56} height={56} />
        </span>
        <div className={styles.identity}>
          <span className={styles.kicker}>{leagueLabel.toUpperCase()} · {seasonLabel}</span>
          <h1>{clubName}</h1>
        </div>
      </section>

      <section className={styles.tiles}>
        <div className={styles.tile}>
          <span>SQUAD SIZE</span>
          <b>{squad.length}</b>
        </div>
        <div className={styles.tile}>
          <span>TOTAL GOALS</span>
          <b>{totalGoals}</b>
        </div>
        <div className={styles.tile}>
          <span>TOTAL ASSISTS</span>
          <b>{totalAssists}</b>
        </div>
        <div className={styles.tile}>
          <span>SQUAD AVG RATING</span>
          <b>{avgRating !== null ? avgRating.toFixed(2) : "—"}</b>
        </div>
      </section>

      <section>
        <div className={styles.sectionHead}>
          <h2>Squad</h2>
          <small>Sorted by rating — position data isn&apos;t available yet.</small>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th className={styles.num}>Rating</th>
                <th className={styles.num}>Goals</th>
                <th className={styles.num}>Assists</th>
                <th className={styles.num}>Starts</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedSquad.map((player) => (
                <tr key={player.player_name}>
                  <td>{player.player_name}</td>
                  <td className={styles.num}>{formatValue(player.rating)}</td>
                  <td className={styles.num}>{formatValue(player.goals)}</td>
                  <td className={styles.num}>{formatValue(player.assists)}</td>
                  <td className={styles.num}>{formatValue(player.matchesStarted)}</td>
                  <td className={styles.num}>
                    <Link
                      href={`/fan/compare?league=${league}&season=${season}&players=${encodeURIComponent(player.player_name)}`}
                      className={styles.compareLink}
                    >
                      Compare →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function sumStat(squad: PlayerStatRow[], key: "goals" | "assists"): number {
  return squad.reduce((total, p) => total + (typeof p[key] === "number" ? p[key] : 0), 0);
}

function formatValue(value: number | null): string {
  if (typeof value !== "number") return "—";
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}
