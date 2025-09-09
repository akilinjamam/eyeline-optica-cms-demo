import type { Frame } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const frameApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllFrames: builder.query<ApiDataType<Frame>, string>({
        query: () => `products`,
      }),
    };
  },
});

export const { useGetAllFramesQuery } = frameApi;
