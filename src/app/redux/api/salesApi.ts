import type { ISales } from "../../../types/interface";
import type { ApiDataType, TOrderStatus } from "../../../types/type";
import { baseApi } from "./baseApi";

export const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllSales: builder.query<ApiDataType<ISales>, string>({
        query: (saleType: string) => `sales/get-sales?saleType=${saleType}`,
        providesTags: ["Sale"],
      }),
      updateStatus: builder.mutation<
        ApiDataType<TOrderStatus>,
        { id: string; data: TOrderStatus }
      >({
        query: ({ id, data }) => {
          return {
            url: `sales/update-status/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["Sale"],
      }),
    };
  },
});

export const { useGetAllSalesQuery, useUpdateStatusMutation } = salesApi;
