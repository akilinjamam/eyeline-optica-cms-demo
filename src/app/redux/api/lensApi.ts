import type { IFrame, ILens } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const frameApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllLens: builder.query<ApiDataType<ILens>, string>({
        query: () => `lens`,
        providesTags: ["Lens"],
      }),
      createLens: builder.mutation<
        ApiDataType<ILens>,
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
            url: `lens/create-lens`,
            method: "POST",
            body: formData,
          };
        },
      }),

      updateLens: builder.mutation<
        ApiDataType<ILens>,
        { id: string; data: IFrame; images?: File[] }
      >({
        query: ({ id, data, images }) => {
          const formData = new FormData();
          images?.forEach((file) => formData.append("images", file));
          formData.append("data", JSON.stringify(data));

          return {
            url: `lens/update-lens/${id}`,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: ["Lens"],
      }),
      // DELETE Lens (multiple IDs)
      deleteLens: builder.mutation<ApiDataType<ILens>, string[]>({
        query: (ids) => ({
          url: `lens/delete-lens`,
          method: "DELETE",
          body: { ids }, // backend should accept { ids: ["id1", "id2"] }
        }),
        invalidatesTags: ["Lens"],
      }),
    };
  },
});

export const {
  useGetAllLensQuery,
  useCreateLensMutation,
  useUpdateLensMutation,
  useDeleteLensMutation,
} = frameApi;
