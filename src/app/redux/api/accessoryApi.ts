/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAccessory } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const accessoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllAccessory: builder.query<ApiDataType<any>, string>({
        query: () => `accessory/get-accessories`,
        providesTags: ["Accessory"],
      }),
      createAccessory: builder.mutation<
        ApiDataType<IAccessory>,
        { data: IAccessory; images: File[] }
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
            url: `accessory/create-accessory`,
            method: "POST",
            body: formData,
          };
        },
      }),

      updateAccessory: builder.mutation<
        ApiDataType<IAccessory>,
        { id: string; data: IAccessory; images?: File[] }
      >({
        query: ({ id, data, images }) => {
          const formData = new FormData();
          images?.forEach((file) => formData.append("images", file));
          formData.append("data", JSON.stringify(data));

          return {
            url: `accessory/update-accessory/${id}`,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: ["Accessory"],
      }),
      // DELETE frames (multiple IDs)
      deleteAccessory: builder.mutation<ApiDataType<IAccessory>, string[]>({
        query: (ids) => ({
          url: `accessory/delete-accessory`,
          method: "DELETE",
          body: { ids },
        }),
        invalidatesTags: ["Accessory"],
      }),
    };
  },
});

export const {
  useGetAllAccessoryQuery,
  useCreateAccessoryMutation,
  useUpdateAccessoryMutation,
  useDeleteAccessoryMutation,
} = accessoryApi;
