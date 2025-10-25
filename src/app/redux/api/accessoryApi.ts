/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const accessoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllAccessory: builder.query<ApiDataType<any>, string>({
        query: () => `accessory/get-accessories`,
        providesTags: ["Accessory"],
      }),
      // createFrame: builder.mutation<
      //   ApiDataType<Frame>,
      //   { data: IFrame; images: File[] }
      // >({
      //   query: ({ data, images }) => {
      //     const formData = new FormData();

      //     // append text fields as JSON
      //     formData.append("data", JSON.stringify(data));

      //     // append files
      //     images.forEach((file) => {
      //       formData.append("images", file);
      //     });

      //     return {
      //       url: `products/create-product`,
      //       method: "POST",
      //       body: formData,
      //     };
      //   },
      // }),

      // updateFrame: builder.mutation<
      //   ApiDataType<Frame>,
      //   { id: string; data: IFrame; images?: File[] }
      // >({
      //   query: ({ id, data, images }) => {
      //     const formData = new FormData();
      //     images?.forEach((file) => formData.append("images", file));
      //     formData.append("data", JSON.stringify(data));

      //     return {
      //       url: `products/update-product/${id}`,
      //       method: "PUT",
      //       body: formData,
      //     };
      //   },
      //   invalidatesTags: ["Frames"],
      // }),
      // // DELETE frames (multiple IDs)
      // deleteFrames: builder.mutation<ApiDataType<IFrame>, string[]>({
      //   query: (ids) => ({
      //     url: `products/delete-product`,
      //     method: "DELETE",
      //     body: { ids }, // backend should accept { ids: ["id1", "id2"] }
      //   }),
      //   invalidatesTags: ["Frames"],
      // }),
    };
  },
});

export const { useGetAllAccessoryQuery } = accessoryApi;
