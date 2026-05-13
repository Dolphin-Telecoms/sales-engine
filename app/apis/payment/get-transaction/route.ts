import { NextRequest, NextResponse } from "next/server";
import OddoAxios from "@/src/libs/Oddo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await OddoAxios.get(
      `/api/payment/${body.transaction_id}/status`,
      { headers: { "X-API-Key": `${process.env.ECOCASH_API_KEY}` } },
    ).then((res) => res.data);

    return NextResponse.json(response);
  } catch (error) {
    console.error("echocash API failed!", error);
    return NextResponse.json({ error: "Transaction status check failed" });
  }
}
