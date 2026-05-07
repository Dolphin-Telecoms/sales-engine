// app/api/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import OddoAxios from "@/src/libs/Oddo";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    account_number,
    amount,
    card_brand,
    card_last4,
    completed_at,
    currency,
    customer_name,
    ecocash_reference,
    event,
    payment_method,
    provider_reference,
    reference,
    status,
    timestamp,
    transaction_id,
  } = body;

  // if (status === "completed") {
  //   const invoice = await OddoAxios.post(
  //     "/json/2/sale.order/_create_invoices",
  //     {
  //       ids: [transaction_id],
  //     },
  //   );
  // }

  // ✅ get query params
  const { searchParams } = new URL(req.url);

  const paramsObject = Object.fromEntries(searchParams.entries());

  console.log(body, paramsObject);

  return NextResponse.json({ received: true });
}
