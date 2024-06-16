import Navbar from "./_components/navbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[100vh] dark:bg-[#0a0a0a]">
      <Navbar />
      <main className="h-full">{children}</main>
    </div>
  );
}
