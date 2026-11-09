export type PlayerPosition = "G" | "D" | "M" | "F";

export const POSITIONS: { value: PlayerPosition; label: string }[] = [
  { value: "G", label: "Goalkeeper" },
  { value: "D", label: "Defender" },
  { value: "M", label: "Midfielder" },
  { value: "F", label: "Forward" },
];

export function isPosition(value: string): value is PlayerPosition {
  return POSITIONS.some((p) => p.value === value);
}

export type PreferredFoot = "Left" | "Right" | "Both";

export const FEET: PreferredFoot[] = ["Right", "Left", "Both"];

export function isFoot(value: string): value is PreferredFoot {
  return (FEET as string[]).includes(value);
}

export type PlayerBio = {
  player_id: number;
  player_name: string;
  team_id: number;
  team_name: string;
  player_position: PlayerPosition | null;
  player_date_of_birth: string | null;
  player_preferred_foot: PreferredFoot | null;
  player_country_name: string | null;
};

export const PLAYER_BIO_SELECT = [
  "player_id",
  "player_name",
  "team_id",
  "team_name",
  "player_position",
  "player_date_of_birth",
  "player_preferred_foot",
  "player_country_name",
].join(",");

export function ageFromDob(dob: string | null): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hasHadBirthdayThisYear) age--;
  return age;
}
