/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateAccessoryMutation } from "../../../../app/redux/api/accessoryApi";
import { toast } from "react-toastify";

// 🔹 Zod schemas
export const accessoryItemSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  barcode: z.string().optional(),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  quantity: z.coerce.number().min(0, "Quantity must be 0 or more"),
  purchasePrice: z.coerce.number().min(0, "Purchase price must be 0 or more"),
  salesPrice: z.coerce.number().min(0, "Sales price must be 0 or more"),
  discount: z.coerce.number().optional(),
  measurement: z.string().min(1, "Measurement is required"),
  description: z.string().optional(),
  stock: z.boolean().default(true),
  sold: z.number().default(0),
});

export const addAccessorySchema = z.object({
  images: z.array(z.instanceof(File)).optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  type: z.enum([
    "With Solution",
    "With Bag",
    "With Kit",
    "With Solution + Kit",
    "With Solution + Bag",
    "With Kit + Bag",
    "With Solution + Bag + Kit",
    "others",
  ]),
  items: z.array(accessoryItemSchema).min(1, "At least one item is required"),
});

export type AddAccessoryForm = z.infer<typeof addAccessorySchema>;

// 🔹 Custom Hook
export const useAddAccessory = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // react-hook-form setup
  const form = useForm<AddAccessoryForm>({
    resolver: zodResolver(addAccessorySchema) as any,
    defaultValues: {
      images: [],
      type: "others",
      rating:0,
      items: [
        {
          name: "",
          barcode: "",
          brand: "",
          category: "",
          quantity: 0,
          purchasePrice: 0,
          salesPrice: 0,
          discount: 0,
          measurement: "",
          description: "",
        },
      ],
    },
  });

  const { handleSubmit, setValue } = form;

  // 🔹 Handle multiple image uploads
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray: File[] = [];
    const readerPromises: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      filesArray.push(file);
      const reader = new FileReader();
      readerPromises.push(
        new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
      );
    }

    // append files to the form 'images' array
    const existingFiles = form.getValues("images") || [];
    setValue("images", [...existingFiles, ...filesArray]);

    Promise.all(readerPromises).then((base64Images) => {
      const updatedPreviews = [...imagePreviews, ...base64Images];
      setImagePreviews(updatedPreviews);
      
    });
  };

  // 🔹 Remove image
  const removeImage = (index: number) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
    const existingFiles = form.getValues("images") || [];
    const updatedFiles = existingFiles.filter((_, i) => i !== index);
    setValue("images", updatedFiles); // ✅ keep form synced
  };

  const [createAccessory, {isLoading:loading, error:apiError} ] = useCreateAccessoryMutation();

  console.log(apiError);

  // 🔹 Form submit handler
  const onSubmit: SubmitHandler<AddAccessoryForm> = async (data) => {
    console.log("📦 Accessory Data Submitted:", data);
    const {images, ...remaining} = data;

    if(!data) return;

    try {
    
      setError(null);
      setSuccess(null);

      const res = await createAccessory({data:remaining as any, images:images as any});

      if(res.data?.success){
        setSuccess(res?.data?.message);
        toast.success(res?.data?.message)
      }else{
        setError(res?.data?.message as string)
        toast.error(res?.data?.message)
      }
      form.reset();
      setImagePreviews([]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    form,
    onSubmit: handleSubmit(onSubmit),
    loading,
    success,
    error,
    imagePreviews,
    handleImageUpload,
    removeImage,
  };
};

export default useAddAccessory;
