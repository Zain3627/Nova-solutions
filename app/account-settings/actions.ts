"use server";

import { createClient } from "@/lib/supabase/server";

export type AccountSettingsState =
  | { status: "success"; message: string }
  | { status: "error"; message: string }
  | undefined;

const supportedLanguages = new Set(["English", "Arabic", "French", "Spanish"]);

export async function updateAccountSettings(
  _previousState: AccountSettingsState,
  formData: FormData
): Promise<AccountSettingsState> {
  const displayName = String(formData.get("displayName") ?? "").trim();
  const jobTitle = String(formData.get("jobTitle") ?? "").trim();
  const language = String(formData.get("language") ?? "English");
  const matchAlerts = formData.get("matchAlerts") === "on";

  if (displayName.length < 2 || displayName.length > 60) {
    return { status: "error", message: "Display name must be between 2 and 60 characters." };
  }

  if (jobTitle.length > 60) {
    return { status: "error", message: "Role or title must be 60 characters or fewer." };
  }

  if (!supportedLanguages.has(language)) {
    return { status: "error", message: "Please choose a supported language." };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { status: "error", message: "Your session expired. Please sign in again." };
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      ...user.user_metadata,
      display_name: displayName,
      job_title: jobTitle,
      language,
      match_alerts: matchAlerts,
    },
  });

  if (error) {
    return { status: "error", message: "We could not save your settings. Please try again." };
  }

  return { status: "success", message: "Account settings saved." };
}
