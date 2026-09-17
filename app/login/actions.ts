"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email) return { error: "Please enter your email." };
  if (!password) return { error: "Please enter your password." };

  const supabase = await createClient();

  // A user may intentionally revisit /login to switch accounts. End only the
  // browser's current session before issuing the replacement session.
  await supabase.auth.signOut({ scope: "local" });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Invalid email or password." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const role = profile?.role ?? data.user.user_metadata.role;
  redirect(role === "fan" ? "/fan" : "/coach");
}
