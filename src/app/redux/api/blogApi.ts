import type { IBlog } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllBlog: builder.query<ApiDataType<IBlog>, string>({
        query: () => `blog`,
        providesTags: ["Blog"],
      }),
      createBlog: builder.mutation<
        ApiDataType<IBlog>,
        { data: IBlog; images: File[] }
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
            url: `blog/create-blog`,
            method: "POST",
            body: formData,
          };
        },
      }),

      updateBlog: builder.mutation<
        ApiDataType<IBlog>,
        { id: string; data: IBlog; images?: File[] }
      >({
        query: ({ id, data, images }) => {
          const formData = new FormData();
          images?.forEach((file) => formData.append("images", file));
          formData.append("data", JSON.stringify(data));

          return {
            url: `blog/update-blog/${id}`,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: ["Blog"],
      }),
      // DELETE Blog (multiple IDs)
      deleteBlog: builder.mutation<ApiDataType<IBlog>, string[]>({
        query: (ids) => ({
          url: `blog/delete-blog`,
          method: "DELETE",
          body: { ids },
        }),
        invalidatesTags: ["Blog"],
      }),
    };
  },
});

export const {
  useGetAllBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
