import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, companyId, partnerId, partnerInvoiceId, partnerShippingId } =
      await req.json();

    let response = await OddoAxios.post(`/json/2/sale.order/create`, {
      vals_list: [
        {
          name: name,
          company_id: 1,
          partner_id: Number(partnerId),
          partner_invoice_id: Number(partnerInvoiceId),
          partner_shipping_id: Number(partnerShippingId),
          picking_policy: "direct",
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
