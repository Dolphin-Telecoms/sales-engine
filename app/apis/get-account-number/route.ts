import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      customer_id,
    }: {
      customer_id: string;
    } = await req.json();

    let response = await OddoAxios.post(`/json/2/res.partner/read`, {
      ids: [customer_id],
      fields: [
        "id",
        "name",
        "email",
        "phone",
        "account_numbers",
        "ecocash_number",
        "service_account_number",
      ],
    }).then((res) => res.data);

    if (response && Array.isArray(response) && response.length > 0) {
      return NextResponse.json(
        {
          message: "Oddo customer account fetch successful",
          data: response[0],
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Oddo customer account fetch failed",
          data: response,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Oddo customer account fetch API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
