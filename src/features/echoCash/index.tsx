"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { echoCashPaymentInitiate } from "@/src/features/echoCash/apis/paymentInitiate";

export default function EchoCash() {
  const router = useRouter();
  const search = useSearchParams();
  const params = new URLSearchParams(search);

  const InitiatePayment = async () => {
    const { status, data } = await echoCashPaymentInitiate({
      customer_name: `${search.get("customerName")}`,
      account_number: `${search.get("accountNumber")}`,
      phone: `${search.get("customerPhone")}`,
      amount: 0.1,
      param: `${params.toString()}`,
    });

    if (status && data) {
      params.set("transactionID", data?.transaction_id);
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}`,
      );
      if (search.get("orderType") === "home" || search.get("orderType") === "airtime") {
        router.push(`/payment-success/echocash?${params.toString()}`);
      } else {
        router.push(
          `/business-internet/payment-success/echocash?${params.toString()}`,
        );
      }
    }
  };

  useEffect(() => {
    InitiatePayment();
  }, []);

  return (
    <div className="flex flex-col min-h-full justify-center items-center mx-5">
      <div className="flex items-center justify-center w-fit h-fit rounded-full p-5 bg-[#E6F2F5] mt-[20vh]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#C7DFE6] border-t-[#2F5D6C]"></div>
      </div>
      <div className="mt-5">
        <h5 className="font-exo font-bold text-[20px] text-center">
          Processing Payment...
        </h5>
        <p className="max-w-md text-center mt-4 text-[#6B7280]">
          Please wait while we securely process your payment.
        </p>
      </div>
    </div>
  );
}
