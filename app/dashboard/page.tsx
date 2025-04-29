import AnnotatedVideosList from "@/components/features/dashboard/AnnotatedVideosList";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/dasbord')
  }
  const userId = session.user.id
  

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button asChild>
          <Link href="/dashboard/add-video">Add a Video to Annotate</Link>
        </Button>
      </div>
      <AnnotatedVideosList id={userId}  />
    </div>
  );
}
