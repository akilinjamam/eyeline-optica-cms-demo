import type { IBanner } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const frameApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllBanner: builder.query<ApiDataType<IBanner>, string>({
        query: () => `banner`,
        providesTags: ["Banner"],
      }),
      createBanner: builder.mutation<
        ApiDataType<IBanner>,
        { data: IBanner; images: File[] }
      >({
        query: ({ data, images }) => {
          const formData = new FormData();

          // append text fields as JSON
          formData.append("data", JSON.stringify(data));

          // append files
          images.forEach((file) => {
            formData.append("images", file);
          });

          return {
            url: `banner/create-banner`,
            method: "POST",
            body: formData,
          };
        },
      }),

      updateBanner: builder.mutation<
        ApiDataType<IBanner>,
        { id: string; data: IBanner; images?: File[] }
      >({
        query: ({ id, data, images }) => {
          const formData = new FormData();
          images?.forEach((file) => formData.append("images", file));
          formData.append("data", JSON.stringify(data));

          return {
            url: `banner/update-banner/${id}`,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: ["Banner"],
      }),
      // DELETE Lens (multiple IDs)
      deleteBanner: builder.mutation<ApiDataType<IBanner>, string[]>({
        query: (ids) => ({
          url: `banner/delete-banner`,
          method: "DELETE",
          body: { ids }, // backend should accept { ids: ["id1", "id2"] }
        }),
        invalidatesTags: ["Banner"],
      }),
    };
  },
});

export const {
  useGetAllBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = frameApi;
