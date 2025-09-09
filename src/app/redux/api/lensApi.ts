import type { ILens } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const lensApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllLens: builder.query<ApiDataType<ILens>, string>({
        query: () => `lens`,
      }),
    };
  },
});

export const { useGetAllLensQuery } = lensApi;
