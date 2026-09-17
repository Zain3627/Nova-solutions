"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  COACH_LEAGUE_VALUES,
  type LeagueValue,
} from "@/lib/leagues";
import { getClubsForLeague } from "@/lib/clubs";

export type SignupState =
  | { error?: string; success?: string }
  | undefined;

export async function signupAction(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const role = formData.get("role") === "pro" ? "pro" : "fan";
  const league = String(formData.get("league") ?? "");
  const clubId = String(formData.get("club_id") ?? "");

  if (!email) return { error: "Please enter your email." };
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirm) return { error: "Passwords do not match." };

  if (role === "pro") {
    if (
      !COACH_LEAGUE_VALUES.includes(
        league as (typeof COACH_LEAGUE_VALUES)[number]
      )
    ) {
      return { error: "Please select a league." };
    }
    const club = getClubsForLeague(league as LeagueValue).find(
      (entry) => entry.id === clubId
    );
    if (!club) return { error: "Please select your club." };
  }

  const supabase = await createClient();
  const selectedClub =
    role === "pro"
      ? getClubsForLeague(league as LeagueValue).find(
          (entry) => entry.id === clubId
        )
      : undefined;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data:
        role === "pro"
          ? {
              role,
              club_id: selectedClub!.id,
              club_name: selectedClub!.name,
              league,
            }
          : { role },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return {
      success:
        "Account created. Check your email to confirm it, then sign in.",
    };
  }

  redirect(role === "fan" ? "/fan" : "/coach");
}
