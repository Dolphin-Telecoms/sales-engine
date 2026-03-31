"use client";

import AppBar from "@/src/components/AppBar";
import Container from "@/src/components/Container";
import Stepper from "@/src/components/Stepper";
import PlanSummary from "@/src/components/SummaryPlan";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

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
  const search = useSearchParams();

  console.log("pathname :: ", pathname);

  useEffect(() => {
    if (pathname === "/home-internet/plan") {
      const data: ItemType[] = [];
      data.push({
        id: "service",
        title: "Home Internet",
        subtitle: "Selected service",
        icon: "🏠",
      });
      if (search.get("location")) {
        data.push({
          id: "address",
          title: `${search.get("location")}`,
          subtitle: "Service address",
          icon: "📍",
        });
      }
      setItems([...data]);
    } else if (pathname === "/home-internet") {
      setItems([]);
    }

    if (
      search.get("location") &&
      search.get("label") &&
      search.get("value") &&
      search.get("type")
    ) {
      const price: PriceType[] = [];
      price.push({
        label: `${search.get("label")}`,
        value: parseInt(`${search.get("value")}`),
        type: `${search.get("type")}`,
      });
      setPricing([...price]);
    } else if (pathname === "/home-internet") {
      setPricing([]);
    }
  }, [pathname, search]);

  return (
    <>
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
    </>
  );
}
