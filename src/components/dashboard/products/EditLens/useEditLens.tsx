/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-toastify";
import { closeEdit } from "../../../../app/redux/features/modalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { useForm } from "react-hook-form";
import type { LensFormData } from "../../../../types/interface";
import { useUpdateLensMutation } from "../../../../app/redux/api/lensApi";

const availableCoatings = [
  "Anti-Reflective",
  "UV Protection",
  "Blue Light Filter",
  "Scratch Resistant",
];

const useEditLens = () => {
    const {editableData:initialData} = useSelector((state:RootState) => state.modal)

const { register, handleSubmit, control, setValue, watch} = useForm<LensFormData>({
    defaultValues: initialData as LensFormData || {
      name: "",
      images: [],
      newImages: [],
      lensType: "",
      material: "",
      coatings: [],
      prescriptionRange: "",
      index: 0,
      thickness: "",
      color: "",
      diameter: 0,
      purchasePrice: "",
      salesPrice: "",
      stock: 0,
      brand: "",
      offer: 0,
      rating: 0,
      warranty: "",
      deliveryTime: "",
      description: "",
      featured: false,
    },
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [editFrame, { isLoading, error }] = useUpdateLensMutation();
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
    setValue("newImages", [...files as any]);
    setPreviewImages((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (index: number) => {
    const currentFiles:any = watch("images") || [];
    setValue("images", currentFiles.filter((_:any, i:any) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCoating = (feature: string) => {
    const current = watch("coatings") || [];
    if (current.includes(feature)) setValue("coatings", current.filter((f:any) => f !== feature));
    else setValue("coatings", [...current, feature]);
  };

  const onSubmit = async (data: LensFormData) => {
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

  return {register, handleSubmit, control, previewImages, handleImageUpload, removeImage, toggleCoating, onSubmit, watch, availableCoatings, isLoading}

};

export default useEditLens;