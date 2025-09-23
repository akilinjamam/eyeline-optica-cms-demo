// PrescriptionForm.tsx
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";

import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Label } from "../../../ui/label";

type Medicine = {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
};

type PrescriptionFormData = {
  doctorName: string;
  patientName: string;
  date: string;
  diagnosis: string;
  medicines: Medicine[];
  tests: string;
  advice: string;
};

 const AddPrescription = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PrescriptionFormData>({
    defaultValues: {
      doctorName: "",
      patientName: "",
      date: new Date().toISOString().split("T")[0], // today
      diagnosis: "",
      medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
      tests: "",
      advice: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });

  const onSubmit = (data: PrescriptionFormData) => {
    console.log("Prescription submitted:", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[99%] mx-auto p-4"
    >
      <Card className="rounded-2xl shadow-md border h-[90vh] overflow-y-scroll hide-scrollbar ">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Doctor Prescription Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Doctor & Patient Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">Doctor Name</Label>
                <Input
                  type="text"
                  {...register("doctorName", { required: "Doctor name is required" })}
                />
                {errors.doctorName && (
                  <p className="text-red-500 text-xs">
                    {errors.doctorName.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-2">Patient Name</Label>
                <Input
                  type="text"
                  {...register("patientName", { required: "Patient name is required" })}
                />
                {errors.patientName && (
                  <p className="text-red-500 text-xs">
                    {errors.patientName.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-2">Date</Label>
                <Input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs">{errors.date.message}</p>
                )}
              </div>
            </div>

            {/* Diagnosis */}
            <div>
              <Label className="mb-2">Diagnosis</Label>
              <Input
                type="text"
                {...register("diagnosis", { required: "Diagnosis is required" })}
              />
              {errors.diagnosis && (
                <p className="text-red-500 text-xs">{errors.diagnosis.message}</p>
              )}
            </div>

            {/* Medicines */}
            <div>
              <Label className="block mb-2">Medicines</Label>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid md:grid-cols-4 gap-2 border p-3 rounded-lg shadow-sm"
                  >
                    <Input
                      placeholder="Name"
                      {...register(`medicines.${index}.name`, {
                        required: "Required",
                      })}
                    />
                    <Input
                      placeholder="Dosage"
                      {...register(`medicines.${index}.dosage`, {
                        required: "Required",
                      })}
                    />
                    <Input
                      placeholder="Frequency"
                      {...register(`medicines.${index}.frequency`, {
                        required: "Required",
                      })}
                    />
                    <Input
                      placeholder="Duration"
                      {...register(`medicines.${index}.duration`, {
                        required: "Required",
                      })}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="col-span-4 md:col-span-1 mt-2 md:mt-0"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-3"
                onClick={() =>
                  append({ name: "", dosage: "", frequency: "", duration: "" })
                }
              >
                + Add Medicine
              </Button>
            </div>

            {/* Tests */}
            <div>
              <Label className="mb-2">Recommended Tests</Label>
              <Input type="text" {...register("tests")} />
            </div>

            {/* Advice */}
            <div>
              <Label className="mb-2">General Advice</Label>
              <Input type="text" {...register("advice")} />
            </div>

            <Button type="submit" className="w-full">
              Submit Prescription
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};


export default AddPrescription