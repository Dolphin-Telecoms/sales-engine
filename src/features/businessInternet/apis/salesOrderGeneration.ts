import Axios from "@/src/libs/Axios";

export const generateSaleOrder = async ({
  companyId,
  partnerId,
  partnerInvoiceId,
  tag_ids,
  partnerShippingId,
  order_line,
  plan_id,
}: {
  companyId: number;
  partnerId: number;
  partnerInvoiceId: number;
  tag_ids: number[];
  partnerShippingId: number;
  order_line: any[];
  plan_id: number[];
}) => {
  try {
    const response = await Axios.post(`/apis/generate-sales-order`, {
      companyId,
      partnerId,
      partnerInvoiceId,
      tag_ids,
      partnerShippingId,
      order_line,
      plan_id,
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error generating sales order:", error);
    return { status: false, data: null };
  }
};
