"use client";

import { useState, Suspense } from "react";
import Layout from "@/src/components/BusinessPaymentLayout";

interface ItemType {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface PriceType {
  label: string;
  value: number;
  type?: string;
}

export default function HomeInternetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [pricing, setPricing] = useState<PriceType[]>([]);

  return (
    <Suspense>
      <Layout>{children}</Layout>
    </Suspense>
  );
}
