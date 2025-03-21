import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootUrl } from "@/utils/Constant";
import { get } from "http";
import { setUser } from "./data/userSlice";

export const UserApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${RootUrl}/users`,credentials: "include" }), // ✅ Change this to your API
  tagTypes: ["User"],
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
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // API response ka data
        
          dispatch(setUser(data.data.user)); // Redux store me user set karna
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      },
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: "/profile",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    LogoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/logOut",
        method: "POST",  // ✅ Logout ke liye POST use karein
        credentials: "include", // ✅ Ensure cookies are sent
      }),
      invalidatesTags: ["User"], // ✅ Logout ke baad user data invalidate kar dena
    }),
    DeleteDeliveryAddress: builder.mutation({
      query: (addressId) => ({
        url: `/profile/delivery-address/${addressId}`, // ✅ Address ID in URL
        method: "DELETE",
      }),
      invalidatesTags: ["User"], // ✅ Refresh user data after deletion
    }),
  }),
  })


export const { useTestQuery, useRegisterUserMutation,useLoginUserMutation,useGetUserProfileQuery,useLogoutUserMutation,useUpdateUserProfileMutation ,useDeleteDeliveryAddressMutation} = UserApiSlice;
