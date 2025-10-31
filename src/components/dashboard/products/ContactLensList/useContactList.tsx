/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import type { ContactLens, Frame } from "../../../../types/interface";
import { Edit, Image, Trash2 } from "lucide-react";
import { useGetAllContactLensQuery } from "../../../../app/redux/api/contactLensApi";
import { useDispatch, useSelector } from "react-redux";
import { openEdit, setImages, switchCheck } from "../../../../app/redux/features/modalSlice";
import type { RootState } from "../../../../app/store";


const useContactList = () => {

  const dispatch = useDispatch();
  const {showCheck} = useSelector((state:RootState) => state.modal)
  const {data:allData, isLoading} = useGetAllContactLensQuery('')

  console.log(allData?.data?.data)

    const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "name", label: "Name", align: "left" },
  { key: "brand", label: "Brand", align: "left" },
  { key: "type", label: "Type", align: "left" },
  { key: "material", label: "Material", align: "left" },
  { key: "waterContent", label: "Water %", align: "left" },
  { key: "diameter", label: "Diameter (mm)", align: "left" },
  { key: "baseCurve", label: "Base Curve", align: "left" },
  { key: "powerRange", label: "Power Range", align: "left" },
  { key: "uvProtection", label: "UV Protection", align: "left" },
  { key: "salesPrice", label: "Sales Price", align: "left" },
  { key: "stock", label: "Stock", align: "left" },
  { key: "offer", label: "Offer (%)", align: "left" },
  { key: "rating", label: "Rating", align: "left" },
];

  const [contactLens, setContactLens] = useState<ContactLens[]>([]);
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
    if(allData?.data?.data && Array.isArray(allData?.data?.data)){
      setContactLens(allData?.data?.data)
    }
  },[allData])

  useEffect(() => {
    setPage(1);
  }, [search, filterType, filterMaterial]);

  const filteredData = useMemo(() => {

    const filteredData:ContactLens[] = contactLens.filter(clens => {
      const matchSearch =
        clens.name.toLowerCase().includes(search.toLowerCase()) ||
        clens.type.toLowerCase().includes(search.toLowerCase()) ||
        clens.color.toLowerCase().includes(search.toLowerCase());

      const matchType = filterType === "all" ? true : clens.type === filterType;
      const matchMaterial = filterMaterial === "all" ? true : clens.material === filterMaterial;
      const matchColor = color === "all" ? true : clens.color === color
      const matchBrand = brand === "all" ? true : clens.brand === brand

       const matchPrice =
        (minPrice === "" || (clens.salesPrice ?? 0) >= Number(minPrice)) &&
        (maxPrice === "" || (clens.salesPrice ?? 0) <= Number(maxPrice));

      return matchSearch && matchType && matchMaterial  && matchPrice && matchColor && matchBrand;
    });

    const addingIdWithFiltered:any = filteredData.map((filtered:any, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
  }, [contactLens, search, filterType, filterMaterial, minPrice, maxPrice, color, brand]);
  


  const handleEdit = (id: string) => {
     const findData = filteredData?.find((item:ContactLens) => item?._id === id)
          console.log("Edit", id);
          dispatch(openEdit({name: 'contact-lens',data:findData }));
  };
  const handleDelete = (id: number) => {
    dispatch(switchCheck())
    console.log('delete-id:',id);
  };

  const handleImages = (id:string) => {
        const findData = filteredData?.find((item:ContactLens) => item?._id === id)?.images?.map((image:string) => image);
        dispatch(setImages(findData as string[]))
        console.log(findData)
      }

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


  const typeCategory = [...new Set(contactLens?.map((p) => p?.type))]
    .map(type => ({ value: type, label: type }));
  const materialCategory = [...new Set(contactLens?.map((p) => p?.material))].map(type => ({ value: type, label: type }));
  const colorCategory = [...new Set(contactLens?.map((p) => p?.color))]
    .map(type => ({ value: type, label: type }));
  const brandCategory = [...new Set(contactLens?.map((p) => p?.brand))]
    .map(type => ({ value: type, label: type }));
   

  const filters = [
    {
      label: "Type",
      placeholder: "Filter by Lens Type",
      options: [
        { value: "all", label: "All Lens Types" },
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
      label: "Color",
      placeholder: "Filter by Color",
      options: [
        { value: "all", label: "All Shapes" },
        ...colorCategory
      ],
      onChange: setColor,
    },
    {
      label: "Brand",
      placeholder: "Filter by Brand",
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

  return {columns, setSearch, search, actionColumns, filterSummary, paginatedData, setPaginatedData, minPrice, setMinPrice, maxPrice, setMaxPrice, filters, page, setPage, filteredData, isLoading, showCheck}
};

export default useContactList;