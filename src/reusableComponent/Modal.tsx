// src/components/Modal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { closeModal, deleteIds } from "../app/redux/features/modalSlice";
import { useDeleteFramesMutation } from "../app/redux/api/frameApi";
import { toast } from "react-toastify";
import { useDeleteLensMutation } from "../app/redux/api/lensApi";
import { useDeleteContactLensMutation } from "../app/redux/api/contactLensApi";
import { useDeleteUsersMutation } from "../app/redux/api/authApi";
import { useDeleteAccessoryMutation } from "../app/redux/api/accessoryApi";

interface ModalProps {
  title?: string;
  message?: string;
}

export default function Modal({
  
  title = "Are you sure?",
  message = "Do you really want to proceed?",

}: ModalProps) {

    const dispatch = useDispatch()

    const {isOpenModal, deleteProductName, ids} = useSelector((state:RootState) => state.modal);

   const [deleteFrames, {isLoading:isLoadingFrame, error:errorFrame}] = useDeleteFramesMutation();
   const [deleteLens, {isLoading:isLoadingLens, error:errorLense}] = useDeleteLensMutation();
   const [deleteContactLens, {isLoading:isLoadingContactLens, error:errorContactLense}] = useDeleteContactLensMutation();
   const [deleteUser, {isLoading:isLoadingUser, error:errorUsers}] = useDeleteUsersMutation();
   const [deleteAcessory, {isLoading:isLoadingAccessory, error:errorAccessory}] = useDeleteAccessoryMutation();

    const handleDelete = async() => {
      if(deleteProductName === '/dashboard/frame_list'){
        console.log('hello frame')
        const res =  await deleteFrames(ids).unwrap();
        if(res.success){
          toast.success(res.message)
          dispatch(closeModal())
         
        }else{
          toast.error(errorFrame as string)
        }
      }
      if(deleteProductName === '/dashboard/lens_list'){
        console.log('hello lens')
        const res =  await deleteLens(ids).unwrap();
        if(res.success){
          toast.success(res.message)
          dispatch(deleteIds())
          dispatch(closeModal())
          
        }else{
          toast.error(errorLense as string)
        }
      }
      if(deleteProductName === '/dashboard/contact_lens_list'){
        console.log('hello lens')
        const res =  await deleteContactLens(ids).unwrap();
        if(res.success){
          toast.success(res.message)
          dispatch(deleteIds())
          dispatch(closeModal())
          
        }else{
          toast.error(errorContactLense as string)
        }
      }
      if(deleteProductName === '/dashboard/control_user_access'){
        console.log('hello users')
        const res =  await deleteUser(ids).unwrap();
        if(res.success){
          toast.success(res.message)
          dispatch(deleteIds())
          dispatch(closeModal())
          
        }else{
          toast.error(errorUsers as string)
        }
      }

      if(deleteProductName === '/dashboard/accessory_list'){
        console.log('hello users')
        const res =  await deleteAcessory(ids).unwrap();
        if(res.success){
          toast.success(res.message)
          dispatch(deleteIds())
          dispatch(closeModal())
          
        }else{
          toast.error(errorAccessory as string)
        }
      }
    }
    

  return (
    <AnimatePresence>
      {isOpenModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

            {/* Message */}
            <p className="text-gray-600 mb-6">{message}</p>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => dispatch(closeModal())}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-md transition"
              >
                {(isLoadingFrame || isLoadingLens ||isLoadingContactLens || isLoadingUser || isLoadingAccessory) ? 'Deleting': 'Confirm'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
