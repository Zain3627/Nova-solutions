import type { Metadata } from "next";
import styles from "./overview.module.css";

export const metadata: Metadata = {
  title: "Design overview — internal",
  robots: { index: false, follow: false },
};

const PAGES = [
  { id: "profile", index: "01", title: "Player Profile" },
  { id: "results", index: "02", title: "Scouting Results" },
  { id: "shortlist", index: "03", title: "Shortlist" },
  { id: "match-report", index: "04", title: "Match Report" },
  { id: "squad", index: "05", title: "Squad" },
  { id: "compare", index: "06", title: "Compare Players" },
];

function WBox({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`${styles.wbox} ${className}`}>{label}</div>;
}

function Frame({
  id,
  index,
  title,
  route,
  note,
  children,
}: {
  id: string;
  index: string;
  title: string;
  route: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.frame}>
      <div className={styles.frameHead}>
        <span className={styles.index}>{index}</span>
        <h2>{title}</h2>
        <code>{route}</code>
      </div>
      <p className={styles.frameNote}>{note}</p>
      <div className={styles.frameBody}>{children}</div>
    </section>
  );
}

export default function DesignOverviewPage() {
  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <span>INTERNAL · NOT LINKED IN NAVIGATION</span>
        <h1>Page layout overview</h1>
        <p>
          Low-fidelity wireframes for the six planned pages — a stand-in for a Figma file so we can
          agree on structure before building each one for real. Dashed boxes are placeholder
          content, not final components.
        </p>
      </div>

      <nav className={styles.jumpNav} aria-label="Jump to page">
        {PAGES.map((p) => (
          <a key={p.id} href={`#${p.id}`}>{p.index} · {p.title}</a>
        ))}
      </nav>

      <Frame
        id="profile"
        index="01"
        title="Player Profile"
        route="/coach/scouting/profile"
        note={
          "Single-player deep dive — reuses the stat categories already built for the fan leaderboards. This is the first page being built for real, wired to live Supabase data."
        }
      >
        <div className={styles.row}>
          <WBox label="Avatar" className={styles.avatarBox} />
          <div className={styles.mainCol}>
            <WBox label="Player name · team · league · season" className={styles.lineBox} />
          </div>
          <WBox label="Rating badge" className={styles.badgeBox} />
          <WBox label="+ Add to shortlist" className={styles.btnBox} />
        </div>
        <WBox label="Category tabs — Overview / Attacking / Passing / Defending / Physical / Goalkeeping..." className={styles.lineBox} />
        <div className={styles.grid4}>
          {Array.from({ length: 8 }).map((_, i) => (
            <WBox key={i} label="Stat tile — label + value" />
          ))}
        </div>
      </Frame>

      <Frame
        id="results"
        index="02"
        title="Scouting Results"
        route="/coach/scouting/results"
        note={
          "What the current search box on the Scouting page should lead to — a filtered grid of player cards, each linking to its Player Profile."
        }
      >
        <div className={styles.row}>
          <div className={`${styles.col} ${styles.sidebarCol}`}>
            <WBox label="Filter panel — position / age / foot / league / play style" className={styles.tallBox} />
          </div>
          <div className={styles.mainCol}>
            <WBox label="Search bar + sort control" className={styles.lineBox} />
            <div className={styles.grid3}>
              {Array.from({ length: 6 }).map((_, i) => (
                <WBox key={i} label="Player card — photo, name, team, age, 2 stat chips, match score" />
              ))}
            </div>
            <WBox label="Pagination" className={styles.lineBox} />
          </div>
        </div>
      </Frame>

      <Frame
        id="shortlist"
        index="03"
        title="Shortlist"
        route="/coach/shortlist"
        note={
          "Saved recruitment targets. Kanban-style board grouped by recruitment status, each card carrying the coach's own notes."
        }
      >
        <WBox label="Status tabs — Watching / Contacted / Rejected" className={styles.lineBox} />
        <div className={styles.grid3}>
          {["Watching", "Contacted", "Rejected"].map((col) => (
            <div key={col} className={styles.col}>
              <span className={styles.kanbanHead}>{col}</span>
              <WBox label="Player card + note preview" className={styles.lineBox} />
              <WBox label="Player card + note preview" className={styles.lineBox} />
              <WBox label="Player card + note preview" className={styles.lineBox} />
            </div>
          ))}
        </div>
      </Frame>

      <Frame
        id="match-report"
        index="04"
        title="Match Report"
        route="/coach/tactical-analysis/projects/[id]"
        note={
          "The output of the upload-and-process flow — formation map, AI-written summary, and an event timeline. Can ship with mocked data before the real video pipeline is ready."
        }
      >
        <WBox label="Match header — teams, score, date, processing status badge" className={styles.lineBox} />
        <div className={styles.row}>
          <WBox label="Formation pitch diagram" className={styles.bigBox} />
          <WBox label="AI summary — key tactical insights, bullet list" className={styles.bigBox} />
        </div>
        <WBox label="Tabs — Formation / Heatmap / Events / Full report" className={styles.lineBox} />
        <WBox label="Event timeline — scrollable markers (goals, cards, subs)" className={styles.lineBox} />
      </Frame>

      <Frame
        id="squad"
        index="05"
        title="Squad"
        route="/coach/squad"
        note={
          "Uses the club already selected at signup. Cheap to build since it reuses the same player-stats data — useful on day one even before any AI feature is wired up."
        }
      >
        <WBox label="Club header — crest, name, league" className={styles.lineBox} />
        <WBox label="Formation diagram — players placed on pitch by position" className={styles.bigBox} />
        <div className={styles.grid4}>
          {["GK", "DEF", "MID", "FWD"].map((pos) => (
            <div key={pos} className={styles.col}>
              <span className={styles.kanbanHead}>{pos}</span>
              <WBox label="Player row — name + rating" className={styles.lineBox} />
              <WBox label="Player row — name + rating" className={styles.lineBox} />
            </div>
          ))}
        </div>
      </Frame>

      <Frame
        id="compare"
        index="06"
        title="Compare Players"
        route="/coach/scouting/compare"
        note={
          "Side-by-side evaluation for 2–4 shortlisted players. Same data and components as the Player Profile page, just rendered in parallel columns."
        }
      >
        <WBox label='Player selector chips (2–4) + "add player"' className={styles.lineBox} />
        <WBox label="Overlaid radar chart" className={styles.bigBox} />
        <WBox label="Side-by-side stat table — rows = metrics, columns = players, best value highlighted" className={styles.tallBox} />
      </Frame>
    </div>
  );
}
