import type { ISales } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllSales: builder.query<ApiDataType<ISales>, string>({
        query: (saleType: string) => `sales/get-sales?saleType=${saleType}`,
        providesTags: ["Sale"],
      }),
    };
  },
});

export const { useGetAllSalesQuery } = salesApi;
