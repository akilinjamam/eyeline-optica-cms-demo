import type { TableColumn, TCustomer } from "../../../../types/type";
import { useEffect, useMemo, useState } from "react";


import { useGetAllCustomersQuery } from "../../../../app/redux/api/customerApi";

const useCustomerList = () => {

    const {data:allData, isLoading} = useGetAllCustomersQuery('')
  

    const allCustomerData = allData?.data?.data as TCustomer[] | undefined;

  const columns: TableColumn[] = [
  { key: "id", label: "SL", align: "left" },
  { key: "name", label: "Name", align: "left" },
  { key: "email", label: "Email", align: "left" },
  { key: "phoneNumber", label: "Phone Number", align: "left" },
  { key: "address", label: "Address", align: "left" },
];

  const [customer, setCustomer] = useState<TCustomer[]>([]);
  const [search, setSearch] = useState("");
  const [filterName, setFilterName] = useState("all");
  const [filterEmail, setFilterEmail] = useState("all");
  const [filterPhone, setFilterPhone] = useState("all");
  const [filterAddress, setFilterAddress] = useState("all");
  const [paginatedData, setPaginatedData] = useState<TCustomer[]>([])
  const [page, setPage] = useState(1);

  

    useEffect(() => {
        setPage(1);
    }, [search, filterName, filterEmail, filterPhone]);

    useEffect(() => {
        if (allData?.data?.data && Array.isArray(allData.data.data)) {
            setCustomer(allData.data.data);
        }
    }, [allData]);


    const nameCategory = [...new Set(allCustomerData?.map((p: TCustomer) => p?.name))]
  .map(type => ({ value: type, label: type }));
    const phoneCategory = [...new Set(allCustomerData?.map((p: TCustomer) => p?.phoneNumber))]
  .map(type => ({ value: type, label: type }));
    const emailCategory = [...new Set(allCustomerData?.map((p: TCustomer) => p?.email))].map(type => ({ value: type, label: type }));
    const addressCategory = [...new Set(allCustomerData?.map((p: TCustomer) => p?.address))]
  .map(type => ({ value: type, label: type }));


    const filteredData = useMemo(() => {

    const filteredData:TCustomer[] = customer.filter(customer => {
      const matchSearch =
        customer?.name.toLowerCase().includes(search.toLowerCase()) ||
        customer?.email.toLowerCase().includes(search.toLowerCase()) ||
        customer?.address.toLowerCase().includes(search.toLowerCase()) ||
        customer?.phoneNumber.toLowerCase().includes(search.toLowerCase())
        ;

      const matchName = filterName === "all" ? true : customer?.name === filterName;
      const matchEmail = filterEmail === "all" ? true : customer?.email === filterEmail;
      const matchPhone = filterPhone === "all" ? true : customer?.phoneNumber === filterPhone;
      const matchAddress = filterAddress === "all" ? true : customer?.address === filterAddress

    

      return matchSearch && matchName && matchEmail && matchPhone && matchAddress
    });

    const addingIdWithFiltered:TCustomer[] = filteredData.map((filtered:TCustomer, index:number) => ({id:index+1, ...filtered}))

    return addingIdWithFiltered
    } , [customer, search, filterName, filterEmail, filterPhone, filterAddress]);

  


   // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterName !== "all") activeFilters.push(`Name: ${filterName}`);
  if (filterEmail !== "all") activeFilters.push(`Email: ${filterEmail}`);
  if (filterPhone !== "all") activeFilters.push(`Phone: ${filterPhone}`);

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", "
        )})`
      : "No filters applied";


  const filters = [
    {
      label: "Name",
      placeholder: "Filter by Name",
      options: [
        { value: "all", label: "All Types" },
        ...nameCategory
      ],
      onChange: setFilterName,
    },
    {
      label: "Email",
      placeholder: "Filter by Email",
      options: [
        { value: "all", label: "All Email" },
        ...emailCategory
      ],
      onChange: setFilterEmail,
    },
    {
      label: "Phone",
      placeholder: "Filter by Phone",
      options: [
        { value: "all", label: "All Phones" },
        ...phoneCategory
      ],
      onChange: setFilterPhone,
    },
    {
      label: "Address",
      placeholder: "Filter by Address",
      options: [
        { value: "all", label: "All Address" },
        ...addressCategory
      ],
      onChange: setFilterAddress,
    }
  ]



return {filters,filterSummary, search,setSearch, setPaginatedData, paginatedData,page, setPage, columns, filteredData, isLoading}

};

export default useCustomerList;