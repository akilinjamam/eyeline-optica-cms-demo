/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllUsersQuery, useGetCheckRoleOfUserQuery } from "../app/redux/api/authApi";
import { decodeToken, verifyToken } from "../utils/decodeToken";

const useFindUser = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // Verify + decode
  const valid = token && verifyToken(token);
  const decode = valid ? decodeToken(token as string) : null;

  const { data: allUsers, error, isLoading } = useGetAllUsersQuery("");
  const { data: checkRole, isLoading:isRoleSameAsBeforeIsLoading } = useGetCheckRoleOfUserQuery("");
  const isRoleSameAsBefore = checkRole?.data
  console.log(isRoleSameAsBefore)
  const user = allUsers?.data?.find((item: any) => item?.email === decode?.email);

  const role = user?.role;
  const access = user?.access;
  const email = decode?.email;
 
  const location = useLocation();

  return { user, error, isLoading, token, decode, role,  access, navigate, location, email, isRoleSameAsBefore, isRoleSameAsBeforeIsLoading };
};

export default useFindUser;
