"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./compare.module.css";

const MAX_PLAYERS = 4;

export function AddPlayerForm({
  league,
  season,
  currentNames,
}: {
  league: string;
  season: string;
  currentNames: string[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const atLimit = currentNames.length >= MAX_PLAYERS;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || atLimit) return;
    const already = currentNames.some((n) => n.toLowerCase() === trimmed.toLowerCase());
    const next = already ? currentNames : [...currentNames, trimmed];
    const params = new URLSearchParams({ league, season, players: next.join(",") });
    setName("");
    router.push(`/fan/compare?${params.toString()}`);
  }

  return (
    <form className={styles.addForm} onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={atLimit ? `Remove a player to add another (max ${MAX_PLAYERS})` : "Add a player by exact name"}
        disabled={atLimit}
      />
      <button type="submit" disabled={atLimit}>ADD →</button>
    </form>
  );
}
