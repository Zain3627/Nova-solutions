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

export const STAT_COLUMNS: { key: StatKey; label: string }[] = [
  { key: "rating", label: "Rating" },
  { key: "goals", label: "Goals" },
  { key: "bigChancesCreated", label: "Big Chances Created" },
  { key: "bigChancesMissed", label: "Big Chances Missed" },
  { key: "assists", label: "Assists" },
  { key: "expectedAssists", label: "Expected Assists" },
  { key: "accuratePasses", label: "Accurate Passes" },
  { key: "goalsAssistsSum", label: "Goal Contributions" },
  { key: "keyPasses", label: "Key Passes" },
  { key: "successfulDribbles", label: "Successful Dribbles" },
  { key: "tackles", label: "Tackles" },
  { key: "interceptions", label: "Interceptions" },
  { key: "yellowCards", label: "Yellow Cards" },
  { key: "redCards", label: "Red Cards" },
  { key: "accurateCrosses", label: "Accurate Crosses" },
  { key: "totalShots", label: "Total Shots" },
  { key: "shotsOnTarget", label: "Shots On Target" },
  { key: "groundDuelsWon", label: "Ground Duels Won" },
  { key: "aerialDuelsWon", label: "Aerial Duels Won" },
  { key: "penaltyGoals", label: "Penalties Scored" },
  { key: "goalsFromInsideTheBox", label: "Goals From Inside The Box" },
  { key: "goalsFromOutsideTheBox", label: "Goals From Outside The Box" },
  { key: "shotsFromInsideTheBox", label: "Shots From Inside The Box" },
  { key: "shotsFromOutsideTheBox", label: "Shots From Outside The Box" },
  { key: "headedGoals", label: "Headed Goals" },
  { key: "leftFootGoals", label: "Left Foot Goals" },
  { key: "rightFootGoals", label: "Right Foot Goals" },
  { key: "accurateLongBalls", label: "Accurate Long Balls" },
  { key: "clearances", label: "Clearances" },
  { key: "errorLeadToGoal", label: "Error Lead To Goal" },
  { key: "dispossessed", label: "Dispossessed" },
  { key: "possessionLost", label: "Possession Lost" },
  { key: "touches", label: "Touches" },
  { key: "fouls", label: "Fouls" },
  { key: "wasFouled", label: "Was Fouled" },
  { key: "ownGoals", label: "Own Goals" },
  { key: "dribbledPast", label: "Dribbled Past" },
  { key: "saves", label: "Saves" },
  { key: "kilometersCovered", label: "Kilometers Covered" },
  { key: "numberOfSprints", label: "Number Of Sprints" },
  { key: "topSpeed", label: "Top Speed" },
  { key: "cleanSheet", label: "Clean Sheets" },
  { key: "penaltySave", label: "Penalty Save" },
  { key: "savedShotsFromInsideTheBox", label: "Saved Shots From Inside The Box" },
  { key: "savedShotsFromOutsideTheBox", label: "Saved Shots From Outside The Box" },
  { key: "goalsConcededInsideTheBox", label: "Goals Conceded Inside The Box" },
  { key: "goalsConcededOutsideTheBox", label: "Goals Conceded Outside The Box" },
  { key: "matchesStarted", label: "Matches Started" },
  { key: "attemptPenaltyMiss", label: "Attempt Penalty Miss" },
  { key: "tacklesWon", label: "Tackles Won" },
  { key: "expectedGoals", label: "Expected Goals" },
  { key: "ballRecovery", label: "Ball Recovery" },
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
