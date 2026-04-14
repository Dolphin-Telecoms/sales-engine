import Axios from "@/src/libs/Axios";

export const checkCoverage = async (address: string) => {
  try {
    const response = await Axios.post(
      `/apis/coverage`,
      {
        address: address,
        service_use: "Home",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    ).then((res) => res.data);

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
