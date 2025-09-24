/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllUsersQuery, useGetCheckRoleOfUserQuery } from "../app/redux/api/authApi";
import { decodeToken, verifyToken } from "../utils/decodeToken";
import { useGetAllDoctorQuery, useGetSingleDoctorQuery } from "../app/redux/api/doctorApi";

const useFindUser = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // Verify + decode
  const valid = token && verifyToken(token);
  const decode = valid ? decodeToken(token as string) : null;

  const { data: allUsers, error, isLoading } = useGetAllUsersQuery("");
  const { data: checkRole, isLoading:isRoleSameAsBeforeIsLoading } = useGetCheckRoleOfUserQuery("");
  const { data: allDoctors } = useGetAllDoctorQuery("");
  const isRoleSameAsBefore = checkRole?.data
  
  const user = allUsers?.data?.find((item: any) => item?.email === decode?.email);
  
  const role = user?.role;
  const access = user?.access;
  const email = decode?.email;
  
  const location = useLocation();
  const {data:singleDoctor, isLoading:isLoadingSingleDoctor} = useGetSingleDoctorQuery(email)
  const doctorId = singleDoctor?.data?._id;
  const singleDoctorData = singleDoctor?.data;
  const allDoctorsData = allDoctors?.data?.data
  
  return { user, error, isLoading, token, decode, role,  access, navigate, location, email, isRoleSameAsBefore, isRoleSameAsBeforeIsLoading, doctorId, allDoctorsData, singleDoctorData, isLoadingSingleDoctor };
};

export default useFindUser;
