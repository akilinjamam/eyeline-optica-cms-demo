import '../../../layout.css';
import { motion } from "framer-motion";
import { Box, Circle, Eye, } from "lucide-react";
import { Link } from 'react-router-dom';
import useFindUser from '../../../reusableComponent/useFindUser';


const WishlistLanding = () => {

  const {role} = useFindUser()

  const wishlistCategories = [
  { title: "Frame", icon: <Box className="w-8 h-8" />, color: "from-indigo-500 to-purple-500", path: '/dashboard/wishlist_frame', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Lens", icon: <Circle className="w-8 h-8" />, color: "from-green-400 to-teal-400", path: '/dashboard/wishlist_lens', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
 
  { title: "Contact Lens", icon: <Eye className="w-8 h-8" />, color: "from-red-400 to-pink-400", path: '/dashboard/wishlist_contactLens', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
];

  return (
    <div className="w-full h-full p-5 bg-gray-50">
      <div className="lg:h-[100vh] h-[90vh] p-2 overflow-y-scroll hide-scrollbar">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Wish List</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {wishlistCategories?.filter(item => item?.role === true)?.map((category) => (
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

export default WishlistLanding;
