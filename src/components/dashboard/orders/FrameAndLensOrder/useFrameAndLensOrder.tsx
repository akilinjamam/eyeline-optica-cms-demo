import type { ActionColumn, TableColumn,  } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { IFrameWithLensInfo, ISales } from "../../../../types/interface";
import { useGetAllSalesQuery } from "../../../../app/redux/api/salesApi";
import { Edit } from "lucide-react";
import { openEdit } from "../../../../app/redux/features/modalSlice";
import { useDispatch } from "react-redux";


const useFrameAndLensOrder = () => {
    
    const {data:allData, isLoading} = useGetAllSalesQuery('Frame and Lens')
  
    const allFrameOrderData = allData?.data?.data as ISales[] | undefined;

    const newModifiedData = useMemo(() => {
    return allFrameOrderData?.map((item: ISales) => {
        const { customer_email, customer_phone, customer_address, productId, lensId, customer_name, invoiceNo, status,quantity, subtotal, _id } = item;
        return {
        _id,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        productName: `${productId?.name}+${lensId?.name}`,
        productSalesPrice: `${productId?.salesPrice}+${lensId?.salesPrice}`,
        productPurchasePrice: `${productId?.purchase}+${lensId?.purchasePrice}`,
        productQty: quantity,
        frameId: productId?._id,
        lensId: lensId?._id,
        invoiceNo,
        status,
        subtotal
        };
    }) as IFrameWithLensInfo[] | undefined;
    }, [allFrameOrderData]);

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "customer_name", label: "Name", align: "left" },
  { key: "customer_email", label: "Email", align: "left" },
  { key: "customer_phone", label: "Phone Number", align: "left" },
  { key: "productName", label: "Frame + Lens", align: "left" },
  { key: "productSalesPrice", label: "Sales Price", align: "left" },
  { key: "invoiceNo", label: "Invoice No", align: "left" },
  { key: "status", label: "Status", align: "left" },
  { key: "customer_address", label: "Address", align: "left" },
  { key: "productPurchasePrice", label: "Purchase Price", align: "left" },
  { key: "productQty", label: "Qty", align: "left" },
  { key: "subtotal", label: "Total Price", align: "left" },
];

  const [frame, setFrame] = useState<IFrameWithLensInfo[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProductname, setFilterProductName] = useState("all");
  const [filterPurchasePrice, setFilterPurchasePrice] = useState("all");
  const [filterSalesPrice, setFilterSalesPrice] = useState("all");
  const [filterQty, setFilterQty] = useState("all");
  const [paginatedData, setPaginatedData] = useState<IFrameWithLensInfo[]>([])
  const [page, setPage] = useState(1);

  

    useEffect(() => {
        setPage(1);
    }, [search, filterStatus, filterProductname, filterSalesPrice, filterPurchasePrice, filterQty]);

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


    const statusCategory = [...new Set(frame?.map((p: IFrameWithLensInfo) => p?.status))]
  .map(type => ({ value: type, label: type }));
    const productNameCategory = [...new Set(frame?.map((p: IFrameWithLensInfo) => p?.productName))]
  .map(type => ({ value: type, label: type }));
    const productPurchasePriceCategory = [...new Set(frame?.map((p: IFrameWithLensInfo) => p?.productPurchasePrice?.toString()))].map(type => ({ value: type, label: type }));
    const frameSalesPriceCategory = [...new Set(frame?.map((p: IFrameWithLensInfo) => p?.productSalesPrice?.toString()))].map(type => ({ value: type, label: type }));
   
    const frameQtyCategory = [...new Set(frame?.map((p: IFrameWithLensInfo) => p?.productQty?.toString()))]
  .map(type => ({ value: type, label: type }));


    const filteredData = useMemo(() => {

    const filteredData:IFrameWithLensInfo[] = frame.filter(frame => {
      const matchSearch =
        frame?.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        frame?.customer_email.toLowerCase().includes(search.toLowerCase()) ||
        frame?.customer_address.toLowerCase().includes(search.toLowerCase()) ||
        frame?.customer_phone.toLowerCase().includes(search.toLowerCase()) ||
        frame?.productName.toLowerCase().includes(search.toLowerCase()) ||
        frame?.invoiceNo.toLowerCase().includes(search.toLowerCase())
        
        
      const matchName = filterStatus === "all" ? true : frame?.status === filterStatus;
      const matchProductName = filterProductname === "all" ? true : frame?.productName === filterProductname;
      const matchPurchasePrice = filterPurchasePrice === "all" ? true : frame?.productPurchasePrice === filterPurchasePrice;
      const matchSalesPrice = filterSalesPrice === "all" ? true : frame?.productSalesPrice === filterSalesPrice
    

      return matchSearch && matchName &&  matchSalesPrice && matchPurchasePrice && matchProductName
    });

    const addingIdWithFiltered:IFrameWithLensInfo[] = filteredData.map((filtered:IFrameWithLensInfo, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
    } , [frame, search, filterStatus,filterPurchasePrice, filterSalesPrice, filterProductname ]);

   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterStatus !== "all") activeFilters.push(`Status: ${filterStatus}`);
  if (filterProductname !== "all") activeFilters.push(`Product name: ${filterProductname}`);
  if (filterPurchasePrice !== "all") activeFilters.push(`Purchase Price: ${filterPurchasePrice}`);
  if (filterSalesPrice !== "all") activeFilters.push(`Sales Price: ${filterSalesPrice}`);
  if (filterQty !== "all") activeFilters.push(`Quantity: ${filterQty}`);
  

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
      label: "Product Name",
      placeholder: "Product Name",
      options: [
        { value: "all", label: "All Product Name" },
        ...productNameCategory
      ],
      onChange: setFilterProductName,
    },
    {
      label: "Purchase Price",
      placeholder: "Purchase Price",
      options: [
        { value: "all", label: "All Purchase" },
        ...productPurchasePriceCategory
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
      label: "Quantity",
      placeholder: "Quantity",
      options: [
        { value: "all", label: "All Quantity" },
        ...frameQtyCategory
      ],
      onChange: setFilterQty,
    }
  ]

  const dispatch = useDispatch();
  
    const handleEdit = (value:string) => {
        const findonlyFrameOrder = allFrameOrderData?.find((item:ISales) => item?._id === value) as ISales;
        const {paymentHistoryId, status, _id} = findonlyFrameOrder
        console.log({paymentHistoryId, status, _id})
        dispatch(openEdit({name: 'sales-order-status',data:{paymentHistoryId, status, id:_id} }));
    }
    
  
    const actionColumns: ActionColumn[] = [
      {
        logo: <Edit className="w-4 h-4 text-green-800"/>,
        type: "edit",
        render: handleEdit
      }
    ]

return {filters,filterSummary, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, actionColumns}

};

export default useFrameAndLensOrder;