/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";

// import { useGetAllBannerQuery } from "../../../app/redux/api/bannerApi";
import { useDispatch, useSelector } from "react-redux";
import type { IMeta, ILens } from "../../../types/interface";
import type { RootState } from "../../../app/store";
import { openEdit } from "../../../app/redux/features/modalSlice";
import { Edit } from "lucide-react";
import type { ActionColumn, TableColumn } from "../../../types/type";
import { useGetAllMetaDataQuery } from "../../../app/redux/api/metaApi";

const useMetaData = () => {

  const {data:allData, isLoading} = useGetAllMetaDataQuery('');


  const dispatch = useDispatch();

    const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "routeName", label: "Route Name", align: "left" },
  { key: "title", label: "Title", align: "left" },
  { key: "description", label: "Description", align: "left" },
];

  const [banner, setBanner] = useState<IMeta[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategoryType, setFilterCategoryType] = useState("all");
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [page, setPage] = useState(1);


  useEffect(() => {
    if (allData?.data?.data && Array.isArray(allData.data.data)) {
        setBanner(allData.data.data);
    }
  }, [allData]);

  console.log(banner)

  useEffect(() => {
    setPage(1);
  }, [search, filterCategoryType]);

  const filteredDataa = useMemo(() => {

    const filteredData:IMeta[] = banner?.filter((banner:IMeta) => {

      const matchSearch = banner?.routeName?.toLowerCase().includes(search.toLowerCase())
      const matchType = filterCategoryType === "all" ? true : banner?.routeName === filterCategoryType;
      
      return matchSearch && matchType && filterCategoryType
    });

    const addingIdWithFiltered:any = filteredData.map((filtered:any, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
  }, [banner, search, filterCategoryType]);
  
  const {showCheck} = useSelector((state:RootState) => state.modal);

  const handleEdit = (id: string) => {
      const findData = filteredDataa?.find((item:ILens) => item?._id === id)
      console.log("Edit", id);
      dispatch(openEdit({name: 'meta',data:findData }));
    }

   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterCategoryType !== "all") activeFilters.push(`Category Type: ${filterCategoryType}`);
  

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";


    const typeCategory = [...new Set(banner
  ?.map((p: IMeta) => p?.routeName)
  .filter((t): t is string => !!t && t.trim() !== "")
)]?.map(type => ({ value: type, label: type }));

    


  const filters:any = [
    {
      label: "Type",
      placeholder: "All Routes",
      options: [
        { value: "all", label: "All Routes" },
        ...typeCategory
      ],
      onChange: setFilterCategoryType,
    }
  ]

  const actionColumns: ActionColumn[] = [
  {
    logo: <Edit className="w-4 h-4 text-green-800"/>,
    type: "edit",
    render: handleEdit
  }
]

    return {columns, setSearch, search, actionColumns, filterSummary, paginatedData, setPaginatedData, filters, page, setPage, filteredDataa, isLoading, showCheck}

};

export default useMetaData;