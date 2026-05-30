"use client";

import Layout from "@/src/components/HomePaymentLayout";

export default function HomeInternetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
