import Axios from "@/src/libs/Axios";

export const generateSaleOrder = async ({
  companyId,
  partnerId,
  partnerInvoiceId,
  name,
  partnerShippingId,
}: {
  companyId: string;
  partnerId: string;
  partnerInvoiceId: string;
  name: string;
  partnerShippingId: string;
}) => {
  try {
    const response = await Axios.post(`/apis/generate-sales-order`, {
      companyId,
      partnerId,
      partnerInvoiceId,
      name,
      partnerShippingId,
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
