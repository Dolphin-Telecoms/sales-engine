"use client";

import AppBar from "@/src/components/AppBar";
import { Suspense } from "react";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <AppBar />
      <div className="text-center pt-[70px] lg:pt-[93px] min-h-0" />
      <div className="bg-gray-100 pt-6 min-h-[100vh]">{children}</div>
    </Suspense>
  );
}
