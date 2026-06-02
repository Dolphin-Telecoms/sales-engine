import OddoAxios from "@/src/libs/Oddo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await OddoAxios.post(`/json/2/crm.tag/search_read`, {
      domain: [
        ["display_name", "=", "ecommerce"], // 👈 filter added
      ],
      fields: ["id"],
    }).then((res) => res.data);

    if (response) {
      return NextResponse.json(
        {
          message: "Oddo tag id fetch successful",
          data: response,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Oddo tag id fetch failed", data: response },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Oddo tag id API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
