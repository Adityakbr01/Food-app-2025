import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootUrl } from "@/utils/Constant";

export const UserApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${RootUrl}/users`,credentials: "include" }), // ✅ Change this to your API
  endpoints: (builder) => ({
    test: builder.query({
      query: () => "/test",
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useTestQuery, useRegisterUserMutation,useLoginUserMutation } = UserApiSlice;
