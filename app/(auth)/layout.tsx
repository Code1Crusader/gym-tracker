"use client";
import { SessionProvider } from "next-auth/react";
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <div className='w-full max-w-md h-full'>{children}</div>
    </SessionProvider>
  );
}
