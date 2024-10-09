import { Navigate } from "react-router-dom";
import { getTokenWithExpiry } from "../utils/auth";

const CheckLocalStorage = ({ children }) => {
  const token = getTokenWithExpiry("accessToken");

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

export default CheckLocalStorage;
