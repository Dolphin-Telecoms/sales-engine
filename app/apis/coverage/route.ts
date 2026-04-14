import CoverageAxios from "@/src/libs/Coverage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { address, service_use } = body;

    // Validation
    if (!address && !service_use) {
      return NextResponse.json(
        { message: "Address and Service Use are required", data: null },
        { status: 400 },
      );
    }

    const response = await CoverageAxios.post(`/external/coverage/validate`, {
      address: address,
      service_use: service_use,
    }).then((res) => res.data);

    if (response?.available) {
      return NextResponse.json(
        { message: "Coverage check successful", data: response },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Coverage check failed", data: response },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in coverage API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
