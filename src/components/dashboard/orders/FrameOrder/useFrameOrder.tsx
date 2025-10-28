import type { ActionColumn, TableColumn,  } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { IFrame, IFrameSaleInfo, ISales } from "../../../../types/interface";
import { useGetAllSalesQuery } from "../../../../app/redux/api/salesApi";
import { Edit, Eye, ListCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { openEdit } from "../../../../app/redux/features/modalSlice";
import { useGetAllFramesQuery } from "../../../../app/redux/api/frameApi";
import useSingleInvoiceDownloader from "../../../../pdfDownloader/useSingleInvoiceDownloader";


const useFrameOrder = () => {

    const {data:allData, isLoading} = useGetAllSalesQuery('Only Frame');
    const {data:allFrames} = useGetAllFramesQuery('')

    const allFrameOrderData = allData?.data?.data as ISales[] | undefined;

    const newModifiedData = useMemo(() => {
    return allFrameOrderData?.map((item: ISales) => {
        const { customer_email, customer_phone, customer_address, productId, customer_name, invoiceNo, status, subtotal, quantity,_id, payableAmount, dueAmount, deliveryFee } = item;
        return {
        _id,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        frameName: productId?.name,
        frameSalesPrice: productId?.salesPrice,
        framePurchasePrice: productId?.purchase,
        frameQty: quantity,
        frameId: productId?._id,
        invoiceNo,
        status,
        subtotal:subtotal * quantity,
        payableAmount, dueAmount, deliveryFee
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
  { key: "frameQty", label: "Qty", align: "left" },
  { key: "subtotal", label: "Total", align: "left" },
];

  const [frame, setFrame] = useState<IFrameSaleInfo[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterFrameName, setFilterFrameName] = useState("all");
  const [filterPurchasePrice, setFilterPurchasePrice] = useState("all");
  const [filterSalesPrice, setFilterSalesPrice] = useState("all");
  const [filterQty, setFilterQty] = useState("all");
  const [paginatedData, setPaginatedData] = useState<IFrameSaleInfo[]>([])
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


    const statusCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.status))]
  .map(type => ({ value: type, label: type }));
    const frameNameCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.frameName))]
  .map(type => ({ value: type, label: type }));
    const framePurchasePriceCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.framePurchasePrice?.toString()))].map(type => ({ value: type, label: type }));
    const frameSalesPriceCategory = [...new Set(frame?.map((p: IFrameSaleInfo) => p?.frameSalesPrice?.toString()))].map(type => ({ value: type, label: type }));

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

        return matchSearch && matchName && matchFrameName && matchSalesPrice && matchPurchasePrice
      });

      const addingIdWithFiltered:IFrameSaleInfo[] = filteredData.map((filtered:IFrameSaleInfo, index:number) => ({id:index+1, ...filtered}))

      // ✅ Calculate total subtotal
  const totalSubtotal = filteredData.reduce(
    (acc, item) => acc + ((item.subtotal) || 0),
    0
  );

  // ✅ Add a final row for total
  const totalRow = {
    id: "—",
    _id: "total",
    customer_name: "Total",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    frameName: "",
    frameSalesPrice: "",
    framePurchasePrice: "",
    frameQty: "",
    frameId: "",
    invoiceNo: "",
    status: "",
    subtotal: totalSubtotal
  } as unknown as IFrameSaleInfo;


      return [totalRow,...addingIdWithFiltered]
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

  const handleDetail = (value:string) => {
      const findProductId = newModifiedData?.find((item:IFrameSaleInfo) => item?._id === value)
     
      const findonlyFrameOrder = Array.isArray(allFrames?.data?.data) 
        ? allFrames?.data?.data?.find((item:IFrame) => item?._id === findProductId?.frameId)
        : null;
      
      if (findonlyFrameOrder) {
        console.log(findonlyFrameOrder)
        dispatch(openEdit({name: 'details-only-frame',data:{...findonlyFrameOrder} }));
      }
    }
  const {handleDownloadInvoice} = useSingleInvoiceDownloader();

  const handleInvoice = (value:string) => {
    const findProduct = newModifiedData?.find((item:IFrameSaleInfo) => item?._id === value)
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
      render: handleDetail
    },
    {
      logo: <ListCheck className="w-4 h-4 text-cyan-600"/>,
      type: "invoice",
      render: handleInvoice
    },
  ]


return {filters,filterSummary, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, actionColumns}

};

export default useFrameOrder;