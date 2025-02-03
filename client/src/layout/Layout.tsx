import { Navbar } from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6">
      <Analytics />
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
};
