"use client";

import { useEffect } from "react";
import { captureReferralToken } from "@/src/libs/referralToken";

// Mounted once in the root layout: saves ?rt= from a Dolphin Rewards referral link. Renders nothing.
export default function ReferralTokenCapture() {
  useEffect(() => {
    captureReferralToken();
  }, []);
  return null;
}
