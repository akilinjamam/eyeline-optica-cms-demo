/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import {  useForm } from "react-hook-form";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Textarea } from "../../../ui/textarea";
import { Edit, ImagePlus,  X } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import type { IDoctor } from "../../../../types/interface";
import { useState } from "react";
import { useCreateDoctorMutation } from "../../../../app/redux/api/doctorApi";


const AddDoctor = () => {
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const { editableData: initialData } = useSelector(
    (state: RootState) => state.modal
  );

  const { handleSubmit, register } = useForm<IDoctor>({
    defaultValues: (initialData as IDoctor) || {
      name: "",
      specialities: [],
      studies: [],
      totalExperience: 0,
      bmdcNumber: "",
      currentlyWorking: "",
      description: "",
      experienceDetail: "",
    
    },
  });

  const [createDoctor, { isLoading }] = useCreateDoctorMutation();

  const onSubmit = async (data: IDoctor) => {
      
      const {studies, specialities, totalExperience, ...remaining} = data;

    const arrayStudies = studies.split(',');
    const arraySpecilities = specialities.split(',');
    
    const newData = {...remaining, specialities:arraySpecilities, studies: arrayStudies, totalExperience:+totalExperience};
    
    const finalData = {
        data:newData,
        images:uploadedImages
    }
    console.log(finalData)
    try {
      const response = await createDoctor(finalData).unwrap();
    
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setUploadedImages(files)

    // Generate previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev:any) => prev.filter((_:any, i:any) => i !== index));
  };

  return (
    <div className="p-4 bg-gray-50 h-screen overflow-y-scroll hide-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mx-auto bg-white rounded-3xl shadow-xl p-6 flex flex-col h-[90%]"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-y-auto p-2 md:p-4 flex-1 hide-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>
              <Input {...register("name")} placeholder="Doctor Name" />
            </div>

            {/* BMDC Number */}
            <div className="space-y-2">
              <Label>BMDC Number</Label>
              <Input {...register("bmdcNumber")} placeholder="BMDC Number" />
            </div>

            {/* Specialities */}
            <div className="space-y-2 md:col-span-2">
              <Label>Specialities</Label>
              <Input
                {...register("specialities")}
                placeholder="Enter comma-separated values"
              />
              <p className="text-xs text-gray-500">
                Example: Cardiology, Neurology
              </p>
            </div>

            {/* Studies */}
            <div className="space-y-2 md:col-span-2">
              <Label>Studies</Label>
              <Input
                {...register("studies")}
                placeholder="Enter comma-separated values"
              />
            </div>

            {/* Total Experience */}
            <div className="space-y-2">
              <Label>Total Experience (Years)</Label>
              <Input
                type="number"
                {...register("totalExperience", { valueAsNumber: true })}
              />
            </div>

            {/* Currently Working */}
            <div className="space-y-2">
              <Label>Currently Working</Label>
              <Input
                {...register("currentlyWorking")}
                placeholder="Hospital / Clinic Name"
              />
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Write a short description"
              />
            </div>

            {/* Experience Detail */}
            <div className="space-y-2 md:col-span-2">
              <Label>Experience Detail</Label>
              <Textarea
                {...register("experienceDetail")}
                placeholder="Detailed work experience"
              />
            </div>

           {/* Images Section */}
            <div className="space-y-3 md:col-span-2">
                <Label>Profile Images</Label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                <ImagePlus className="w-10 h-10 mb-2 text-blue-600" />
                <p className="text-sm">Click or drag images here</p>

                {/* Input now restricted to the box */}
                <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>

            {/* Preview Section */}
            {previewImages.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                {previewImages.map((src, index) => (
                    <div
                    key={index}
                    className="relative w-28 h-28 rounded-lg overflow-hidden border shadow"
                    >
                    <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="object-cover w-full h-full"
                    />
                    <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-red-600"
                    >
                        <X size={16} />
                    </button>
                    </div>
                ))}
                </div>
            )}
        </div>

            <div className="mt-6 md:col-span-2">
              <Button
                disabled={isLoading ? true : false}
                type="submit"
                className="w-full md:w-auto bg-blue-600"
              >
                <Edit /> {isLoading ? 'Adding': 'Add Doctor'}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddDoctor;
