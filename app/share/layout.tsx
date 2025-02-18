export default async function VideoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <main className="flex-grow bg-gray-50">{children}</main>
    </div>
  );
}
