-- Player bio/attribute data (position, date of birth, preferred foot) for
-- the scouting filters. Separate from the per-league/season stat tables
-- (create_player_tables.sql) because this data isn't season-specific --
-- one row per player's current team, sourced from data/teams_players.csv.
--
-- Column names are double-quoted for the same reason as the stat tables:
-- PostgREST matches column names case-sensitively.
--
-- Safe to re-run.

create table if not exists public.players_bio (
  "player_id" bigint primary key,
  "player_name" text,
  "team_id" bigint,
  "team_name" text,
  "player_position" text,
  "player_date_of_birth" timestamptz,
  "player_preferred_foot" text,
  "player_country_name" text
);

create index if not exists players_bio_player_name_idx on public.players_bio ("player_name");
create index if not exists players_bio_player_position_idx on public.players_bio ("player_position");

alter table public.players_bio enable row level security;

drop policy if exists "Authenticated users can read" on public.players_bio;
create policy "Authenticated users can read" on public.players_bio
  for select using (auth.role() = 'authenticated');
