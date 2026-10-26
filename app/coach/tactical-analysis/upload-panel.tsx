"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { addProject } from "@/lib/tactical-projects";
import coachStyles from "../coach.module.css";
import styles from "./tactical.module.css";

export function UploadPanel() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [opponent, setOpponent] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    addProject({
      homeTeam: "Your club",
      awayTeam: opponent.trim() || "Opponent",
      fileName: file.name,
    });
    router.push("/coach/tactical-analysis/projects");
  }

  return (
    <section className={coachStyles.uploadPanel}>
      <div className={coachStyles.uploadIcon}>↑</div>
      <span className={coachStyles.kicker}>NEW MATCH PROJECT</span>
      <h3>Upload match footage</h3>
      <p>Drop an MP4, MOV or match link here to begin automated processing.</p>
      <input
        className={styles.opponentInput}
        value={opponent}
        onChange={(event) => setOpponent(event.target.value)}
        placeholder="Opponent (optional)"
        aria-label="Opponent team name"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        className={styles.hiddenFileInput}
        onChange={handleFileChange}
      />
      <button type="button" onClick={() => fileInputRef.current?.click()}>
        SELECT VIDEO FILE
      </button>
      <small>MAXIMUM FILE SIZE 8 GB · 1080P RECOMMENDED</small>
    </section>
  );
}
