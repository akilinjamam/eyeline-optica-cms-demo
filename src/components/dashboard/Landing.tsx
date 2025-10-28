/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../layout.css';
import { motion } from "framer-motion";
import { ShoppingCart, Users, Box, UserPlus, CalendarDays, NotebookTabs, Accessibility, ShieldPlus } from "lucide-react";
import { Link } from 'react-router-dom';
import { decodeToken } from '../../utils/decodeToken';
import { useGetAllUsersQuery } from '../../app/redux/api/authApi';

const Landing = () => {

  const token = localStorage.getItem("token");
  const decode = decodeToken(token as string);
  const {data:allUsers} = useGetAllUsersQuery('');

  const findUser = allUsers?.data?.find((user:any) => user.email === decode?.email);

  const role = findUser?.role as string;

  const services = [
  // Keep original colors
  { title: "Products", icon: <Box className="w-8 h-8" />, color: "from-indigo-500 to-purple-500", path: "/dashboard/product", show: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Customers", icon: <Users className="w-8 h-8" />, color: "from-green-400 to-teal-400", path: "/dashboard/customer", show: role === 'employee' || role === 'admin' ||role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Orders", icon: <ShoppingCart className="w-8 h-8" />, color: "from-yellow-400 to-orange-400", path: "/dashboard/orders", show: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin'},

  // New unique gradients for the rest
 
  { title: "Doctor List", icon: <ShieldPlus className="w-8 h-8" />, color: "from-pink-400 to-purple-500", path: "/dashboard/doctor_list", show: role === 'admin'|| role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Profile", icon: <UserPlus className="w-8 h-8" />, color: "from-blue-400 to-cyan-500", path: "/dashboard/doctor_profile", show: role === 'doctor' || role === 'doctor & admin' },
  { title: "Schedule", icon: <CalendarDays className="w-8 h-8" />, color: "from-teal-400 to-green-500", path: "/dashboard/doctor_schedule", show: role === 'doctor' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin'},
  { title: "Prescription", icon: <NotebookTabs className="w-8 h-8" />, color: "from-orange-400 to-red-500", path: "/dashboard/doctor_prescription", show: role === 'doctor' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Patients", icon: <Accessibility className="w-8 h-8" />, color: "from-purple-400 to-pink-500", path: "/dashboard/doctor_patients", show: role === 'doctor' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
];


  return (
    <div className="w-full h-full p-5 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 lg:text-left text-center ml-3">
        Welcome to the Dashboard
      </h2>

      <div className="lg:h-[100vh] h-[80vh] p-2 overflow-y-scroll hide-scrollbar hide-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services?.filter(f => f?.show === true) .map((service) => (
            <Link to={service.path}>
                <motion.div
                    key={service.title}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className={`cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg bg-gradient-to-tr ${service.color} text-white transition-transform `}
                    >
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                </motion.div>
            </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
