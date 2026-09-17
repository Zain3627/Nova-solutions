import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { LeagueValue } from "@/lib/leagues";

export type Club = {
  id: string;
  name: string;
  logo: string;
};

const CLUB_DATA_FILES: Partial<Record<LeagueValue, string>> = {
  premier_league: "premier_league/PL_25_26_players.csv",
  la_liga: "la_liga/liga_25_26_players.csv",
  bundesliga: "bundesliga/bund_25_26_players.csv",
  serie_a: "serie_a/serie_25_26_players.csv",
  ligue_1: "ligue_1/ligue1_25_26_players.csv",
  turkish_super_lig: "turkish_super_lig/turkish_25_26_players.csv",
  saudi_pro_league: "saudi_pro_league/saudi_25_26_players.csv",
  egyptian_premier_league:
    "egyptian_premier_league/EPL_25_26_players.csv",
  botola_pro: "botola_pro/botola_25_26_players.csv",
  algerian_ligue_1: "algerian_ligue_1/algerian_25_26_players.csv",
};

const clubCache = new Map<LeagueValue, Club[]>();

function parseCsvLine(line: string) {
  const fields: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      fields.push(current);
      current = "";
      if (fields.length === 5) break;
    } else {
      current += char;
    }
  }

  if (fields.length < 5) fields.push(current);
  return fields;
}

export function getClubsForLeague(league: LeagueValue): Club[] {
  const cached = clubCache.get(league);
  if (cached) return cached;

  const relativePath = CLUB_DATA_FILES[league];
  if (!relativePath) return [];

  const csv = readFileSync(join(process.cwd(), "data", relativePath), "utf8");
  const uniqueClubs = new Map<string, Club>();

  for (const line of csv.split(/\r?\n/).slice(1)) {
    if (!line) continue;
    const [, , , id, name] = parseCsvLine(line);
    if (id && name && !uniqueClubs.has(id)) {
      uniqueClubs.set(id, {
        id,
        name,
        logo: `/club-icons/${id}.png`,
      });
    }
  }

  const clubs = [...uniqueClubs.values()].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  clubCache.set(league, clubs);
  return clubs;
}
