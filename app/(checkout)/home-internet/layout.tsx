"use client";

import Layout from "@/src/components/Layout/HomeInternet";

export default function HomeInternetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
