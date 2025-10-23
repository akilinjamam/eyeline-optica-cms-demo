import type { ApiDataType, TCustomer } from "../../../types/type";
import { baseApi } from "./baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllCustomers: builder.query<ApiDataType<TCustomer>, string>({
        query: () => `sales/get-customer`,
        providesTags: ["Sale"],
      }),
    };
  },
});

export const { useGetAllCustomersQuery } = customerApi;
