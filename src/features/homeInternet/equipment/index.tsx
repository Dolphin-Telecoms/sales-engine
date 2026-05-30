"use client";

import { redirect, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { EquipmentCategory } from "@/src/types";
import { getEquipment } from "@/src/features/businessInternet/apis/getEquipment";
import EquipmentVariant from "@/src/features/businessInternet/equipment/equipmentVariant";

export default function EquipmentSetup() {
  const search = useSearchParams();

  if (!search.get("homeCategory")) {
    redirect("/connect");
  } else if (
    !search.get("location") ||
    !search.get("services") ||
    !search.get("coordinates") ||
    !search.get("city")
  ) {
    redirect(`/home-internet?homeCategory=${search.get("homeCategory")}`);
  } else if (
    !search.get("childCategory") ||
    !search.get("childCategoryName") ||
    !search.get("product") ||
    !search.get("price")
  ) {
    redirect(
      `/home-internet/plan?homeCategory=${search.get("homeCategory")}&location=${search.get("location")}&services=${search.get("services")}&coordinates=${search.get("coordinates")}&city=${search.get("city")}`,
    );
  } else {
    const router = useRouter();
    const searchParams = Object.fromEntries(search.entries());
    const params = new URLSearchParams(searchParams);
    const [loading, setLoading] = useState(true);
    const [equipment, setEquipment] = useState<EquipmentCategory | null>(null);

    const getProductEquipments = async () => {
      try {
        setLoading(true);
        const res = await getEquipment(
          search.get("homeCategory") || "",
          search.get("childCategoryName") ?? "",
          search.get("product") ?? "",
        );
        if (res.status) {
          setEquipment(res.data as EquipmentCategory);
        } else {
          setEquipment(null);
        }
      } catch (error) {
        console.error("Error fetching equipment:", error);
        setEquipment(null);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getProductEquipments();
    }, []);

    const handleSubmit = async () => {
      params.set("equipmentName", `${equipment?.name}`);
      params.set("equipmentId", `${equipment?.id}`);
      router.push(`/home-internet/review?${params.toString()}`);
    };

    return (
      <div className="w-full lg:max-w-3xl bg-white rounded-xl p-4 xl:p-8 shadow-sm">
        {/* Header */}
        <h1 className="font-exo font-bold text-[24px] lg:text-[34px] leading-[1.2] tracking-normal mb-2">
          Equipment & Setup
        </h1>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-3 lg:h-4 w-full bg-gray-300 rounded"></div>
            <div className="mt-2 h-3 lg:h-4 w-5/6 bg-gray-300 rounded"></div>
          </div>
        ) : (
          <p className="font-exo font-normal text-[12px] lg:text-[14px] leading-[1] tracking-normal text-[#2C6176]">
            Your {equipment?.name} is included with{" "}
            {search.get("childCategoryName")} installation – no router purchase
            required.
          </p>
        )}

        {/* Card */}
        {loading ? (
          <div className="mt-6 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] p-5 animate-pulse">
            <div className="flex items-start lg:items-center gap-4">
              {/* Icon Skeleton */}
              <div className="flex p-4 items-center justify-center rounded-lg bg-white">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>

              {/* Content Skeleton */}
              <div className="flex-1">
                {/* Title */}
                <div className="h-5 w-40 bg-gray-300 rounded"></div>

                {/* Description lines */}
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full bg-gray-300 rounded"></div>
                  <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
                  <div className="h-3 w-4/6 bg-gray-300 rounded"></div>
                </div>

                {/* Bottom text */}
                <div className="mt-3 h-3 w-36 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ) : Array.isArray(equipment?.products) &&
          equipment?.products.length > 0 ? (
          <EquipmentVariant categories={[equipment]} />
        ) : (
          <div className="mt-6 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] p-5">
            <div className="flex items-start lg:items-center gap-4">
              {/* Icon */}
              <div className="flex p-4 text-3xl items-center justify-center rounded-lg bg-[#FFFFFF]">
                📦
              </div>

              {/* Content */}
              <div>
                <h2 className="font-exo font-bold text-[20px] leading-[1.2] tracking-normal">
                  {equipment?.name}
                </h2>
                <p className="font-exo font-normal text-[14px] leading-[1.2] tracking-normal mt-2 text-[#6B7280]">
                  Your {equipment?.name} is included with your&nbsp;
                  {search.get("childCategoryName")}&nbsp;installation at no
                  additional cost. Our technician will install and configure it
                  during your scheduled visit.
                </p>
                <p className="mt-2 font-exo font-bold text-[14px] leading-[1] tracking-normal text-[#16A34A]">
                  Included with installation
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="my-6 h-[1px] w-full bg-[#E5E7EB]" />

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <button
            className="px-6 py-3 border-3 border-[#1f4d5a] rounded-lg"
            onClick={() => {
              router.push(`/home-internet/extras?${params.toString()}`);
            }}
          >
            Back
          </button>
          <button
            className="px-6 py-3 bg-[#1f4d5a] text-white rounded-lg"
            disabled={loading}
            onClick={() => {
              handleSubmit();
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }
}
