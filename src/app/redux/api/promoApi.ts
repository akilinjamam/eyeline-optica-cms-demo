/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IPromo } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const promoApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllPromo: builder.query<ApiDataType<IPromo>, string>({
        query: () => `promo`,
        providesTags: ["Promo"],
      }),
      createPromo: builder.mutation<IPromo, any>({
        query: (data) => {
          return {
            url: `promo/create-promo-code`,
            method: "POST",
            body: data,
          };
        },
      }),

      updatePromo: builder.mutation<
        ApiDataType<IPromo>,
        { id: string; body: IPromo }
      >({
        query: ({ id, body }) => {
          return {
            url: `promo/update-promo/${id}`,
            method: "PUT",
            body: body,
          };
        },
        invalidatesTags: ["Promo"],
      }),
      // DELETE Lens (multiple IDs)
      deletePromo: builder.mutation<ApiDataType<IPromo>, string[]>({
        query: (ids) => ({
          url: `promo/delete-promo`,
          method: "POST",
          body: { ids },
        }),
        invalidatesTags: ["Promo"],
      }),
    };
  },
});

export const {
  useGetAllPromoQuery,
  useCreatePromoMutation,
  useUpdatePromoMutation,
  useDeletePromoMutation,
} = promoApi;
