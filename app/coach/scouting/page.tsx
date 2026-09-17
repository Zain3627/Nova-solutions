import Link from "next/link";
import styles from "../coach.module.css";

const positions = ["Goalkeeper", "Centre back", "Full back", "Midfielder", "Winger", "Striker"];

export default function ScoutingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div><span>RECRUITMENT LAB</span><h1>Scouting intelligence</h1></div>
        <Link href="/coach" className={styles.backLink}>← OVERVIEW</Link>
      </header>

      <section className={`${styles.moduleHero} ${styles.scoutingHero}`}>
        <span className={styles.kicker}>PLAYER DISCOVERY · DATA-LED RECRUITMENT</span>
        <h2>FIND THE PLAYER<br />YOUR SYSTEM <em>NEEDS.</em></h2>
        <p>Describe a profile, set the football constraints, and search across our covered competitions.</p>
        <div className={styles.searchBox}>
          <span>⌕</span>
          <input placeholder="Try “progressive left-footed centre back under 24”" />
          <button type="button">SEARCH PLAYERS →</button>
        </div>
      </section>

      <div className={styles.sectionTitle}>
        <div><span>01</span><h3>Build a player profile</h3></div>
        <small>REFINE YOUR SEARCH</small>
      </div>

      <section className={styles.filterPanel}>
        <div className={styles.positionPicker}>
          <label>POSITION</label>
          <div>{positions.map((position, index) => <button type="button" className={index === 3 ? styles.selectedFilter : undefined} key={position}>{position}</button>)}</div>
        </div>
        <div className={styles.filterGrid}>
          <label><span>AGE RANGE</span><div className={styles.rangeValues}><b>18</b><span>—</span><b>27</b></div></label>
          <label><span>PREFERRED FOOT</span><select defaultValue="any"><option value="any">Any foot</option><option>Right</option><option>Left</option></select></label>
          <label><span>LEAGUE</span><select defaultValue="all"><option value="all">All covered leagues</option><option>Premier League</option><option>La Liga</option><option>Bundesliga</option></select></label>
          <label><span>PLAY STYLE</span><select defaultValue="progressive"><option value="progressive">Progressive</option><option>Possession</option><option>Direct</option><option>Defensive</option></select></label>
        </div>
      </section>

      <section className={styles.workflowGrid}>
        <article><span>01</span><i>⌕</i><h3>Discover</h3><p>Search with football language or detailed statistical constraints.</p></article>
        <article><span>02</span><i>≋</i><h3>Compare</h3><p>Place candidates side by side across role-specific metrics.</p></article>
        <article><span>03</span><i>☆</i><h3>Shortlist</h3><p>Save targets, attach notes, and prepare recruitment meetings.</p></article>
      </section>
    </div>
  );
}
