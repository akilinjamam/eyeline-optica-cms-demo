/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import type { ContactLens } from '../../../../types/interface';
import { useCreateContactLensMutation } from '../../../../app/redux/api/contactLensApi';

const useAddContactLens = () => {

  const { register, handleSubmit, control, setValue, watch, reset } = useForm<ContactLens>({
    defaultValues: {
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
  const [createContactLens, { isLoading, error }] = useCreateContactLensMutation();
  console.log(isLoading)
  console.log(error)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const current = watch("images") || [];
    setValue("images", [...current as any, ...files]);
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

  const onSubmit = async (data: ContactLens) => {
   
    const {images, diameter, baseCurve, offer,purchasePrice, salesPrice, waterContent,  stock, ...remaining} = data;
    console.log(data)
    const formData = {
      data: {diameter:+diameter, baseCurve:+baseCurve, offer:+offer, purchasePrice:+purchasePrice, salesPrice:+salesPrice, stock:+stock , waterContent:`${waterContent}%`,...remaining},
      images
    }

    console.log(formData)

    try {
      const response = await createContactLens(formData as any).unwrap();
       console.log("Contact Lens created:", response);
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
 return { register, handleSubmit, control, watch,previewImages, handleImageUpload, toggleFeature, removeImage, onSubmit, isLoading, error }
 
};


export default useAddContactLens;