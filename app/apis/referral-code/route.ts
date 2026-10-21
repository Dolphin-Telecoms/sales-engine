import { NextRequest, NextResponse } from "next/server";

// Dolphin Rewards: a short share link (se.dolphintelecoms.com/?ref=CODE) or QR code brings a friend here. The browser
// asks this route for the referral token; only the se server holds the rewards key, so it never reaches the browser.
const CODE_RE = /^[A-Za-z0-9]{3,20}$/;
const SOURCES = ["link", "qr"];

export async function POST(req: NextRequest) {
  const url = process.env.REWARDS_API_URL;
  const key = process.env.REWARDS_SE_KEY;
  if (!url || !key) {
    return NextResponse.json({ message: "Referrals are off" }, { status: 404 });
  }
  try {
    const { code, source } = await req.json();
    if (typeof code !== "string" || !CODE_RE.test(code)) {
      return NextResponse.json({ message: "Not a referral code" }, { status: 400 });
    }
    const res = await fetch(`${url.replace(/\/$/, "")}/api/se/referral/from-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Rewards-Key": key,
        // the visitor's own IP (Cloudflare sets it), so the rewards app can refuse shop / office networks
        "X-Client-IP": req.headers.get("cf-connecting-ip") || "",
      },
      body: JSON.stringify({ code, source: SOURCES.includes(source) ? source : "link" }),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ message: data?.detail || "Referral code not valid" }, { status: res.status });
    }
    return NextResponse.json({ rt: data.rt }, { status: 200 });
  } catch (error) {
    console.error("Error in referral code API route:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
