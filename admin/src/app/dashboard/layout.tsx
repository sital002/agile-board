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
      <div className="flex gap-2">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
