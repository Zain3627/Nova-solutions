-- One identical schema, shared by every league's season table, matching
-- the column headers in data/<league>/*.csv (see lib/stats.ts + lib/leagues.ts
-- for how the app builds and queries these table names).
--
-- Column names are double-quoted to preserve exact camelCase: PostgREST (the
-- API layer Supabase/supabase-js talk to) matches column names case-sensitively,
-- so unquoted columns would fold to lowercase and break every query in
-- lib/stats.ts (e.g. "bigChancesCreated" would become "bigchancescreated").
--
-- Safe to re-run: table creation, indexes, and policies are all idempotent.

do $$
declare
  league_prefix text;
  season text;
  table_name text;
begin
  foreach league_prefix in array array['PL', 'liga', 'bund', 'serie', 'ligue1', 'EPL', 'algerian', 'botola', 'saudi', 'turkish', 'uefa_champions', 'uefa_europa', 'uefa_conference', 'caf_champions', 'caf_conf']
  loop
    foreach season in array array['23_24', '24_25', '25_26']
    loop
      table_name := league_prefix || '_' || season || '_players';

      execute format(
        'create table if not exists public.%I (
    "player_id" bigint,
    "player_name" text,
    "player_slug" text,
    "team_id" bigint,
    "team_name" text,
    "rating" numeric,
    "totalRating" numeric,
    "countRating" numeric,
    "goals" numeric,
    "bigChancesCreated" numeric,
    "bigChancesMissed" numeric,
    "assists" numeric,
    "expectedAssists" numeric,
    "goalsAssistsSum" numeric,
    "accuratePasses" numeric,
    "inaccuratePasses" numeric,
    "totalPasses" numeric,
    "accuratePassesPercentage" numeric,
    "accurateOwnHalfPasses" numeric,
    "accurateOppositionHalfPasses" numeric,
    "accurateFinalThirdPasses" numeric,
    "keyPasses" numeric,
    "successfulDribbles" numeric,
    "successfulDribblesPercentage" numeric,
    "tackles" numeric,
    "interceptions" numeric,
    "yellowCards" numeric,
    "directRedCards" numeric,
    "redCards" numeric,
    "accurateCrosses" numeric,
    "accurateCrossesPercentage" numeric,
    "totalShots" numeric,
    "shotsOnTarget" numeric,
    "shotsOffTarget" numeric,
    "groundDuelsWon" numeric,
    "groundDuelsWonPercentage" numeric,
    "aerialDuelsWon" numeric,
    "aerialDuelsWonPercentage" numeric,
    "totalDuelsWon" numeric,
    "totalDuelsWonPercentage" numeric,
    "minutesPlayed" numeric,
    "goalConversionPercentage" numeric,
    "penaltiesTaken" numeric,
    "penaltyGoals" numeric,
    "penaltyWon" numeric,
    "penaltyConceded" numeric,
    "shotFromSetPiece" numeric,
    "freeKickGoal" numeric,
    "goalsFromInsideTheBox" numeric,
    "goalsFromOutsideTheBox" numeric,
    "shotsFromInsideTheBox" numeric,
    "shotsFromOutsideTheBox" numeric,
    "headedGoals" numeric,
    "leftFootGoals" numeric,
    "rightFootGoals" numeric,
    "accurateLongBalls" numeric,
    "accurateLongBallsPercentage" numeric,
    "clearances" numeric,
    "errorLeadToGoal" numeric,
    "errorLeadToShot" numeric,
    "dispossessed" numeric,
    "possessionLost" numeric,
    "possessionWonAttThird" numeric,
    "totalChippedPasses" numeric,
    "accurateChippedPasses" numeric,
    "touches" numeric,
    "wasFouled" numeric,
    "fouls" numeric,
    "hitWoodwork" numeric,
    "ownGoals" numeric,
    "dribbledPast" numeric,
    "offsides" numeric,
    "blockedShots" numeric,
    "passToAssist" numeric,
    "saves" numeric,
    "kilometersCovered" numeric,
    "numberOfSprints" numeric,
    "topSpeed" numeric,
    "cleanSheet" numeric,
    "penaltyFaced" numeric,
    "penaltySave" numeric,
    "savedShotsFromInsideTheBox" numeric,
    "savedShotsFromOutsideTheBox" numeric,
    "goalsConcededInsideTheBox" numeric,
    "goalsConcededOutsideTheBox" numeric,
    "punches" numeric,
    "runsOut" numeric,
    "successfulRunsOut" numeric,
    "highClaims" numeric,
    "crossesNotClaimed" numeric,
    "matchesStarted" numeric,
    "penaltyConversion" numeric,
    "setPieceConversion" numeric,
    "totalAttemptAssist" numeric,
    "totalContest" numeric,
    "totalCross" numeric,
    "duelLost" numeric,
    "aerialLost" numeric,
    "attemptPenaltyMiss" numeric,
    "attemptPenaltyPost" numeric,
    "attemptPenaltyTarget" numeric,
    "totalLongBalls" numeric,
    "goalsConceded" numeric,
    "tacklesWon" numeric,
    "tacklesWonPercentage" numeric,
    "scoringFrequency" numeric,
    "yellowRedCards" numeric,
    "savesCaught" numeric,
    "savesParried" numeric,
    "totalOwnHalfPasses" numeric,
    "totalOppositionHalfPasses" numeric,
    "totwAppearances" numeric,
    "expectedGoals" numeric,
    "goalKicks" numeric,
    "ballRecovery" numeric,
    "outfielderBlocks" numeric,
    "appearances" numeric
        )',
        table_name
      );

      execute format(
        'create index if not exists %I on public.%I ("player_name")',
        table_name || '_player_name_idx',
        table_name
      );

      execute format('alter table public.%I enable row level security', table_name);

      execute format(
        'drop policy if exists "Authenticated users can read" on public.%I',
        table_name
      );
      execute format(
        'create policy "Authenticated users can read" on public.%I
          for select using (auth.role() = ''authenticated'')',
        table_name
      );
    end loop;
  end loop;
end $$;

