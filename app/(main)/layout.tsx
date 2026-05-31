"use client";

import AppBar from "@/src/components/AppBar";

export default function ConnectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
