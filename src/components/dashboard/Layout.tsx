import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Sidebar from "./Dashboard";
import TopBar from "./TopBar";

const Layout = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 2, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };



  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isDesktop={isDesktop} />

      {/* Main content container */}
      <motion.div
        className="flex-1 relative overflow-hidden"
        animate={{
          marginLeft: isDesktop ? (isOpen ? 260 : 80) : 0, // Smoothly resize when sidebar toggles
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      > 
        <TopBar/>
        <AnimatePresence>
          <motion.div
            key={location.pathname} // Trigger animation per route
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "tween" as const, ease: "easeInOut", duration: 0.1 }}
            className="absolute top-16 left-0 w-full h-full"
          >
            
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Layout;
