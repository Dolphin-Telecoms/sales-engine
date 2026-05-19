"use client";

import { FiCopy, FiInfo } from "react-icons/fi";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { getTransaction } from "@/src/features/payment-success/apis/getTransaction";
import { TransactionResponse } from "@/src/types";
import { useSearchParams } from "next/navigation";

// Add this helper component above return()
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState<TransactionResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const transactionID = searchParams.get("transactionID");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!transactionID) return;

    // ✅ Prevent multiple intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const pollPaymentStatus = async () => {
      try {
        setLoading(true);

        const response = await getTransaction({
          transaction_id: transactionID,
        });

        setPaymentData(response.data);

        // stop polling when completed
        if (
          response?.data?.status &&
          response.data.status !== "processing" &&
          response.data.status !== "pending"
        ) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          console.log("STOPPED");
        }
      } catch (error) {
        console.error("Polling error:", error);

        window.location.reload();

        // ❌ DON'T stop polling
        // ❌ DON'T call pollPaymentStatus again here

        // polling will continue automatically from setInterval
      } finally {
        setLoading(false);
      }
    };

    // Initial call
    pollPaymentStatus();

    // Start polling
    intervalRef.current = setInterval(pollPaymentStatus, 15000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [transactionID]);

  // The order details for easy data passing
  const orderDetails = {
    reference: paymentData?.reference || "DLT-885435",
    product: `${searchParams.get("productName") || "Dolphin Home Fibre - Plus"}`,
    plan: `${searchParams.get("plan") || "100Mbps"} Plan`,
    amountPaid: paymentData
      ? `${paymentData.amount} ${paymentData.currency}`
      : "$69.00 USD",
    paymentMethod: paymentData?.payment_method || "EcoCash",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderDetails.reference);

      // Optional toast / alert
      alert("Reference copied successfully!");
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const statusStyles = {
    completed: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-700",
      badge: "bg-green-100 text-green-700",
      message: "Your payment has been completed successfully.",
    },
    pending: {
      bg: "bg-yellow-50 border-yellow-200",
      text: "text-yellow-700",
      badge: "bg-yellow-100 text-yellow-700",
      message: "Your payment is pending confirmation.",
    },
    processing: {
      bg: "bg-yellow-50 border-yellow-200",
      text: "text-yellow-700",
      badge: "bg-yellow-100 text-yellow-700",
      message: "Your order is now being processed.",
    },
    failed: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-700",
      badge: "bg-red-100 text-red-700",
      message: "Your payment has failed.",
    },
    cancelled: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-700",
      badge: "bg-red-100 text-red-700",
      message: "Your payment has been cancelled.",
    },
  };

  return (
    <div className="min-h-screen w-full md:max-w-xl rounded-xl p-4 xl:p-8 mx-auto">
      {/* Top Section: Success Tick and Text */}
      <div className="flex flex-col items-center text-center gap-5">
        {/* Main Success Circle with White Check - matches the image's simple style */}
        <div
          className={`w-14 h-14 lg:w-24 lg:h-24 p-2 rounded-full flex items-center justify-center shadow-md ${
            paymentData?.status === "completed"
              ? "bg-[#0CAB46]"
              : paymentData?.status === "failed" ||
                  paymentData?.status === "cancelled"
                ? "bg-red-500"
                : "bg-yellow-400"
          }`}
        >
          {paymentData?.status === "completed" ? (
            <IoCheckmark className="text-white w-14 h-14" strokeWidth={5} />
          ) : paymentData?.status === "failed" ||
            paymentData?.status === "cancelled" ? (
            <IoClose className="text-white w-12 h-12" strokeWidth={5} />
          ) : (
            <FiClock className="text-white w-10 h-10" />
          )}
        </div>
        <h1 className="font-exo font-bold text-[18px] lg:text-[24px] leading-[120%] tracking-[0%] text-center">
          {paymentData?.status === "processing"
            ? `Processing`
            : `Processing ${paymentData?.status ?? ""}`}
          !
        </h1>
        <p className="font-exo font-normal text-[12px] lg:text-[14px] leading-[100%] tracking-[0%] text-center">
          Thank you for choosing Dolphin Telecoms. Your order is confirmed.
        </p>
      </div>

      {/* Middle Card: Order Details */}
      <div className="w-full bg-white p-7 rounded-xl shadow-inner border border-gray-200 flex flex-col gap-6 mt-2">
        {/* Order Reference Banner */}
        <div className="w-full bg-sky-100 p-5 rounded-lg flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-exo font-normal text-[12px] leading-[1] tracking-normal  text-[#2C6176] mb-1">
              Order Reference
            </span>
            {paymentData && !loading ? (
              <span className="font-exo font-bold text-[20px] leading-[1.2] tracking-normal text-[#2C6176]">
                {orderDetails.reference}
              </span>
            ) : (
              <Skeleton className="h-6 w-40" />
            )}
          </div>
          <button
            title="Copy reference to clipboard"
            className="p-2.5 rounded-full text-cyan-800 hover:bg-sky-200 transition"
            onClick={handleCopy}
          >
            <FiCopy className="w-6 h-6" />
          </button>
        </div>

        {/* Line Separator */}
        <hr className="border-gray-100" />

        {/* Detailed Order List */}
        <div className="flex flex-col gap-4 text-gray-800">
          {[
            { label: "Product", value: orderDetails.product },
            { label: "Plan", value: orderDetails.plan },
            { label: "Amount Paid", value: orderDetails.amountPaid },
            { label: "Payment Method", value: orderDetails.paymentMethod },
            {
              label: "Payment Status",
              value: (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[paymentData?.status ?? ("pending" as keyof typeof statusStyles)].badge}`}
                >
                  {paymentData?.status ?? "pending"}
                </span>
              ),
            },
          ].map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-base"
            >
              <span className="font-exo font-normal text-[14px] leading-[1] tracking-normal text-[#2C6176]">
                {item.label}
              </span>
              {paymentData && !loading ? (
                <div className="font-exo font-bold text-[14px] leading-[1] tracking-normal text-right text-gray-950">
                  {item.value}
                </div>
              ) : (
                <Skeleton className="h-5 w-24" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Warning/Status Box */}
      <div className="w-full bg-yellow-50 p-5 rounded-lg flex items-center gap-3 border border-yellow-200 my-4">
        <FiInfo className="text-amber-400 w-8 h-8 flex-shrink-0" />
        <p className="text-sm text-gray-700 leading-relaxed pt-0.5">
          {paymentData?.status !== "completed"
            ? `Your order is ${paymentData?.status}`
            : "Your order is now being processed. Our team will contact you shortly to schedule installation."}
        </p>
      </div>

      {/* Back to Home Button */}
      <a href="/connect" className="w-full">
        <button className="w-full px-6 py-3 bg-[#1f4d5a] text-white rounded-lg">
          Back to Home
        </button>
      </a>
    </div>
  );
};

export default PaymentSuccess;
