// app/components/SimCheckout.tsx
"use client";

import { useState } from "react";
import { CiMobile2 } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import SimCard from "@/src/features/mobileInternet/sim";
import Airtime from "@/src/features/mobileInternet/airtime";

export default function MobileInternet() {
  const [idType, setIdType] = useState<"sim" | "airtime">("sim");
  return (
    <>
      <div className="mb-4 max-w-xl w-full mx-auto p-1 bg-white rounded-lg border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* SA Citizen */}
          <button
            onClick={() => setIdType("sim")}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
              idType === "sim"
                ? "bg-[#2C6176] text-white"
                : "bg-white text-gray-600"
            }`}
          >
            <CiMobile2 />
            Get a SIM
          </button>

          {/* Non SA */}
          <button
            onClick={() => setIdType("airtime")}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
              idType === "airtime"
                ? "bg-[#2C6176] text-white"
                : "bg-white text-gray-600"
            }`}
          >
            <BsCurrencyDollar />
            Buy Airtime
          </button>
        </div>
      </div>
      <div className="w-full bg-white rounded-2xl">
        {idType === "sim" ? (
          <div className="p-2 md:p-4 lg:p-6">
            <SimCard />
          </div>
        ) : (
          <div className="p-2 md:p-4 lg:p-6">
            <Airtime />
          </div>
        )}
      </div>
    </>
  );
}
