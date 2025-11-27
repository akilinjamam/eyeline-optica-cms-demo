/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrescriptionCard } from "./PrescriptionCard";
import { useDispatch } from "react-redux";
import { openEdit } from "../../../../app/redux/features/modalSlice";
import useFindUser from "../../../../reusableComponent/useFindUser";
import { useGetAllPrescriptionQuery } from "../../../../app/redux/api/prescriptionApi";
import { useMemo } from "react";

export type Prescription = {
  id: string;
  doctorName: string;
  specialization: string;
  clinicName: string;
  clinicAddress: string;
  contact: string;
  patientName: string;
  age?: string;
  gender?: string;
  date: string;
  diagnosis: string;
  medicines: { name: string; dosage: string; frequency: string; duration: string }[];
  tests?: string;
  advice?: string;
  phone?:string;
  address?:string;
};


export default function PrescriptionList() {
  const {doctorId} = useFindUser();
  console.log(doctorId);
  const {data:allDoctors} = useGetAllPrescriptionQuery('');

  const meDoctorData = allDoctors?.data as any;

  console.log(meDoctorData)
  

  const dispatch = useDispatch();

  const modifiedData = useMemo(() => {
    const newData = meDoctorData?.map((pres:any) =>  {
      const specialization = pres?.doctorId?.specialities?.map((special:any) => special)?.join(",")
      return {
        id:pres?._id,
        doctorName: pres?.doctorId?.name,
        specialization,
        clinicName:pres?.doctorId?.clinicName ? pres?.doctorId?.clinicName : "N/A",
        clinicAddress: pres?.doctorId?.clinicAddress ? pres?.doctorId?.clinicAddress : "N/A",
        contact: pres?.doctorId?.contact ? pres?.doctorId?.contact : "N/A",
        patientName: pres?.patientId?.name,
        age: pres?.patientId?.age,
        gender: pres?.patientId?.gender ? pres?.patientId?.gender : "N/A",
        date: pres?.date,
        diagnosis: pres?.diagnosis,
        medicines: pres?.medicines,
        tests:pres?.test,
        advice:pres?.advice,
        phone:pres?.patientId?.phone,
        address:pres?.patientId?.address
      }
    })

    return newData
  }, [meDoctorData])

  

  return (
    <div className="p-4 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modifiedData?.map((pres:any) => (
          <PrescriptionCard
            key={pres.id}
            prescription={{ id: pres.id, patientName: pres.patientName, date: pres.date, diagnosis: pres.diagnosis }}
            onClick={() => dispatch(openEdit({name:"prescription-detail", data: pres}))}
          />
        ))}
      </div>

      
    </div>
  );
}
