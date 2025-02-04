import { Analytics } from "@vercel/analytics/react";
// import { Footer } from "../components/Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="p-6 mb-64">
        <Analytics />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};
