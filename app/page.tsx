"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  // Scroll-reveal + active nav-link highlighting (ported from the <script> tag)
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((r) => io.observe(r));

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    const onScroll = () => {
      let cur = "";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 100) cur = s.id;
      });
      navLinks.forEach((a) => {
        (a as HTMLElement).style.color =
          a.getAttribute("href") === "#" + cur ? "var(--green)" : "";
      });
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="landing-root">
      {/* NAV */}
      <nav>
        <Link className="nav-brand" href="/">
          <div className="nav-logo">⚽</div>
          <span className="nav-wordmark">
            NOVA <span>SOLUTION</span>
          </span>
        </Link>
        <div className="nav-links">
          <a href="#how">How It Works</a>
          <a href="#tracks">Modules</a>
          <a href="#users">Who It&apos;s For</a>
        </div>
        <div className="nav-actions">
          <Link className="btn-ghost" href="/login">
            Log In
          </Link>
          <Link className="btn-primary" href="/signup">
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <svg
          className="pitch-bg"
          viewBox="0 0 1400 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1400" height="800" fill="none" stroke="rgba(168,224,99,1)" strokeWidth="2" />
          <line x1="700" y1="0" x2="700" y2="800" stroke="rgba(168,224,99,1)" strokeWidth="1.5" />
          <circle cx="700" cy="400" r="120" fill="none" stroke="rgba(168,224,99,1)" strokeWidth="1.5" />
          <circle cx="700" cy="400" r="6" fill="rgba(168,224,99,1)" />
          <rect x="0" y="260" width="200" height="280" fill="none" stroke="rgba(168,224,99,1)" strokeWidth="1.5" />
          <rect x="1200" y="260" width="200" height="280" fill="none" stroke="rgba(168,224,99,1)" strokeWidth="1.5" />
          <rect x="0" y="330" width="70" height="140" fill="none" stroke="rgba(168,224,99,1)" strokeWidth="1" />
          <rect x="1330" y="330" width="70" height="140" fill="none" stroke="rgba(168,224,99,1)" strokeWidth="1" />
          <path d="M0,0 Q30,0 30,30" fill="none" stroke="rgba(168,224,99,1)" strokeWidth="1.5" />
          <path d="M1400,0 Q1370,0 1370,30" fill="none" stroke="rgba(168,224,99,1)" strokeWidth="1.5" />
          <path d="M0,800 Q30,800 30,770" fill="none" stroke="rgba(168,224,99,1)" strokeWidth="1.5" />
          <path d="M1400,800 Q1370,800 1370,770" fill="none" stroke="rgba(168,224,99,1)" strokeWidth="1.5" />
        </svg>

        <div className="hero-eyebrow">
          <span className="live-dot"></span>
          AI-Powered · End-to-End · Built for Every Club
        </div>

        <h1 className="hero-title">
          FOOTBALL IS
          <br />
          <span className="hl">DATA.</span>
          <br />
          <span className="dim">WE DECODE IT.</span>
        </h1>

        <p className="hero-sub">
          <strong>Nova Solution</strong> transforms raw broadcast video and player databases into
          real-time tactical intelligence — automatically detecting formations, forecasting danger,
          and generating scouting reports with no human tagging required.
        </p>

        <div className="hero-ctas">
          <Link className="cta-big green" href="/signup">
            Start for Free →
          </Link>
          <Link className="cta-big outline" href="/login">
            See the Dashboard
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hstat">
            <div className="num">300K+</div>
            <div className="lbl">Registered clubs worldwide</div>
          </div>
          <div className="hero-divider"></div>
          <div className="hstat">
            <div className="num">$9.6B</div>
            <div className="lbl">Global transfer spend in 2023</div>
          </div>
          <div className="hero-divider"></div>
          <div className="hstat">
            <div className="num">200+</div>
            <div className="lbl">Manual hours saved per opponent</div>
          </div>
          <div className="hero-divider"></div>
          <div className="hstat">
            <div className="num">0.79</div>
            <div className="lbl">Real-time danger score precision</div>
          </div>
        </div>

        <div className="scroll-hint">
          SCROLL TO EXPLORE
          <span className="scroll-arrow">↓</span>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar reveal">
        <div className="sbar-item">
          <div className="sbar-num">6</div>
          <div className="sbar-lbl">
            AI Modules across
            <br />
            Track A &amp; Track B
          </div>
        </div>
        <div className="sbar-item">
          <div className="sbar-num">30+</div>
          <div className="sbar-lbl">
            Football leagues
            <br />
            in the player database
          </div>
        </div>
        <div className="sbar-item">
          <div className="sbar-num">500+</div>
          <div className="sbar-lbl">
            Annotated matches
            <br />
            from SoccerNet
          </div>
        </div>
        <div className="sbar-item">
          <div className="sbar-num">0→1</div>
          <div className="sbar-lbl">
            Real-time danger score
            <br />
            per possession sequence
          </div>
        </div>
      </div>

      {/* PROBLEM vs SOLUTION */}
      <section id="problem" style={{ background: "var(--bg)" }}>
        <div className="reveal">
          <div className="section-label">The Problem</div>
          <h2 className="section-title">
            WHY FOOTBALL ANALYSIS
            <br />
            <span>IS BROKEN TODAY</span>
          </h2>
          <p className="section-sub">
            The tools exist. But they&apos;re manual, expensive, and out of reach for most clubs.
          </p>
        </div>

        <div className="ps-grid reveal">
          <div>
            <div className="ps-col-title red">❌ Without Nova Solution</div>
            <div className="ps-item prob">
              <span className="ps-ico">⏱</span>
              <span className="ps-text">
                <strong>200+ hours per opponent</strong> spent on manual video tagging by analysts
                like Marcelo Bielsa&apos;s team.
              </span>
            </div>
            <div className="ps-item prob">
              <span className="ps-ico">💸</span>
              <span className="ps-text">
                <strong>Nearly half of all Premier League transfers fail</strong> on the pitch due
                to poor scouting and data silos.
              </span>
            </div>
            <div className="ps-item prob">
              <span className="ps-ico">🚫</span>
              <span className="ps-text">
                <strong>300,000+ registered clubs worldwide</strong> have no access to affordable
                automated analysis tools.
              </span>
            </div>
            <div className="ps-item prob">
              <span className="ps-ico">🧩</span>
              <span className="ps-text">
                <strong>No end-to-end AI system</strong> exists to go from raw broadcast video to
                tactical intelligence automatically.
              </span>
            </div>
          </div>

          <div>
            <div className="ps-col-title green">✅ With Nova Solution</div>
            <div className="ps-item sol">
              <span className="ps-ico">🤖</span>
              <span className="ps-text">
                <strong>Fully automated video pipeline</strong> — player detection, tracking,
                formation reading, and pitch mapping with zero manual tagging.
              </span>
            </div>
            <div className="ps-item sol">
              <span className="ps-ico">⚡</span>
              <span className="ps-text">
                <strong>LSTM danger forecasting</strong> scores every possession sequence in real
                time — know what&apos;s coming before it happens.
              </span>
            </div>
            <div className="ps-item sol">
              <span className="ps-ico">🔍</span>
              <span className="ps-text">
                <strong>Plain-language scouting</strong> — find statistically similar players
                across 30+ leagues without a data science team.
              </span>
            </div>
            <div className="ps-item sol">
              <span className="ps-ico">📋</span>
              <span className="ps-text">
                <strong>LLM-generated match reports &amp; pre-match briefs</strong> with a
                Confirmatory Agent that prevents hallucinations.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ background: "rgba(13,26,18,0.5)" }}>
        <div className="reveal">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">
            RAW VIDEO IN.
            <br />
            <span>TACTICAL INTELLIGENCE</span> OUT.
          </h2>
          <p className="section-sub">
            Six AI modules work in sequence and in parallel — processing footage and player data
            into decisions.
          </p>
        </div>

        <div className="how-grid reveal">
          <div className="how-card">
            <div className="how-num">01</div>
            <div className="how-icon" style={{ background: "rgba(168,224,99,0.1)" }}>
              🎥
            </div>
            <div className="how-title">Video Intelligence</div>
            <div className="how-desc">
              YOLOv8 detects every player, ball, goalkeeper, and referee. ByteTrack maintains
              identity across frames. KMeans separates teams by jersey color. PnLCalib maps pixels
              to real pitch metres.
            </div>
            <div className="how-track">Track A · Module 01 · INPUT: Broadcast Video</div>
          </div>

          <div className="how-card">
            <div className="how-num">02</div>
            <div className="how-icon" style={{ background: "rgba(41,232,196,0.08)" }}>
              🧭
            </div>
            <div className="how-title">Tactical Pattern Recognition</div>
            <div className="how-desc">
              Computes pressing intensity, zone occupancy grids, defensive line height, and
              compactness metrics frame-by-frame. Every player gets a normalised spatial feature
              vector every frame.
            </div>
            <div className="how-track">Track A · Module 02 · INPUT: Player Coordinates</div>
          </div>

          <div className="how-card">
            <div className="how-num">03</div>
            <div className="how-icon" style={{ background: "rgba(232,85,41,0.08)" }}>
              ⚡
            </div>
            <div className="how-title">Match Danger Forecasting</div>
            <div className="how-desc">
              An LSTM model trained on historical sequences predicts danger 0–1 per possession.
              Reverse mode recommends the exact tactical adjustment most likely to reduce threat.
            </div>
            <div className="how-track">Track A · Module 03 · OUTPUT: Danger Score</div>
          </div>

          <div className="how-card">
            <div className="how-num">04</div>
            <div className="how-icon" style={{ background: "rgba(240,208,96,0.08)" }}>
              🔍
            </div>
            <div className="how-title">Player Profiling &amp; Scouting</div>
            <div className="how-desc">
              Cosine similarity search and KMeans role clustering find identical players across
              leagues. Ask in plain English: &quot;fast left-footed striker under 23&quot; — the
              LLM translates it into structured filters.
            </div>
            <div className="how-track">Track B · Module 04 · INPUT: Player Name or Query</div>
          </div>

          <div className="how-card">
            <div className="how-num">05</div>
            <div className="how-icon" style={{ background: "rgba(168,224,99,0.08)" }}>
              📋
            </div>
            <div className="how-title">Automated Match Report</div>
            <div className="how-desc">
              After every match, an LLM assembles a full performance report. A Confirmatory Agent
              cross-checks every number and claim against hard stats before the report is
              finalised — no hallucinations.
            </div>
            <div className="how-track">Track B · Module 05 · OUTPUT: Written Report</div>
          </div>

          <div className="how-card">
            <div className="how-num">06</div>
            <div className="how-icon" style={{ background: "rgba(41,232,196,0.06)" }}>
              🗺️
            </div>
            <div className="how-title">Pre-Match Brief</div>
            <div className="how-desc">
              Aggregates the opponent&apos;s recent patterns, links your players&apos; profiles to
              their weaknesses, and generates a structured brief — threats, tendencies, and
              recommended countermeasures — before kickoff.
            </div>
            <div className="how-track">Track B · Module 06 · OUTPUT: Scouting Brief</div>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section id="tracks">
        <div className="reveal">
          <div className="section-label">System Architecture</div>
          <h2 className="section-title">
            TWO TRACKS.
            <br />
            <span>ONE SYSTEM.</span>
          </h2>
          <p className="section-sub">
            Track A processes video into tactical intelligence. Track B transforms player
            databases into scouting intelligence. Both are independent entry points — both feed
            the same dashboard.
          </p>
        </div>

        <div className="tracks-wrap reveal">
          <div className="track-card">
            <div className="track-header">
              <span className="track-badge a">Track A</span>
              <span className="track-name">Video Intelligence Pipeline</span>
            </div>
            <div className="track-entry">
              <strong>Entry point:</strong> Raw broadcast match video
              <br />
              <strong>Output:</strong> Player coordinates → tactical patterns → danger scores →
              match report
            </div>
            <div className="track-modules">
              <div className="track-mod">
                <span className="mod-num">M01</span>
                <div className="mod-info">
                  <div className="mod-name">Video Intelligence</div>
                  <div className="mod-desc">
                    Detection, tracking, team separation, pitch mapping, replay filtering, score
                    extraction
                  </div>
                </div>
              </div>
              <div className="track-mod">
                <span className="mod-num">M02</span>
                <div className="mod-info">
                  <div className="mod-name">Tactical Pattern Recognition</div>
                  <div className="mod-desc">
                    Pressing, zone grids, defensive line height, compactness, feature vectors
                  </div>
                </div>
              </div>
              <div className="track-mod">
                <span className="mod-num">M03</span>
                <div className="mod-info">
                  <div className="mod-name">Match Danger Forecasting</div>
                  <div className="mod-desc">
                    Sequence builder, LSTM model, danger score formula, reverse mode
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="track-card">
            <div className="track-header">
              <span className="track-badge b">Track B</span>
              <span className="track-name">Player Intelligence Pipeline</span>
            </div>
            <div className="track-entry">
              <strong>Entry point:</strong> Player name or plain-language scouting query
              <br />
              <strong>Output:</strong> Player profiles → similar players → transfer candidates →
              match briefs
            </div>
            <div className="track-modules">
              <div className="track-mod">
                <span className="mod-num">M04</span>
                <div className="mod-info">
                  <div className="mod-name">Player Profiling &amp; Scouting</div>
                  <div className="mod-desc">
                    StatsBomb + FBref database, cosine similarity, role clustering, NL query
                    parsing
                  </div>
                </div>
              </div>
              <div className="track-mod">
                <span className="mod-num">M05</span>
                <div className="mod-info">
                  <div className="mod-name">Automated Match Report</div>
                  <div className="mod-desc">
                    LLM output assembler, confirmatory agent, structured report generator
                  </div>
                </div>
              </div>
              <div className="track-mod">
                <span className="mod-num">M06</span>
                <div className="mod-info">
                  <div className="mod-name">Pre-Match Brief</div>
                  <div className="mod-desc">
                    Opponent data aggregator, player matchup cross-referencer, brief generator
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="users" style={{ background: "rgba(13,26,18,0.4)" }}>
        <div className="reveal">
          <div className="section-label">Who It&apos;s For</div>
          <h2 className="section-title">
            BUILT FOR
            <br />
            <span>EVERYONE</span> ON THE PITCH.
          </h2>
          <p className="section-sub">
            From elite coaching staff to passionate fans — Nova Solution has a mode for you.
          </p>
        </div>

        <div className="user-grid reveal">
          <div className="user-card pro">
            <div className="user-type pro">⚽ Professional</div>
            <div className="user-title">
              COACHING STAFF
              <br />
              &amp; ANALYSTS
            </div>
            <div className="user-desc">
              Full access to the tactical command center — live formations, danger scores,
              scouting engine, and AI-generated reports. Everything your analytics team needs,
              with zero setup.
            </div>
            <div className="user-perks">
              <div className="perk">Live pitch tracking &amp; formation detection</div>
              <div className="perk">Real-time LSTM danger score per possession</div>
              <div className="perk">Plain-language player scouting across 30+ leagues</div>
              <div className="perk">Automated post-match reports &amp; pre-match briefs</div>
              <div className="perk">AI tactical recommendations with confidence scores</div>
            </div>
            <Link className="user-cta" href="/signup">
              Join as Professional →
            </Link>
          </div>

          <div className="user-card fan">
            <div className="user-type fan">🏟️ Casual Fan</div>
            <div className="user-title">
              FANS &amp;
              <br />
              ENTHUSIASTS
            </div>
            <div className="user-desc">
              Follow the game like never before. See what&apos;s happening on the pitch in real
              time — which team is pressing, where the danger is building, and which players are
              performing.
            </div>
            <div className="user-perks">
              <div className="perk">Live match danger score and tactical overview</div>
              <div className="perk">Formation and possession visualisation</div>
              <div className="perk">Key event timeline — goals, cards, press phases</div>
              <div className="perk">Player spotlight — who&apos;s the biggest threat today</div>
              <div className="perk">Open-source scouting access for player discovery</div>
            </div>
            <Link className="user-cta" href="/signup">
              Join as Fan →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="footer-brand">
            NOVA <span>SOLUTION</span>
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              color: "var(--muted)",
              marginTop: "4px",
            }}
          >
            AI Football Tactical Analysis · Grad Project · Supervisor: Dr. Karma Fathalla
          </div>
        </div>
        <div className="footer-meta">
          Built with YOLOv8 · ByteTrack · LSTM · FastAPI · LLM
          <br />
          Data: SoccerNet · StatsBomb · FBref · Transfermarkt
          <br />
          <span style={{ color: "var(--green)" }}>■</span> Nova Solution © 2026
        </div>
      </footer>

      <style jsx>{`
        .landing-root {
          --bg: #050c08;
          --card: #0d1a12;
          --border: rgba(168, 224, 99, 0.12);
          --green: #a8e063;
          --gdim: #5a8a28;
          --teal: #29e8c4;
          --red: #e85529;
          --yellow: #f0d060;
          --white: #eef2ee;
          --muted: rgba(238, 242, 238, 0.42);
          --mono: "JetBrains Mono", monospace;

          font-family: "Syne", sans-serif;
          background: var(--bg);
          color: var(--white);
          overflow-x: hidden;
          position: relative;
        }

        .landing-root::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: repeating-linear-gradient(
              0deg,
              rgba(168, 224, 99, 0.022) 0px,
              transparent 1px,
              transparent 48px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(168, 224, 99, 0.022) 0px,
              transparent 1px,
              transparent 48px
            );
        }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 64px;
          background: rgba(5, 12, 8, 0.85);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(20px);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .nav-logo {
          width: 32px;
          height: 32px;
          background: var(--green);
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }
        .nav-wordmark {
          font-family: "Bebas Neue", sans-serif;
          font-size: 22px;
          letter-spacing: 2.5px;
          color: var(--white);
        }
        .nav-wordmark span {
          color: var(--green);
        }

        .nav-links {
          display: flex;
          gap: 4px;
        }
        .nav-links a {
          padding: 7px 16px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--muted);
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
        }
        .nav-links a:hover {
          color: var(--white);
          background: rgba(168, 224, 99, 0.07);
        }

        .nav-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        :global(.btn-ghost) {
          padding: 8px 20px;
          border: 1px solid var(--border);
          border-radius: 7px;
          font-family: "Syne", sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--muted);
          background: transparent;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: border-color 0.2s, color 0.2s;
        }
        :global(.btn-ghost:hover) {
          border-color: rgba(168, 224, 99, 0.4);
          color: var(--white);
        }

        :global(.btn-primary) {
          padding: 8px 22px;
          border: none;
          border-radius: 7px;
          font-family: "Syne", sans-serif;
          font-size: 12px;
          font-weight: 700;
          background: var(--green);
          color: var(--bg);
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 4px 18px rgba(168, 224, 99, 0.22);
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        :global(.btn-primary:hover) {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(168, 224, 99, 0.32);
        }

        .hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 48px 80px;
          overflow: hidden;
        }

        .hero::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          width: 900px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(168, 224, 99, 0.08) 0%, transparent 65%);
          pointer-events: none;
        }

        .pitch-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.06;
          width: 100%;
          height: 100%;
        }

        .hero-eyebrow {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green);
          border: 1px solid rgba(168, 224, 99, 0.25);
          border-radius: 20px;
          padding: 6px 16px;
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease both;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--red);
          animation: pulse 1.5s ease-out infinite;
          display: inline-block;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(232, 85, 41, 0.6);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(232, 85, 41, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(232, 85, 41, 0);
          }
        }

        .hero-title {
          position: relative;
          z-index: 1;
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(64px, 9vw, 120px);
          line-height: 0.95;
          letter-spacing: 3px;
          margin-bottom: 28px;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        .hero-title .hl {
          color: var(--green);
        }
        .hero-title .dim {
          color: rgba(238, 242, 238, 0.35);
        }

        .hero-sub {
          position: relative;
          z-index: 1;
          font-size: 17px;
          line-height: 1.75;
          color: var(--muted);
          max-width: 600px;
          margin: 0 auto 40px;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .hero-sub :global(strong) {
          color: var(--white);
        }

        .hero-ctas {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 14px;
          justify-content: center;
          animation: fadeUp 0.6s 0.3s ease both;
        }

        :global(.cta-big) {
          padding: 15px 36px;
          border-radius: 10px;
          font-family: "Syne", sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          border: none;
          text-decoration: none;
          display: inline-block;
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        :global(.cta-big.green) {
          background: var(--green);
          color: var(--bg);
          box-shadow: 0 6px 28px rgba(168, 224, 99, 0.28);
        }
        :global(.cta-big.green:hover) {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(168, 224, 99, 0.38);
        }
        :global(.cta-big.outline) {
          background: transparent;
          color: var(--white);
          border: 1px solid rgba(168, 224, 99, 0.25);
        }
        :global(.cta-big.outline:hover) {
          border-color: rgba(168, 224, 99, 0.5);
          background: rgba(168, 224, 99, 0.05);
        }

        .hero-stats {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 48px;
          justify-content: center;
          margin-top: 60px;
          animation: fadeUp 0.6s 0.4s ease both;
        }

        .hstat {
          text-align: center;
        }
        .hstat .num {
          font-family: "Bebas Neue", sans-serif;
          font-size: 42px;
          color: var(--green);
          line-height: 1;
        }
        .hstat .lbl {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.5px;
          margin-top: 4px;
        }

        .hero-divider {
          width: 1px;
          background: var(--border);
          align-self: stretch;
        }

        .scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
          font-family: var(--mono);
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 1.5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: fadeUp 0.6s 0.6s ease both;
        }
        .scroll-arrow {
          animation: bounce 1.5s ease-in-out infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        .landing-root :global(section) {
          position: relative;
          z-index: 1;
          padding: 100px 48px;
        }

        .section-label {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 14px;
        }

        .section-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(36px, 4vw, 54px);
          letter-spacing: 2px;
          line-height: 1.05;
          margin-bottom: 16px;
        }

        .section-title :global(span) {
          color: var(--green);
        }

        .section-sub {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.75;
          max-width: 560px;
        }

        .how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 56px;
        }

        .how-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, transform 0.2s;
        }

        .how-card:hover {
          border-color: rgba(168, 224, 99, 0.3);
          transform: translateY(-4px);
        }

        .how-num {
          font-family: "Bebas Neue", sans-serif;
          font-size: 64px;
          line-height: 1;
          color: rgba(168, 224, 99, 0.07);
          position: absolute;
          top: 12px;
          right: 18px;
        }

        .how-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 16px;
        }

        .how-title {
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .how-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.65;
        }

        .how-track {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-top: 14px;
          color: var(--gdim);
        }

        .tracks-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 56px;
        }

        .track-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          transition: border-color 0.25s;
        }
        .track-card:hover {
          border-color: rgba(168, 224, 99, 0.28);
        }

        .track-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .track-badge {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid;
        }

        .track-badge.a {
          color: var(--green);
          border-color: rgba(168, 224, 99, 0.3);
          background: rgba(168, 224, 99, 0.07);
        }
        .track-badge.b {
          color: var(--teal);
          border-color: rgba(41, 232, 196, 0.3);
          background: rgba(41, 232, 196, 0.05);
        }

        .track-name {
          font-size: 20px;
          font-weight: 800;
        }

        .track-entry {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--muted);
          margin-bottom: 18px;
          line-height: 1.6;
        }

        .track-entry :global(strong) {
          color: var(--white);
        }

        .track-modules {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .track-mod {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid transparent;
          border-radius: 10px;
          transition: border-color 0.2s, background 0.2s;
        }
        .track-mod:hover {
          background: rgba(168, 224, 99, 0.04);
          border-color: var(--border);
        }

        .mod-num {
          font-family: var(--mono);
          font-size: 10px;
          color: var(--green);
          background: rgba(168, 224, 99, 0.1);
          border-radius: 4px;
          padding: 3px 7px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .mod-info .mod-name {
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .mod-info .mod-desc {
          font-size: 11px;
          color: var(--muted);
          line-height: 1.5;
        }

        .ps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 56px;
        }

        .ps-col-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 24px;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
        }
        .ps-col-title.red {
          color: var(--red);
        }
        .ps-col-title.green {
          color: var(--green);
        }

        .ps-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 10px;
          margin-bottom: 8px;
        }
        .ps-item.prob {
          background: rgba(232, 85, 41, 0.05);
          border: 1px solid rgba(232, 85, 41, 0.12);
        }
        .ps-item.sol {
          background: rgba(168, 224, 99, 0.04);
          border: 1px solid rgba(168, 224, 99, 0.15);
        }

        .ps-ico {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .ps-text {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(238, 242, 238, 0.75);
        }
        .ps-text :global(strong) {
          color: var(--white);
        }

        .user-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 56px;
        }

        .user-card {
          border-radius: 16px;
          padding: 36px 32px;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s;
        }
        .user-card:hover {
          transform: translateY(-4px);
        }

        .user-card.pro {
          background: linear-gradient(135deg, #0d1a12 60%, #0f2518);
          border: 1px solid rgba(168, 224, 99, 0.2);
        }
        .user-card.fan {
          background: linear-gradient(135deg, #0d1218 60%, #121430);
          border: 1px solid rgba(41, 232, 196, 0.15);
        }

        .user-type {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .user-type.pro {
          color: var(--green);
        }
        .user-type.fan {
          color: var(--teal);
        }

        .user-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 36px;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
        }

        .user-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .user-perks {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 28px;
        }

        .perk {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: rgba(238, 242, 238, 0.75);
        }
        .perk::before {
          content: "✓";
          font-weight: 700;
          font-size: 11px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user-card.pro .perk::before {
          background: rgba(168, 224, 99, 0.15);
          color: var(--green);
        }
        .user-card.fan .perk::before {
          background: rgba(41, 232, 196, 0.12);
          color: var(--teal);
        }

        :global(.user-cta) {
          display: inline-block;
          padding: 12px 28px;
          border-radius: 8px;
          font-family: "Syne", sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: filter 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .user-card.pro :global(.user-cta) {
          background: var(--green);
          color: var(--bg);
        }
        .user-card.fan :global(.user-cta) {
          background: var(--teal);
          color: var(--bg);
        }
        :global(.user-cta:hover) {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        .stats-bar {
          position: relative;
          z-index: 1;
          background: var(--card);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }

        .sbar-item {
          text-align: center;
          padding: 0 24px;
          border-right: 1px solid var(--border);
        }
        .sbar-item:last-child {
          border-right: none;
        }

        .sbar-num {
          font-family: "Bebas Neue", sans-serif;
          font-size: 52px;
          color: var(--green);
          line-height: 1;
        }
        .sbar-lbl {
          font-size: 12px;
          color: var(--muted);
          margin-top: 6px;
          line-height: 1.5;
        }

        footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border);
          padding: 40px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-brand {
          font-family: "Bebas Neue", sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: var(--white);
        }
        .footer-brand :global(span) {
          color: var(--green);
        }

        .footer-meta {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--muted);
          text-align: right;
          line-height: 1.7;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .landing-root :global(.reveal) {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .landing-root :global(.reveal.visible) {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
