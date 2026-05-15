import Axios from "@/src/libs/Axios";

export const uploadDocument = async (
  vals_list: any[],
): Promise<{ status: boolean; data: any }> => {
  try {
    const response = await Axios.post(`/apis/upload-document`, {
      vals_list,
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error uploading document:", error);
    return { status: false, data: null };
  }
};
