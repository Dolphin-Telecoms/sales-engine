import Axios from "@/src/libs/Axios";
import { HomeInternetProductCategory } from "@/src/features/homeInternet/types/type";

export const getVoucherProduct = async (): Promise<{
  status: boolean;
  data: HomeInternetProductCategory | null;
}> => {
  try {
    const response = await Axios.get(`/apis/get-voucher-product`).then(
      (res) => res.data,
    );

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error in fetching voucher product:", error);
    return { status: false, data: null };
  }
};
