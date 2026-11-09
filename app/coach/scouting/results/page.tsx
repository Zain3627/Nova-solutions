import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  COACH_LEAGUES,
  isLeagueValue,
  getPlayersTableName,
  type LeagueValue,
} from "@/lib/leagues";
import {
  POSITIONS,
  FEET,
  isPosition,
  isFoot,
  ageFromDob,
  PLAYER_BIO_SELECT,
  type PlayerBio,
} from "@/lib/players-bio";
import coachStyles from "../../coach.module.css";
import styles from "./results.module.css";

const SEASON = "25_26" as const;
const RESULT_LIMIT = 24;

type StatsRow = { player_id: number; rating: number | null; matchesStarted: number | null };

export default async function ScoutingResultsPage({
  searchParams,
}: {
  searchParams: Promise<{
    league?: string;
    position?: string;
    foot?: string;
    ageMin?: string;
    ageMax?: string;
    minRating?: string;
    sort?: string;
  }>;
}) {
  const sp = await searchParams;
  const league: LeagueValue = isLeagueValue(sp.league ?? "") ? (sp.league as LeagueValue) : "premier_league";
  const position = isPosition(sp.position ?? "") ? sp.position! : "";
  const foot = isFoot(sp.foot ?? "") ? sp.foot! : "";
  const ageMin = Number(sp.ageMin) || null;
  const ageMax = Number(sp.ageMax) || null;
  const minRating = Number(sp.minRating) || null;
  const sort = sp.sort === "age" ? "age" : "rating";

  const supabase = await createClient();
  const statsTable = getPlayersTableName(league, SEASON);

  const { data: statsData, error: statsError } = await supabase
    .from(statsTable)
    .select("player_id,rating,matchesStarted")
    .returns<StatsRow[]>();

  const statsById = new Map((statsData ?? []).map((r) => [r.player_id, r]));

  let bio: PlayerBio[] = [];
  let bioError = false;

  if (!statsError && statsData && statsData.length > 0) {
    // Scope the bio lookup to this league's teams (a handful of IDs) rather
    // than every player_id individually, which would make the request URL
    // too long for a league-sized roster.
    const { data: teamRows } = await supabase.from(statsTable).select("team_id");
    const distinctTeamIds = [...new Set((teamRows ?? []).map((r) => r.team_id))];

    let bioQuery = supabase
      .from("players_bio")
      .select(PLAYER_BIO_SELECT)
      .in("team_id", distinctTeamIds)
      .returns<PlayerBio[]>();

    if (position) bioQuery = bioQuery.eq("player_position", position);
    if (foot) bioQuery = bioQuery.eq("player_preferred_foot", foot);

    const { data: bioData, error } = await bioQuery;
    if (error) {
      console.error("Scouting results bio lookup failed:", error.message);
      bioError = true;
    }
    bio = bioData ?? [];
  }

  let results = bio
    .filter((b) => statsById.has(b.player_id))
    .map((b) => {
      const stats = statsById.get(b.player_id)!;
      return { ...b, rating: stats.rating, matchesStarted: stats.matchesStarted, age: ageFromDob(b.player_date_of_birth) };
    });

  if (ageMin !== null) results = results.filter((r) => r.age !== null && r.age >= ageMin);
  if (ageMax !== null) results = results.filter((r) => r.age !== null && r.age <= ageMax);
  if (minRating !== null) results = results.filter((r) => (r.rating ?? 0) >= minRating);

  results.sort((a, b) =>
    sort === "age"
      ? (a.age ?? 999) - (b.age ?? 999)
      : (b.rating ?? 0) - (a.rating ?? 0)
  );

  const total = results.length;
  const shown = results.slice(0, RESULT_LIMIT);

  function profileHref(name: string) {
    const params = new URLSearchParams({ name, league, season: SEASON });
    return `/coach/scouting/profile?${params.toString()}`;
  }

  return (
    <div className={coachStyles.page}>
      <header className={coachStyles.topbar}>
        <div><span>RECRUITMENT LAB</span><h1>Scouting results</h1></div>
        <Link href="/coach/scouting" className={coachStyles.backLink} aria-label="Back to scouting">←</Link>
      </header>

      <form method="get" className={styles.filterBar}>
        <label>
          <span>League</span>
          <select name="league" defaultValue={league}>
            {COACH_LEAGUES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </label>
        <label>
          <span>Position</span>
          <select name="position" defaultValue={position}>
            <option value="">Any position</option>
            {POSITIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </label>
        <label>
          <span>Preferred foot</span>
          <select name="foot" defaultValue={foot}>
            <option value="">Any foot</option>
            {FEET.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </label>
        <label>
          <span>Age min</span>
          <input type="number" name="ageMin" min={14} max={45} defaultValue={sp.ageMin ?? ""} placeholder="e.g. 18" />
        </label>
        <label>
          <span>Age max</span>
          <input type="number" name="ageMax" min={14} max={45} defaultValue={sp.ageMax ?? ""} placeholder="e.g. 27" />
        </label>
        <label>
          <span>Min rating</span>
          <input type="number" name="minRating" step={0.1} min={0} max={10} defaultValue={sp.minRating ?? ""} placeholder="e.g. 7.0" />
        </label>
        <label>
          <span>Sort by</span>
          <select name="sort" defaultValue={sort}>
            <option value="rating">Rating (highest)</option>
            <option value="age">Age (youngest)</option>
          </select>
        </label>
        <button type="submit">SEARCH →</button>
      </form>

      {(statsError || bioError) && (
        <p className={styles.warning}>Something went wrong loading results — try again or adjust your filters.</p>
      )}

      {!statsError && !bioError && total === 0 && (
        <section className={coachStyles.activityPanel}>
          <div>
            <span className={coachStyles.kicker}>NO MATCHES</span>
            <h3>No players match these filters</h3>
            <p>Try widening the age range or clearing a filter.</p>
          </div>
        </section>
      )}

      {total > 0 && (
        <>
          <p className={styles.resultCount}>
            {total} player{total === 1 ? "" : "s"} match{total === 1 ? "es" : ""}
            {total > RESULT_LIMIT ? ` — showing the top ${RESULT_LIMIT}, refine filters to narrow further` : ""}
          </p>
          <div className={styles.grid}>
            {shown.map((player) => (
              <Link key={player.player_id} href={profileHref(player.player_name)} className={styles.card}>
                <div className={styles.avatar}>{player.player_name.slice(0, 1).toUpperCase()}</div>
                <h3>{player.player_name}</h3>
                <p className={styles.team}>{player.team_name}</p>
                <div className={styles.meta}>
                  <span>{player.player_position ? POSITIONS.find((p) => p.value === player.player_position)?.label : "—"}</span>
                  <span>{player.age ?? "—"} yrs</span>
                </div>
                <div className={styles.chips}>
                  <span><b>{player.rating?.toFixed(2) ?? "—"}</b>RATING</span>
                  <span><b>{player.matchesStarted ?? "—"}</b>STARTS</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
