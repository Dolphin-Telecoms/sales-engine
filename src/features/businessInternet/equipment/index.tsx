"use client";

import { redirect, useSearchParams, useRouter } from "next/navigation";

export default function EquipmentSetup() {
  const search = useSearchParams();
  const router = useRouter();

  return (
    <div className="w-full lg:max-w-3xl bg-white rounded-xl p-4 xl:p-8 shadow-sm">
      {/* Header */}
      <h1 className="font-exo font-bold text-[24px] lg:text-[34px] leading-[1.2] tracking-normal mb-2">
        Equipment & Setup
      </h1>
      <p className="font-exo font-normal text-[12px] lg:text-[14px] leading-[1] tracking-normal text-[#2C6176]">
        Your ONT is included with Fibre installation – no router purchase
        required.
      </p>

      {/* Card */}
      <div className="mt-6 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] p-5">
        <div className="flex items-start lg:items-center gap-4">
          {/* Icon */}
          <div className="flex p-4 text-3xl items-center justify-center rounded-lg bg-[#FFFFFF]">
            📦
          </div>

          {/* Content */}
          <div>
            <h2 className="font-exo font-bold text-[20px] leading-[1.2] tracking-normal">
              ONT Device
            </h2>
            <p className="font-exo font-normal text-[14px] leading-[1.2] tracking-normal mt-2 text-[#6B7280]">
              Your ONT (Optical Network Terminal) is included with your fibre
              installation at no additional cost. Our technician will install
              and configure it during your scheduled visit.
            </p>
            <p className="mt-2 font-exo font-bold text-[14px] leading-[1] tracking-normal text-[#16A34A]">
              Included with installation
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-[1px] w-full bg-[#E5E7EB]" />

      {/* Buttons */}
      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <button
          className="px-6 py-3 border-3 border-[#1f4d5a] rounded-lg"
          onClick={() => {
            if (
              search.get("location") &&
              search.get("label") &&
              search.get("value") &&
              search.get("type")
            ) {
              router.push(
                `/business-internet/extras?businesstype=${search.get("businesstype")}&location=${search.get("location")}&label=${search.get("label")}&value=${search.get("value")}&type=${search.get("type")}`,
              );
            }
          }}
        >
          Back
        </button>
        <button
          className="px-6 py-3 bg-[#1f4d5a] text-white rounded-lg"
          onClick={() => {
            if (
              search.get("location") &&
              search.get("label") &&
              search.get("value") &&
              search.get("type")
            ) {
              router.push(
                `/business-internet/review?businesstype=${search.get("businesstype")}&location=${search.get("location")}&label=${search.get("label")}&value=${search.get("value")}&type=${search.get("type")}`,
              );
            }
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
