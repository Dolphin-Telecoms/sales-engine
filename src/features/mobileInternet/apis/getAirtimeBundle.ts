import Axios from "@/src/libs/Axios";
import { AirtimeBundle } from "@/src/types";

export const getAirtimeBundle = async (): Promise<{
  status: boolean;
  data: AirtimeBundle[] | null;
}> => {
  try {
    const response = await Axios.get(`/apis/get-airtime-bundle`).then(
      (res) => res.data,
    );

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error fetching airtime products:", error);
    return { status: false, data: null };
  }
};
