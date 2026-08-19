import OddoAxios from "@/src/libs/Oddo";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await OddoAxios.post(`/json/2/product.product/search_read`, {
      domain: [["display_name", "=", "Airtime"]],
    }).then((res) => res.data);

    if (response && Array.isArray(response) && response.length > 0) {
      return NextResponse.json(
        {
          message: "Oddo product airtime fetch successful",
          data: response[0],
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Oddo product airtime fetch failed",
          data: response,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Oddo product airtime API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
