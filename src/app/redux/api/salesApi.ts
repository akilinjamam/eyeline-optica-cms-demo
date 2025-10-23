import type { ApiDataType, TCustomer } from "../../../types/type";
import { baseApi } from "./baseApi";

export const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllSales: builder.query<ApiDataType<TCustomer>, string>({
        query: () => `sales/get-sales?saleType=Only Frame`,
        providesTags: ["Sale"],
      }),
    };
  },
});

export const { useGetAllSalesQuery } = salesApi;
