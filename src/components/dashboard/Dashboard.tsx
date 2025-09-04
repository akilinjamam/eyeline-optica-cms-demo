import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, LayoutDashboard, ShoppingCart, Users, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDesktop: boolean;
}

const Sidebar = ({ isOpen, setIsOpen, isDesktop }: SidebarProps) => {
  const [showText, setShowText] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowText(true), 180);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isOpen]);

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/dashboard/product", icon: ShoppingCart },
    { name: "Customers", path: "/customers", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Logout", path: "/", icon: LogOut },
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
        // transition={{
        //   type: "spring",
        //   stiffness: 100,
        //   damping: 15,
        // }}
        className="fixed top-0 left-0 h-full z-40 
          bg-white/80 backdrop-blur-2xl border-r border-white/20 shadow-xl
          flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          {showText && <h1 className="text-xl font-bold text-gray-800">Eyeline Optica</h1>}
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
        <nav className="flex flex-col p-4 gap-3 relative">
          {links.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                className={`relative flex items-center gap-3 p-3 rounded-xl group transition-colors duration-200 
                  ${isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:bg-white/50"}`}
                onClick={() => setMobileOpen(false)}
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
        className="fixed inset-0 bg-black z-30" // ✅ full screen, behind sidebar
        onClick={() => setMobileOpen(false)} // ✅ hide sidebar on click outside
      />
)}
    </>
  );
};

export default Sidebar;
