import type { ICategory } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllCateogy: builder.query<ApiDataType<ICategory>, string>({
        query: (query: string) =>
          query
            ? `category?sort=category&categoryType=${query}`
            : `category?sort=category`,
        providesTags: ["Category"],
      }),
      createCategory: builder.mutation<ApiDataType<ICategory>, ICategory>({
        query: (data) => {
          return {
            url: `category/create-category`,
            method: "POST",
            body: data,
          };
        },
      }),

      updateCategory: builder.mutation<
        ApiDataType<ICategory>,
        { id: string; data: ICategory }
      >({
        query: ({ id, data }) => {
          return {
            url: `category/update-category/${id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["Category"],
      }),
      // DELETE Lens (multiple IDs)
      deleteCategory: builder.mutation<ApiDataType<ICategory>, string[]>({
        query: (ids) => ({
          url: `category/delete-category`,
          method: "DELETE",
          body: { ids }, // backend should accept { ids: ["id1", "id2"] }
        }),
        invalidatesTags: ["Category"],
      }),
    };
  },
});

export const {
  useGetAllCateogyQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
