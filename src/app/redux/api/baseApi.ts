/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.eyelineoptica.com/api/v1/",
    // baseUrl: "http://localhost:5000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Frames",
    "Lens",
    "Contact-Lens",
    "Auth",
    "Doctor",
    "Schedule",
    "Sale",
    "Accessory",
    "Category",
    "Banner",
  ],
});
