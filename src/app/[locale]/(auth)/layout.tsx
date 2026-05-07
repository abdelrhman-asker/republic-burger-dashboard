// app/[locale]/(auth)/layout.tsx
import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center loginLayout px-4">
      <div className="w-full max-w-[748px] h-screen max-h-[639px]  rounded-2xl bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
}