/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { useFieldArray } from "react-hook-form";
import { useAddAccessory } from "./useAddAccessory";


export default function AddAccessory() {
  const {
    form,
    onSubmit,
    loading,
    success,
    error,
    imagePreviews,
    handleImageUpload,
    removeImage,
  } = useAddAccessory();

  const { register, handleSubmit, control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mx-auto p-6 "
    >
      <Card className="shadow-lg border rounded-2xl bg-white/90 backdrop-blur-sm h-[80vh] overflow-y-scroll hide-scrollbar">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-black">
            Add Accessory
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit as any)}
            className="space-y-6"
            encType="multipart/form-data"
          >
           {/* Accessory Images Section */}
            <div className="">
            <Label className="block mb-3 text-base font-medium text-black">
                Accessory Images
            </Label>

            <div className="">
                <div className="flex flex-wrap gap-4 justify-center">
                {imagePreviews.map((img: any, index: any) => (
                    <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                    >
                    <img
                        src={img}
                        alt={`preview-${index}`}
                        className="w-28 h-28 object-cover rounded-lg border-2 border-blue-200 shadow-sm"
                    />
                    <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 text-xs px-2 py-0 opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => removeImage(index)}
                    >
                        ×
                    </Button>
                    </motion.div>
                ))}

                {/* Add Image Placeholder */}
                <label className="flex flex-col items-center justify-center w-full py-10 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100/40 transition-all mt-4">
                    <span className="text-base font-medium text-black mb-1">
                    + Add Accessory Images
                    </span>
                    <span className="text-xs text-gray-500">
                    Click to upload or drag & drop
                    </span>
                    <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    />
                </label>
                </div>
            </div>
            </div>


            {/* Accessory Type Selector */}
            <div>
              <Label className="block mb-2 text-base font-medium text-black">
                Accessory Type
              </Label>
              <Select
                defaultValue="others"
                onValueChange={(val:any) => form.setValue("type", val as any)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select accessory type" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "With Solution",
                    "With Bag",
                    "With Kit",
                    "With Solution + Kit",
                    "With Solution + Bag",
                    "With Kit + Bag",
                    "With Solution + Bag + Kit",
                    "others",
                  ].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Accessory Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black">
                Accessory Items
              </h3>

              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 p-5 border border-blue-100 rounded-xl bg-blue-50/40 shadow-sm"
                >
                  <div>
                    <Label className="text-sm">Name</Label>
                    <Input
                      {...register(`items.${index}.name`)}
                      placeholder="e.g. Lens Cleaner"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Brand</Label>
                    <Input
                      {...register(`items.${index}.brand`)}
                      placeholder="e.g. OptiFresh"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Category</Label>
                    <Input
                      {...register(`items.${index}.category`)}
                      placeholder="e.g. Accessories"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Quantity</Label>
                    <Input
                      type="number"
                      {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Purchase Price</Label>
                    <Input
                      type="number"
                      {...register(`items.${index}.purchasePrice`, { valueAsNumber: true })}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Sales Price</Label>
                    <Input
                      type="number"
                      {...register(`items.${index}.salesPrice`, { valueAsNumber: true })}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Measurement</Label>
                    <Input
                      {...register(`items.${index}.measurement`)}
                      placeholder="e.g. 50ml"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-sm">Description</Label>
                    <Input
                      {...register(`items.${index}.description`)}
                      placeholder="Short description..."
                    />
                  </div>

                  <div className="col-span-3 flex justify-end">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remove Item
                    </Button>
                  </div>
                </motion.div>
              ))}

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
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
                    stock: true,
                    sold: 0,
                  })
                }
              >
                + Add New Item
              </Button>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white font-semibold"
              >
                {loading ? "Saving..." : "Add Accessory"}
              </Button>
            </div>

            {/* Status Messages */}
            {success && (
              <p className="text-green-600 text-sm text-center">{success}</p>
            )}
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
