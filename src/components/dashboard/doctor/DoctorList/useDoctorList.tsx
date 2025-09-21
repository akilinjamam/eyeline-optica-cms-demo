import {  Trash2 } from "lucide-react";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { Frame, IDoctor} from "../../../../types/interface";
import { useDispatch, useSelector } from "react-redux";
import { switchCheck } from "../../../../app/redux/features/modalSlice";
import type { RootState } from "../../../../app/store";
import { useGetAllDoctorQuery } from "../../../../app/redux/api/doctorApi";

const useDoctorList = () => {

    const {data:allData, isLoading} = useGetAllDoctorQuery('')
  

    const allDoctorData = allData?.data?.data as IDoctor[] | undefined;

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "name", label: "Name", align: "left" },
  { key: "email", label: "Email", align: "left" },
];

  const [doctor, setDoctor] = useState<IDoctor[]>([]);
  const [search, setSearch] = useState("");
  const [nameType, setNameType] = useState("all");
  const [emailType, setEmailType] = useState("all");
  const [paginatedData, setPaginatedData] = useState<Frame[]>([])
  const [page, setPage] = useState(1);
  

    useEffect(() => {
        setPage(1);
    }, [search, nameType, emailType]);

    useEffect(() => {
        if (allData?.data?.data && Array.isArray(allData.data.data)) {
            setDoctor(allData.data.data);
        }
    }, [allData]);


    const nameCategory = [...new Set(allDoctorData?.map((p: IDoctor) => p?.name))]
  .map(type => ({ value: type, label: type }));
    const emailCategory = [...new Set(allDoctorData?.map((p: IDoctor) => p?.email))]
  .map(type => ({ value: type, label: type }));
   


    const filteredData = useMemo(() => {

    const filteredData:IDoctor[] = doctor.filter(doctor => {
      const matchSearch =
        doctor?.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor?.email.toLowerCase().includes(search.toLowerCase()) 

      const matchName = nameType === "all" ? true : doctor?.name === nameType;
      const matchEmail = emailType === "all" ? true : doctor?.email === emailType;
    
      return matchSearch && matchName && matchEmail;
    });

    const addingIdWithFiltered:IDoctor[] = filteredData.map((filtered:IDoctor, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
    } , [doctor, search, nameType, emailType]);

  const dispatch = useDispatch()
  
  const {showCheck} = useSelector((state:RootState) => state.modal);
  

  
  const handleDelete = () => {
      dispatch(switchCheck())
  };


   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (nameType !== "all") activeFilters.push(`Name Type: ${nameType}`);
  if (emailType !== "all") activeFilters.push(`Email Type: ${emailType}`);
 

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";


  const filters = [
    {
      label: "Type",
      placeholder: "Filter by Name",
      options: [
        { value: "all", label: "All Name Type" },
        ...nameCategory
      ],
      onChange: setNameType,
    },
    {
      label: "Email",
      placeholder: "Filter by Email",
      options: [
        { value: "all", label: "All Email" },
        ...emailCategory
      ],
      onChange: setEmailType,
    },
  ]

  const actionColumns: ActionColumn[] = [
  {
    logo: <Trash2 className="w-4 h-4 text-red-800"/>,
    type: "delete",
    render: handleDelete
  },
]

return {actionColumns,filters,filterSummary,  search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, showCheck}

};

export default useDoctorList;