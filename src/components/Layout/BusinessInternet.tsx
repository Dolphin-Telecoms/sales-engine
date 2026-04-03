"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

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

interface LayoutType {
  setItems: (event: ItemType[]) => void;
  items: ItemType[];
  setPricing: (event: PriceType[]) => void;
  pricing: PriceType[];
}

export default function Layout({
  setItems,
  items,
  setPricing,
  pricing,
}: LayoutType) {
  const pathname = usePathname();
  const search = useSearchParams();

  console.log("pathname :: ", pathname);

  useEffect(() => {
    if (pathname === "/business-internet/plan") {
      const data: ItemType[] = [];
      data.push({
        id: "service",
        title: "Business Internet",
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
    } else if (pathname === "/business-internet") {
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
    } else if (pathname === "/business-internet") {
      setPricing([]);
    }
  }, [pathname, search]);
  return <></>;
}
