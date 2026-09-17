import Link from "next/link";
import styles from "./landing.module.css";

export default function LandingPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link className={styles.brand} href="/" aria-label="Nova Solution home">
          <span className={styles.mark}>N</span>
          <span>NOVA <b>SOLUTION</b></span>
        </Link>
        <div className={styles.navActions}>
          <Link className={styles.login} href="/login">Sign in</Link>
          <Link className={styles.primarySmall} href="/signup">Create account</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>FOOTBALL DATA WORKSPACE</span>
          <h1>Football data,<br /><em>clearly organized.</em></h1>
          <p>
            Browse player statistics as a fan, or access a dedicated club
            workspace as a coach.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/signup">Create an account</Link>
            <Link className={styles.secondary} href="/login">Sign in</Link>
          </div>
        </div>

        <div className={styles.preview} aria-label="Nova Solution workspace preview">
          <div className={styles.previewTop}><span /><b>Nova workspace</b><small>Overview</small></div>
          <div className={styles.previewBody}>
            <span className={styles.previewLabel}>AVAILABLE WORKSPACES</span>
            <article><i>◎</i><div><b>Player statistics</b><p>Browse leagues, seasons, and leaderboards.</p></div></article>
            <article><i>◇</i><div><b>Coach workspace</b><p>Open scouting and tactical sections.</p></div></article>
          </div>
        </div>
      </section>

      <section className={styles.audiences}>
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>TWO EXPERIENCES</span>
          <h2>Choose your workspace</h2>
        </div>
        <div className={styles.cards}>
          <article>
            <span>FOR FANS</span>
            <h3>Explore player statistics</h3>
            <p>Switch between supported leagues and seasons, then compare category leaderboards.</p>
            <Link href="/signup">Create a fan account <b>→</b></Link>
          </article>
          <article>
            <span>FOR COACHES</span>
            <h3>Access your club workspace</h3>
            <p>Use a focused dashboard for the scouting and tactical sections available to your club.</p>
            <Link href="/signup">Create a coach account <b>→</b></Link>
          </article>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Nova Solution</span>
        <span>Football data workspace</span>
      </footer>
    </main>
  );
}
