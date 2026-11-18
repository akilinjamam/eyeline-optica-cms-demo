/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import type { ActionColumn, TableColumn } from "../../../../types/type";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  openEdit,
  switchCheck,
} from "../../../../app/redux/features/modalSlice";
import type { RootState } from "../../../../app/store";

import { useGetAllPromoQuery } from "../../../../app/redux/api/promoApi";
import type { IPromo } from "../../../../types/interface";

const usePromoList = () => {
  const { data: allData, isLoading } = useGetAllPromoQuery("");

  console.log(allData);

  const dispatch = useDispatch();

  const columns: TableColumn[] = [
    { key: "id", label: "SL", align: "left" },
    { key: "name", label: "Code Name", align: "left" },
    { key: "amount", label: "Discounted Price/Percent", align: "left" },
    { key: "percent", label: "Percent(%)", align: "left" },
    { key: "active", label: "Active", align: "left" },
    { key: "startTime", label: "Start Time", align: "left" },
    { key: "endTime", label: "End Time", align: "left" },
  ];

  const [blog, setBlog] = useState<IPromo[]>([]);
  const [search, setSearch] = useState("");

  const [filterNameType, setFilterNameType] = useState("all");
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (allData?.data && Array.isArray(allData.data)) {
      setBlog(allData.data);
    }
  }, [allData]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const alteredPromoData = useMemo(() => {
    const result = blog?.map((promo: any) => {
      const { startTime, endTime, ...remaining } = promo || {};

      return {
        ...remaining,
        startTime: `${startTime?.slice(0, 10)}`,
        endTime: `${endTime?.slice(0, 10)}`,
      };
    });
    return result;
  }, [blog]);

  const filteredDataa = useMemo(() => {
    const filteredData: IPromo[] = alteredPromoData?.filter((blog) => {
      const matchSearch = blog?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchNameType =
        filterNameType === "all" ? true : blog.name === filterNameType;

      return matchSearch && matchNameType;
    });

    const addingIdWithFiltered: any = filteredData.map(
      (filtered: any, index: number) => ({ id: index + 1, ...filtered }),
    );

    return addingIdWithFiltered;
  }, [search, filterNameType, alteredPromoData]);

  const { showCheck } = useSelector((state: RootState) => state.modal);

  const handleEdit = (id: string) => {
    const findData = filteredDataa?.find((item: IPromo) => item?._id === id);
    console.log("Edit", findData?.startTime);
    dispatch(openEdit({ name: "promo", data: findData }));
  };
  const handleDelete = (id: number) => {
    dispatch(switchCheck());
    console.log("delete-id:", id);
  };

  // ------------------------
  // Build filter summary text
  // ------------------------
  const activeFilters: string[] = [];
  if (search) activeFilters.push(`Search: "${search}"`);
  if (filterNameType !== "all")
    activeFilters.push(`Blog Type: ${filterNameType}`);

  const filterSummary =
    activeFilters.length > 0
      ? `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""} applied (${activeFilters.join(
          ", ",
        )})`
      : "No filters applied";

  const titleCategory = [
    ...new Set(
      blog
        ?.map((p: IPromo) => p?.name)
        .filter((t): t is string => !!t && t.trim() !== ""),
    ),
  ].map((type) => ({ value: type, label: type }));

  const filters: any = [
    {
      label: "Title",
      placeholder: "Title Type",
      options: [{ value: "all", label: "All title Types" }, ...titleCategory],
      onChange: setFilterNameType,
    },
  ];

  const actionColumns: ActionColumn[] = [
    {
      logo: <Edit className="w-4 h-4 text-green-800" />,
      type: "edit",
      render: handleEdit,
    },

    {
      logo: <Trash2 className="w-4 h-4 text-red-800" />,
      type: "delete",
      render: handleDelete,
    },
  ];

  return {
    columns,
    setSearch,
    search,
    actionColumns,
    filterSummary,
    paginatedData,
    setPaginatedData,
    filters,
    page,
    setPage,
    filteredDataa,
    isLoading,
    showCheck,
  };
};

export default usePromoList;
