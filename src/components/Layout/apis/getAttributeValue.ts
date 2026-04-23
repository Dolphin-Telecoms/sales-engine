import Axios from "@/src/libs/Axios";
import { AttributeValue } from "@/src/types";

const getAttributeValues = async (
  attributeIds: number[],
): Promise<{ status: boolean; data: AttributeValue[] | null }> => {
  try {
    const response = await Axios.post(`/apis/get-product-attribute-value`, {
      attributeIds,
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

export default getAttributeValues;
