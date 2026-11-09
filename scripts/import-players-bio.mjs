// One-off bulk loader: reads data/teams_players.csv and replaces the
// contents of the players_bio table (see supabase/sql/create_players_bio.sql,
// which must be run first) with it. Backs the scouting page's position/age/
// foot filters.
//
// Requires SUPABASE_SERVICE_ROLE_KEY in .env, same as import-player-stats.mjs.
//
// Usage: node scripts/import-players-bio.mjs

import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { setDefaultResultOrder } from "node:dns";

setDefaultResultOrder("ipv4first");

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

const TABLE_NAME = "players_bio";
const SOURCE_COLUMNS = [
  "player_id",
  "player_name",
  "team_id",
  "team_name",
  "player_position",
  "player_date_of_birth",
  "player_preferred_foot",
  "player_country_name",
];
const INT_COLUMNS = new Set(["player_id", "team_id"]);
const BATCH_SIZE = 500;
const MAX_ATTEMPTS = 4;

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
  const indexByColumn = Object.fromEntries(SOURCE_COLUMNS.map((c) => [c, header.indexOf(c)]));
  const seen = new Set();
  const records = [];

  for (const cells of dataRows) {
    if (cells.length !== header.length) continue;
    const playerId = cells[indexByColumn.player_id];
    if (!playerId || seen.has(playerId)) continue; // keep first (current) team per player
    seen.add(playerId);

    const record = {};
    for (const col of SOURCE_COLUMNS) {
      const raw = cells[indexByColumn[col]] ?? "";
      record[col] = raw === "" ? null : INT_COLUMNS.has(col) ? parseInt(raw, 10) : raw;
    }
    records.push(record);
  }
  return records;
}

async function withRetry(run) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const { error } = await run();
      if (!error) return null;
      lastError = error;
    } catch (err) {
      lastError = err;
    }
    if (attempt < MAX_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  return lastError;
}

async function main() {
  const filePath = join(process.cwd(), "data", "teams_players.csv");
  if (!existsSync(filePath)) {
    console.error(`Missing ${filePath}`);
    process.exit(1);
  }

  const [header, ...dataRows] = parseCsv(readFileSync(filePath, "utf8"));
  const records = toRecords(header, dataRows);
  console.log(`Parsed ${records.length} unique players from teams_players.csv`);

  const deleteError = await withRetry(() =>
    supabase.from(TABLE_NAME).delete().not("player_id", "is", null)
  );
  if (deleteError) {
    console.error(`Could not clear ${TABLE_NAME}: ${deleteError.message}`);
    process.exit(1);
  }

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const error = await withRetry(() => supabase.from(TABLE_NAME).insert(batch));
    if (error) {
      console.error(`Insert failed at row ${i}: ${error.message}`);
      process.exit(1);
    }
    console.log(`  inserted ${Math.min(i + BATCH_SIZE, records.length)}/${records.length}`);
  }

  console.log(`Done -- ${TABLE_NAME} loaded with ${records.length} rows.`);
}

main();
