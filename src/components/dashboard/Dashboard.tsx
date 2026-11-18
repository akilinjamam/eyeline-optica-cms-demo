/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  LayoutDashboard,
  ShoppingCart,
  Users,
  LogOut,
  ShoppingBag,
  User,
  ListChecks,
  UserPlus,
  CalendarDays,
  NotebookTabs,
  Accessibility,
  Calendar,
  BookAIcon,
  Heart,
  Link2Icon,
  DollarSign,
  UserCheck,
  Radar,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../../app/redux/features/authSlice";
import { decodeToken } from "../../utils/decodeToken";
import { useGetAllUsersQuery } from "../../app/redux/api/authApi";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import {
  useGetAllSalesForNotificationQuery,
  useGetAllSalesQuery,
} from "../../app/redux/api/salesApi";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDesktop: boolean;
}

export type TRoll =
  | "doctor"
  | "employee"
  | "admin"
  | "doctor & admin"
  | "employee & admin"
  | "marketer";

const Sidebar = ({ isOpen, setIsOpen, isDesktop }: SidebarProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showText, setShowText] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [count, setCount] = useState<number>(0);

  const token = localStorage.getItem("token");
  const decoded = decodeToken(token as string);

  const { data: allUsers } = useGetAllUsersQuery("");
  const findusers = allUsers?.data?.find(
    (user: any) => user?.email === decoded?.email,
  );

  const { refetch } = useGetAllSalesForNotificationQuery("");
  const { refetch: refetchSale } = useGetAllSalesQuery("");

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowText(true), 180);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isOpen]);

  useEffect(() => {
    audioRef.current = new Audio(
      "../../../public/sounds/universfield-new-notification-020-352772.mp3",
    );
    // Use 3002 if that's your Node server port
    const socket = io("https://server.eyelineoptica.com", {
      transports: ["websocket"], // Better for avoiding CORS/Polling issues
    });

    // Match the event name you used in your SocketService
    socket.on("LIVE_USER_COUNT", (data: number) => {
      setCount(data);
    });
    socket.on("new_order_notification", (data: any) => {
      // 1. Update Redux store

      // 2. Trigger React Toastify alert with custom formatting
      toast.success(`🎉 New Order Received! Invoice: #${data.invoiceNo}`, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", // Looks great in an admin dashboard setting
      });
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.warn(
            "Audio playback delayed until user interacts with the CMS:",
            error,
          );
        });
      }
    });

    socket.on("REFRESH_SALES_DATA", () => {
      refetch(); // Automatically pulls fresh data from your API route
      refetchSale();
    });

    // CLEANUP: This is crucial to prevent the "ENOENT" or memory leaks
    return () => {
      socket.off("LIVE_USER_COUNT");
      socket.off("new_order_notification");
      socket.off("REFRESH_SALES_DATA");
      socket.disconnect();
    };
  }, [dispatch, refetch, refetchSale]);

  const roll = findusers?.role as TRoll;
  const links = [
    {
      name: "Dashboard",
      path: ["/dashboard"],
      icon: LayoutDashboard,
      show:
        roll === "doctor" ||
        roll === "employee" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin" ||
        roll === "marketer",
    },
    {
      name: "Products",
      path: [
        "/dashboard/product",
        "/dashboard/add_frame",
        "/dashboard/frame_list",
        "/dashboard/add_lens",
        "/dashboard/lens_list",
        "/dashboard/add_contact_lens",
        "/dashboard/contact_lens_list",
        "/dashboard/add_accessory",
        "/dashboard/accessory_list",
        "/dashboard/add_category",
        "/dashboard/category_list",
        "/dashboard/add_banner",
        "/dashboard/manage_banner_list",
      ],
      icon: ShoppingCart,
      show:
        roll === "employee" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin" ||
        roll === "marketer",
    },
    {
      name: "Customers",
      path: ["/dashboard/customer", "/dashboard/customer_list"],
      icon: Users,
      show:
        roll === "employee" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin",
    },
    {
      name: "Apply Promo",
      path: [
        "/dashboard/promo",
        "/dashboard/add_promo",
        "/dashboard/promo_list",
      ],
      icon: DollarSign,
      show:
        roll === "employee" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin",
    },
    {
      name: "Weekly Deals",
      path: [
        "/dashboard/weeklyDeals",
        "/dashboard/manage_deals",
        "/dashboard/edit_weeklyDeals",
      ],
      icon: Calendar,
      show:
        roll === "employee" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin",
    },
    {
      name: "Wish List",
      path: [
        "/dashboard/wishlist",
        "/dashboard/wishlist_frame",
        "/dashboard/wishlist_lens",
        "/dashboard/wishlist_contactLens",
      ],
      icon: Heart,
      show:
        roll === "employee" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin",
    },
    {
      name: "Blog",
      path: ["/dashboard/blog", "/dashboard/add_blog", "/dashboard/blog_list"],
      icon: BookAIcon,
      show:
        roll === "employee" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin" ||
        roll === "marketer",
    },
    {
      name: "Doctor List",
      path: ["/dashboard/doctor_list"],
      icon: ListChecks,
      show:
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin",
    },
    {
      name: "Profile",
      path: ["/dashboard/doctor_profile"],
      icon: UserPlus,
      show: roll === "doctor" || roll === "doctor & admin",
    },
    {
      name: "Schedule",
      path: [
        "/dashboard/doctor_schedule",
        "/dashboard/add_schedule",
        "/dashboard/my_schedule",
      ],
      icon: CalendarDays,
      show:
        roll === "doctor" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin",
    },
    {
      name: "Prescription",
      path: [
        "/dashboard/doctor_prescription",
        "/dashboard/add_prescription",
        "/dashboard/my_prescriptions",
      ],
      icon: NotebookTabs,
      show:
        roll === "doctor" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin",
    },
    {
      name: "Patients",
      path: ["/dashboard/doctor_patients"],
      icon: Accessibility,
      show:
        roll === "doctor" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin",
    },
    {
      name: "Orders",
      path: [
        "/dashboard/orders",
        "/dashboard/only_frame_order",
        "/dashboard/frame_with_lens_order",
        "/dashboard/only_lens_order",
        "/dashboard/only_contact_lens_order",
        "/dashboard/only_accessory_order",
        "/dashboard/contactLens_and_accessory_order",
      ],
      icon: ShoppingBag,
      show:
        roll === "employee" ||
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin",
    },
    {
      name: "User Access Control",
      path: ["/dashboard/control_user_access"],
      icon: User,
      show:
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin",
    },
    {
      name: "Track User",
      path: ["/dashboard/track_user"],
      icon: Radar,
      show:
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin" ||
        roll === "marketer",
    },
    {
      name: "Meta Data",
      path: ["/dashboard/meta_data"],
      icon: Link2Icon,
      show:
        roll === "admin" ||
        roll === "doctor & admin" ||
        roll === "employee & admin" ||
        roll === "marketer",
    },
    { name: "Logout", path: ["/"], icon: LogOut, show: true },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      {!isDesktop && !mobileOpen && (
        <button
          className="fixed top-2 left-2 z-50 p-3"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar */}
      <motion.aside
        animate={{
          width: isOpen ? 260 : 80,
          x: isDesktop ? 0 : mobileOpen ? 0 : "-100%",
        }}
        className="fixed top-0 left-0 h-full  z-40 
          bg-white/80 backdrop-blur-2xl border-r border-white/20 shadow-xl
          flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          {showText && (
            <>
              <h1 className="text-xl font-bold text-gray-800">
                Eyeline Optica
                <button
                  title="active users"
                  className="relative p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <UserCheck className="w-5 h-5 text-gray-700" />
                  {count > 0 && (
                    <span className="p-1 absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center font-bold">
                      {count}
                    </span>
                  )}
                </button>
              </h1>
            </>
          )}
          {isDesktop && (
            <button
              className="hidden lg:block p-2 rounded-lg hover:bg-white/40 transition cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 gap-3 relative h-full hide-scrollbar overflow-y-scroll">
          {links.map(({ name, path, icon: Icon, show }) => {
            const isActive = path.includes(location.pathname);
            return (
              <Link
                key={name}
                to={path[0]}
                className={`relative flex items-center gap-3 p-3 rounded-xl group transition-colors duration-200 ${show ? "flex" : "hidden"}
                  ${isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:bg-white/50"}`}
                onClick={() => {
                  setMobileOpen(false);
                  if (path[0] === "/") {
                    dispatch(clearToken());
                  }
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-lg"
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  />
                )}

                <Icon className="h-5 w-5 min-w-[20px]" />
                {showText && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap"
                  >
                    {name}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Mobile Overlay */}
      {!isDesktop && mobileOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-30 h-full overflow-y-scroll hide-scrollbar" // ✅ full screen, behind sidebar
          onClick={() => setMobileOpen(false)} // ✅ hide sidebar on click outside
        />
      )}
    </>
  );
};

export default Sidebar;
