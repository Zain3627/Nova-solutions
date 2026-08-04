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
}[] = [
  {
    value: "premier_league",
    label: "Premier League",
    icon: "/league-icons/england_english-premier-league.football-logos.cc.svg",
  },
  {
    value: "la_liga",
    label: "La Liga",
    icon: "/league-icons/spain_la-liga.football-logos.cc.svg",
  },
  {
    value: "bundesliga",
    label: "Bundesliga",
    icon: "/league-icons/germany_bundesliga.football-logos.cc.svg",
  },
  {
    value: "serie_a",
    label: "Serie A",
    icon: "/league-icons/italy_serie-a.football-logos.cc.svg",
  },
  {
    value: "ligue_1",
    label: "Ligue 1",
    icon: "/league-icons/france_ligue-1.football-logos.cc.svg",
  },
  {
    value: "egyptian_premier_league",
    label: "Egyptian Premier League",
    icon: "/league-icons/egypt_egyptian-premier-league.football-logos.cc.svg",
  },
];

export const LEAGUE_VALUES = LEAGUES.map((l) => l.value);
