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
    otherImages:[],
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
    frameWidth: "",
    bridge: "",
    lensWidth: "",
    lensHeight: "",
    templeLength: "",
    size: "",
    weight: "",
    pdRange: "",
    prescriptionRange: "",
    availableAsProBi: false,
    availableAsReader: false,
    },
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [editFrame, { isLoading, error }] = useUpdateFrameMutation();
  const dispatch = useDispatch();
  console.log(error)
  // Load initial images if editing
  useEffect(() => {
    if(initialData){
      if (initialData?.images && Array.isArray(initialData.images)) {
      const previews = initialData.images.map((img) =>
        typeof img === "string" ? img : URL.createObjectURL(img)
      );
      setPreviewImages(previews);
    }

    if (Array.isArray(initialData.otherImages)) {
      const updatedVariants = initialData.otherImages.map((variant: any) => ({
        ...variant,
        previews: variant.images ? [...variant.images] : [],
        imagesToKeep: [...(variant.images ?? [])], 
        images: [], 
      }));

      setValue("otherImages", updatedVariants);
    }
    }
  }, [initialData,setValue]);

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

   /** ⬇️ Color Variants */
  const addVariant = () => {
    const current = watch("otherImages");
    setValue("otherImages", [
      ...current,
      { colorName: "", fromColor: "", toColor: "", images: [], previews: [] },
    ]);
  };

  const removeVariant = (index: number) => {
    const current = watch("otherImages");
    setValue(
      "otherImages",
      current.filter((_, i) => i !== index)
    );
  };

  const handleVariantImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const current = watch("otherImages");

    const updated = current.map((item, i) =>
      i === index
        ? {
            ...item,
            images: [...(item.images ?? []), ...files],
            previews: [...(item.previews ?? []), ...files.map((f) => URL.createObjectURL(f))],
          }
        : item
    );
    setValue("otherImages", updated);
  };

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
  const currentVariants = watch("otherImages");

  const updatedVariants = currentVariants.map((variant, i) => {
    if (i !== variantIndex) return variant;

    const removedImage = variant.previews[imageIndex];
    const isOldImage = typeof removedImage === "string";

    return {
      ...variant,
      // Remove preview
      previews: variant.previews.filter((_: any, j: number) => j !== imageIndex),

      // Remove the image from the correct list
      images: isOldImage
        ? variant.images // old images aren’t in this list, so keep as-is
        : variant.images.filter((_: any, j: number) => j !== imageIndex - (variant.imagesToKeep?.length || 0)),

      // Remove old URLs from imagesToKeep if it's an old image
      imagesToKeep: isOldImage
        ? variant.imagesToKeep.filter((img: string) => img !== removedImage)
        : variant.imagesToKeep,
    };
  });

  setValue("otherImages", updatedVariants);
};


    const onSubmit = async (data: FrameFormData) => {
      const { _id, images, newImages, otherImages, ...remaining } = data;

      const formData = new FormData();

      // Append text data
      formData.append(
        "data",
        JSON.stringify({
          ...remaining,
          _id,
          images,
          otherImages: otherImages.map((variant: any) => ({
            _id: variant._id,
            colorName: variant.colorName,
            fromColor: variant.fromColor,
            toColor: variant.toColor,
            imagesToKeep: variant.imagesToKeep,
          })),
        })
      );

      // Append all files
      newImages?.forEach((file) => formData.append("images", file));

      otherImages?.forEach((variant: any, i: number) => {
        variant.images?.forEach((file: File) => {
          formData.append(`otherImages_${i}`, file);
        });
      });
      
      formData?.forEach((value,key) => {
        console.log(key,value)
      })

      try {
        const response = await editFrame({id:_id, formData}).unwrap();
        if (response.success) {
          dispatch(closeEdit());
          toast.success(response.message);
          setPreviewImages([]);
        }
      } catch (err: any) {
        console.log(err);
        if (err?.data?.message) {
          alert(err.data.message);
        }
      }
    };

  return {register, handleSubmit, control, previewImages, handleImageUpload, removeImage, toggleFeature, onSubmit, watch, isLoading, addVariant, removeVariant,handleVariantImageUpload, removeVariantImage}

};

export default useEditFrame;