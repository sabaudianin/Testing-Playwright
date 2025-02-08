import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.example.com/api" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    updateUser: builder.mutation({
      query: (body) => ({ url: "/users", method: "PUT", body }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = api;
