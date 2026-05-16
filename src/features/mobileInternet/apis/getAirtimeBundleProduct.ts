import Axios from "@/src/libs/Axios";
import { ProductCategory } from "@/src/types";

export const getAirtimeBundleProduct = async (): Promise<{
  status: boolean;
  data: ProductCategory | null;
}> => {
  try {
    const response = await Axios.get(`/apis/get-airtime-bundle-product`).then(
      (res) => res.data,
    );

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error airtime bundle products:", error);
    return { status: false, data: null };
  }
};
