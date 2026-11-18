/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

type TBlogImg = {
  url: string;
  isStored: boolean;
  createdAt: any;
  updatedAt: any;
};

export const blogImgApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createBlogImage: builder.mutation<{ data: TBlogImg }, any>({
        query: (formData) => {
          return {
            url: `blogImg/create-blog-image`,
            method: "POST",
            body: formData,
          };
        },
      }),
    };
  },
});

export const { useCreateBlogImageMutation } = blogImgApi;
