import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import {
  LEAGUE_VALUES,
  SEASON_VALUES,
  isLeagueValue,
  isSeasonValue,
  getPlayersTableName,
  type LeagueValue,
  type SeasonValue,
} from "@/lib/leagues";
import { PLAYER_STATS_SELECT, type PlayerStatRow } from "@/lib/stats";
import { AddPlayerForm } from "./add-player-form";
import { CompareView } from "./compare-view";
import shared from "../fan-shared.module.css";
import styles from "./compare.module.css";

const MAX_PLAYERS = 4;

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ league?: string; season?: string; players?: string }>;
}) {
  const user = await verifySession();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "fan") redirect("/");

  const sp = await searchParams;
  const league: LeagueValue = isLeagueValue(sp.league ?? "") ? (sp.league as LeagueValue) : LEAGUE_VALUES[0];
  const season: SeasonValue = isSeasonValue(sp.season ?? "")
    ? (sp.season as SeasonValue)
    : SEASON_VALUES[SEASON_VALUES.length - 1];

  const requestedNames = (sp.players ?? "")
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean)
    .slice(0, MAX_PLAYERS);

  const tableName = getPlayersTableName(league, season);
  const lookups = await Promise.all(
    requestedNames.map(async (name) => {
      const { data, error } = await supabase
        .from(tableName)
        .select(PLAYER_STATS_SELECT)
        .ilike("player_name", name)
        .limit(1)
        .returns<PlayerStatRow[]>();
      if (error) console.error(`Compare lookup failed for "${name}":`, error.message);
      return { name, player: data?.[0] ?? null };
    })
  );

  const players = lookups.map((l) => l.player).filter((p): p is PlayerStatRow => p !== null);
  const notFound = lookups.filter((l) => !l.player).map((l) => l.name);

  let suggestions: { player_name: string; team_name: string; rating: number | null }[] = [];
  if (players.length < MAX_PLAYERS) {
    const added = new Set(requestedNames.map((n) => n.toLowerCase()));
    const { data } = await supabase
      .from(tableName)
      .select("player_name,team_name,rating")
      .order("rating", { ascending: false, nullsFirst: false })
      .limit(MAX_PLAYERS - players.length + requestedNames.length + 6);
    suggestions = (data ?? [])
      .filter((p) => !added.has(p.player_name.toLowerCase()))
      .slice(0, 6);
  }

  function removeHref(name: string) {
    const remaining = requestedNames.filter((n) => n !== name);
    const params = new URLSearchParams({ league, season, players: remaining.join(",") });
    return `/fan/compare?${params.toString()}`;
  }

  function addSuggestionHref(name: string) {
    const next = [...requestedNames, name];
    const params = new URLSearchParams({ league, season, players: next.join(",") });
    return `/fan/compare?${params.toString()}`;
  }

  return (
    <div className={shared.shell}>
      <header className={shared.topbar}>
        <div className={shared.brandBlock}>
          <Link href="/fan" className={shared.brand}>
            <span className={shared.brandMark}>N</span>
            <span>NOVA SOLUTION</span>
          </Link>
          <Link href="/fan" className={shared.backLink} aria-label="Back to fan home">
            ←
          </Link>
        </div>
      </header>
      <main className={shared.main}>
        <div className={styles.intro}>
          <span className={styles.kicker}>{league.replace(/_/g, " ").toUpperCase()} · COMPARE</span>
          <h1>Compare players</h1>
          <p>Add 2–4 players from the current league and season to see them side by side.</p>
        </div>

        {requestedNames.length > 0 && (
          <div className={styles.chips}>
            {requestedNames.map((name) => (
              <span key={name} className={styles.chip}>
                {name}
                <Link href={removeHref(name)} aria-label={`Remove ${name}`}>×</Link>
              </span>
            ))}
          </div>
        )}

        <AddPlayerForm league={league} season={season} currentNames={requestedNames} />

        {notFound.length > 0 && (
          <p className={styles.warning}>
            Couldn&apos;t find: {notFound.join(", ")} — check the exact spelling for this league and season.
          </p>
        )}

        {players.length < 2 ? (
          <section className={styles.empty}>
            <span className={styles.kicker}>NOT ENOUGH PLAYERS</span>
            <h2>Add at least 2 players to compare</h2>
            <p>Search above, or quick-add one of this season&apos;s top-rated players below.</p>
            {suggestions.length > 0 && (
              <div className={styles.quickAdd}>
                <span>TOP RATED THIS SEASON</span>
                <div className={styles.quickAddChips}>
                  {suggestions.map((s) => (
                    <Link key={s.player_name} href={addSuggestionHref(s.player_name)} className={styles.quickAddChip}>
                      {s.player_name} <b>{s.rating?.toFixed(1) ?? "—"}</b>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        ) : (
          <CompareView players={players} />
        )}
      </main>
    </div>
  );
}
