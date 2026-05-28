import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      order_id,
      name,
      product_uom_qty,
      price_unit,
      customer_lead,
      product_id,
    } = await req.json();

    const response = await OddoAxios.post(`/json/2/sale.order.line/create`, {
      vals_list: [
        {
          order_id: order_id,
          name: name,
          product_uom_qty: product_uom_qty,
          price_unit: price_unit,
          customer_lead: customer_lead,
          product_id: product_id,
        },
      ],
    }).then((res) => res.data);

    if (response) {
      return NextResponse.json(
        {
          message: "Oddo sales order generated successful",
          data: response,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Oddo sales order generated failed",
          data: response,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Oddo sales order generated API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
