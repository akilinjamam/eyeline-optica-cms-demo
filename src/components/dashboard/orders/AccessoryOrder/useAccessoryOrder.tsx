/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActionColumn, TableColumn,  } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { IAccessorySaleInfo, ISales } from "../../../../types/interface";
import { useGetAllSalesQuery } from "../../../../app/redux/api/salesApi";
import { useDispatch } from "react-redux";
import { openEdit } from "../../../../app/redux/features/modalSlice";
import { Edit, Eye, ListCheck } from "lucide-react";
import { useGetAllAccessoryQuery } from "../../../../app/redux/api/accessoryApi";
import useSingleInvoiceDownloader from "../../../../pdfDownloader/useSingleInvoiceDownloader";


const useAccessoryOrder = () => {

    const {data:allData, isLoading} = useGetAllSalesQuery('Only Accessory')
    const {data:allAccessory} = useGetAllAccessoryQuery('')
  
    const allFrameOrderData = allData?.data?.data as ISales[] | undefined;

    const newModifiedData = useMemo(() => {
    return allFrameOrderData?.map((item: ISales) => {
        const { customer_email, customer_phone, customer_address, accessoryId, customer_name, invoiceNo, status, subtotal, quantity, _id, payableAmount, dueAmount, deliveryFee} = item;
        const accessoryName = accessoryId?.items?.map((item:any) => item?.name)?.join('+');
        const accessoryPurchasePrice = accessoryId?.items?.map((item:any) => item?.purchasePrice)?.join('+');
        const accessorySalesPrice = accessoryId?.items?.map((item:any) => item?.salesPrice)?.join('+');

        return {
        _id,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        accessoryName,
        accessorySalesPrice,
        accessoryPurchasePrice,
        accessoryQty: quantity,
        accessoryId: accessoryId?._id,
        invoiceNo,
        status,
        subtotal:subtotal * quantity,
        payableAmount,
        dueAmount,
        deliveryFee
        };
    }) as IAccessorySaleInfo[] | undefined;
    }, [allFrameOrderData]);

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "customer_name", label: "Name", align: "left" },
  { key: "customer_email", label: "Email", align: "left" },
  { key: "customer_phone", label: "Phone Number", align: "left" },
  { key: "accessoryName", label: "Accessory Name", align: "left" },
  { key: "accessorySalesPrice", label: "Sales Price", align: "left" },
  { key: "invoiceNo", label: "Invoice No", align: "left" },
  { key: "status", label: "Status", align: "left" },
  { key: "customer_address", label: "Address", align: "left" },
  { key: "accessoryPurchasePrice", label: "Purchase Price", align: "left" },
  { key: "accessoryQty", label: "Qty", align: "left" },
  { key: "subtotal", label: "Total", align: "left" },
];

  const [accessory, setAccessory] = useState<IAccessorySaleInfo[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterAccessoryName, setFilterAccessoryName] = useState("all");
  const [filterPurchasePrice, setFilterPurchasePrice] = useState("all");
  const [filterSalesPrice, setFilterSalesPrice] = useState("all");
  const [paginatedData, setPaginatedData] = useState<IAccessorySaleInfo[]>([])
  const [page, setPage] = useState(1);

  

    useEffect(() => {
        setPage(1);
    }, [search, filterStatus, filterAccessoryName, filterSalesPrice, filterPurchasePrice]);

    useEffect(() => {
  if (newModifiedData && Array.isArray(newModifiedData) ) {
    // Prevent unnecessary updates
    setAccessory((prev) => {
      const prevStr = JSON.stringify(prev);
      const newStr = JSON.stringify(newModifiedData);
      return prevStr !== newStr ? newModifiedData : prev;
    });
  }
}, [newModifiedData]);


    const statusCategory = [...new Set(accessory?.map((p: IAccessorySaleInfo) => p?.status))]
  .map(type => ({ value: type, label: type }));
    const accessoryNameCategory = [...new Set(accessory?.map((p: IAccessorySaleInfo) => p?.accessoryName))]
  .map(type => ({ value: type, label: type }));
    const accessoryPurchasePriceCategory = [...new Set(accessory?.map((p: IAccessorySaleInfo) => p?.accessoryPurchasePrice?.toString()))].map(type => ({ value: type, label: type }));
    const accessorySalesPriceCategory = [...new Set(accessory?.map((p: IAccessorySaleInfo) => p?.accessorySalesPrice?.toString()))].map(type => ({ value: type, label: type }));


    const filteredData = useMemo(() => {

    const filteredData:IAccessorySaleInfo[] = accessory.filter(accessory => {
      const matchSearch =
        accessory?.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        accessory?.customer_email.toLowerCase().includes(search.toLowerCase()) ||
        accessory?.customer_address.toLowerCase().includes(search.toLowerCase()) ||
        accessory?.customer_phone.toLowerCase().includes(search.toLowerCase()) ||
        accessory?.accessoryName.toLowerCase().includes(search.toLowerCase()) ||
        accessory?.invoiceNo.toLowerCase().includes(search.toLowerCase())
        
        
      const matchName = filterStatus === "all" ? true : accessory?.status === filterStatus;
      const matchFrameName = filterAccessoryName === "all" ? true : accessory?.accessoryName === filterAccessoryName;
      const matchPurchasePrice = filterPurchasePrice === "all" ? true : accessory?.accessoryPurchasePrice?.toString() === filterPurchasePrice;
      const matchSalesPrice = filterSalesPrice === "all" ? true : accessory?.accessorySalesPrice?.toString() === filterSalesPrice

      return matchSearch && matchName && matchFrameName && matchSalesPrice && matchPurchasePrice
    });

    

    const addingIdWithFiltered:IAccessorySaleInfo[] = filteredData.map((filtered:IAccessorySaleInfo, index:number) => ({id:index+1, ...filtered}))


    const totalValue = addingIdWithFiltered?.reduce((acc, item) => acc + ((item?.subtotal) || 0), 0)

    const totalRow = {
        id: "—",
        _id: "total",
        customer_name: "Total",
        customer_email: "",
        customer_phone: "",
        customer_address: "",
        accessoryName: "",
        accessorySalesPrice: "",
        accessoryPurchasePrice: "",
        accessoryQty: "",
        accessoryId: "",
        invoiceNo: "",
        status: "",
        subtotal: totalValue
      } as unknown as IAccessorySaleInfo;

    return [totalRow,...addingIdWithFiltered]
    } , [accessory, search, filterStatus, filterAccessoryName,filterPurchasePrice, filterSalesPrice]);

  


   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterStatus !== "all") activeFilters.push(`Status: ${filterStatus}`);
  if (filterAccessoryName !== "all") activeFilters.push(`Accessory name: ${filterAccessoryName}`);
  if (filterPurchasePrice !== "all") activeFilters.push(`Purchase Price: ${filterPurchasePrice}`);
  if (filterSalesPrice !== "all") activeFilters.push(`Sales Price: ${filterSalesPrice}`); 
 
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
      label: "Accessory Name",
      placeholder: "Accessory Name",
      options: [
        { value: "all", label: "All accessory Name" },
        ...accessoryNameCategory
      ],
      onChange: setFilterAccessoryName,
    },
    {
      label: "Purchase Price",
      placeholder: "Purchase Price",
      options: [
        { value: "all", label: "All Purchase" },
        ...accessoryPurchasePriceCategory
      ],
      onChange: setFilterPurchasePrice,
    },
    {
      label: "Sales Price",
      placeholder: "Sales Price",
      options: [
        { value: "all", label: "All Sales" },
        ...accessorySalesPriceCategory
      ],
      onChange: setFilterSalesPrice,
    },
    
  ]

   const dispatch = useDispatch();
    
      const handleEdit = (value:string) => {
          const findonlyFrameOrder = allFrameOrderData?.find((item:ISales) => item?._id === value) as ISales;
          const {paymentHistoryId, status, _id} = findonlyFrameOrder
          console.log({paymentHistoryId, status, _id})
          dispatch(openEdit({name: 'sales-order-status',data:{paymentHistoryId, status, id:_id} }));
      }

       const handleDetails = (value:string) => {
                    const findProductId = newModifiedData?.find((item:IAccessorySaleInfo) => item?._id === value)
                   
                    const findonlyAccessoryOrder = Array.isArray(allAccessory?.data?.data) 
                      ? allAccessory?.data?.data?.find((item:any) => item?._id === findProductId?.accessoryId)
                      : null;
                    
                    if (findonlyAccessoryOrder) {
                     console.log(findonlyAccessoryOrder)
                      dispatch(openEdit({name: 'details-accesory',data:{ accessory: findonlyAccessoryOrder} }));
                    }
        }

        const {handleDownloadInvoice} = useSingleInvoiceDownloader();
            
              const handleInvoice = (value:string) => {
                const findProduct = newModifiedData?.find((item:IAccessorySaleInfo) => item?._id === value)
                if(!findProduct) return
                handleDownloadInvoice(findProduct)
              }
      
    
      const actionColumns: ActionColumn[] = [
        {
          logo: <Edit className="w-4 h-4 text-green-800"/>,
          type: "edit",
          render: handleEdit
        },
        {
          logo: <Eye className="w-4 h-4 text-orange-800"/>,
          type: "view",
          render: handleDetails
        },
        {
          logo: <ListCheck className="w-4 h-4 text-cyan-600"/>,
          type: "invoice",
          render: handleInvoice
        },
      ]


return {filters,filterSummary, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, actionColumns}

};

export default useAccessoryOrder;