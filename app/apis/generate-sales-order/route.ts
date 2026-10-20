import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";
import { REFERRAL_TOKEN_RE } from "@/src/libs/referralToken";

export async function POST(req: NextRequest) {
  try {
    const {
      tag_ids,
      companyId,
      partnerId,
      partnerInvoiceId,
      partnerShippingId,
      order_line,
      plan_id,
      rewards_referral_token,
    } = await req.json();

    let body: Record<string, unknown> = {};

    if (plan_id) {
      body = {
        tag_ids: tag_ids,
        company_id: Number(companyId),
        partner_id: Number(partnerId),
        partner_invoice_id: Number(partnerInvoiceId),
        partner_shipping_id: Number(partnerShippingId),
        picking_policy: "direct",
        order_line: order_line,
        plan_id: plan_id,
      };
    } else {
      body = {
        tag_ids: tag_ids,
        company_id: Number(companyId),
        partner_id: Number(partnerId),
        partner_invoice_id: Number(partnerInvoiceId),
        partner_shipping_id: Number(partnerShippingId),
        picking_policy: "direct",
        order_line: order_line,
      };
    }

    // Dolphin Rewards: the referral link's token on the order. Only with REWARDS_REFERRALS=on (server setting):
    // Odoo has the field only once the dolphin_rewards add-on is installed, and an unknown field fails the order.
    if (
      process.env.REWARDS_REFERRALS === "on" &&
      typeof rewards_referral_token === "string" &&
      REFERRAL_TOKEN_RE.test(rewards_referral_token)
    ) {
      body.rewards_referral_token = rewards_referral_token;
    }

    const response = await OddoAxios.post(`/json/2/sale.order/create`, {
      vals_list: [body],
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
