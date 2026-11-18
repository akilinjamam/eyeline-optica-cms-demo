import type { IMeta } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllMetaData: builder.query<ApiDataType<IMeta>, string>({
        query: () => `meta?sort=createdAt`,
        providesTags: ["Meta"],
      }),
      updateMetaData: builder.mutation<
        ApiDataType<IMeta>,
        { id: string; data: IMeta }
      >({
        query: ({ id, data }) => {
          return {
            url: `meta/update-meta/${id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["Meta"],
      }),
    };
  },
});

export const { useGetAllMetaDataQuery, useUpdateMetaDataMutation } = metaApi;
