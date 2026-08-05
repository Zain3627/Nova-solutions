export type StatKey =
  | "rating"
  | "goals"
  | "bigChancesCreated"
  | "bigChancesMissed"
  | "assists"
  | "expectedAssists"
  | "accuratePasses"
  | "goalsAssistsSum"
  | "keyPasses"
  | "successfulDribbles"
  | "tackles"
  | "interceptions"
  | "yellowCards"
  | "redCards"
  | "accurateCrosses"
  | "totalShots"
  | "shotsOnTarget"
  | "groundDuelsWon"
  | "aerialDuelsWon"
  | "penaltyGoals"
  | "goalsFromInsideTheBox"
  | "goalsFromOutsideTheBox"
  | "shotsFromInsideTheBox"
  | "shotsFromOutsideTheBox"
  | "headedGoals"
  | "leftFootGoals"
  | "rightFootGoals"
  | "accurateLongBalls"
  | "clearances"
  | "errorLeadToGoal"
  | "dispossessed"
  | "possessionLost"
  | "touches"
  | "fouls"
  | "wasFouled"
  | "ownGoals"
  | "dribbledPast"
  | "saves"
  | "kilometersCovered"
  | "numberOfSprints"
  | "topSpeed"
  | "cleanSheet"
  | "penaltySave"
  | "savedShotsFromInsideTheBox"
  | "savedShotsFromOutsideTheBox"
  | "goalsConcededInsideTheBox"
  | "goalsConcededOutsideTheBox"
  | "matchesStarted"
  | "attemptPenaltyMiss"
  | "tacklesWon"
  | "expectedGoals"
  | "ballRecovery";

export type StatCategoryId =
  | "overview"
  | "attacking"
  | "passing"
  | "dribbling_duels"
  | "defending"
  | "discipline"
  | "goalkeeping"
  | "physical";

export const STAT_CATEGORIES: { id: StatCategoryId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "attacking", label: "Attacking" },
  { id: "passing", label: "Passing & Creativity" },
  { id: "dribbling_duels", label: "Dribbling & Duels" },
  { id: "defending", label: "Defending" },
  { id: "discipline", label: "Discipline" },
  { id: "goalkeeping", label: "Goalkeeping" },
  { id: "physical", label: "Physical" },
];

export const STAT_COLUMNS: { key: StatKey; label: string; category: StatCategoryId }[] = [
  { key: "rating", label: "Rating", category: "overview" },
  { key: "matchesStarted", label: "Matches Started", category: "overview" },

  { key: "goals", label: "Goals", category: "attacking" },
  { key: "expectedGoals", label: "Expected Goals", category: "attacking" },
  { key: "bigChancesCreated", label: "Big Chances Created", category: "attacking" },
  { key: "bigChancesMissed", label: "Big Chances Missed", category: "attacking" },
  { key: "assists", label: "Assists", category: "attacking" },
  { key: "expectedAssists", label: "Expected Assists", category: "attacking" },
  { key: "goalsAssistsSum", label: "Goal Contributions", category: "attacking" },
  { key: "penaltyGoals", label: "Penalties Scored", category: "attacking" },
  { key: "attemptPenaltyMiss", label: "Attempt Penalty Miss", category: "attacking" },
  { key: "goalsFromInsideTheBox", label: "Goals From Inside The Box", category: "attacking" },
  { key: "goalsFromOutsideTheBox", label: "Goals From Outside The Box", category: "attacking" },
  { key: "headedGoals", label: "Headed Goals", category: "attacking" },
  { key: "leftFootGoals", label: "Left Foot Goals", category: "attacking" },
  { key: "rightFootGoals", label: "Right Foot Goals", category: "attacking" },
  { key: "totalShots", label: "Total Shots", category: "attacking" },
  { key: "shotsOnTarget", label: "Shots On Target", category: "attacking" },
  { key: "shotsFromInsideTheBox", label: "Shots From Inside The Box", category: "attacking" },
  { key: "shotsFromOutsideTheBox", label: "Shots From Outside The Box", category: "attacking" },
  { key: "ownGoals", label: "Own Goals", category: "attacking" },

  { key: "accuratePasses", label: "Accurate Passes", category: "passing" },
  { key: "keyPasses", label: "Key Passes", category: "passing" },
  { key: "accurateCrosses", label: "Accurate Crosses", category: "passing" },
  { key: "accurateLongBalls", label: "Accurate Long Balls", category: "passing" },
  { key: "touches", label: "Touches", category: "passing" },

  { key: "successfulDribbles", label: "Successful Dribbles", category: "dribbling_duels" },
  { key: "groundDuelsWon", label: "Ground Duels Won", category: "dribbling_duels" },
  { key: "aerialDuelsWon", label: "Aerial Duels Won", category: "dribbling_duels" },
  { key: "dispossessed", label: "Dispossessed", category: "dribbling_duels" },
  { key: "possessionLost", label: "Possession Lost", category: "dribbling_duels" },
  { key: "dribbledPast", label: "Dribbled Past", category: "dribbling_duels" },
  { key: "wasFouled", label: "Was Fouled", category: "dribbling_duels" },
  { key: "fouls", label: "Fouls", category: "dribbling_duels" },

  { key: "tackles", label: "Tackles", category: "defending" },
  { key: "tacklesWon", label: "Tackles Won", category: "defending" },
  { key: "interceptions", label: "Interceptions", category: "defending" },
  { key: "clearances", label: "Clearances", category: "defending" },
  { key: "errorLeadToGoal", label: "Error Lead To Goal", category: "defending" },
  { key: "ballRecovery", label: "Ball Recovery", category: "defending" },

  { key: "yellowCards", label: "Yellow Cards", category: "discipline" },
  { key: "redCards", label: "Red Cards", category: "discipline" },

  { key: "saves", label: "Saves", category: "goalkeeping" },
  { key: "cleanSheet", label: "Clean Sheets", category: "goalkeeping" },
  { key: "penaltySave", label: "Penalty Save", category: "goalkeeping" },
  { key: "savedShotsFromInsideTheBox", label: "Saved Shots From Inside The Box", category: "goalkeeping" },
  { key: "savedShotsFromOutsideTheBox", label: "Saved Shots From Outside The Box", category: "goalkeeping" },
  { key: "goalsConcededInsideTheBox", label: "Goals Conceded Inside The Box", category: "goalkeeping" },
  { key: "goalsConcededOutsideTheBox", label: "Goals Conceded Outside The Box", category: "goalkeeping" },

  { key: "kilometersCovered", label: "Kilometers Covered", category: "physical" },
  { key: "numberOfSprints", label: "Number Of Sprints", category: "physical" },
  { key: "topSpeed", label: "Top Speed", category: "physical" },
];

export type PlayerStatRow = {
  player_name: string;
  team_name: string;
} & Record<StatKey, number | null>;

export const PLAYER_STATS_SELECT = [
  "player_name",
  "team_name",
  ...STAT_COLUMNS.map((c) => c.key),
].join(",");
