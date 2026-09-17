import Link from "next/link";
import { verifySession } from "@/lib/dal";
import styles from "./coach.module.css";

export default async function CoachPage() {
  const user = await verifySession();
  const clubName = String(user.user_metadata?.club_name ?? "your club");
  const firstName = (user.email?.split("@")[0] ?? "coach")
    .split(/[._-]/)[0]
    .replace(/^./, (letter) => letter.toUpperCase());

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div><span>COACH COMMAND CENTER</span><h1>Good evening, {firstName}.</h1></div>
        <div className={styles.status}><i /> DATA SYSTEMS ONLINE</div>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>NOVA INTELLIGENCE · {clubName.toUpperCase()}</span>
          <h2>TURN EVERY MATCH<br />INTO AN <em>ADVANTAGE.</em></h2>
          <p>
            Your central workspace for player recruitment and tactical preparation.
            Start with one of the analysis suites below.
          </p>
        </div>
        <div className={styles.pitchGraphic} aria-hidden="true">
          <div className={styles.pitchCircle} />
          <i className={styles.playerOne} /><i className={styles.playerTwo} />
          <i className={styles.playerThree} /><i className={styles.playerFour} />
        </div>
      </section>

      <div className={styles.sectionTitle}>
        <div><span>01</span><h3>Analysis suites</h3></div>
        <small>SELECT A WORKSPACE TO BEGIN</small>
      </div>

      <section className={styles.featureGrid}>
        <Link href="/coach/scouting" className={styles.featureCard}>
          <div className={styles.featureIcon}>◎</div>
          <span className={styles.cardIndex}>01 / RECRUITMENT</span>
          <h3>SCOUTING<br />INTELLIGENCE</h3>
          <p>Search across every covered league, compare player profiles, and build evidence-led shortlists.</p>
          <div className={styles.cardTags}><span>PLAYER SEARCH</span><span>SIMILARITY</span><span>SHORTLISTS</span></div>
          <b className={styles.openLink}>OPEN SCOUTING <i>→</i></b>
        </Link>
        <Link href="/coach/tactical-analysis" className={`${styles.featureCard} ${styles.blueCard}`}>
          <div className={styles.featureIcon}>◇</div>
          <span className={styles.cardIndex}>02 / MATCH PREPARATION</span>
          <h3>TACTICAL<br />ANALYSIS</h3>
          <p>Upload footage, map formations and space, then turn match events into an actionable game plan.</p>
          <div className={styles.cardTags}><span>VIDEO</span><span>FORMATIONS</span><span>DANGER MAP</span></div>
          <b className={styles.openLink}>OPEN ANALYSIS <i>→</i></b>
        </Link>
      </section>

      <section className={styles.activityPanel}>
        <div><span className={styles.kicker}>WORKSPACE SUMMARY</span><h3>Ready for your first analysis</h3><p>Recent projects and saved reports will appear here.</p></div>
        <div className={styles.summaryStats}>
          <span><b>0</b><small>SCOUTING LISTS</small></span>
          <span><b>0</b><small>MATCH PROJECTS</small></span>
          <span><b>10</b><small>COVERED LEAGUES</small></span>
        </div>
      </section>
    </div>
  );
}
