import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { FanOverviewView } from "./fan-overview-view";

export default async function FanOverviewPage() {
  const user = await verifySession();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "fan") {
    redirect("/");
  }

  const displayName = String(user.user_metadata?.display_name ?? user.email?.split("@")[0] ?? "Fan");
  const firstName = displayName.split(/[._\s-]/)[0].replace(/^./, (c) => c.toUpperCase());
  const initialTheme =
    user.user_metadata?.theme === "light" || user.user_metadata?.theme === "dark"
      ? user.user_metadata.theme
      : undefined;

  return (
    <FanOverviewView
      firstName={firstName}
      email={user.email ?? "Fan"}
      displayName={displayName}
      initialTheme={initialTheme}
    />
  );
}
