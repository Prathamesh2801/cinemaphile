import { Navbar } from "../components/Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6">
      <Navbar />
      <main className="flex-1 p-2">{children}</main>
    </div>
  );
};
