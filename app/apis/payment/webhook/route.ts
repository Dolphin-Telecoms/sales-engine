import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("Webhook:", body);

  const { status, account_number, amount } = body;

  if (status === "SUCCESS") {
    // ✅ Update DB
    // mark user/account as paid
  }

  return NextResponse.json({ received: true });
}