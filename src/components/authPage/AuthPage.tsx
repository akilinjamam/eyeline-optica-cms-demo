/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import photo from "../../images/optical-photo.jpg";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm, Controller } from "react-hook-form";
import { useCreateLoginMutation, useCreateRegistrationMutation } from "../../app/redux/api/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../app/redux/features/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { verifyToken } from "../../utils/decodeToken";
import LoadingGlass from "../../reusableComponent/LoadingGlass";

type FormValues = {
  name?: string;
  email: string;
  role: string;
  password: string;
  confirmPassword?: string;
};

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [wait, setWait] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const [createRegistration, {isLoading:isLoadingReg}] = useCreateRegistrationMutation();
  const [createLogin, {isLoading:isLoadingLogin}] = useCreateLoginMutation();
 
  const dispatch = useDispatch();

  const onSubmit = async (data: FormValues) => {
   
    const {confirmPassword, ...remaining} = data;
    console.log(data)
    
   if(isLogin){
    const {name, role, ...rest} = remaining;
    try {
        const res =  await createLogin(rest as any).unwrap();
        console.log(res.data.token)
        if(res.success){
          dispatch(setToken(res.data.token as any));
          navigate("/dashboard");
          setIsLogin(true);

        }
    } catch (error:any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message)
    }

   }else{
      try {
        const res =  await createRegistration(remaining as any).unwrap();
        console.log(res.data.token)
        if(res.success){
          setIsLogin(true);
          toast.success("Registration successfully created")

        }
    } catch (error:any) {
       toast.error(error?.data?.message)
    }
   }
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if(token && verifyToken(token)){
      navigate('/dashboard')
    }else{
      setIsLogin(true)
    }
  },[navigate, token]);

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };

useEffect(() => {
  setTimeout(() => {
    setWait(true)
  }, 2000);
})

if(!wait){
  return <LoadingGlass/>
}
  
console.log(wait)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row min-h-[650px]"
      >
        {/* Left Illustration */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-indigo-500 to-purple-500 items-center justify-center p-6 flex-wrap">
          <motion.img
            src={photo}
            alt="Auth Illustration"
            className="rounded-2xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
          <div className="text-3xl font-bold text-white">EYELINE OPTICA CMS</div>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8">
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 font-semibold ${
                isLogin
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 font-semibold ${
                !isLogin
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "text-gray-500"
              }`}
            >
              Register
            </button>
          </div>

          <motion.div
            key={isLogin ? "login" : "register"}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {isLogin ? "Welcome" : "Create Account"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name", {
                      required: !isLogin && "Full Name is required",
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {
                !isLogin
                &&
                <div>
                  <label className="block text-gray-700 mb-1">Role</label>
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: "Role is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          {isLogin && <SelectItem value="admin">Admin</SelectItem> }
                        </SelectContent>
                      </Select>
                    )}
                />
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
                </div>
              }

              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  {...register("password", { required: "Password is required" })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    {...register("confirmPassword", {
                      required: "Confirm your password",
                      validate: (value) =>
                        value === watch("password") ||
                        "Passwords do not match",
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition"
                disabled={(isLoadingLogin || isLoadingReg) ? true : false}
              >
                {isLogin ? ((isLoadingLogin || isLoadingReg)? 'Initializing' : 'Login') : (`${(isLoadingLogin || isLoadingReg) ? 'Initializing' : 'Register'}`)}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
      <ToastContainer/>
    </div>
  );
};

export default AuthPage;
