import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import {
  LEAGUES,
  SEASONS,
  LEAGUE_VALUES,
  SEASON_VALUES,
  isLeagueValue,
  isSeasonValue,
  getPlayersTableName,
  type LeagueValue,
  type SeasonValue,
} from "@/lib/leagues";
import { PLAYER_STATS_SELECT, type PlayerStatRow } from "@/lib/stats";
import { ClubView } from "./club-view";
import shared from "../../fan-shared.module.css";

export default async function ClubPage({
  params,
  searchParams,
}: {
  params: Promise<{ clubId: string }>;
  searchParams: Promise<{ league?: string; season?: string }>;
}) {
  const user = await verifySession();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "fan") redirect("/");

  const { clubId } = await params;
  const sp = await searchParams;
  const league: LeagueValue = isLeagueValue(sp.league ?? "") ? (sp.league as LeagueValue) : LEAGUE_VALUES[0];
  const season: SeasonValue = isSeasonValue(sp.season ?? "")
    ? (sp.season as SeasonValue)
    : SEASON_VALUES[SEASON_VALUES.length - 1];

  const tableName = getPlayersTableName(league, season);
  const { data: squad, error } = await supabase
    .from(tableName)
    .select(PLAYER_STATS_SELECT)
    .eq("team_id", Number(clubId))
    .returns<PlayerStatRow[]>();

  if (error) {
    console.error(`Failed to load club ${clubId} from ${tableName}:`, error.message);
  }

  const leagueLabel = LEAGUES.find((l) => l.value === league)?.label ?? league;
  const seasonLabel = SEASONS.find((s) => s.value === season)?.label ?? season;

  return (
    <div className={shared.shell}>
      <header className={shared.topbar}>
        <Link href="/fan" className={shared.brand}>
          <span className={shared.brandMark}>N</span>
          <span>NOVA SOLUTION</span>
        </Link>
        <Link
          href={`/fan/leaderboard?league=${league}&season=${season}`}
          className={shared.backLink}
          aria-label="Back to leaderboard"
        >
          ←
        </Link>
      </header>
      <main className={shared.main}>
        <ClubView
          clubId={clubId}
          squad={squad ?? []}
          league={league}
          season={season}
          leagueLabel={leagueLabel}
          seasonLabel={seasonLabel}
        />
      </main>
    </div>
  );
}
