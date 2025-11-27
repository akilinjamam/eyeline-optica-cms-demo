// import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getWishlist: builder.query({
        query: (value) => `wishlist/get-wishlist?type=${value}`,
        providesTags: ["Wishlist"],
      }),
    };
  },
});

export const { useGetWishlistQuery } = wishlistApi;
