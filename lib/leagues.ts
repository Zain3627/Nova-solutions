export type LeagueValue =
  | "premier_league"
  | "la_liga"
  | "bundesliga"
  | "serie_a"
  | "ligue_1"
  | "egyptian_premier_league";

export const LEAGUES: {
  value: LeagueValue;
  label: string;
  icon: string;
  tablePrefix: string;
}[] = [
  {
    value: "premier_league",
    label: "Premier League",
    icon: "/league-icons/england_english-premier-league.football-logos.cc.svg",
    tablePrefix: "PL",
  },
  {
    value: "la_liga",
    label: "La Liga",
    icon: "/league-icons/spain_la-liga.football-logos.cc.svg",
    tablePrefix: "liga",
  },
  {
    value: "bundesliga",
    label: "Bundesliga",
    icon: "/league-icons/germany_bundesliga.football-logos.cc.svg",
    tablePrefix: "bund",
  },
  {
    value: "serie_a",
    label: "Serie A",
    icon: "/league-icons/italy_serie-a.football-logos.cc.svg",
    tablePrefix: "serie",
  },
  {
    value: "ligue_1",
    label: "Ligue 1",
    icon: "/league-icons/france_ligue-1.football-logos.cc.svg",
    tablePrefix: "ligue1",
  },
  {
    value: "egyptian_premier_league",
    label: "Egyptian Premier League",
    icon: "/league-icons/egypt_egyptian-premier-league.football-logos.cc.svg",
    tablePrefix: "EPL",
  },
];

export const LEAGUE_VALUES = LEAGUES.map((l) => l.value);

export type SeasonValue = "23_24" | "24_25" | "25_26";

export const SEASONS: { value: SeasonValue; label: string }[] = [
  { value: "23_24", label: "2023/24" },
  { value: "24_25", label: "2024/25" },
  { value: "25_26", label: "2025/26" },
];

export const SEASON_VALUES = SEASONS.map((s) => s.value);

export function isLeagueValue(value: string): value is LeagueValue {
  return (LEAGUE_VALUES as string[]).includes(value);
}

export function isSeasonValue(value: string): value is SeasonValue {
  return (SEASON_VALUES as string[]).includes(value);
}

export function getPlayersTableName(
  league: LeagueValue,
  season: SeasonValue
): string {
  const prefix = LEAGUES.find((l) => l.value === league)!.tablePrefix;
  return `${prefix}_${season}_players`;
}
