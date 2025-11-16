import type { IWeeklyDeals } from "../../../types/interface";
import type { ApiDataTypeWithoutMeta } from "../../../types/type";
import { baseApi } from "./baseApi";

export const weeklyDealsApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getWeeklyDeals: builder.query<
        ApiDataTypeWithoutMeta<IWeeklyDeals>,
        string
      >({
        query: () => `search/get-deals`,
        providesTags: ["WeeklyDeals"],
      }),
      updateWeeklyDeals: builder.mutation<
        ApiDataTypeWithoutMeta<IWeeklyDeals>,
        { id: string; data: IWeeklyDeals }
      >({
        query: ({ id, data }) => {
          return {
            url: `search/update-deals/${id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["WeeklyDeals"],
      }),
    };
  },
});

export const { useGetWeeklyDealsQuery, useUpdateWeeklyDealsMutation } =
  weeklyDealsApi;
