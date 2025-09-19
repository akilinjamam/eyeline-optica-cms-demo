/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../app/redux/api/authApi";
import { decodeToken, verifyToken } from "../utils/decodeToken";

const useFindUser = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // Verify + decode
  const valid = token && verifyToken(token);
  const decode = valid ? decodeToken(token as string) : null;

  const { data: allUsers, error, isLoading } = useGetAllUsersQuery("");
  const user = allUsers?.data?.find((item: any) => item?.email === decode?.email);

  const role = user?.role;
  const access = user?.access;
 

  const location = useLocation();

  // Save only dashboard entry points as landing
  useEffect(() => {
    if(token && verifyToken(token)){
      if (["/dashboard", "/dashboard/product"].includes(location.pathname)) {
      localStorage.setItem("current-location-landing", location.pathname);
    }
    }
  }, [location.pathname, token]);

  const currentLocation = localStorage.getItem("current-location-landing");

  return { user, error, isLoading, token, decode, role, currentLocation, access, navigate };
};

export default useFindUser;
