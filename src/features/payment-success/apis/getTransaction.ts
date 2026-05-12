import Axios from "@/src/libs/Axios";
import { TransactionResponse } from "@/src/types";

export const getTransaction = async ({
  transaction_id,
}: {
  transaction_id: string;
}): Promise<{
  status: boolean;
  data: null | TransactionResponse;
}> => {
  try {
    const response = await Axios.post(`/apis/payment/get-transaction`, {
      transaction_id,
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return { status: false, data: null };
  }
};
