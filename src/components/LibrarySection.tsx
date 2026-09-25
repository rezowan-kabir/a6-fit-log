import WorkoutCard from "@/components/WorkoutCard";
import type { Iworkout } from "@/types/index";

const WORKOUTS_API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkouts(): Promise<Iworkout[]> {
  try {
    const response = await fetch(WORKOUTS_API_URL, { cache: "no-store" });

    if (!response.ok) {
      return [];
    }

    const data: unknown = await response.json();
    return Array.isArray(data) ? (data as Iworkout[]) : [];
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
    return [];
  }
}

export default async function LibrarySection() {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="px-4 md:px-8 py-10 bg-[#0e0f12] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-(family-name:--font-bebas) text-white">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} item={workout} />
          ))}
        </div>
      </div>
    </section>
  );
}
