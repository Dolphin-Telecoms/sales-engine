import Axios from "@/src/libs/Axios";
import { ProductTemplate } from "@/src/types";

export const getSimCard = async (
  homeCategory: string, 
): Promise<{ status: boolean; data: ProductTemplate[] | null }> => {
  try {
    const response = await Axios.post(`/apis/get-mobile-product`, {
      homeCategory, 
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error fetching SIM cards:", error);
    return { status: false, data: null };
  }
};
