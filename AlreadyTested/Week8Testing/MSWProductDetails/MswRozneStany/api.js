import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.example.com/api" }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductQuery } = productApi;
