import { COACH_LEAGUES } from "@/lib/leagues";
import { getClubsForLeague } from "@/lib/clubs";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  const leagues = COACH_LEAGUES.map((league) => ({
    value: league.value,
    label: league.label,
    icon: league.icon,
    clubs: getClubsForLeague(league.value),
  }));

  return <SignupForm leagues={leagues} />;
}
