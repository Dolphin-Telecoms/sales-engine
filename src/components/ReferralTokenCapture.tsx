"use client";

import { useEffect } from "react";
import { captureReferralToken } from "@/src/libs/referralToken";

// Mounted once in the root layout: saves a Dolphin Rewards referral (?ref= / ?rt=) from the link. Renders nothing.
export default function ReferralTokenCapture() {
  useEffect(() => {
    void captureReferralToken();
  }, []);
  return null;
}
