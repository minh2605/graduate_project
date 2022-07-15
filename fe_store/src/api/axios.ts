import axios from "axios";
import { toast } from "react-toastify";

const PORT = process.env.REACT_APP_PORT;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}:${PORT}/api/`,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("jwt_token");
  config.headers = {};
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log("error", error);
    const statusCode = error.response.status;
    console.log("statusCOde", statusCode);
    console.log("error.response", error.response);
    if (statusCode === 404) {
      // window.location.href = "/not-found";
      return;
    }
    if (statusCode === 400) {
      throw error.response.data;
    }
    if (statusCode === 401) {
      toast.error("Please authenticate!");
      return;
    }
    if (statusCode === 403) {
      toast.error("No Permission");
      // window.location.href = '/forbi?dden';
      return;
    }
    if (statusCode === 409) {
      console.error("error.response", error.message);
      return;
    }
    if (statusCode === 500) {
      // show notification
      toast.error("System has an error");
      console.error("error", error);
      return;
    }
    throw error;
  }
);

export default axiosInstance;
