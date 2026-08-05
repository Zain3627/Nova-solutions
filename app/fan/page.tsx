import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import {
  LEAGUE_VALUES,
  SEASON_VALUES,
  isLeagueValue,
  isSeasonValue,
  getPlayersTableName,
} from "@/lib/leagues";
import { PLAYER_STATS_SELECT, type PlayerStatRow } from "@/lib/stats";
import { FanView } from "./fan-view";

export default async function FanPage({
  searchParams,
}: {
  searchParams: Promise<{ league?: string; season?: string }>;
}) {
  const user = await verifySession();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "fan") {
    redirect("/");
  }

  const sp = await searchParams;
  const rawLeague = sp.league ?? "";
  const rawSeason = sp.season ?? "";
  const league = isLeagueValue(rawLeague) ? rawLeague : LEAGUE_VALUES[0];
  const season = isSeasonValue(rawSeason)
    ? rawSeason
    : SEASON_VALUES[SEASON_VALUES.length - 1];

  const tableName = getPlayersTableName(league, season);
  const { data: players, error } = await supabase
    .from(tableName)
    .select(PLAYER_STATS_SELECT)
    .returns<PlayerStatRow[]>();

  if (error) {
    console.error(`Failed to load ${tableName}:`, error.message);
  }

  return (
    <FanView league={league} season={season} players={players ?? []} />
  );
}
