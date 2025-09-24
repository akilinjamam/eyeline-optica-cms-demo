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
      createSlot: builder.mutation<any, any>({
        query: (data) => {
          return {
            url: `schedule/create-schedule`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["Schedule"],
      }),
    };
  },
});

export const { useGetAllSlotQuery, useCreateSlotMutation } = doctorApi;
