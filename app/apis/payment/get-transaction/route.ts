import { NextRequest, NextResponse } from "next/server";
import OddoAxios from "@/src/libs/Oddo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.method === "zimswitch") {
      const res = await OddoAxios.post(
        `/api/payment/zimswitch/complete`,
        {
          resource_path: body.widget_url,
          checkout_id: body.checkout_id,
        },
        { headers: { "X-API-Key": `${process.env.ECOCASH_API_KEY}` } },
      );

      if (res.data) {
        const restwo = await OddoAxios.post(
          `/api/payment/${body.transaction_id}/status`,
          { headers: { "X-API-Key": `${process.env.ECOCASH_API_KEY}` } },
        );

        const data = await res.data;

        if (data.status === "completed") {
        }

        const response = NextResponse.json(data);

        return response;
      }
    } else {
      const res = await OddoAxios.post(
        `/api/payment/${body.transaction_id}/status`,
        { headers: { "X-API-Key": `${process.env.ECOCASH_API_KEY}` } },
      );

      const data = await res.data;

      if (data.status === "completed") {
        const resTwo = await OddoAxios.post(
          `/api/payment/${body.transaction_id}/status`,
          { headers: { "X-API-Key": `${process.env.ECOCASH_API_KEY}` } },
        );
      }

      const response = NextResponse.json(data);

      return response;
    }
  } catch (error) {
    console.error("echocash API failed!", error);
    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 },
    );
  }
}
