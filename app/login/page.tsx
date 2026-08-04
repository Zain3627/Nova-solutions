"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="login-root">
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

        <h1>WELCOME BACK</h1>
        <p className="subtitle">Sign in to your tactical command center.</p>

        <form action={formAction} noValidate>
          <div className="field">
            <label>Email Address</label>
            <div className="input-wrap">
              <span className="ico">✉</span>
              <input type="email" name="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="field">
            <div className="field-row">
              <label>Password</label>
              <a className="forgot" href="#">
                Forgot password?
              </a>
            </div>
            <div className="input-wrap">
              <span className="ico">🔒</span>
              <input
                type={showPw ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
              />
              <button className="toggle-pw" type="button" onClick={() => setShowPw((v) => !v)}>
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {state?.error && (
            <div className="form-error" role="alert">
              <span className="ico">⚠</span> {state.error}
            </div>
          )}

          <button className="cta" type="submit" disabled={pending}>
            {pending ? "SIGNING IN…" : "SIGN IN →"}
          </button>
        </form>

        <p className="signin-link">
          Don&apos;t have an account? <Link href="/signup">Create one</Link>
        </p>
      </div>

      <style jsx>{`
        .login-root {
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

        .field {
          margin-bottom: 14px;
        }

        .field-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
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

        .forgot {
          font-size: 11px;
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
        }
        .forgot:hover {
          text-decoration: underline;
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

        .form-error {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 6px;
          padding: 11px 13px;
          background: rgba(224, 80, 80, 0.1);
          border: 1px solid rgba(224, 80, 80, 0.35);
          border-radius: 10px;
          color: #ff8a8a;
          font-size: 12.5px;
          line-height: 1.4;
          animation: fadeUp 0.25s ease both;
        }

        .form-error .ico {
          flex-shrink: 0;
          font-size: 13px;
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
        .cta:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
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
      `}</style>
    </div>
  );
}
