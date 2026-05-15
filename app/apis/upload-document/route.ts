import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      vals_list,
    }: {
      vals_list: any[];
    } = await req.json();

    let response = await OddoAxios.post(`/json/2/ir.attachment/create`, {
      vals_list: vals_list,
    }).then((res) => res.data);

    if (response) {
      return NextResponse.json(
        {
          message: "Oddo customer upload document successful",
          data: response,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Oddo customer upload document failed",
          data: response,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Oddo customer upload document API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
