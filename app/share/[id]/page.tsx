import { VideoPlayer } from "@/components/features/share/VideoPlayer";
import { AnnotationsPanel } from "@/components/features/share/AnnotationsPanel";
import { prisma } from "@/lib/prisma";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const video = await prisma.video.findUnique({
    where: { id },
    include:{
      annotations:{
        orderBy:{
          time:"asc"
        }
      }
    }
  });
  if (!video) {
    return <div>Video not found</div>;
  }
  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
      <main className="flex-grow flex flex-col md:flex-row gap-6 p-4 md:p-6">
        <VideoPlayer video={video} />
        <AnnotationsPanel videoId={video.id} initialAnnotations={video.annotations}  />
      </main>
    </div>
  );
}
