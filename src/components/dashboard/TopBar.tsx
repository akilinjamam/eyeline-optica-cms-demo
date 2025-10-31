import { useLocation } from "react-router-dom";
import { Bell} from "lucide-react";
import { motion } from "framer-motion";

// Map route paths to friendly titles
const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/product": "Product",
  "/dashboard/add_frame": "Add Frame",
  "/dashboard/frame_list": "Frame List",
  "/dashboard/add_lens": "Add Lens",
  "/dashboard/lens_list": "Lens List",
  "/dashboard/add_contact_lens": "Add Contact Lens",
  "/dashboard/contact_lens_list": "Contact Lens List",
  "/dashboard/add_accessory": "Add Accessory",
  "/dashboard/accessory_list": "Accessory List",
  "/dashboard/add_category": "Add Category",
  "/dashboard/category_list": "Category List",
  "/dashboard/customer": "Customer",
  "/dashboard/customer_list": "Customer List",
  "/dashboard/orders": "orders",
  "/dashboard/only_frame_order": "Frame Order",
  "/dashboard/frame_with_lens_order": "Frame And Lens Order",
  "/dashboard/only_lens_order": "Lens Order",
  "/dashboard/only_contact_lens_order": "Contact Lens Order",
  "/dashboard/only_accessory_order": "Accessory Order",
  "/dashboard/contactLens_and_accessory_order": "ContactLens and Accessory Order",
  "/dashboard/control_user_access": "User Access Control",
  "/dashboard/add_doctor": "Add Doctor",
  "/dashboard/doctor_list": "Doctor List",
  "/dashboard/doctor_profile": "Doctor Profile",
  "/dashboard/doctor_schedule": "Doctor Schedule",
  "/dashboard/add_schedule": "Add Schedule",
  "/dashboard/schedule": "Add Schedule",
  "/dashboard/my_schedule": "My Schedule",
  "/dashboard/doctor_prescription": "Doctor Prescription",
  "/dashboard/my_prescriptions": "My Prescription",
  "/dashboard/doctor_patients": "My Patients",
  "/settings": "Settings",
  "/sales": "Sales",
  "/products": "Products",
};

const TopBar = () => {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Page";

  return (
    <motion.header
      className="sticky top-0 z-20 bg-white/70 backdrop-blur-lg shadow-sm border-b border-gray-200 flex items-center justify-between px-4 md:px-3 h-16"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    //   transition={{ type: "spring", stiffness: 80 }}
    >
      {/* Left Section - Dynamic Page Title */}
      <h1 className="text-lg md:text-xl font-semibold  text-gray-800 tracking-tight ml-10 lg:ml-0">
        {title}
      </h1>

      

      {/* Right Section - Icons */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold cursor-pointer shadow-md">
          A
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;
