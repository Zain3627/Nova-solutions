import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isLeagueValue, isSeasonValue, getPlayersTableName, type LeagueValue, type SeasonValue } from "@/lib/leagues";

// Backs the compare-page autocomplete and quick-add suggestions. With no `q`
// it returns the league/season's top-rated players (good defaults to suggest);
// with `q` it filters by a partial, case-insensitive name match.
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const league = params.get("league") ?? "";
  const season = params.get("season") ?? "";
  const q = (params.get("q") ?? "").trim();

  if (!isLeagueValue(league) || !isSeasonValue(season)) {
    return NextResponse.json({ players: [] }, { status: 400 });
  }

  const supabase = await createClient();
  const tableName = getPlayersTableName(league as LeagueValue, season as SeasonValue);

  let query = supabase
    .from(tableName)
    .select("player_name,team_name,rating")
    .order("rating", { ascending: false, nullsFirst: false })
    .limit(8);

  if (q) {
    query = query.ilike("player_name", `%${q}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Player search failed:", error.message);
    return NextResponse.json({ players: [] }, { status: 500 });
  }

  return NextResponse.json({
    players: (data ?? []).map((p) => ({
      name: p.player_name,
      team: p.team_name,
      rating: p.rating,
    })),
  });
}
