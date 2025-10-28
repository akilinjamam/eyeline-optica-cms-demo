import '../../../layout.css';
import { motion } from "framer-motion";
import { Box, Layers, Circle, Eye } from "lucide-react";
import { Link } from 'react-router-dom';
import useFindUser from '../../../reusableComponent/useFindUser';



const ProductsLanding = () => {

  const {role} = useFindUser()

  const productCategories = [
  { title: "Add Frame", icon: <Box className="w-8 h-8" />, color: "from-indigo-500 to-purple-500", path: '/dashboard/add_frame', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Frame List", icon: <Layers className="w-8 h-8" />, color: "from-blue-400 to-indigo-400", path: '/dashboard/frame_list', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Add Lens", icon: <Circle className="w-8 h-8" />, color: "from-green-400 to-teal-400", path: '/dashboard/add_lens', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Lens List", icon: <Circle className="w-8 h-8" />, color: "from-yellow-400 to-orange-400", path: '/dashboard/lens_list', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Add Contact Lens", icon: <Eye className="w-8 h-8" />, color: "from-red-400 to-pink-400", path: '/dashboard/add_contact_lens', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Contact Lens List", icon: <Eye className="w-8 h-8" />, color: "from-pink-400 to-purple-400", path: '/dashboard/contact_lens_list', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Add Accessory", icon: <Eye className="w-8 h-8" />, color: "from-red-400 to-cyan-400", path: '/dashboard/add_accessory', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Accessory List", icon: <Eye className="w-8 h-8" />, color: "from-yellow-400 to-blue-400", path: '/dashboard/accessory_list', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
];

  return (
    <div className="w-full h-full p-5 bg-gray-50">
      <div className="lg:h-[100vh] h-[90vh] p-2 overflow-y-scroll hide-scrollbar">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {productCategories?.filter(item => item?.role === true)?.map((category) => (
            <Link to={category.path}>
                <motion.div
                key={category.title}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg bg-gradient-to-tr ${category.color} text-white transition-transform `}
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

export default ProductsLanding;
