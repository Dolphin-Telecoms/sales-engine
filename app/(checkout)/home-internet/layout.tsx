"use client";

import Container from "@/src/components/Container";
import PlanSummary from "@/src/components/SummaryPlan";
import { useState } from "react";

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
    <Container className="grid grid-cols-1 gap-y-6 gap-x-6 xl:gap-0  lg:grid-cols-12 justify-between">
      <div className="lg:col-span-8">{children}</div>
      <div className="lg:col-span-4">
        <PlanSummary items={items} pricing={pricing} />
      </div>
    </Container>
  );
}
