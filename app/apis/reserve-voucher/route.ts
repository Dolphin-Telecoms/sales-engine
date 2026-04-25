import VoucherAxios from "@/src/libs/Voucher";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { category_id, currency, value } = await req.json();

    const uuid = uuidv4();

    const response = await VoucherAxios.post(
      `/api/v1/reserve`,
      {
        category_id: category_id,
        value: value,
        currency: currency,
        session_id: `session-${uuid}`,
        idempotency_key: uuid,
      },
      {
        headers: {
          "Idempotency-Key": uuid,
        },
      },
    ).then((res) => res.data);

    if (response) {
      return NextResponse.json(
        {
          message: "Voucher reserve fetch successful",
          data: response,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Voucher reserve fetch failed", data: response },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Voucher reserve API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
