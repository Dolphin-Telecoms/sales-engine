"use client";

import { Suspense } from "react";
import Layout from "@/src/components/Layout/BusinessInternet";

export const dynamic = "force-dynamic";

export default function BusinessInternetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <Layout>{children}</Layout>
    </Suspense>
  );
}
