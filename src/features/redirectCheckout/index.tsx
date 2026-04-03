"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectCheckout() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/payment-success"); // redirect path
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // cleanup
  }, [router]);

  return (
    <div className="flex flex-col min-h-full justify-center items-center">
      {/* Abstract layered shapes */}
      <div className="flex items-center justify-center w-fit h-fit rounded-full p-5 bg-[#E6F2F5] mt-[20vh]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#C7DFE6] border-t-[#2F5D6C]"></div>
      </div>
      <div className="mt-5">
        <h5 className="font-exo font-bold text-[20px] leading-[1.2] tracking-normal text-center">
          Processing Payment...
        </h5>
        <p className="max-w-md font-exo font-normal text-[14px] leading-[1.4] tracking-normal text-center mt-4 text-[#6B7280]">
          Please wait while we securely process your payment. Do not close or
          refresh this page.
        </p>
      </div>
    </div>
  );
}
