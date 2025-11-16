/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useCreateBlogMutation } from "../../../../app/redux/api/blogApi";

// ✅ Validation Schema
const blogSchema = z.object({
  category: z.string().min(1, "Category is required"),
  title:z.string().min(1, "title is required"),
  description:z.string().min(1, "description is required"),
  images: z
    .array(
      z.instanceof(File).or(z.string())
    )
    .nonempty("At least one image is required"),
});

export type BlogFormData = z.infer<typeof blogSchema>;

export const useAddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
    title: "",
    category: "",
    description:"",
    images: [],
    },
  });

 const {watch, setValue, reset, register} = form

  const [previewImages, setPreviewImages] = useState<string>("");
  
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const fileArray = Array.from(e.target.files);
        setValue("images", fileArray); 
        setPreviewImages(URL.createObjectURL(fileArray[0]));
  };
    
      const removeImage = () => {
      const currentFiles = watch("images") || [];
      setValue("images", currentFiles);
      setPreviewImages("");
    };

  const [createBlog] = useCreateBlogMutation()
 
    
  const onSubmit = async (data: BlogFormData) => {
 
    const {images, ...remaining} = data
    try {
      setLoading(true);
      setSuccessMsg("");
      setErrorMsg("");

      // 🌐 Replace with your actual backend API endpoint
      const res = await createBlog({data:remaining, images: images as File[]});

      if (res.data?.success) {
        toast.success(res?.data?.message);
        setSuccessMsg("Banner added successfully!");
        reset()
        setPreviewImages("")
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
    register,
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
