import { useEffect, useMemo, useState } from "react";
import type { ActionColumn, TableColumn, TRegistration } from "../../../types/type";
import { useGetAllUsersQuery } from "../../../app/redux/api/authApi";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { openEdit, switchCheck } from "../../../app/redux/features/modalSlice";
import type { RootState } from "../../../app/store";


const useUserAccessControllList = () => {

    const dispatch = useDispatch();

    const {showCheck} = useSelector((state:RootState) => state.modal)

    const {data:allData, isLoading} = useGetAllUsersQuery('')
    
    
    const allUserData = allData?.data as TRegistration[] | undefined;
    
    const [users, setUsers] = useState<TRegistration[]>([]);
    const [nameType, setNameType] = useState<string>("all");
    const [emailType, setEmailType] = useState<string>("all");
    const [roleType, setRoleType] = useState<string>("all");
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState<TRegistration[]>([])
    
    useEffect(() => {
        setPage(1);
    }, [search, nameType, emailType]);

     useEffect(() => {
        if (allData?.data && Array.isArray(allData.data)) {
            setUsers(allData.data);
        }
    }, [allData]);

    const columns: TableColumn[] = [
      { key: "id", label: "SL", align: "left" },
      { key: "name", label: "Name", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "role", label: "Role", align: "left" },
      { key: "access", label: "Access Permission", align: "left" }
    ];
    
    const nameCategory = [...new Set(allUserData?.map((p: TRegistration) => p?.name))]
      .map(type => ({ value: type, label: type }));
    const emailCategory = [...new Set(allUserData?.map((p: TRegistration) => p?.email))]
      .map(type => ({ value: type, label: type }));
    const roleCategory = [...new Set(allUserData?.map((p: TRegistration) => p?.role))]
      .map(type => ({ value: type, label: type }));
    
      
    const filteredData = useMemo(() => {
          
    const filteredDataa:TRegistration[] = users.filter(user => {
        const matchSearch =
            (user?.name?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
            (user?.email?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
            (user?.role?.toLowerCase() ?? "").includes(search.toLowerCase());
              
        const matchNameType = nameType === "all" ? true : user?.name === nameType;
        const matchEmailType = emailType === "all" ? true : user?.email === emailType;
        const matchRoleType = roleType === "all" ? true : user?.role === roleType;
              
        return matchSearch && matchNameType && matchEmailType && matchRoleType
    });
    
            
    const addingIdWithFiltered:TRegistration[] = filteredDataa.map((filtered:TRegistration, index:number) => ({id:index+1, ...filtered}))
    
    return addingIdWithFiltered
} , [users, search, nameType, emailType, roleType]);

     const handleEdit = (id: string) => {
        const findData = filteredData?.find((item:TRegistration) => item?._id === id)
        console.log("Edit", id);
        dispatch(openEdit({name: 'controll-user-access',data:findData }));
      }
      const handleDelete = (id: number) => {
          dispatch(switchCheck())
          console.log('delete-id:',id);
         
        
      };

    const activeFilters: string[] = [];
    if (search) activeFilters.push(`Search: "${search}"`);
    if (nameType !== "all") activeFilters.push(`Name: ${nameType}`);
    if (emailType !== "all") activeFilters.push(`Email: ${emailType}`);
    if (roleType !== "all") activeFilters.push(`Role: ${emailType}`);
  

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";

     const filters = [
    {
      label: "Name Type",
      placeholder: "Filter by Name",
      options: [
        { value: "all", label: "All Names" },
        ...nameCategory
      ],
      onChange: setNameType,
    },
    {
      label: "Email Type",
      placeholder: "Filter by Email",
      options: [
        { value: "all", label: "All Emails" },
        ...emailCategory
      ],
      onChange: setEmailType,
    },
    {
      label: "Role Type",
      placeholder: "Filter by Role",
      options: [
        { value: "all", label: "All Roles" },
        ...roleCategory
      ],
      onChange: setRoleType,
    },
  ]


  const actionColumns: ActionColumn[] = [
    {
      logo: <Edit className="w-4 h-4 text-green-800"/>,
      type: "edit",
      render: handleEdit
    },
    
    {
      logo: <Trash2 className="w-4 h-4 text-red-800"/>,
      type: "delete",
      render: handleDelete
    },
  ]


    return {actionColumns,filters,filterSummary, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, showCheck}
};

export default useUserAccessControllList;