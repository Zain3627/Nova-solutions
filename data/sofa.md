# SofaScore API reference

Base URL for all endpoints: `https://api.sofascore.com/api/v1`

Undocumented/unofficial public API — no auth required, JSON responses. IDs
used in the examples below: `17` = Premier League tournament, `76986` =
2025/26 season, `839956` = Erling Haaland, `42` = Arsenal, `14025013` =
Liverpool 4-2 Bournemouth (matchweek 1, 2025/26).

## Competition-wide

### `GET /unique-tournament/{tournamentId}/seasons`
List of every season for a competition and its season ID (e.g. `76986` =
"25/26"). You need a season ID before calling most other endpoints.

### `GET /unique-tournament/{tournamentId}/season/{seasonId}/standings/total`
League table for that season: each team's position, played/won/drawn/lost,
goals for/against, points.

### `GET /unique-tournament/{tournamentId}/season/{seasonId}/rounds` (Bad)
States current GW

### `GET /unique-tournament/{id}/season/{id}/cuptrees` (Irrelevant)
Cup competitions path

### `GET /tournament/{subTournamentId}/season/{seasonId}/events` (Irrelevant)
Lists matches for a certain season with score.

### `GET /unique-tournament/{tournamentId}/season/{seasonId}/events/round/{roundNumber}`
Every match played in that matchweek: teams, score, date, and each match's

### `GET /unique-tournament/{tournamentId}/season/{seasonId}/statistics?limit=&order=&offset=&accumulation=total&fields=<csv>&filters=`
**What `sofascore.py` uses.** Paginated table, one row per player who played
that season, with whatever stat columns you list in `fields=`. Best option
for "same few stats, every player, whole league at once."

#### `fields=` — full list, brute-force verified
112 field names were harvested from `/player/{id}/unique-tournament/.../statistics/overall`
(the deepest per-player endpoint), then every single one was individually
tested against *this* leaderboard endpoint (`fields=rating,<name>`) to
confirm it's actually accepted here too. All 112 came back `HTTP 200` with
the field present in the response — none were rejected. `/statistics/info`'s
`statisticsGroups` covers 82 of these (grouped below); the other 35 aren't in
any official group but work identically.

**attack (25):** `goals`, `expectedGoals`, `bigChancesMissed`, `successfulDribbles`, `successfulDribblesPercentage`, `totalShots`, `shotsOnTarget`, `shotsOffTarget`, `blockedShots`, `goalConversionPercentage`, `penaltiesTaken`, `penaltyGoals`, `penaltyWon`, `shotFromSetPiece`, `freeKickGoal`, `goalsFromInsideTheBox`, `goalsFromOutsideTheBox`, `headedGoals`, `leftFootGoals`, `rightFootGoals`, `hitWoodwork`, `offsides`, `penaltyConversion`, `setPieceConversion`, `rating`

**defence (11):** `tackles`, `interceptions`, `penaltyConceded`, `clearances`, `errorLeadToGoal`, `errorLeadToShot`, `ownGoals`, `dribbledPast`, `cleanSheet`, `outfielderBlocks`, `rating`

**passing (16):** `bigChancesCreated`, `assists`, `accuratePasses`, `inaccuratePasses`, `totalPasses`, `accuratePassesPercentage`, `accurateOwnHalfPasses`, `accurateOppositionHalfPasses`, `accurateFinalThirdPasses`, `keyPasses`, `accurateCrosses`, `accurateCrossesPercentage`, `accurateLongBalls`, `accurateLongBallsPercentage`, `passToAssist`, `rating`

**goalkeeper (14):** `saves`, `cleanSheet`, `penaltyFaced`, `penaltySave`, `savedShotsFromInsideTheBox`, `savedShotsFromOutsideTheBox`, `goalsConcededInsideTheBox`, `goalsConcededOutsideTheBox`, `punches`, `runsOut`, `successfulRunsOut`, `highClaims`, `crossesNotClaimed`, `rating`

