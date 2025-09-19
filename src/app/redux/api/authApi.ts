/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiDataType, TRegistration } from "../../../types/type";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllUsers: builder.query<any, any>({
        query: () => `registration/get-all-users`,
        providesTags: ["Auth"],
      }),
      createRegistration: builder.mutation<any, { data: any }>({
        query: (data) => {
          return {
            url: `registration/create-registration`,
            method: "POST",
            body: data,
          };
        },
      }),
      createLogin: builder.mutation<any, { data: any }>({
        query: (data) => {
          return {
            url: `registration/create-login`,
            method: "POST",
            body: data,
          };
        },
      }),

      // 🔹 Update user
      updateUser: builder.mutation<
        ApiDataType<TRegistration>,
        { id: string; data: any }
      >({
        query: ({ id, data }) => {
          return {
            url: `registration/update-user/${id}`,
            method: "PATCH", // or PUT if you prefer full replace
            body: data,
          };
        },
        invalidatesTags: ["Auth"],
      }),

      // 🔹 Delete multiple users
      deleteUsers: builder.mutation<ApiDataType<TRegistration>, string[]>({
        query: (ids) => {
          return {
            url: `registration/delete-users`,
            method: "DELETE",
            body: { ids },
          };
        },
        invalidatesTags: ["Auth"],
      }),
    };
  },
});

export const {
  useCreateLoginMutation,
  useCreateRegistrationMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUsersMutation,
} = authApi;
