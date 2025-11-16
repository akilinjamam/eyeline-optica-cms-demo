/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { ImagePlus, X } from "lucide-react";
import { blogCategories } from "../blogCategory";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import useEditBlog from "./useEditBlog";

export const EditBlog = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState:{errors},
    loading,
    successMsg,
    errorMsg,
    previewImages,
    handleImageUpload,
    removeImage,
    onSubmit,
  } = useEditBlog();

  const category = watch("category");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-2 mx-auto mt-8"
    >
      <Card className="p-4 shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Edit Blog
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Title */}
            <div className="space-y-4">
              <Label>Title</Label>
              <Input placeholder="Blog Title" {...register("title")} />
              {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div>
              <Label className="mb-4">Category</Label>
              <Select
                onValueChange={(value: any) => setValue("category", value)}
                value={category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {blogCategories?.map((cat: string) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <Label>Description</Label>
              <Textarea placeholder="Blog description" {...register("description")} />
            </div>

            {/* Image */}
            <div className="mt-4 space-y-3">
              <Label>Upload Image</Label>

              {previewImages && (
                <div className="relative inline-block">
                  <img
                    src={previewImages}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-gray-50 transition">
                <ImagePlus className="w-8 h-8 text-gray-500" />
                <span className="mt-2 text-gray-600 text-sm">Click to upload image</span>
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>

            {/* Submit */}
            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? "Updating..." : "Update Blog"}
            </Button>

            {/* Status Messages */}
            {successMsg && <p className="text-green-600 text-center mt-2">{successMsg}</p>}
            {errorMsg && <p className="text-red-600 text-center mt-2">{errorMsg}</p>}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
