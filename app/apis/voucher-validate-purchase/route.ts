import VoucherAxios from "@/src/libs/Voucher";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { reservation_id } = await req.json();

    const uuid = uuidv4();

    console.log(
      "Received reservation_id:",
      {
        reservation_id: reservation_id,
        order_ref: uuid,
        session_id: `session-${uuid}`,
        idempotency_key: uuid,
      },
      {
        headers: {
          "Idempotency-Key": uuid,
        },
      },
    );

    const response = await VoucherAxios.post(
      `/api/v1/validate-purchase`,
      {
        reservation_id: reservation_id,
        order_ref: uuid,
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
          message: "Voucher validate successful",
          data: response,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Voucher validate failed", data: response },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Voucher validate API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
