import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AnnotationsButton from "./AnnotationsButton";

export default async function AnnotatedVideosList() {

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/dasbord')
  }
  const userId = session.user.id

  const annotatedVideos = await prisma.video.findMany({
    where:{userId},
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { annotations: true },
      },
    },
  });
  const videos = annotatedVideos.map((video) => ({
    id: video.id,
    title: video.title,
    duration: (video as any).duration || "N/A",
    annotationCount: video._count.annotations,
  }));
  
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Annotated Videos</CardTitle>
          <CardDescription>View and manage your annotated videos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 grid gap-4 overflow-y-auto">
            {videos.map((video) => (
              <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="text-sm text-gray-500">Duration: {video.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{video.annotationCount} annotations</p>
                  <AnnotationsButton videoId={video.id} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">View All Annotated Videos</Button>
        </CardFooter>
      </Card>
    )
  }