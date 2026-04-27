import Axios from "@/src/libs/Axios";
import { ProductCategory } from "@/src/types";

export const getEquipment = async (
  parentCategory: string,
  equipmentType: string,
): Promise<{ status: boolean; data: ProductCategory | null }> => {
  try {
    const response = await Axios.post(`/apis/get-product-equipment`, {
      parentCategory,
      equipmentType,
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
