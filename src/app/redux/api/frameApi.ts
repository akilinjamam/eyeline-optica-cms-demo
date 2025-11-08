/* eslint-disable @typescript-eslint/no-explicit-any */
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
      createFrame: builder.mutation<ApiDataType<Frame>, { data: IFrame }>({
        query: ({ data }) => {
          console.log(data);
          const formData = new FormData();

          const { images, ...remaining } = data;
          console.log(images);
          const { otherImages } = remaining;

          otherImages?.forEach((group, index) => {
            group.images.forEach((file: File) =>
              formData.append(`otherImages_${index}`, file)
            );
          });

          console.log(otherImages);

          // append text fields as JSON
          formData.append("data", JSON.stringify(remaining));

          return {
            url: `products/create-product`,
            method: "POST",
            body: formData,
          };
        },
      }),

      updateFrame: builder.mutation<
        ApiDataType<Frame>,
        { id: string; formData: any }
      >({
        query: ({ id, formData }) => {
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

export const {
  useGetAllFramesQuery,
  useCreateFrameMutation,
  useUpdateFrameMutation,
  useDeleteFramesMutation,
} = frameApi;
