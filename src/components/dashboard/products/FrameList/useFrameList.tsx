import { Edit, Image, Trash2 } from "lucide-react";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { Frame, IFrame} from "../../../../types/interface";
import { useGetAllFramesQuery } from "../../../../app/redux/api/frameApi";
import { useDispatch, useSelector } from "react-redux";
import { openEdit, setImages, switchCheck } from "../../../../app/redux/features/modalSlice";
import type { RootState } from "../../../../app/store";

const useFrameList = () => {

    const {data:allData, isLoading} = useGetAllFramesQuery('')
    console.log(allData?.data?.data);

    const allFrameData = allData?.data?.data as IFrame[] | undefined;

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "name", label: "Name", align: "left" },
  { key: "type", label: "Type", align: "left" },
  { key: "materialsCategory", label: "Material", align: "left" },
  { key: "shapeCategory", label: "Shape", align: "left" },
  { key: "color", label: "Color", align: "left" },
  { key: "sizeCategory", label: "Size", align: "left" },
  { key: "salesPrice", label: "Price", align: "left" },
  { key: "quantity", label: "Qty", align: "left" },
];

  const [frames, setFrames] = useState<IFrame[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterMaterial, setFilterMaterial] = useState("all");
  const [filterShape, setFilterShape] = useState("all");
  const [paginatedData, setPaginatedData] = useState<Frame[]>([])
  const [page, setPage] = useState(1);

  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState("");
  const [color, setColor] = useState("all");
  

    useEffect(() => {
        setPage(1);
    }, [search, filterType, filterMaterial, filterShape]);

    useEffect(() => {
        if (allData?.data?.data && Array.isArray(allData.data.data)) {
            setFrames(allData.data.data);
        }
    }, [allData]);


    const typeCategory = [...new Set(allFrameData?.map((p: IFrame) => p?.type))]
  .map(type => ({ value: type, label: type }));
    const shapeCategory = [...new Set(allFrameData?.map((p: IFrame) => p?.shapeCategory))]
  .map(type => ({ value: type, label: type }));
    const materialCategory = [...new Set(allFrameData?.map((p: IFrame) => p?.materialsCategory))].map(type => ({ value: type, label: type }));
    const colorCategory = [...new Set(allFrameData?.map((p: IFrame) => p?.color))]
  .map(type => ({ value: type, label: type }));
  console.log(typeCategory)

    const filteredData = useMemo(() => {

    const filteredData:IFrame[] = frames.filter(frame => {
      const matchSearch =
        frame?.name.toLowerCase().includes(search.toLowerCase()) ||
        frame?.type.toLowerCase().includes(search.toLowerCase()) ||
        frame?.color.toLowerCase().includes(search.toLowerCase());

      const matchType = filterType === "all" ? true : frame?.type === filterType;
      const matchMaterial = filterMaterial === "all" ? true : frame?.materialsCategory === filterMaterial;
      const matchShape = filterShape === "all" ? true : frame?.shapeCategory === filterShape;
      const matchColor = color === "all" ? true : frame?.color === color

       const matchPrice =
        (minPrice === "" || frame?.salesPrice >= Number(minPrice)) &&
        (maxPrice === "" || frame?.salesPrice <= Number(maxPrice));

      return matchSearch && matchType && matchMaterial && matchShape && matchPrice && matchColor;
    });



    const addingIdWithFiltered:IFrame[] = filteredData.map((filtered:IFrame, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
    } , [frames, search, filterType, filterMaterial, filterShape, minPrice, maxPrice, color]);

  const dispatch = useDispatch()
  
  const {showCheck} = useSelector((state:RootState) => state.modal);
  

  const handleEdit = (id: string) => {
    const findData = filteredData?.find((item:IFrame) => item?._id === id)
    console.log("Edit", id);
    dispatch(openEdit({name: 'frame',data:findData }));
  }
  const handleDelete = (id: number) => {
      dispatch(switchCheck())
      console.log('delete-id:',id);
     
    
  };

  const handleImages = (id:string) => {
    const findData = filteredData?.find((item:IFrame) => item?._id === id)?.images?.map((image:string) => image);
    dispatch(setImages(findData as string[]))
    console.log(findData)
  }

   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterType !== "all") activeFilters.push(`Type: ${filterType}`);
  if (filterMaterial !== "all") activeFilters.push(`Material: ${filterMaterial}`);
  if (filterShape !== "all") activeFilters.push(`Shape: ${filterShape}`);
  if (minPrice) activeFilters.push(`Min: ${minPrice}`);
  if (maxPrice) activeFilters.push(`Max: ${maxPrice}`);

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";


  const filters = [
    {
      label: "Type",
      placeholder: "Filter by Type",
      options: [
        { value: "all", label: "All Types" },
        ...typeCategory
      ],
      onChange: setFilterType,
    },
    {
      label: "Material",
      placeholder: "Filter by Material",
      options: [
        { value: "all", label: "All Materials" },
        ...materialCategory
      ],
      onChange: setFilterMaterial,
    },
    {
      label: "Shape",
      placeholder: "Filter by Shape",
      options: [
        { value: "all", label: "All Shapes" },
        ...shapeCategory
      ],
      onChange: setFilterShape,
    },
    {
      label: "Color",
      placeholder: "Filter by Color",
      options: [
        { value: "all", label: "All Shapes" },
        ...colorCategory
      ],
      onChange: setColor,
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

return {actionColumns,filters,filterSummary, setMinPrice, minPrice, setMaxPrice, maxPrice, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, showCheck}

};

export default useFrameList;