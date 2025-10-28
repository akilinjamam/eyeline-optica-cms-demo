import type { ActionColumn, TableColumn,  } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { ILens, ILensSaleInfo, ISales } from "../../../../types/interface";
import { useGetAllSalesQuery } from "../../../../app/redux/api/salesApi";
import { Edit, Eye, File, ListCheck } from "lucide-react";
import { openEdit } from "../../../../app/redux/features/modalSlice";
import { useDispatch } from "react-redux";
import { useGetAllLensQuery } from "../../../../app/redux/api/lensApi";
import useSingleInvoiceDownloader from "../../../../pdfDownloader/useSingleInvoiceDownloader";


const useLensOrder = () => {
    
    const {data:allData, isLoading} = useGetAllSalesQuery('Only Lens')
    const {data:allLens} = useGetAllLensQuery('')
  
    const allFrameOrderData = allData?.data?.data as ISales[] | undefined;

    const newModifiedData = useMemo(() => {
    return allFrameOrderData?.map((item: ISales) => {
        const { customer_email, customer_phone, customer_address, lensId, customer_name, invoiceNo, status, quantity, subtotal, _id, pd, submitType, prescriptionImg, leftEye, rightEye, payableAmount, dueAmount, deliveryFee } = item;
        return {
        _id,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        lensName: lensId?.name,
        lensSalesPrice: lensId?.salesPrice,
        lensPurchasePrice: lensId?.purchasePrice,
        lensQty: quantity,
        lensId: lensId?._id,
        invoiceNo,
        status,
        subtotal: subtotal * quantity,
        pd, submitType, prescriptionImg, leftEye, rightEye, payableAmount, dueAmount, deliveryFee
        };
    }) as ILensSaleInfo[] | undefined;
    }, [allFrameOrderData]);

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "customer_name", label: "Name", align: "left" },
  { key: "customer_email", label: "Email", align: "left" },
  { key: "customer_phone", label: "Phone Number", align: "left" },
  { key: "lensName", label: "Lens", align: "left" },
  { key: "lensSalesPrice", label: "Sales Price", align: "left" },
  { key: "invoiceNo", label: "Invoice No", align: "left" },
  { key: "status", label: "Status", align: "left" },
  { key: "customer_address", label: "Address", align: "left" },
  { key: "framePurchasePrice", label: "Purchase Price", align: "left" },
  { key: "lensQty", label: "Qty", align: "left" },
  { key: "subtotal", label: "Total", align: "left" }
];

  const [frame, setFrame] = useState<ILensSaleInfo[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterFrameName, setFilterFrameName] = useState("all");
  const [filterPurchasePrice, setFilterPurchasePrice] = useState("all");
  const [filterSalesPrice, setFilterSalesPrice] = useState("all");
  const [filterQty, setFilterQty] = useState("all");
  const [paginatedData, setPaginatedData] = useState<ILensSaleInfo[]>([])
  const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [search, filterStatus, filterFrameName, filterSalesPrice, filterPurchasePrice, filterQty]);

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


    const statusCategory = [...new Set(frame?.map((p: ILensSaleInfo) => p?.status))]
    .map(type => ({ value: type, label: type }));

    const frameNameCategory = [...new Set(frame?.map((p: ILensSaleInfo) => p?.lensName))]
    .map(type => ({ value: type, label: type }));

    const framePurchasePriceCategory = [...new Set(frame?.map((p: ILensSaleInfo) => p?.lensPurchasePrice?.toString()))].map(type => ({ value: type, label: type }));

    const frameSalesPriceCategory = [...new Set(frame?.map((p: ILensSaleInfo) => p?.lensSalesPrice?.toString()))].map(type => ({ value: type, label: type }));
   
    const frameQtyCategory = [...new Set(frame?.map((p: ILensSaleInfo) => p?.lensQty?.toString()))]
    .map(type => ({ value: type, label: type }));


    const filteredData = useMemo(() => {

    const filteredData:ILensSaleInfo[] = frame.filter(frame => {
      const matchSearch =
        frame?.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        frame?.customer_email.toLowerCase().includes(search.toLowerCase()) ||
        frame?.customer_address.toLowerCase().includes(search.toLowerCase()) ||
        frame?.customer_phone.toLowerCase().includes(search.toLowerCase()) ||
        frame?.lensName.toLowerCase().includes(search.toLowerCase()) ||
        frame?.invoiceNo.toLowerCase().includes(search.toLowerCase())
        
      const matchName = filterStatus === "all" ? true : frame?.status === filterStatus;
      const matchFrameName = filterFrameName === "all" ? true : frame?.lensName === filterFrameName;
      const matchPurchasePrice = filterPurchasePrice === "all" ? true : frame?.lensPurchasePrice?.toString() === filterPurchasePrice;
      const matchSalesPrice = filterSalesPrice === "all" ? true : frame?.lensSalesPrice?.toString() === filterSalesPrice
     

      return matchSearch && matchName && matchFrameName && matchSalesPrice && matchPurchasePrice 
    });

    

    const addingIdWithFiltered:ILensSaleInfo[] = filteredData.map((filtered:ILensSaleInfo, index:number) => ({id:index+1, ...filtered}))

    const totalValue = addingIdWithFiltered?.reduce((acc, item) => acc + ((item?.subtotal) || 0), 0)

    const totalRow = {
        id: "—",
        _id: "total",
        customer_name: "Total",
        customer_email: "",
        customer_phone: "",
        customer_address: "",
        lensName: "",
        lensSalesPrice: "",
        lensPurchasePrice: "",
        lensQty: "",
        lensId: "",
        invoiceNo: "",
        status: "",
        subtotal: totalValue
      } as unknown as ILensSaleInfo;

    return [totalRow, ...addingIdWithFiltered]
    } , [frame, search, filterStatus, filterFrameName,filterPurchasePrice, filterSalesPrice]);

   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterStatus !== "all") activeFilters.push(`Status: ${filterStatus}`);
  if (filterFrameName !== "all") activeFilters.push(`Frame name: ${filterFrameName}`);
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
      label: "Lens Name",
      placeholder: "Lens Name",
      options: [
        { value: "all", label: "All Lens Name" },
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

    const handleDetails = (value:string) => {
          const findProductId = newModifiedData?.find((item:ILensSaleInfo) => item?._id === value)
         
          
          const findonlyLensOrder = Array.isArray(allLens?.data?.data) 
            ? allLens?.data?.data?.find((item:ILens) => item?._id === findProductId?.lensId)
            : null;
          
          if (findonlyLensOrder) {
           console.log(findonlyLensOrder)
            dispatch(openEdit({name: 'details-lens',data:{ lens: findonlyLensOrder} }));
          }
      }
    
      const handleEdit = (value:string) => {
          const findonlyFrameOrder = allFrameOrderData?.find((item:ISales) => item?._id === value) as ISales;
          const {paymentHistoryId, status, _id} = findonlyFrameOrder
          console.log({paymentHistoryId, status, _id})
          dispatch(openEdit({name: 'sales-order-status',data:{paymentHistoryId, status, id:_id} }));
      }

      const handlePower = (value:string) => {
          const prescription = newModifiedData?.find((item:ILensSaleInfo) => item?._id === value) as ILensSaleInfo
          const {pd, submitType, prescriptionImg, leftEye, rightEye} = prescription
           dispatch(openEdit({name: 'eye-prescription',data:{pd, submitType, prescriptionImg, leftEye, rightEye } }));
        }

      const {handleDownloadInvoice} = useSingleInvoiceDownloader();
                  
      const handleInvoice = (value:string) => {
          const findProduct = newModifiedData?.find((item:ILensSaleInfo) => item?._id === value)
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
          logo: <File className="w-4 h-4 text-amber-800"/>,
          type: "power",
          render: handlePower
        },
        {
          logo: <ListCheck className="w-4 h-4 text-cyan-600"/>,
          type: "power",
          render: handleInvoice
        },
      ]


return {filters,filterSummary, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, actionColumns}

};

export default useLensOrder;