import {motion} from 'framer-motion';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Textarea } from '../../../ui/textarea';
import { Edit, ImagePlus, X } from 'lucide-react';
import { Button } from '../../../ui/button';
import useEditLens from './useEditLens';

const EditLens = () => {

    const {register, handleSubmit, control, previewImages, handleImageUpload, removeImage, toggleCoating, onSubmit, watch, availableCoatings, isLoading} = useEditLens()

    return (
        <div className="p-4 bg-gray-50 h-screen overflow-y-scroll hide-scrollbar">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full mx-auto bg-white rounded-3xl shadow-xl p-6 flex flex-col h-[90%]"
              >
                <h2 className="text-2xl font-bold mb-4">Add New Lens</h2>
        
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="overflow-y-auto p-2 md:p-4 flex-1 hide-scrollbar"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* NAME */}
                    <div className="space-y-3">
                      <Label>Lens Name</Label>
                      <Input
                        placeholder="Anti-Glare Single Vision Lens"
                        {...register("name", { required: "Lens name is required" })}
                      />
                      
                    </div>
        
                    <div className="space-y-3">
                      <Label>Type</Label>
                      <Controller
                        name="lensType"
                        control={control}
                        render={({ field }) => (
                          <Select  onValueChange={field.onChange} value={field.value} required>
                            <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="single vision">Single Vision</SelectItem>
                              <SelectItem value="bifocal">Bifocal</SelectItem>
                              <SelectItem value="progressive">Progressive</SelectItem>
                              <SelectItem value="zero power">Zero Power</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  {/* MATERIAL */}
                  <div className="space-y-3">
                      <Label>Material</Label>
                      <Controller
                        name="material"
                        control={control}
                        render={({ field }) => (
                          <Select  onValueChange={field.onChange} value={field.value} required>
                            <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="polycarbonate">Polycarbonate</SelectItem>
                              <SelectItem value="high-index">High-Index</SelectItem>
                              <SelectItem value="plastic">Plastic</SelectItem>
                              <SelectItem value="glass">Glass</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
        
                
        
                    {/* PRESCRIPTION RANGE */}
                    <div className="space-y-3">
                      <Label>Prescription Range</Label>
                      <Input
                        placeholder="+6.00 to -6.00"
                        {...register("prescriptionRange")}
                      />
                    </div>
        
                    {/* INDEX */}
                    <div className="space-y-3">
                      <Label>Index</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="1.6"
                        {...register("index")}
                      />
                    </div>
        
                    {/* THICKNESS */}
                    <div className="space-y-3">
                      <Label>Thickness</Label>
                      <Input placeholder="Thin cut" {...register("thickness")} />
                    </div>
        
                    {/* DIAMETER */}
                    <div className="space-y-3">
                      <Label>Diameter (mm)</Label>
                      <Input
                        type="number"
                        placeholder="70"
                        {...register("diameter")}
                      />
                    </div>
        
                    {/* COLOR */}
                    <div className="space-y-3">
                      <Label>Color</Label>
                      <Input placeholder="clear" {...register("color")} />
                    </div>
        
                    {/* PURCHASE PRICE */}
                    <div className="space-y-3">
                      <Label>Purchase Price</Label>
                      <Input
                        type="number"
                        placeholder="120"
                        {...register("purchasePrice")}
                      />
                    </div>
        
                    {/* SALES PRICE */}
                    <div className="space-y-3">
                      <Label>Sales Price</Label>
                      <Input
                        type="number"
                        placeholder="120"
                        {...register("salesPrice")}
                      />
                    </div>
        
                    {/* STOCK */}
                    <div className="space-y-3">
                      <Label>Stock</Label>
                      <Input type="number" placeholder="50" {...register("stock")} />
                    </div>
        
                    {/* BRAND */}
                    <div className="space-y-3">
                      <Label>Brand</Label>
                      <Input placeholder="Essilor" {...register("brand")} />
                    </div>
        
                    {/* OFFER */}
                    <div className="space-y-3">
                      <Label>Offer (%)</Label>
                      <Input
                        type="number"
                        placeholder="10"
                        {...register("offer")}
                      />
                    </div>
        
                    {/* RATING */}
                    <div className="space-y-3">
                      <Label>Rating</Label>
                      <Input
                        type="number"
                        step="0.1"
                        max="5"
                        placeholder="4.5"
                        {...register("rating")}
                      />
                    </div>
        
                    {/* WARRANTY */}
                    <div className="space-y-3">
                      <Label>Warranty</Label>
                      <Input placeholder="1 year" {...register("warranty")} />
                    </div>
        
                    {/* DELIVERY TIME */}
                    <div className="space-y-3">
                      <Label>Delivery Time</Label>
                      <Input
                        placeholder="3-5 business days"
                        {...register("deliveryTime")}
                      />
                    </div>
                  </div>
        
                  {/* COATINGS */}
                  <div className="mt-6 space-y-3">
                    <Label>Coatings</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableCoatings.map((coating) => {
                        const active = watch("coatings").includes(coating);
                        return (
                          <button
                            key={coating}
                            type="button"
                            onClick={() => toggleCoating(coating)}
                            className={`px-3 py-1 rounded-full border text-sm transition ${
                              active
                                ? "bg-indigo-500 text-white border-indigo-500"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {coating}
                          </button>
                        );
                      })}
                    </div>
                  </div>
        
                  {/* DESCRIPTION */}
                  <div className="mt-4 space-y-3">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Durable single vision lens with anti-reflective coating."
                      {...register("description")}
                    />
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
                      <input type="file" className="hidden" multiple onChange={handleImageUpload} />
                    </label>
                  </div>
        
                  {/* SUBMIT */}
                  <div className="mt-6">
                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-blue-600"
                      disabled={isLoading ? true : false}
                    >
                     <Edit /> {isLoading ? 'Editing' : 'Edit Lens'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
    );
};

export default EditLens;