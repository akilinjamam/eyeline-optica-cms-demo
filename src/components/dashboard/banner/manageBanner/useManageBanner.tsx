/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import type {  IBanner, ILens } from "../../../../types/interface";
import { Edit, Image} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { openEdit, setImages } from "../../../../app/redux/features/modalSlice";
import type { RootState } from "../../../../app/store";
import { useGetAllBannerQuery } from "../../../../app/redux/api/bannerApi";


const useManageBannerList = () => {

  const {data:allData, isLoading} = useGetAllBannerQuery('');

  const dispatch = useDispatch();

    const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "category", label: "Category", align: "left" },
];

  const [banner, setBanner] = useState<IBanner[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategoryType, setFilterCategoryType] = useState("all");
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [page, setPage] = useState(1);


  useEffect(() => {
          if (allData?.data?.data && Array.isArray(allData.data.data)) {
              setBanner(allData.data.data);
          }
    }, [allData]);

  useEffect(() => {
    setPage(1);
  }, [search, filterCategoryType]);

  const filteredDataa = useMemo(() => {

    const filteredData:IBanner[] = banner?.filter((banner) => {
    const matchSearch = banner?.category?.toLowerCase().includes(search.toLowerCase())

    const matchType = filterCategoryType === "all" ? true : banner.category === filterCategoryType;
      
      return matchSearch && matchType && filterCategoryType
    });

    const addingIdWithFiltered:any = filteredData.map((filtered:any, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
  }, [banner, search, filterCategoryType]);
  
  const {showCheck} = useSelector((state:RootState) => state.modal);

  const handleEdit = (id: string) => {
      const findData = filteredDataa?.find((item:ILens) => item?._id === id)
      console.log("Edit", id);
      dispatch(openEdit({name: 'banner',data:findData }));
    }
  

  const handleImages = (id:string) => {
      const findData = filteredDataa?.find((item:ILens) => item?._id === id)?.images?.map((image:string) => image);
      dispatch(setImages(findData as string[]))
      console.log(findData)
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
  ?.map((p: IBanner) => p?.category)
  .filter((t): t is string => !!t && t.trim() !== "")
)].map(type => ({ value: type, label: type }));

    


  const filters:any = [
    {
      label: "Type",
      placeholder: "Category Type",
      options: [
        { value: "all", label: "All Category Types" },
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
  },
  {
    logo: <Image className="w-4 h-4 text-blue-800"/>,
    type: "images",
    render: handleImages
  },
]

    return {columns, setSearch, search, actionColumns, filterSummary, paginatedData, setPaginatedData, filters, page, setPage, filteredDataa, isLoading, showCheck}

};

export default useManageBannerList;