import Axios from "@/src/libs/Axios";
import { HomeCategory } from "@/src/features/connect/types/connect";
export const getHomeCategories = async (): Promise<{ status: boolean; data: HomeCategory[] | null }> => {
  try {
    const response = await Axios.get(`/apis/get-home-category`).then(
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
