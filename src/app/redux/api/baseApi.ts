// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eyeline-optica-server.onrender.com/api/v1/",
  }),
  endpoints: () => ({}),
  tagTypes: ["Frames", "Lens", "Contact-Lens"],
});
