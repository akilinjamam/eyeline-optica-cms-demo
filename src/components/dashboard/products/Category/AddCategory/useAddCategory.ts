/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategoryMutation } from "../../../../../app/redux/api/categoryApi";
import { toast } from "react-toastify";

// ✅ Validation Schema
const categorySchema = z.object({
  categoryType: z.string().min(1, "Category type is required"),
  category: z.string().min(1, "Category name is required"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const useAddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryType: "",
      category: "",
    },
  });

  const [createCategory] = useCreateCategoryMutation();

  const onSubmit = async (data: CategoryFormData) => {
    console.log(data);
    try {
      setLoading(true);
      setSuccessMsg("");
      setErrorMsg("");

      // 🌐 Replace with your actual backend API endpoint
      const res = await createCategory(data);

      if (res.data?.success) {
        toast.success(res?.data?.message);
        setSuccessMsg("Category added successfully!");
        form.resetField("category");
      }
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message || "Failed to add category. Try again."
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
    onSubmit,
  };
};
