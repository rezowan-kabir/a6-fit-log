import { notFound } from "next/navigation";
import WorkoutDetailsClient from "./WorkoutDetailsClient";
import { getWorkoutById } from "@/utils/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetailsClient workout={workout} />;
}
