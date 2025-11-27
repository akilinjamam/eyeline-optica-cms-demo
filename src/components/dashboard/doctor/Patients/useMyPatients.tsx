/* eslint-disable @typescript-eslint/no-explicit-any */

import {  useSelector } from "react-redux";
import { useGetAllSlotQuery } from "../../../../app/redux/api/scheduleApi";
import useFindUser from "../../../../reusableComponent/useFindUser";
import { useGetSingleDoctorQuery } from "../../../../app/redux/api/doctorApi";
import type { TableColumn } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { RootState } from "../../../../app/store";

export type TPatient = {

  id: string | number;
  name: string;
  phone: string;
  age: number;
  address: string;
  date: string;
  time: string;
  isVideo: boolean;
  isPrescription: boolean;
};



const usePatienteList = () => {

const {email} = useFindUser();
const { data:doctor } = useGetSingleDoctorQuery(email);
       
const {data:allData, isLoading} = useGetAllSlotQuery(doctor?.data?._id as string) as any;
const modifiedData = useMemo(() => {

    const isBooked = allData?.data?.filter((f:any) => f?.isBooked === true)
    
    const data = isBooked; 
    console.log(data)
    
   

    const newData = data?.map((item:any) => {
         const d = new Date(item?.startAt);
        const startTime = item?.startAt?.split("T")[1].substring(0,5);
        const endTime = item?.endAt?.split("T")[1].substring(0,5);

    const name = item?.patient?.name;
    const phone = item?.patient?.phone;
    const age = item?.patient?.age;
    const address =item?.patient?.address;
    const date =  d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const time = `${startTime} to ${endTime}`
           
    return {
        name,
        phone,
        age,
        address,
        appointmentFee:item?.doctor?.appointmentFee,
        date,
        time,
        isVideo:item?.isVideo,
        isPrescription:item?.isPrescription
    }
})

return newData

},[allData])
console.log(modifiedData)

    const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "name", label: "Patient Name", align: "left" },
  { key: "phone", label: "Patient Phone", align: "left" },
  { key: "age", label: "Patient Age", align: "left" },
  { key: "address", label: "Address", align: "left" },
  { key: "date", label: "Date", align: "left" },
  { key: "time", label: "Time", align: "left" },
  { key: "appointmentFee", label: "Fee", align: "left" },
  { key: "isVideo", label: "Video", align: "left" },
  { key: "isPrescription", label: "Prescription", align: "left" },
];

  const [patient, setPatient] = useState<TPatient[]>([]);
  const [search, setSearch] = useState("");
  const [filterName, setFilterName] = useState("all");
  const [filterPhone, setFilterPhone] = useState("all");
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [page, setPage] = useState(1);


  useEffect(() => {
          if (modifiedData && Array.isArray(modifiedData)) {
              setPatient(modifiedData);
          }
      }, [modifiedData]);

  useEffect(() => {
    setPage(1);
  }, [search, filterName, filterPhone]);

  const filteredDataa = useMemo(() => {

    const filteredData:TPatient[] = patient?.filter((patient) => {
      const matchSearch =
        patient?.name?.toLowerCase().includes(search.toLowerCase()) ||
        patient?.address?.toLowerCase().includes(search.toLowerCase()) ||
        patient?.phone?.toLowerCase().includes(search.toLowerCase());

      const matchType = filterName === "all" ? true : patient.name === filterName;
      const matchMaterial = filterPhone === "all" ? true : patient.phone === filterPhone;
    

      return matchSearch && matchType && matchMaterial 
    });

    const addingIdWithFiltered:any = filteredData.map((filtered:any, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
  }, [patient, search, filterName, filterPhone]);
  
  const {showCheck} = useSelector((state:RootState) => state.modal);



   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterName !== "all") activeFilters.push(`patient Type: ${filterName}`);
  if (filterPhone !== "all") activeFilters.push(`Material: ${filterPhone}`);

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";


    const typeNameCategory = [...new Set(patient
  ?.map((p: TPatient) => p?.name)
  .filter((t): t is string => !!t && t.trim() !== "")
)].map(type => ({ value: type, label: type }));

const typePhoneCategory = [...new Set(patient
  ?.map((p: TPatient) => p?.phone)
  .filter((t): t is string => !!t && t.trim() !== "")
)].map(type => ({ value: type, label: type }));



  const filters:any = [
    {
      label: "Name",
      placeholder: "patient Name",
      options: [
        { value: "all", label: "All Name" },
        ...typeNameCategory
      ],
      onChange: setFilterName,
    },
    {
      label: "Phone",
      placeholder: "Patient Phone",
      options: [
        { value: "all", label: "All Phone" },
        ...typePhoneCategory
      ],
      onChange: setFilterPhone,
    }
  ]

  

    return {columns, setSearch, search,  filterSummary, paginatedData, setPaginatedData,  filters, page, setPage, filteredDataa, isLoading, showCheck}

};

export default usePatienteList;