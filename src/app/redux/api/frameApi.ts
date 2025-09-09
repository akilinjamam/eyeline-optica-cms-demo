import type { Frame } from "../../../types/interface";
import { baseApi } from "./baseApi";

type IFrame = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Frame;
    meta: {
      limit: number;
      page: number;
      total: number;
      totalPage: number;
    };
  };
};

export const frameApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllFrames: builder.query<IFrame, string>({
        query: () => `products`,
      }),
    };
  },
});

export const { useGetAllFramesQuery } = frameApi;
