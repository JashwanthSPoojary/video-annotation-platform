import AnnotatedVideosList from "@/components/features/dashboard/AnnotatedVideosList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Video Annotation Dashboard</h1>
      <div className="mb-6">
        <Button asChild>
          <Link href="/dashboard/add-video">Add a Video to Annotate</Link>
        </Button>
      </div>
      <AnnotatedVideosList />
    </div>
  );
}
