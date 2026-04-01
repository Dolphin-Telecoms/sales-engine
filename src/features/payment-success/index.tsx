"use client";

import React from "react";
// Import necessary icons from react-icons/fi (Feather Icons) and io5 (Ionicons 5)
import { FiCopy, FiInfo } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";

const PaymentSuccess = () => {
  // The order details for easy data passing
  const orderDetails = {
    reference: "DLT-885435",
    product: "Dolphin Home Fibre - Plus",
    plan: "Uncapped - 50Mbps",
    amountPaid: "$69.00 USD",
    paymentMethod: "EcoCash",
  };

  return (
    <div className="min-h-screen w-full max-w-xl rounded-xl p-8 mx-auto">
      {/* Top Section: Success Tick and Text */}
      <div className="flex flex-col items-center text-center gap-5">
        {/* Main Success Circle with White Check - matches the image's simple style */}
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
          <IoCheckmark className="text-white w-14 h-14" strokeWidth={5} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-950">
          Processing Successful!
        </h1>
        <p className="text-base text-gray-600 max-w-md">
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
            <span className="font-exo font-bold text-[20px] leading-[1.2] tracking-normal text-[#2C6176]">
              {orderDetails.reference}
            </span>
          </div>
          <button
            title="Copy reference to clipboard"
            className="p-2.5 rounded-full text-cyan-800 hover:bg-sky-200 transition"
            onClick={() => {
              navigator.clipboard.writeText(orderDetails.reference);
              // Simple feedback to user, you can improve this with a toast
              alert("Order reference copied to clipboard!");
            }}
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
          ].map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-base"
            >
              <span className="font-exo font-normal text-[14px] leading-[1] tracking-normal text-[#2C6176]">
                {item.label}
              </span>
              <span className="font-exo font-bold text-[14px] leading-[1] tracking-normal text-right text-gray-950 text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Warning/Status Box */}
      <div className="w-full bg-yellow-50 p-5 rounded-lg flex items-center gap-3 border border-yellow-200 my-4">
        <FiInfo className="text-amber-400 w-8 h-8 flex-shrink-0" />
        <p className="text-sm text-gray-700 leading-relaxed pt-0.5">
          Your order is now being processed. Our team will contact you shortly
          to schedule installation.
        </p>
      </div>

      {/* Back to Home Button */}
      <a href="/connect" className="w-full">
        <button className="w-full bg-cyan-950 text-white p-4 rounded-xl font-semibold text-lg shadow-sm hover:bg-cyan-800 transition duration-150 active:scale-[0.98]">
          Back to Home
        </button>
      </a>
    </div>
  );
};

export default PaymentSuccess;
