import Axios from "@/src/libs/Axios";
import { Voucher } from "@/src/types";

export const getVouchers = async (): Promise<{
  status: boolean;
  data: Voucher[] | null;
}> => {
  try {
    const response = await Axios.get(`/apis/get-voucher`).then(
      (res) => res.data,
    );

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error checking coverage:", error);
    return { status: false, data: null };
  }
};
