/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closeEdit } from "../app/redux/features/modalSlice";
import type { RootState } from "../app/store";
import EditFrame from "../components/dashboard/products/EditFrame/EditFrame";
import EditLens from "../components/dashboard/products/EditLens/EditLens";
import EditContactLens from "../components/dashboard/products/EditContactLens/EditContactLens";
import EditUserAccessControll from "../components/dashboard/user-access-control/EditUserAccessControllList";
import AddDoctor from "../components/dashboard/doctor/AddDoctor/AddDoctor";
import { Button } from "../components/ui/button";
import usePrescriptionPdfDownloader from "../pdfDownloader/usePrescriptionPdfDownloader";
import { PrescriptionPreview } from "../components/dashboard/doctor/prescription/PrescriptionPreview";
import type { Prescription } from "../components/dashboard/doctor/prescription/MyPrescription";
import EditSalesOrderStatus from "../components/dashboard/orders/EditSalesOrderStatus";


const VarticalDrawer = () => {

    
    const dispatch = useDispatch();
    const {isEditOpen, editProductName, editableData} = useSelector((state:RootState) => state.modal)
    
    const {generatePDF} = usePrescriptionPdfDownloader(editableData as any)
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

                {/* Reuse Add Frame form with default values */}
                {editProductName === 'frame' && <EditFrame/>}
                {editProductName === 'lens' && <EditLens/>}
                {editProductName === 'contact-lens' && <EditContactLens/>}
                {editProductName === 'controll-user-access' && <EditUserAccessControll/>}
                {editProductName === 'doctor-profile' && <AddDoctor/>}
                {editProductName === 'sales-order-status' && <EditSalesOrderStatus/>}
                {editProductName === 'prescription-detail' && 
                <div className="mt-8 p-4 border rounded-xl shadow bg-white">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-lg font-semibold">Prescription Detail</h2>
                        <Button onClick={generatePDF}>Download PDF</Button>
                    </div>
                    <PrescriptionPreview prescription={editableData as Prescription} />
                    </div>
                
                }
            </motion.div>
            )}
            </AnimatePresence>
        </>
    );
};

export default VarticalDrawer;