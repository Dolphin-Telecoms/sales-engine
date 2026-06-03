import Axios from "@/src/libs/Axios";
import { VoucherValidatePurchaseResponse } from "@/src/types";

export const validatePurchase = async (
  reservation_id: string,
): Promise<{
  status: boolean;
  data: VoucherValidatePurchaseResponse | null;
}> => {
  try {
    const response = await Axios.post(`/apis/voucher-validate-purchase`, {
      reservation_id,
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error in voucher validate purchase:", error);
    return { status: false, data: null };
  }
};
