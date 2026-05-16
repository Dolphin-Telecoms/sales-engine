import Axios from "@/src/libs/Axios";

export const createCustomer = async ({
  email,
  country_code,
  name,
  phone,
}: {
  email: string;
  country_code: string;
  name: string;
  phone: string;
}) => {
  try {
    const response = await Axios.post(`/apis/create-customer`, {
      email,
      country_code,
      name,
      phone,
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
