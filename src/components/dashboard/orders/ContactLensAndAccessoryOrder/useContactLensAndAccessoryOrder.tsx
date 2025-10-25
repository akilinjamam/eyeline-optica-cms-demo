/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActionColumn, TableColumn,  } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";
import type { ContactLens, IContactLensAccessorySaleInfo,ISales } from "../../../../types/interface";
import { useGetAllSalesQuery } from "../../../../app/redux/api/salesApi";
import { Edit, Eye, File } from "lucide-react";
import { openEdit } from "../../../../app/redux/features/modalSlice";
import { useDispatch } from "react-redux";
import { useGetAllContactLensQuery } from "../../../../app/redux/api/contactLensApi";
import { useGetAllAccessoryQuery } from "../../../../app/redux/api/accessoryApi";


const useConactLensAndAcc = () => {

    const {data:allData, isLoading} = useGetAllSalesQuery('Contact-Lens and Accessory')
    const {data:allContactLens} = useGetAllContactLensQuery('')
    const {data:allAccessory} = useGetAllAccessoryQuery('')
  
    const allFrameOrderData = allData?.data?.data as ISales[] | undefined;

    const newModifiedData = useMemo(() => {
    return allFrameOrderData?.map((item: ISales) => {
        const { customer_email, customer_phone, customer_address, contactLensId,accessoryId, customer_name, invoiceNo, status, subtotal, quantity, _id, pd, submitType, prescriptionImg, leftEye, rightEye } = item;

        const accessoryName = accessoryId?.items?.map((item:any) => item?.name)?.join('+');
        const accessoryPurchasePrice = accessoryId?.items?.map((item:any) => item?.purchasePrice)?.join('+');
        const accessorySalesPrice = accessoryId?.items?.map((item:any) => item?.salesPrice)?.join('+');
        return {
        _id,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        productName: `${contactLensId?.name} + (${accessoryName})`,
        productSalesPrice: `${contactLensId?.salesPrice} + (${accessorySalesPrice})`,
        productPurchasePrice: `${contactLensId?.purchasePrice} + (${accessoryPurchasePrice})`,
        productQty: quantity,
        contactLensId,
        accessoryId,
        invoiceNo,
        status,
        subtotal:subtotal * quantity,
        pd, submitType, prescriptionImg, leftEye, rightEye
        };
    }) as IContactLensAccessorySaleInfo[] | undefined;
    }, [allFrameOrderData]);

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "customer_name", label: "Name", align: "left" },
  { key: "customer_email", label: "Email", align: "left" },
  { key: "customer_phone", label: "Phone Number", align: "left" },
  { key: "productName", label: "C-Lens + Accessory", align: "left" },
  { key: "productSalesPrice", label: "Sales Price", align: "left" },
  { key: "invoiceNo", label: "Invoice No", align: "left" },
  { key: "status", label: "Status", align: "left" },
  { key: "customer_address", label: "Address", align: "left" },
  { key: "productPurchasePrice", label: "Purchase Price", align: "left" },
  { key: "productQty", label: "Qty", align: "left" },
  { key: "subtotal", label: "Total", align: "left" },
];

  const [product, setProduct] = useState<IContactLensAccessorySaleInfo[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProductName, setFilterProductName] = useState("all");
  const [filterPurchasePrice, setFilterPurchasePrice] = useState("all");
  const [filterSalesPrice, setFilterSalesPrice] = useState("all");
  const [paginatedData, setPaginatedData] = useState<IContactLensAccessorySaleInfo[]>([])
  const [page, setPage] = useState(1);

  

    useEffect(() => {
        setPage(1);
    }, [search, filterStatus, filterProductName, filterSalesPrice, filterPurchasePrice]);

    useEffect(() => {
  if (newModifiedData && Array.isArray(newModifiedData) ) {
    // Prevent unnecessary updates
    setProduct((prev) => {
      const prevStr = JSON.stringify(prev);
      const newStr = JSON.stringify(newModifiedData);
      return prevStr !== newStr ? newModifiedData : prev;
    });
  }
}, [newModifiedData]);


    const statusCategory = [...new Set(product?.map((p: IContactLensAccessorySaleInfo) => p?.status))]
  .map(type => ({ value: type, label: type }));
    const productNameCategory = [...new Set(product?.map((p: IContactLensAccessorySaleInfo) => p?.productName))]
  .map(type => ({ value: type, label: type }));
    const framePurchasePriceCategory = [...new Set(product?.map((p: IContactLensAccessorySaleInfo) => p?.productPurchasePrice?.toString()))].map(type => ({ value: type, label: type }));
    const frameSalesPriceCategory = [...new Set(product?.map((p: IContactLensAccessorySaleInfo) => p?.productSalesPrice?.toString()))].map(type => ({ value: type, label: type }));


    const filteredData = useMemo(() => {

    const filteredData:IContactLensAccessorySaleInfo[] = product.filter(product => {
      const matchSearch =
        product?.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        product?.customer_email.toLowerCase().includes(search.toLowerCase()) ||
        product?.customer_address.toLowerCase().includes(search.toLowerCase()) ||
        product?.customer_phone.toLowerCase().includes(search.toLowerCase()) ||
        product?.productName.toLowerCase().includes(search.toLowerCase()) ||
        product?.invoiceNo.toLowerCase().includes(search.toLowerCase())
        
        
      const matchName = filterStatus === "all" ? true : product?.status === filterStatus;
      const matchFrameName = filterProductName === "all" ? true : product?.productName === filterProductName;
      const matchPurchasePrice = filterPurchasePrice === "all" ? true : product?.productPurchasePrice?.toString() === filterPurchasePrice;
      const matchSalesPrice = filterSalesPrice === "all" ? true : product?.productSalesPrice?.toString() === filterSalesPrice

      return matchSearch && matchName && matchFrameName && matchSalesPrice && matchPurchasePrice
    });

    const addingIdWithFiltered:IContactLensAccessorySaleInfo[] = filteredData.map((filtered:IContactLensAccessorySaleInfo, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
    } , [product, search, filterStatus, filterProductName,filterPurchasePrice, filterSalesPrice]);

  


   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterStatus !== "all") activeFilters.push(`Status: ${filterStatus}`);
  if (filterProductName !== "all") activeFilters.push(`Frame name: ${filterProductName}`);
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
    }
  ]

 const dispatch = useDispatch();
  
    const handleEdit = (value:string) => {
        const findonlyContactLensOrder = allFrameOrderData?.find((item:ISales) => item?._id === value) as ISales;
        const {paymentHistoryId, status, _id} = findonlyContactLensOrder
        console.log({paymentHistoryId, status, _id})
        dispatch(openEdit({name: 'sales-order-status',data:{paymentHistoryId, status, id:_id} }));
    }

    const handleDetail = (value:string) => {
      const findProductId = newModifiedData?.find((item:IContactLensAccessorySaleInfo) => item?._id === value)
      
     
            const findonlyContactLensOrder = Array.isArray(allContactLens?.data?.data) 
              ? allContactLens?.data?.data?.find((item:ContactLens) => item?._id === findProductId?.contactLensId?._id)
              : null;

      console.log(findonlyContactLensOrder)
            const findonlyAccessoryOrder = Array.isArray(allAccessory?.data?.data) 
              ? allAccessory?.data?.data?.find((item:any) => item?._id === findProductId?.accessoryId?._id)
              : null;
            
            if (findonlyContactLensOrder && findonlyAccessoryOrder) {
              console.log(findonlyContactLensOrder)
              dispatch(openEdit({name: 'details-contactLens-and-accessory',data:{contactLens:findonlyContactLensOrder, accessory: findonlyAccessoryOrder} }));
            }
        }

    const handlePower = (value:string) => {
          const prescription = newModifiedData?.find((item:IContactLensAccessorySaleInfo) => item?._id === value) as IContactLensAccessorySaleInfo
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
        type: "view",
        render: handleDetail
      },
      {
        logo: <File className="w-4 h-4 text-amber-800"/>,
        type: "power",
        render: handlePower
      },
    ]

return {filters,filterSummary, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading, actionColumns}

};

export default useConactLensAndAcc;