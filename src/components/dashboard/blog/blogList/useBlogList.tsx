/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import { Edit, Image, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { openEdit, setImages, switchCheck } from "../../../../app/redux/features/modalSlice";
import type { RootState } from "../../../../app/store";
import { useGetAllBlogQuery } from "../../../../app/redux/api/blogApi";
import type { IBlog } from "../../../../types/interface";


const useBlogList = () => {

  const {data:allData, isLoading} = useGetAllBlogQuery('');
 
  const dispatch = useDispatch();

    const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "title", label: "Title", align: "left" },
  { key: "category", label: "Category", align: "left" },
];

  const [blog, setBlog] = useState<IBlog[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategoryType, setFilterCategoryType] = useState("all");
  const [filterTitleType, setFilterTitleType] = useState("all");
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [page, setPage] = useState(1);

  useEffect(() => {
          if (allData?.data?.data && Array.isArray(allData.data.data)) {
              setBlog(allData.data.data);
          }
      }, [allData]);

  useEffect(() => {
    setPage(1);
  }, [search, filterCategoryType]);

  const filteredDataa = useMemo(() => {

    const filteredData:IBlog[] = blog?.filter((blog) => {
      const matchSearch =
        blog?.title?.toLowerCase().includes(search.toLowerCase()) ||
        blog?.category?.toLowerCase().includes(search.toLowerCase())

      const matchTitleType = filterTitleType === "all" ? true : blog.title === filterTitleType;
      const matchCategory = filterCategoryType === "all" ? true : blog.category === filterCategoryType;

      return matchSearch && matchTitleType && matchCategory
    });

    const addingIdWithFiltered:any = filteredData.map((filtered:any, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
  }, [blog, search, filterTitleType, filterCategoryType]);
  
  const {showCheck} = useSelector((state:RootState) => state.modal);

  const handleEdit = (id: string) => {
      const findData = filteredDataa?.find((item:IBlog) => item?._id === id)
      console.log("Edit", id);
      dispatch(openEdit({name: 'blog',data:findData }));
    }
  const handleDelete = (id: number) => {
        dispatch(switchCheck())
        console.log('delete-id:',id);
    };

  const handleImages = (id:string) => {
      const findData = filteredDataa?.find((item:IBlog) => item?._id === id)?.images?.map((image:string) => image);
      dispatch(setImages(findData as string[]))
      console.log(findData)
    }

   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterTitleType !== "all") activeFilters.push(`Blog Type: ${filterTitleType}`);
  if (filterCategoryType !== "all") activeFilters.push(`Category: ${filterCategoryType}`);

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";


    const titleCategory = [...new Set(blog
  ?.map((p: IBlog) => p?.title)
  .filter((t): t is string => !!t && t.trim() !== "")
)].map(type => ({ value: type, label: type }));

const categoryTypeCategory = [...new Set(blog
  ?.map((p: IBlog) => p?.category)
  .filter((t): t is string => !!t && t.trim() !== "")
)].map(type => ({ value: type, label: type }));



  const filters:any = [
    {
      label: "Title",
      placeholder: "Title Type",
      options: [
        { value: "all", label: "All title Types" },
        ...titleCategory
      ],
      onChange: setFilterTitleType,
    },
    {
      label: "Category",
      placeholder: "Category",
      options: [
        { value: "all", label: "All Category" },
        ...categoryTypeCategory
      ],
      onChange: setFilterCategoryType,
    },
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
  {
    logo: <Trash2 className="w-4 h-4 text-red-800"/>,
    type: "delete",
    render: handleDelete
  },
]

    return {columns, setSearch, search, actionColumns, filterSummary, paginatedData, setPaginatedData, filters, page, setPage, filteredDataa, isLoading, showCheck}

};

export default useBlogList;