import type { TableColumn,  } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { IFrameSaleInfo, ISales } from "../../../../types/interface";
import { useGetAllSalesQuery } from "../../../../app/redux/api/salesApi";


const useFrameOrder = () => {

    const {data:allData, isLoading} = useGetAllSalesQuery('')
  
    const allFrameOrderData = allData?.data?.data as ISales[] | undefined;

    const newModifiedData = useMemo(() => {
    return allFrameOrderData?.map((item: ISales) => {
        const { customer_email, customer_phone, customer_address, productId, customer_name, invoiceNo, status } = item;
        return {
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        frameName: productId?.name,
        frameSalesPrice: productId?.salesPrice,
        framePurchasePrice: productId?.purchase,
        frameSold: productId?.sold,
        frameQty: productId?.quantity,
        frameStock: productId?.stock,
        frameId: productId?._id,
        invoiceNo,
        status
        };
    }) as IFrameSaleInfo[] | undefined;
    }, [allFrameOrderData]);

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "customer_name", label: "Name", align: "left" },
  { key: "customer_email", label: "Email", align: "left" },
  { key: "customer_phone", label: "Phone Number", align: "left" },
  { key: "frameName", label: "Frame", align: "left" },
  { key: "frameSalesPrice", label: "Sales Price", align: "left" },
  { key: "invoiceNo", label: "Invoice No", align: "left" },
  { key: "status", label: "Status", align: "left" },
  { key: "customer_address", label: "Address", align: "left" },
  { key: "framePurchasePrice", label: "Purchase Price", align: "left" },
  { key: "frameSold", label: "Total Sold", align: "left" },
  { key: "frameQty", label: "Qty", align: "left" },
  { key: "frameStock", label: "Stock", align: "left" },
];

  const [frame, setFrame] = useState<IFrameSaleInfo[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterFrameName, setFilterFrameName] = useState("all");
  const [filterPurchasePrice, setFilterPurchasePrice] = useState("all");
  const [filterSalesPrice, setFilterSalesPrice] = useState("all");
  const [filterSold, setFilterSold] = useState("all");
  const [filterQty, setFilterQty] = useState("all");
  const [filterStock, setFilterStock] = useState("all");
  const [paginatedData, setPaginatedData] = useState<IFrameSaleInfo[]>([])
  const [page, setPage] = useState(1);

  

    useEffect(() => {
        setPage(1);
    }, [search, filterStatus, filterFrameName, filterSalesPrice, filterPurchasePrice, filterQty, filterStock, filterSold]);

    useEffect(() => {
  if (newModifiedData && Array.isArray(newModifiedData) ) {
    // Prevent unnecessary updates
    setFrame((prev) => {
      const prevStr = JSON.stringify(prev);
      const newStr = JSON.stringify(newModifiedData);
      return prevStr !== newStr ? newModifiedData : prev;
    });
  }
}, [newModifiedData]);


    const statusCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.status))]
  .map(type => ({ value: type, label: type }));
    const frameNameCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.frameName))]
  .map(type => ({ value: type, label: type }));
    const framePurchasePriceCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.framePurchasePrice?.toString()))].map(type => ({ value: type, label: type }));
    const frameSalesPriceCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.frameSalesPrice?.toString()))].map(type => ({ value: type, label: type }));
   const frameStockCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.frameStock))]
  .map(type => ({ value: String(type), label: type ? "In Stock" : "Out of Stock" }));
    const frameSoldCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.frameSold?.toString()))]
  .map(type => ({ value: type, label: type }));
    const frameQtyCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.frameQty?.toString()))]
  .map(type => ({ value: type, label: type }));


    const filteredData = useMemo(() => {

    const filteredData:IFrameSaleInfo[] = frame.filter(frame => {
      const matchSearch =
        frame?.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        frame?.customer_email.toLowerCase().includes(search.toLowerCase()) ||
        frame?.customer_address.toLowerCase().includes(search.toLowerCase()) ||
        frame?.customer_phone.toLowerCase().includes(search.toLowerCase()) ||
        frame?.frameName.toLowerCase().includes(search.toLowerCase()) ||
        frame?.invoiceNo.toLowerCase().includes(search.toLowerCase())
        
        
      const matchName = filterStatus === "all" ? true : frame?.status === filterStatus;
      const matchFrameName = filterFrameName === "all" ? true : frame?.frameName === filterFrameName;
      const matchPurchasePrice = filterPurchasePrice === "all" ? true : frame?.framePurchasePrice?.toString() === filterPurchasePrice;
      const matchSalesPrice = filterSalesPrice === "all" ? true : frame?.frameSalesPrice?.toString() === filterSalesPrice
      const matchStock = filterSalesPrice === "all" ? true : frame?.frameStock?.toString() === filterStock
      const matchSold = filterSold === "all" ? true : frame?.frameSold?.toString() === filterSold

      return matchSearch && matchName && matchFrameName && matchSalesPrice && matchPurchasePrice && matchStock && matchSold
    });

    const addingIdWithFiltered:IFrameSaleInfo[] = filteredData.map((filtered:IFrameSaleInfo, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
    } , [frame, search, filterStatus, filterFrameName,filterPurchasePrice, filterSalesPrice, filterStock, filterSold ]);

  


   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterStatus !== "all") activeFilters.push(`Status: ${filterStatus}`);
  if (filterFrameName !== "all") activeFilters.push(`Frame name: ${filterFrameName}`);
  if (filterPurchasePrice !== "all") activeFilters.push(`Purchase Price: ${filterPurchasePrice}`);
  if (filterSalesPrice !== "all") activeFilters.push(`Sales Price: ${filterSalesPrice}`);
  if (filterSold !== "all") activeFilters.push(`Sales Price: ${filterSold}`);
  if (filterQty !== "all") activeFilters.push(`Quantity: ${filterQty}`);
  if (filterStock !== "all") activeFilters.push(`Stock: ${filterStock}`);

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";


  const filters = [
    {
      label: "Status",
      placeholder: "Status",
      options: [
        { value: "all", label: "All Status" },
        ...statusCategory
      ],
      onChange: setFilterStatus,
    },
    {
      label: "Frame Name",
      placeholder: "Frame Name",
      options: [
        { value: "all", label: "All Frame Name" },
        ...frameNameCategory
      ],
      onChange: setFilterFrameName,
    },
    {
      label: "Purchase Price",
      placeholder: "Purchase Price",
      options: [
        { value: "all", label: "All Purchase" },
        ...framePurchasePriceCategory
      ],
      onChange: setFilterPurchasePrice,
    },
    {
      label: "Sales Price",
      placeholder: "Sales Price",
      options: [
        { value: "all", label: "All Sales" },
        ...frameSalesPriceCategory
      ],
      onChange: setFilterSalesPrice,
    },
    {
      label: "Frame Sold",
      placeholder: "Frame Sold",
      options: [
        { value: "all", label: "All Sold" },
        ...frameSoldCategory
      ],
      onChange: setFilterSold,
    },
    {
      label: "Stock",
      placeholder: "Stock",
      options: [
        { value: "all", label: "All Stock" },
        ...frameStockCategory
      ],
      onChange: setFilterStock,
    },
    {
      label: "Quantity",
      placeholder: "Quantity",
      options: [
        { value: "all", label: "All Quantity" },
        ...frameQtyCategory
      ],
      onChange: setFilterQty,
    }
  ]



return {filters,filterSummary, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading}

};

export default useFrameOrder;