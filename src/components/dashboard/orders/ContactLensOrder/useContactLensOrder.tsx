import type { ActionColumn, TableColumn,  } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { ContactLens, IContactLensSaleInfo, ISales } from "../../../../types/interface";
import { useGetAllSalesQuery } from "../../../../app/redux/api/salesApi";
import { Edit, Eye, File } from "lucide-react";
import { openEdit } from "../../../../app/redux/features/modalSlice";
import { useDispatch } from "react-redux";
import { useGetAllContactLensQuery } from "../../../../app/redux/api/contactLensApi";


const useContactLensOrder = () => {

    const {data:allData, isLoading} = useGetAllSalesQuery('Only Contact-Lens')
    const {data:allLens} = useGetAllContactLensQuery('')
  
    const allFrameOrderData = allData?.data?.data as ISales[] | undefined;

    const newModifiedData = useMemo(() => {
    return allFrameOrderData?.map((item: ISales) => {
        const { customer_email, customer_phone, customer_address, contactLensId, customer_name, invoiceNo, status, subtotal, quantity, _id, pd, submitType, prescriptionImg, leftEye, rightEye } = item;
        return {
        _id,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        contactLensName: contactLensId?.name,
        contactLensSalesPrice: contactLensId?.salesPrice,
        contactLensPurchasePrice: contactLensId?.purchasePrice,
        contactLensQty: quantity,
        contactLensId: contactLensId?._id,
        invoiceNo,
        status,
        subtotal:subtotal * quantity,
        pd, submitType, prescriptionImg, leftEye, rightEye
        };
    }) as IContactLensSaleInfo[] | undefined;
    }, [allFrameOrderData]);

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "customer_name", label: "Name", align: "left" },
  { key: "customer_email", label: "Email", align: "left" },
  { key: "customer_phone", label: "Phone Number", align: "left" },
  { key: "contactLensName", label: "C-Lens", align: "left" },
  { key: "contactLensSalesPrice", label: "Sales Price", align: "left" },
  { key: "invoiceNo", label: "Invoice No", align: "left" },
  { key: "status", label: "Status", align: "left" },
  { key: "customer_address", label: "Address", align: "left" },
  { key: "contactLensPurchasePrice", label: "Purchase Price", align: "left" },
  { key: "contactLensQty", label: "Qty", align: "left" },
  { key: "subtotal", label: "Total", align: "left" },
];

  const [contactLens, setContactLens] = useState<IContactLensSaleInfo[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterContactLensName, setFilterContactLensName] = useState("all");
  const [filterPurchasePrice, setFilterPurchasePrice] = useState("all");
  const [filterSalesPrice, setFilterSalesPrice] = useState("all");
  const [filterQty, setFilterQty] = useState("all");
  const [paginatedData, setPaginatedData] = useState<IContactLensSaleInfo[]>([])
  const [page, setPage] = useState(1);

  

    useEffect(() => {
        setPage(1);
    }, [search, filterStatus, filterContactLensName, filterSalesPrice, filterPurchasePrice, filterQty]);

    useEffect(() => {
  if (newModifiedData && Array.isArray(newModifiedData) ) {
    // Prevent unnecessary updates
    setContactLens((prev) => {
      const prevStr = JSON.stringify(prev);
      const newStr = JSON.stringify(newModifiedData);
      return prevStr !== newStr ? newModifiedData : prev;
    });
  }
}, [newModifiedData]);


    const statusCategory = [...new Set(contactLens?.map((p: IContactLensSaleInfo) => p?.status))]
    .map(type => ({ value: type, label: type }));
    const cLensNameCategory = [...new Set(contactLens?.map((p: IContactLensSaleInfo) => p?.contactLensName))]
    .map(type => ({ value: type, label: type }));
    const cLensPurchasePriceCategory = [...new Set(contactLens?.map((p: IContactLensSaleInfo) => p?.contactLensPurchasePrice?.toString()))].map(type => ({ value: type, label: type }));
    const cLensSalesPriceCategory = [...new Set(contactLens?.map((p: IContactLensSaleInfo) => p?.contactLensSalesPrice?.toString()))].map(type => ({ value: type, label: type }));

    const cLensQtyCategory = [...new Set(contactLens?.map((p: IContactLensSaleInfo) => p?.contactLensQty?.toString()))]
    .map(type => ({ value: type, label: type }));

    const filteredData = useMemo(() => {

    const filteredData:IContactLensSaleInfo[] = contactLens.filter(contactLens => {
      const matchSearch =
        contactLens?.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        contactLens?.customer_email.toLowerCase().includes(search.toLowerCase()) ||
        contactLens?.customer_address.toLowerCase().includes(search.toLowerCase()) ||
        contactLens?.customer_phone.toLowerCase().includes(search.toLowerCase()) ||
        contactLens?.contactLensName.toLowerCase().includes(search.toLowerCase()) ||
        contactLens?.invoiceNo.toLowerCase().includes(search.toLowerCase())
        
        
      const matchName = filterStatus === "all" ? true : contactLens?.status === filterStatus;
      const matchFrameName = filterContactLensName === "all" ? true : contactLens?.contactLensName === filterContactLensName;
      const matchPurchasePrice = filterPurchasePrice === "all" ? true : contactLens?.contactLensPurchasePrice?.toString() === filterPurchasePrice;
      const matchSalesPrice = filterSalesPrice === "all" ? true : contactLens?.contactLensSalesPrice?.toString() === filterSalesPrice

      return matchSearch && matchName && matchFrameName && matchSalesPrice && matchPurchasePrice
    });

    const addingIdWithFiltered:IContactLensSaleInfo[] = filteredData.map((filtered:IContactLensSaleInfo, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
    } , [contactLens, search, filterStatus, filterContactLensName,filterPurchasePrice, filterSalesPrice]);

   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterStatus !== "all") activeFilters.push(`Status: ${filterStatus}`);
  if (filterContactLensName !== "all") activeFilters.push(`Frame name: ${filterContactLensName}`);
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
      label: "C-Lens Name",
      placeholder: "C-Lens Name",
      options: [
        { value: "all", label: "All C-Lens Name" },
        ...cLensNameCategory
      ],
      onChange: setFilterContactLensName,
    },
    {
      label: "Purchase Price",
      placeholder: "Purchase Price",
      options: [
        { value: "all", label: "All Purchase" },
        ...cLensPurchasePriceCategory
      ],
      onChange: setFilterPurchasePrice,
    },
    {
      label: "Sales Price",
      placeholder: "Sales Price",
      options: [
        { value: "all", label: "All Sales" },
        ...cLensSalesPriceCategory
      ],
      onChange: setFilterSalesPrice,
    },
    {
      label: "Quantity",
      placeholder: "Quantity",
      options: [
        { value: "all", label: "All Quantity" },
        ...cLensQtyCategory
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

     const handleDetails = (value:string) => {
              const findProductId = newModifiedData?.find((item:IContactLensSaleInfo) => item?._id === value)
             
              
              const findonlyLensOrder = Array.isArray(allLens?.data?.data) 
                ? allLens?.data?.data?.find((item:ContactLens) => item?._id === findProductId?.contactLensId)
                : null;
              
              if (findonlyLensOrder) {
               console.log(findonlyLensOrder)
                dispatch(openEdit({name: 'details-contact-lens',data:{ lens: findonlyLensOrder} }));
              }
          }
          const handlePower = (value:string) => {
              const prescription = newModifiedData?.find((item:IContactLensSaleInfo) => item?._id === value) as IContactLensSaleInfo
              const {pd, submitType, prescriptionImg, leftEye, rightEye} = prescription
               dispatch(openEdit({name: 'eye-prescription',data:{pd, submitType, prescriptionImg, leftEye, rightEye } }));
          }
  
    const actionColumns: ActionColumn[] = [
      {
        logo: <Edit className="w-4 h-4 text-green-800"/>,
        type: "edit",
        render: handleEdit
      },
      {
        logo: <Eye className="w-4 h-4 text-orange-800"/>,
        type: "edit",
        render: handleDetails
      },
      {
        logo: <File className="w-4 h-4 text-amber-800"/>,
        type: "power",
        render: handlePower
      },
    ]

return {filters,filterSummary, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, actionColumns}

};

export default useContactLensOrder;