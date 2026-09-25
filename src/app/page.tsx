import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";

export const dynamic = "force-dynamic";


export default function Page() {
  return (
    <div>
      <Hero />
      <LibrarySection />
    </div>
  );
}