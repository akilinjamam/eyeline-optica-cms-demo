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

const availableFeatures = ["UV Protection", "Polarized", "Blue Light Filter", "Anti-Glare"];

const AddFrame = () => {
  const [formData, setFormData] = useState({
    name: "",
    images: [] as string[],
    type: "",
    materialsCategory: "",
    frameCategory: "",
    sizeCategory: "",          // ✅ Restored
    shapeCategory: "",         // ✅ Restored
    biologyCategory: "",
    color: "",
    purchase: "",
    salesPrice: "",
    discount: "",
    features: [] as string[],
    brand: "",
    barcode: "",
    badge: "",
    description: "",
    weeklyDeals: false,
    frameMeasurements: "",
    frameDetails: "",
    prescriptionDetails: "",
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

  const toggleFeature = (feature: string) =>
    setFormData((p) => ({
      ...p,
      features: p.features.includes(feature)
        ? p.features.filter((f) => f !== feature)
        : [...p.features, feature],
    }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Frame Data:", formData);
  };

  return (
    <div className="p-4 bg-gray-50 h-screen overflow-y-scroll hide-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mx-auto bg-white rounded-3xl shadow-xl p-6 flex flex-col h-[90%] "
      >
        <h2 className="text-2xl font-bold mb-4">Add New Frame</h2>

        {/* Scrollable form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto p-2 md:p-4 flex-1 hide-scrollbar"
        >
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NAME */}
            <div className="space-y-3">
              <Label className="mb-2">Frame Name</Label>
              <Input
                placeholder="Stylish Sunglasses"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {/* TYPE */}
            <div className="space-y-3">
              <Label className="mb-2">Type</Label>
              <Select onValueChange={(v) => handleChange("type", v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunglasses">Sunglasses</SelectItem>
                  <SelectItem value="eyeglasses">Eyeglasses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* MATERIAL */}
            <div className="space-y-3">
              <Label className="mb-2">Material</Label>
              <Select onValueChange={(v) => handleChange("materialsCategory", v)}>
                <SelectTrigger><SelectValue placeholder="Select material" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="acetate">Acetate</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* FRAME CATEGORY */}
            <div className="space-y-3">
              <Label className="mb-2">Frame Category</Label>
              <Select onValueChange={(v) => handleChange("frameCategory", v)}>
                <SelectTrigger><SelectValue placeholder="Select frame category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-rim">Full-rim</SelectItem>
                  <SelectItem value="half-rim">Half-rim</SelectItem>
                  <SelectItem value="rimless">Rimless</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ✅ SIZE CATEGORY (restored) */}
            <div className="space-y-3">
              <Label className="mb-2">Size Category</Label>
              <Select onValueChange={(v) => handleChange("sizeCategory", v)}>
                <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ✅ SHAPE CATEGORY (restored) */}
            <div className="space-y-3">
              <Label className="mb-2">Shape Category</Label>
              <Select onValueChange={(v) => handleChange("shapeCategory", v)}>
                <SelectTrigger><SelectValue placeholder="Select shape" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="round">Round</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="rectangle">Rectangle</SelectItem>
                  <SelectItem value="aviator">Aviator</SelectItem>
                  <SelectItem value="cat-eye">Cat-eye</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* BIOLOGY */}
            <div className="space-y-3">
              <Label className="mb-2">Biology Category</Label>
              <Select onValueChange={(v) => handleChange("biologyCategory", v)}>
                <SelectTrigger><SelectValue placeholder="Select audience" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* COLOR */}
            <div className="space-y-3">
              <Label className="mb-2">Color</Label>
              <Input
                placeholder="black"
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
              />
            </div>

            {/* PURCHASE */}
            <div className="space-y-3">
              <Label className="mb-2">Purchase Price</Label>
              <Input
                type="number"
                placeholder="100"
                value={formData.purchase}
                onChange={(e) => handleChange("purchase", e.target.value)}
              />
            </div>

            {/* SALES PRICE */}
            <div className="space-y-3">
              <Label className="mb-2">Sales Price</Label>
              <Input
                type="number"
                placeholder="200"
                value={formData.salesPrice}
                onChange={(e) => handleChange("salesPrice", e.target.value)}
              />
            </div>
          </div>

          {/* FEATURES */}
          <div className="mt-6 space-y-3">
            <Label className="mb-2">Features</Label>
            <div className="flex flex-wrap gap-2">
              {availableFeatures.map((feature) => {
                const active = formData.features.includes(feature);
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

          {/* WEEKLY DEALS */}
          <div className="mt-2 flex items-center gap-3">
            <Switch
              checked={formData.weeklyDeals}
              onCheckedChange={(v) => handleChange("weeklyDeals", v)}
            />
            <span className="text-gray-700">Weekly Deals</span>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4 space-y-3">
            <Label className="mb-2">Description</Label>
            <Textarea
              placeholder="Best sunglasses in 2025"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* IMAGES */}
          <div className="mt-4 space-y-3">
            <Label className="mb-2">Upload Images</Label>
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
            <Button type="submit" className="w-full md:w-auto bg-blue-600"><Plus/> Add Frame</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFrame;
