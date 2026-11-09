import Link from "next/link";
import styles from "../coach.module.css";
import { ScoutingSearchForm } from "./search-form";
import { COACH_LEAGUES } from "@/lib/leagues";
import { POSITIONS, FEET } from "@/lib/players-bio";

export default function ScoutingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div><span>RECRUITMENT LAB</span><h1>Scouting intelligence</h1></div>
        <Link href="/coach" className={styles.backLink} aria-label="Back to overview">←</Link>
      </header>

      <section className={`${styles.moduleHero} ${styles.scoutingHero}`}>
        <span className={styles.kicker}>PLAYER DISCOVERY · DATA-LED RECRUITMENT</span>
        <h2>FIND THE PLAYER<br />YOUR SYSTEM <em>NEEDS.</em></h2>
        <p>Describe a profile, set the football constraints, and search across our covered competitions.</p>
        <ScoutingSearchForm />
      </section>

      <div className={styles.sectionTitle}>
        <div><span>01</span><h3>Build a player profile</h3></div>
        <small>REFINE YOUR SEARCH</small>
      </div>

      <form method="get" action="/coach/scouting/results" className={styles.filterPanel}>
        <div className={styles.positionPicker}>
          <label>POSITION</label>
          <div>
            <button type="submit" name="position" value="">Any</button>
            {POSITIONS.map((p) => (
              <button type="submit" name="position" value={p.value} key={p.value}>{p.label}</button>
            ))}
          </div>
        </div>
        <div className={styles.filterGrid}>
          <label>
            <span>AGE RANGE</span>
            <div className={styles.rangeValues}>
              <input type="number" name="ageMin" min={14} max={45} placeholder="18" />
              <span>—</span>
              <input type="number" name="ageMax" min={14} max={45} placeholder="27" />
            </div>
          </label>
          <label>
            <span>PREFERRED FOOT</span>
            <select name="foot" defaultValue="">
              <option value="">Any foot</option>
              {FEET.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
          <label>
            <span>LEAGUE</span>
            <select name="league" defaultValue="premier_league">
              {COACH_LEAGUES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </label>
          <label>
            <span>SORT BY</span>
            <select name="sort" defaultValue="rating">
              <option value="rating">Rating (highest)</option>
              <option value="age">Age (youngest)</option>
            </select>
          </label>
        </div>
        <button type="submit" className={styles.searchResultsBtn}>SEARCH PLAYERS →</button>
      </form>

      <section className={styles.workflowGrid}>
        <article><span>01</span><i>⌕</i><h3>Discover</h3><p>Search with football language or detailed statistical constraints.</p></article>
        <article><span>02</span><i>≋</i><h3>Compare</h3><p>Place candidates side by side across role-specific metrics.</p></article>
        <article><span>03</span><i>☆</i><h3>Shortlist</h3><p>Save targets, attach notes, and prepare recruitment meetings.</p></article>
      </section>
    </div>
  );
}
