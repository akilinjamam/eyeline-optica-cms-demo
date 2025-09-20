/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Sidebar from "./Dashboard";
import TopBar from "./TopBar";
import { ToastContainer} from 'react-toastify';
import VarticalDrawer from "../../reusableComponent/VarticalDrawer";
import Modal from "../../reusableComponent/Modal";
import ImgModal from "../../reusableComponent/ImgModal";
import LoadingGlass from "../../reusableComponent/LoadingGlass";
import { verifyToken } from "../../utils/decodeToken";
import { useDispatch } from "react-redux";
// import { clearToken } from "../../app/redux/features/authSlice";
import useFindUser from "../../reusableComponent/useFindUser";
import { allControllablePaths } from "../controllablePath";

const Layout = () => {

  const {token, isLoading, role, currentLocation} = useFindUser()

  const dispatch = useDispatch();
  

  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

 
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 
   useEffect(() => {
    const controllAccess = allControllablePaths?.find(
      (user: any) => user?.path === location.pathname
    );

    if (controllAccess?.role && controllAccess.role !== role && role !== "admin") {
      navigate(currentLocation || "/");
    }
  }, [role, location.pathname, navigate, currentLocation]);

  

  useEffect(() => {
    if(!token){
      navigate('/')
    }
    if(token && !verifyToken(token) && !role){
      navigate('/')
    }
  }, [token, navigate, dispatch, role ])

  const pageVariants = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 2, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  if(isLoading){
    return <LoadingGlass/>
  }

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
        <ToastContainer className="mt-14"/>
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
            <VarticalDrawer/>
            <Modal/>
            <ImgModal/>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Layout;
