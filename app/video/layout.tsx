import { Navbar } from "@/components/common/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function VideoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }
  const user = session.user;
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <header className="border-b">
        <Navbar users={user} />
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
