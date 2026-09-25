import WorkoutCard from "@/components/WorkoutCard";
import type { Iworkout } from "@/types/index";

const getWorkouts = async (): Promise<Iworkout[]> => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? (data as Iworkout[]) : [];
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
    return [];
  }
};

const Workouts = async () => {
  const workouts = await getWorkouts();

  return (
    <section className="px-4 md:px-8 py-10 bg-[#0e0f12] text-white">
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
          {workouts.map((item: Iworkout) => (
            <WorkoutCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workouts;
