import type { ContactLens } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const lensApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllContactLens: builder.query<ApiDataType<ContactLens>, string>({
        query: () => `contact-lens`,
        providesTags: ["Contact-Lens"],
      }),
      createContactLens: builder.mutation<
        ApiDataType<ContactLens>,
        { data: ContactLens; images: File[] }
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
            url: `contact-lens/create-contact-lens`,
            method: "POST",
            body: formData,
          };
        },
      }),

      updateContactLens: builder.mutation<
        ApiDataType<ContactLens>,
        { id: string; data: ContactLens; images?: File[] }
      >({
        query: ({ id, data, images }) => {
          const formData = new FormData();
          images?.forEach((file) => formData.append("images", file));
          formData.append("data", JSON.stringify(data));

          return {
            url: `contact-lens/update-contact-lens/${id}`,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: ["Contact-Lens"],
      }),
      // DELETE Lens (multiple IDs)
      deleteContactLens: builder.mutation<ApiDataType<ContactLens>, string[]>({
        query: (ids) => ({
          url: `contact-lens/delete-contact-lens`,
          method: "DELETE",
          body: { ids }, // backend should accept { ids: ["id1", "id2"] }
        }),
        invalidatesTags: ["Contact-Lens"],
      }),
    };
  },
});

export const {
  useGetAllContactLensQuery,
  useCreateContactLensMutation,
  useUpdateContactLensMutation,
  useDeleteContactLensMutation,
} = lensApi;
