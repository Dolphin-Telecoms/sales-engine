import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { parentCategory, equipmentType } = await req.json();
    let response = await OddoAxios.post(
      `/json/2/product.category/search_read`,
      {
        domain: [["parent_id.id", "=", parentCategory]],
      },
    ).then((res) => res.data);

    if (response) {
      const euipment = response.find((category: any) =>
        category.name.includes(equipmentType),
      );
      return NextResponse.json(
        {
          message: "Oddo product equipment fetch successful",
          data: euipment,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Oddo product equipment fetch failed",
          data: response,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Oddo product equipment API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
