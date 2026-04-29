import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(body);

    const res = await fetch(
      `${process.env.ECOCASH_BASE_URL}/api/payment/initiate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": `${process.env.ECOCASH_API_KEY}`,
        },
        body: JSON.stringify({
          payment_method: "ecocash",
          amount: 0.1,
          customer_name: body.customer_name,
          account_number: body.account_number,
          phone: body.phone,
          webhook_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/apis/payment/webhook`,
        }),
      },
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("echocash API failed!", error);
    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 },
    );
  }
}
