/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import useFindUser from "../../../../reusableComponent/useFindUser";
import { useCreateSlotMutation } from "../../../../app/redux/api/scheduleApi";
import { toast } from "react-toastify";


type ScheduleFormInputs = {
  doctorId?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  totalPatients: number;
};

const AddSchedule: React.FC = () => {
  const {role, token, doctorId, allDoctorsData} = useFindUser()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ScheduleFormInputs>();

  const [isDoctor, setIsDoctor] = useState(false);
  const [doctors, setDoctors] = useState<any>([]);

  useEffect(() => {
    if (token) {
      if (role === "doctor" || role === "doctor & admin") {
        setIsDoctor(true);
        setValue("doctorId", doctorId); // auto-fill doctorId
      } else {
        setIsDoctor(false);
        setDoctors(allDoctorsData)
      } 
    }
  }, [setValue, doctorId, role, token, allDoctorsData]);


  const  [createSlot, {isLoading}] = useCreateSlotMutation();


  const onSubmit: SubmitHandler<ScheduleFormInputs> = async (data) => {
    console.log("Schedule Data:", data);
    try {
      const response = await createSlot(data).unwrap();
      if(response.success){
        toast.success(response.message)
        reset()
      }
      
      console.log(response)
    } catch (error:any) {
      toast.error(error.data.message)
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[99%] mx-auto mt-3 p-8 bg-white rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Create Doctor Schedule</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
       
        {!isDoctor && (
          <div className="flex flex-col">
            <Label className="mb-3" htmlFor="doctorId">
              Select Doctor
            </Label>
            <select
              {...register("doctorId", { required: "Doctor is required" })}
              className="border rounded-md p-2"
            >
              <option value="">-- Select a doctor --</option>
              {doctors.map((doc:any) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <p className="text-red-500 text-sm">{errors.doctorId.message}</p>
            )}
          </div>
        )}

        {/* Start Date */}
        <div className="flex flex-col">
          <Label className="mb-3" htmlFor="startDate">
            Start Date
          </Label>
          <Input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <Label className="mb-3" htmlFor="endDate">
            End Date
          </Label>
          <Input
            type="date"
            {...register("endDate", { required: "End date is required" })}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate.message}</p>
          )}
        </div>

        {/* Start Time */}
        <div className="flex flex-col">
          <Label className="mb-3" htmlFor="startTime">
            Start Time
          </Label>
          <Input
            type="time"
            {...register("startTime", { required: "Start time is required" })}
          />
          {errors.startTime && (
            <p className="text-red-500 text-sm">{errors.startTime.message}</p>
          )}
        </div>

        {/* End Time */}
        <div className="flex flex-col">
          <Label className="mb-3" htmlFor="endTime">
            End Time
          </Label>
          <Input
            type="time"
            {...register("endTime", { required: "End time is required" })}
          />
          {errors.endTime && (
            <p className="text-red-500 text-sm">{errors.endTime.message}</p>
          )}
        </div>

        {/* Total Patients */}
        <div className="flex flex-col">
          <Label className="mb-3" htmlFor="totalPatients">
            Total Patients
          </Label>
          <Input
            type="number"
            {...register("totalPatients", {
              required: "Total patients is required",
              min: { value: 1, message: "At least 1 patient required" },
            })}
          />
          {errors.totalPatients && (
            <p className="text-red-500 text-sm">
              {errors.totalPatients.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading ? true : false}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Creating' : 'Create Schedule'}
        </Button>
      </form>
    </motion.div>
  );
};

export default AddSchedule;
