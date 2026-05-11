import Axios from "@/src/libs/Axios";

export const getCustomerAccountNumber = async ({
  customer_id,
}: {
  customer_id: string;
}): Promise<{
  status: boolean;
  data: null | {
    id: number
    name: string;
    email: string;
    phone: string;
    account_numbers: string;
    ecocash_number: boolean;
    service_account_number: string;
  };
}> => {
  try {
    const response = await Axios.post(`/apis/get-account-number`, {
      customer_id,
    }).then((res) => res.data);

    if (response) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    console.error("Error fetching customer account:", error);
    return { status: false, data: null };
  }
};
