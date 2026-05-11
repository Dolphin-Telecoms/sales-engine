import Axios from "@/src/libs/Axios";

export const generateSalesOrderLine = async ({
  order_id,
  name,
  product_uom_qty,
  price_unit,
  customer_lead,
  product_id,
}: {
  order_id: number;
  name: string;
  product_uom_qty: number;
  price_unit: number;
  customer_lead: number;
  product_id: number;
}) => {
  try {
    const response = await Axios.post(`/apis/generate-sales-order-line`, {
      order_id,
      name,
      product_uom_qty,
      price_unit,
      customer_lead,
      product_id,
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error generating sales order line:", error);
    return { status: false, data: null };
  }
};
