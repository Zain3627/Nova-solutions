import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  isLeagueValue,
  isSeasonValue,
  getPlayersTableName,
  type LeagueValue,
  type SeasonValue,
} from "@/lib/leagues";
import { PLAYER_STATS_SELECT, type PlayerStatRow } from "@/lib/stats";
import { PlayerProfileView } from "./profile-view";
import styles from "../../coach.module.css";

export default async function PlayerProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; league?: string; season?: string }>;
}) {
  const sp = await searchParams;
  const name = (sp.name ?? "").trim();
  const league: LeagueValue = isLeagueValue(sp.league ?? "") ? (sp.league as LeagueValue) : "premier_league";
  const season: SeasonValue = isSeasonValue(sp.season ?? "") ? (sp.season as SeasonValue) : "25_26";

  let player: PlayerStatRow | null = null;
  let queryFailed = false;

  if (name) {
    const supabase = await createClient();
    const tableName = getPlayersTableName(league, season);
    const { data, error } = await supabase
      .from(tableName)
      .select(PLAYER_STATS_SELECT)
      .ilike("player_name", name)
      .limit(1)
      .returns<PlayerStatRow[]>();

    if (error) {
      console.error(`Failed to load player "${name}" from ${tableName}:`, error.message);
      queryFailed = true;
    }
    player = data?.[0] ?? null;
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div>
          <span>RECRUITMENT LAB</span>
          <h1>{player ? player.player_name : "Player profile"}</h1>
        </div>
        <Link href="/coach/scouting" className={styles.backLink}>← SCOUTING</Link>
      </header>

      {!name && (
        <section className={styles.activityPanel}>
          <div>
            <span className={styles.kicker}>NO PLAYER SELECTED</span>
            <h3>Search for a player to open their profile</h3>
            <p>Go back to Scouting and type an exact player name to load their full statistical profile.</p>
          </div>
        </section>
      )}

      {name && !player && (
        <section className={styles.activityPanel}>
          <div>
            <span className={styles.kicker}>NO MATCH FOUND</span>
            <h3>&ldquo;{name}&rdquo; wasn&apos;t found</h3>
            <p>
              {queryFailed
                ? "The player lookup failed — check the Supabase connection and try again."
                : "No player with that exact name was found in the current league/season. Full fuzzy search is on the roadmap."}
            </p>
          </div>
        </section>
      )}

      {player && <PlayerProfileView player={player} league={league} season={season} />}
    </div>
  );
}
