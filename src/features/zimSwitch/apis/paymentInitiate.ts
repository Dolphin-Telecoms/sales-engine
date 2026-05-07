import Axios from "@/src/libs/Axios";

export type ZimswitchPaymentResponse = {
  success: boolean;
  transaction_id: string; // e.g. "PAY-ZS-95AA7DA9"
  payment_method: "zimswitch"; // can extend later if needed
  status: "pending" | "success" | "failed"; // extensible
  amount: number;
  currency: string; // e.g. "USD"
  checkout_id: string;
  widget_url: string;
  return_url: string;
  poll_url: string;
  message: string;
};

export const zimswitchPaymentInitiate = async ({
  customer_name,
  account_number,
  phone,
  customer_email,
  currency,
  amount,
  param,
}: {
  customer_name: string;
  account_number: string;
  phone: string;
  customer_email: string;
  currency: string;
  amount: number;
  param: string;
}): Promise<{ status: boolean; data: ZimswitchPaymentResponse | null }> => {
  try {
    const response = await Axios.post(`/apis/payment/zimswitch?${param}`, {
      customer_name,
      account_number,
      phone,
      customer_email,
      currency,
      amount,
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error zimswitch payment initiate:", error);
    return { status: false, data: null };
  }
};
