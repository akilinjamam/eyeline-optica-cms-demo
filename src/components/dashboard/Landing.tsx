import '../../layout.css';
import { motion } from "framer-motion";
import { ShoppingCart, Users, Settings, Box } from "lucide-react";
import { Link } from 'react-router-dom';

const services = [
  { title: "Products", icon: <Box className="w-8 h-8" />, color: "from-indigo-500 to-purple-500", path: "/dashboard/product" },
  { title: "Customers", icon: <Users className="w-8 h-8" />, color: "from-green-400 to-teal-400", path: "/dashboard/customer" },
  { title: "Orders", icon: <ShoppingCart className="w-8 h-8" />, color: "from-yellow-400 to-orange-400", path: "/dashboard/orders" },
  { title: "Settings", icon: <Settings className="w-8 h-8" />, color: "from-red-400 to-pink-400", path: "/dashboard/product" },
];

const Landing = () => {
  return (
    <div className="w-full h-full p-5 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 lg:text-left text-center ml-3">
        Welcome to the Dashboard
      </h2>

      <div className="lg:h-[100vh] h-[90vh] p-2 overflow-y-scroll hide-scrollbar hide-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => (
            <Link to={service.path}>
                <motion.div
                    key={service.title}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className={`cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg bg-gradient-to-tr ${service.color} text-white transition-transform`}
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
