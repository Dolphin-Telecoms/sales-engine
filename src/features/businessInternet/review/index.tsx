"use client";

import { useState } from "react";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { redirect, useSearchParams, useRouter } from "next/navigation";

export default function ReviewPlan() {
  const search = useSearchParams();
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <div className="w-full lg:max-w-3xl bg-white rounded-xl p-4 xl:p-8 shadow-sm">
      {/* Header */}
      <h1 className="font-exo font-bold text-[24px] lg:text-[34px] leading-[1.2] tracking-normal">
        Review Your Business Plan
      </h1>
      <p className="font-exo font-normal text-[12px] lg:text-[14px] leading-[1] tracking-normal text-[#2C6176] mt-3">
        Transparent pricing. Secure checkout. Support available.
      </p>

      {/* Selection */}
      <div className="mt-6">
        <h2 className="font-exo font-bold text-[20px] leading-[1.2] tracking-normal text-[#111827]">
          Your selection
        </h2>

        <div className="mt-3 border-t border-[#E5E7EB] pt-4 space-y-3">
          {[
            ["Service", "Home Internet"],
            ["Connection Type", "Fibre"],
            ["Package", "Plus Plan"],
            ["Extras", "Streaming Voucher"],
            ["Equipment", "ONT Device (Included)"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="font-exo font-normal text-[14px] leading-[1] tracking-normal text-[#2C6176]">
                {label}
              </span>
              <span className="font-exo font-bold text-[14px] leading-[1] tracking-normal text-right">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Card */}
      <div className="mt-6 rounded-xl bg-[#DCE7EB] px-5 py-4 flex justify-between items-center">
        <div>
          <p className="font-exo font-bold text-[14px] text-[#111827]">
            Monthly Total
          </p>
          <p className="font-exo text-[12px] text-[#6B7280]">Once-off Fees</p>
        </div>
        <div className="text-right">
          <p className="font-exo font-bold text-[20px] text-[#2F5D6C]">
            $58/mo
          </p>
          <p className="font-exo text-[12px] text-[#6B7280]">Free</p>
        </div>
      </div>

      {/* Installation */}
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#F59E0B] bg-[#FFF7ED] px-4 py-4">
        <FaCalendarAlt className="text-[#9CA3AF]" />
        <p className="font-exo text-[14px] text-[#111827]">
          Estimated installation:{" "}
          <span className="font-bold text-[#F59E0B]">3-5 business days</span>
        </p>
      </div>

      {/* Conditional UI */}
      {isConfirmed ? (
        <div className="mt-8 text-center">
          <div className="text-8xl">🎉</div>

          <h3 className="mt-3 font-exo font-bold text-[20px] leading-[1.2] tracking-normal text-center text-[#111827]">
            You're almost connected!
          </h3>

          <p className="mt-2 font-exo font-normal text-[16px] leading-[1.5] tracking-normal text-center mx-auto text-[#2C6176]">
            We've received your order. Our team will contact you within 24 hours
            to schedule installation.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#DCE7EB] px-5 py-3">
            <FaCheckCircle className="text-[#2F5D6C]" />
            <span className="font-exo font-bold text-[16px] text-[#2F5D6C]">
              DTL-2025-00847
            </span>
          </div>

          <p className="mt-3 font-exo text-[12px] text-[#2C6176]">
            A confirmation has been sent to your email.
          </p>

          <button
            className="px-6 py-3 bg-[#1f4d5a] text-white rounded-lg mt-4"
            onClick={() => {
              if (
                search.get("location") &&
                search.get("label") &&
                search.get("value") &&
                search.get("type")
              ) {
                router.push(
                  `/checkout?location=${search.get("location")}&label=${search.get("label")}&value=${search.get("value")}&type=${search.get("type")}`,
                );
              }
            }}
          >
            Checkout →
          </button>
        </div>
      ) : (
        <>
          <div className="my-6 h-[1px] bg-[#E5E7EB]" />
          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            <button className="rounded-lg border border-[#2F5D6C] px-6 py-4 font-exo text-[14px] text-[#2F5D6C] hover:bg-[#2F5D6C]/5">
              Edit Plan
            </button>

            <button
              onClick={() => setIsConfirmed(true)}
              className="rounded-lg bg-[#F59E0B] px-6 py-4 font-exo font-bold text-[14px] text-white hover:bg-[#D97706]"
            >
              Get Connected →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
