"use client";

import AppBar from "@/src/components/AppBar";
import Container from "@/src/components/Container";
import Stepper from "@/src/components/Stepper";
import PlanSummary from "@/src/components/SummaryPlan";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import Layout from "@/src/components/Layout";

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
  const steps = [
    { label: "Service" },
    { label: "Location" },
    { label: "Plan" },
    { label: "Extras" },
    { label: "Equipment" },
    { label: "Review" },
  ];

  const [items, setItems] = useState<ItemType[]>([]);
  const [pricing, setPricing] = useState<PriceType[]>([]);
  const pathname = usePathname();

  console.log("pathname :: ", pathname);

  return (
    <Suspense>
      <AppBar />
      <div className="text-center pt-[93px] min-h-0" />
      <Stepper
        steps={steps}
        currentStep={
          pathname === "/home-internet"
            ? 1
            : pathname === "/home-internet/plan"
              ? 2
              : pathname === "/home-internet/extras"
                ? 3
                : pathname === "/home-internet/equipment"
                  ? 4
                  : pathname === "/home-internet/review"
                    ? 5
                    : 0
        }
      />
      <div className="bg-gray-100 pt-6 min-h-[100vh]">
        <Container className="grid grid-cols-12 justify-between">
          <div className="col-span-8">{children}</div>
          <div className="col-span-4">
            <PlanSummary items={items} pricing={pricing} />
          </div>
        </Container>
      </div>
      <Layout
        setItems={setItems}
        items={items}
        pricing={pricing}
        setPricing={setPricing}
      />
    </Suspense>
  );
}
