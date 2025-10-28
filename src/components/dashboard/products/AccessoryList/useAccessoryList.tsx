import { Edit, Image, Trash2 } from "lucide-react";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type {  IAccessory, IAccessoryItems, IModifiedAccessory} from "../../../../types/interface";
import { useDispatch, useSelector } from "react-redux";
import { openEdit, setImages, switchCheck } from "../../../../app/redux/features/modalSlice";
import type { RootState } from "../../../../app/store";
import { useGetAllAccessoryQuery } from "../../../../app/redux/api/accessoryApi";

const useAccessoryList = () => {

    const {data:allData, isLoading} = useGetAllAccessoryQuery('')
  
    const allAccessoryData = allData?.data?.data as IAccessory[] | undefined;

    const modifiedData = useMemo(() => {

        if (!allAccessoryData) return undefined;

        const modify = allAccessoryData?.map((item: IAccessory) => {
            const manageName = item?.items?.map((value:IAccessoryItems) => value.name)?.join("+");
            const manageSalesPrice = item?.items?.map((value:IAccessoryItems) => value.salesPrice)?.join("+");
            const managePurchasePrice = item?.items?.map((value:IAccessoryItems) => value.purchasePrice)?.join("+");
            const manageCategory = item?.items?.map((value:IAccessoryItems) => value.category)?.join("+");
            const manageBrand = item?.items?.map((value:IAccessoryItems) => value.brand)?.join("+");
            const manageQty = item?.items?.map((value:IAccessoryItems) => value.quantity)?.join("+");
            const images = item?.images

            return {
                _id: item?._id,
                type: item?.type,
                images,
                name: manageName,
                brand: manageBrand,
                salesPrice: manageSalesPrice,
                purchasePrice: managePurchasePrice,
                category:manageCategory,
                quantity: manageQty
            }
            
        })

        return modify
        
    },[allAccessoryData]);

    console.log(modifiedData)

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "name", label: "Name", align: "left" },
  { key: "brand", label: "Brand", align: "left" },
  { key: "type", label: "Type", align: "left" },
  { key: "category", label: "Category", align: "left" },
  { key: "salesPrice", label: "Price", align: "left" },
  { key: "purchasePrice", label: "Price", align: "left" },
  { key: "quantity", label: "Qty", align: "left" },
];

  const [accessory, setAccessory] = useState<IModifiedAccessory[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterBrand, setFilterBrand] = useState("all");
  const [paginatedData, setPaginatedData] = useState<IModifiedAccessory[]>([])
  const [page, setPage] = useState(1);
  
    useEffect(() => {
        setPage(1);
    }, [search, filterType, filterCategory, filterBrand]);

    useEffect(() => {
        if (modifiedData && Array.isArray(modifiedData)) {
            setAccessory(modifiedData as IModifiedAccessory[]);
        }
    }, [modifiedData]);


    const typeCategory = [...new Set(accessory?.map((p: IModifiedAccessory) => p?.type))]
  .map(type => ({ value: type, label: type }));
    const accessoryCategory = [...new Set(accessory?.map((p: IModifiedAccessory) => p?.category))]
  .map(type => ({ value: type, label: type }));
    const brandCategory = [...new Set(accessory?.map((p: IModifiedAccessory) => p?.brand))].map(type => ({ value: type, label: type }));
   


    const filteredData = useMemo(() => {

    const filteredData:IModifiedAccessory[] = accessory.filter(accessory => {
      const matchSearch =
        accessory?.name.toLowerCase().includes(search.toLowerCase()) ||
        accessory?.type.toLowerCase().includes(search.toLowerCase()) ||
        accessory?.brand.toLowerCase().includes(search.toLowerCase());

      const matchType = filterType === "all" ? true : accessory?.type === filterType;
      const matchCategory = filterCategory === "all" ? true : accessory?.category === filterCategory;
      const matchBrand = filterBrand === "all" ? true : accessory?.brand === filterBrand;
    

      return matchSearch && matchType && matchBrand && matchCategory
    });

    const addingIdWithFiltered:IModifiedAccessory[] = filteredData.map((filtered:IModifiedAccessory, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
    } , [accessory, search, filterType, filterBrand, filterCategory, ]);

  const dispatch = useDispatch()
  
  const {showCheck} = useSelector((state:RootState) => state.modal);
  

  const handleEdit = (id: string) => {
    const findData = allAccessoryData?.find((item:IAccessory) => item?._id === id)
  
    dispatch(openEdit({name: 'accessory',data:findData }));
  }
  const handleDelete = () => {
      dispatch(switchCheck())
    
  };

  const handleImages = (id:string) => {
    const findData = allAccessoryData?.find((item:IAccessory) => item?._id === id)?.images?.map((image:string) => image);
    dispatch(setImages(findData as string[]))
  
  }

   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterType !== "all") activeFilters.push(`Type: ${filterType}`);
  if (filterCategory !== "all") activeFilters.push(`Category: ${filterCategory}`);
  if (filterBrand !== "all") activeFilters.push(`Brand: ${filterBrand}`);

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
      label: "Category",
      placeholder: "Filter by Category",
      options: [
        { value: "all", label: "All Category" },
        ...accessoryCategory
      ],
      onChange: setFilterCategory,
    },
    {
      label: "Brand",
      placeholder: "Filter by Brand",
      options: [
        { value: "all", label: "All Brand" },
        ...brandCategory
      ],
      onChange: setFilterBrand,
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
  {
    logo: <Trash2 className="w-4 h-4 text-red-800"/>,
    type: "delete",
    render: handleDelete
  },
]

return {actionColumns,filters,filterSummary,  search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, showCheck}

};

export default useAccessoryList;