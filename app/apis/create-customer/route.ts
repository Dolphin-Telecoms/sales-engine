import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if a customer with this email already exists
    if (body.email) {
      const searchResponse = await OddoAxios.post(
        `/json/2/res.partner/search_read`,
        {
          domain: [["email", "=", body.email]],
          fields: ["id"],
          limit: 1,
        },
      ).then((res) => res.data);

      if (searchResponse && searchResponse.length > 0) {
        return NextResponse.json(
          {
            message: "Customer already exists",
            data: [searchResponse[0].id],
          },
          { status: 200 },
        );
      }
    }

    // No existing customer found — create a new one
    let response = await OddoAxios.post(`/json/2/res.partner/create`, {
      vals_list: [{ ...body }],
    }).then((res) => res.data);

    if (response) {
      return NextResponse.json(
        {
          message: "Oddo customer generated successful",
          data: response,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Oddo customer generated failed",
          data: response,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Oddo customer generated API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
