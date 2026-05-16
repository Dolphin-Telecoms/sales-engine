import Axios from "@/src/libs/Axios";

export const createCustomer = async (body: any) => {
  try {
    const response = await Axios.post(`/apis/create-customer`, {
      ...body,
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error generating customer:", error);
    return { status: false, data: null };
  }
};
