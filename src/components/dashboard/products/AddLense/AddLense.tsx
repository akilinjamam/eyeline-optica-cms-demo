/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../../../ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../../../ui/select";
import { Textarea } from "../../../ui/textarea";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { Switch } from "../../../ui/switch";
import { ImagePlus, X, Plus } from "lucide-react";

const availableCoatings = ["Anti-Reflective", "UV Protection", "Blue Light Filter", "Scratch Resistant"];

const AddLens = () => {
  const [formData, setFormData] = useState({
    name: "",
    images: [] as string[],
    lensType: "",
    material: "",
    coatings: [] as string[],
    prescriptionRange: "",
    index: "",
    thickness: "",
    color: "",
    diameter: "",
    purchasePrice: "",
    salesPrice: "",
    stock: "",
    brand: "",
    offer: "",
    rating: "",
    warranty: "",
    deliveryTime: "",
    description: "",
    featured: false,
  });

  const handleChange = (key: string, value: any) =>
    setFormData((p) => ({ ...p, [key]: value }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const urls = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
    setFormData((p) => ({ ...p, images: [...p.images, ...urls] }));
  };

  const removeImage = (index: number) =>
    setFormData((p) => ({ ...p, images: p.images.filter((_, i) => i !== index) }));

  const toggleCoating = (coating: string) =>
    setFormData((p) => ({
      ...p,
      coatings: p.coatings.includes(coating)
        ? p.coatings.filter((c) => c !== coating)
        : [...p.coatings, coating],
    }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Lens Data:", formData);
  };

  return (
    <div className="p-4 bg-gray-50 h-screen overflow-y-scroll hide-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mx-auto bg-white rounded-3xl shadow-xl p-6 flex flex-col h-[90%]"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Lens</h2>

        {/* Scrollable form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-2 md:p-4 flex-1 hide-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NAME */}
            <div className="space-y-3">
              <Label>Lens Name</Label>
              <Input
                placeholder="Anti-Glare Single Vision Lens"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {/* LENS TYPE */}
            <div className="space-y-3">
              <Label>Lens Type</Label>
              <Select onValueChange={(v) => handleChange("lensType", v)}>
                <SelectTrigger><SelectValue placeholder="Select lens type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single vision">Single Vision</SelectItem>
                  <SelectItem value="bifocal">Bifocal</SelectItem>
                  <SelectItem value="progressive">Progressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* MATERIAL */}
            <div className="space-y-3">
              <Label>Material</Label>
              <Select onValueChange={(v) => handleChange("material", v)}>
                <SelectTrigger><SelectValue placeholder="Select material" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="polycarbonate">Polycarbonate</SelectItem>
                  <SelectItem value="trivex">Trivex</SelectItem>
                  <SelectItem value="hi-index">Hi-Index</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* PRESCRIPTION RANGE */}
            <div className="space-y-3">
              <Label>Prescription Range</Label>
              <Input
                placeholder="+6.00 to -6.00"
                value={formData.prescriptionRange}
                onChange={(e) => handleChange("prescriptionRange", e.target.value)}
              />
            </div>

            {/* INDEX */}
            <div className="space-y-3">
              <Label>Index</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="1.6"
                value={formData.index}
                onChange={(e) => handleChange("index", e.target.value)}
              />
            </div>

            {/* THICKNESS */}
            <div className="space-y-3">
              <Label>Thickness</Label>
              <Input
                placeholder="Thin cut"
                value={formData.thickness}
                onChange={(e) => handleChange("thickness", e.target.value)}
              />
            </div>

            {/* DIAMETER */}
            <div className="space-y-3">
              <Label>Diameter (mm)</Label>
              <Input
                type="number"
                placeholder="70"
                value={formData.diameter}
                onChange={(e) => handleChange("diameter", e.target.value)}
              />
            </div>

            {/* COLOR */}
            <div className="space-y-3">
              <Label>Color</Label>
              <Input
                placeholder="clear"
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
              />
            </div>

            {/*PURCHASE PRICE */}
            <div className="space-y-3">
              <Label>Purchase Price</Label>
              <Input
                type="number"
                placeholder="120"
                value={formData.purchasePrice}
                onChange={(e) => handleChange("purchasePrice", e.target.value)}
              />
            </div>

            {/*SALES PRICE */}
            <div className="space-y-3">
              <Label>Sales Price</Label>
              <Input
                type="number"
                placeholder="120"
                value={formData.salesPrice}
                onChange={(e) => handleChange("salesPrice", e.target.value)}
              />
            </div>

            {/* STOCK */}
            <div className="space-y-3">
              <Label>Stock</Label>
              <Input
                type="number"
                placeholder="50"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
              />
            </div>

            {/* BRAND */}
            <div className="space-y-3">
              <Label>Brand</Label>
              <Input
                placeholder="Essilor"
                value={formData.brand}
                onChange={(e) => handleChange("brand", e.target.value)}
              />
            </div>

            {/* OFFER */}
            <div className="space-y-3">
              <Label>Offer (%)</Label>
              <Input
                type="number"
                placeholder="10"
                value={formData.offer}
                onChange={(e) => handleChange("offer", e.target.value)}
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
                value={formData.rating}
                onChange={(e) => handleChange("rating", e.target.value)}
              />
            </div>

            {/* WARRANTY */}
            <div className="space-y-3">
              <Label>Warranty</Label>
              <Input
                placeholder="1 year"
                value={formData.warranty}
                onChange={(e) => handleChange("warranty", e.target.value)}
              />
            </div>

            {/* DELIVERY TIME */}
            <div className="space-y-3">
              <Label>Delivery Time</Label>
              <Input
                placeholder="3-5 business days"
                value={formData.deliveryTime}
                onChange={(e) => handleChange("deliveryTime", e.target.value)}
              />
            </div>
          </div>

          {/* COATINGS */}
          <div className="mt-6 space-y-3">
            <Label>Coatings</Label>
            <div className="flex flex-wrap gap-2">
              {availableCoatings.map((coating) => {
                const active = formData.coatings.includes(coating);
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

          {/* FEATURED TOGGLE */}
          <div className="mt-4 flex items-center gap-3">
            <Switch
              checked={formData.featured}
              onCheckedChange={(v) => handleChange("featured", v)}
            />
            <span className="text-gray-700">Mark as Featured</span>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4 space-y-3">
            <Label>Description</Label>
            <Textarea
              placeholder="Durable single vision lens with anti-reflective coating."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* IMAGES */}
          <div className="mt-4 space-y-3">
            <Label>Upload Images</Label>
            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-gray-50 transition">
              <ImagePlus className="w-8 h-8 text-gray-500" />
              <span className="mt-2 text-gray-600 text-sm">Click to upload images</span>
              <input type="file" className="hidden" multiple onChange={handleImageUpload} />
            </label>

            {formData.images.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {formData.images.map((img, idx) => (
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
          </div>

          {/* SUBMIT */}
          <div className="mt-6">
            <Button type="submit" className="w-full md:w-auto bg-blue-600"><Plus/> Add Lens</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddLens;
