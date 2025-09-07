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

const availableFeatures = ["UV Protection", "Blue Light Filter", "Toric (Astigmatism)", "Multifocal"];

const AddContactLens = () => {
  const [formData, setFormData] = useState({
    name: "",
    images: [] as string[],
    brand: "",
    type: "",
    material: "",
    waterContent: "",
    diameter: "",
    baseCurve: "",
    powerRange: "",
    replacementSchedule: "",
    color: "",
    price: "",
    stock: "",
    offer: "",
    features: [] as string[],
    description: "",
    weeklyDeals: false,
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
    console.log("Contact Lens Data:", formData);
  };

  return (
    <div className="p-4 bg-gray-50 h-screen overflow-y-scroll hide-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mx-auto bg-white rounded-3xl shadow-xl p-6 flex flex-col h-[90%]"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Contact Lens</h2>

        {/* Scrollable form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-2 md:p-4 flex-1 hide-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NAME */}
            <div className="space-y-3">
              <Label className="mb-2">Lens Name</Label>
              <Input placeholder="Air Optix HydraGlyde" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>

            {/* BRAND */}
            <div className="space-y-3">
              <Label className="mb-2">Brand</Label>
              <Input placeholder="Alcon" value={formData.brand} onChange={(e) => handleChange("brand", e.target.value)} />
            </div>

            {/* TYPE */}
            <div className="space-y-3">
              <Label className="mb-2">Type</Label>
              <Select onValueChange={(v) => handleChange("type", v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* MATERIAL */}
            <div className="space-y-3">
              <Label className="mb-2">Material</Label>
              <Input placeholder="Silicone Hydrogel" value={formData.material} onChange={(e) => handleChange("material", e.target.value)} />
            </div>

            {/* WATER CONTENT */}
            <div className="space-y-3">
              <Label className="mb-2">Water Content (%)</Label>
              <Input type="number" placeholder="38" value={formData.waterContent} onChange={(e) => handleChange("waterContent", e.target.value)} />
            </div>

            {/* DIAMETER */}
            <div className="space-y-3">
              <Label className="mb-2">Diameter (mm)</Label>
              <Input type="number" placeholder="14.2" value={formData.diameter} onChange={(e) => handleChange("diameter", e.target.value)} />
            </div>

            {/* BASE CURVE */}
            <div className="space-y-3">
              <Label className="mb-2">Base Curve</Label>
              <Input type="number" placeholder="8.6" value={formData.baseCurve} onChange={(e) => handleChange("baseCurve", e.target.value)} />
            </div>

            {/* POWER RANGE */}
            <div className="space-y-3">
              <Label className="mb-2">Power Range</Label>
              <Input placeholder="+6.00 to -8.00" value={formData.powerRange} onChange={(e) => handleChange("powerRange", e.target.value)} />
            </div>

            {/* REPLACEMENT SCHEDULE */}
            <div className="space-y-3">
              <Label className="mb-2">Replacement Schedule</Label>
              <Input placeholder="Monthly" value={formData.replacementSchedule} onChange={(e) => handleChange("replacementSchedule", e.target.value)} />
            </div>

            {/* COLOR */}
            <div className="space-y-3">
              <Label className="mb-2">Color</Label>
              <Input placeholder="Clear" value={formData.color} onChange={(e) => handleChange("color", e.target.value)} />
            </div>

            {/* PRICE */}
            <div className="space-y-3">
              <Label className="mb-2">Price</Label>
              <Input type="number" placeholder="120" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} />
            </div>

            {/* STOCK */}
            <div className="space-y-3">
              <Label className="mb-2">Stock</Label>
              <Input type="number" placeholder="50" value={formData.stock} onChange={(e) => handleChange("stock", e.target.value)} />
            </div>

            {/* OFFER */}
            <div className="space-y-3">
              <Label className="mb-2">Offer (%)</Label>
              <Input type="number" placeholder="10" value={formData.offer} onChange={(e) => handleChange("offer", e.target.value)} />
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
            <Switch checked={formData.weeklyDeals} onCheckedChange={(v) => handleChange("weeklyDeals", v)} />
            <span className="text-gray-700">Weekly Deals</span>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4 space-y-3">
            <Label className="mb-2">Description</Label>
            <Textarea placeholder="Comfortable monthly contact lenses with high oxygen permeability" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} />
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
            <Button type="submit" className="w-full md:w-auto bg-blue-600">
              <Plus /> Add Contact Lens
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddContactLens;
