import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    let response = await OddoAxios.post(`/json/2/sale.order/search_read`, {
      domain: [["id", "=", id]],
      fields: ["id", "name"]
    }).then((res) => res.data);

    if (response.length > 0) {
      return NextResponse.json(
        {
          message: "Oddo sales order fetched successful",
          data: response[0]?.name,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Oddo sales order fetched failed",
          data: response,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Oddo sales order fetched API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
