/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import type { TableColumn } from "../../../../types/type";
import {  useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { useGetWishlistQuery } from "../../../../app/redux/api/wishlistApi";

type TFrame = {
    name:string;
    purchasePrice:number;
    salesPrice:number;
}

type TWishlistFrame = {
    salesPrice: any;
    lensId:TFrame;
    clicked:number;
}

const useWishlistLensList = () => {

  const {data:allData, isLoading} = useGetWishlistQuery('lens');
  
  const modifiedData = useMemo(() => {

    const responseData = allData?.data?.map((item:TWishlistFrame) => {
        
        return {
            product: item?.lensId?.name,
            purchasePrice: item?.lensId?.purchasePrice,
            salesPrice: item?.lensId?.salesPrice,
            clicked: item?.clicked
        }
    })
    return responseData

},[allData])

console.log(modifiedData)

    const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "product", label: "product Name", align: "left" },
  { key: "purchasePrice", label: "Purchase Price", align: "left" },
  { key: "salesPrice", label: "Sales Price", align: "left" },
  { key: "clicked", label: "Index", align: "left" }
];

  const [wishlistFrame, setWishListFrame] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [page, setPage] = useState(1);


  useEffect(() => {
          if (modifiedData && Array.isArray(modifiedData)) {
              setWishListFrame(modifiedData);
          }
    }, [modifiedData]);

  useEffect(() => {
    setPage(1);
  }, [search, filterType]);

  const filteredDataa = useMemo(() => {

    const filteredData:any = wishlistFrame?.filter((product) => {
      const matchSearch =
        product?.product?.toLowerCase().includes(search.toLowerCase())

      const matchType = filterType === "all" ? true : product.name === filterType;

      return matchSearch && matchType ;
    });

    const addingIdWithFiltered:any = filteredData.map((filtered:any, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
  }, [wishlistFrame,filterType,search]);
  
  const {showCheck} = useSelector((state:RootState) => state.modal);


   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterType !== "all") activeFilters.push(`Product Type: ${filterType}`);


  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";


    const typeCategory = [...new Set(wishlistFrame
  ?.map((p: any) => p?.product)
  .filter((t): t is string => !!t && t.trim() !== "")
)].map(type => ({ value: type, label: type }));


  const filters:any = [
    {
      label: "Product Name",
      placeholder: "frame",
      options: [
        { value: "all", label: "All Product name" },
        ...typeCategory
      ],
      onChange: setFilterType,
    }
]

    return {columns, setSearch, search,  filterSummary, paginatedData, setPaginatedData,  filters, page, setPage, filteredDataa, isLoading, showCheck}

};

export default useWishlistLensList;