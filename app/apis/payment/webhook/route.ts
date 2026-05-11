// app/api/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import OddoAxios from "@/src/libs/Oddo";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { searchParams } = new URL(req.url);

    const paramsObject = Object.fromEntries(searchParams.entries());

    const { salesOderId } = paramsObject;
    const { payment_id, status } = body;

    // ✅ get query params

    console.log(body, paramsObject);

    if (status === "completed" && payment_id) {
      const confirmsaleOrder = await OddoAxios.post(
        "/json/2/sale.order/action_confirm",
        { ids: [salesOderId] },
      );
      console.log("confirmsaleOrder :: ", confirmsaleOrder);
      if (confirmsaleOrder) {
        const wizard = await OddoAxios.post(
          "/json/2/sale.advance.payment.inv/create",
          {
            vals_list: [
              {
                advance_payment_method: "delivered",
                sale_order_ids: [[6, 0, [salesOderId]]],
              },
            ],
          },
        ).then((res) => res.data);
        console.log("wizard created successfully:", wizard);
        if (wizard && Array.isArray(wizard) && wizard.length > 0) {
          const invoice = await OddoAxios.post(
            "/json/2/sale.advance.payment.inv/create_invoices",
            { ids: wizard[0] },
          ).then((res) => res.data);
          console.log("invoice created successfully:", invoice);
          const { id, res_id } = invoice;
          if (id && res_id) {
            const action = await OddoAxios.post(
              "/json/2/account.move/action_post",
              { ids: [res_id] },
            ).then((res) => res.data);
            console.log("action post successfully:", action);

            const unreconciled = await OddoAxios.post(
              "/json/2/account.move.line/search_read",
              {
                domain: [
                  ["payment_id", "=", payment_id],
                  [
                    "account_type",
                    "in",
                    ["asset_receivable", "liability_payable"],
                  ],
                  ["reconciled", "=", false],
                ],
                fields: ["id", "name", "amount_residual"],
              },
            ).then((res) => res.data);

            if (
              unreconciled &&
              Array.isArray(unreconciled) &&
              unreconciled.length > 0
            ) {
              const reconcile = await OddoAxios.post(
                "/json/2/account.move/js_assign_outstanding_line",
                {
                  ids: [res_id],
                  line_id: unreconciled[0].id,
                },
              ).then((res) => res.data);

              if (reconcile === null) {
                return NextResponse.json({ received: true });
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ received: false });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ received: false });
  }
}
