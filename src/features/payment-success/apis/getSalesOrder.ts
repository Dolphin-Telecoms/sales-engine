import Axios from "@/src/libs/Axios";

export const getSalesOrderName = async (
  id: string,
): Promise<{ status: boolean; data: { data: string } | null }> => {
  try {
    const response = await Axios.post(`/apis/get-sales-order`, {
      id,
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error fetching sales order name:", error);
    return { status: false, data: null };
  }
};
