import { useEffect, useMemo, useState } from "react";
import { useGetAllCateogyQuery } from "../../../../../app/redux/api/categoryApi";
import type { ICategory } from "../../../../../types/interface";
import type { ActionColumn, TableColumn } from "../../../../../types/type";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import { openEdit, switchCheck } from "../../../../../app/redux/features/modalSlice";
import { Edit, Trash2 } from "lucide-react";

const useCategoryList = () => {

    const {data:allData, isLoading} = useGetAllCateogyQuery('')
  

    const allCategoryData = allData?.data?.data as ICategory[] | undefined;

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "categoryType", label: "Category Type", align: "left" },
  { key: "category", label: "Category", align: "left" },
];

  const [category, setCategory] = useState<ICategory[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategoryType, setFilterCateogyType] = useState("all");
  const [paginatedData, setPaginatedData] = useState<ICategory[]>([])
  const [page, setPage] = useState(1);


    useEffect(() => {
        setPage(1);
    }, [search]);

    useEffect(() => {
        if (allData?.data?.data && Array.isArray(allData.data.data)) {
            setCategory(allData.data.data);
        }
    }, [allData]);


    const categoryTypeCategory = [...new Set(allCategoryData?.map((p: ICategory) => p?.categoryType))]
  .map(type => ({ value: type, label: type }));
    
   


    const filteredData = useMemo(() => {

    const filteredData:ICategory[] = category.filter(category => {
      const matchSearch =
        category?.categoryType.toLowerCase().includes(search.toLowerCase()) ||
        category?.category.toLowerCase().includes(search.toLowerCase());

      const matchCategoryType = filterCategoryType === "all" ? true : category?.categoryType === filterCategoryType;
      


      return matchSearch &&  matchCategoryType;
    });

    const addingIdWithFiltered:ICategory[] = filteredData.map((filtered:ICategory, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
    } , [category, search, filterCategoryType ]);

  const dispatch = useDispatch()
  
  const {showCheck} = useSelector((state:RootState) => state.modal);
  

  const handleEdit = (id: string) => {
    const findData = filteredData?.find((item:ICategory) => item?._id === id)
  
    dispatch(openEdit({name: 'category',data:findData }));
  }
  const handleDelete = () => {
      dispatch(switchCheck())
  };


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


  const filters = [
    {
      label: "Category Type",
      placeholder: "Category Type",
      options: [
        { value: "all", label: "All Category Types" },
        ...categoryTypeCategory
      ],
      onChange: setFilterCateogyType,
    }
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

export default useCategoryList;