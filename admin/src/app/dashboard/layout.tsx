import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export default function DashboarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-2">
      <Navbar />
      <div className="flex gap-2 h-full">
        <Sidebar />
        <div className="w-[1px] bg-secondary-foreground opacity-20"></div>
        <div className="flex-1 h-full">{children}</div>
      </div>
    </main>
  );
}
