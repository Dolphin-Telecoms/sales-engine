import Axios from "@/src/libs/Axios";

export const createCustomer = async ({
  partner_latitude,
  partner_longitude,
  email,
  street,
  city,
  country_code,
  name,
  phone,
}: {
  partner_latitude: string;
  partner_longitude: string;
  email: string;
  street: string;
  city: string;
  country_code: string;
  name: string;
  phone: string;
}) => {
  try {
    const response = await Axios.post(`/apis/create-customer`, {
      partner_latitude,
      partner_longitude,
      email,
      street,
      city,
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
