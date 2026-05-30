"use client";

import Image from "next/image";
import { useState } from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoLockClosedOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import cn from "classnames";

export default function SecureCheckout() {
  const [showModal, setShowModal] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const search = useSearchParams();
  const params = new URLSearchParams(search);

  const paymentMethods = [
    {
      name: "EcoCash",
      desc: "Mobile wallet payment",
      icon: (
        <Image
          src="/payment-gateway-icon/EcoCash-Zimbabwe.png"
          alt="EcoCash"
          height={25}
          width={71}
        />
      ),
    },
    // {
    //   name: "InnBucks",
    //   desc: "Pay with InnBucks wallet",
    //   icon: (
    //     <Image
    //       src="/payment-gateway-icon/innbucks.png"
    //       alt="InnBucks"
    //       height={25}
    //       width={90}
    //     />
    //   ),
    // },
    {
      name: "ZimSwitch",
      desc: "Pay with local bank card",
      icon: (
        <Image
          src="/payment-gateway-icon/Zimswitchlo.png"
          alt="ZimSwitch"
          height={28}
          width={54}
        />
      ),
    },
  ];

  return (
    <>
      {/* MAIN CARD */}
      <div className="w-full lg:max-w-3xl bg-white rounded-xl p-4 xl:p-8 shadow-sm">
        {/* Header */}
        <h1 className="font-exo font-bold text-[24px] lg:text-[34px] leading-[1.2] tracking-normal">
          Secure Checkout
        </h1>
        <p className="mt-2 font-exo font-normal text-[12px] lg:text-[14px] leading-[1] tracking-normal text-[#2C6176]">
          Complete your details below to proceed to payment.
        </p>

        {/* Currency */}
        <div className="mt-6 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB]">
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] p-4">
            <div className="p-2 rounded-lg bg-[#FFFFFF]">
              <BsCurrencyDollar size={20} className="text-[#2F5D6C]" />
            </div>
            <h2 className="font-exo font-bold text-[16px]">Payment Currency</h2>
          </div>

          <div className="p-4">
            <p className="font-exo text-[14px] text-[#2C6176]">
              Select the currency that matches your location. This determines
              which payment methods are available.
            </p>

            <div className="mt-4 flex flex-col md:flex-row gap-3 bg-white p-2 border rounded-xl border-[#DCDCDC]">
              <button
                onClick={() => setCurrency("USD")}
                className={`flex-1 rounded-lg px-4 py-3 font-exo text-[14px] ${
                  currency === "USD"
                    ? "bg-[#2F5D6C] text-white border border-[#2F5D6C]"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3 w-fit mx-auto">
                  <Image
                    src="/flags/ZW.png"
                    alt="Zimbabwe"
                    height={25}
                    width={25}
                  />{" "}
                  USD - Zimbabwe
                </div>
              </button>

              <button
                onClick={() => setCurrency("ZAR")}
                disabled
                className={`flex-1 rounded-lg px-4 py-3 font-exo text-[14px] ${
                  currency === "ZAR"
                    ? "bg-[#2F5D6C] border text-white border-[#2F5D6C]"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3 w-fit mx-auto">
                  <Image
                    src="/flags/ZA.png"
                    alt="Zimbabwe"
                    height={25}
                    width={25}
                  />{" "}
                  ZAR - South Africa
                </div>
              </button>
            </div>

            <div className="mt-4 rounded-lg bg-[#E5E7EB] px-4 py-3 text-[12px] text-[#2C6176]">
              Payment methods: EcoCash · InnBucks · ZimSwitch
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 w-full rounded-xl bg-[#F59E0B] py-3 font-exo font-bold text-[16px] text-white hover:bg-[#D97706]"
        >
          Proceed to Payment
        </button>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-center gap-2 font-exo font-normal text-[14px] leading-[1] tracking-normal text-center text-[#2C6176]">
          <IoLockClosedOutline />
          Secured by 256-bit SSL encryption
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="w-full max-w-[420px] rounded-t-xl md:rounded-xl bg-white overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center bg-[#2F5D6C] text-white p-4">
              <div>
                <h3 className="font-exo font-bold text-[16px]">
                  Select Payment Method
                </h3>
                <p className="text-[12px] opacity-80">
                  {currency === "USD" ? "USD - Zimbabwe" : "ZAR - South Africa"}
                </p>
              </div>
              <button onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-[14px] text-[#6B7280]">
                Choose how you want to pay
              </p>

              {paymentMethods.map((item) => {
                const isActive = selectedMethod === item.name;

                return (
                  <div
                    key={item.name}
                    onClick={() => setSelectedMethod(item.name)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 gap-2 transition ${
                      isActive
                        ? "border-2 border-[#2F5D6C] bg-[#E6F0F3]"
                        : "border-[#E5E7EB] hover:border-[#2F5D6C]/50"
                    }`}
                  >
                    <div
                      className={cn(
                        "py-2 w-[35%] rounded-lg flex items-center justify-center",
                        {
                          "bg-[#f3f4f6]": !isActive,
                          "bg-[#FFFFFF]": isActive,
                        },
                      )}
                    >
                      {item.icon}
                    </div>
                    <div className="w-[55%]">
                      <p className="font-exo font-bold text-[14px] text-[#111827]">
                        {item.name}
                      </p>
                      <p className="text-[12px] text-[#6B7280]">{item.desc}</p>
                    </div>

                    {isActive ? (
                      <FaCheckCircle className="text-[#2F5D6C] w-[10%]" />
                    ) : (
                      <div className="w-[10%]" />
                    )}
                  </div>
                );
              })}

              {/* Cancel */}
              {selectedMethod ? (
                <button
                  className="px-6 py-3 bg-[#1f4d5a] text-white rounded-lg mt-4 w-full flex items-center justify-center"
                  disabled={isLoading}
                  onClick={() => {
                    if (selectedMethod === "EcoCash") {
                      router.push(
                        `/redirect-checkout/echocash?${params.toString()}`,
                      );
                    } else if (selectedMethod === "ZimSwitch") {
                      router.push(
                        `/redirect-checkout/zimswitch?${params.toString()}`,
                      );
                    }
                  }}
                >
                  Make a payment →&nbsp;&nbsp;
                  {isLoading ? (
                    <div className="flex items-center justify-center w-fit h-fit rounded-full">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#C7DFE6] border-t-[#2F5D6C]"></div>
                    </div>
                  ) : null}
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-2 w-full rounded-xl border border-[#2F5D6C] py-3 text-[#2F5D6C]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
