import axios from "axios";

const Axios = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Axios;
