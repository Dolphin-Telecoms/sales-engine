import Axios from "@/src/libs/Axios";
import { ProductCategory } from "@/src/types";

export const getBusinessProducts = async (
  homeCategory: string,
): Promise<{ status: boolean; data: ProductCategory[] | null }> => {
  try {
    const response = await Axios.post(`/apis/get-business-product`, {
      homeCategory,
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error fetching business products:", error);
    return { status: false, data: null };
  }
};
