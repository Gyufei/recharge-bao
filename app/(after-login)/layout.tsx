import { Navbar } from '@/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Navbar />
      {children}
    </div>
  );
}
