"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "../coach.module.css";

export function ScoutingSearchForm() {
  const router = useRouter();
  const [name, setName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const params = new URLSearchParams({
      name: trimmed,
      league: "premier_league",
      season: "25_26",
    });
    router.push(`/coach/scouting/profile?${params.toString()}`);
  }

  return (
    <>
      <form className={styles.searchBox} onSubmit={handleSubmit}>
        <span>⌕</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder='Try an exact player name, e.g. "Erling Haaland"'
        />
        <button type="submit">SEARCH PLAYERS →</button>
      </form>
      <small style={{ display: "block", marginTop: 10, fontSize: 10.5, color: "var(--ui-muted)" }}>
        Currently matches an exact name in the Premier League 2025/26 season — full filters and fuzzy
        search are on the roadmap.
      </small>
    </>
  );
}
