import type { Iworkout } from "@/types/index";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkoutById(id: string): Promise<Iworkout | null> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as Iworkout;
}
