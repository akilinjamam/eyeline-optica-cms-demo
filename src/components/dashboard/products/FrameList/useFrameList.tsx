import { Edit, Trash2 } from "lucide-react";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { Frame, IFrame} from "../../../../types/interface";
import { useGetAllFramesQuery } from "../../../../app/redux/api/frameApi";

const useFrameList = () => {

    const {data:allData, isLoading} = useGetAllFramesQuery('')
    console.log(allData?.data?.data)
    

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "center" },
  { key: "name", label: "Name", align: "center" },
  { key: "type", label: "Type", align: "center" },
  { key: "materialsCategory", label: "Material", align: "center" },
  { key: "shapeCategory", label: "Shape", align: "center" },
  { key: "color", label: "Color", align: "center" },
  { key: "sizeCategory", label: "Size", align: "center" },
  { key: "salesPrice", label: "Price", align: "center" },
  { key: "quantity", label: "Qty", align: "center" },
  // { key: "actions", label: "Actions", align: "center" },
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

     
  

  const handleEdit = (id: number) => console.log("Edit", id);
  const handleDelete = (id: number) => {
    if (confirm("Are you sure to delete this frame?")) {
      setFrames(filteredData.filter((f:IFrame) => f.id !== id));
    }
  };

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
        { value: "Sunglasses", label: "Sunglasses" },
        { value: "Eyeglasses", label: "Eyeglasses" },
      ],
      onChange: setFilterType,
    },
    {
      label: "Material",
      placeholder: "Filter by Material",
      options: [
        { value: "all", label: "All Materials" },
        { value: "Acetate", label: "Acetate" },
        { value: "Metal", label: "Metal" },
        { value: "Plastic", label: "Plastic" },
      ],
      onChange: setFilterMaterial,
    },
    {
      label: "Shape",
      placeholder: "Filter by Shape",
      options: [
        { value: "all", label: "All Shapes" },
        { value: "Round", label: "Round" },
        { value: "Rectangle", label: "Rectangle" },
        { value: "Oval", label: "Oval" },
      ],
      onChange: setFilterShape,
    },
    {
      label: "Color",
      placeholder: "Filter by Color",
      options: [
        { value: "all", label: "All Shapes" },
        { value: "Silver", label: "Silver" },
        { value: "Red", label: "Red" },
        { value: "Black", label: "Black" },
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
    logo: <Trash2 className="w-4 h-4 text-red-800"/>,
    type: "delete",
    render: handleDelete
  },
]

return {actionColumns,filters,filterSummary, setMinPrice, minPrice, setMaxPrice, maxPrice, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading}

};

export default useFrameList;