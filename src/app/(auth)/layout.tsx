import { Toaster } from "sonner";

// src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster richColors position="top-right" />
      {children}
    </div>
  );
}
