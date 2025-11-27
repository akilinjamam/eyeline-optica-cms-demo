/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const prescription = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllPrescription: builder.query<ApiDataType<any>, string>({
        query: () => `prescription`,
        providesTags: ["Prescription"],
      }),
      createPrescription: builder.mutation<ApiDataType<any>, { data: any }>({
        query: ({ data }) => {
          console.log(data);
          return {
            url: `prescription/create-prescription`,
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

export const { useCreatePrescriptionMutation, useGetAllPrescriptionQuery } =
  prescription;
