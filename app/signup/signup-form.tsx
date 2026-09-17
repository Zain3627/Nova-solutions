"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import type { Club } from "@/lib/clubs";
import type { LeagueValue } from "@/lib/leagues";
import { signupAction } from "./actions";

type Role = "fan" | "pro";
type LeagueOption = {
  value: LeagueValue;
  label: string;
  icon: string;
  clubs: Club[];
};

export function SignupForm({ leagues }: { leagues: LeagueOption[] }) {
  const [state, formAction, pending] = useActionState(signupAction, undefined);
  const [role, setRole] = useState<Role>("fan");
  const [league, setLeague] = useState<LeagueValue | "">("");
  const [clubId, setClubId] = useState("");
  const [clubSearch, setClubSearch] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const selectedLeague = leagues.find((item) => item.value === league);
  const visibleClubs = useMemo(() => {
    const clubs = selectedLeague?.clubs ?? [];
    const query = clubSearch.trim().toLocaleLowerCase();
    return query
      ? clubs.filter((club) => club.name.toLocaleLowerCase().includes(query))
      : clubs;
  }, [clubSearch, selectedLeague]);

  const passwordScore = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  function chooseLeague(value: LeagueValue) {
    setLeague(value);
    setClubId("");
    setClubSearch("");
  }

  return (
    <main className="signup-page">
      <div className="pitch-glow" />
      <section className="signup-shell">
        <aside className="signup-story">
          <Link className="brand" href="/" aria-label="Nova Solution home">
            <span className="brand-mark">N</span>
            <span>NOVA <b>SOLUTION</b></span>
          </Link>
          <div className="story-copy">
            <span className="eyebrow">YOUR TECHNICAL AREA</span>
            <h1>BUILD THE<br /><em>WINNING EDGE.</em></h1>
            <p>
              One workspace for recruitment intelligence, opposition research,
              and match-day tactical decisions.
            </p>
          </div>
          <div className="story-stats">
            <div><strong>10</strong><span>domestic leagues</span></div>
            <div><strong>180+</strong><span>tracked clubs</span></div>
            <div><strong>2</strong><span>analysis suites</span></div>
          </div>
        </aside>

        <div className="form-panel">
          <div className="mobile-brand">
            <span className="brand-mark">N</span>
            <span>NOVA SOLUTION</span>
          </div>
          <div className="form-heading">
            <span>CREATE YOUR ACCOUNT</span>
            <h2>Who are you joining as?</h2>
          </div>

          <form action={formAction}>
            <input type="hidden" name="role" value={role} />
            <input type="hidden" name="league" value={league} />
            <input type="hidden" name="club_id" value={clubId} />

            <div className="role-grid">
              <button
                type="button"
                className={role === "fan" ? "role-card active" : "role-card"}
                onClick={() => setRole("fan")}
              >
                <span className="role-symbol">◎</span>
                <span><b>Football fan</b><small>Explore players and league data</small></span>
                <i>✓</i>
              </button>
              <button
                type="button"
                className={role === "pro" ? "role-card active" : "role-card"}
                onClick={() => setRole("pro")}
              >
                <span className="role-symbol">△</span>
                <span><b>Coach</b><small>Scouting and tactical workspace</small></span>
                <i>✓</i>
              </button>
            </div>

            <label className="field">
              <span>Email address</span>
              <input name="email" type="email" placeholder="coach@club.com" autoComplete="email" required />
            </label>

            {role === "pro" && (
              <div className="club-setup">
                <div className="step-heading">
                  <span>01</span>
                  <div><b>Select your league</b><small>Choose the competition your club plays in</small></div>
                </div>
                <div className="league-grid">
                  {leagues.map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      className={league === item.value ? "league-card selected" : "league-card"}
                      onClick={() => chooseLeague(item.value)}
                      aria-pressed={league === item.value}
                    >
                      <Image src={item.icon} alt="" width={42} height={42} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>

                {selectedLeague && (
                  <div className="club-step">
                    <div className="step-heading">
                      <span>02</span>
                      <div><b>Select your club</b><small>{selectedLeague.label} · {selectedLeague.clubs.length} clubs</small></div>
                    </div>
                    <label className="club-search">
                      <span>⌕</span>
                      <input
                        type="search"
                        value={clubSearch}
                        onChange={(event) => setClubSearch(event.target.value)}
                        placeholder="Search for your club"
                      />
                    </label>
                    <div className="club-grid">
                      {visibleClubs.map((club) => (
                        <button
                          type="button"
                          key={club.id}
                          className={clubId === club.id ? "club-card selected" : "club-card"}
                          onClick={() => setClubId(club.id)}
                          aria-pressed={clubId === club.id}
                        >
                          <span className="crest"><Image src={club.logo} alt="" width={44} height={44} /></span>
                          <span>{club.name}</span>
                          <i>✓</i>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="password-row">
              <label className="field">
                <span>Password</span>
                <span className="password-input">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword((value) => !value)}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </span>
                <span className="strength" aria-label={`Password strength ${passwordScore} of 4`}>
                  {[1, 2, 3, 4].map((level) => <i key={level} className={level <= passwordScore ? "on" : ""} />)}
                </span>
              </label>
              <label className="field">
                <span>Confirm password</span>
                <input name="confirm" type="password" placeholder="Repeat your password" autoComplete="new-password" required />
              </label>
            </div>

            {state?.error && <p className="message error" role="alert">{state.error}</p>}
            {state?.success && <p className="message success" role="status">{state.success}</p>}

            {!state?.success && (
              <button className="submit" type="submit" disabled={pending}>
                {pending ? "CREATING ACCOUNT…" : `CREATE ${role === "pro" ? "COACH" : "FAN"} ACCOUNT  →`}
              </button>
            )}
          </form>

          <p className="login-link">
            Already part of Nova? <Link href="/login">Sign in</Link>
          </p>
        </div>
      </section>

      <style jsx>{`
        .signup-page { min-height:100vh; padding:28px; background:#07100b; color:#f4f6f1; font-family:"DM Sans",sans-serif; position:relative; overflow:hidden; }
        .signup-page:before { content:""; position:fixed; inset:0; opacity:.055; background-image:linear-gradient(rgba(166,235,89,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(166,235,89,.6) 1px,transparent 1px); background-size:56px 56px; pointer-events:none; }
        .pitch-glow { position:fixed; width:650px; height:650px; border-radius:50%; background:#31883b; filter:blur(190px); opacity:.18; left:-260px; top:-220px; }
        .signup-shell { width:min(1320px,100%); min-height:calc(100vh - 56px); margin:auto; display:grid; grid-template-columns:minmax(330px,.76fr) minmax(560px,1.34fr); background:#0b1510; border:1px solid rgba(178,239,104,.15); border-radius:24px; overflow:hidden; position:relative; box-shadow:0 35px 100px rgba(0,0,0,.48); }
        .signup-story { min-height:760px; padding:42px; display:flex; flex-direction:column; background:radial-gradient(circle at 10% 80%,rgba(111,181,56,.26),transparent 42%),linear-gradient(155deg,rgba(25,69,34,.72),rgba(7,16,11,.92)); border-right:1px solid rgba(178,239,104,.13); position:sticky; top:0; height:calc(100vh - 56px); }
        .brand,.mobile-brand { display:flex; align-items:center; gap:11px; font-family:"Bebas Neue",sans-serif; font-size:24px; letter-spacing:1.7px; text-decoration:none; }
        .brand b { color:#aee86e; font-weight:400; }
        .brand-mark { width:38px; height:38px; display:grid; place-items:center; background:#aee86e; color:#07100b; border-radius:10px; font-weight:900; font-family:"Syne",sans-serif; }
        .story-copy { margin:auto 0; }
        .eyebrow,.form-heading>span { font:600 10px "JetBrains Mono",monospace; letter-spacing:2px; color:#aee86e; }
        .story-copy h1 { margin:18px 0; font:400 clamp(48px,5vw,72px)/.91 "Bebas Neue",sans-serif; letter-spacing:1px; }
        .story-copy h1 em { color:#aee86e; font-style:normal; }
        .story-copy p { color:rgba(244,246,241,.58); line-height:1.7; max-width:390px; font-size:14px; }
        .story-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; padding-top:25px; border-top:1px solid rgba(255,255,255,.1); }
        .story-stats div { display:flex; flex-direction:column; gap:3px; }
        .story-stats strong { font:400 30px "Bebas Neue",sans-serif; color:#aee86e; }
        .story-stats span { color:rgba(244,246,241,.38); font-size:9px; text-transform:uppercase; letter-spacing:.8px; }
        .form-panel { padding:48px clamp(28px,5vw,70px); overflow:hidden; }
        .mobile-brand { display:none; }
        .form-heading { margin-bottom:26px; }
        .form-heading h2 { margin-top:7px; font:400 34px "Bebas Neue",sans-serif; letter-spacing:.8px; }
        .role-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:23px; }
        button { font:inherit; }
        .role-card { color:#f4f6f1; display:flex; align-items:center; gap:13px; text-align:left; padding:15px; border-radius:13px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.025); cursor:pointer; transition:.2s; }
        .role-card:hover,.role-card.active { border-color:#aee86e; background:rgba(174,232,110,.07); }
        .role-symbol { width:38px; height:38px; border-radius:10px; display:grid; place-items:center; background:rgba(255,255,255,.06); color:#aee86e; font-size:21px; }
        .role-card>span:nth-child(2) { display:flex; flex-direction:column; gap:4px; flex:1; }
        .role-card b { font-size:13px; }
        .role-card small { font-size:10px; color:rgba(244,246,241,.4); }
        .role-card i,.club-card i { width:18px; height:18px; display:grid; place-items:center; border:1px solid rgba(255,255,255,.16); border-radius:50%; font-size:10px; font-style:normal; color:transparent; }
        .role-card.active i,.club-card.selected i { background:#aee86e; border-color:#aee86e; color:#07100b; }
        .field { display:flex; flex-direction:column; gap:8px; margin-bottom:18px; color:rgba(244,246,241,.62); font-size:10px; font-weight:600; letter-spacing:1px; text-transform:uppercase; }
        input { width:100%; border:1px solid rgba(174,232,110,.18); background:rgba(255,255,255,.045); border-radius:10px; color:#f4f6f1; padding:13px 14px; outline:none; font:400 13px "DM Sans",sans-serif; }
        input:focus { border-color:#8fc957; box-shadow:0 0 0 3px rgba(174,232,110,.08); }
        input::placeholder { color:rgba(244,246,241,.25); }
        .club-setup { border-top:1px solid rgba(255,255,255,.08); border-bottom:1px solid rgba(255,255,255,.08); padding:23px 0 21px; margin:4px 0 22px; }
        .step-heading { display:flex; align-items:center; gap:11px; margin-bottom:13px; }
        .step-heading>span { width:27px; height:27px; display:grid; place-items:center; border-radius:8px; background:#aee86e; color:#07100b; font:700 10px "JetBrains Mono",monospace; }
        .step-heading div { display:flex; flex-direction:column; gap:2px; }
        .step-heading b { font-size:12px; }
        .step-heading small { color:rgba(244,246,241,.36); font-size:10px; }
        .league-grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:8px; }
        .league-card { min-height:85px; padding:10px 5px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:7px; color:rgba(244,246,241,.66); border:1px solid rgba(255,255,255,.08); border-radius:10px; background:rgba(255,255,255,.025); cursor:pointer; font-size:9px; line-height:1.15; text-align:center; transition:.18s; }
        .league-card img { object-fit:contain; }
        .league-card:hover,.league-card.selected { border-color:#aee86e; color:#f4f6f1; background:rgba(174,232,110,.08); transform:translateY(-1px); }
        .club-step { margin-top:23px; }
        .club-search { display:flex; position:relative; margin-bottom:10px; }
        .club-search>span { position:absolute; z-index:1; left:13px; top:9px; color:#aee86e; font-size:20px; }
        .club-search input { padding-left:39px; }
        .club-grid { max-height:255px; overflow:auto; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:7px; padding-right:4px; }
        .club-card { min-height:66px; padding:9px; color:rgba(244,246,241,.7); border:1px solid rgba(255,255,255,.075); border-radius:10px; background:rgba(255,255,255,.02); display:flex; align-items:center; gap:8px; cursor:pointer; text-align:left; font-size:10px; line-height:1.25; }
        .club-card:hover,.club-card.selected { border-color:rgba(174,232,110,.72); background:rgba(174,232,110,.07); color:#fff; }
        .crest { width:42px; height:42px; flex:0 0 42px; display:grid; place-items:center; border-radius:8px; background:rgba(255,255,255,.06); }
        .crest img { max-width:34px; max-height:34px; width:auto; height:auto; object-fit:contain; }
        .club-card>span:nth-child(2) { flex:1; }
        .password-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .password-input { position:relative; display:block; }
        .password-input input { padding-right:55px; }
        .password-input button { position:absolute; right:5px; top:5px; bottom:5px; background:transparent; border:0; color:#aee86e; font-size:10px; cursor:pointer; }
        .strength { display:grid; grid-template-columns:repeat(4,1fr); gap:4px; }
        .strength i { height:2px; border-radius:2px; background:rgba(255,255,255,.09); }
        .strength i.on { background:#aee86e; }
        .message { padding:11px 13px; margin-bottom:14px; border-radius:9px; font-size:12px; }
        .message.error { color:#ff9b9b; background:rgba(255,85,85,.08); border:1px solid rgba(255,85,85,.2); }
        .message.success { color:#b9f27a; background:rgba(174,232,110,.08); border:1px solid rgba(174,232,110,.2); }
        .submit { width:100%; padding:14px; border:0; border-radius:10px; background:#aee86e; color:#08100b; font:700 11px "JetBrains Mono",monospace; letter-spacing:.7px; cursor:pointer; box-shadow:0 9px 30px rgba(129,198,65,.18); }
        .submit:hover { background:#c2f28b; transform:translateY(-1px); }
        .submit:disabled { opacity:.55; cursor:wait; }
        .login-link { text-align:center; margin-top:20px; color:rgba(244,246,241,.38); font-size:11px; }
        .login-link a { color:#aee86e; font-weight:600; }
        @media(max-width:1000px) { .signup-page{padding:0}.signup-shell{display:block;border-radius:0;min-height:100vh}.signup-story{display:none}.mobile-brand{display:flex;margin-bottom:35px}.form-panel{max-width:760px;margin:auto}.league-grid{grid-template-columns:repeat(5,1fr)} }
        @media(max-width:650px) { .form-panel{padding:28px 18px}.role-grid,.password-row{grid-template-columns:1fr}.league-grid{grid-template-columns:repeat(2,1fr)}.league-card{flex-direction:row;justify-content:flex-start;text-align:left;padding:10px}.club-grid{grid-template-columns:1fr 1fr}.form-heading h2{font-size:29px} }
        @media(max-width:420px) { .club-grid{grid-template-columns:1fr} }
      `}</style>
    </main>
  );
}
