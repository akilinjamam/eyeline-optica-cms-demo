/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-toastify";
import { closeEdit } from "../../../../app/redux/features/modalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { useForm } from "react-hook-form";
import type { ContactLens } from "../../../../types/interface";
import { useUpdateContactLensMutation } from "../../../../app/redux/api/contactLensApi";


const useEditContactLens = () => {
    const {editableData:initialData} = useSelector((state:RootState) => state.modal)

const { register, handleSubmit, control, setValue, watch} = useForm<ContactLens>({
    defaultValues: initialData as ContactLens || {
    name: "",
    images: [] as string[],
    brand: "",
    type:"",
    material: "",
    waterContent: "",
    diameter: 0,
    baseCurve: 0,
    powerRange: "",
    uvProtection:false,
    replacementSchedule: "",
    color: "",
    purchasePrice: 0,
    salesPrice: 0,
    stock: 0,
    offer: 0,
    features: [] as string[],
    description: "",
    },
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [editContactLens, { isLoading, error }] = useUpdateContactLensMutation();
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

  const toggleFeature = (feature: string) => {
    const current = watch("features") || [];
    if (current.includes(feature)) setValue("features", current.filter((f:any) => f !== feature));
    else setValue("features", [...current, feature]);
  };

  const onSubmit = async (data: ContactLens) => {
    const {_id ,images, newImages,   ...remaining } = data;
    
    const formData = {
      id:_id,
      data: {...remaining, images},
      images:newImages,
    };
    console.log(formData)
    try {
      const response = await editContactLens(formData as any).unwrap();
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

  return {register, handleSubmit, control, previewImages, handleImageUpload, removeImage, toggleFeature, onSubmit, watch, isLoading}

};

export default useEditContactLens;