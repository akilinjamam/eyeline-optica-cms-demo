/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import { contactLenses } from "../../../../dummyData/dummyData";
import type { ContactLens, Frame } from "../../../../types/interface";
import { Edit, Trash2 } from "lucide-react";


const useContactList = () => {
    const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "center" },
  { key: "name", label: "Name", align: "center" },
  { key: "brand", label: "Brand", align: "center" },
  { key: "type", label: "Type", align: "center" },
  { key: "material", label: "Material", align: "center" },
  { key: "waterContent", label: "Water %", align: "center" },
  { key: "diameter", label: "Diameter (mm)", align: "center" },
  { key: "baseCurve", label: "Base Curve", align: "center" },
  { key: "powerRange", label: "Power Range", align: "center" },
  { key: "uvProtection", label: "UV Protection", align: "center" },
  { key: "salesPrice", label: "Sales Price", align: "center" },
  { key: "stock", label: "Stock", align: "center" },
  { key: "offer", label: "Offer (%)", align: "center" },
  { key: "rating", label: "Rating", align: "center" },
];

  const [frames, setFrames] = useState(contactLenses);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterMaterial, setFilterMaterial] = useState("all");
  const [paginatedData, setPaginatedData] = useState<Frame[]>([])
  const [page, setPage] = useState(1);

  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState("");
  const [color, setColor] = useState("all");
  const [brand, setBrand] = useState("all")

  useEffect(() => {
    setPage(1);
  }, [search, filterType, filterMaterial]);

  const filteredData = useMemo(() => {

    const filteredData:ContactLens[] = frames.filter(clens => {
      const matchSearch =
        clens.name.toLowerCase().includes(search.toLowerCase()) ||
        clens.type.toLowerCase().includes(search.toLowerCase()) ||
        clens.color.toLowerCase().includes(search.toLowerCase());

      const matchType = filterType === "all" ? true : clens.type === filterType;
      const matchMaterial = filterMaterial === "all" ? true : clens.material === filterMaterial;
      const matchColor = color === "all" ? true : clens.color === color
      const matchBrand = brand === "all" ? true : clens.brand === brand

       const matchPrice =
        (minPrice === "" || clens.salesPrice >= Number(minPrice)) &&
        (maxPrice === "" || clens.salesPrice <= Number(maxPrice));

      return matchSearch && matchType && matchMaterial  && matchPrice && matchColor && matchBrand;
    });

    const addingIdWithFiltered:any = filteredData.map((filtered:any, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
  }, [frames, search, filterType, filterMaterial, minPrice, maxPrice, color, brand]);
  

  const handleEdit = (id: number) => console.log("Edit", id);
  const handleDelete = (id: number) => {
    if (confirm("Are you sure to delete this frame?")) {
      setFrames(filteredData.filter((f:any) => f.id !== id));
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


  const filters = [
    {
      label: "Type",
      placeholder: "Filter by Lens Type",
      options: [
        { value: "all", label: "All Lens Types" },
        { value: "singleVision", label: "Single Vision" },
        { value: "progressive", label: "Progressive" },
        { value: "sunglass", label: "Sunglass" },
        { value: "bifocal", label: "Bifocal" },
      ],
      onChange: setFilterType,
    },
    {
      label: "Material",
      placeholder: "Filter by Material",
      options: [
        { value: "all", label: "All Materials" },
        { value: "polycarbonate", label: "Polycarbonate" },
        { value: "high-index", label: "High-Index" },
        { value: "trivex", label: "Trivex" },
      ],
      onChange: setFilterMaterial,
    },

    {
      label: "Color",
      placeholder: "Filter by Color",
      options: [
        { value: "all", label: "All Shapes" },
        { value: "clear", label: "Clear" },
        { value: "clear to gray", label: "Clear to Gray" },
        { value: "dark gray", label: "Dark Gray" },
        { value: "brown tint", label: "Brown Tint" },
        { value: "light", label: "Light Pink" },
      ],
      onChange: setColor,
    },
    {
      label: "Brand",
      placeholder: "Filter by Brand",
      options: [
        { value: "all", label: "All Brands" },
        { value: "Essilor", label: "Essilor" },
        { value: "Hoya", label: "Hoya" },
        { value: "Zeiss", label: "Zeiss" },
        { value: "Oakley", label: "Oakley" },
        { value: "Generic", label: "Generic" },
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

  return {columns, setSearch, search, actionColumns, filterSummary, paginatedData, setPaginatedData, minPrice, setMinPrice, maxPrice, setMaxPrice, filters, page, setPage, filteredData}
};

export default useContactList;