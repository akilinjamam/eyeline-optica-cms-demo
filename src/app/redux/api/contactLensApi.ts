import type { ContactLens } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const lensApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllContactLens: builder.query<ApiDataType<ContactLens>, string>({
        query: () => `contact-lens`,
      }),
    };
  },
});

export const { useGetAllContactLensQuery } = lensApi;
