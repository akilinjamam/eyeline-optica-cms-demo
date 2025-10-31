/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateFrameMutation } from '../../../../app/redux/api/frameApi';
import { useForm } from 'react-hook-form';
import useCategory from '../../../../reusableComponent/useCategory';

const useAddFrame = () => {
  
  const {category:categoryFrameFeatures, isLoading:isLoadingCategory} = useCategory("Frame Feature")
  const {category:badges, isLoading:isLoadingBadge} = useCategory("Frame Badge")

const availableFeatures = isLoadingCategory ? ["Loading..."] : categoryFrameFeatures?.map((feature) => feature?.category);
const brands = ["raybon", "Alex Perry", "Oakley"];

type FrameFormData = {
  name: string;
  images: File[]; 
  type: "sunglasses" | "eye glasses" | "special glasses" | "power sunglasses" | "progressive lense";
  materialsCategory: "metal" | "plastic" | "acetate" | "titanium" | "wood" | "texture";
  frameCategory: "full-rim" | "half rim" | "rimless";
  sizeCategory: "small" | "medium" | "large";
  shapeCategory: "oval" | "round" | "square" | "cats eye" | "rectangle" | "avietor" | "browline" | "horn";
  biologyCategory: "men" | "women" | "kids";
  color: string;
  purchase: number | null;
  salesPrice: number | null;
  discount: number | null;
  quantity: number;
  features: string[];
  brand: "raybon" | "Alex Perry" | "Oakley";
  badge?: "popular" | "new" | "premium" | "luxury" | "best" | "trending" | "budget" | "";
  description?: string;
  weeklyDeals: boolean;
  frameMeasurements?: string;
  frameDetails?: string;
  prescriptionDetails?: string;
};


  const { register, handleSubmit, control, setValue, watch, reset } = useForm<FrameFormData>({
    defaultValues: {
      name: "",
      images: [],
      type: "sunglasses",
      materialsCategory: "metal",
      frameCategory: "full-rim",
      sizeCategory: "medium",
      shapeCategory: "round",
      biologyCategory: "men",
      color: "",
      purchase: null,
      salesPrice: null,
      discount: null,
      quantity: 1,
      features: [],
      brand: "raybon",
      badge: "",
      description: "",
      weeklyDeals: false,
      frameMeasurements: "",
      frameDetails: "",
      prescriptionDetails: "",
    },
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [createFrame, { isLoading, error }] = useCreateFrameMutation();
 
  console.log(isLoading)
  console.log(error)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const current = watch("images") || [];
    setValue("images", [...current, ...files]);
    setPreviewImages((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (index: number) => {
    const currentFiles = watch("images") || [];
    setValue("images", currentFiles.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleFeature = (feature: string) => {
    const current = watch("features") || [];
    if (current.includes(feature)) setValue("features", current.filter((f) => f !== feature));
    else setValue("features", [...current, feature]);
  };

  const onSubmit = async (data: FrameFormData) => {
    const barcode = `${Date.now()}`;
    const {images, ...remaining} = data;
    console.log(data)
    const formData = {
      data: {...remaining, barcode},
      images
    }

    try {
      const response = await createFrame(formData as any).unwrap();
       console.log("Frame created:", response);
       if(response.success){
        toast.success(response.message)
        reset();  
        setPreviewImages([]); 
       }
    } catch (err:any) {
      if (err?.data?.message) {
        alert(err.data.message); 
      }
    }

  };
 return {availableFeatures, brands, badges, register, handleSubmit, control, watch,previewImages, handleImageUpload, toggleFeature, removeImage, onSubmit, isLoading, error, categoryFrameFeatures, isLoadingBadge }
 
};


export default useAddFrame;