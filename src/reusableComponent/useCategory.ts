import { useGetAllCateogyQuery } from "../app/redux/api/categoryApi";
import type { ICategory } from "../types/interface";

const useCategory = (query: string) => {
  const { data: getCategory, isLoading } = useGetAllCateogyQuery(query);
  const category = (getCategory?.data?.data ?? []) as ICategory[];

  return { category, isLoading };
};

export default useCategory;
