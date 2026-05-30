"use client";

import Image from "next/image";
import getAttributeValues from "@/src/components/Layout/apis/getAttributeValue";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AttributeValue } from "@/src/types";
import { getVouchers } from "@/src/components/Layout/apis/getVouchers";
import AppBar from "@/src/components/AppBar";
import Container from "@/src/components/Container";
import PlanSummary from "@/src/components/SummaryPlan";
import { useState, Suspense } from "react";

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const search = useSearchParams();
  const [items, setItems] = useState<ItemType[]>([]);
  const [pricing, setPricing] = useState<PriceType[]>([]);

  const getProductAttribute = async (attributeIds: number[]) => {
    const { status, data } = await getAttributeValues(attributeIds);

    if (status && data) {
      const values = [];

      values.push({
        id: "service",
        title: "Business Internet",
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

      if (search.get("productName") && search.get("price")) {
        const newItem = {
          id: "product",
          title: `${search.get("productName")}`,
          subtitle: `${formatPlan(data)}`,
          value: `$${search.get("price")}/mo`,
          icon: "📦",
        };
        // ✅ Insert if not found
        values.push(newItem);
      }

      if (search.get("voucher")) {
        const { status: voucherStatus, data: vouchers } = await getVouchers();
        if (voucherStatus && vouchers) {
          vouchers.map((item) => {
            const voucher = JSON.parse(`${search.get("voucher")}`);
            const isSelected = voucher.find((v: any) => v.id === item.id);
            if (isSelected) {
              values.push({
                id: `voucher-${item.id}`,
                title: `${item.name}`,
                subtitle: `${item.metadata.group.charAt(0).toUpperCase() + item.metadata.group.slice(1).toLowerCase()} Voucher`,
                icon: (
                  <Image
                    src={item.metadata.logo_url}
                    alt={item.name}
                    height={40}
                    width={40}
                  />
                ),
                value: `$${Number(isSelected.price).toFixed(2)}`,
              });
            }
          });
        }
      }

      if (search.get("equipmentName") && search.get("equipmentId")) {
        values.push({
          id: `equipment`,
          title: `${search.get("equipmentName")} ${search.get("productNameEquipment")}`,
          subtitle: `Equipment`,
          icon: `🛜`,
          value: search.get("priceEquipment")
            ? `$${search.get("priceEquipment")}`
            : `Included`,
        });
      }

      setItems(values);
    } else {
      const values = [];

      values.push({
        id: "service",
        title: "Business Internet",
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

      if (search.get("voucher")) {
        const { status: voucherStatus, data: vouchers } = await getVouchers();
        if (voucherStatus && vouchers) {
          vouchers.map((item) => {
            const voucher = JSON.parse(`${search.get("voucher")}`);
            const isSelected = voucher.find((v: any) => v.id === item.id);
            if (isSelected) {
              values.push({
                id: `voucher-${item.id}`,
                title: `${item.name}`,
                subtitle: `${item.metadata.group.charAt(0).toUpperCase() + item.metadata.group.slice(1).toLowerCase()} Voucher`,
                icon: (
                  <Image
                    src={item.metadata.logo_url}
                    alt={item.name}
                    height={40}
                    width={40}
                  />
                ),
                value: `$${Number(isSelected.price).toFixed(2)}/mo`,
              });
            }
          });
        }
      }

      if (search.get("equipmentName") && search.get("equipmentId")) {
        values.push({
          id: `equipment`,
          title: `${search.get("equipmentName")} ${search.get("productNameEquipment")}`,
          subtitle: `Equipment`,
          icon: `🛜`,
          value: search.get("priceEquipment")
            ? `$${search.get("priceEquipment")}/mo`
            : `Included`,
        });
      }

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
      pathname === "/business-internet/payment-success/echocash" ||
      pathname === "/business-internet/checkout"
    ) {
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

      getProductAttribute(JSON.parse(`${search.get("attribute")}`));

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
  return (
    <Suspense>
      <AppBar />
      <div className="bg-gray-100 pt-6 min-h-[100vh]">
        <Container className="grid grid-cols-1 gap-y-6 gap-x-6 xl:gap-0 lg:grid-cols-12 justify-between">
          <div className="lg:col-span-8">{children}</div>
          <div className="lg:col-span-4">
            <PlanSummary items={items} pricing={pricing} />
          </div>
        </Container>
      </div>
    </Suspense>
  );
}
