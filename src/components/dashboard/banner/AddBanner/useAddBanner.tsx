/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useCreateBannerMutation } from "../../../../app/redux/api/bannerApi";

// ✅ Validation Schema
const bannerSchema = z.object({
  category: z.string().min(1, "Category is required"),
  images: z
    .array(
      z.instanceof(File).or(z.string())
    )
    .nonempty("At least one image is required"),
});

export type BannerFormData = z.infer<typeof bannerSchema>;

export const useAddBanner = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      category: "",
      images: [],
    },
  });

 const {watch, setValue, reset} = form

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

  const [createBanner] = useCreateBannerMutation();
 
    
  const onSubmit = async (data: BannerFormData) => {
 
    const {images, ...remaining} = data
    try {
      setLoading(true);
      setSuccessMsg("");
      setErrorMsg("");

      // 🌐 Replace with your actual backend API endpoint
      const res = await createBanner({data:remaining, images: images as File[]});

      if (res.data?.success) {
        toast.success(res?.data?.message);
        setSuccessMsg("Banner added successfully!");
        reset()
        setPreviewImages([])
      }
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message || "Failed to add Banner. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    successMsg,
    errorMsg,
    previewImages,
    handleImageUpload,
    removeImage,
    onSubmit,
  };
};
