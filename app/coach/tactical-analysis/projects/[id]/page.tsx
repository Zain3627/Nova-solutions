"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProject, type TacticalProject } from "@/lib/tactical-projects";
import coachStyles from "../../../coach.module.css";
import styles from "../../tactical.module.css";

const TABS = ["Formation", "Heatmap", "Events", "Full report"] as const;
type Tab = (typeof TABS)[number];

// Mocked pending the real video-analysis pipeline a teammate is building.
const FORMATION_DOTS = [
  { x: 20, y: 50, team: "home" as const },
  { x: 35, y: 25, team: "home" as const },
  { x: 35, y: 75, team: "home" as const },
  { x: 50, y: 40, team: "home" as const },
  { x: 50, y: 60, team: "home" as const },
  { x: 65, y: 30, team: "away" as const },
  { x: 65, y: 70, team: "away" as const },
  { x: 80, y: 20, team: "away" as const },
  { x: 80, y: 50, team: "away" as const },
  { x: 80, y: 80, team: "away" as const },
];

function summaryFor(project: TacticalProject) {
  return [
    `${project.homeTeam} lined up in a 4-3-3, shifting into a back three in possession to overload the left half-space.`,
    `${project.awayTeam} sat in a mid-block and conceded the most space down their right channel — the source of 3 of the match's clearest chances.`,
    "Pressing triggers were strongest after sideways passes inside the opposition half, winning the ball back within 6 seconds on 4 occasions.",
    "Transition moments after regaining possession in the middle third were the highest-value attacking phase of the match.",
  ];
}

function eventsFor(project: TacticalProject) {
  return [
    { minute: "12'", team: project.homeTeam, label: "Shot on target — saved" },
    { minute: "34'", team: project.awayTeam, label: "Yellow card" },
    { minute: "41'", team: project.homeTeam, label: "Goal" },
    { minute: "58'", team: project.awayTeam, label: "Substitution" },
    { minute: "73'", team: project.homeTeam, label: "Goal" },
    { minute: "85'", team: project.awayTeam, label: "Shot on target — saved" },
  ];
}

export default function MatchReportPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<TacticalProject | null | undefined>(undefined);
  const [tab, setTab] = useState<Tab>("Formation");

  useEffect(() => {
    setProject(getProject(params.id) ?? null);
  }, [params.id]);

  if (project === undefined) return null;

  if (project === null) {
    return (
      <div className={coachStyles.page}>
        <header className={coachStyles.topbar}>
          <div><span>MATCH LAB</span><h1>Match report</h1></div>
          <Link href="/coach/tactical-analysis/projects" className={coachStyles.backLink} aria-label="Back to match projects">←</Link>
        </header>
        <div className={styles.emptyState}>Project not found.</div>
      </div>
    );
  }

  if (project.status !== "ready") {
    return (
      <div className={coachStyles.page}>
        <header className={coachStyles.topbar}>
          <div><span>MATCH LAB</span><h1>{project.homeTeam} vs {project.awayTeam}</h1></div>
          <Link href="/coach/tactical-analysis/projects" className={coachStyles.backLink} aria-label="Back to match projects">←</Link>
        </header>
        <div className={styles.processingNotice}>
          <h2>Still processing…</h2>
          <p>This match is being analyzed. The report will appear here automatically once it's ready.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={coachStyles.page}>
      <header className={coachStyles.topbar}>
        <div><span>MATCH LAB</span><h1>Match report</h1></div>
        <Link href="/coach/tactical-analysis/projects" className={coachStyles.backLink} aria-label="Back to match projects">←</Link>
      </header>

      <div className={styles.reportHeader}>
        <div>
          <h2>{project.homeTeam} vs {project.awayTeam}</h2>
          <span className={styles.reportMeta}>{project.date} · ANALYSIS READY</span>
        </div>
        <span className={`${styles.badge} ${styles.badgeReady}`}><i />Ready</span>
      </div>

      <div className={styles.tabRow}>
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={tab === t ? styles.tabActive : undefined}
            onClick={() => setTab(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === "Formation" && (
        <div className={styles.reportGrid}>
          <div className={styles.panel}>
            <h3>Formation map</h3>
            <div className={styles.pitch}>
              {FORMATION_DOTS.map((dot, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${dot.team === "home" ? styles.dotHome : styles.dotAway}`}
                  style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.panel}>
            <h3>AI summary</h3>
            <ul className={styles.summaryList}>
              {summaryFor(project).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === "Heatmap" && (
        <div className={styles.panel}>
          <div className={styles.placeholderTab}>Player heatmaps are on the roadmap — pending the video pipeline's positional tracking output.</div>
        </div>
      )}

      {tab === "Events" && (
        <div className={styles.panel}>
          <h3>Event timeline</h3>
          <div className={styles.timeline}>
            {eventsFor(project).map((event, i) => (
              <div key={i} className={styles.timelineRow}>
                <span className={styles.timelineMinute}>{event.minute}</span>
                <span className={styles.timelineTeam}>{event.team}</span>
                <span>{event.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Full report" && (
        <div className={styles.panel}>
          <h3>AI summary</h3>
          <ul className={styles.summaryList}>
            {summaryFor(project).map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
