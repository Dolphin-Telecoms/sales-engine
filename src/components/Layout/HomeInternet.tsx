"use client";

import getAttributeValues from "@/src/components/Layout/apis/getAttributeValue";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AttributeValue } from "@/src/types";
interface ItemType {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  value?: string;
}

interface PriceType {
  label: string;
  value: number;
  type?: string;
}

interface LayoutType {
  setItems: (event: ItemType[]) => void;
  setPricing: (event: PriceType[]) => void;
}

export default function Layout({ setItems, setPricing }: LayoutType) {
  const pathname = usePathname();
  const search = useSearchParams();

  const getProductAttribute = async (attributeIds: number[]) => {
    const { status, data } = await getAttributeValues(attributeIds);

    if (status && data) {
      console.log("data ", data);
      const values = [];

      values.push({
        id: "service",
        title: "Home Internet",
        subtitle: "Selected service",
        icon: "🏠",
      });
      if (search.get("location")) {
        values.push({
          id: "address",
          title: `${search.get("location")}`,
          subtitle: "Service address",
          icon: "📍",
        });
      }
      if (search.get("childCategoryName")) {
        values.push({
          id: `${search.get("childCategory")}`,
          title: `${search.get("childCategoryName")}`,
          subtitle: "Connection type",
          icon: "📡",
        });
      }

      const newItem = {
        id: "product",
        title: `${search.get("productName")}`,
        subtitle: `${formatPlan(data)}`,
        value: `$${search.get("price")}/mo`,
        icon: "📦",
      };
      // ✅ Insert if not found
      values.push(newItem);

      console.log(values);

      setItems(values);
    }
  };

  const formatPlan = (data: AttributeValue[]): string => {
    let amount = "";
    let speed = "";

    for (const item of data) {
      const attributeName = item.attribute_id[1];

      if (attributeName.toLowerCase() === "amount") {
        amount = item.name;
      }

      if (attributeName.toLowerCase() === "speed") {
        speed = item.name;
      }
    }

    return [amount, speed].filter(Boolean).join(" / ");
  };

  useEffect(() => {
    if (
      pathname === "/home-internet/plan" ||
      pathname === "/home-internet/extras" ||
      pathname === "/home-internet/equipment" ||
      pathname === "/home-internet/review"
    ) {
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
      if (search.get("childCategoryName")) {
        data.push({
          id: `${search.get("childCategory")}`,
          title: `${search.get("childCategoryName")}`,
          subtitle: "Connection type",
          icon: "📡",
        });
      }
      if (
        search.get("productName") &&
        search.get("product") &&
        search.get("price")
      ) {
        data.push({
          id: "product",
          title: `${search.get("productName")}`,
          subtitle: ``,
          value: `$${search.get("price")}/mo`,
          icon: "📦",
        });
      } 
      if (
        search.get("productName") &&
        search.get("product") &&
        search.get("price") &&
        search.get("attribute")
      ) {
        getProductAttribute(JSON.parse(`${search.get("attribute")}`));
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
  return <></>;
}
