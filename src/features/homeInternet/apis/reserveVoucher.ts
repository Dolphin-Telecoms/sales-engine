import Axios from "@/src/libs/Axios";
import { HomeInternetProductCategory } from "@/src/features/homeInternet/types/type";

export const reserveVoucher = async (
  category_id: string,
  currency: string,
  value: string,
): Promise<{ status: boolean; data: HomeInternetProductCategory[] | null }> => {
  try {
    const response = await Axios.post(`/apis/reserve-voucher`, {
      category_id,
      currency,
      value,
    }).then((res) => res.data);

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
