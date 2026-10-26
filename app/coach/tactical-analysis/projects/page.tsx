"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, type ProjectStatus, type TacticalProject } from "@/lib/tactical-projects";
import coachStyles from "../../coach.module.css";
import styles from "../tactical.module.css";

const FILTERS: { label: string; value: ProjectStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "Ready", value: "ready" },
  { label: "Failed", value: "failed" },
];

const BADGE_CLASS: Record<ProjectStatus, string> = {
  processing: styles.badgeProcessing,
  ready: styles.badgeReady,
  failed: styles.badgeFailed,
};

const BADGE_LABEL: Record<ProjectStatus, string> = {
  processing: "Processing",
  ready: "Ready",
  failed: "Failed",
};

export default function MatchProjectsPage() {
  const [projects, setProjects] = useState<TacticalProject[]>([]);
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");

  useEffect(() => {
    setProjects(getProjects());
    // Poll so a project that's mid-"processing" when this page opens flips
    // to "ready" live, without needing a manual refresh.
    const interval = setInterval(() => setProjects(getProjects()), 2000);
    return () => clearInterval(interval);
  }, []);

  const visible = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div className={coachStyles.page}>
      <header className={coachStyles.topbar}>
        <div><span>MATCH LAB</span><h1>Match projects</h1></div>
        <Link href="/coach/tactical-analysis" className={coachStyles.backLink} aria-label="Back to tactical analysis">←</Link>
      </header>

      <div className={styles.filterRow}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={filter === f.value ? styles.filterActive : undefined}
            onClick={() => setFilter(f.value)}
          >
            {f.label.toUpperCase()}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className={styles.emptyState}>No projects in this view yet.</div>
      ) : (
        <div className={styles.projectList}>
          {visible.map((project) => {
            const row = (
              <>
                <div className={styles.projectTeams}>
                  <b>{project.homeTeam} vs {project.awayTeam}</b>
                  <small>{project.date}{project.fileName ? ` · ${project.fileName}` : ""}</small>
                </div>
                <span className={`${styles.badge} ${BADGE_CLASS[project.status]}`}>
                  <i />{BADGE_LABEL[project.status]}
                </span>
                {project.status === "ready" && <span className={styles.openArrow}>→</span>}
              </>
            );
            return project.status === "ready" ? (
              <Link key={project.id} href={`/coach/tactical-analysis/projects/${project.id}`} className={styles.projectRow}>
                {row}
              </Link>
            ) : (
              <div key={project.id} className={styles.projectRow}>
                {row}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
