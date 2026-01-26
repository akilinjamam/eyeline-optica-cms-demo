/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "../../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { useAddCategory } from "./useAddCategory";

export const AddCategory = () => {
  const { form, onSubmit, loading, successMsg, errorMsg } = useAddCategory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = form;

  const categoryType = watch("categoryType");

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
            Add New Category
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Category Type (ShadCN Select) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category Type
              </label>
              <Select
                onValueChange={(value:any) => setValue("categoryType", value)}
                value={categoryType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frame Feature">Frame Feature</SelectItem>
                  <SelectItem value="Frame Shape">Frame Shape</SelectItem>
                  <SelectItem value="Lens Coating">Lens Coating</SelectItem>
                  <SelectItem value="Accessory Type">Accessory Type</SelectItem>
                  <SelectItem value="Contact Lens Feature">
                    Contact Lens Feature
                  </SelectItem>
                  <SelectItem value="Frame Badge">
                    Frame Badge
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.categoryType && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.categoryType.message}
                </p>
              )}
            </div>

            {/* Category Name (Input) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category Name
              </label>
              <Input
                placeholder="Enter category name"
                {...register("category")}
              />
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2"
            >
              {loading ? "Adding..." : "Add Category"}
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
