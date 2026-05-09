// app/api/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import OddoAxios from "@/src/libs/Oddo";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { searchParams } = new URL(req.url);

  const paramsObject = Object.fromEntries(searchParams.entries());

  const {
    homeCategory,
    location,
    services,
    coordinates,
    city,
    childCategory,
    childCategoryName,
    product,
    price,
    productName,
    attribute,
    voucher,
    voucherPrice,
    equipmentName,
    equipmentId,
    customerId,
    customerName,
    customerEmail,
    customerPhone,
    salesOderId,
  } = paramsObject;

  const {
    account_number,
    amount,
    completed_at,
    currency,
    customer_name,
    ecocash_reference,
    event,
    payment_id,
    payment_method,
    payment_reference,
    phone,
    provider_reference,
    reference,
    status,
    timestamp,
    transaction_id,
  } = body;

  if (status === "completed" && payment_id) {
    const invoice = await OddoAxios.post(
      "/json/2/sale.order/_create_invoices",
      {
        ids: [salesOderId],
      },
    ).then((res) => res.data);

    console.log("Invoice created successfully:", invoice);
  }

  // ✅ get query params

  console.log(body, paramsObject);

  return NextResponse.json({ received: true });
}
