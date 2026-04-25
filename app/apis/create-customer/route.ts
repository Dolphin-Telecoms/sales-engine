import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      partner_latitude,
      partner_longitude,
      email,
      street,
      city,
      country_code,
      name,
      phone,
    }: {
      partner_latitude: string;
      partner_longitude: string;
      email: string;
      street: string;
      city: string;
      country_code: string;
      name: string;
      phone: string;
    } = await req.json();

    let response = await OddoAxios.post(`/json/2/res.partner/create`, {
      vals_list: [
        {
          partner_latitude,
          partner_longitude,
          email,
          street,
          city,
          country_code,
          name,
          phone,
        },
      ],
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
