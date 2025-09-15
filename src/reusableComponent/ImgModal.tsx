// src/components/Modal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { closeImgModal } from "../app/redux/features/modalSlice";
import { X } from "lucide-react";
import ImageSlider from "./ImageSlider";


export default function ImgModal() {

    const dispatch = useDispatch()

    const {openImgModal, imgHolder} = useSelector((state:RootState) => state.modal)

  

  return (
    <AnimatePresence>
      {openImgModal && (
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
            className="bg-white rounded-2xl shadow-2xl lg:w-[40%] w-[90%] h-auto  p-6 relative"
          >
            

            {/* Buttons */}
            <div className="flex justify-end gap-3 mb-3">
              <button
                onClick={() => dispatch(closeImgModal())}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                <X/>
              </button>
            </div>

            <hr />
            <br />
            <ImageSlider images={imgHolder} autoPlay={false} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
