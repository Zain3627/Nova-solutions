// One-off bulk loader: reads every data/<league>/<prefix>_<season>_players.csv
// and replaces the matching Supabase table's contents with it.
//
// Requires SUPABASE_SERVICE_ROLE_KEY in .env (Project Settings -> API ->
// "service_role" secret) because the tables only grant authenticated SELECT
// (see supabase/sql/create_player_tables.sql) -- inserting needs a key that
// bypasses RLS. Never expose that key to the browser.
//
// Usage: node scripts/import-player-stats.mjs

import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(join(process.cwd(), ".env"));
loadEnvFile(join(process.cwd(), ".env.local"));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.\n" +
      "Get the service_role secret from Project Settings -> API and add it as\n" +
      "SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_ prefix)."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// dir = folder under data/, prefix = table/file prefix from lib/leagues.ts
const LEAGUES = [
  { dir: "premier_league", prefix: "PL" },
  { dir: "la_liga", prefix: "liga" },
  { dir: "bundesliga", prefix: "bund" },
  { dir: "serie_a", prefix: "serie" },
  { dir: "ligue_1", prefix: "ligue1" },
  { dir: "egyptian_premier_league", prefix: "EPL" },
  { dir: "algerian_ligue_1", prefix: "algerian" },
  { dir: "botola_pro", prefix: "botola" },
  { dir: "saudi_pro_league", prefix: "saudi" },
  { dir: "turkish_super_lig", prefix: "turkish" },
  { dir: "uefa_champions_league", prefix: "uefa_champions" },
  { dir: "uefa_europa_league", prefix: "uefa_europa" },
  { dir: "uefa_conference_league", prefix: "uefa_conference" },
  { dir: "caf_champions_league", prefix: "caf_champions" },
  { dir: "caf_confederation_cup", prefix: "caf_conf" },
];

// Matches SEASON_VALUES in lib/leagues.ts.
const SEASONS = ["23_24", "24_25", "25_26"];

const TEXT_COLUMNS = new Set(["player_name", "player_slug", "team_name"]);
const INT_COLUMNS = new Set(["player_id", "team_id"]);
const BATCH_SIZE = 500;

function parseCsv(text) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || r[0] !== "");
}

function toRecords(header, dataRows) {
  return dataRows
    .filter((cells) => cells.length === header.length)
    .map((cells) => {
      const record = {};
      header.forEach((col, i) => {
        const raw = cells[i] ?? "";
        if (raw === "") {
          record[col] = null;
        } else if (TEXT_COLUMNS.has(col)) {
          record[col] = raw;
        } else if (INT_COLUMNS.has(col)) {
          record[col] = parseInt(raw, 10);
        } else {
          record[col] = Number(raw);
        }
      });
      return record;
    });
}

async function importOne(league, season) {
  const fileName = `${league.prefix}_${season}_players.csv`;
  const filePath = join(process.cwd(), "data", league.dir, fileName);
  const tableName = `${league.prefix}_${season}_players`;

  if (!existsSync(filePath)) {
    console.warn(`  skip ${tableName} (no ${fileName})`);
    return;
  }

  const [header, ...dataRows] = parseCsv(readFileSync(filePath, "utf8"));
  const records = toRecords(header, dataRows);

  const { error: deleteError } = await supabase
    .from(tableName)
    .delete()
    .not("player_id", "is", null);

  if (deleteError) {
    console.error(`  ${tableName}: could not clear existing rows -- ${deleteError.message}`);
    return;
  }

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from(tableName).insert(batch);
    if (error) {
      console.error(`  ${tableName}: insert failed at row ${i} -- ${error.message}`);
      return;
    }
  }

  console.log(`  ${tableName}: ${records.length} rows`);
}

for (const league of LEAGUES) {
  console.log(league.dir);
  for (const season of SEASONS) {
    await importOne(league, season);
  }
}

console.log("Done.");