**other (16):** `yellowCards`, `redCards`, `groundDuelsWon`, `groundDuelsWonPercentage`, `aerialDuelsWon`, `aerialDuelsWonPercentage`, `totalDuelsWon`, `totalDuelsWonPercentage`, `minutesPlayed`, `wasFouled`, `fouls`, `dispossessed`, `possessionLost`, `appearances`, `matchesStarted`, `rating`

**ungrouped, confirmed working (35):** `accurateChippedPasses`, `aerialLost`, `attemptPenaltyMiss`, `attemptPenaltyPost`, `attemptPenaltyTarget`, `ballRecovery`, `countRating`, `directRedCards`, `duelLost`, `expectedAssists`, `goalKicks`, `goalsAssistsSum`, `goalsConceded`, `kilometersCovered`, `numberOfSprints`, `possessionWonAttThird`, `savesCaught`, `savesParried`, `scoringFrequency`, `shotsFromInsideTheBox`, `shotsFromOutsideTheBox`, `tacklesWon`, `tacklesWonPercentage`, `topSpeed`, `totalAttemptAssist`, `totalChippedPasses`, `totalContest`, `totalCross`, `totalLongBalls`, `totalOppositionHalfPasses`, `totalOwnHalfPasses`, `totalRating`, `totwAppearances`, `touches`, `yellowRedCards`

#### `filters=` — confirmed available dimensions
Format: `filters=key1.in.val1~val2,key2.in.val1` (comma-separates multiple
filters, `~` separates multiple values for one key). There is no metadata
endpoint that documents valid filter keys/values — all four below were found
by brute-force trial: unknown keys return HTTP 422, these four return 200 and
demonstrably narrow the result set. `team` and `nationality` values happen to
be listed in `/statistics/info` (below); `position` and `age` are not
documented anywhere and were confirmed by testing only.

| Filter key | Values | Verified example |
|---|---|---|
| `position` | `G`, `D`, `M`, `F` | `filters=position.in.G` → only goalkeepers |
| `team` | team ID(s), see `/unique-tournament/{id}/season/{id}/statistics/info` for the full 20-team list with IDs | `filters=team.in.42~17` → only Arsenal (42) + Man City (17) players |
| `nationality` | 2-letter country code, see `nationalities` map below | `filters=nationality.in.BR` → only Brazilian players |
| `age` | numeric range `min~max` | `filters=age.in.16~19` → only players aged 16-19 |



## Team-level

### `GET /team/{teamId}/players`
Full squad (~32 people incl. loanees/reserves): name, position, nationality, cost
bio — this is how you get player IDs to feed into the player-level endpoints.

## Player-level

### `GET /player/{playerId}` (Bad)
Bio card: full name, current team, position.

### `GET /player/{playerId}/unique-tournament/{tournamentId}/season/{seasonId}/statistics/overall`
The same stats I have from the grouped stats for all players per competition but for single player. No additional info.

### `GET /player/{playerId}/attribute-overviews` (Bad)
Fifa card stats

### `GET /player/{playerId}/statistics` (meh)
Contain some of stats for players per competition and year. It contains some missing columns

### `GET /player/{playerId}/national-team-statistics` (Bad)
Appearances, goals, debut timestamp

### `GET /player/{playerId}/last-year-summary`
Rolling "last 12 months"  all matches with competition name and rating in the match

### `GET /search/all?q=<name>`
Name → ID lookup for players/teams/tournaments. Use this when you don't
already know an ID.

## Match-level (per single game)

### `GET /event/{eventId}`
Full match card: teams, score, venue, referee, date.

### `GET /event/{eventId}/statistics`
Team-vs-team stats for that one game: possession %, shots, passes, fouls, etc.

### `GET /event/{eventId}/lineups` (Irrelevant)
Starting XI + subs for both teams, and each player's individual stats for
just that match (passes, tackles, assists, etc., nested per player).

### `GET /event/{eventId}/incidents` (Irrelevant)
Timeline of match events: goals, cards, substitutions, VAR checks, with
minute markers.

### `GET /event/{eventId}/player/{playerId}/heatmap` 
X/Y position coordinates showing where one player touched the ball during
that one match — raw data for plotting a heatmap.

