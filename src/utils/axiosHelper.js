import axios from "axios";
import property from "@configs/propertyConfig";
<<<<<<< HEAD
=======
import { de } from "date-fns/locale";
>>>>>>> 6cce2e54da171266e6207909ffa6c61cb0316661
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
