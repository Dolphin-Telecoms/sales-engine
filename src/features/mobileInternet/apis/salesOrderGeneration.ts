import Axios from "@/src/libs/Axios";

export const generateSaleOrder = async ({
  companyId,
  partnerId,
  partnerInvoiceId,
  name,
  partnerShippingId,
  order_line,
}: {
  companyId: number;
  partnerId: number;
  partnerInvoiceId: number;
  name: string;
  partnerShippingId: number;
  order_line:  any[];
}) => {
  try {
    const response = await Axios.post(`/apis/generate-sales-order`, {
      companyId,
      partnerId,
      partnerInvoiceId,
      name,
      partnerShippingId,
      order_line,
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
