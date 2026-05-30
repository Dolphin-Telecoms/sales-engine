"use client";

import { Suspense } from "react";
import Layout from "@/src/components/BusinessPaymentLayout";

export default function HomeInternetLayout({
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
