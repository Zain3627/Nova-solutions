"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/lib/auth-actions";
import styles from "./coach.module.css";

const navigation = [
  { href: "/coach", label: "Overview", icon: "⌂" },
  { href: "/coach/scouting", label: "Scouting", icon: "◎" },
  { href: "/coach/tactical-analysis", label: "Tactical analysis", icon: "◇" },
];

export function CoachSidebar({
  email,
  clubName,
  clubId,
}: {
  email: string;
  clubName: string;
  clubId: string;
}) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <Link href="/coach" className={styles.brand}>
        <span className={styles.brandMark}>N</span>
        <span>NOVA <b>SOLUTION</b></span>
      </Link>

      <div className={styles.clubIdentity}>
        <span className={styles.clubCrest}>
          {clubId ? (
            <Image src={`/club-icons/${clubId}.png`} alt="" width={48} height={48} />
          ) : (
            "FC"
          )}
        </span>
        <span><small>COACHING FOR</small><b>{clubName}</b></span>
      </div>

      <nav className={styles.nav} aria-label="Coach workspace">
        <span className={styles.navLabel}>WORKSPACE</span>
        {navigation.map((item) => {
          const active = item.href === "/coach"
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? styles.navActive : undefined}
              aria-current={active ? "page" : undefined}
            >
              <i>{item.icon}</i><span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarBottom}>
        <div className={styles.userBlock}>
          <span>{email.slice(0, 1).toUpperCase()}</span>
          <div><b>Head coach</b><small>{email}</small></div>
        </div>
        <form action={signOutAction}>
          <button type="submit" className={styles.signOut}>Sign out ↗</button>
        </form>
      </div>
    </aside>
  );
}
