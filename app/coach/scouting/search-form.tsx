"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "../coach.module.css";

type Suggestion = { name: string; team: string; rating: number | null };

export function ScoutingSearchForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const query = name.trim();
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ league: "premier_league", season: "25_26", q: query });
        const res = await fetch(`/api/players/search?${params.toString()}`);
        const data = await res.json();
        setSuggestions(data.players ?? []);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
      }
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [name]);

  function openProfile(playerName: string) {
    const trimmed = playerName.trim();
    if (!trimmed) return;
    const params = new URLSearchParams({ name: trimmed, league: "premier_league", season: "25_26" });
    setOpen(false);
    router.push(`/coach/scouting/profile?${params.toString()}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      openProfile(suggestions[activeIndex].name);
    } else {
      openProfile(name);
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
    <>
      <div style={{ position: "relative" }}>
        <form className={styles.searchBox} onSubmit={handleSubmit} autoComplete="off">
          <span>⌕</span>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onKeyDown={handleKeyDown}
            placeholder='Search for a player, e.g. "Erling Haaland"'
          />
          <button type="submit">SEARCH PLAYERS →</button>
        </form>

        {open && suggestions.length > 0 && (
          <ul className={styles.scoutingSuggestions}>
            {suggestions.map((s, i) => (
              <li key={s.name}>
                <button
                  type="button"
                  className={i === activeIndex ? styles.scoutingSuggestionActive : undefined}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    openProfile(s.name);
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
      <small style={{ display: "block", marginTop: 10, fontSize: 10.5, color: "var(--ui-muted)" }}>
        Searches the Premier League 2025/26 season — for other leagues, use the filters below.
      </small>
    </>
  );
}
