import Axios from "@/src/libs/Axios";

export const getTagId = async (): Promise<{
  status: boolean;
  data: number[] | null;
}> => {
  try {
    const response = await Axios.get(`/apis/get-tag-id`).then(
      (res) => res.data,
    );

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error fetching tag id:", error);
    return { status: false, data: null };
  }
};
