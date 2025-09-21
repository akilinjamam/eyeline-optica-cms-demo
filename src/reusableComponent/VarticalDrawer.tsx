import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closeEdit } from "../app/redux/features/modalSlice";
import type { RootState } from "../app/store";
import EditFrame from "../components/dashboard/products/EditFrame/EditFrame";
import EditLens from "../components/dashboard/products/EditLens/EditLens";
import EditContactLens from "../components/dashboard/products/EditContactLens/EditContactLens";
import EditUserAccessControll from "../components/dashboard/user-access-control/EditUserAccessControllList";
import AddDoctor from "../components/dashboard/doctor/AddDoctor/AddDoctor";


const VarticalDrawer = () => {

    const dispatch = useDispatch();
    const {isEditOpen, editProductName} = useSelector((state:RootState) => state.modal)

    return (
        <>
            <AnimatePresence>
            {isEditOpen && (
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 w-full h-[100vh] bg-white shadow-2xl  z-50 p-4 overflow-y-auto hide-scrollbar"
            >
                {/* Close Button */}
                <button
                onClick={() => dispatch(closeEdit())}
                className="absolute top-2 right-4 text-gray-600 hover:text-black"
                >
                ✖
                </button>

                <h2 className="text-lg font-bold mb-4">Edit Frame</h2>

                {/* Reuse Add Frame form with default values */}
                {editProductName === 'frame' && <EditFrame/>}
                {editProductName === 'lens' && <EditLens/>}
                {editProductName === 'contact-lens' && <EditContactLens/>}
                {editProductName === 'controll-user-access' && <EditUserAccessControll/>}
                {editProductName === 'doctor-profile' && <AddDoctor/>}
            </motion.div>
            )}
            </AnimatePresence>
        </>
    );
};

export default VarticalDrawer;