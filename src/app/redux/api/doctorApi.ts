/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Frame, IDoctor } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllDoctor: builder.query<ApiDataType<IDoctor>, string>({
        query: () => `doctors`,
        providesTags: ["Doctor"],
      }),
      createDoctor: builder.mutation<
        ApiDataType<any>,
        { data: IDoctor; images: File[] }
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
            url: `doctors/create-doctor`,
            method: "POST",
            body: formData,
          };
        },
      }),
      getSingleDoctor: builder.query<ApiDataType<IDoctor>, string>({
        query: (id) => `doctors/${id}`,
        providesTags: ["Doctor"],
      }),

      updateDoctor: builder.mutation<
        ApiDataType<Frame>,
        { id: string; data: IDoctor; images?: File[] }
      >({
        query: ({ id, data, images }) => {
          const formData = new FormData();
          images?.forEach((file) => formData.append("images", file));
          formData.append("data", JSON.stringify(data));

          return {
            url: `doctors/update-doctor/${id}`,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: ["Doctor"],
      }),
    };
  },
});

export const {
  useGetAllDoctorQuery,
  useGetSingleDoctorQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
} = doctorApi;
