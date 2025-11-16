import '../../../layout.css';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import useFindUser from '../../../reusableComponent/useFindUser';
import { BookAIcon, BookCheck} from 'lucide-react';


const BlogLanding = () => {

  const {role} = useFindUser()

  const productCategories = [
  { title: "Add blog", icon: <BookAIcon className="w-8 h-8" />, color: "from-blue-400 to-blue-800", path: '/dashboard/add_blog', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
  { title: "Blog List", icon: <BookCheck className="w-8 h-8" />, color: "from-pink-400 to-red-900", path: '/dashboard/blog_list', role: role === 'employee' || role === 'admin' || role === 'doctor & admin' || role === 'employee & admin' },
];

  return (
    <div className="w-full h-full p-5 bg-gray-50">
      <div className="lg:h-[100vh] h-[90vh] p-2 overflow-y-scroll hide-scrollbar">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Blog</h2>

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

export default BlogLanding;
