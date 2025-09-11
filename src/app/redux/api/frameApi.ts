import type { Frame, IFrame } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const frameApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllFrames: builder.query<ApiDataType<IFrame>, string>({
        query: () => `products`,
        providesTags: ["Frames"],
      }),
      createFrame: builder.mutation<
        ApiDataType<Frame>,
        { data: IFrame; images: File[] }
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
            url: `products/create-product`,
            method: "POST",
            body: formData,
          };
        },
      }),

      updateFrame: builder.mutation<
        ApiDataType<Frame>,
        { id: string; data: IFrame; images?: File[] }
      >({
        query: ({ id, data, images }) => {
          const formData = new FormData();
          formData.append("data", JSON.stringify(data));
          images?.forEach((file) => formData.append("images", file));

          return {
            url: `products/update-product/${id}`,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: ["Frames"],
      }),
      // DELETE frames (multiple IDs)
      deleteFrames: builder.mutation<ApiDataType<IFrame>, string[]>({
        query: (ids) => ({
          url: `products/delete-product`,
          method: "DELETE",
          body: { ids }, // backend should accept { ids: ["id1", "id2"] }
        }),
        invalidatesTags: ["Frames"],
      }),
    };
  },
});

export const { useGetAllFramesQuery, useCreateFrameMutation } = frameApi;
