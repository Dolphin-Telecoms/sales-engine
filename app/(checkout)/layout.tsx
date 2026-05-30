"use client";

import AppBar from "@/src/components/AppBar"; 
import { useState, Suspense } from "react";

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
      <AppBar />
      <div className="text-center pt-[70px] lg:pt-[93px] min-h-0" />
      <div className="bg-gray-100 pt-6 min-h-[100vh]">{children}</div>
    </Suspense>
  );
}
