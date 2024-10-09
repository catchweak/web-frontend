import axios from "axios";
import property from "@configs/propertyConfig";
import { de } from "date-fns/locale";
const server = property.catchweekServerHost;

const axiosClient = axios.create({
  baseURL: `${server}`,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Authorization: " "
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("accessToken");
    if (tokenString) {
      debugger;
      const tokenJson = JSON.parse(tokenString);
      config.headers["Authorization"] = `Bearer ${tokenJson.token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosClient;
