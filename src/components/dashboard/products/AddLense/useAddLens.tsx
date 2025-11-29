/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateLensMutation } from "../../../../app/redux/api/lensApi";
import { toast } from "react-toastify";
import type { LensFormData } from "../../../../types/interface";
import useCategory from "../../../../reusableComponent/useCategory";


const useAddLens = () => {

  const {category:availableCoatings} = useCategory("Lens Coating")


    const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control
  } = useForm<LensFormData>({
    defaultValues: {
      name: "",
      images: [],
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
      brand: "",
      offer: null,
      rating: 0,
      warranty: "",
      deliveryTime: "",
      description: "",
      featured: false,
      quantity:"",
      badge: ""
    },
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

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


  const toggleCoating = (coating: string) => {
    const current = watch("coatings") || [];
    if (current.includes(coating)) setValue("coatings", current.filter((f) => f !== coating));
    else setValue("coatings", [...current, coating]);
  };

  const [createLens, {isLoading}] = useCreateLensMutation()

  
  const onSubmit = async (data: LensFormData) => {
        console.log("Lens Data:", data);
        const {images, diameter, index, offer, rating, salesPrice, purchasePrice, quantity, ...remaining} = data;
        const formData = {
          data: {diameter: +diameter, index:+index, rating: +rating, salesPrice: +salesPrice, purchasePrice: +purchasePrice, offer:offer !== null ? +offer : 0, quantity:+quantity ,...remaining},
          images
        }
        console.log(formData)

        try {
          const response = await createLens(formData as any).unwrap();
           console.log("Frame created:", response);
           if(response.success){
            toast.success(response.message)
            reset();  
            setPreviewImages([]); 
           }
        } catch (err:any) {
          console.log(err)
          if (err?.data?.message) {
            alert(err.data.message); 
          }
        }
  };

  return {availableCoatings,previewImages, register, handleSubmit, reset, handleImageUpload, removeImage, toggleCoating, onSubmit, watch, control, setValue, isLoading}

}

export default useAddLens;
