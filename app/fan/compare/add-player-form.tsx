"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./compare.module.css";

const MAX_PLAYERS = 4;

type Suggestion = { name: string; team: string; rating: number | null };

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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const atLimit = currentNames.length >= MAX_PLAYERS;
  const alreadyAdded = new Set(currentNames.map((n) => n.toLowerCase()));

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const query = name.trim();
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ league, season, q: query });
        const res = await fetch(`/api/players/search?${params.toString()}`);
        const data = await res.json();
        setSuggestions((data.players ?? []).filter((p: Suggestion) => !alreadyAdded.has(p.name.toLowerCase())));
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
      }
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, league, season]);

  function addPlayer(playerName: string) {
    const trimmed = playerName.trim();
    if (!trimmed || atLimit) return;
    const already = currentNames.some((n) => n.toLowerCase() === trimmed.toLowerCase());
    const next = already ? currentNames : [...currentNames, trimmed];
    const params = new URLSearchParams({ league, season, players: next.join(",") });
    setName("");
    setSuggestions([]);
    setOpen(false);
    router.push(`/fan/compare?${params.toString()}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      addPlayer(suggestions[activeIndex].name);
    } else {
      addPlayer(name);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className={styles.addFormWrap}>
      <form className={styles.addForm} onSubmit={handleSubmit} autoComplete="off">
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={handleKeyDown}
          placeholder={atLimit ? `Remove a player to add another (max ${MAX_PLAYERS})` : "Search for a player…"}
          disabled={atLimit}
        />
        <button type="submit" disabled={atLimit}>ADD →</button>
      </form>

      {open && !atLimit && suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                className={i === activeIndex ? styles.suggestionActive : undefined}
                onMouseDown={(event) => {
                  event.preventDefault();
                  addPlayer(s.name);
                }}
              >
                <span>{s.name}</span>
                <small>{s.team}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
