import Link from "next/link";
import styles from "../coach.module.css";
import { UploadPanel } from "./upload-panel";

export default function TacticalAnalysisPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div><span>MATCH LAB</span><h1>Tactical analysis</h1></div>
        <Link href="/coach" className={styles.backLink} aria-label="Back to overview">←</Link>
      </header>

      <section className={`${styles.moduleHero} ${styles.tacticalHero}`}>
        <div>
          <span className={styles.kicker}>VIDEO TO TACTICAL INTELLIGENCE</span>
          <h2>SEE THE SHAPE.<br /><em>CONTROL THE GAME.</em></h2>
          <p>Turn full-match footage into formation maps, spatial patterns, and decision-ready coaching reports.</p>
        </div>
        <div className={styles.miniPitch} aria-hidden="true">
          <span /><span /><i /><i /><i /><i /><i /><i />
        </div>
      </section>

      <UploadPanel />

      <div className={styles.sectionTitle}>
        <div><span>02</span><h3>Match projects</h3></div>
        <Link href="/coach/tactical-analysis/projects" className={styles.openLink} style={{ position: "static" }}>
          VIEW ALL PROJECTS <i>→</i>
        </Link>
      </div>

      <div className={styles.sectionTitle}>
        <div><span>03</span><h3>Analysis pipeline</h3></div>
        <small>FROM VIDEO TO GAME PLAN</small>
      </div>
      <section className={styles.pipeline}>
        <article><b>01</b><i>▣</i><h3>Track</h3><p>Detect players and follow movement throughout every phase.</p></article>
        <span>→</span>
        <article><b>02</b><i>⌗</i><h3>Map</h3><p>Transform broadcast angles into a consistent top-down pitch view.</p></article>
        <span>→</span>
        <article><b>03</b><i>◇</i><h3>Interpret</h3><p>Identify formations, compactness, overloads and dangerous space.</p></article>
        <span>→</span>
        <article><b>04</b><i>≡</i><h3>Report</h3><p>Receive a coaching brief with clips and supporting evidence.</p></article>
      </section>
    </div>
  );
}
