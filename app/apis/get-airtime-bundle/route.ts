import NetOneAxios from "@/src/libs/NetOne";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let response = await NetOneAxios.get(`/agents/get-data-bundles-usd`).then(
      (res) => res.data,
    );

    if (
      response &&
      response.ReplyCode &&
      Array.isArray(response.Bundles) &&
      response.Bundles.length > 0
    ) {
      return NextResponse.json(
        {
          message: "NetOne bundle fetch successful",
          data: response.Bundles,
          ReplyCode: response.ReplyCode,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "NetOne bundle fetch failed",
          data: response,
          ReplyCode: 0,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in NetOne bundle fetch API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: error },
      { status: 500 },
    );
  }
}
