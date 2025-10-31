import { motion } from "framer-motion";
import { Input } from "../../../ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../../../ui/select";
import { Textarea } from "../../../ui/textarea";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { ImagePlus, X, Plus } from "lucide-react";
import { Controller } from "react-hook-form";
import useAddContactLens from "./useAddContactLens";
import { Switch } from "../../../ui/switch";
import useCategory from "../../../../reusableComponent/useCategory";
import type { ICategory } from "../../../../types/interface";

const AddContactLens = () => {
  const {category:availableFeatures} = useCategory("Contact Lens Feature")
    const { register, handleSubmit, control, watch,previewImages, handleImageUpload, toggleFeature, removeImage, onSubmit, isLoading} = useAddContactLens()
   return (
    <div className="p-4 bg-gray-50 h-screen overflow-y-scroll hide-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mx-auto bg-white rounded-3xl shadow-xl p-6 flex flex-col h-[90%]"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Contact Lens</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-y-auto p-2 md:p-4 flex-1 hide-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NAME */}
            <div className="space-y-3">
              <Label>Lens Name</Label>
              <Input
                placeholder="Air Optix HydraGlyde"
                {...register("name", { required: true })}
              />
            </div>

            {/* BRAND */}
            <div className="space-y-3">
              <Label>Brand</Label>
              <Input placeholder="Alcon" {...register("brand")} />
            </div>

            {/* TYPE */}
            <div className="space-y-3">
              <Label>Type</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily disposable">Daily Disposable</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly (colored)">Monthly (colored)</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="toric">Toric</SelectItem>
                      <SelectItem value="multifocal">Multifocal</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {/* POWER TYPE */}
            <div className="space-y-3">
              <Label>Power Type</Label>
              <Controller
                name="powerType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select power type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="with power">With Power</SelectItem>
                      <SelectItem value="without power">Without Power</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* MATERIAL */}
            <div className="space-y-3">
              <Label>Material</Label>
              <Input
                placeholder="Silicone Hydrogel"
                {...register("material")}
              />
            </div>

            {/* WATER CONTENT */}
            <div className="space-y-3">
              <Label>Water Content (%)</Label>
              <Input type="number" placeholder="38" {...register("waterContent")} />
            </div>

            {/* DIAMETER */}
            <div className="space-y-3">
              <Label>Diameter (mm)</Label>
              <Input type="number" placeholder="14.2" {...register("diameter")} />
            </div>

            {/* BASE CURVE */}
            <div className="space-y-3">
              <Label>Base Curve</Label>
              <Input type="number" placeholder="8.6" {...register("baseCurve")} />
            </div>

            {/* POWER RANGE */}
            <div className="space-y-3">
              <Label>Power Range</Label>
              <Input placeholder="+6.00 to -8.00" {...register("powerRange")} />
            </div>

            {/* REPLACEMENT SCHEDULE */}
            <div className="space-y-3">
              <Label>Replacement Schedule</Label>
              <Input placeholder="Monthly" {...register("replacementSchedule")} />
            </div>

            {/* COLOR */}
            <div className="space-y-3">
              <Label>Color</Label>
              <Input placeholder="Clear" {...register("color")} />
            </div>

            {/*PURCHASE PRICE */}
            <div className="space-y-3">
              <Label>Purchase Price</Label>
              <Input type="number" placeholder="120" {...register("purchasePrice")} />
            </div>

            {/*SALES PRICE */}
            <div className="space-y-3">
              <Label>Sales Price</Label>
              <Input type="number" placeholder="120" {...register("salesPrice")} />
            </div>
            {/*QUANTITY PRICE */}
            <div className="space-y-3">
              <Label>Quantity</Label>
              <Input type="number" placeholder="120" {...register("quantity")} />
            </div>
            

            {/* STOCK */}
            {/* <div className="space-y-3">
              <Label>Stock</Label>
              <Input type="number" placeholder="50" {...register("stock")} />
            </div> */}

            {/* OFFER */}
            <div className="space-y-3">
              <Label>Offer (%)</Label>
              <Input type="number" placeholder="10" {...register("offer")} />
            </div>
          </div>

          {/* FEATURES */}
          <div className="mt-6 space-y-3">
            <Label>Features</Label>
            <div className="flex flex-wrap gap-2">
              {availableFeatures.map((feature:ICategory) => {
                const active = watch("features").includes(feature?.category)
                return (
                  <button
                    key={feature?._id}
                    type="button"
                    onClick={() => toggleFeature(feature?.category)}
                    className={`px-3 py-1 rounded-full border text-sm transition ${
                      active
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {feature?.category}
                  </button>
                );
              })}
            </div>
          </div>

          

          {/* DESCRIPTION */}
          <div className="mt-4 space-y-3">
            <Label>Description</Label>
            <Textarea
              placeholder="Comfortable monthly contact lenses with high oxygen permeability"
              {...register("description")}
            />
          </div>
          {/* Weekly Deals */}
            <div className="mt-2 flex items-center gap-3">
                <Controller
                  name="uvProtection"
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
                <span className="text-gray-700">UV Protection</span>
          </div>

          {/* IMAGES */}
          <div className="mt-4 space-y-3">
            <Label>Upload Images</Label>
            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-gray-50 transition">
              <ImagePlus className="w-8 h-8 text-gray-500" />
              <span className="mt-2 text-gray-600 text-sm">
                Click to upload images
              </span>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleImageUpload}
              />
            </label>

            {previewImages.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {previewImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
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
          </div>

          {/* SUBMIT */}
          <div className="mt-6">
            <Button disabled={isLoading ? true : false} type="submit" className="w-full md:w-auto bg-blue-600">
              {!isLoading && <Plus />} {isLoading ? 'Adding' : 'Add Contact Lens'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddContactLens;
