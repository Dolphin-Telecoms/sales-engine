import VoucherAxios from "@/src/libs/Voucher";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await VoucherAxios.get(`/api/v1/categories`).then(
      (res) => res.data,
    );

    if (response) {
      return NextResponse.json(
        {
          message: "Voucher categories fetch successful",
          data: response,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Voucher categories fetch failed", data: response },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Voucher categories API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
