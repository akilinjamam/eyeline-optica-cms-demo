/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-toastify";
import { closeEdit } from "../../../../app/redux/features/modalSlice";
import type { FrameFormData } from "../../../../types/type";
import { useEffect, useState } from "react";
import { useUpdateFrameMutation } from "../../../../app/redux/api/frameApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { useForm } from "react-hook-form";


const useEditFrame = () => {
    const {editableData:initialData} = useSelector((state:RootState) => state.modal)

const { register, handleSubmit, control, setValue, watch} = useForm<FrameFormData>({
    defaultValues: initialData as FrameFormData || {
    name: "",
    images: [],
    newImages:[],
    type: "sunglasses",
    materialsCategory: "metal",
    frameCategory: "full-rim",
    sizeCategory: "medium",
    shapeCategory: "round",
    biologyCategory: "men",
    color: "",
    purchase: 0,
    salesPrice: 0,
    discount: 0,
    quantity: 1,
    features: [],
    brand: "raybon",
    badge: "popular",
    description: "",
    weeklyDeals: false,
    frameMeasurements: "",
    frameDetails: "",
    prescriptionDetails: "",
    },
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [editFrame, { isLoading, error }] = useUpdateFrameMutation();
  const dispatch = useDispatch();
  console.log(isLoading)
  console.log(error)
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
    setValue("newImages", [...files]);
    setPreviewImages((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (index: number) => {
    const currentFiles:any = watch("images") || [];
    setValue("images", currentFiles.filter((_:any, i:any) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleFeature = (feature: string) => {
    const current = watch("features") || [];
    if (current.includes(feature)) setValue("features", current.filter((f:any) => f !== feature));
    else setValue("features", [...current, feature]);
  };

  const onSubmit = async (data: FrameFormData) => {
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
        alert(err.data.message);
      }
    }
  };

  return {register, handleSubmit, control, previewImages, handleImageUpload, removeImage, toggleFeature, onSubmit, watch}

};

export default useEditFrame;