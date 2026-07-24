"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Role = "fan" | "pro";
type Strength = "" | "weak" | "fair" | "good" | "strong";

export default function SignupPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("fan");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const strengthScore = (val: string) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const score = strengthScore(password);
  const levels: Strength[] = ["weak", "fair", "good", "strong"];
  const activeClass: Strength = score > 0 ? levels[score - 1] : "";

  const handleSubmit = () => {
    setError("");
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: replace with a real signup API call
    alert(
      `Welcome aboard, ${role === "fan" ? "Casual Fan" : "Professional"}! 🎉\nAccount created for ${email}`
    );
    router.push("/login");
  };

  return (
    <div className="signup-root">
      <div className="bg" />
      <div className="bg-pattern" />

      <div className="card">
        <div className="brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="#0b0e0c" strokeWidth="1.8" />
              <path d="M12 3 L14.5 8H9.5Z" fill="#0b0e0c" />
              <path d="M12 21 L9.5 16H14.5Z" fill="#0b0e0c" />
              <path d="M3 12 L8 9.5V14.5Z" fill="#0b0e0c" />
              <path d="M21 12 L16 14.5V9.5Z" fill="#0b0e0c" />
              <polygon points="12,9 14,12 12,15 10,12" fill="#0b0e0c" />
            </svg>
          </div>
          <span className="brand-name">NOVA SOLUTION</span>
        </div>

        <h1>CREATE ACCOUNT</h1>
        <p className="subtitle">Join the pitch. Choose your role below.</p>

        <div className="role-label">I am a</div>
        <div className="role-toggle">
          <div
            className={`role-btn ${role === "fan" ? "active" : ""}`}
            onClick={() => setRole("fan")}
          >
            <span className="role-icon">🏟️</span>
            <span className="role-title">Casual Fan</span>
            <span className="role-desc">Follow &amp; enjoy</span>
          </div>
          <div
            className={`role-btn ${role === "pro" ? "active" : ""}`}
            onClick={() => setRole("pro")}
          >
            <span className="role-icon">⚽</span>
            <span className="role-title">Professional</span>
            <span className="role-desc">Player / Coach</span>
          </div>
        </div>

        <div className="field">
          <label>Email Address</label>
          <div className="input-wrap">
            <span className="ico">✉</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Password</label>
          <div className="input-wrap">
            <span className="ico">🔒</span>
            <input
              type={showPw ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="toggle-pw" type="button" onClick={() => setShowPw((v) => !v)}>
              {showPw ? "🙈" : "👁"}
            </button>
          </div>
          <div className="strength-bar">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`strength-seg ${i < score ? activeClass : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="field">
          <label>Confirm Password</label>
          <div className="input-wrap">
            <span className="ico">🔒</span>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              className="toggle-pw"
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
            >
              {showConfirm ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {error && (
          <p style={{ color: "#e05050", fontSize: "12.5px", marginTop: "4px" }}>{error}</p>
        )}

        <button className="cta" onClick={handleSubmit}>
          JOIN THE GAME →
        </button>

        <p className="signin-link">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>

      <style jsx>{`
        .signup-root {
          --green: #1a6b2e;
          --lime: #a8e063;
          --white: #f5f5f0;
          --dark: #0b0e0c;
          --glass-bg: rgba(10, 20, 13, 0.62);
          --glass-border: rgba(168, 224, 99, 0.18);
          --input-bg: rgba(255, 255, 255, 0.07);
          --input-border: rgba(168, 224, 99, 0.25);
          --accent: #a8e063;

          font-family: "DM Sans", sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          background: var(--dark);
          position: relative;
          overflow: hidden;
        }

        .bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse at 30% 20%, rgba(26, 107, 46, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 75% 80%, rgba(168, 224, 99, 0.14) 0%, transparent 50%),
            linear-gradient(160deg, #0b0e0c 0%, #0e1a10 55%, #0b0e0c 100%);
        }

        .bg-pattern {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.05;
          background-image: repeating-linear-gradient(
              0deg,
              rgba(168, 224, 99, 0.5) 0px,
              transparent 1px,
              transparent 56px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(168, 224, 99, 0.5) 0px,
              transparent 1px,
              transparent 56px
            );
        }

        .card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 44px 40px 40px;
          backdrop-filter: blur(22px) saturate(1.4);
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(168, 224, 99, 0.06) inset;
          animation: fadeUp 0.6s ease both;
          margin: 24px;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }

        .brand-icon {
          width: 36px;
          height: 36px;
          background: var(--accent);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-icon svg {
          width: 22px;
          height: 22px;
        }

        .brand-name {
          font-family: "Bebas Neue", sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
          color: var(--white);
        }

        h1 {
          font-family: "Bebas Neue", sans-serif;
          font-size: 36px;
          letter-spacing: 1.5px;
          color: var(--white);
          line-height: 1;
          margin-bottom: 6px;
        }

        .subtitle {
          font-size: 13px;
          color: rgba(245, 245, 240, 0.45);
          margin-bottom: 28px;
          font-weight: 300;
        }

        .role-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(245, 245, 240, 0.5);
          margin-bottom: 10px;
        }

        .role-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 26px;
        }

        .role-btn {
          border: 1px solid var(--input-border);
          background: var(--input-bg);
          border-radius: 10px;
          padding: 14px 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: center;
          color: rgba(245, 245, 240, 0.55);
        }

        .role-btn .role-icon {
          font-size: 22px;
          display: block;
          margin-bottom: 5px;
        }

        .role-btn .role-title {
          font-size: 13px;
          font-weight: 600;
          display: block;
          color: inherit;
          transition: color 0.25s;
        }

        .role-btn .role-desc {
          font-size: 11px;
          opacity: 0.6;
          display: block;
          margin-top: 2px;
        }

        .role-btn:hover {
          border-color: rgba(168, 224, 99, 0.45);
          background: rgba(168, 224, 99, 0.06);
          color: var(--white);
        }

        .role-btn.active {
          border-color: var(--accent);
          background: rgba(168, 224, 99, 0.12);
          color: var(--accent);
          box-shadow: 0 0 16px rgba(168, 224, 99, 0.18);
        }

        .field {
          margin-bottom: 14px;
        }

        .field label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(245, 245, 240, 0.45);
          margin-bottom: 7px;
        }

        .input-wrap {
          position: relative;
        }

        .input-wrap .ico {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.35;
          pointer-events: none;
          font-size: 16px;
        }

        .input-wrap input {
          width: 100%;
          padding: 13px 14px 13px 40px;
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: 10px;
          color: var(--white);
          font-family: "DM Sans", sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .input-wrap input::placeholder {
          color: rgba(245, 245, 240, 0.25);
        }

        .input-wrap input:focus {
          border-color: var(--accent);
          background: rgba(168, 224, 99, 0.05);
        }

        .toggle-pw {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          opacity: 0.35;
          font-size: 14px;
          background: none;
          border: none;
          color: var(--white);
          transition: opacity 0.2s;
        }
        .toggle-pw:hover {
          opacity: 0.7;
        }

        .cta {
          margin-top: 22px;
          width: 100%;
          padding: 15px;
          background: var(--accent);
          color: var(--dark);
          font-family: "Bebas Neue", sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s, filter 0.2s;
          box-shadow: 0 6px 24px rgba(168, 224, 99, 0.28);
        }

        .cta:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
          box-shadow: 0 10px 30px rgba(168, 224, 99, 0.38);
        }
        .cta:active {
          transform: translateY(0);
        }

        .signin-link {
          text-align: center;
          margin-top: 18px;
          font-size: 12.5px;
          color: rgba(245, 245, 240, 0.4);
        }

        .signin-link :global(a) {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
        }
        .signin-link :global(a:hover) {
          text-decoration: underline;
        }

        .strength-bar {
          display: flex;
          gap: 4px;
          margin-top: 7px;
        }
        .strength-seg {
          flex: 1;
          height: 3px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.1);
          transition: background 0.3s;
        }
        .strength-seg.weak {
          background: #e05050;
        }
        .strength-seg.fair {
          background: #e0a050;
        }
        .strength-seg.good {
          background: var(--accent);
        }
        .strength-seg.strong {
          background: #50e088;
        }
      `}</style>
    </div>
  );
}
