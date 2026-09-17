"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });

  // Also remove stale/chunked auth cookies. This makes sign-out recover from
  // revoked refresh tokens instead of trapping the browser in a bad session.
  const cookieStore = await cookies();
  for (const cookie of cookieStore.getAll()) {
    if (cookie.name.startsWith("sb-") && cookie.name.includes("-auth-token")) {
      cookieStore.delete(cookie.name);
    }
  }

  redirect("/login");
}
