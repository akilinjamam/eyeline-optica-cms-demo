import { motion } from "framer-motion";
import {  Controller } from "react-hook-form";
import { Input } from "../../../ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../../../ui/select";
import { Textarea } from "../../../ui/textarea";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { Switch } from "../../../ui/switch";
import { ImagePlus, X, Plus } from "lucide-react";
import useAddFrame from "./useAddFrame";

const AddFrame = () => {

  const {availableFeatures, brands, badges, register, handleSubmit, control, watch, toggleFeature,  onSubmit, isLoading, addVariant,removeVariant,handleVariantImageUpload,removeVariantImage} = useAddFrame()

  return (
    <div className="p-4 bg-gray-50 h-screen overflow-y-scroll hide-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mx-auto bg-white rounded-3xl shadow-xl p-6 flex flex-col h-[90%]"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Frame</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto p-2 md:p-4 flex-1 hide-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>Frame Name</Label>
              <Input placeholder="Stylish Sunglasses" {...register("name")} required />
            </div>

            <div className="space-y-3">
              <Label>Type</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select  onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value="sunglasses">Sunglasses</SelectItem>
                      <SelectItem value="eye glasses">Eye Glasses</SelectItem>
                      <SelectItem value="special glasses">Special Glasses</SelectItem>
                      <SelectItem value="power sunglasses">Power Sunglasses</SelectItem>
                      <SelectItem value="progressive lense">Progressive Lense</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Material</Label>
              <Controller
                name="materialsCategory"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select material" /></SelectTrigger>
                    <SelectContent>
                      {["metal","plastic","acetate","titanium","wood","texture"].map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Frame Category</Label>
              <Controller
                name="frameCategory"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select frame category" /></SelectTrigger>
                    <SelectContent>
                      {["full-rim","half rim","rimless"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Size Category</Label>
              <Controller
                name="sizeCategory"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select size" /></SelectTrigger>
                    <SelectContent>
                      {["small","medium","large"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Shape Category</Label>
              <Controller
                name="shapeCategory"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select shape" /></SelectTrigger>
                    <SelectContent>
                      {["oval","round","square","cats eye","rectangle","avietor","browline","horn"].map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Biology Category</Label>
              <Controller
                name="biologyCategory"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select audience" /></SelectTrigger>
                    <SelectContent>
                      {["men","women","kids"].map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Color</Label>
              <Input {...register("color")} placeholder="Black" required />
            </div>

            <div className="space-y-3">
              <Label>Purchase Price</Label>
              <Input type="number" {...register("purchase", { valueAsNumber: true })} required/>
            </div>

            <div className="space-y-3">
              <Label>Sales Price</Label>
              <Input type="number" {...register("salesPrice", { valueAsNumber: true })} required/>
            </div>

            <div className="space-y-3">
              <Label>Discount</Label>
              <Input type="number" {...register("discount", { valueAsNumber: true })} required />
            </div>

            <div className="space-y-3">
              <Label>Quantity</Label>
              <Input type="number" {...register("quantity", { valueAsNumber: true })} required/>
            </div>

            <div className="space-y-3">
              <Label>Brand</Label>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select brand" /></SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Badge</Label>
              <Controller
                name="badge"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select badge" /></SelectTrigger>
                    <SelectContent>
                      {badges.map((b) => <SelectItem key={b.category} value={b.category}>{b.category}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 space-y-3">
            <Label>Features</Label>
            <div className="flex flex-wrap gap-2">
              {availableFeatures.map((feature) => {
                const active = watch("features").includes(feature);
                return (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`px-3 py-1 rounded-full border text-sm transition ${
                      active
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {feature}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weekly Deals */}
          <div className="mt-2 flex items-center gap-3">
            <Controller
              name="weeklyDeals"
              control={control}
              render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
            />
            <span className="text-gray-700">Weekly Deals</span>
          </div>

          {/* Description */}
          <div className="mt-4 space-y-3">
            <Label>Description</Label>
            <Textarea placeholder="Optional description" {...register("description")} required/>
          </div>

          {/* Images */}
          {/* <div className="mt-4 space-y-3">
            
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
              <input type="file" className="hidden" multiple onChange={handleImageUpload} />
            </label>
          </div> */}
        
           {/* Variants */}
            <div className="mt-6 space-y-3">
              <Label>Color Variants</Label>
              {watch("otherImages")?.map((variant, index) => (
                <div key={index} className="p-4 border rounded-xl space-y-3">
                  <div className="flex gap-3 items-center">
                    <Controller
                      control={control}
                      name={`otherImages.${index}.colorName`}
                      render={({ field }) => (
                        <Input {...field} placeholder="Color Name" />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`otherImages.${index}.fromColor`}
                      render={({ field }) => (
                        <Input type="color" {...field} />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`otherImages.${index}.toColor`}
                      render={({ field }) => (
                        <Input type="color" {...field} />
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeVariant(index)}
                    >
                      Remove
                    </Button>
                  </div>

                  {/* Image previews */}
                  <div className="flex gap-2 flex-wrap">
                    {variant.previews?.map((img, imgIndex) => (
                      <div key={imgIndex} className="relative">
                        <img
                          src={img}
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={() => removeVariantImage(index, imgIndex)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Upload field */}
                  <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <ImagePlus className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Upload Variant Images
                    </span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleVariantImageUpload(index, e)}
                    />
                  </label>
                </div>
              ))}

              <Button type="button" onClick={addVariant}>
                + Add Color Variant
              </Button>
            </div>


          <div className="mt-6">
            <Button disabled={isLoading} type="submit" className="w-full md:w-auto">
              <Plus /> {isLoading ? 'Adding' : 'Add Frame'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFrame;
