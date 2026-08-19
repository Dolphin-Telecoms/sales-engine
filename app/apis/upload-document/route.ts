import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      vals_list,
    }: {
      vals_list: any[];
    } = await req.json();

    const response = await OddoAxios.post(`/json/2/ir.attachment/create`, {
      vals_list: vals_list,
    }).then((res) => res.data);

    if (response) {
      // Post the uploaded attachment as a message on the partner's chatter
      const partnerId = vals_list[0]?.res_id;
      const attachmentIds = Array.isArray(response) ? response : [response];

      if (partnerId && attachmentIds.length > 0) {
        await OddoAxios.post(`/json/2/res.partner/message_post`, {
          ids: [partnerId],
          body: "<p>Signed service contract uploaded via API</p>",
          message_type: "comment",
          body_is_html: true,
          attachment_ids: attachmentIds,
        });
      }

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
