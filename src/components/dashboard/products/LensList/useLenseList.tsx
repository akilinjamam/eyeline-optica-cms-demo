/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import type {  ILens } from "../../../../types/interface";
import { Edit, Trash2 } from "lucide-react";
import { useGetAllLensQuery } from "../../../../app/redux/api/lensApi";


const useLenseList = () => {

  const {data:allData, isLoading} = useGetAllLensQuery('');
  console.log(allData?.data?.data)


    const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "name", label: "Name", align: "left" },
  { key: "lensType", label: "Lens Type", align: "left" },
  { key: "material", label: "Material", align: "left" },
  { key: "index", label: "Index", align: "left" },
  { key: "thickness", label: "Thickness", align: "left" },
  { key: "diameter", label: "Diameter (mm)", align: "left" },
  { key: "color", label: "Color", align: "left" },
  { key: "price", label: "Sales Price", align: "left" },
  { key: "stock", label: "Stock", align: "left" },
  { key: "brand", label: "Brand", align: "left" },
  { key: "offer", label: "Offer (%)", align: "left" },
  { key: "rating", label: "Rating", align: "left" },
];

  const [lens, setLens] = useState<ILens[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterMaterial, setFilterMaterial] = useState("all");
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [page, setPage] = useState(1);

  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState("");
  const [color, setColor] = useState("all");
  const [brand, setBrand] = useState("all");

  useEffect(() => {
          if (allData?.data?.data && Array.isArray(allData.data.data)) {
              setLens(allData.data.data);
          }
      }, [allData]);

  useEffect(() => {
    setPage(1);
  }, [search, filterType, filterMaterial]);

  const filteredDataa = useMemo(() => {

    const filteredData:ILens[] = lens?.filter((lens) => {
      const matchSearch =
        lens?.name?.toLowerCase().includes(search.toLowerCase()) ||
        lens?.lensType?.toLowerCase().includes(search.toLowerCase()) ||
        lens?.color?.toLowerCase().includes(search.toLowerCase());

      const matchType = filterType === "all" ? true : lens.lensType === filterType;
      const matchMaterial = filterMaterial === "all" ? true : lens.material === filterMaterial;
      const matchColor = color === "all" ? true : lens.color === color
      const matchBrand = brand === "all" ? true : lens.brand === brand

       const matchPrice =
        (minPrice === "" || lens.price >= Number(minPrice)) &&
        (maxPrice === "" || lens.price <= Number(maxPrice));

      return matchSearch && matchType && matchMaterial  && matchPrice && matchColor && matchBrand;
    });

    const addingIdWithFiltered:any = filteredData.map((filtered:any, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
  }, [lens, search, filterType, filterMaterial, minPrice, maxPrice, color, brand]);
  

  const handleEdit = (id: number) => console.log("Edit", id);
  const handleDelete = (id: number) => {
    if (confirm("Are you sure to delete this frame?")) {
      setLens(filteredDataa.filter((f:any) => f.id !== id));
    }
  };

   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterType !== "all") activeFilters.push(`Lens Type: ${filterType}`);
  if (filterMaterial !== "all") activeFilters.push(`Material: ${filterMaterial}`);
  if (minPrice) activeFilters.push(`Min: ${minPrice}`);
  if (maxPrice) activeFilters.push(`Max: ${maxPrice}`);

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";


    const typeCategory = [...new Set(lens?.map((p: ILens) => p?.lensType))]
    .map(type => ({ value: type, label: type }));
    const materialCategory = [...new Set(lens?.map((p: ILens) => p?.material))].map(type => ({ value: type, label: type }));
    const colorCategory = [...new Set(lens?.map((p: ILens) => p?.color))]
    .map(type => ({ value: type, label: type }));
    const brandCategory = [...new Set(lens?.map((p: ILens) => p?.brand))]
    .map(type => ({ value: type, label: type }));
    


  const filters:any = [
    {
      label: "Type",
      placeholder: "Lens Type",
      options: [
        { value: "all", label: "All Lens Types" },
        ...typeCategory
      ],
      onChange: setFilterType,
    },
    {
      label: "Material",
      placeholder: "Material",
      options: [
        { value: "all", label: "All Materials" },
        ...materialCategory
      ],
      onChange: setFilterMaterial,
    },

    {
      label: "Color",
      placeholder: "Color",
      options: [
        { value: "all", label: "All Colors" },
        ...colorCategory
      ],
      onChange: setColor,
    },
    {
      label: "Brand",
      placeholder: "Brand",
      options: [
        { value: "all", label: "All Brands" },
        ...brandCategory
      ],
      onChange: setBrand,
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

    return {columns, setSearch, search, actionColumns, filterSummary, paginatedData, setPaginatedData, minPrice, setMinPrice, maxPrice, setMaxPrice, filters, page, setPage, filteredDataa, isLoading}

};

export default useLenseList;