import '../../../layout.css';
import { motion } from "framer-motion";
import {  Circle, Eye, Glasses, Box,BookCopy} from "lucide-react";
import { Link } from 'react-router-dom';

const ordersCategories = [
  { title: "Frame", icon: <Glasses className="w-8 h-8" />, color: "from-indigo-500 to-purple-500", path: '/dashboard/only_frame_order' },
  { title: "Frame + Lens", icon: <Circle className="w-8 h-8" />, color: "from-blue-400 to-indigo-400", path: '/dashboard/frame_with_lens_order' },
  { title: "Lens", icon: <Eye className="w-8 h-8" />, color: "from-green-400 to-teal-400", path: '/dashboard/only_lens_order' },
  { title: "Contact-Lens", icon: <Circle className="w-8 h-8" />, color: "from-yellow-400 to-orange-400", path: '/dashboard/only_contact_lens_order' },
  { title: "Contact-Lens + Accessory", icon: <Box className="w-8 h-8" />, color: "from-red-400 to-pink-400", path: '/dashboard/contactLens_and_accessory_order' },
  { title: "Accessory", icon: <BookCopy className="w-8 h-8" />, color: "from-pink-400 to-purple-400", path: '/dashboard/only_accessory_order' },
];

console.log(ordersCategories)

const OrdersLanding = () => {
  return (
    <div className="w-full h-full p-5 bg-gray-50">
      <div className="lg:h-[100vh] h-[90vh] p-2 overflow-y-scroll hide-scrollbar">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Orders</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ordersCategories.map((category) => (
            <Link to={category.path}>
                <motion.div
                key={category.title}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg bg-gradient-to-tr ${category.color} text-white transition-transform`}
                >
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-center">{category.title}</h3>
                </motion.div>
            </Link>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default OrdersLanding;
