"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LEAGUE_VALUES } from "@/lib/leagues";

export type SignupState = { error?: string } | undefined;

export async function signupAction(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const role = formData.get("role") === "pro" ? "pro" : "fan";
  const clubName = String(formData.get("club_name") ?? "").trim();
  const league = String(formData.get("league") ?? "");

  if (!email) return { error: "Please enter your email." };
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }
  if (password !== confirm) return { error: "Passwords do not match." };

  if (role === "pro") {
    if (!clubName) return { error: "Please enter your club name." };
    if (!LEAGUE_VALUES.includes(league as (typeof LEAGUE_VALUES)[number])) {
      return { error: "Please select a league." };
    }
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data:
        role === "pro" ? { role, club_name: clubName, league } : { role },
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(role === "fan" ? "/fan" : "/");
}
