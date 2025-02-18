import { Navbar } from "@/components/common/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
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
    <div className="h-screen w-screen flex flex-col overflow-hidden">
        <header className="bg-gray-100 border-b">
        <Navbar users={user} />
        </header>
        <main className="flex-grow bg-gray-50">{children}</main>
    </div>
  );
}
