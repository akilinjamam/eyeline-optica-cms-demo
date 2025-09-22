/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllSlot: builder.query<ApiDataType<any>, string>({
        query: (id) => `schedule/get-slot/${id}`,
        providesTags: ["Schedule"],
      }),
    };
  },
});

export const { useGetAllSlotQuery } = doctorApi;
