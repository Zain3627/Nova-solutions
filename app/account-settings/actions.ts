"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export type AccountSettingsState =
  | { status: "success"; message: string }
  | { status: "error"; message: string }
  | undefined;

export async function updateAccountSettings(
  _previousState: AccountSettingsState,
  formData: FormData
): Promise<AccountSettingsState> {
  const displayName = String(formData.get("displayName") ?? "").trim();

  if (displayName.length < 2 || displayName.length > 60) {
    return { status: "error", message: "Display name must be between 2 and 60 characters." };
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
    },
  });

  if (error) {
    return { status: "error", message: "We could not save your settings. Please try again." };
  }

  return { status: "success", message: "Account settings saved." };
}

export async function updateThemePreference(theme: "dark" | "light") {
  if (theme !== "dark" && theme !== "light") {
    return { status: "error" as const, message: "Invalid theme preference." };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { status: "error" as const, message: "Please sign in again to save your theme." };
  }

  const { error } = await supabase.auth.updateUser({
    data: { ...user.user_metadata, theme },
  });

  if (error) {
    return { status: "error" as const, message: "Could not save your theme." };
  }

  const cookieStore = await cookies();
  cookieStore.set("nova-theme", theme, {
    path: "/",
    maxAge: 60 * 60 * 24 * 400,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    priority: "medium",
  });

  return { status: "success" as const };
}
