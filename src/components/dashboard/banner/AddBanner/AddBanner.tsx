/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useAddBanner } from "./useAddBanner";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { ImagePlus, X } from "lucide-react";
import { bannerCategories } from "../bannerCategory";



export const AddBanner = () => {


  const { form,
    loading,
    successMsg,
    errorMsg,
    previewImages,
    handleImageUpload,
    removeImage,
    onSubmit, } = useAddBanner();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = form;

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
            Add Banner
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Category Type (ShadCN Select) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category
              </label>
              <Select
                onValueChange={(value:any) => setValue("category", value)}
                value={category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category type" />
                </SelectTrigger>
                <SelectContent>
                  {
                    bannerCategories?.map((category:string) => (
                        <SelectItem value={category}>{category}</SelectItem>
                    ))
                  }
                 
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            
             {/* Images */}
            <div className="mt-4 space-y-3">
                        
            <Label>Upload Images</Label>
            {previewImages.length > 0 && (
            <div className="flex gap-3 mt-3 flex-wrap">
                {previewImages.map((img, idx) => (
                    <div key={idx} className="relative">
                        <img src={img} alt="preview" className="w-20 h-20 object-cover rounded-lg border" />
                        <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                        >
                        <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
            )}
            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-gray-50 transition">
                <ImagePlus className="w-8 h-8 text-gray-500" />
                <span className="mt-2 text-gray-600 text-sm">Click to upload images</span>
                <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
        </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2"
            >
              {loading ? "Adding..." : "Add Banner"}
            </Button>

            {/* Status Messages */}
            {successMsg && (
              <p className="text-green-600 text-center text-sm mt-2">
                {successMsg}
              </p>
            )}
            {errorMsg && (
              <p className="text-red-600 text-center text-sm mt-2">
                {errorMsg}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
