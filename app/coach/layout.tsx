import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { CoachSidebar } from "./sidebar";
import styles from "./coach.module.css";

export default async function CoachLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await verifySession();
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "fan") redirect("/fan");
  if (profile?.role !== "pro") redirect("/");

  const metadata = user.user_metadata ?? {};

  return (
    <div className={styles.shell}>
      <CoachSidebar
        email={user.email ?? "Coach"}
        clubName={String(metadata.club_name ?? "Your club")}
        clubId={String(metadata.club_id ?? "")}
        displayName={String(metadata.display_name ?? user.email?.split("@")[0] ?? "Coach")}
        initialTheme={metadata.theme === "light" || metadata.theme === "dark" ? metadata.theme : undefined}
      />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
