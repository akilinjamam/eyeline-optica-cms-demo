/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// import { useUpdateAccessoryMutation } from "../../../../app/redux/api/accessoryApi";
import {
  addAccessorySchema,
  type AddAccessoryForm,
} from "../AddAccessory/useAddAccessory";
import { useUpdateAccessoryMutation } from "../../../../app/redux/api/accessoryApi";

export const useEditAccessory = (accessoryData: any) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // ✅ Setup react-hook-form
  const form = useForm<AddAccessoryForm>({
    resolver: zodResolver(addAccessorySchema) as any,
    defaultValues: {
      images: [],
      type: accessoryData?.type || "others",
      items: accessoryData?.items || [
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

  const { handleSubmit, setValue, reset } = form;

  // ✅ Prefill form data when accessoryData changes
  useEffect(() => {
    if (accessoryData) {
      reset({
        images: [],
        type: accessoryData?.type || "others",
        items: accessoryData?.items || [],
      });

      // show preview of already existing images (if URLs are present)
      if (accessoryData?.images && accessoryData.images.length > 0) {
        setImagePreviews(accessoryData.images);
      }
    }
  }, [accessoryData, reset]);

  // ✅ Handle image uploads
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

    const existingFiles = form.getValues("images") || [];
    setValue("images", [...existingFiles, ...filesArray]);

    Promise.all(readerPromises).then((base64Images) => {
      const updatedPreviews = [...imagePreviews, ...base64Images];
      setImagePreviews(updatedPreviews);
    });
  };

  // ✅ Remove image
  const removeImage = (index: number) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
    const existingFiles = form.getValues("images") || [];
    const updatedFiles = existingFiles.filter((_, i) => i !== index);
    setValue("images", updatedFiles);
  };

  const [updateAccessory, { isLoading: loading, error: apiError }] =
    useUpdateAccessoryMutation();

  console.log(apiError);

  // ✅ Form submit handler
  const onSubmit: SubmitHandler<AddAccessoryForm> = async (data) => {
    console.log("✏️ Accessory Data Edited:", data);

    const { images, ...remaining } = data;
    if (!accessoryData?._id) return;

    const newData = {
      data: remaining as any,
      images: accessoryData?.images,
    };

    try {
      setError(null);
      setSuccess(null);
      const res = await updateAccessory({
        id: accessoryData._id,
        data: newData as any,
        images: images ? images : [],
      });
      if (res.data?.success) {
        setSuccess(res.data.message);
        toast.success(res.data.message);
      } else {
        setError(res?.data?.message as string);
        toast.error(res?.data?.message);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
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

export default useEditAccessory;
