/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-toastify";
import { closeEdit } from "../../../../app/redux/features/modalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { useForm } from "react-hook-form";
import type { IBanner} from "../../../../types/interface";
import { useUpdateBannerMutation } from "../../../../app/redux/api/bannerApi";

const availableCoatings = [
  "Anti-Reflective",
  "UV Protection",
  "Blue Light Filter",
  "Scratch Resistant",
];

const useEditBanner = () => {
    const {editableData:initialData} = useSelector((state:RootState) => state.modal)

const { register, handleSubmit, control, setValue, watch, formState} = useForm<IBanner>({
    defaultValues: initialData as IBanner || {
      name: "",
      images: [],
      newImages: [],
    },
  });

  const [previewImages, setPreviewImages] = useState<any>();
   const [successMsg, setSuccessMsg] = useState<string>("");
  const [editFrame, { isLoading:loading, error:errorMsg, }] = useUpdateBannerMutation();
  const dispatch = useDispatch();
  
  // Load initial images if editing
  useEffect(() => {
    if (initialData?.images && Array.isArray(initialData.images)) {
      const previews = initialData.images.map((img) =>
        typeof img === "string" ? img : URL.createObjectURL(img)
      );
      setPreviewImages(previews);
    }
  }, [initialData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setValue("newImages", [...files as any]);
    setPreviewImages((prev:any) => files ? files.map((f) => URL.createObjectURL(f)) : prev);
  };

  const removeImage = () => {
  
    setValue("images", []);
    setPreviewImages("");
  };

  const onSubmit = async (data: IBanner) => {
    const {_id ,images, newImages,  ...remaining } = data;
    
    const formData = {
      id:_id,
      data: {...remaining, images},
      images:newImages,
    };
    console.log(formData)
    try {
      const response = await editFrame(formData as any).unwrap();
      if (response.success) {
        dispatch(closeEdit())
        toast.success(response.message);  
        setPreviewImages([]); 
      }
    } catch (err: any) {
      if (err?.data?.message) {
        toast.error(err.data.message);
        setSuccessMsg(err.data.message)
      }
    }
  };

  return {register, handleSubmit, control, previewImages, handleImageUpload, removeImage, onSubmit, watch, availableCoatings, loading,errorMsg,setValue, formState, successMsg}

};

export default useEditBanner;